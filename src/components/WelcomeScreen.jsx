import { useState } from 'react';
import { useGraphStore } from '../stores/graphStore.js';
import { BUILTIN_VIEWS, getUserViews, saveUserView, deleteUserView } from '../lib/vaultLoader.js';
import { getNodeColor } from '../lib/graph.js';

const EMOJI_LIST = [
  '📚','🧠','💻','🖥️','🔐','🌐','📊','🎯','🔬','🏗️',
  '⚙️','🚀','📡','🔧','💡','🎓','🏆','🔮','⚡','🎨',
  '🔍','📝','🗂️','🧩','🌊','🏛️','⚗️','🔭','🤖','🧬',
  '🌍','🛡️','🗺️','📐','🔑','🧪','🌱','🏔️','💾','🎲',
];

const KNOWN_CATEGORIES = ['devops', 'web', 'network', 'security', 'database', 'language', 'concept'];

// ── Create view modal ─────────────────────────────────────────────────────────

function CreateViewModal({ existingCategories, onClose, onCreated }) {
  const [name, setName]           = useState('');
  const [icon, setIcon]           = useState('📚');
  const [selected, setSelected]   = useState([]); // categories
  const [error, setError]         = useState('');

  const allCats = [...new Set([...KNOWN_CATEGORIES, ...existingCategories])].sort();

  const toggleCat = (cat) =>
    setSelected(s => s.includes(cat) ? s.filter(c => c !== cat) : [...s, cat]);

  const handleCreate = () => {
    const trimmed = name.trim();
    if (!trimmed) { setError('Le nom est requis.'); return; }
    if (!/^[a-zA-Z0-9 _\-À-ÿ]+$/.test(trimmed)) {
      setError('Nom invalide (lettres, chiffres, espaces, tirets).');
      return;
    }
    saveUserView({
      name: trimmed,
      icon,
      categories: selected.length > 0 ? selected : null, // null = show all
    });
    onCreated();
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200,
    }} onClick={onClose}>
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 12, padding: '1.75rem', width: 460, maxWidth: '95vw',
        display: 'flex', flexDirection: 'column', gap: '1.25rem',
      }} onClick={e => e.stopPropagation()}>

        <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)' }}>
          Nouvelle vue
        </h2>

        {/* Name */}
        <div>
          <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
            Nom
          </label>
          <input
            autoFocus
            value={name}
            onChange={e => { setName(e.target.value); setError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleCreate()}
            placeholder="ex. Mon DevOps"
            style={{ width: '100%' }}
          />
          {error && <p style={{ color: 'var(--danger)', fontSize: '0.78rem', marginTop: '0.3rem' }}>{error}</p>}
        </div>

        {/* Categories */}
        <div>
          <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
            Filtrer par catégories{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 400 }}>(laisser vide = tout afficher)</span>
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {allCats.map(cat => {
              const active = selected.includes(cat);
              const color = getNodeColor({ category: cat, color: null });
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCat(cat)}
                  style={{
                    padding: '0.25rem 0.6rem', borderRadius: 20, fontSize: '0.78rem',
                    cursor: 'pointer', fontWeight: active ? 600 : 400,
                    background: active ? color + '33' : 'var(--bg)',
                    color: active ? color : 'var(--text-muted)',
                    border: `1px solid ${active ? color : 'var(--border)'}`,
                    transition: 'all 0.12s',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Icon picker */}
        <div>
          <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.35rem' }}>
            Icône sélectionnée : <span style={{ fontSize: '1.3rem', verticalAlign: 'middle' }}>{icon}</span>
          </label>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '0.4rem',
            maxHeight: 140, overflowY: 'auto',
            background: 'var(--bg)', border: '1px solid var(--border)',
            borderRadius: 6, padding: '0.6rem',
          }}>
            {EMOJI_LIST.map(e => (
              <button
                key={e}
                type="button"
                onClick={() => setIcon(e)}
                style={{
                  fontSize: '1.35rem', width: 38, height: 38, borderRadius: 8,
                  border: 'none', background: 'transparent', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: icon === e ? '0 0 0 2px var(--accent)' : 'none',
                  transition: 'box-shadow 0.12s',
                }}
              >{e}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button className="btn-secondary" onClick={onClose}>Annuler</button>
          <button className="btn-primary" onClick={handleCreate}>Créer</button>
        </div>
      </div>
    </div>
  );
}

// ── Main welcome screen ───────────────────────────────────────────────────────

export default function WelcomeScreen() {
  const nodes        = useGraphStore(s => s.nodes);
  const storageMode  = useGraphStore(s => s.storageMode);
  const setActiveView = useGraphStore(s => s.setActiveView);

  const [userViews, setUserViews]     = useState(() => getUserViews());
  const [showCreate, setShowCreate]   = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const refreshViews = () => setUserViews(getUserViews());

  // Count nodes visible in a given view
  const countFor = (view) => {
    if (!storageMode) return null; // not loaded yet
    if (!view.categories) return nodes.length;
    return nodes.filter(n => view.categories.includes(n.category)).length;
  };

  // All existing categories in the graph (for create modal)
  const existingCategories = [...new Set(nodes.map(n => n.category).filter(Boolean))];

  const allViews = [...BUILTIN_VIEWS, ...userViews];

  return (
    <div style={{
      flex: 1, width: '100%',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: '2.5rem', padding: '2rem',
    }}>
      {/* Brand */}
      <div style={{ textAlign: 'center' }}>
        <h1 style={{
          fontSize: '2.6rem', fontWeight: 800, marginBottom: '0.4rem',
          background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.03em',
        }}>
          DamdiPedia
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: 440, lineHeight: 1.6, fontSize: '0.95rem' }}>
          Choisissez une vue pour explorer votre base de connaissances IT.
        </p>
      </div>

      {/* View grid */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', maxWidth: 780 }}>
        {allViews.map(v => {
          const count = countFor(v);
          const isUser = !v.builtin;
          return (
            <button
              key={v.name}
              onClick={() => setActiveView(v)}
              style={{
                width: 160, minHeight: 130, position: 'relative',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: '0.65rem',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 12, cursor: 'pointer',
                transition: 'border-color 0.15s, box-shadow 0.15s, transform 0.12s',
                padding: '1.25rem 0.75rem',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.boxShadow = 'var(--glow-violet)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Delete button for user views */}
              {isUser && (
                <span
                  onClick={e => { e.stopPropagation(); setConfirmDelete(v.name); }}
                  title="Supprimer cette vue"
                  style={{
                    position: 'absolute', top: 6, right: 8,
                    fontSize: '0.7rem', color: 'var(--text-muted)', cursor: 'pointer',
                    padding: '2px 4px', borderRadius: 4,
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--danger)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >✕</span>
              )}

              <span style={{ fontSize: '2rem', lineHeight: 1 }}>{v.icon}</span>
              <span style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text)', textAlign: 'center' }}>
                {v.name}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {count === null ? '…'
                  : count === 0 ? 'Aucun nœud'
                  : `${count} nœud${count > 1 ? 's' : ''}`}
              </span>

              {/* Category tags */}
              {v.categories && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center', marginTop: 2 }}>
                  {v.categories.slice(0, 3).map(c => (
                    <span key={c} style={{
                      fontSize: '0.62rem', padding: '1px 5px', borderRadius: 10,
                      background: 'var(--surface2)', color: 'var(--text-muted)', border: '1px solid var(--border)',
                    }}>{c}</span>
                  ))}
                  {v.categories.length > 3 && (
                    <span style={{ fontSize: '0.62rem', color: 'var(--text-muted)' }}>+{v.categories.length - 3}</span>
                  )}
                </div>
              )}
            </button>
          );
        })}

        {/* Add view button */}
        <button
          onClick={() => setShowCreate(true)}
          style={{
            width: 160, minHeight: 130,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: '0.6rem',
            background: 'transparent',
            border: '2px dashed var(--border)',
            borderRadius: 12, cursor: 'pointer',
            color: 'var(--text-muted)',
            transition: 'border-color 0.15s, color 0.15s',
            padding: '1.25rem 0.75rem',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.color = 'var(--accent)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.color = 'var(--text-muted)';
          }}
        >
          <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>+</span>
          <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>Nouvelle vue</span>
        </button>
      </div>

      {/* Modals */}
      {showCreate && (
        <CreateViewModal
          existingCategories={existingCategories}
          onClose={() => setShowCreate(false)}
          onCreated={refreshViews}
        />
      )}

      {confirmDelete && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200,
        }}>
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 12, padding: '1.5rem', maxWidth: 340, width: '90%',
            display: 'flex', flexDirection: 'column', gap: '1rem',
          }}>
            <p style={{ color: 'var(--text)' }}>
              Supprimer la vue <strong>« {confirmDelete} »</strong> ?
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button className="btn-secondary" onClick={() => setConfirmDelete(null)}>Annuler</button>
              <button
                onClick={() => {
                  deleteUserView(confirmDelete);
                  setConfirmDelete(null);
                  refreshViews();
                }}
                style={{ background: 'var(--danger)', color: '#fff', border: 'none', borderRadius: 6, padding: '0.35rem 0.85rem', cursor: 'pointer', fontSize: '0.85rem' }}
              >Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
