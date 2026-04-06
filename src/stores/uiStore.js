import { create } from 'zustand';

const EDIT_CODE = import.meta.env.VITE_EDIT_PASSWORD || null;

export const useUiStore = create((set, get) => ({
  // State
  currentView: 'graph',        // 'graph' | 'list' | 'dashboard' | 'health' | 'editor' | 'exercises'
  graphRenderMode: 'cluster',  // 'cluster' | 'global'
  aiPanelOpen: false,
  contextDepth: 2,
  activeFilters: { category: null, status: null, priority: null },
  editorDirty: false,
  computingLayout: false,
  editingNodeId: undefined,    // undefined = not in editor, null = creating new, string = editing existing
  toasts: [],
  showLinks: true,             // toggle link visibility in graph
  showRelationLabels: false,   // toggle relation type labels on links
  showAuthModal: false,        // show auth unlock modal
  // Auth: unlocked when no password set, locked otherwise
  editUnlocked: !EDIT_CODE,
  authRequired: !!EDIT_CODE,

  // Navigation — checks editorDirty before leaving editor
  setView: (view) => {
    const { editorDirty, currentView } = get();
    if (currentView === 'editor' && editorDirty) {
      if (!window.confirm('Modifications non enregistrées. Quitter sans sauvegarder ?')) return;
    }
    set({ currentView: view, editorDirty: false });
  },

  openEditor: (nodeId = null) => {
    const { editUnlocked } = get();
    if (!editUnlocked) {
      set({ showAuthModal: true });
      return;
    }
    set({ editingNodeId: nodeId, currentView: 'editor', editorDirty: false });
  },

  closeEditor: () => set({
    editingNodeId: undefined,
    currentView: 'graph',
    editorDirty: false,
  }),

  // Graph controls
  setGraphRenderMode: (mode) => set({ graphRenderMode: mode }),
  toggleAIPanel: () => set(s => ({ aiPanelOpen: !s.aiPanelOpen })),
  setDepth: (depth) => set({ contextDepth: depth }),
  setFilters: (filters) => set(s => ({ activeFilters: { ...s.activeFilters, ...filters } })),
  setEditorDirty: (dirty) => set({ editorDirty: dirty }),
  setComputingLayout: (computing) => set({ computingLayout: computing }),
  toggleShowLinks: () => set(s => ({ showLinks: !s.showLinks })),
  toggleShowRelationLabels: () => set(s => ({ showRelationLabels: !s.showRelationLabels })),

  // Auth
  unlockEdit: (code) => {
    if (!EDIT_CODE || code === EDIT_CODE) {
      set({ editUnlocked: true, showAuthModal: false });
      return true;
    }
    return false;
  },
  lockEdit: () => {
    const { currentView } = get();
    set({
      editUnlocked: false,
      ...(currentView === 'exercises' ? { currentView: 'graph' } : {}),
    });
  },
  openAuthModal: () => set({ showAuthModal: true }),
  closeAuthModal: () => set({ showAuthModal: false }),

  // Toasts
  addToast: (message, type = 'info') => set(s => ({
    toasts: [...s.toasts, { id: Date.now() + Math.random(), message, type }],
  })),
  removeToast: (id) => set(s => ({ toasts: s.toasts.filter(t => t.id !== id) })),
}));
