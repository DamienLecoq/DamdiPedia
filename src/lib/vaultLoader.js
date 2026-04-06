/**
 * vaultLoader.js — single global vault + named views.
 *
 * Built-in .md files live in /src/vaults/ (flat, no sub-folders).
 * User-created nodes are stored in one global localStorage key.
 * "Views" are named category-filter presets (not separate data stores).
 */

// Import node .md files as raw strings from the nodes/ sub-folder.
// vite.config.js treats .md as raw via the raw plugin or assetsInclude.
const _raw = import.meta.glob('/src/vaults/nodes/*.md', { eager: true, import: 'default' });

const GLOBAL_CONTENT_KEY = 'damdipedia:global-content';
const VIEWS_KEY          = 'damdipedia:user-views';

// ── Built-in view presets ─────────────────────────────────────────────────────

export const BUILTIN_VIEWS = [
  { name: 'Tout',           icon: '🌐', categories: null,                                  builtin: true },
  { name: 'Développement',  icon: '💻', categories: ['langage', 'framework', 'bdd'],       builtin: true },
  { name: 'Infrastructure', icon: '🚀', categories: ['logiciel', 'os', 'service'],         builtin: true },
  { name: 'Réseau',         icon: '📡', categories: ['protocole'],                         builtin: true },
  { name: 'Concepts',       icon: '🧠', categories: ['concept'],                           builtin: true },
  { name: 'Matériel',       icon: '🖥️', categories: ['materiel'],                          builtin: true },
];

// ── Global built-in files (all vault folders merged) ─────────────────────────

export function getGlobalBuiltInFiles() {
  const files = {};
  for (const [path, content] of Object.entries(_raw)) {
    const match = path.match(/\/src\/vaults\/nodes\/([^/]+\.md)$/);
    if (match) files[match[1]] = content;
  }
  return files;
}

// ── Global user content (single localStorage pool) ───────────────────────────

function _readGlobal() {
  try { return JSON.parse(localStorage.getItem(GLOBAL_CONTENT_KEY) || '{}'); }
  catch { return {}; }
}

export function getGlobalUserContent() {
  return _readGlobal();
}

/** Called by storage.js after every node write in vault mode */
export function syncVaultFile(filename, content) {
  const stored = _readGlobal();
  stored[filename] = content;
  localStorage.setItem(GLOBAL_CONTENT_KEY, JSON.stringify(stored));
}

/** Called by storage.js after every node deletion in vault mode */
export function removeVaultFile(filename) {
  const stored = _readGlobal();
  delete stored[filename];
  localStorage.setItem(GLOBAL_CONTENT_KEY, JSON.stringify(stored));
}

// ── User views ────────────────────────────────────────────────────────────────

export function getUserViews() {
  try { return JSON.parse(localStorage.getItem(VIEWS_KEY) || '[]'); }
  catch { return []; }
}

export function saveUserView({ name, icon, categories }) {
  const list = getUserViews().filter(v => v.name !== name);
  localStorage.setItem(VIEWS_KEY, JSON.stringify([...list, { name, icon, categories }]));
}

export function deleteUserView(name) {
  const list = getUserViews().filter(v => v.name !== name);
  localStorage.setItem(VIEWS_KEY, JSON.stringify(list));
}

// ── One-time migration from old per-vault system ──────────────────────────────

export function migrateOldVaultContent() {
  try {
    const oldMeta = JSON.parse(localStorage.getItem('damdipedia:user-vaults') || '[]');
    if (!oldMeta.length) return;

    const global = _readGlobal();
    let migrated = false;

    for (const vault of oldMeta) {
      const oldKey = `damdipedia:vault-content:${vault.name}`;
      try {
        const content = JSON.parse(localStorage.getItem(oldKey) || '{}');
        for (const [filename, text] of Object.entries(content)) {
          if (!global[filename]) { global[filename] = text; migrated = true; }
        }
        localStorage.removeItem(oldKey);
      } catch { /* best-effort */ }
    }

    if (migrated) localStorage.setItem(GLOBAL_CONTENT_KEY, JSON.stringify(global));
    localStorage.removeItem('damdipedia:user-vaults');
  } catch { /* best-effort */ }
}
