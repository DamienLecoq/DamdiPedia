import { create } from 'zustand';
import { callAI, buildAIContext, buildExercisePrompt, buildCorrectionPrompt, parseExerciseResponse, getAIErrorMessage } from '../lib/ai.js';
import { saveExerciseSheet, loadExerciseSheet, deleteExerciseSheet, listExerciseSheetsForNode, listAllExerciseSheets, makeSheetId } from '../lib/exercises.js';
import { useGraphStore } from './graphStore.js';
import { useUiStore } from './uiStore.js';

export const useExerciseStore = create((set, get) => ({
  // ── State ──────────────────────────────────────────────────────────────────
  generating: false,
  correcting: false,
  error: null,
  activeSheetId: null,       // currently viewed exercise sheet
  panelOpen: false,          // side panel visibility
  correctionResults: {},     // { exerciseIndex: { feedback, action } }

  // ── generateExercises ─────────────────────────────────────────────────────
  generateExercises: async (nodeId, depth, types, count) => {
    set({ generating: true, error: null });
    try {
      const { nodes, links } = useGraphStore.getState();
      const { main_node, neighbors } = buildAIContext(nodeId, depth, nodes, links);
      const { system, user } = buildExercisePrompt(main_node, neighbors, depth, types, count);
      const raw = await callAI(user, system);
      const exercises = parseExerciseResponse(raw);

      // Build related nodes info with category
      const relatedNodes = neighbors.map(n => ({
        id: n.id,
        label: n.label,
        category: n.category || null,
        depth: 1,
      }));

      // Collect unique categories (themes)
      const themes = [...new Set([
        main_node.category,
        ...neighbors.map(n => n.category),
      ].filter(Boolean))];

      const sheet = {
        id: makeSheetId(nodeId),
        nodeId,
        nodeLabel: main_node.label,
        nodeCategory: main_node.category || null,
        depth,
        relatedNodes,
        themes,
        title: null,     // user-editable name (null = use default)
        tags: [],        // user-defined tags
        generatedAt: new Date().toISOString(),
        exercises,
      };

      saveExerciseSheet(sheet);
      set({ generating: false, activeSheetId: sheet.id, panelOpen: true });
      useUiStore.getState().addToast(
        `${exercises.length} exercice(s) générés pour ${main_node.label}`,
        'success'
      );
      return sheet;
    } catch (e) {
      set({ generating: false, error: getAIErrorMessage(e) });
      return null;
    }
  },

  // ── correctAnswer ─────────────────────────────────────────────────────────
  correctAnswer: async (exercise, userAnswer, action = 'evaluate') => {
    set({ correcting: true, error: null });
    try {
      const { system, user } = buildCorrectionPrompt(exercise, userAnswer, action);
      const feedback = await callAI(user, system);
      set(s => ({
        correcting: false,
        correctionResults: {
          ...s.correctionResults,
          [`${exercise.question}_${action}`]: { feedback, action },
        },
      }));
      return feedback;
    } catch (e) {
      set({ correcting: false, error: getAIErrorMessage(e) });
      return null;
    }
  },

  // ── Navigation ────────────────────────────────────────────────────────────
  openSheet: (sheetId) => set({ activeSheetId: sheetId, panelOpen: true, correctionResults: {} }),
  closeSheet: () => set({ activeSheetId: null, panelOpen: false, correctionResults: {} }),
  togglePanel: () => set(s => ({ panelOpen: !s.panelOpen })),

  // ── Update metadata (title, tags) ─────────────────────────────────────────
  updateSheet: (sheetId, updates) => {
    const sheet = loadExerciseSheet(sheetId);
    if (!sheet) return;
    Object.assign(sheet, updates);
    saveExerciseSheet(sheet);
  },

  // ── Delete ────────────────────────────────────────────────────────────────
  removeSheet: (sheetId) => {
    deleteExerciseSheet(sheetId);
    const { activeSheetId } = get();
    if (activeSheetId === sheetId) set({ activeSheetId: null, correctionResults: {} });
  },

  // ── Getters (called directly, not reactive) ──────────────────────────────
  getSheetById: (id) => loadExerciseSheet(id),
  getSheetsForNode: (nodeId) => listExerciseSheetsForNode(nodeId),
  getAllSheets: () => listAllExerciseSheets(),

  clearError: () => set({ error: null }),
}));
