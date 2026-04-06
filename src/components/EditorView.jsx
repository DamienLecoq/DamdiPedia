import { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useGraphStore } from '../stores/graphStore.js';
import RichTextEditor from './RichTextEditor.jsx';
import { useUiStore } from '../stores/uiStore.js';
import { slugify } from '../lib/slugify.js';
import { getNodeColor, CATEGORY_COLOR_MAP } from '../lib/graph.js';
import { useIsMobile } from '../hooks/useIsMobile.js';
import NodeTargetSelector from './NodeTargetSelector.jsx';

const KNOWN_CATEGORIES = ['langage', 'framework', 'logiciel', 'os', 'protocole', 'bdd', 'service', 'concept', 'materiel'];
const KNOWN_REL_TYPES  = ['uses', 'depends_on', 'related', 'part_of', 'extends', 'implements'];
const RESOURCE_TYPES   = ['documentation', 'video', 'blog', 'course', 'book', 'other'];
const CHAR_WARN_LIMIT  = 10000;

const PRIORITY_LABELS = [
  ['low',    'Faible'],
  ['medium', 'Moyen'],
  ['high',   'Élevé'],
];
const STATUS_LABELS = [
  ['learning',   'En apprentissage'],
  ['to_review',  'À réviser'],
  ['mastered',   'Maîtrisé'],
];

function RelationRow({ rel, index, nodes, onChange, onRemove, compact }) {
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: compact ? 'flex-start' : 'center', marginBottom: 6, flexWrap: compact ? 'wrap' : 'nowrap' }}>
      <NodeTargetSelector
        value={rel.target}
        onChange={val => onChange(index, 'target', val)}
        nodes={nodes}
      />
      <input
        value={rel.type || ''}
        onChange={e => onChange(index, 'type', e.target.value)}
        list="rel-type-list"
        placeholder="type"
        style={{ width: compact ? 90 : 120, fontSize: '0.82rem', padding: '0.3rem 0.5rem' }}
      />
      {!compact && (
        <input
          type="range" min="0" max="1" step="0.1"
          value={rel.weight ?? 0.5}
          onChange={e => onChange(index, 'weight', parseFloat(e.target.value))}
          style={{ width: 70 }}
        />
      )}
      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', minWidth: 24 }}>
        {(rel.weight ?? 0.5).toFixed(1)}
      </span>
      <button type="button" onClick={() => onRemove(index)}
        style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '0.9rem', padding: '0 2px' }}>
        ✕
      </button>
    </div>
  );
}

function ResourceRow({ res, index, onChange, onRemove, compact }) {
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: compact ? 'flex-start' : 'center', marginBottom: compact ? 10 : 6, flexWrap: compact ? 'wrap' : 'nowrap' }}>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', width: compact ? '100%' : 'auto' }}>
        <select value={res.type || 'documentation'} onChange={e => onChange(index, 'type', e.target.value)}
          style={{ fontSize: '0.82rem', padding: '0.3rem 0.4rem' }}>
          {RESOURCE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <input value={res.title || ''} onChange={e => onChange(index, 'title', e.target.value)}
          placeholder="Titre" style={{ flex: 1, fontSize: '0.82rem', padding: '0.3rem 0.5rem' }} />
        <button type="button" onClick={() => onRemove(index)}
          style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontSize: '0.9rem', padding: '0 2px' }}>
          ✕
        </button>
      </div>
      <input value={res.url || ''} onChange={e => onChange(index, 'url', e.target.value)}
        placeholder="URL" style={{ flex: compact ? undefined : 2, width: compact ? '100%' : 'auto', fontSize: '0.82rem', padding: '0.3rem 0.5rem' }} />
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>
      {children}
    </div>
  );
}

export default function EditorView() {
  const nodes        = useGraphStore(s => s.nodes);
  const saveEditorNode = useGraphStore(s => s.saveEditorNode);
  const editingNodeId = useUiStore(s => s.editingNodeId);
  const closeEditor  = useUiStore(s => s.closeEditor);
  const setEditorDirty = useUiStore(s => s.setEditorDirty);
  const editorDirty  = useUiStore(s => s.editorDirty);

  const isMobile = useIsMobile();
  const isCreating = editingNodeId === null;
  const source = isCreating ? null : nodes.find(n => n.id === editingNodeId);

  const [label,     setLabel]     = useState(source?.label ?? '');
  const [category,  setCategory]  = useState(source?.category ?? 'concept');
  const [color,     setColor]     = useState(source?.color ?? '');
  const [priority,  setPriority]  = useState(source?.priority ?? 'medium');
  const [status,    setStatus]    = useState(source?.status ?? 'learning');
  const [relations, setRelations] = useState(source?.relations ? JSON.parse(JSON.stringify(source.relations)) : []);
  const [resources, setResources] = useState(source?.resources ? JSON.parse(JSON.stringify(source.resources)) : []);
  const [body,      setBody]      = useState(source?.markdown_body ?? '');
  const [rawMode,   setRawMode]   = useState(false);
  const rteKey = useRef(0); // increment to remount RichTextEditor with latest body
  const [saving,    setSaving]    = useState(false);
  const [saveError, setSaveError] = useState(null);

  const dirty = () => setEditorDirty(true);

  const slugPreview = slugify(label);
  const charCount = body.length;

  const changeRelation = (i, key, val) => {
    setRelations(r => { const a = [...r]; a[i] = { ...a[i], [key]: val }; return a; });
    dirty();
  };
  const removeRelation = (i) => { setRelations(r => r.filter((_, idx) => idx !== i)); dirty(); };
  const addRelation    = () => { setRelations(r => [...r, { target: '', type: 'related', weight: 0.5 }]); dirty(); };

  const changeResource = (i, key, val) => {
    setResources(r => { const a = [...r]; a[i] = { ...a[i], [key]: val }; return a; });
    dirty();
  };
  const removeResource = (i) => { setResources(r => r.filter((_, idx) => idx !== i)); dirty(); };
  const addResource    = () => { setResources(r => [...r, { type: 'documentation', title: '', url: '' }]); dirty(); };

  const handleSave = async () => {
    if (!label.trim()) { setSaveError('Le libellé est requis.'); return; }
    setSaving(true);
    setSaveError(null);
    try {
      await saveEditorNode({
        label: label.trim(),
        category: category.trim() || 'concept',
        color: color.trim() || null,
        priority,
        status,
        relations: relations.filter(r => r.target),
        resources: resources.filter(r => r.url),
        markdown_body: body,
      }, isCreating ? null : editingNodeId);
      closeEditor();
    } catch (e) {
      setSaveError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (editorDirty && !window.confirm('Annuler les modifications non enregistrées ?')) return;
    closeEditor();
  };

  const categoryColor = getNodeColor({ category, color: null });

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header — liquid glass */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: isMobile ? '0.4rem' : '0.75rem',
        padding: isMobile ? '0.5rem 0.65rem' : '0.7rem 1.1rem',
        borderBottom: '1px solid var(--border)',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)',
        backdropFilter: 'blur(40px) saturate(180%)',
        WebkitBackdropFilter: 'blur(40px) saturate(180%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 2px 12px rgba(0,0,0,0.15)',
        flexShrink: 0,
      }}>
        <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text)' }}>
          {isCreating ? 'Nouveau nœud' : `Modifier : ${source?.label || editingNodeId}`}
        </span>
        <span style={{ flex: 1 }} />
        {saveError && (
          <span style={{ color: 'var(--danger)', fontSize: '0.82rem', maxWidth: 300 }}>{saveError}</span>
        )}
        <button className="btn-secondary" onClick={handleCancel} disabled={saving}>Annuler</button>
        <button className="btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </button>
      </div>

      {/* Form */}
      <div style={{ flex: 1, overflowY: 'auto', padding: isMobile ? '0.75rem' : '1.25rem 1.5rem', maxWidth: 760, width: '100%', margin: '0 auto' }}>
        <datalist id="rel-type-list">
          {KNOWN_REL_TYPES.map(t => <option key={t} value={t} />)}
        </datalist>

        {/* Libellé */}
        <div style={{ marginBottom: '1.1rem' }}>
          <SectionLabel>Libellé *</SectionLabel>
          <input
            value={label}
            onChange={e => { setLabel(e.target.value); dirty(); }}
            placeholder="Libellé du nœud…"
            style={{ width: '100%', fontSize: '1rem' }}
            autoFocus
          />
          {label && (
            <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: 4 }}>
              Sera enregistré sous : <code style={{ color: 'var(--accent)' }}>{slugPreview}.md</code>
              {!isCreating && slugPreview !== editingNodeId && (
                <span style={{ color: 'var(--warning)', marginLeft: 8 }}>
                  ⚠ Renommage : {editingNodeId}.md → {slugPreview}.md
                </span>
              )}
            </div>
          )}
        </div>

        {/* Catégorie + Couleur */}
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1rem', marginBottom: '1.1rem' }}>
          <div style={{ flex: 1 }}>
            <SectionLabel>Catégorie</SectionLabel>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: categoryColor, flexShrink: 0, boxShadow: `0 0 6px ${categoryColor}` }} />
              <input
                list="category-list"
                value={category}
                onChange={e => { setCategory(e.target.value); dirty(); }}
                placeholder="Catégorie"
                style={{ flex: 1 }}
              />
              <datalist id="category-list">
                {KNOWN_CATEGORIES.map(c => <option key={c} value={c} />)}
              </datalist>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <SectionLabel>Couleur personnalisée (optionnel)</SectionLabel>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                type="color"
                value={color || '#7c4dff'}
                onChange={e => { setColor(e.target.value); dirty(); }}
                style={{ width: 40, height: 32, padding: 2, cursor: 'pointer' }}
              />
              <input
                value={color}
                onChange={e => { setColor(e.target.value); dirty(); }}
                placeholder="#rrggbb ou vide"
                style={{ flex: 1, fontFamily: 'monospace', fontSize: '0.83rem' }}
              />
              {color && (
                <button type="button" onClick={() => { setColor(''); dirty(); }}
                  className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}>
                  Effacer
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Priorité + Statut */}
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '0.75rem' : '2rem', marginBottom: '1.1rem' }}>
          <div>
            <SectionLabel>Priorité</SectionLabel>
            <div style={{ display: 'flex', gap: 12 }}>
              {PRIORITY_LABELS.map(([val, lbl]) => (
                <label key={val} style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', fontSize: '0.85rem' }}>
                  <input type="radio" name="priority" value={val} checked={priority === val}
                    onChange={() => { setPriority(val); dirty(); }} />
                  {lbl}
                </label>
              ))}
            </div>
          </div>
          <div>
            <SectionLabel>Statut</SectionLabel>
            <div style={{ display: 'flex', gap: 12 }}>
              {STATUS_LABELS.map(([val, lbl]) => (
                <label key={val} style={{ display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer', fontSize: '0.85rem' }}>
                  <input type="radio" name="status" value={val} checked={status === val}
                    onChange={() => { setStatus(val); dirty(); }} />
                  {lbl}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Relations */}
        <div style={{ marginBottom: '1.1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <SectionLabel>Relations</SectionLabel>
            <button type="button" onClick={addRelation} className="btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.2rem 0.55rem' }}>
              + Ajouter
            </button>
          </div>
          {relations.length === 0
            ? <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>Aucune relation.</p>
            : relations.map((rel, i) => (
              <RelationRow key={i} rel={rel} index={i} nodes={nodes} onChange={changeRelation} onRemove={removeRelation} compact={isMobile} />
            ))
          }
        </div>

        {/* Notes — WYSIWYG or raw markdown */}
        <div style={{ marginBottom: '1.1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <SectionLabel>Notes</SectionLabel>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{ fontSize: '0.72rem', color: charCount > CHAR_WARN_LIMIT ? 'var(--warning)' : 'var(--text-muted)' }}>
                {charCount.toLocaleString('fr-FR')} caractères
                {charCount > CHAR_WARN_LIMIT && ' ⚠ Contenu volumineux'}
              </span>
              <button
                type="button"
                onClick={() => {
                  if (rawMode) {
                    // switching raw → WYSIWYG: force remount with latest body
                    rteKey.current += 1;
                  }
                  setRawMode(r => !r);
                }}
                className="btn-secondary"
                style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}
                title={rawMode ? 'Revenir à l\'éditeur visuel' : 'Afficher / éditer le Markdown brut'}
              >
                {rawMode ? 'Éditeur visuel' : 'Source MD'}
              </button>
            </div>
          </div>

          {rawMode ? (
            <textarea
              value={body}
              onChange={e => { setBody(e.target.value); dirty(); }}
              placeholder="Markdown brut…"
              rows={14}
              style={{
                width: '100%', fontFamily: "'Cascadia Code','Fira Code','Consolas',monospace",
                fontSize: '0.83rem', resize: 'vertical', lineHeight: 1.6,
              }}
            />
          ) : (
            <RichTextEditor
              key={rteKey.current}
              value={body}
              onChange={(md) => { setBody(md); dirty(); }}
            />
          )}
        </div>

        {/* Ressources */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <SectionLabel>Ressources</SectionLabel>
            <button type="button" onClick={addResource} className="btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.2rem 0.55rem' }}>
              + Ajouter
            </button>
          </div>
          {resources.length === 0
            ? <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>Aucune ressource.</p>
            : resources.map((res, i) => (
              <ResourceRow key={i} res={res} index={i} onChange={changeResource} onRemove={removeResource} compact={isMobile} />
            ))
          }
        </div>
      </div>
    </div>
  );
}
