import JSZip from 'jszip';
import matter from './matter.js';
import { normalizeNode } from './graph.js';

const MEMORY_LIMIT_BYTES = 20 * 1024 * 1024; // 20 MB

// Internal ZIP state
let _zip = null;
let _dirty = false;

export function getZip() { return _zip; }
export function isZipDirty() { return _dirty; }
export function markZipClean() { _dirty = false; }

// ---------------------------------------------------------------------------
// loadZip — single-pass JSZip scan (all content in memory after loadAsync)
// ---------------------------------------------------------------------------
export async function loadZip(file, onProgress) {
  _zip = await JSZip.loadAsync(file);
  _dirty = false;

  // Memory check
  const totalBytes = Object.values(_zip.files)
    .reduce((a, f) => a + (f._data?.uncompressedSize || 0), 0);
  if (totalBytes > MEMORY_LIMIT_BYTES) {
    const mb = (totalBytes / 1024 / 1024).toFixed(1);
    console.warn(`[loadZip] ZIP content is ${mb} MB — exceeds 20 MB threshold`);
    // Surface warning to caller via return value, not throw
    // (user may still want to proceed)
  }

  const mdEntries = Object.entries(_zip.files)
    .filter(([name, f]) => !f.dir && name.toLowerCase().endsWith('.md'));
  const total = mdEntries.length;
  let loaded = 0;
  const nodes = [];
  const warnings = [];
  const rawContentCache = new Map();

  for (const [name, zipFile] of mdEntries) {
    const text = await zipFile.async('string');
    try {
      const { data, content } = matter(text);
      nodes.push(normalizeNode({ ...data, markdown_body: content, _handle: null, _filename: name }));
    } catch (e) {
      console.error('[loadZip] Failed to parse', name, ':', e);
      rawContentCache.set(name, text);
      warnings.push({ type: 'parse_error', file: name, detail: e.message });
    }
    onProgress?.(++loaded, total);
  }

  return { nodes, warnings, rawContentCache, totalBytes };
}

// ---------------------------------------------------------------------------
// initFromFiles — create an in-memory ZIP from { filename: content } map
// Used by vault loading so writes work identically to ZIP mode.
// ---------------------------------------------------------------------------
export function initFromFiles(files) {
  _zip = new JSZip();
  _dirty = false;
  for (const [name, content] of Object.entries(files)) {
    _zip.file(name, content);
  }
}

// ---------------------------------------------------------------------------
// writeNodeToZip — update or create a file in the in-memory ZIP
// ---------------------------------------------------------------------------
export function writeNodeToZip(node) {
  if (!_zip) throw new Error('No ZIP loaded');
  const { _handle, _filename, markdown_body, ...frontmatterData } = node;
  const data = { ...frontmatterData };
  if (!data.color) delete data.color;
  const serialized = matter.stringify(markdown_body || '', data);
  const filename = node._filename || (node.id + '.md');
  _zip.file(filename, serialized);
  _dirty = true;
}

// ---------------------------------------------------------------------------
// deleteNodeFromZip — remove a file from the in-memory ZIP
// ---------------------------------------------------------------------------
export function deleteNodeFromZip(nodeId) {
  if (!_zip) throw new Error('No ZIP loaded');
  _zip.remove(nodeId + '.md');
  _dirty = true;
}

// ---------------------------------------------------------------------------
// exportZip — trigger browser download of the current ZIP
// ---------------------------------------------------------------------------
export async function exportZip(filename = 'knowledge-graph.zip') {
  if (!_zip) throw new Error('No ZIP loaded');
  const blob = await _zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  _dirty = false;
}
