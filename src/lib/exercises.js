/**
 * exercises.js — exercise sheet persistence.
 *
 * Each exercise sheet is stored in:
 * 1. localStorage (fast access, key: dpedia_ex_{id})
 * 2. Vault system (localStorage global-content, key: _ex_{id}.json)
 * 3. GitHub (via proxy worker, fire-and-forget)
 */

import { syncVaultFile, removeVaultFile } from './vaultLoader.js';
import { isConfigured as ghConfigured, commitFile as ghCommit, deleteFile as ghDelete } from './github.js';

const STORAGE_PREFIX = 'dpedia_ex_';
const VAULT_FILE_PREFIX = '_ex_';

function vaultFilename(id) {
  return `${VAULT_FILE_PREFIX}${id}.json`;
}

// ── Save ────────────────────────────────────────────────────────────────────
export function saveExerciseSheet(sheet) {
  const key = STORAGE_PREFIX + sheet.id;
  const content = JSON.stringify(sheet);
  localStorage.setItem(key, content);

  // Sync to vault
  const filename = vaultFilename(sheet.id);
  syncVaultFile(filename, content);

  // Sync to GitHub (fire-and-forget)
  if (ghConfigured()) {
    ghCommit(filename, content).catch(e =>
      console.error('[exercises] GitHub commit failed:', e),
    );
  }
}

// ── Load one ────────────────────────────────────────────────────────────────
export function loadExerciseSheet(id) {
  const raw = localStorage.getItem(STORAGE_PREFIX + id);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

// ── Delete ──────────────────────────────────────────────────────────────────
export function deleteExerciseSheet(id) {
  localStorage.removeItem(STORAGE_PREFIX + id);

  // Remove from vault
  const filename = vaultFilename(id);
  removeVaultFile(filename);

  // Remove from GitHub (fire-and-forget)
  if (ghConfigured()) {
    ghDelete(filename).catch(e =>
      console.error('[exercises] GitHub delete failed:', e),
    );
  }
}

// ── List all (from localStorage) ────────────────────────────────────────────
export function listAllExerciseSheets() {
  const sheets = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.startsWith(STORAGE_PREFIX)) continue;
    try {
      const sheet = JSON.parse(localStorage.getItem(key));
      sheets.push(sheet);
    } catch { /* skip corrupt entries */ }
  }
  return sheets.sort((a, b) => (b.generatedAt || '').localeCompare(a.generatedAt || ''));
}

// ── List for a specific node ────────────────────────────────────────────────
export function listExerciseSheetsForNode(nodeId) {
  return listAllExerciseSheets().filter(s => s.nodeId === nodeId);
}

// ── Sync exercises from vault files (called during GitHub sync) ─────────────
// Takes the merged vault { filename: content } map and populates localStorage.
export function syncExercisesFromVault(vaultFiles) {
  let count = 0;
  for (const [filename, content] of Object.entries(vaultFiles)) {
    if (!filename.startsWith(VAULT_FILE_PREFIX) || !filename.endsWith('.json')) continue;
    try {
      const sheet = JSON.parse(content);
      if (sheet && sheet.id) {
        localStorage.setItem(STORAGE_PREFIX + sheet.id, content);
        count++;
      }
    } catch { /* skip corrupt */ }
  }
  return count;
}

// ── Build a unique ID for a new sheet ────────────────────────────────────────
export function makeSheetId(nodeId) {
  const ts = new Date().toISOString().replace(/[:.]/g, '-');
  return `${nodeId}_${ts}`;
}
