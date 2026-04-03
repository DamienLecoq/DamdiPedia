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
const VAULT_PREFIX = 'src/vaults/IT';
const BRANCH = 'main';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
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

// ── Route handlers ──────────────────────────────────────────────────────────

async function handleGetVault(token) {
  // Get full repo tree
  const tree = await ghApi(token, `/git/trees/${BRANCH}?recursive=1`);

  const vaultBlobs = tree.tree.filter(
    (f) => f.type === 'blob' && f.path.startsWith(VAULT_PREFIX + '/') && f.path.endsWith('.md'),
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

  const path = `${VAULT_PREFIX}/${filename}`;

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

async function handleDeleteFile(token, filename, password, editPassword) {
  if (editPassword && password !== editPassword) return err('Unauthorized', 401);

  const path = `${VAULT_PREFIX}/${filename}`;

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
      const putMatch = path.match(/^\/vault\/(.+\.md)$/);
      if (request.method === 'PUT' && putMatch) {
        const body = await request.json();
        return await handlePutFile(token, putMatch[1], body.content, body.password, env.EDIT_PASSWORD);
      }

      // DELETE /vault/:filename — delete
      const delMatch = path.match(/^\/vault\/(.+\.md)$/);
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
