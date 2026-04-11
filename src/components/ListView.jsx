import { useState } from 'react';
import { useGraphStore } from '../stores/graphStore.js';
import { useUiStore } from '../stores/uiStore.js';
import { useAiStore } from '../stores/aiStore.js';
import { getNodeColor } from '../lib/graph.js';
import { useIsMobile } from '../hooks/useIsMobile.js';

const STATUS_LABELS    = { learning: 'En apprentissage', to_review: 'À réviser', mastered: 'Maîtrisé' };
const PRIORITY_LABELS  = { low: 'Faible', medium: 'Moyen', high: 'Élevé' };
const PRIORITY_ORDER   = { low: 0, medium: 1, high: 2 };
const STATUS_ORDER     = { learning: 0, to_review: 1, mastered: 2 };

const COL_DEFS = [
  { key: 'label',       label: 'Label' },
  { key: 'category',    label: 'Catégorie' },
  { key: 'priority',    label: 'Priorité' },
  { key: 'status',      label: 'Statut' },
  { key: 'relations',   label: 'Relations' },
  { key: 'next_review', label: 'Prochaine révision' },
];

export default function ListView() {
  const nodes          = useGraphStore(s => s.nodes);
  const links          = useGraphStore(s => s.links);
  const clusters       = useGraphStore(s => s.clusters);
  const selectNode     = useGraphStore(s => s.selectNode);
  const selectedNodeId = useGraphStore(s => s.selectedNodeId);
  const deleteNode     = useGraphStore(s => s.deleteNode);
  const openEditor = useUiStore(s => s.openEditor);
  const editUnlocked = useUiStore(s => s.editUnlocked);
  const addToast = useUiStore(s => s.addToast);
  const isMobile = useIsMobile();

  const [sortKey,      setSortKey]      = useState('label');
  const [sortDir,      setSortDir]      = useState(1);
  const [filterCat,    setFilterCat]    = useState(null);
  const [selected,     setSelected]     = useState(new Set());
  const [deleting,     setDeleting]     = useState(false);

  const toggleSelect = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === sorted.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(sorted.map(n => n.id)));
    }
  };

  const handleDeleteSelected = async () => {
    if (!selected.size) return;
    if (!window.confirm(`Supprimer ${selected.size} nœud${selected.size > 1 ? 's' : ''} ? Cette action est irréversible.`)) return;
    setDeleting(true);
    let ok = 0, fail = 0;
    for (const id of selected) {
      try { await deleteNode(id); ok++; } catch { fail++; }
    }
    setSelected(new Set());
    setDeleting(false);
    addToast(`${ok} supprimé${ok > 1 ? 's' : ''}${fail ? `, ${fail} erreur${fail > 1 ? 's' : ''}` : ''}.`, fail ? 'warning' : 'success');
  };

  const handleColClick = (key) => {
    if (sortKey === key) setSortDir(d => -d);
    else { setSortKey(key); setSortDir(1); }
  };

  const connectionCount = new Map(nodes.map(n => [n.id, 0]));
  links.forEach(l => {
    const s = typeof l.source === 'object' ? l.source.id : l.source;
    const t = typeof l.target === 'object' ? l.target.id : l.target;
    if (connectionCount.has(s)) connectionCount.set(s, connectionCount.get(s) + 1);
    if (connectionCount.has(t)) connectionCount.set(t, connectionCount.get(t) + 1);
  });

  const filtered = filterCat ? nodes.filter(n => n.category === filterCat) : nodes;

  const sorted = [...filtered].sort((a, b) => {
    let va, vb;
    if (sortKey === 'relations') {
      va = connectionCount.get(a.id) || 0;
      vb = connectionCount.get(b.id) || 0;
    } else if (sortKey === 'priority') {
      va = PRIORITY_ORDER[a.priority] ?? -1;
      vb = PRIORITY_ORDER[b.priority] ?? -1;
    } else if (sortKey === 'status') {
      va = STATUS_ORDER[a.status] ?? -1;
      vb = STATUS_ORDER[b.status] ?? -1;
    } else {
      va = (a[sortKey] || '').toString().toLowerCase();
      vb = (b[sortKey] || '').toString().toLowerCase();
    }
    if (va < vb) return -1 * sortDir;
    if (va > vb) return 1 * sortDir;
    return 0;
  });

  const handleRowClick = (nodeId) => {
    const { quizState } = useAiStore.getState();
    if (quizState && !quizState.completed) return;
    selectNode(nodeId);
  };

  const today = new Date().toISOString().split('T')[0];
  const SortIcon = ({ col }) => (
    <span style={{ fontSize: '0.6rem', marginLeft: 4, opacity: sortKey === col ? 1 : 0.3 }}>
      {sortKey === col ? (sortDir === 1 ? '▲' : '▼') : '⇅'}
    </span>
  );

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{
        padding: '0.6rem 1rem', borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0,
      }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
          {filterCat ? `${filterCat} (${filtered.length})` : `${nodes.length} nœud${nodes.length !== 1 ? 's' : ''}`}
        </span>
        <span style={{ flex: 1 }} />
        {editUnlocked && selected.size > 0 && (
          <button className="btn-danger" style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem' }}
            onClick={handleDeleteSelected} disabled={deleting}>
            {deleting ? 'Suppression…' : `Supprimer (${selected.size})`}
          </button>
        )}
        {editUnlocked && (
          <button className="btn-primary" style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem' }}
            onClick={() => openEditor(null)}>
            + Nouveau nœud
          </button>
        )}
      </div>

      {/* Category filters — liquid glass pills */}
      {clusters.length > 0 && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap',
          padding: '0.5rem 1rem', borderBottom: '1px solid var(--border)', flexShrink: 0,
          background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
        }}>
          <button
            onClick={() => setFilterCat(null)}
            style={{
              fontSize: '0.72rem', padding: '0.18rem 0.65rem', borderRadius: 999, cursor: 'pointer',
              background: !filterCat ? 'var(--accent)' : 'rgba(255,255,255,0.04)',
              color: !filterCat ? '#fff' : 'var(--text-muted)',
              border: `1px solid ${!filterCat ? 'var(--accent)' : 'rgba(255,255,255,0.08)'}`,
              boxShadow: !filterCat ? '0 2px 8px rgba(167,139,250,0.3), inset 0 1px 0 rgba(255,255,255,0.15)' : 'inset 0 1px 0 rgba(255,255,255,0.04)',
              transition: 'all 0.15s',
            }}
          >
            Tout
          </button>
          {clusters.map(c => (
            <button
              key={c.category}
              onClick={() => setFilterCat(filterCat === c.category ? null : c.category)}
              style={{
                fontSize: '0.72rem', padding: '0.18rem 0.65rem', borderRadius: 999, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.35rem',
                background: filterCat === c.category ? c.color + '18' : 'rgba(255,255,255,0.04)',
                color: filterCat === c.category ? c.color : 'var(--text-muted)',
                border: `1px solid ${filterCat === c.category ? c.color + '44' : 'rgba(255,255,255,0.08)'}`,
                fontWeight: filterCat === c.category ? 600 : 400,
                boxShadow: filterCat === c.category ? `0 2px 8px ${c.color}33, inset 0 1px 0 rgba(255,255,255,0.1)` : 'inset 0 1px 0 rgba(255,255,255,0.04)',
                transition: 'all 0.15s',
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: c.color, flexShrink: 0, display: 'inline-block', boxShadow: `0 0 4px ${c.color}` }} />
              {c.category}
              <span style={{ opacity: 0.6 }}>{c.node_ids.length}</span>
            </button>
          ))}
        </div>
      )}

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {isMobile ? (
          /* ── Mobile: card layout ── */
          <div style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {sorted.map(node => {
              const isOverdue = node.next_review && node.next_review <= today;
              const color = getNodeColor(node);
              const isSelected = node.id === selectedNodeId;
              const isChecked = selected.has(node.id);
              return (
                <div
                  key={node.id}
                  onClick={() => handleRowClick(node.id)}
                  style={{
                    padding: '0.7rem 0.85rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                    background: isSelected
                      ? 'linear-gradient(160deg, rgba(167,139,250,0.14) 0%, rgba(167,139,250,0.06) 100%)'
                      : 'linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                    border: `1px solid ${isSelected ? 'rgba(167,139,250,0.4)' : 'rgba(255,255,255,0.06)'}`,
                    borderTopColor: isSelected ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.1)',
                    boxShadow: isSelected ? 'var(--shadow-sm), inset 0 1px 0 rgba(255,255,255,0.08)' : 'inset 0 1px 0 rgba(255,255,255,0.05)',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.35rem' }}>
                    {editUnlocked && (
                      <input type="checkbox" checked={isChecked}
                        onChange={(e) => { e.stopPropagation(); toggleSelect(node.id); }}
                        onClick={(e) => e.stopPropagation()}
                        style={{ cursor: 'pointer', accentColor: 'var(--accent)' }} />
                    )}
                    <div style={{ width: 9, height: 9, borderRadius: '50%', background: color, flexShrink: 0, boxShadow: `0 0 4px ${color}` }} />
                    <span style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text)', flex: 1 }}>{node.label}</span>
                    {editUnlocked && (
                      <button className="btn-secondary" style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem' }}
                        onClick={e => { e.stopPropagation(); openEditor(node.id); }}>
                        ✎
                      </button>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', fontSize: '0.73rem', color: 'var(--text-muted)' }}>
                    <span style={{ background: color + '18', color, padding: '0.1rem 0.5rem', borderRadius: 999, border: `1px solid ${color}33` }}>{node.category}</span>
                    <span>{PRIORITY_LABELS[node.priority] || node.priority}</span>
                    <span>{STATUS_LABELS[node.status] || node.status}</span>
                    <span>↔ {connectionCount.get(node.id) || 0}</span>
                    {node.next_review && (
                      <span style={{ color: isOverdue ? 'var(--danger)' : 'var(--text-muted)' }}>
                        📅 {node.next_review}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ── Desktop: table layout ── */
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem' }}>
            <thead style={{ position: 'sticky', top: 0, background: 'linear-gradient(180deg, rgba(20,16,42,0.95) 0%, rgba(16,12,36,0.9) 100%)', backdropFilter: 'blur(20px)', zIndex: 1 }}>
              <tr>
                {editUnlocked && (
                  <th style={{ padding: '0.5rem 0.5rem', borderBottom: '1px solid var(--border)', width: 32 }}>
                    <input type="checkbox"
                      checked={selected.size === sorted.length && sorted.length > 0}
                      onChange={toggleSelectAll}
                      style={{ cursor: 'pointer', accentColor: 'var(--accent)' }} />
                  </th>
                )}
                {COL_DEFS.map(col => (
                  <th
                    key={col.key}
                    onClick={() => handleColClick(col.key)}
                    style={{
                      padding: '0.5rem 0.75rem', textAlign: 'left', cursor: 'pointer',
                      color: sortKey === col.key ? 'var(--accent)' : 'var(--text-muted)',
                      fontWeight: 600, fontSize: '0.72rem',
                      textTransform: 'uppercase', letterSpacing: '0.05em',
                      borderBottom: sortKey === col.key ? '2px solid var(--accent)' : '1px solid var(--border)',
                      userSelect: 'none', transition: 'color 0.15s',
                    }}
                  >
                    {col.label}<SortIcon col={col.key} />
                  </th>
                ))}
                {editUnlocked && <th style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid var(--border)', width: 70 }} />}
              </tr>
            </thead>
            <tbody>
              {sorted.map(node => {
                const isOverdue = node.next_review && node.next_review <= today;
                const color = getNodeColor(node);
                const isSelected = node.id === selectedNodeId;
                const isChecked = selected.has(node.id);
                return (
                  <tr
                    key={node.id}
                    onClick={() => handleRowClick(node.id)}
                    style={{ cursor: 'pointer', background: isSelected ? 'var(--accent)18' : 'transparent', borderLeft: isSelected ? `3px solid var(--accent)` : '3px solid transparent' }}
                    onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'var(--surface2)'; }}
                    onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
                  >
                    {editUnlocked && (
                      <td style={{ padding: '0.45rem 0.5rem', borderBottom: '1px solid var(--border)', width: 32 }}>
                        <input type="checkbox" checked={isChecked}
                          onChange={() => toggleSelect(node.id)}
                          onClick={(e) => e.stopPropagation()}
                          style={{ cursor: 'pointer', accentColor: 'var(--accent)' }} />
                      </td>
                    )}
                    <td style={{ padding: '0.45rem 0.75rem', borderBottom: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0, boxShadow: `0 0 4px ${color}` }} />
                        <span style={{ color: 'var(--text)', fontWeight: 500 }}>{node.label}</span>
                      </div>
                    </td>
                    <td style={{ padding: '0.45rem 0.75rem', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>{node.category}</td>
                    <td style={{ padding: '0.45rem 0.75rem', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>{PRIORITY_LABELS[node.priority] || node.priority}</td>
                    <td style={{ padding: '0.45rem 0.75rem', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)' }}>{STATUS_LABELS[node.status] || node.status}</td>
                    <td style={{ padding: '0.45rem 0.75rem', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', textAlign: 'center' }}>{connectionCount.get(node.id) || 0}</td>
                    <td style={{ padding: '0.45rem 0.75rem', borderBottom: '1px solid var(--border)', color: isOverdue ? 'var(--danger)' : 'var(--text-muted)' }}>{node.next_review || '—'}</td>
                    {editUnlocked && (
                      <td style={{ padding: '0.45rem 0.75rem', borderBottom: '1px solid var(--border)' }}
                        onClick={e => { e.stopPropagation(); openEditor(node.id); }}>
                        <button className="btn-secondary" style={{ fontSize: '0.72rem', padding: '0.15rem 0.4rem' }}>
                          Modifier
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {nodes.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            Aucun nœud pour l'instant.
          </div>
        )}
      </div>
    </div>
  );
}
