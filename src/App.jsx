import { useEffect, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { useGraphStore } from './stores/graphStore.js';
import { useUiStore } from './stores/uiStore.js';
import { useAiStore } from './stores/aiStore.js';
import { useSingleTabGuard } from './hooks/useSingleTabGuard.js';
import { useBeforeUnload } from './hooks/useBeforeUnload.js';
import { useIsMobile } from './hooks/useIsMobile.js';
import { isConfigured as ghConfigured } from './lib/github.js';
import GraphView from './components/GraphView.jsx';
import ScanLoader from './components/ScanLoader.jsx';
import DetailPanel from './components/DetailPanel.jsx';
import SearchBar from './components/SearchBar.jsx';
import EditorView from './components/EditorView.jsx';
import ListView from './components/ListView.jsx';
import DashboardView from './components/DashboardView.jsx';
import GraphHealthPanel from './components/GraphHealthPanel.jsx';
import ToastContainer from './components/Toast.jsx';

// ── ZIP mode banner ───────────────────────────────────────────────────────────
function ZipModeBanner({ onExport }) {
  return (
    <div style={{
      background: 'var(--warning)', color: '#000',
      padding: '0.45rem 1rem', textAlign: 'center', fontSize: '0.82rem', flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem',
    }}>
      <span><strong>Mode ZIP :</strong> Les modifications sont stockées en mémoire uniquement. Exportez pour sauvegarder sur disque.</span>
      <button style={{ background: 'rgba(0,0,0,0.15)', border: 'none', borderRadius: 4, padding: '0.2rem 0.65rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem' }}
        onClick={onExport}>
        Exporter ZIP
      </button>
    </div>
  );
}

// ── Auth modal ────────────────────────────────────────────────────────────────
function AuthModal({ onClose }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const unlockEdit = useUiStore(s => s.unlockEdit);

  const handleSubmit = () => {
    const ok = unlockEdit(code);
    if (!ok) { setError(true); setCode(''); }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)',
        padding: '1.5rem', maxWidth: 340, width: '90%',
        boxShadow: 'var(--glow-violet)',
      }}>
        <h3 style={{ marginBottom: '0.5rem', color: 'var(--text)', fontSize: '1rem' }}>🔒 Déverrouiller les modifications</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.83rem', marginBottom: '1rem' }}>
          Entrez votre code pour activer le mode édition.
        </p>
        <input
          type="password"
          value={code}
          onChange={e => { setCode(e.target.value); setError(false); }}
          onKeyDown={e => e.key === 'Enter' && handleSubmit()}
          placeholder="Code…"
          autoFocus
          style={{ width: '100%', marginBottom: '0.5rem' }}
        />
        {error && (
          <p style={{ color: 'var(--danger)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
            Code incorrect.
          </p>
        )}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.75rem' }}>
          <button className="btn-secondary" onClick={onClose}>Annuler</button>
          <button className="btn-primary" onClick={handleSubmit}>Déverrouiller</button>
        </div>
      </div>
    </div>
  );
}

// ── Top nav ───────────────────────────────────────────────────────────────────
function TopNav({ onShowAuth }) {
  const nodes        = useGraphStore(s => s.nodes);
  const warnings     = useGraphStore(s => s.warnings);
  const currentView  = useUiStore(s => s.currentView);
  const setView      = useUiStore(s => s.setView);
  const openEditor   = useUiStore(s => s.openEditor);
  const editUnlocked = useUiStore(s => s.editUnlocked);
  const authRequired = useUiStore(s => s.authRequired);
  const lockEdit     = useUiStore(s => s.lockEdit);
  const isMobile     = useIsMobile();
  const [mobileSearch, setMobileSearch] = useState(false);

  const NavBtn = ({ view, label, icon }) => (
    <button
      className={currentView === view ? 'btn-primary' : 'btn-secondary'}
      style={{ fontSize: '0.78rem', padding: '0.25rem 0.65rem' }}
      onClick={() => setView(view)}
    >
      {isMobile ? icon : label}
    </button>
  );

  return (
    <>
    <nav className="top-nav" style={{
      display: 'flex', alignItems: 'center', gap: isMobile ? '0.3rem' : '0.5rem',
      padding: isMobile ? '0.4rem 0.5rem' : '0.5rem 1rem', flexShrink: 0,
    }}>
      <span
        style={{
          fontWeight: 800, fontSize: isMobile ? '0.9rem' : '1rem', marginRight: '0.15rem', cursor: 'pointer',
          background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em',
        }}
        onClick={() => setView('graph')}
        title="DamdiPedia"
      >
        {isMobile ? 'DP' : 'DamdiPedia'}
      </span>

      <NavBtn view="graph"     label="Graphe"          icon="⬡" />
      <NavBtn view="list"      label="Liste"            icon="☰" />
      <NavBtn view="dashboard" label="Tableau de bord"  icon="▦" />

      {nodes.length > 0 && !isMobile && <SearchBar />}
      {isMobile && nodes.length > 0 && (
        <button className="btn-secondary" style={{ fontSize: '0.78rem', padding: '0.25rem 0.5rem' }}
          onClick={() => setMobileSearch(v => !v)} title="Rechercher">
          🔍
        </button>
      )}

      <span style={{ flex: 1 }} />

      {!isMobile && (
        <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
          {nodes.length} nœud{nodes.length !== 1 ? 's' : ''}
        </span>
      )}

      {editUnlocked && (
        <button className="btn-primary" style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
          onClick={() => openEditor(null)}>
          {isMobile ? '+' : '+ Nouveau'}
        </button>
      )}

      {warnings.length > 0 && (
        <button className="btn-secondary"
          style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', color: 'var(--warning)' }}
          onClick={() => setView('health')}
          title={`${warnings.length} alerte${warnings.length !== 1 ? 's' : ''}`}>
          ⚠{!isMobile && ` ${warnings.length}`}
        </button>
      )}

      {ghConfigured() && (
        <button
          onClick={() => useGraphStore.getState().syncFromGitHub()}
          style={{
            background: 'none', border: '1px solid var(--success)',
            borderRadius: 6, padding: '0.2rem 0.5rem', fontSize: '0.9rem',
            color: 'var(--success)', cursor: 'pointer',
          }}
          title="Sync GitHub"
        >
          ⟳
        </button>
      )}

      {authRequired && (
        <button
          onClick={editUnlocked ? lockEdit : onShowAuth}
          style={{
            background: 'none', border: `1px solid ${editUnlocked ? 'var(--success)' : 'var(--border)'}`,
            borderRadius: 6, padding: '0.2rem 0.5rem', fontSize: '0.9rem',
            color: editUnlocked ? 'var(--success)' : 'var(--text-muted)',
            cursor: 'pointer',
          }}
          title={editUnlocked ? 'Verrouiller les modifications' : 'Déverrouiller les modifications'}
        >
          {editUnlocked ? '🔓' : '🔒'}
        </button>
      )}
    </nav>
    {isMobile && mobileSearch && nodes.length > 0 && (
      <div style={{ padding: '0.3rem 0.5rem', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
        <SearchBar />
      </div>
    )}
    </>
  );
}

// ── Main content ──────────────────────────────────────────────────────────────
function MainContent() {
  const scanProgress   = useGraphStore(s => s.scanProgress);
  const selectedNodeId = useGraphStore(s => s.selectedNodeId);
  const currentView    = useUiStore(s => s.currentView);

  if (scanProgress.scanning) return <ScanLoader loaded={scanProgress.loaded} total={scanProgress.total} />;
  if (currentView === 'editor') return <EditorView />;
  if (currentView === 'list') return (
    <>
      <ListView />
      {selectedNodeId && <DetailPanel />}
    </>
  );
  if (currentView === 'dashboard') return <DashboardView />;
  if (currentView === 'health') return <GraphHealthPanel />;

  return (
    <>
      <GraphView />
      {selectedNodeId && <DetailPanel />}
    </>
  );
}

// ── Quiz block modal ───────────────────────────────────────────────────────────
function QuizBlockModal({ onContinue, onAbandon }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '1.5rem', maxWidth: 400, width: '90%' }}>
        <h3 style={{ marginBottom: '0.75rem', color: 'var(--text)' }}>Quiz en cours</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
          Quitter et perdre votre progression ?
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button className="btn-secondary" onClick={onContinue}>Continuer le quiz</button>
          <button className="btn-danger" onClick={onAbandon}>Abandonner</button>
        </div>
      </div>
    </div>
  );
}

// ── Root ───────────────────────────────────────────────────────────────────────
export default function App() {
  const zipDirty  = useGraphStore(s => s.zipDirty);
  const exportZip = useGraphStore(s => s.exportZip);
  const editorDirty = useUiStore(s => s.editorDirty);
  const showAuthModal = useUiStore(s => s.showAuthModal);
  const closeAuthModal = useUiStore(s => s.closeAuthModal);

  const [singleTabWarning, setSingleTabWarning] = useState(false);
  const [quizBlockModal, setQuizBlockModal] = useState(false);
  const [pendingUrl, setPendingUrl] = useState(null);
  useSingleTabGuard();
  useBeforeUnload(zipDirty, editorDirty);

  // Sync from GitHub on mount (if proxy configured)
  useEffect(() => {
    useGraphStore.getState().syncFromGitHub();
  }, []);

  useEffect(() => {
    const h = () => setSingleTabWarning(true);
    window.addEventListener('single-tab-warning', h);
    return () => window.removeEventListener('single-tab-warning', h);
  }, []);

  // hashchange quiz guard
  useEffect(() => {
    const handleHashChange = (e) => {
      const { quizState } = useAiStore.getState();
      if (quizState && !quizState.completed) {
        e.preventDefault();
        const oldPath = e.oldURL.split(window.location.origin)[1];
        window.history.pushState(null, '', oldPath);
        setPendingUrl(e.newURL);
        setQuizBlockModal(true);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleAbandonQuiz = () => {
    useAiStore.getState().resetQuiz();
    setQuizBlockModal(false);
    if (pendingUrl) { window.location.href = pendingUrl; setPendingUrl(null); }
  };

  return (
    <HashRouter>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        {singleTabWarning && (
          <div style={{ background: 'var(--warning)', color: '#000', padding: '0.45rem 1rem', textAlign: 'center', fontSize: '0.82rem', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <span>⚠ Un autre onglet est ouvert. Plusieurs onglets peuvent causer des conflits d'écriture.</span>
            <button style={{ background: 'rgba(0,0,0,0.15)', border: 'none', borderRadius: 4, padding: '0.15rem 0.5rem', cursor: 'pointer' }}
              onClick={() => setSingleTabWarning(false)}>Ignorer</button>
          </div>
        )}

        <TopNav onShowAuth={() => closeAuthModal() || useUiStore.getState().openAuthModal()} />

        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <MainContent />
        </div>

        <ToastContainer />

        {showAuthModal && <AuthModal onClose={closeAuthModal} />}

        {quizBlockModal && (
          <QuizBlockModal
            onContinue={() => { setQuizBlockModal(false); setPendingUrl(null); }}
            onAbandon={handleAbandonQuiz}
          />
        )}
      </div>
    </HashRouter>
  );
}
