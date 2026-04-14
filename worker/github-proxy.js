/**
 * Cloudflare Worker — GitHub vault proxy for DamdiPedia.
 *
 * Environment variables (set via `wrangler secret put`):
 *   GITHUB_TOKEN  — GitHub PAT with Contents read/write on the repo
 *   EDIT_PASSWORD — same password as VITE_EDIT_PASSWORD (protects writes)
 *
 * Routes:
 *   GET  /vault           — list all .md files in the vault (returns { files: { filename: content } })
 *   PUT  /vault/:filename — create or update a file  (body: { content, password })
 *   DELETE /vault/:filename — delete a file           (body: { password })
 */

const REPO_OWNER = 'DamienLecoq';
const REPO_NAME = 'DamdiPedia';
const VAULT_PREFIX = 'src/vaults';
const NODES_DIR = VAULT_PREFIX + '/nodes';
const EXERCISES_DIR = VAULT_PREFIX + '/exercises';
const BRANCH = 'main';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}

function err(message, status = 400) {
  return json({ error: message }, status);
}

// ── GitHub API helpers ──────────────────────────────────────────────────────

async function ghApi(token, endpoint, options = {}) {
  const res = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}${endpoint}`,
    {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'DamdiPedia-Worker',
        ...options.headers,
      },
    },
  );
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`GitHub ${res.status}: ${body}`);
  }
  return res.json();
}

function utf8ToBase64(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Resolve GitHub path from filename: .md → nodes/, .json → exercises/ */
function resolveGhPath(filename) {
  if (filename.endsWith('.json')) return `${EXERCISES_DIR}/${filename}`;
  return `${NODES_DIR}/${filename}`;
}

// ── Route handlers ──────────────────────────────────────────────────────────

async function handleGetVault(token) {
  // Get full repo tree
  const tree = await ghApi(token, `/git/trees/${BRANCH}?recursive=1`);

  const vaultBlobs = tree.tree.filter(
    (f) => f.type === 'blob' &&
           (f.path.startsWith(NODES_DIR + '/') || f.path.startsWith(EXERCISES_DIR + '/')) &&
           (f.path.endsWith('.md') || f.path.endsWith('.json')),
  );

  const files = {};
  const shas = {};

  // Fetch raw content in parallel
  await Promise.all(
    vaultBlobs.map(async (file) => {
      try {
        const res = await fetch(
          `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${file.path}`,
          { headers: { 'User-Agent': 'DamdiPedia-Worker' } },
        );
        if (!res.ok) return;
        const text = await res.text();
        const filename = file.path.split('/').pop();
        files[filename] = text;
        shas[filename] = file.sha;
      } catch { /* skip */ }
    }),
  );

  return json({ files, shas });
}

async function handlePutFile(token, filename, content, password, editPassword) {
  if (editPassword && password !== editPassword) return err('Unauthorized', 401);

  const path = resolveGhPath(filename);

  const body = {
    message: `Update ${filename}`,
    content: utf8ToBase64(content),
    branch: BRANCH,
  };

  // Try to get existing file SHA for update
  try {
    const existing = await ghApi(token, `/contents/${path}`);
    body.sha = existing.sha;
  } catch { /* new file, no SHA needed */ }

  const result = await ghApi(token, `/contents/${path}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });

  return json({ sha: result.content.sha });
}

async function handleBatch(token, filesMap, password, editPassword, message) {
  if (editPassword && password !== editPassword) return err('Unauthorized', 401);
  const entries = Object.entries(filesMap || {});
  if (!entries.length) return err('No files provided', 400);

  // 1. Current branch ref
  const ref = await ghApi(token, `/git/ref/heads/${BRANCH}`);
  const parentCommitSha = ref.object.sha;

  // 2. Parent commit (for base tree)
  const parentCommit = await ghApi(token, `/git/commits/${parentCommitSha}`);
  const baseTreeSha = parentCommit.tree.sha;

  // 3. Create a blob per file (parallel)
  const blobs = await Promise.all(
    entries.map(async ([filename, content]) => {
      const blob = await ghApi(token, `/git/blobs`, {
        method: 'POST',
        body: JSON.stringify({ content: utf8ToBase64(content), encoding: 'base64' }),
      });
      return { filename, path: resolveGhPath(filename), sha: blob.sha };
    }),
  );

  // 4. Create tree (based on parent tree + new blobs)
  const tree = await ghApi(token, `/git/trees`, {
    method: 'POST',
    body: JSON.stringify({
      base_tree: baseTreeSha,
      tree: blobs.map(b => ({ path: b.path, mode: '100644', type: 'blob', sha: b.sha })),
    }),
  });

  // 5. Create commit pointing to new tree
  const commitMsg = message || `Import ${entries.length} file${entries.length > 1 ? 's' : ''}`;
  const newCommit = await ghApi(token, `/git/commits`, {
    method: 'POST',
    body: JSON.stringify({
      message: commitMsg,
      tree: tree.sha,
      parents: [parentCommitSha],
    }),
  });

  // 6. Fast-forward branch ref
  await ghApi(token, `/git/refs/heads/${BRANCH}`, {
    method: 'PATCH',
    body: JSON.stringify({ sha: newCommit.sha }),
  });

  const shas = {};
  blobs.forEach(b => { shas[b.filename] = b.sha; });
  return json({ ok: true, commit: newCommit.sha, shas });
}

async function handleDeleteFile(token, filename, password, editPassword) {
  if (editPassword && password !== editPassword) return err('Unauthorized', 401);

  const path = resolveGhPath(filename);

  // Get SHA
  const existing = await ghApi(token, `/contents/${path}`);

  await ghApi(token, `/contents/${path}`, {
    method: 'DELETE',
    body: JSON.stringify({
      message: `Delete ${filename}`,
      sha: existing.sha,
      branch: BRANCH,
    }),
  });

  return json({ ok: true });
}

// ── Main handler ────────────────────────────────────────────────────────────

export default {
  async fetch(request, env) {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS });
    }

    const token = env.GITHUB_TOKEN;
    if (!token) return err('GITHUB_TOKEN not configured', 500);

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      // GET /vault — list all files
      if (request.method === 'GET' && path === '/vault') {
        return await handleGetVault(token);
      }

      // PUT /vault/:filename — create or update
      const putMatch = path.match(/^\/vault\/(.+\.(?:md|json))$/);
      if (request.method === 'PUT' && putMatch) {
        const body = await request.json();
        return await handlePutFile(token, putMatch[1], body.content, body.password, env.EDIT_PASSWORD);
      }

      // POST /vault/batch — bundle many files in a single commit
      if (request.method === 'POST' && path === '/vault/batch') {
        const body = await request.json();
        return await handleBatch(token, body.files, body.password, env.EDIT_PASSWORD, body.message);
      }

      // DELETE /vault/:filename — delete
      const delMatch = path.match(/^\/vault\/(.+\.(?:md|json))$/);
      if (request.method === 'DELETE' && delMatch) {
        const body = await request.json();
        return await handleDeleteFile(token, delMatch[1], body.password, env.EDIT_PASSWORD);
      }

      return err('Not found', 404);
    } catch (e) {
      return err(e.message, 502);
    }
  },
};
