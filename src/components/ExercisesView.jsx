import { useState, useMemo } from 'react';
import { useExerciseStore } from '../stores/exerciseStore.js';
import { useIsMobile } from '../hooks/useIsMobile.js';

const TYPE_LABELS = {
  open_question: 'Question ouverte',
  flashcard: 'Flashcard',
  code_challenge: 'Code challenge',
  reverse_explanation: 'Explication inverse',
  mcq: 'QCM',
};

const TAG_COLORS = { done: '#34d399', good: '#60a5fa', redo: '#fbbf24', hard: '#f87171' };
const TAG_LABELS = { done: 'Fait', good: 'Bien', redo: 'A refaire', hard: 'Difficile' };

export default function ExercisesView() {
  const removeSheet = useExerciseStore(s => s.removeSheet);
  const openSheet = useExerciseStore(s => s.openSheet);
  const activeSheetId = useExerciseStore(s => s.activeSheetId);
  const isMobile = useIsMobile();

  const [search, setSearch] = useState('');
  const [filterNode, setFilterNode] = useState(null);

  // Load all sheets (re-read on every render — localStorage is the source of truth)
  const allSheets = useMemo(() => useExerciseStore.getState().getAllSheets(), [activeSheetId]);

  // Unique node labels for filter
  const nodeLabels = useMemo(() => {
    const labels = new Map();
    allSheets.forEach(s => labels.set(s.nodeId, s.nodeLabel));
    return [...labels.entries()];
  }, [allSheets]);

  // Filter + search (title, tags, themes, node labels, questions)
  const filtered = useMemo(() => {
    let result = allSheets;
    if (filterNode) result = result.filter(s => s.nodeId === filterNode);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(s => {
        const title = (s.title || s.nodeLabel).toLowerCase();
        const tags = (s.tags || []).map(t => (TAG_LABELS[t] || t).toLowerCase()).join(' ');
        const themes = (s.themes || []).join(' ').toLowerCase();
        const nodes = [s.nodeLabel, ...(s.relatedNodes || []).map(n => n.label)].join(' ').toLowerCase();
        return title.includes(q) || tags.includes(q) || themes.includes(q) || nodes.includes(q) ||
          s.exercises.some(ex => ex.question.toLowerCase().includes(q));
      });
    }
    return result;
  }, [allSheets, filterNode, search]);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        padding: isMobile ? '0.5rem 0.65rem' : '0.6rem 1rem',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
      }}>
        <span style={{ fontSize: '0.92rem', fontWeight: 600 }}>
          {filtered.length} fiche{filtered.length !== 1 ? 's' : ''} d'exercices
        </span>
        <span style={{ flex: 1 }} />
      </div>

      {/* Filters */}
      <div style={{
        padding: '0.45rem 1rem', borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', flexShrink: 0,
      }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher dans les exercices…"
          style={{
            flex: 1, minWidth: 180, maxWidth: 320,
            fontSize: '0.82rem', padding: '0.3rem 0.8rem',
          }}
        />
        {nodeLabels.length > 1 && (
          <>
            <button
              onClick={() => setFilterNode(null)}
              style={{
                fontSize: '0.72rem', padding: '0.15rem 0.6rem', borderRadius: 999, cursor: 'pointer',
                background: !filterNode ? 'var(--accent)' : 'rgba(255,255,255,0.04)',
                color: !filterNode ? '#fff' : 'var(--text-muted)',
                border: `1px solid ${!filterNode ? 'var(--accent)' : 'rgba(255,255,255,0.08)'}`,
                boxShadow: !filterNode ? '0 2px 8px rgba(167,139,250,0.3)' : 'none',
              }}
            >
              Tout
            </button>
            {nodeLabels.map(([id, label]) => (
              <button
                key={id}
                onClick={() => setFilterNode(filterNode === id ? null : id)}
                style={{
                  fontSize: '0.72rem', padding: '0.15rem 0.6rem', borderRadius: 999, cursor: 'pointer',
                  background: filterNode === id ? 'rgba(167,139,250,0.15)' : 'rgba(255,255,255,0.04)',
                  color: filterNode === id ? 'var(--accent)' : 'var(--text-muted)',
                  border: `1px solid ${filterNode === id ? 'rgba(167,139,250,0.3)' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                {label}
              </button>
            ))}
          </>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '0.5rem' : '1rem' }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            {allSheets.length === 0
              ? 'Aucun exercice généré. Ouvrez un nœud et cliquez sur « Générer des exercices ».'
              : 'Aucun résultat pour cette recherche.'}
          </div>
        )}

        <div style={{
            display: 'flex', flexDirection: 'column', gap: '0.6rem',
            maxWidth: 800, margin: '0 auto', width: '100%',
          }}>
            {filtered.map(sheet => {
              const date = new Date(sheet.generatedAt);
              const dateStr = date.toLocaleDateString('fr-FR', {
                day: '2-digit', month: '2-digit', year: 'numeric',
                hour: '2-digit', minute: '2-digit',
              });
              const typeCounts = {};
              sheet.exercises.forEach(ex => { typeCounts[ex.type] = (typeCounts[ex.type] || 0) + 1; });
              const displayTitle = sheet.title || sheet.nodeLabel;
              const tags = sheet.tags || [];
              const themes = sheet.themes || (sheet.nodeCategory ? [sheet.nodeCategory] : []);
              const nodeNames = [sheet.nodeLabel, ...(sheet.relatedNodes || []).map(n => n.label)];

              return (
                <div key={sheet.id}
                  onClick={() => openSheet(sheet.id)}
                  style={{
                    padding: '0.75rem 1rem', cursor: 'pointer',
                    background: 'linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderTopColor: 'rgba(255,255,255,0.12)',
                    borderRadius: 'var(--radius-sm)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(167,139,250,0.25)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
                >
                  {/* Title + date + count + delete */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {displayTitle}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', flexShrink: 0 }}>
                      {dateStr}
                    </span>
                    {/* Tags inline */}
                    {tags.map(t => (
                      <span key={t} style={{
                        fontSize: '0.62rem', padding: '0.06rem 0.35rem', borderRadius: 999, flexShrink: 0,
                        background: (TAG_COLORS[t] || '#888') + '22', color: TAG_COLORS[t] || '#888',
                        border: `1px solid ${(TAG_COLORS[t] || '#888') + '55'}`, fontWeight: 600,
                      }}>{TAG_LABELS[t] || t}</span>
                    ))}
                    <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: 'var(--accent)', flexShrink: 0 }}>
                      {sheet.exercises.length} ex.
                    </span>
                    <button
                      onClick={e => { e.stopPropagation(); if (window.confirm('Supprimer cette fiche ?')) removeSheet(sheet.id); }}
                      style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem', padding: '0 2px', flexShrink: 0 }}
                      title="Supprimer"
                    >{'\u2715'}</button>
                  </div>
                  {/* Themes + nodes + types */}
                  <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                    {themes.map(t => (
                      <span key={t} style={{ fontSize: '0.65rem', color: 'var(--accent)', padding: '0.05rem 0.35rem', borderRadius: 999, background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)' }}>
                        {t}
                      </span>
                    ))}
                    {nodeNames.map((n, i) => (
                      <span key={i} style={{
                        fontSize: '0.65rem', padding: '0.05rem 0.35rem', borderRadius: 999,
                        color: i === 0 ? 'var(--success)' : 'var(--text-muted)',
                        background: i === 0 ? 'rgba(52,211,153,0.08)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${i === 0 ? 'rgba(52,211,153,0.2)' : 'rgba(255,255,255,0.06)'}`,
                      }}>{n}</span>
                    ))}
                    {Object.entries(typeCounts).map(([type, count]) => (
                      <span key={type} style={{ fontSize: '0.65rem', color: 'var(--text-muted)', padding: '0.05rem 0.35rem', borderRadius: 999, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                        {TYPE_LABELS[type]} {'\u00D7'}{count}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
      </div>

    </div>
  );
}
