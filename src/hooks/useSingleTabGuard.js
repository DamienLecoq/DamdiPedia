import { useEffect } from 'react';

let warningShown = false;

function showSingleTabWarning() {
  if (warningShown) return;
  warningShown = true;
  // Dispatch a custom event so the UI can show a banner
  window.dispatchEvent(new CustomEvent('single-tab-warning'));
}

export function useSingleTabGuard() {
  useEffect(() => {
    if (!('BroadcastChannel' in window)) return;
    const channel = new BroadcastChannel('it-knowledge-graph-tab');

    // Assign handler BEFORE posting — a fast PONG could arrive before handler is set
    channel.onmessage = (e) => {
      if (e.data.type === 'PING') channel.postMessage({ type: 'PONG' });
      if (e.data.type === 'PONG') showSingleTabWarning();
    };
    channel.postMessage({ type: 'PING' });

    return () => channel.close();
  }, []);
}
