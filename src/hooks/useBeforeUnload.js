import { useEffect } from 'react';

/**
 * Fires the browser's beforeunload confirmation when zipDirty OR editorDirty is true.
 * zipDirty is false in Phase 1a — this is expected.
 */
export function useBeforeUnload(zipDirty, editorDirty) {
  useEffect(() => {
    const handler = (e) => {
      if (zipDirty || editorDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [zipDirty, editorDirty]);
}
