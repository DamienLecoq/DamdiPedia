export default function ScanLoader({ loaded, total }) {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(6,4,26,0.85)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '1.5rem', zIndex: 1000,
    }}>
      <div className="spinner" />
      <p style={{ color: 'var(--text)', fontSize: '1rem', fontWeight: 500 }}>
        {total > 0
          ? `Chargement des nœuds… ${loaded} / ${total}`
          : 'Analyse du dossier…'}
      </p>
    </div>
  );
}
