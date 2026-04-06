import React, { useState, useEffect, useRef } from 'react';
import { useGraphStore } from '../stores/graphStore.js';
import { useUiStore } from '../stores/uiStore.js';
import { buildFuseIndex, search } from '../lib/search.js';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  const nodes = useGraphStore(s => s.nodes);
  const selectNode = useGraphStore(s => s.selectNode);
  const setView = useUiStore(s => s.setView);

  // Rebuild Fuse index whenever nodes change (new nodes are immediately searchable)
  useEffect(() => {
    buildFuseIndex(nodes);
  }, [nodes]);

  // Debounce search 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 2) {
        const r = search(query).slice(0, 8);
        setResults(r);
        setOpen(r.length > 0);
      } else {
        setResults([]);
        setOpen(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Ctrl+K focuses the search input
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleSelect = (nodeId) => {
    setQuery('');
    setResults([]);
    setOpen(false);
    selectNode(nodeId);
    setView('graph');
  };

  const handleBlur = () => {
    // Delay so onMouseDown in dropdown can fire first
    setTimeout(() => setOpen(false), 150);
  };

  return (
    <div style={{ position: 'relative', flex: 1, maxWidth: 300 }}>
      <input
        ref={inputRef}
        value={query}
        onChange={e => setQuery(e.target.value)}
        onFocus={() => results.length > 0 && setOpen(true)}
        onBlur={handleBlur}
        placeholder="Search nodes… (Ctrl+K)"
        style={{
          width: '100%',
          background: 'linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.025) 100%)',
          border: '1px solid var(--border)',
          borderTopColor: 'var(--border-hi)',
          borderRadius: 999,
          color: 'var(--text)',
          padding: '0.35rem 0.85rem',
          fontSize: '0.83rem',
          backdropFilter: 'blur(16px)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      />
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, zIndex: 200,
          background: 'linear-gradient(160deg, rgba(24,20,50,0.88) 0%, rgba(14,10,34,0.85) 100%)',
          backdropFilter: 'blur(48px) saturate(180%)', WebkitBackdropFilter: 'blur(48px) saturate(180%)',
          border: '1px solid var(--border)', borderTopColor: 'var(--border-hi)',
          borderRadius: 'var(--radius)', boxShadow: 'var(--shadow), inset 0 1px 0 rgba(255,255,255,0.07)',
          overflow: 'hidden',
        }}>
          {results.map((r, i) => (
            <div
              key={r.item.id}
              onMouseDown={() => handleSelect(r.item.id)}
              style={{
                padding: '0.5rem 0.85rem',
                cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderBottom: i < results.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                fontSize: '0.83rem',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ color: 'var(--text)' }}>{r.item.label}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>{r.item.category}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
