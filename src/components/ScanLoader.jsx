export default function ScanLoader({ loaded, total }) {
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(3,12,26,0.92)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '1.25rem', zIndex: 1000,
    }}>
      <div className="spinner" />
      <p style={{ color: 'var(--text)', fontSize: '1rem' }}>
        {total > 0
          ? `Chargement des nœuds… ${loaded} / ${total}`
          : 'Analyse du dossier…'}
      </p>
    </div>
  );
}
