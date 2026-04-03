import { create } from 'zustand';
import * as storage from '../lib/storage.js';
import { callAI, buildAIContext, buildSummaryPrompt, buildQuizPrompt, parseQuizResponse, getAIErrorMessage } from '../lib/ai.js';
import { sm2, scoreToStatus } from '../lib/sm2.js';
import { useGraphStore } from './graphStore.js';
import { useUiStore } from './uiStore.js';

export const useAiStore = create((set, get) => ({
  // ── State ──────────────────────────────────────────────────────────────────
  summaryCache: {},  // nodeId → summary string
  quizState: null,   // QuizState | null
  loading: false,
  error: null,

  // ── generateSummary ────────────────────────────────────────────────────────
  generateSummary: async (nodeId, depth, force = false) => {
    const { summaryCache } = get();
    if (!force && summaryCache[nodeId]) return; // use cache

    set({ loading: true, error: null });
    try {
      const { nodes, links } = useGraphStore.getState();
      const { main_node, neighbors } = buildAIContext(nodeId, depth, nodes, links);
      const { system, user } = buildSummaryPrompt(main_node, neighbors);
      const summary = await callAI(user, system);
      set(s => ({ loading: false, summaryCache: { ...s.summaryCache, [nodeId]: summary } }));
    } catch (e) {
      set({ loading: false, error: getAIErrorMessage(e) });
    }
  },

  // ── generateQuiz ───────────────────────────────────────────────────────────
  generateQuiz: async (nodeId, depth, difficulty = 'medium', count = 5) => {
    set({ loading: true, error: null, quizState: null });
    try {
      const { nodes, links } = useGraphStore.getState();
      const { main_node, neighbors } = buildAIContext(nodeId, depth, nodes, links);
      const { system, user } = buildQuizPrompt(main_node, neighbors, count, difficulty);
      const raw = await callAI(user, system);
      const questions = parseQuizResponse(raw);
      set({
        loading: false,
        quizState: {
          nodeId,
          questions,
          currentIndex: 0,
          answers: new Array(questions.length).fill(null),
          completed: false,
          score: null,
        },
      });
    } catch (e) {
      set({ loading: false, error: getAIErrorMessage(e) });
    }
  },

  // ── submitAnswer — FINAL on first click, does NOT auto-advance ─────────────
  // Answers are always just recorded. completeQuiz() sets completed flag.
  submitAnswer: (answerIndex) => {
    const { quizState } = get();
    if (!quizState || quizState.completed) return;
    const { currentIndex, answers } = quizState;
    if (answers[currentIndex] !== null) return; // already answered — final on first click
    const newAnswers = [...answers];
    newAnswers[currentIndex] = answerIndex;
    set({ quizState: { ...quizState, answers: newAnswers } });
  },

  // ── advanceQuestion — called by "Next" button after explanation is read ────
  advanceQuestion: () => {
    const { quizState } = get();
    if (!quizState || quizState.completed) return;
    const { currentIndex, questions, answers } = quizState;
    if (answers[currentIndex] === null) return; // not answered yet
    if (currentIndex < questions.length - 1) {
      set({ quizState: { ...quizState, currentIndex: currentIndex + 1 } });
    }
  },

  // ── completeQuiz — called by "Finish Quiz" button on last question ─────────
  completeQuiz: () => {
    const { quizState } = get();
    if (!quizState) return;
    const { questions, answers } = quizState;
    const correctCount = answers.filter((a, i) => a !== null && a === questions[i].correct_answer).length;
    const score = correctCount / questions.length;
    set({ quizState: { ...quizState, completed: true, score } });
  },

  // ── finishQuiz — SM-2 → writeNode → updateNodeInMemory → resetQuiz ─────────
  finishQuiz: async () => {
    const { quizState } = get();
    if (!quizState || !quizState.completed) return;

    const { nodes } = useGraphStore.getState();
    const node = nodes.find(n => n.id === quizState.nodeId);
    if (!node) { get().resetQuiz(); return; }

    const { score, questions } = quizState;
    const correctCount = Math.round(score * questions.length);
    const last_quiz_score = `${correctCount}/${questions.length}`;
    const newStatus = scoreToStatus(score);
    const { newEF, newInterval, nextReview } = sm2(score, node.ease_factor, node.interval);

    const updatedNode = {
      ...node,
      status: newStatus,
      last_quiz_score,
      ease_factor: newEF,
      interval: newInterval,
      next_review: nextReview,
      updatedAt: new Date().toISOString(),
    };

    set({ loading: true });
    try {
      await storage.writeNode(updatedNode);
      useGraphStore.getState().updateNodeInMemory(updatedNode);
      useUiStore.getState().addToast(
        `Quiz: ${last_quiz_score} (${Math.round(score * 100)}%) — ${newStatus}. Next review: ${nextReview}`,
        score >= 0.8 ? 'success' : 'info'
      );
    } catch (e) {
      useUiStore.getState().addToast('Failed to save quiz results: ' + e.message, 'error');
    } finally {
      set({ loading: false });
      get().resetQuiz();
    }
  },

  // ── resetQuiz ──────────────────────────────────────────────────────────────
  resetQuiz: () => set({ quizState: null }),

  // ── clearError ─────────────────────────────────────────────────────────────
  clearError: () => set({ error: null }),
}));
