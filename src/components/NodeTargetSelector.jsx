import React, { useState, useEffect } from 'react';
import { slugify } from '../lib/slugify.js';

/**
 * Autocomplete input for selecting a relation target node.
 * - onChange fires ONLY on dropdown selection or input blur (NOT on every keystroke).
 * - useEffect syncs inputText when external `value` prop changes.
 * - Shows ⚠ when the committed value doesn't match any existing node id.
 */
export default function NodeTargetSelector({ value, onChange, nodes }) {
  const labelFromId = (id) => nodes.find(n => n.id === id)?.label || id || '';

  const [inputText, setInputText] = useState(labelFromId(value));
  const [showDropdown, setShowDropdown] = useState(false);

  // Sync when external value changes (e.g. parent re-renders with different relation)
  useEffect(() => {
    setInputText(labelFromId(value));
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  const suggestions = inputText.length >= 1
    ? nodes.filter(n =>
        n.label.toLowerCase().includes(inputText.toLowerCase()) ||
        n.id.includes(inputText.toLowerCase())
      ).slice(0, 8)
    : [];

  const isResolved = nodes.some(n => n.id === value);

  const handleSelect = (node) => {
    setInputText(node.label);
    setShowDropdown(false);
    onChange(node.id); // commit on explicit selection
  };

  const handleBlur = () => {
    setShowDropdown(false);
    const match = nodes.find(n => n.label.toLowerCase() === inputText.toLowerCase());
    onChange(match ? match.id : slugify(inputText)); // commit on blur
  };

  return (
    <div style={{ position: 'relative', flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <input
          value={inputText}
          onChange={e => { setInputText(e.target.value); setShowDropdown(true); }}
          onBlur={handleBlur}
          onFocus={() => setShowDropdown(true)}
          placeholder="Target node…"
          style={{ flex: 1, fontSize: '0.83rem', padding: '0.3rem 0.5rem' }}
        />
        {!isResolved && value && (
          <span title="Node does not exist yet" style={{ fontSize: '0.85rem' }}>⚠️</span>
        )}
      </div>

      {showDropdown && suggestions.length > 0 && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 2px)', left: 0, right: 0, zIndex: 300,
          background: 'var(--surface)', border: '1px solid var(--border)',
          borderRadius: 6, boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          maxHeight: 200, overflowY: 'auto',
        }}>
          {suggestions.map(n => (
            <div
              key={n.id}
              onMouseDown={() => handleSelect(n)}
              style={{
                padding: '0.35rem 0.6rem', cursor: 'pointer', fontSize: '0.82rem',
                display: 'flex', justifyContent: 'space-between',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span>{n.label}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{n.category}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
