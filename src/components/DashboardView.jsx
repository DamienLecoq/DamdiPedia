import { useGraphStore } from '../stores/graphStore.js';
import { useUiStore } from '../stores/uiStore.js';
import { getNodeColor } from '../lib/graph.js';
import { useIsMobile } from '../hooks/useIsMobile.js';

const TODAY = new Date().toISOString().split('T')[0];

function StatCard({ label, value, color }) {
  return (
    <div style={{
      background: 'linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.025) 100%)',
      border: '1px solid var(--border)', borderTopColor: 'var(--border-hi)',
      borderRadius: 'var(--radius)',
      padding: '0.85rem 1.35rem', textAlign: 'center', minWidth: 110,
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      boxShadow: 'var(--shadow-sm), inset 0 1px 0 rgba(255,255,255,0.07)',
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: color || 'var(--accent)' }}>{value}</div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>{label}</div>
    </div>
  );
}

function ProgressBar({ value, max, color }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 7, background: 'rgba(255,255,255,0.06)', borderRadius: 999, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{
          width: `${pct}%`, height: '100%',
          background: `linear-gradient(90deg, ${color || 'var(--accent)'}, ${color || 'var(--accent)'}cc)`,
          borderRadius: 999, boxShadow: `0 0 8px ${color || 'var(--accent)'}55`,
          transition: 'width 0.4s ease',
        }} />
      </div>
      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', minWidth: 38, textAlign: 'right' }}>
        {value}/{max}
      </span>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h3 style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>
      {children}
    </h3>
  );
}

export default function DashboardView() {
  const nodes   = useGraphStore(s => s.nodes);
  const links   = useGraphStore(s => s.links);
  const warnings = useGraphStore(s => s.warnings);
  const selectNode = useGraphStore(s => s.selectNode);
  const openEditor = useUiStore(s => s.openEditor);
  const setView = useUiStore(s => s.setView);
  const editUnlocked = useUiStore(s => s.editUnlocked);
  const isMobile = useIsMobile();

  const dueNodes = nodes
    .filter(n => n.next_review && n.next_review <= TODAY)
    .sort((a, b) => (a.next_review || '').localeCompare(b.next_review || ''));

  const recentNodes = [...nodes]
    .sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')))
    .slice(0, 5);

  const categoryStats = {};
  nodes.forEach(n => {
    if (!categoryStats[n.category]) categoryStats[n.category] = { total: 0, mastered: 0, color: getNodeColor(n) };
    categoryStats[n.category].total++;
    if (n.status === 'mastered') categoryStats[n.category].mastered++;
  });

  const categoriesSorted = Object.entries(categoryStats).sort((a, b) => b[1].total - a[1].total);

  const dangling = warnings.filter(w => w.type === 'dangling_relation');
  const healthy  = dangling.length === 0 && warnings.filter(w => w.type !== 'memory_warning').length === 0;

  const handleNodeClick = (nodeId) => {
    selectNode(nodeId);
    setView('graph');
  };

  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '0.75rem' : '1.5rem', maxWidth: 800, margin: '0 auto', width: '100%' }}>
      {/* Stats */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <StatCard label="Nœuds" value={nodes.length} />
        <StatCard label="Catégories" value={Object.keys(categoryStats).length} color="var(--success)" />
        <StatCard label="Relations" value={links.length} color="var(--accent)" />
        <StatCard label="Alertes" value={warnings.filter(w => w.type !== 'memory_warning').length}
          color={healthy ? 'var(--success)' : 'var(--warning)'} />
      </div>

      {/* Graph health badge — liquid glass */}
      <div style={{
        marginBottom: '1.75rem',
        padding: '0.7rem 1.1rem', borderRadius: 'var(--radius)',
        background: healthy
          ? 'linear-gradient(160deg, rgba(52,211,153,0.08) 0%, rgba(52,211,153,0.03) 100%)'
          : 'linear-gradient(160deg, rgba(251,191,36,0.08) 0%, rgba(251,191,36,0.03) 100%)',
        border: `1px solid ${healthy ? 'rgba(52,211,153,0.3)' : 'rgba(251,191,36,0.3)'}`,
        borderTopColor: 'rgba(255,255,255,0.12)',
        display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem',
        backdropFilter: 'blur(16px)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
      }}>
        {healthy ? (
          <span style={{ color: 'var(--success)' }}>✓ Le graphe est en bonne santé.</span>
        ) : (
          <>
            <span style={{ color: 'var(--warning)' }}>
              ⚠ {warnings.filter(w => w.type !== 'memory_warning').length} alerte(s) détectée(s).
            </span>
            <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.2rem 0.55rem' }}
              onClick={() => setView('health')}>
              Voir la santé
            </button>
          </>
        )}
      </div>

      {/* À réviser */}
      {dueNodes.length > 0 && (
        <section style={{ marginBottom: '1.75rem' }}>
          <SectionTitle>À réviser ({dueNodes.length})</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {dueNodes.slice(0, 8).map(node => (
              <div key={node.id}
                onClick={() => handleNodeClick(node.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '0.45rem 0.85rem',
                  background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.06)', borderTopColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 12,
                  cursor: 'pointer', fontSize: '0.83rem',
                  transition: 'all 0.15s', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(167,139,250,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.035)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: getNodeColor(node), flexShrink: 0, boxShadow: `0 0 4px ${getNodeColor(node)}` }} />
                <span style={{ flex: 1 }}>{node.label}</span>
                <span style={{ color: 'var(--danger)', fontSize: '0.75rem' }}>{node.next_review}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Quick add */}
      {editUnlocked && (
        <div style={{ marginBottom: '1.75rem' }}>
          <button className="btn-primary" onClick={() => openEditor(null)}
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
            + Nouveau nœud
          </button>
        </div>
      )}

      {/* Maîtrise par catégorie */}
      {categoriesSorted.length > 0 && (
        <section style={{ marginBottom: '1.75rem' }}>
          <SectionTitle>Maîtrise par catégorie</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {categoriesSorted.map(([cat, stat]) => (
              <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.83rem' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: stat.color, flexShrink: 0, boxShadow: `0 0 4px ${stat.color}` }} />
                <span style={{ width: 90, color: 'var(--text)', flexShrink: 0 }}>{cat}</span>
                <div style={{ flex: 1 }}>
                  <ProgressBar value={stat.mastered} max={stat.total} color={stat.color} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Récemment ajoutés */}
      {recentNodes.length > 0 && (
        <section>
          <SectionTitle>Récemment ajoutés</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {recentNodes.map(node => (
              <div key={node.id}
                onClick={() => handleNodeClick(node.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8, padding: '0.4rem 0.85rem',
                  background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.06)', borderTopColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 12,
                  cursor: 'pointer', fontSize: '0.83rem',
                  transition: 'all 0.15s', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(167,139,250,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.035)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: getNodeColor(node), flexShrink: 0, boxShadow: `0 0 4px ${getNodeColor(node)}` }} />
                <span style={{ flex: 1 }}>{node.label}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.73rem' }}>
                  {node.createdAt ? String(node.createdAt).split('T')[0] : ''}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
