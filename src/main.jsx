import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { useGraphStore } from './stores/graphStore.js';
import { isConfigured as ghConfigured } from './lib/github.js';

// Load the global vault synchronously before first render so the graph
// is immediately available — no loading screen needed.
// Skip if GitHub sync is configured: App.jsx will do a single load from GitHub.
if (!ghConfigured()) {
  useGraphStore.getState().loadGlobalVault();
}

// StrictMode is intentionally DISABLED.
// react-force-graph-2d double-initializes its physics simulation under StrictMode.
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
