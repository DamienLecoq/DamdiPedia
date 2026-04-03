import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useAiStore } from '../stores/aiStore.js';

export default function AISummary({ nodeId, depth }) {
  const summaryCache  = useAiStore(s => s.summaryCache);
  const loading       = useAiStore(s => s.loading);
  const error         = useAiStore(s => s.error);
  const generateSummary = useAiStore(s => s.generateSummary);
  const clearError    = useAiStore(s => s.clearError);

  const cached = summaryCache[nodeId];

  useEffect(() => {
    if (!cached) generateSummary(nodeId, depth);
  }, [nodeId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading && !cached) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 0', color: 'var(--text-muted)', fontSize: '0.83rem' }}>
        <div className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
        Génération du résumé…
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ background: 'var(--bg)', border: '1px solid var(--danger)', borderRadius: 6, padding: '0.65rem 0.75rem', fontSize: '0.8rem' }}>
        <div style={{ color: 'var(--danger)', marginBottom: '0.5rem' }}>{error}</div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.2rem 0.55rem' }}
            onClick={() => { clearError(); generateSummary(nodeId, depth, true); }}>
            Réessayer
          </button>
          <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.2rem 0.55rem' }}
            onClick={clearError}>
            Ignorer
          </button>
        </div>
      </div>
    );
  }

  if (!cached) return null;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.4rem' }}>
        <button
          className="btn-secondary"
          style={{ fontSize: '0.72rem', padding: '0.15rem 0.45rem' }}
          onClick={() => generateSummary(nodeId, depth, true)}
          disabled={loading}
          title="Régénérer le résumé"
        >
          {loading ? '…' : '↺ Régénérer'}
        </button>
      </div>
      <div className="markdown-body" style={{
        background: 'var(--bg)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius)', padding: '0.75rem',
        maxHeight: 400, overflowY: 'auto',
      }}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{cached}</ReactMarkdown>
      </div>
    </div>
  );
}
