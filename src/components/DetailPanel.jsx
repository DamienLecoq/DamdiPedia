import { useState, useEffect, useRef, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useGraphStore } from '../stores/graphStore.js';
import { useUiStore } from '../stores/uiStore.js';
import { useAiStore } from '../stores/aiStore.js';
import { getNodeColor } from '../lib/graph.js';
import { useIsMobile } from '../hooks/useIsMobile.js';
import AISummary from './AISummary.jsx';
import QuizPanel from './QuizPanel.jsx';

const aiConfigured = !!import.meta.env.VITE_AI_PROXY_URL;

const STATUS_LABELS   = { learning: 'En apprentissage', to_review: 'À réviser', mastered: 'Maîtrisé' };
const PRIORITY_LABELS = { low: 'Faible', medium: 'Moyen', high: 'Élevé' };
const STATUS_COLORS   = { learning: '#60a5fa', to_review: '#fbbf24', mastered: '#34d399' };
const MIN_WIDTH = 280;
const MAX_WIDTH = 1200;
const DEFAULT_WIDTH = 600;

function Badge({ color, children }) {
  return (
    <span style={{
      display: 'inline-block', padding: '0.1rem 0.45rem',
      borderRadius: 3, fontSize: '0.72rem', fontWeight: 500,
      background: color + '22', color, border: `1px solid ${color}44`,
    }}>
      {children}
    </span>
  );
}

export default function DetailPanel() {
  const nodes         = useGraphStore(s => s.nodes);
  const selectedNodeId = useGraphStore(s => s.selectedNodeId);
  const selectNode    = useGraphStore(s => s.selectNode);
  const deleteNode    = useGraphStore(s => s.deleteNode);
  const openEditor    = useUiStore(s => s.openEditor);
  const editUnlocked  = useUiStore(s => s.editUnlocked);
  const openAuthModal = useUiStore(s => s.openAuthModal);
  const contextDepth  = useUiStore(s => s.contextDepth);
  const setDepth      = useUiStore(s => s.setDepth);

  const quizState    = useAiStore(s => s.quizState);
  const generateQuiz = useAiStore(s => s.generateQuiz);
  const resetQuiz    = useAiStore(s => s.resetQuiz);
  const aiLoading    = useAiStore(s => s.loading);

  const isMobile = useIsMobile();

  const [deleting,   setDeleting]   = useState(false);
  const [aiMode,     setAiMode]     = useState(null);
  const [difficulty, setDifficulty] = useState('medium');
  const [quizCount,  setQuizCount]  = useState(5);

  // Resizable panel
  const [panelWidth, setPanelWidth] = useState(DEFAULT_WIDTH);
  const dragging = useRef(false);
  const startX   = useRef(0);
  const startW   = useRef(0);
  const handleRef = useRef(null);

  const onDragStart = useCallback((e) => {
    dragging.current = true;
    startX.current = e.clientX;
    startW.current = panelWidth;
    handleRef.current?.classList.add('dragging');

    const onMove = (ev) => {
      if (!dragging.current) return;
      const delta = startX.current - ev.clientX;
      setPanelWidth(Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, startW.current + delta)));
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

  // When selected node changes, reset AI mode
  useEffect(() => {
    if (!quizState) setAiMode(null);
  }, [selectedNodeId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Esc: close AI sub-panel first, then the panel
  useEffect(() => {
    const handler = (e) => {
      if (e.key !== 'Escape') return;
      if (aiMode || quizState) {
        if (quizState && !quizState.completed) {
          if (!window.confirm('Quiz en cours. Abandonner ?')) return;
          resetQuiz();
        }
        setAiMode(null);
      } else {
        selectNode(null);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }); // no dep array — always captures latest state

  const effectiveAiMode = quizState ? 'quiz' : aiMode;

  const node = nodes.find(n => n.id === selectedNodeId);
  if (!node) return null;

  const validIds   = new Set(nodes.map(n => n.id));
  const relations  = (node.relations || []).filter(r => validIds.has(r.target));
  const outgoingIds = new Set(relations.map(r => r.target));
  // Nodes that link TO this node but this node doesn't link back (pure backlinks)
  const backlinks  = nodes
    .filter(n => n.id !== node.id && !outgoingIds.has(n.id) && (n.relations || []).some(r => r.target === node.id))
    .map(n => ({ source: n, ...n.relations.find(r => r.target === node.id) }));
  const color      = getNodeColor(node);
  const statusColor = STATUS_COLORS[node.status] || 'var(--text-muted)';
  const canQuiz    = node.markdown_body && node.markdown_body.trim().length >= 100;

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleClose = () => {
    if (quizState && !quizState.completed) {
      if (!window.confirm('Quiz en cours. Abandonner et fermer ?')) return;
      resetQuiz();
    }
    setAiMode(null);
    selectNode(null);
  };

  const handleDelete = async () => {
    if (!editUnlocked) { openAuthModal(); return; }
    if (!window.confirm(`Supprimer « ${node.label} » ? Les relations pointant vers ce nœud seront supprimées.`)) return;
    setDeleting(true);
    try { await deleteNode(node.id); }
    catch (e) { alert('Échec de la suppression : ' + e.message); }
    finally { setDeleting(false); }
  };

  const handleEdit = () => {
    if (!editUnlocked) { openAuthModal(); return; }
    openEditor(node.id);
  };

  const handleStartSummary = () => setAiMode('summary');

  const handleStartQuiz = async () => {
    setAiMode('quiz');
    await generateQuiz(node.id, contextDepth, difficulty, quizCount);
  };

  const handleCloseAi = () => {
    if (quizState && !quizState.completed) {
      if (!window.confirm('Quiz en cours. Abandonner ?')) return;
      resetQuiz();
    }
    setAiMode(null);
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div style={isMobile
      ? { position: 'fixed', inset: 0, zIndex: 150, display: 'flex', flexDirection: 'column', animation: 'slideIn 220ms ease-out' }
      : { display: 'flex', flexShrink: 0, height: '100%', animation: 'slideIn 220ms ease-out' }
    }>
      {/* Drag handle — hidden on mobile via CSS */}
      <div
        ref={handleRef}
        className="panel-resize-handle"
        onMouseDown={onDragStart}
        title="Redimensionner le panneau"
      />

      {/* Panel content — glass over graph */}
      <div style={{
        width: isMobile ? '100%' : panelWidth,
        flex: isMobile ? 1 : undefined,
        background: isMobile ? 'rgba(6, 4, 26, 0.95)' : 'rgba(12, 9, 32, 0.72)',
        backdropFilter: 'blur(28px) saturate(160%)',
        WebkitBackdropFilter: 'blur(28px) saturate(160%)',
        borderLeft: isMobile ? 'none' : '1px solid var(--border)',
        borderTop: '1px solid var(--border-hi)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: isMobile ? 'none' : '-8px 0 40px rgba(0,0,0,0.35)',
      }}>
        {/* ── Header ── */}
        <div style={{
          padding: '0.8rem 1rem',
          borderBottom: '1px solid var(--border)',
          background: 'rgba(255,255,255,0.025)',
          display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
              <div style={{
                width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0,
                boxShadow: `0 0 6px ${color}`,
              }} />
              <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {node.label}
              </span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
              <Badge color={color}>{node.category}</Badge>
              <Badge color="var(--text-muted)">{PRIORITY_LABELS[node.priority] || node.priority}</Badge>
              <Badge color={statusColor}>{STATUS_LABELS[node.status] || node.status}</Badge>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 4, flexShrink: 0, alignItems: 'center' }}>
            <button onClick={handleEdit} className="btn-secondary"
              style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}
              title={editUnlocked ? 'Modifier le nœud' : 'Déverrouiller pour modifier'}>
              {editUnlocked ? 'Modifier' : '🔒'}
            </button>
            {editUnlocked && (
              <button onClick={handleDelete} disabled={deleting}
                style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '0.9rem', padding: '0 3px', opacity: deleting ? 0.5 : 1 }}
                title="Supprimer le nœud">🗑</button>
            )}
            <button onClick={handleClose}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1rem', padding: '0 2px' }}
              title="Fermer (Échap)">✕</button>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0.75rem 1rem' }}>

          {/* Review metadata */}
          {(node.next_review || node.last_quiz_score) && (
            <div style={{ marginBottom: '0.75rem', fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {node.next_review && <span>Prochaine révision : <span style={{ color: 'var(--text)' }}>{node.next_review}</span></span>}
              {node.last_quiz_score && <span>Dernier score : <span style={{ color: 'var(--accent2)' }}>{node.last_quiz_score}</span></span>}
            </div>
          )}

          {/* Markdown body */}
          {node.markdown_body ? (
            <div className="markdown-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{node.markdown_body}</ReactMarkdown>
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.83rem', fontStyle: 'italic' }}>
              Pas encore de contenu.{' '}
              <span style={{ color: 'var(--accent)', cursor: 'pointer', textDecoration: 'underline' }}
                onClick={handleEdit}>Ajouter des notes →</span>
            </p>
          )}

          {/* Relations */}
          {relations.length > 0 && (
            <section style={{ marginTop: '1.25rem' }}>
              <h4 style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.45rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Relations ({relations.length})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {relations.map((rel, i) => {
                  const target = nodes.find(n => n.id === rel.target);
                  if (!target) return null;
                  return (
                    <div key={i} onClick={() => selectNode(rel.target)}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.5rem', borderRadius: 4, background: 'var(--bg)', cursor: 'pointer', fontSize: '0.82rem' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'var(--bg)'}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: getNodeColor(target), flexShrink: 0, boxShadow: `0 0 4px ${getNodeColor(target)}` }} />
                      <span style={{ flex: 1, color: 'var(--text)' }}>{target.label}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.73rem' }}>{rel.type}</span>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>{rel.weight != null ? `×${rel.weight}` : ''}</span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Backlinks */}
          {backlinks.length > 0 && (
            <section style={{ marginTop: '1.25rem' }}>
              <h4 style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.45rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Référencé par ({backlinks.length})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {backlinks.map((bl, i) => (
                  <div key={i} onClick={() => selectNode(bl.source.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.5rem', borderRadius: 4, background: 'var(--bg)', cursor: 'pointer', fontSize: '0.82rem' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'var(--bg)'}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: getNodeColor(bl.source), flexShrink: 0, boxShadow: `0 0 4px ${getNodeColor(bl.source)}`, opacity: 0.7 }} />
                    <span style={{ flex: 1, color: 'var(--text-muted)' }}>{bl.source.label}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.73rem', fontStyle: 'italic' }}>{bl.type}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Resources */}
          {node.resources?.length > 0 && (
            <section style={{ marginTop: '1.25rem' }}>
              <h4 style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.45rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Ressources ({node.resources.length})
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {node.resources.map((res, i) => (
                  <a key={i} href={res.url} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: '0.82rem', color: 'var(--accent2)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', flexShrink: 0 }}>[{res.type}]</span>
                    <span style={{ textDecoration: 'underline' }}>{res.title}</span>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* ── IA Section ── */}
          <section style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.6rem' }}>
              <h4 style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', flex: 1 }}>
                Fonctionnalités IA
              </h4>
              {effectiveAiMode && (
                <button onClick={handleCloseAi}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem', padding: '0 2px' }}
                  title="Fermer le panneau IA">✕</button>
              )}
            </div>

            {!aiConfigured && (
              <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '0.65rem 0.75rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Fonctionnalités IA non configurées. Définissez <code>VITE_AI_PROXY_URL</code> dans .env.local et redémarrez.
              </div>
            )}

            {aiConfigured && !effectiveAiMode && (
              <>
                <div style={{ display: 'flex', gap: isMobile ? '0.5rem' : '0.75rem', alignItems: 'center', marginBottom: '0.65rem', fontSize: '0.78rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    Profondeur
                    <input type="range" min="1" max="3" step="1" value={contextDepth}
                      onChange={e => setDepth(Number(e.target.value))}
                      style={{ width: 60 }} />
                    <span style={{ minWidth: 10, color: 'var(--text)' }}>{contextDepth}</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    Difficulté
                    <select value={difficulty} onChange={e => setDifficulty(e.target.value)}
                      style={{ fontSize: '0.75rem', padding: '0.15rem 0.3rem' }}>
                      <option value="easy">Facile</option>
                      <option value="medium">Moyen</option>
                      <option value="hard">Difficile</option>
                    </select>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    Q
                    <input type="number" min="3" max="10" value={quizCount}
                      onChange={e => setQuizCount(Math.max(3, Math.min(10, Number(e.target.value))))}
                      style={{ width: 38, fontSize: '0.75rem', padding: '0.15rem 0.3rem', textAlign: 'center' }} />
                  </label>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn-secondary" style={{ flex: 1, fontSize: '0.8rem' }}
                    onClick={handleStartSummary} disabled={aiLoading}>
                    Résumer
                  </button>
                  <button className="btn-secondary" style={{ flex: 1, fontSize: '0.8rem' }}
                    onClick={handleStartQuiz}
                    disabled={!canQuiz || aiLoading}
                    title={!canQuiz ? 'Ajoutez plus de contenu (min 100 caractères)' : undefined}>
                    Faire le quiz
                  </button>
                </div>

                {!canQuiz && (
                  <p style={{ fontSize: '0.73rem', color: 'var(--text-muted)', marginTop: '0.4rem', fontStyle: 'italic' }}>
                    Ajoutez plus de contenu (min 100 caractères) pour générer un quiz.
                  </p>
                )}
              </>
            )}

            {aiConfigured && effectiveAiMode === 'summary' && (
              <AISummary nodeId={node.id} depth={contextDepth} />
            )}

            {aiConfigured && effectiveAiMode === 'quiz' && (
              <QuizPanel onClose={handleCloseAi} />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
