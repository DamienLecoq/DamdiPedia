import { useState, useEffect, useRef, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useGraphStore } from '../stores/graphStore.js';
import { useUiStore } from '../stores/uiStore.js';
import { useExerciseStore } from '../stores/exerciseStore.js';
import { getNodeColor } from '../lib/graph.js';
import { useIsMobile } from '../hooks/useIsMobile.js';

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
      display: 'inline-block', padding: '0.12rem 0.55rem',
      borderRadius: 999, fontSize: '0.72rem', fontWeight: 500,
      background: color + '18', color, border: `1px solid ${color}33`,
      backdropFilter: 'blur(8px)',
      boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06)`,
    }}>
      {children}
    </span>
  );
}

const EXERCISE_TYPES = [
  { key: 'open_question', label: 'Questions ouvertes' },
  { key: 'flashcard', label: 'Flashcards' },
  { key: 'code_challenge', label: 'Code challenge' },
  { key: 'reverse_explanation', label: 'Explication inverse' },
  { key: 'mcq', label: 'QCM' },
];

function ExerciseSection({ nodeId, contextDepth }) {
  const generating = useExerciseStore(s => s.generating);
  const generateExercises = useExerciseStore(s => s.generateExercises);
  const openSheet = useExerciseStore(s => s.openSheet);
  const setView = useUiStore(s => s.setView);

  const [showConfig, setShowConfig] = useState(false);
  const [exDepth, setExDepth] = useState(contextDepth);
  const [exCount, setExCount] = useState(5);
  const [exTypes, setExTypes] = useState(['open_question', 'flashcard', 'mcq']);
  const [sheets, setSheets] = useState([]);

  // Load exercise history for this node
  useEffect(() => {
    setSheets(useExerciseStore.getState().getSheetsForNode(nodeId));
  }, [nodeId, generating]); // refresh after generation

  const toggleType = (t) =>
    setExTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  const handleGenerate = async () => {
    if (exTypes.length === 0) return;
    await generateExercises(nodeId, exDepth, exTypes, exCount);
    setShowConfig(false);
    setSheets(useExerciseStore.getState().getSheetsForNode(nodeId));
  };

  const handleOpenSheet = (sheetId) => {
    openSheet(sheetId);
  };

  return (
    <section style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.6rem' }}>
        <h4 style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', flex: 1 }}>
          Exercices ({sheets.length})
        </h4>
        <button className="btn-primary"
          style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
          onClick={() => setShowConfig(v => !v)}
          disabled={generating}>
          {generating ? 'Génération…' : '+ Générer'}
        </button>
      </div>

      {/* Config panel */}
      {showConfig && (
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
          borderTopColor: 'rgba(255,255,255,0.1)',
          borderRadius: 'var(--radius-sm)', padding: '0.75rem 0.85rem',
          marginBottom: '0.75rem', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
        }}>
          {/* Depth */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: '0.5rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            <span>Profondeur</span>
            <input type="range" min="0" max="2" step="1" value={exDepth}
              onChange={e => setExDepth(Number(e.target.value))}
              style={{ width: 60 }} />
            <span style={{ color: 'var(--text)', minWidth: 12 }}>{exDepth}</span>
            <span style={{ flex: 1 }} />
            <span>Nombre</span>
            <input type="number" min="3" max="15" value={exCount}
              onChange={e => setExCount(Math.max(3, Math.min(15, Number(e.target.value))))}
              style={{ width: 40, fontSize: '0.75rem', padding: '0.15rem 0.3rem', textAlign: 'center' }} />
          </div>

          {/* Types */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.6rem' }}>
            {EXERCISE_TYPES.map(({ key, label }) => {
              const active = exTypes.includes(key);
              return (
                <button key={key} onClick={() => toggleType(key)}
                  style={{
                    fontSize: '0.72rem', padding: '0.18rem 0.6rem', borderRadius: 999, cursor: 'pointer',
                    background: active ? 'rgba(167,139,250,0.15)' : 'rgba(255,255,255,0.04)',
                    color: active ? 'var(--accent)' : 'var(--text-muted)',
                    border: `1px solid ${active ? 'rgba(167,139,250,0.3)' : 'rgba(255,255,255,0.08)'}`,
                    fontWeight: active ? 600 : 400,
                    transition: 'all 0.12s',
                  }}>
                  {label}
                </button>
              );
            })}
          </div>

          <button className="btn-primary" style={{ width: '100%', fontSize: '0.82rem' }}
            onClick={handleGenerate}
            disabled={generating || exTypes.length === 0}>
            {generating ? 'Génération en cours…' : `Générer ${exCount} exercices`}
          </button>
        </div>
      )}

      {/* Exercise history */}
      {sheets.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {sheets.slice(0, 5).map(sheet => {
            const date = new Date(sheet.generatedAt);
            const dateStr = date.toLocaleDateString('fr-FR', {
              day: '2-digit', month: '2-digit', year: 'numeric',
              hour: '2-digit', minute: '2-digit',
            });
            return (
              <div key={sheet.id}
                onClick={() => handleOpenSheet(sheet.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.4rem 0.6rem', borderRadius: 10,
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)',
                  cursor: 'pointer', fontSize: '0.8rem', transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(167,139,250,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}
              >
                <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{dateStr}</span>
                <span style={{ color: 'var(--text)', flex: 1 }}>{sheet.exercises.length} exercice(s)</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--accent)' }}>→</span>
              </div>
            );
          })}
          {sheets.length > 5 && (
            <button className="btn-secondary"
              style={{ fontSize: '0.73rem', padding: '0.2rem 0.5rem', alignSelf: 'flex-start', marginTop: '0.25rem' }}
              onClick={() => setView('exercises')}>
              Voir tous ({sheets.length})
            </button>
          )}
        </div>
      )}
    </section>
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

  const isMobile = useIsMobile();

  const [deleting,   setDeleting]   = useState(false);

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

  // Esc: close panel
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') selectNode(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  const node = nodes.find(n => n.id === selectedNodeId);
  if (!node) return null;

  const validIds   = new Set(nodes.map(n => n.id));
  const relations  = (node.relations || []).filter(r => validIds.has(r.target));
  const outgoingIds = new Set(relations.map(r => r.target));
  const backlinks  = nodes
    .filter(n => n.id !== node.id && !outgoingIds.has(n.id) && (n.relations || []).some(r => r.target === node.id))
    .map(n => ({ source: n, ...n.relations.find(r => r.target === node.id) }));
  const color      = getNodeColor(node);
  const statusColor = STATUS_COLORS[node.status] || 'var(--text-muted)';

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleClose = () => selectNode(null);

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

      {/* Panel content — liquid glass over graph */}
      <div style={{
        width: isMobile ? '100%' : panelWidth,
        flex: isMobile ? 1 : undefined,
        background: isMobile
          ? 'linear-gradient(180deg, rgba(12, 9, 32, 0.92) 0%, rgba(6, 4, 26, 0.95) 100%)'
          : 'linear-gradient(160deg, rgba(20, 16, 44, 0.68) 0%, rgba(10, 7, 28, 0.65) 100%)',
        backdropFilter: 'blur(48px) saturate(180%)',
        WebkitBackdropFilter: 'blur(48px) saturate(180%)',
        borderLeft: isMobile ? 'none' : '1px solid var(--border)',
        borderTop: '1px solid var(--border-hi)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: isMobile ? 'none' : '-8px 0 48px rgba(0,0,0,0.3), inset 1px 0 0 rgba(255,255,255,0.04)',
      }}>
        {/* ── Header — liquid glass sub-surface ── */}
        <div style={{
          padding: '0.85rem 1.1rem',
          borderBottom: '1px solid var(--border)',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
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
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.6rem', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', fontSize: '0.82rem', transition: 'all 0.15s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(167,139,250,0.2)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}>
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
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.6rem', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', fontSize: '0.82rem', transition: 'all 0.15s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(167,139,250,0.2)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}>
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

          {/* ── Exercises Section ── */}
          {aiConfigured && editUnlocked && <ExerciseSection nodeId={node.id} contextDepth={contextDepth} />}
        </div>
      </div>
    </div>
  );
}
