import React, { useEffect } from 'react';
import { useUiStore } from '../stores/uiStore.js';

function ToastItem({ toast, onRemove }) {
  useEffect(() => {
    const t = setTimeout(onRemove, 4000);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const typeClass = toast.type === 'success' ? 'success'
    : toast.type === 'warning' ? 'warning'
    : toast.type === 'error' ? 'error'
    : '';

  return (
    <div
      className={`toast ${typeClass}`}
      onClick={onRemove}
      style={{ cursor: 'pointer' }}
      title="Click to dismiss"
    >
      {toast.message}
    </div>
  );
}

export default function ToastContainer() {
  const toasts = useUiStore(s => s.toasts);
  const removeToast = useUiStore(s => s.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <ToastItem key={t.id} toast={t} onRemove={() => removeToast(t.id)} />
      ))}
    </div>
  );
}
