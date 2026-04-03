/**
 * github.js — GitHub Contents API client for vault sync.
 *
 * Reads/writes .md files in src/vaults/ of the configured repo.
 * Token is stored in localStorage; SHA cache kept in memory for efficient updates.
 */

const REPO_OWNER = 'DamienLecoq';
const REPO_NAME  = 'DamdiPedia';
const VAULT_PREFIX = 'src/vaults/';
const DEFAULT_VAULT_DIR = 'IT';
const BRANCH = 'main';

const TOKEN_KEY = 'damdipedia:github-token';

// In-memory SHA cache: { filename: sha }
let _shaCache = {};

// ── Token management ─────────────────────────────────────────────────────────

export function getToken()  { return localStorage.getItem(TOKEN_KEY) || ''; }
export function setToken(t) { localStorage.setItem(TOKEN_KEY, t.trim()); }
export function removeToken() { localStorage.removeItem(TOKEN_KEY); _shaCache = {}; }
export function isConfigured() { return !!getToken(); }

// ── API helper ───────────────────────────────────────────────────────────────

async function api(endpoint, options = {}) {
  const token = getToken();
  if (!token) throw new Error('No GitHub token configured');

  const res = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}${endpoint}`,
    {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        ...options.headers,
      },
    },
  );

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`GitHub API ${res.status}: ${body}`);
  }
  return res.json();
}

// ── UTF-8–safe base64 ────────────────────────────────────────────────────────

function utf8ToBase64(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

// ── Fetch all vault .md files ────────────────────────────────────────────────

export async function fetchVaultFiles() {
  // Get full repo tree in one API call
  const tree = await api(`/git/trees/${BRANCH}?recursive=1`);

  const vaultBlobs = tree.tree.filter(
    f => f.type === 'blob' && f.path.startsWith(VAULT_PREFIX) && f.path.endsWith('.md'),
  );

  _shaCache = {};
  const contents = {};

  // Fetch raw content in parallel (raw.githubusercontent.com — no rate-limit hit)
  await Promise.all(
    vaultBlobs.map(async (file) => {
      try {
        const res = await fetch(
          `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${file.path}`,
        );
        if (!res.ok) return;
        const text = await res.text();
        const filename = file.path.split('/').pop();
        contents[filename] = text;
        _shaCache[filename] = file.sha;
      } catch { /* skip individual file errors */ }
    }),
  );

  return contents;
}

// ── Get SHA (from cache or API) ──────────────────────────────────────────────

async function getFileSha(filename) {
  if (_shaCache[filename]) return _shaCache[filename];

  try {
    const data = await api(`/contents/${VAULT_PREFIX}${DEFAULT_VAULT_DIR}/${filename}`);
    _shaCache[filename] = data.sha;
    return data.sha;
  } catch {
    return null;
  }
}

// ── Commit a file (create or update) ─────────────────────────────────────────

export async function commitFile(filename, content) {
  const path = `${VAULT_PREFIX}${DEFAULT_VAULT_DIR}/${filename}`;

  const body = {
    message: `Update ${filename}`,
    content: utf8ToBase64(content),
    branch: BRANCH,
  };

  const sha = await getFileSha(filename);
  if (sha) body.sha = sha;

  const result = await api(`/contents/${path}`, {
    method: 'PUT',
    body: JSON.stringify(body),
  });

  // Update cache with new SHA
  _shaCache[filename] = result.content.sha;
  return result;
}

// ── Delete a file ────────────────────────────────────────────────────────────

export async function deleteFile(filename) {
  const path = `${VAULT_PREFIX}${DEFAULT_VAULT_DIR}/${filename}`;

  const sha = await getFileSha(filename);
  if (!sha) throw new Error(`File ${filename} not found on GitHub`);

  await api(`/contents/${path}`, {
    method: 'DELETE',
    body: JSON.stringify({
      message: `Delete ${filename}`,
      sha,
      branch: BRANCH,
    }),
  });

  delete _shaCache[filename];
}
