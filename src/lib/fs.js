import matter from './matter.js';
import { set, get } from 'idb-keyval';
import { normalizeNode } from './graph.js';

// ---------------------------------------------------------------------------
// IndexedDB handle persistence
// ---------------------------------------------------------------------------
export async function saveHandleToIDB(dirHandle) {
  await set('dirHandle', dirHandle);
}

export async function loadHandleFromIDB() {
  const saved = await get('dirHandle');
  if (!saved) return null;
  const perm = await saved.queryPermission({ mode: 'readwrite' });
  if (perm === 'granted') return saved;
  const req = await saved.requestPermission({ mode: 'readwrite' });
  if (req === 'granted') return saved;
  return null;
}

// ---------------------------------------------------------------------------
// Two-pass folder scan
// dirHandle.entries() returns a NEW independent AsyncIterableIterator each call
// ---------------------------------------------------------------------------
export async function scanFolder(dirHandle, onProgress) {
  // Pass 1: count .md files
  let total = 0;
  for await (const [name] of dirHandle.entries()) {
    if (name.toLowerCase().endsWith('.md')) total++;
  }

  // Pass 2: parse
  let loaded = 0;
  const nodes = [];
  const warnings = [];
  const rawContentCache = new Map();

  for await (const [name, handle] of dirHandle.entries()) {
    if (!name.toLowerCase().endsWith('.md')) continue;
    const text = await (await handle.getFile()).text();
    try {
      const { data, content } = matter(text);
      nodes.push(normalizeNode({ ...data, markdown_body: content, _handle: handle, _filename: name }));
    } catch (e) {
      console.error('[scanFolder] Failed to parse', name, ':', e);
      rawContentCache.set(name, text);
      warnings.push({ type: 'parse_error', file: name, detail: e.message });
    }
    loaded++;
    onProgress?.(loaded, total);
  }

  return { nodes, warnings, rawContentCache };
}

// ---------------------------------------------------------------------------
// Write a single node to its .md file in the folder
// ---------------------------------------------------------------------------
export async function writeNodeToFolder(node, dirHandle) {
  const { _handle, _filename, markdown_body, ...frontmatterData } = node;

  // color: omit from YAML when not set (delete, not undefined — js-yaml throws on undefined)
  const data = { ...frontmatterData };
  if (!data.color) delete data.color;

  const serialized = matter.stringify(markdown_body || '', data);

  const filename = node._filename || (node.id + '.md');
  const fileHandle = await dirHandle.getFileHandle(filename, { create: true });
  const writable = await fileHandle.createWritable();
  await writable.write(serialized);
  await writable.close();
}

// ---------------------------------------------------------------------------
// Delete a node's file from the folder
// ---------------------------------------------------------------------------
export async function deleteNodeFromFolder(nodeId, dirHandle) {
  const filename = nodeId + '.md';
  await dirHandle.removeEntry(filename);
}
