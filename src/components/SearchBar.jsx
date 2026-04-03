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
          background: 'var(--bg)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius)',
          color: 'var(--text)',
          padding: '0.3rem 0.65rem',
          fontSize: '0.83rem',
        }}
      />
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 200,
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius)', boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        }}>
          {results.map((r, i) => (
            <div
              key={r.item.id}
              onMouseDown={() => handleSelect(r.item.id)}
              style={{
                padding: '0.45rem 0.75rem',
                cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderBottom: i < results.length - 1 ? '1px solid var(--border)' : 'none',
                fontSize: '0.83rem',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'}
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
