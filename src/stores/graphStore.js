import { create } from 'zustand';
import * as storage from '../lib/storage.js';
import { buildGraph, buildLinks, refreshWarnings, normalizeNode } from '../lib/graph.js';
import { slugify } from '../lib/slugify.js';
import { saveHandleToIDB } from '../lib/fs.js';
import { useUiStore } from './uiStore.js';
import { getGlobalBuiltInFiles, getGlobalUserContent, migrateOldVaultContent } from '../lib/vaultLoader.js';
import { isConfigured as ghConfigured, fetchVaultFiles } from '../lib/github.js';
import { syncExercisesFromVault } from '../lib/exercises.js';

export const useGraphStore = create((set, get) => ({
  // ── State ─────────────────────────────────────────────────────────────────
  nodes: [],
  links: [],
  clusters: [],
  warnings: [],
  rawContentCache: new Map(),
  globalLayoutCache: null,
  selectedNodeId: null,
  dirHandle: null,
  storageMode: null,
  zipDirty: false,
  scanProgress: { loaded: 0, total: 0, scanning: false },

  // ── loadDirectory ──────────────────────────────────────────────────────────
  loadDirectory: async (dirHandle) => {
    storage.setDirHandle(dirHandle);
    storage.setStorageMode('folder');
    await saveHandleToIDB(dirHandle);
    set({ dirHandle, storageMode: 'folder', zipDirty: false, scanProgress: { loaded: 0, total: 0, scanning: true } });
    try {
      const { nodes: raw, warnings: scanW, rawContentCache } = await storage.readAllNodes(
        (loaded, total) => set(s => ({ scanProgress: { ...s.scanProgress, loaded, total } }))
      );
      const { nodes, links, clusters, warnings: graphW } = buildGraph(raw);
      set({ nodes, links, clusters, warnings: [...scanW, ...graphW], rawContentCache, globalLayoutCache: null, scanProgress: { loaded: 0, total: 0, scanning: false } });
    } catch (e) {
      set({ scanProgress: { loaded: 0, total: 0, scanning: false } });
      throw e;
    }
  },

  // ── loadGlobalVault — loads all built-in content + user notes into a single pool ──
  loadGlobalVault: () => {
    migrateOldVaultContent();
    const files = { ...getGlobalBuiltInFiles(), ...getGlobalUserContent() };
    storage.setStorageMode('vault');
    const { nodes: raw, warnings: scanW, rawContentCache } = storage.loadVaultFiles(files);
    const { nodes, links, clusters, warnings: graphW } = buildGraph(raw);
    set({ nodes, links, clusters, warnings: [...scanW, ...graphW], rawContentCache, globalLayoutCache: null, dirHandle: null, storageMode: 'vault', zipDirty: false, scanProgress: { loaded: 0, total: 0, scanning: false } });
  },

  // ── syncFromGitHub — fetch vault files from GitHub and refresh graph ───────
  syncFromGitHub: async () => {
    if (!ghConfigured()) return;
    try {
      const ghFiles = await fetchVaultFiles();

      // Merge: built-in < localStorage < GitHub (source of truth)
      const builtIn = getGlobalBuiltInFiles();
      const userContent = getGlobalUserContent();
      const merged = { ...builtIn, ...userContent, ...ghFiles };

      storage.setStorageMode('vault');
      const { nodes: raw, warnings: scanW, rawContentCache } = storage.loadVaultFiles(merged);
      syncExercisesFromVault(merged);
      const { nodes, links, clusters, warnings: graphW } = buildGraph(raw);
      set({
        nodes, links, clusters,
        warnings: [...scanW, ...graphW],
        rawContentCache,
        globalLayoutCache: null,
        dirHandle: null,
        storageMode: 'vault',
        zipDirty: false,
      });
    } catch (e) {
      console.error('[syncFromGitHub]', e);
      // Silent failure — keep using bundled/localStorage data
    }
  },

  // ── loadZip ────────────────────────────────────────────────────────────────
  loadZip: async (file) => {
    storage.setStorageMode('zip');
    set({ dirHandle: null, storageMode: 'zip', zipDirty: false, scanProgress: { loaded: 0, total: 0, scanning: true } });
    try {
      const { nodes: raw, warnings: scanW, rawContentCache, totalBytes } = await storage.loadZip(
        file,
        (loaded, total) => set(s => ({ scanProgress: { ...s.scanProgress, loaded, total } }))
      );
      const { nodes, links, clusters, warnings: graphW } = buildGraph(raw);
      const LIMIT = 20 * 1024 * 1024;
      const memW = totalBytes > LIMIT
        ? [{ type: 'memory_warning', file: '', detail: `ZIP is ${(totalBytes / 1024 / 1024).toFixed(1)} MB — exceeds 20 MB.` }]
        : [];
      set({ nodes, links, clusters, warnings: [...memW, ...scanW, ...graphW], rawContentCache, globalLayoutCache: null, scanProgress: { loaded: 0, total: 0, scanning: false } });
    } catch (e) {
      set({ scanProgress: { loaded: 0, total: 0, scanning: false } });
      throw e;
    }
  },

  // ── exportZip ─────────────────────────────────────────────────────────────
  exportZip: async () => {
    await storage.exportZip();
    set({ zipDirty: false });
  },

  // ── refreshGraph ──────────────────────────────────────────────────────────
  refreshGraph: async () => {
    const { dirHandle } = get();
    if (!dirHandle) return;
    await get().loadDirectory(dirHandle);
  },

  // ── selectNode ────────────────────────────────────────────────────────────
  selectNode: (nodeId) => set({ selectedNodeId: nodeId }),

  // ── createNode ────────────────────────────────────────────────────────────
  createNode: async (formData) => {
    const { nodes } = get();
    const { addToast } = useUiStore.getState();

    const baseId = slugify(formData.label || 'unnamed');
    let id = baseId;
    let suffix = 2;
    const existingIds = new Set(nodes.map(n => n.id));
    while (existingIds.has(id)) id = `${baseId}-${suffix++}`;

    if (id !== baseId) {
      addToast(`ID '${baseId}' already exists — saved as '${id}'`, 'warning');
    }

    const node = normalizeNode({
      ...formData,
      id,
      _filename: id + '.md',
      _handle: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    await storage.writeNode(node);
    get().addNodeInMemory(node);
    addToast(`Node '${node.label}' created.`, 'success');
    return node;
  },

  // ── saveEditorNode — create or update (with optional rename) ──────────────
  saveEditorNode: async (formData, originalNodeId) => {
    const { nodes } = get();
    const { addToast } = useUiStore.getState();

    if (originalNodeId === null || originalNodeId === undefined) {
      // CREATE
      return get().createNode(formData);
    }

    const oldNode = nodes.find(n => n.id === originalNodeId);
    if (!oldNode) throw new Error(`Node '${originalNodeId}' not found.`);

    const newSlug = slugify(formData.label || oldNode.label);

    if (newSlug !== originalNodeId) {
      // RENAME + UPDATE
      const existingIds = new Set(nodes.filter(n => n.id !== originalNodeId).map(n => n.id));
      if (existingIds.has(newSlug)) {
        throw new Error(`ID '${newSlug}' already exists. Choose a different label.`);
      }

      // Step 1: rename the file
      const { renamedNode, updatedDependents } = await storage.renameNode(
        originalNodeId, newSlug, formData.label, nodes
      );

      // Step 2: write all updated fields on the renamed node
      const finalNode = normalizeNode({
        ...renamedNode,
        ...formData,
        id: newSlug,
        label: formData.label,
        updatedAt: new Date().toISOString(),
      });
      await storage.writeNode(finalNode);

      // Update memory
      set(s => {
        const newNodes = s.nodes.map(n => {
          if (n.id === originalNodeId) return finalNode;
          const dep = updatedDependents.find(d => d.id === n.id);
          return dep || n;
        });
        const links = buildLinks(newNodes);
        const { clusters } = buildGraph(newNodes);
        const warnings = refreshWarnings(newNodes, s.warnings);
        const zipDirty = s.storageMode === 'zip' ? true : s.zipDirty;
        return { nodes: newNodes, links, clusters, warnings, globalLayoutCache: null, zipDirty, selectedNodeId: newSlug };
      });

      addToast(`Renamed to '${formData.label}'.`, 'success');
    } else {
      // UPDATE ONLY
      const updatedNode = normalizeNode({
        ...oldNode,
        ...formData,
        id: originalNodeId,
        updatedAt: new Date().toISOString(),
      });
      await storage.writeNode(updatedNode);
      get().updateNodeInMemory(updatedNode);
      addToast('Changes saved.', 'success');
    }
  },

  // ── deleteNode — cascade update dependents, then delete ───────────────────
  deleteNode: async (nodeId) => {
    const { nodes } = get();
    const { addToast } = useUiStore.getState();

    const dependents = nodes.filter(n => n.id !== nodeId && n.relations.some(r => r.target === nodeId));

    // Best-effort cascade: remove relations pointing to deleted node
    for (const dep of dependents) {
      const cleaned = {
        ...dep,
        relations: dep.relations.filter(r => r.target !== nodeId),
        updatedAt: new Date().toISOString(),
      };
      try {
        await storage.writeNode(cleaned);
        // updateNodeInMemory called after delete below
      } catch (e) {
        console.error('[deleteNode] Cascade update failed for', dep.id, e);
      }
    }

    await storage.deleteNode(nodeId);
    get().removeNodeFromMemory(nodeId);
    set({ selectedNodeId: null });

    addToast(`Node deleted.`, 'success');
  },

  // ── fixDanglingRelation — remove one broken relation ──────────────────────
  fixDanglingRelation: async (nodeId, relTarget) => {
    const { nodes, warnings } = get();
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;
    const cleaned = {
      ...node,
      relations: node.relations.filter(r => r.target !== relTarget),
      updatedAt: new Date().toISOString(),
    };
    await storage.writeNode(cleaned);
    get().updateNodeInMemory(cleaned);
    set({ warnings: refreshWarnings(get().nodes, warnings) });
  },

  // ── fixAllDanglingRelations — per spec: best-effort + toast ───────────────
  fixAllDanglingRelations: async () => {
    const { nodes, warnings } = get();
    const { addToast } = useUiStore.getState();
    const validIds = new Set(nodes.map(n => n.id));

    const affectedIds = [...new Set(
      warnings.filter(w => w.type === 'dangling_relation').map(w => w.file.replace('.md', ''))
    )];

    const results = { ok: [], fail: [] };
    for (const nodeId of affectedIds) {
      const node = nodes.find(n => n.id === nodeId);
      if (!node) continue;
      const cleaned = { ...node, relations: node.relations.filter(r => validIds.has(r.target)) };
      try {
        await storage.writeNode(cleaned);
        get().updateNodeInMemory(cleaned);
        results.ok.push(nodeId);
      } catch (e) {
        results.fail.push(nodeId);
      }
    }

    set({ warnings: refreshWarnings(get().nodes, get().warnings) });
    addToast(`Fixed: ${results.ok.length}. Failed: ${results.fail.length}.`, results.fail.length > 0 ? 'warning' : 'success');
  },

  // ── updateNodeInMemory — after single write ────────────────────────────────
  updateNodeInMemory: (updatedNode) => {
    set(s => {
      const nodes = s.nodes.map(n => n.id === updatedNode.id ? updatedNode : n);
      const links = buildLinks(nodes);
      const { clusters } = buildGraph(nodes);
      const warnings = refreshWarnings(nodes, s.warnings);
      const zipDirty = s.storageMode === 'zip' ? true : s.zipDirty;
      return { nodes, links, clusters, warnings, globalLayoutCache: null, zipDirty };
    });
  },

  // ── addNodeInMemory ───────────────────────────────────────────────────────
  addNodeInMemory: (newNode) => {
    set(s => {
      const nodes = [...s.nodes, newNode];
      const links = buildLinks(nodes);
      const { clusters } = buildGraph(nodes);
      const warnings = refreshWarnings(nodes, s.warnings);
      const zipDirty = s.storageMode === 'zip' ? true : s.zipDirty;
      return { nodes, links, clusters, warnings, globalLayoutCache: null, zipDirty };
    });
  },

  // ── removeNodeFromMemory ──────────────────────────────────────────────────
  removeNodeFromMemory: (nodeId) => {
    set(s => {
      const nodes = s.nodes.filter(n => n.id !== nodeId);
      const links = buildLinks(nodes);
      const { clusters } = buildGraph(nodes);
      const warnings = refreshWarnings(nodes, s.warnings);
      const zipDirty = s.storageMode === 'zip' ? true : s.zipDirty;
      return { nodes, links, clusters, warnings, globalLayoutCache: null, zipDirty };
    });
  },

  // ── setWarnings ───────────────────────────────────────────────────────────
  setWarnings: (warnings) => set({ warnings }),

  // ── setGlobalLayoutCache ──────────────────────────────────────────────────
  setGlobalLayoutCache: (cache) => set({ globalLayoutCache: cache }),
}));
