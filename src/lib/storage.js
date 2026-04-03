/**
 * storage.js — unified interface for all file operations.
 * Phase 1a: folder mode only.
 * Phase 1b: ZIP routing added. renameNode() orchestration added.
 *
 * ALL components import only this file, never fs.js or zip.js directly.
 */
import matter from './matter.js';
import { verifyYamlRoundTrip, normalizeNode } from './graph.js';
import { scanFolder, writeNodeToFolder, deleteNodeFromFolder } from './fs.js';
import {
  loadZip as loadZipFile,
  initFromFiles,
  writeNodeToZip,
  deleteNodeFromZip,
  exportZip as exportZipFile,
  isZipDirty as zipDirtyState,
} from './zip.js';
import { syncVaultFile, removeVaultFile } from './vaultLoader.js';
import { isConfigured as ghConfigured, commitFile as ghCommit, deleteFile as ghDelete } from './github.js';

// Internal state (set by graph_store when opening a folder or ZIP)
let _dirHandle = null;
let _storageMode = 'folder'; // 'folder' | 'zip'

export function setDirHandle(handle) {
  _dirHandle = handle;
}

export function setStorageMode(mode) {
  _storageMode = mode;
}

export function getMode() {
  return _storageMode;
}

// ---------------------------------------------------------------------------
// readAllNodes — returns { nodes, warnings, rawContentCache }
// ---------------------------------------------------------------------------
export async function readAllNodes(onProgress) {
  if (_storageMode === 'folder') {
    if (!_dirHandle) throw new Error('No folder open');
    return scanFolder(_dirHandle, onProgress);
  }
  throw new Error('readAllNodes: ZIP mode uses loadZip() directly');
}

// ---------------------------------------------------------------------------
// loadZip — delegates to zip.js, returns { nodes, warnings, rawContentCache, totalBytes }
// ---------------------------------------------------------------------------
export async function loadZip(file, onProgress) {
  return loadZipFile(file, onProgress);
}

// ---------------------------------------------------------------------------
// loadVaultFiles — parse { filename: rawString } map, init in-memory ZIP
// ---------------------------------------------------------------------------
export function loadVaultFiles(files) {
  // Initialize in-memory ZIP with vault content (enables writes like ZIP mode)
  initFromFiles(files);

  const nodes = [];
  const warnings = [];
  const rawContentCache = new Map();

  for (const [name, text] of Object.entries(files)) {
    try {
      const { data, content } = matter(text);
      nodes.push(normalizeNode({ ...data, markdown_body: content, _handle: null, _filename: name }));
    } catch (e) {
      console.error('[loadVaultFiles] Failed to parse', name, ':', e);
      rawContentCache.set(name, text);
      warnings.push({ type: 'parse_error', file: name, detail: e.message });
    }
  }
  return { nodes, warnings, rawContentCache };
}

// ---------------------------------------------------------------------------
// writeNode — verifyYamlRoundTrip then write to folder or ZIP
// ---------------------------------------------------------------------------
export async function writeNode(node) {
  const { _handle, _filename, markdown_body, ...frontmatterData } = node;

  // color: omit from YAML when not set (must delete, not set to undefined — js-yaml 3 throws on undefined)
  const data = { ...frontmatterData };
  if (!data.color) delete data.color;

  const serialized = matter.stringify(markdown_body || '', data);

  // Verify round-trip before writing
  verifyYamlRoundTrip(node, serialized);

  if (_storageMode === 'folder') {
    if (!_dirHandle) throw new Error('No folder open');
    await writeNodeToFolder(node, _dirHandle);
    return;
  }

  if (_storageMode === 'zip' || _storageMode === 'vault') {
    writeNodeToZip(node);
    if (_storageMode === 'vault') {
      syncVaultFile(node._filename, serialized);
      // Async GitHub sync (fire-and-forget; errors are logged, not thrown)
      if (ghConfigured()) {
        ghCommit(node._filename, serialized).catch(e =>
          console.error('[storage] GitHub commit failed:', e),
        );
      }
    }
    return;
  }

  throw new Error(`Unknown storage mode: ${_storageMode}`);
}

// ---------------------------------------------------------------------------
// deleteNode
// ---------------------------------------------------------------------------
export async function deleteNode(nodeId) {
  if (_storageMode === 'folder') {
    if (!_dirHandle) throw new Error('No folder open');
    await deleteNodeFromFolder(nodeId, _dirHandle);
    return;
  }

  if (_storageMode === 'zip' || _storageMode === 'vault') {
    deleteNodeFromZip(nodeId);
    if (_storageMode === 'vault') {
      removeVaultFile(nodeId + '.md');
      if (ghConfigured()) {
        ghDelete(nodeId + '.md').catch(e =>
          console.error('[storage] GitHub delete failed:', e),
        );
      }
    }
    return;
  }

  throw new Error(`Unknown storage mode: ${_storageMode}`);
}

// ---------------------------------------------------------------------------
// renameNode — multi-file orchestration with snapshot/rollback
// Returns { renamedNode, updatedDependents }
// ---------------------------------------------------------------------------
export async function renameNode(oldId, newId, newLabel, allNodes) {
  if (_storageMode !== 'folder') {
    // ZIP: pure in-memory rename (no file handle refresh needed)
    return renameNodeInZip(oldId, newId, newLabel, allNodes);
  }
  if (!_dirHandle) throw new Error('No folder open');
  return renameNodeInFolder(oldId, newId, newLabel, allNodes, _dirHandle);
}

async function renameNodeInFolder(oldId, newId, newLabel, allNodes, dirHandle) {
  const node = allNodes.find(n => n.id === oldId);
  if (!node) throw new Error(`Node '${oldId}' not found`);

  // Find all dependents (nodes that have a relation targeting oldId)
  const dependents = allNodes.filter(
    n => n.id !== oldId && n.relations.some(r => r.target === oldId)
  );

  // Snapshot: save current serialized content of all affected files
  const snapshots = new Map();
  const snapshotNode = async (n) => {
    const file = await (await dirHandle.getFileHandle(n._filename)).getFile();
    snapshots.set(n._filename, await file.text());
  };
  await snapshotNode(node);
  for (const dep of dependents) await snapshotNode(dep);

  const renamedNode = {
    ...node,
    id: newId,
    label: newLabel,
    updatedAt: new Date().toISOString(),
    _filename: newId + '.md',
  };

  const updatedDependents = dependents.map(dep => ({
    ...dep,
    relations: dep.relations.map(r => r.target === oldId ? { ...r, target: newId } : r),
    updatedAt: new Date().toISOString(),
  }));

  let newFileCreated = false;
  try {
    // Step 1: write renamed node as new file
    await writeNodeToFolder(renamedNode, dirHandle);
    newFileCreated = true;

    // Step 2: rewrite dependents
    for (const dep of updatedDependents) {
      await writeNodeToFolder(dep, dirHandle);
    }

    // Step 3: delete old file
    await deleteNodeFromFolder(oldId, dirHandle);

    // Step 4: refresh handle on renamed node
    const freshHandle = await dirHandle.getFileHandle(newId + '.md');
    renamedNode._handle = freshHandle;

    return { renamedNode, updatedDependents };
  } catch (e) {
    // Rollback: restore snapshots
    if (newFileCreated) {
      try { await dirHandle.removeEntry(newId + '.md'); } catch (_) { /* best effort */ }
    }
    for (const [filename, content] of snapshots) {
      try {
        const fh = await dirHandle.getFileHandle(filename, { create: true });
        const w = await fh.createWritable();
        await w.write(content);
        await w.close();
      } catch (_) { /* best effort */ }
    }
    throw e;
  }
}

function renameNodeInZip(oldId, newId, newLabel, allNodes) {
  const node = allNodes.find(n => n.id === oldId);
  if (!node) throw new Error(`Node '${oldId}' not found`);

  const dependents = allNodes.filter(
    n => n.id !== oldId && n.relations.some(r => r.target === oldId)
  );

  const renamedNode = {
    ...node,
    id: newId,
    label: newLabel,
    updatedAt: new Date().toISOString(),
    _filename: newId + '.md',
    _handle: null,
  };

  const updatedDependents = dependents.map(dep => ({
    ...dep,
    relations: dep.relations.map(r => r.target === oldId ? { ...r, target: newId } : r),
    updatedAt: new Date().toISOString(),
  }));

  writeNodeToZip(renamedNode);
  for (const dep of updatedDependents) writeNodeToZip(dep);
  deleteNodeFromZip(oldId);

  return { renamedNode, updatedDependents };
}

// ---------------------------------------------------------------------------
// exportZip — triggers download (ZIP mode only)
// ---------------------------------------------------------------------------
export async function exportZip(filename) {
  if (_storageMode !== 'zip') throw new Error('exportZip only available in ZIP mode');
  await exportZipFile(filename);
}

// ---------------------------------------------------------------------------
// isZipDirty
// ---------------------------------------------------------------------------
export function isZipDirty() {
  if (_storageMode !== 'zip') return false;
  return zipDirtyState();
}
