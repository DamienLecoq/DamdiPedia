import { useState, useEffect, useRef, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useExerciseStore } from '../stores/exerciseStore.js';
import { useIsMobile } from '../hooks/useIsMobile.js';

const TYPE_LABELS = {
  open_question: 'Question ouverte',
  flashcard: 'Flashcard',
  code_challenge: 'Code challenge',
  reverse_explanation: 'Explication inverse',
  mcq: 'QCM',
};

const TYPE_ICONS = {
  open_question: '\u270D',
  flashcard: '\u26A1',
  code_challenge: '\uD83D\uDCBB',
  reverse_explanation: '\uD83D\uDD04',
  mcq: '\u2611',
};

function ExerciseCard({ exercise, index, onCorrect, correcting, correctionResults }) {
  const [answer, setAnswer] = useState('');
  const [mcqAnswer, setMcqAnswer] = useState(null);
  const [showReference, setShowReference] = useState(false);

  const handleSubmit = (action) => {
    const userAnswer = exercise.type === 'mcq'
      ? `${String.fromCharCode(65 + mcqAnswer)}. ${exercise.options[mcqAnswer]}`
      : answer;
    if (!userAnswer.trim()) return;
    onCorrect(exercise, userAnswer, action);
  };

  const hasAnswer = exercise.type === 'mcq' ? mcqAnswer !== null : answer.trim().length > 0;

  return (
    <div style={{
      background: 'linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderTopColor: 'rgba(255,255,255,0.14)',
      borderRadius: 'var(--radius-sm)',
      padding: '0.85rem 1rem',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
      minWidth: 0,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '1rem' }}>{TYPE_ICONS[exercise.type]}</span>
        <span style={{
          fontSize: '0.68rem', padding: '0.1rem 0.45rem', borderRadius: 999,
          background: 'rgba(167,139,250,0.15)', color: 'var(--accent)', fontWeight: 600,
          border: '1px solid rgba(167,139,250,0.25)',
        }}>
          {TYPE_LABELS[exercise.type]}
        </span>
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>#{index + 1}</span>
        {exercise.relatedNodeLabel && (
          <span style={{
            fontSize: '0.65rem', padding: '0.08rem 0.4rem', borderRadius: 999,
            background: 'rgba(255,255,255,0.04)', color: 'var(--text-muted)',
            border: '1px solid rgba(255,255,255,0.06)', marginLeft: 'auto',
          }}>
            {exercise.relatedNodeLabel}
          </span>
        )}
      </div>

      {/* Question */}
      <div className="markdown-body" style={{
        fontSize: '0.84rem', lineHeight: 1.55, marginBottom: '0.6rem',
        wordBreak: 'break-word', overflowWrap: 'anywhere', minWidth: 0,
      }}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{exercise.question}</ReactMarkdown>
      </div>

      {/* MCQ options */}
      {exercise.type === 'mcq' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '0.6rem' }}>
          {exercise.options.map((opt, j) => {
            const letter = String.fromCharCode(65 + j);
            const isSelected = mcqAnswer === j;
            return (
              <button key={j} onClick={() => setMcqAnswer(j)}
                style={{
                  textAlign: 'left', padding: '0.4rem 0.7rem', borderRadius: 8,
                  fontSize: '0.8rem', wordBreak: 'break-word', overflowWrap: 'anywhere',
                  background: isSelected ? 'rgba(167,139,250,0.15)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${isSelected ? 'rgba(167,139,250,0.4)' : 'rgba(255,255,255,0.06)'}`,
                  color: isSelected ? 'var(--accent-hover)' : 'var(--text)',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                <span style={{ fontWeight: 600, marginRight: 6 }}>{letter}.</span>{opt}
              </button>
            );
          })}
        </div>
      )}

      {/* Answer input (non-MCQ) */}
      {exercise.type !== 'mcq' && (
        <textarea
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          placeholder={exercise.type === 'code_challenge' ? 'Votre code...' : 'Votre reponse...'}
          rows={exercise.type === 'code_challenge' ? 5 : 2}
          style={{
            width: '100%', marginBottom: '0.5rem', resize: 'vertical',
            fontFamily: exercise.type === 'code_challenge' ? "'Cascadia Code','Fira Code','Consolas',monospace" : 'inherit',
            fontSize: exercise.type === 'code_challenge' ? '0.78rem' : '0.82rem',
            lineHeight: 1.5, borderRadius: 'var(--radius-sm)',
            boxSizing: 'border-box',
          }}
        />
      )}

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
        <button className="btn-primary"
          style={{ fontSize: '0.72rem', padding: '0.25rem 0.65rem' }}
          onClick={() => handleSubmit('evaluate')}
          disabled={!hasAnswer || correcting}>
          {correcting ? '...' : 'Valider'}
        </button>
        {hasAnswer && (
          <>
            <button className="btn-secondary" style={{ fontSize: '0.68rem', padding: '0.2rem 0.5rem' }}
              onClick={() => handleSubmit('explain')} disabled={correcting}>Expliquer</button>
            <button className="btn-secondary" style={{ fontSize: '0.68rem', padding: '0.2rem 0.5rem' }}
              onClick={() => handleSubmit('simplify')} disabled={correcting}>Simplifier</button>
            <button className="btn-secondary" style={{ fontSize: '0.68rem', padding: '0.2rem 0.5rem' }}
              onClick={() => handleSubmit('example')} disabled={correcting}>Exemple</button>
          </>
        )}
        <button onClick={() => setShowReference(v => !v)}
          style={{
            background: 'none', border: 'none', color: 'var(--text-muted)',
            fontSize: '0.7rem', cursor: 'pointer', marginLeft: 'auto', padding: '0.2rem 0.3rem',
          }}>
          {showReference ? 'Masquer' : 'Reponse'}
        </button>
      </div>

      {/* Reference answer */}
      {showReference && (
        <div style={{
          background: 'rgba(52,211,153,0.05)', border: '1px solid rgba(52,211,153,0.2)',
          borderRadius: 'var(--radius-sm)', padding: '0.5rem 0.7rem',
          fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.4rem',
          wordBreak: 'break-word', overflowWrap: 'anywhere',
        }}>
          {exercise.type === 'flashcard' && (
            <div className="markdown-body"><ReactMarkdown remarkPlugins={[remarkGfm]}>{exercise.answer}</ReactMarkdown></div>
          )}
          {exercise.type === 'mcq' && (
            <div>
              <strong style={{ color: 'var(--success)' }}>
                {String.fromCharCode(65 + exercise.correct_answer)}. {exercise.options[exercise.correct_answer]}
              </strong>
              {exercise.explanation && <p style={{ marginTop: '0.25rem' }}>{exercise.explanation}</p>}
            </div>
          )}
          {exercise.type === 'code_challenge' && exercise.referenceCode && (
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: "'Cascadia Code','Fira Code','Consolas',monospace", fontSize: '0.76rem' }}>
              {exercise.referenceCode}
            </pre>
          )}
          {(exercise.type === 'open_question' || exercise.type === 'reverse_explanation') && exercise.referenceAnswer && (
            <div className="markdown-body"><ReactMarkdown remarkPlugins={[remarkGfm]}>{exercise.referenceAnswer}</ReactMarkdown></div>
          )}
        </div>
      )}

      {/* Correction feedback */}
      {Object.entries(correctionResults)
        .filter(([key]) => key.startsWith(exercise.question + '_'))
        .map(([key, result]) => (
          <div key={key} style={{
            background: 'rgba(167,139,250,0.05)', border: '1px solid rgba(167,139,250,0.2)',
            borderRadius: 'var(--radius-sm)', padding: '0.5rem 0.7rem',
            marginTop: '0.4rem', wordBreak: 'break-word', overflowWrap: 'anywhere',
          }}>
            <div style={{
              fontSize: '0.65rem', color: 'var(--accent)', fontWeight: 600,
              textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem',
            }}>
              {{ evaluate: 'Correction', explain: 'Explication', simplify: 'Simplification', example: 'Exemple' }[result.action] || 'IA'}
            </div>
            <div className="markdown-body" style={{ fontSize: '0.78rem' }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{result.feedback}</ReactMarkdown>
            </div>
          </div>
        ))
      }
    </div>
  );
}

// ── Side panel toggle tab (visible when panel is closed) ──────────────────
export function ExerciseToggleTab() {
  const activeSheetId = useExerciseStore(s => s.activeSheetId);
  const panelOpen = useExerciseStore(s => s.panelOpen);
  const togglePanel = useExerciseStore(s => s.togglePanel);

  if (!activeSheetId) return null;

  return (
    <button
      onClick={togglePanel}
      style={{
        position: 'fixed',
        right: panelOpen ? undefined : 0,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 899,
        background: 'linear-gradient(180deg, rgba(167,139,250,0.25) 0%, rgba(167,139,250,0.15) 100%)',
        border: '1px solid rgba(167,139,250,0.35)',
        borderRight: panelOpen ? undefined : 'none',
        borderLeft: panelOpen ? 'none' : undefined,
        borderRadius: panelOpen ? '8px 0 0 8px' : '8px 0 0 8px',
        padding: '0.8rem 0.3rem',
        cursor: 'pointer',
        color: 'var(--accent)',
        fontSize: '0.85rem',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: '-2px 0 12px rgba(0,0,0,0.3)',
        writingMode: 'vertical-rl',
        letterSpacing: '0.05em',
        fontWeight: 600,
        display: panelOpen ? 'none' : 'flex',
        alignItems: 'center',
        gap: '0.3rem',
      }}
      title="Ouvrir les exercices"
    >
      <span style={{ fontSize: '1rem' }}>{'\u270D'}</span>
      <span style={{ fontSize: '0.7rem' }}>Exercices</span>
    </button>
  );
}

// ── Preset tags ───────────────────────────────────────────────────────────
const PRESET_TAGS = [
  { key: 'done', label: 'Fait', color: '#34d399' },
  { key: 'good', label: 'Bien', color: '#60a5fa' },
  { key: 'redo', label: 'A refaire', color: '#fbbf24' },
  { key: 'hard', label: 'Difficile', color: '#f87171' },
];

// ── Side panel ────────────────────────────────────────────────────────────
const EX_MIN_WIDTH = 360;
const EX_MAX_WIDTH = 1200;
const EX_DEFAULT_WIDTH = 520;

export default function ExerciseSheet() {
  const activeSheetId = useExerciseStore(s => s.activeSheetId);
  const panelOpen = useExerciseStore(s => s.panelOpen);
  const togglePanel = useExerciseStore(s => s.togglePanel);
  const closeSheet = useExerciseStore(s => s.closeSheet);
  const updateSheet = useExerciseStore(s => s.updateSheet);
  const correcting = useExerciseStore(s => s.correcting);
  const correctionResults = useExerciseStore(s => s.correctionResults);
  const correctAnswer = useExerciseStore(s => s.correctAnswer);
  const removeSheet = useExerciseStore(s => s.removeSheet);
  const error = useExerciseStore(s => s.error);
  const clearError = useExerciseStore(s => s.clearError);
  const isMobile = useIsMobile();

  // Resizable panel
  const [panelWidth, setPanelWidth] = useState(EX_DEFAULT_WIDTH);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startW = useRef(0);
  const handleRef = useRef(null);

  const onDragStart = useCallback((e) => {
    dragging.current = true;
    startX.current = e.clientX;
    startW.current = panelWidth;
    handleRef.current?.classList.add('dragging');

    const onMove = (ev) => {
      if (!dragging.current) return;
      const delta = startX.current - ev.clientX;
      setPanelWidth(Math.max(EX_MIN_WIDTH, Math.min(EX_MAX_WIDTH, startW.current + delta)));
    };
    const onUp = () => {
      dragging.current = false;
      handleRef.current?.classList.remove('dragging');
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, [panelWidth]);

  const [sheet, setSheet] = useState(null);
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleDraft, setTitleDraft] = useState('');

  useEffect(() => {
    if (activeSheetId) {
      const s = useExerciseStore.getState().getSheetById(activeSheetId);
      setSheet(s);
      setEditingTitle(false);
    } else {
      setSheet(null);
    }
  }, [activeSheetId]);

  if (!activeSheetId || !panelOpen || !sheet) return null;

  const date = new Date(sheet.generatedAt);
  const dateStr = date.toLocaleDateString('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  const displayTitle = sheet.title || sheet.nodeLabel;
  const tags = sheet.tags || [];
  const themes = sheet.themes || (sheet.nodeCategory ? [sheet.nodeCategory] : []);
  const allNodes = [
    { label: sheet.nodeLabel, category: sheet.nodeCategory },
    ...(sheet.relatedNodes || []),
  ];

  const handleDelete = () => {
    if (!window.confirm('Supprimer cette fiche ?')) return;
    removeSheet(activeSheetId);
  };

  const handleTitleSave = () => {
    const trimmed = titleDraft.trim();
    updateSheet(activeSheetId, { title: trimmed || null });
    setSheet(s => ({ ...s, title: trimmed || null }));
    setEditingTitle(false);
  };

  const handleToggleTag = (tagKey) => {
    const newTags = tags.includes(tagKey)
      ? tags.filter(t => t !== tagKey)
      : [...tags, tagKey];
    updateSheet(activeSheetId, { tags: newTags });
    setSheet(s => ({ ...s, tags: newTags }));
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, right: 0, bottom: 0,
      zIndex: 898,
      display: 'flex',
      animation: 'slideIn 220ms ease-out',
    }}>
      {/* Drag handle — hidden on mobile via CSS */}
      {!isMobile && (
        <div
          ref={handleRef}
          className="panel-resize-handle"
          onMouseDown={onDragStart}
          title="Redimensionner le panneau"
        />
      )}

      <div style={{
        width: isMobile ? '100vw' : panelWidth,
        background: 'linear-gradient(180deg, rgba(16, 12, 36, 0.96) 0%, rgba(10, 7, 28, 0.98) 100%)',
        backdropFilter: 'blur(48px) saturate(180%)',
        WebkitBackdropFilter: 'blur(48px) saturate(180%)',
        borderLeft: '1px solid var(--border)',
        boxShadow: '-8px 0 48px rgba(0,0,0,0.4), inset 1px 0 0 rgba(255,255,255,0.04)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
      {/* Header */}
      <div style={{
        padding: '0.6rem 0.75rem',
        borderBottom: '1px solid var(--border)',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0,
      }}>
        <button onClick={togglePanel}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1rem', padding: '0 2px' }}
          title="Replier le panneau">{'\u276F'}</button>
        <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
          {editingTitle ? (
            <input
              autoFocus
              value={titleDraft}
              onChange={e => setTitleDraft(e.target.value)}
              onBlur={handleTitleSave}
              onKeyDown={e => { if (e.key === 'Enter') handleTitleSave(); if (e.key === 'Escape') setEditingTitle(false); }}
              style={{ width: '100%', fontSize: '0.85rem', fontWeight: 600, padding: '0.15rem 0.4rem', borderRadius: 6, boxSizing: 'border-box' }}
            />
          ) : (
            <div
              onClick={() => { setTitleDraft(displayTitle); setEditingTitle(true); }}
              style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'text' }}
              title="Cliquer pour renommer"
            >
              {displayTitle}
            </div>
          )}
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            {dateStr} — {sheet.exercises.length} exercice(s)
          </div>
        </div>
        <button onClick={handleDelete}
          style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '0.8rem', padding: '0 3px' }}
          title="Supprimer">{'\uD83D\uDDD1'}</button>
        <button onClick={closeSheet}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.95rem', padding: '0 2px' }}
          title="Fermer">{'\u2715'}</button>
      </div>

      {/* Tags bar */}
      <div style={{
        padding: '0.4rem 0.75rem', borderBottom: '1px solid var(--border)',
        display: 'flex', gap: '0.3rem', flexWrap: 'wrap', flexShrink: 0,
        background: 'rgba(255,255,255,0.015)',
      }}>
        {PRESET_TAGS.map(tag => {
          const active = tags.includes(tag.key);
          return (
            <button key={tag.key} onClick={() => handleToggleTag(tag.key)}
              style={{
                fontSize: '0.68rem', padding: '0.12rem 0.5rem', borderRadius: 999, cursor: 'pointer',
                background: active ? tag.color + '22' : 'rgba(255,255,255,0.03)',
                color: active ? tag.color : 'var(--text-muted)',
                border: `1px solid ${active ? tag.color + '55' : 'rgba(255,255,255,0.06)'}`,
                fontWeight: active ? 600 : 400,
                transition: 'all 0.12s',
              }}>
              {tag.label}
            </button>
          );
        })}
      </div>

      {/* Info bar — themes + nodes */}
      <div style={{
        padding: '0.4rem 0.75rem', borderBottom: '1px solid var(--border)',
        fontSize: '0.7rem', color: 'var(--text-muted)',
        display: 'flex', flexDirection: 'column', gap: '0.3rem', flexShrink: 0,
        background: 'rgba(255,255,255,0.02)',
      }}>
        {/* Themes */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Themes</span>
          {themes.map(t => (
            <span key={t} style={{
              padding: '0.08rem 0.4rem', borderRadius: 999,
              background: 'rgba(167,139,250,0.12)', color: 'var(--accent)',
              border: '1px solid rgba(167,139,250,0.25)', fontSize: '0.65rem',
            }}>{t}</span>
          ))}
          {themes.length === 0 && <span style={{ fontStyle: 'italic' }}>—</span>}
        </div>
        {/* Nodes */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Noeuds</span>
          {allNodes.map((n, i) => (
            <span key={i} style={{
              padding: '0.08rem 0.4rem', borderRadius: 999,
              background: i === 0 ? 'rgba(52,211,153,0.12)' : 'rgba(255,255,255,0.04)',
              color: i === 0 ? 'var(--success)' : 'var(--text-muted)',
              border: `1px solid ${i === 0 ? 'rgba(52,211,153,0.25)' : 'rgba(255,255,255,0.06)'}`,
              fontSize: '0.65rem',
            }}>{n.label}</span>
          ))}
        </div>
        {/* Depth */}
        <div>
          <span style={{ fontWeight: 600, fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Profondeur </span>
          <strong style={{ color: 'var(--text)' }}>{sheet.depth}</strong>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          padding: '0.4rem 0.75rem', background: 'rgba(248,113,113,0.08)',
          borderBottom: '1px solid rgba(248,113,113,0.2)',
          fontSize: '0.78rem', color: 'var(--danger)',
          display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0,
        }}>
          <span style={{ flex: 1 }}>{error}</span>
          <button className="btn-secondary" style={{ fontSize: '0.68rem', padding: '0.1rem 0.3rem' }}
            onClick={clearError}>{'\u2715'}</button>
        </div>
      )}

      {/* Exercises — scrollable */}
      <div className="exercise-panel-body" style={{
        flex: 1, overflowY: 'auto', overflowX: 'hidden',
        padding: '0.75rem',
        display: 'flex', flexDirection: 'column', gap: '0.75rem',
        minWidth: 0,
      }}>
        {sheet.exercises.map((ex, i) => (
          <ExerciseCard
            key={i}
            exercise={ex}
            index={i}
            onCorrect={correctAnswer}
            correcting={correcting}
            correctionResults={correctionResults}
          />
        ))}
      </div>
    </div>
    </div>
  );
}
