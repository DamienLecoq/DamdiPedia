import { useState } from 'react';
import { useGraphStore } from '../stores/graphStore.js';
import { useUiStore } from '../stores/uiStore.js';

function SectionTitle({ children, count, color }) {
  return (
    <h3 style={{
      fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.5rem',
      color: color || 'var(--warning)', textTransform: 'capitalize',
    }}>
      {children}
      {count != null && <span style={{ fontWeight: 400, color: 'var(--text-muted)', marginLeft: 6 }}>({count})</span>}
    </h3>
  );
}

function DanglingSection({ warnings, fixOne, fixAll }) {
  const [fixing, setFixing] = useState(false);
  const handleFixAll = async () => {
    setFixing(true);
    try { await fixAll(); } finally { setFixing(false); }
  };

  return (
    <section style={{ marginBottom: '1.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <SectionTitle count={warnings.length}>Relations orphelines</SectionTitle>
        <span style={{ flex: 1 }} />
        <button className="btn-danger" style={{ fontSize: '0.75rem', padding: '0.2rem 0.55rem' }}
          onClick={handleFixAll} disabled={fixing}>
          {fixing ? 'Correction…' : 'Tout corriger'}
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        {warnings.map((w, i) => {
          const nodeId = w.file.replace('.md', '');
          const match = w.detail.match(/Broken link to '([^']+)'/);
          const relTarget = match?.[1] || '';
          return (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.06)', borderTopColor: 'rgba(255,255,255,0.1)',
              borderRadius: 12, padding: '0.45rem 0.85rem', fontSize: '0.82rem',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
            }}>
              <span style={{ color: 'var(--text)' }}>{w.file}</span>
              <span style={{ flex: 1, color: 'var(--text-muted)' }}>— {w.detail}</span>
              <button className="btn-secondary" style={{ fontSize: '0.72rem', padding: '0.15rem 0.4rem', flexShrink: 0 }}
                onClick={() => fixOne(nodeId, relTarget)}>
                Corriger
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ParseErrorSection({ warnings, rawContentCache }) {
  const [expanded, setExpanded] = useState(null);
  return (
    <section style={{ marginBottom: '1.75rem' }}>
      <SectionTitle count={warnings.length}>Erreurs de parsing</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {warnings.map((w, i) => {
          const raw = rawContentCache?.get(w.file);
          const isOpen = expanded === i;
          return (
            <div key={i} style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.06)', borderTopColor: 'rgba(255,255,255,0.1)', borderRadius: 12, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' }}>
              <div style={{ padding: '0.4rem 0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--danger)' }}>{w.file}</span>
                <span style={{ flex: 1, color: 'var(--text-muted)' }}>— {w.detail}</span>
                <button className="btn-secondary" style={{ fontSize: '0.72rem', padding: '0.15rem 0.4rem', flexShrink: 0 }}
                  onClick={() => setExpanded(isOpen ? null : i)}>
                  {isOpen ? 'Masquer' : 'Voir brut'}
                </button>
              </div>
              {isOpen && (
                <pre style={{
                  margin: 0, padding: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(0,0,0,0.2)', borderRadius: '0 0 12px 12px',
                  fontSize: '0.75rem', color: 'var(--text-muted)',
                  overflowX: 'auto', maxHeight: 300,
                  fontFamily: "'Cascadia Code','Fira Code','Consolas',monospace",
                }}>
                  {raw ?? 'Rouvrez le dossier pour rescanner.'}
                </pre>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SlugCollisionSection({ warnings, openEditor, nodes }) {
  return (
    <section style={{ marginBottom: '1.75rem' }}>
      <SectionTitle count={warnings.length}>Collisions de slug</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        {warnings.map((w, i) => {
          const nodeId = w.file.replace('.md', '');
          const node = nodes.find(n => n.id === nodeId);
          return (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.06)', borderTopColor: 'rgba(255,255,255,0.1)',
              borderRadius: 12, padding: '0.45rem 0.85rem', fontSize: '0.82rem',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
            }}>
              <span style={{ color: 'var(--text)' }}>{w.file}</span>
              <span style={{ flex: 1, color: 'var(--text-muted)' }}>— {w.detail}</span>
              {node && (
                <button className="btn-secondary" style={{ fontSize: '0.72rem', padding: '0.15rem 0.4rem', flexShrink: 0 }}
                  onClick={() => openEditor(node.id)}>
                  Renommer
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function GraphHealthPanel() {
  const warnings = useGraphStore(s => s.warnings);
  const rawContentCache = useGraphStore(s => s.rawContentCache);
  const nodes = useGraphStore(s => s.nodes);
  const fixDanglingRelation = useGraphStore(s => s.fixDanglingRelation);
  const fixAllDanglingRelations = useGraphStore(s => s.fixAllDanglingRelations);
  const openEditor = useUiStore(s => s.openEditor);

  const dangling = warnings.filter(w => w.type === 'dangling_relation');
  const parseErrors = warnings.filter(w => w.type === 'parse_error');
  const collisions = warnings.filter(w => w.type === 'slug_collision');
  const other = warnings.filter(w => !['dangling_relation', 'parse_error', 'slug_collision'].includes(w.type));
  const relevant = dangling.length + parseErrors.length + collisions.length;

  if (relevant === 0 && other.length === 0) {
    return (
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--success)', fontSize: '1rem', gap: '0.5rem',
      }}>
        ✓ Votre graphe de connaissances est en bonne santé.
      </div>
    );
  }

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', maxWidth: 760, margin: '0 auto', width: '100%' }}>
      <h2 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text)' }}>
        Santé du graphe
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 400, marginLeft: 10 }}>
          {relevant} problème{relevant !== 1 ? 's' : ''}
        </span>
      </h2>

      {dangling.length > 0 && (
        <DanglingSection warnings={dangling} fixOne={fixDanglingRelation} fixAll={fixAllDanglingRelations} />
      )}
      {parseErrors.length > 0 && (
        <ParseErrorSection warnings={parseErrors} rawContentCache={rawContentCache} />
      )}
      {collisions.length > 0 && (
        <SlugCollisionSection warnings={collisions} openEditor={openEditor} nodes={nodes} />
      )}
      {other.map((w, i) => (
        <section key={i} style={{ marginBottom: '1rem' }}>
          <div style={{
            background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.06)', borderTopColor: 'rgba(255,255,255,0.1)',
            borderRadius: 12, padding: '0.45rem 0.85rem', fontSize: '0.82rem', color: 'var(--text-muted)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
          }}>
            {w.type}: {w.detail}
          </div>
        </section>
      ))}
    </div>
  );
}
