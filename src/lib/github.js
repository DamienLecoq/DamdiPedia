/**
 * github.js — vault sync via Cloudflare Worker proxy.
 *
 * The Worker holds the GitHub PAT server-side. Write/delete operations
 * are authorized by the same VITE_EDIT_PASSWORD used for the UI lock.
 * No token is needed on the client — works on every device out of the box.
 */

const PROXY_URL = import.meta.env.VITE_GITHUB_PROXY_URL || '';

// In-memory SHA cache: { filename: sha }
let _shaCache = {};

export function isConfigured() { return !!PROXY_URL; }

// ── Fetch all vault .md files ────────────────────────────────────────────────

export async function fetchVaultFiles() {
  if (!PROXY_URL) throw new Error('GitHub proxy not configured');

  const res = await fetch(`${PROXY_URL}/vault`);
  if (!res.ok) throw new Error(`Proxy error ${res.status}`);

  const { files, shas } = await res.json();
  _shaCache = shas || {};
  return files;
}

// ── Commit a file (create or update) ─────────────────────────────────────────

export async function commitFile(filename, content) {
  if (!PROXY_URL) return;

  const res = await fetch(`${PROXY_URL}/vault/${filename}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content,
      password: import.meta.env.VITE_EDIT_PASSWORD || '',
    }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Proxy error ${res.status}`);
  }

  const { sha } = await res.json();
  if (sha) _shaCache[filename] = sha;
}

// ── Batch commit: bundle multiple files in a single GitHub commit ────────────

export async function commitFiles(filesMap, message) {
  if (!PROXY_URL) return;

  const res = await fetch(`${PROXY_URL}/vault/batch`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      files: filesMap,
      message,
      password: import.meta.env.VITE_EDIT_PASSWORD || '',
    }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Proxy error ${res.status}`);
  }

  const { shas } = await res.json();
  if (shas) Object.assign(_shaCache, shas);
}

// ── Delete a file ────────────────────────────────────────────────────────────

export async function deleteFile(filename) {
  if (!PROXY_URL) return;

  const res = await fetch(`${PROXY_URL}/vault/${filename}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      password: import.meta.env.VITE_EDIT_PASSWORD || '',
    }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Proxy error ${res.status}`);
  }

  delete _shaCache[filename];
}
