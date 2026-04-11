import React, { useRef, useEffect, useCallback, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { forceCollide as d3ForceCollide } from 'd3-force';
import GraphErrorBoundary from './GraphErrorBoundary.jsx';
import { useGraphStore } from '../stores/graphStore.js';
import { useUiStore } from '../stores/uiStore.js';
import { useAiStore } from '../stores/aiStore.js';
import {
  getNodeColor,
  computeStaticForceLayout,
  selectTopNodes,
} from '../lib/graph.js';
import { useIsMobile } from '../hooks/useIsMobile.js';

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------
function EmptyState() {
  const warnings = useGraphStore(s => s.warnings);
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', height: '100%', gap: '1rem', color: 'var(--text-muted)',
    }}>
      <p style={{ fontSize: '1.1rem' }}>Aucun nœud chargé.</p>
      {warnings.length > 0 && (
        <div style={{
          background: 'var(--surface)', border: '1px solid var(--danger)',
          borderRadius: 'var(--radius)', padding: '1rem', maxWidth: 520, width: '100%',
        }}>
          <p style={{ color: 'var(--danger)', marginBottom: '0.5rem', fontWeight: 600 }}>
            {warnings.length} erreur{warnings.length > 1 ? 's' : ''} de parsing
          </p>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {warnings.slice(0, 10).map((w, i) => (
              <li key={i} style={{ fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--text)' }}>{w.file}</span>
                <span style={{ color: 'var(--text-muted)' }}> — {w.detail}</span>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Consultez la console navigateur (F12) pour les détails.
          </p>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Inner graph (wrapped by GraphErrorBoundary)
// ---------------------------------------------------------------------------
function GraphInner() {
  const graphRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoveredId, setHoveredId] = useState(null);

  const nodes = useGraphStore(s => s.nodes);
  const links = useGraphStore(s => s.links);
  const clusters = useGraphStore(s => s.clusters);
  const selectedNodeId = useGraphStore(s => s.selectedNodeId);
  const globalLayoutCache = useGraphStore(s => s.globalLayoutCache);
  const setGlobalLayoutCache = useGraphStore(s => s.setGlobalLayoutCache);
  const selectNode = useGraphStore(s => s.selectNode);

  const graphRenderMode = useUiStore(s => s.graphRenderMode);
  const setGraphRenderMode = useUiStore(s => s.setGraphRenderMode);
  const activeFilters = useUiStore(s => s.activeFilters);
  const setFilters = useUiStore(s => s.setFilters);
  const computingLayout = useUiStore(s => s.computingLayout);
  const setComputingLayout = useUiStore(s => s.setComputingLayout);
  const showLinks = useUiStore(s => s.showLinks);
  const toggleShowLinks = useUiStore(s => s.toggleShowLinks);
  const showRelationLabels = useUiStore(s => s.showRelationLabels);
  const toggleShowRelationLabels = useUiStore(s => s.toggleShowRelationLabels);

  const isMobile = useIsMobile();
  const [showCatPanel, setShowCatPanel] = useState(false);

  // Configure d3 forces for better spacing
  useEffect(() => {
    if (!graphRef.current) return;
    graphRef.current.d3Force('charge').strength(-260);
    graphRef.current.d3Force('link').distance(120);
    graphRef.current.d3Force('collision', d3ForceCollide(35));
  }, []);

  // Observe container size
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // ---------------------------------------------------------------------------
  // Determine which nodes/links to render
  // ---------------------------------------------------------------------------
  const { visibleNodes, visibleLinks, truncated } = React.useMemo(() => {
    let candidates = nodes;
    if (activeFilters.category) {
      candidates = candidates.filter(n => n.category === activeFilters.category);
    }
    const isGlobal = graphRenderMode === 'global';
    const maxNodes = 150;
    let visibleNodes = isGlobal
      ? selectTopNodes(candidates, links, maxNodes, null)
      : candidates.slice(0, 40);
    const visibleIds = new Set(visibleNodes.map(n => n.id));
    // Normalize source/target — force-graph mutates them from string IDs to node objects
    const visibleLinks = links.filter(l => {
      const s = typeof l.source === 'object' ? l.source?.id : l.source;
      const t = typeof l.target === 'object' ? l.target?.id : l.target;
      return visibleIds.has(s) && visibleIds.has(t);
    });
    const truncated = candidates.length > visibleNodes.length;
    return { visibleNodes, visibleLinks, truncated };
  }, [nodes, links, graphRenderMode, activeFilters.category]);

  // ---------------------------------------------------------------------------
  // Global layout
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (graphRenderMode !== 'global') return;
    if (globalLayoutCache) return;
    setComputingLayout(true);
    computeStaticForceLayout(visibleNodes, visibleLinks, (positions) => {
      setGlobalLayoutCache({ positions, computedAt: Date.now() });
      setComputingLayout(false);
    });
  }, [graphRenderMode, globalLayoutCache]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---------------------------------------------------------------------------
  // Build graph data
  // ---------------------------------------------------------------------------
  const graphData = React.useMemo(() => {
    let gNodes = visibleNodes.map(n => ({ ...n }));
    if (graphRenderMode === 'global' && globalLayoutCache) {
      gNodes = gNodes.map(n => {
        const pos = globalLayoutCache.positions.get(n.id);
        return pos ? { ...n, fx: pos.x, fy: pos.y } : n;
      });
    }
    // Deep-copy links so force-graph mutation doesn't affect the store's array
    return { nodes: gNodes, links: visibleLinks.map(l => ({ ...l })) };
  }, [visibleNodes, visibleLinks, graphRenderMode, globalLayoutCache]);

  // Pre-compute bidirectional link set — links whose reverse also exists
  // Key format: "srcId->tgtId"
  const biDirSet = React.useMemo(() => {
    const keys = new Set(graphData.links.map(l => {
      const s = typeof l.source === 'object' ? l.source?.id : l.source;
      const t = typeof l.target === 'object' ? l.target?.id : l.target;
      return `${s}->${t}`;
    }));
    const biDir = new Set();
    for (const key of keys) {
      const [s, t] = key.split('->');
      if (keys.has(`${t}->${s}`)) biDir.add(key);
    }
    return biDir;
  }, [graphData.links]);

  // Map "srcId->tgtId" => type, to look up the reverse type for bidir label pairs
  const biDirTypeMap = React.useMemo(() => {
    const map = new Map();
    graphData.links.forEach(l => {
      const s = typeof l.source === 'object' ? l.source?.id : l.source;
      const t = typeof l.target === 'object' ? l.target?.id : l.target;
      map.set(`${s}->${t}`, l.type || '');
    });
    return map;
  }, [graphData.links]);

  // ---------------------------------------------------------------------------
  // Node click — quiz guard, then select
  // ---------------------------------------------------------------------------
  const handleNodeClick = useCallback((node) => {
    const { quizState } = useAiStore.getState();
    if (quizState && !quizState.completed) return;
    selectNode(node.id);
  }, [selectNode]);

  // ---------------------------------------------------------------------------
  // Node canvas painter — brain/neural aesthetic with glow
  // ---------------------------------------------------------------------------
  const paintNode = useCallback((node, ctx, globalScale) => {
    const color = getNodeColor(node);
    const isSelected = node.id === selectedNodeId;
    const isHovered = node.id === hoveredId;
    const isDimmed = (hoveredId || selectedNodeId) && node.id !== hoveredId && node.id !== selectedNodeId;

    const r = isHovered ? 7 : 5.5;
    ctx.globalAlpha = isDimmed ? 0.15 : 1;

    // Outer glow (brain neuron effect)
    ctx.shadowColor = color;
    ctx.shadowBlur = isSelected ? 24 : isHovered ? 16 : 10;

    ctx.beginPath();
    ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();

    // Bright core
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(node.x, node.y, r * 0.38, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.fill();

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;

    // Label
    const fontSize = Math.max(10 / globalScale, 3);
    ctx.font = `${fontSize}px sans-serif`;
    ctx.fillStyle = isDimmed ? 'rgba(180,200,255,0.15)' : 'rgba(220,235,255,0.9)';
    ctx.textAlign = 'center';
    ctx.fillText(node.label, node.x, node.y + r + fontSize + 1);
  }, [selectedNodeId, hoveredId]);

  // ---------------------------------------------------------------------------
  // Link canvas painter — neural synapse style with glow
  // ---------------------------------------------------------------------------
  const paintLink = useCallback((link, ctx, globalScale) => {
    if (!showLinks) return;

    const src = typeof link.source === 'object' ? link.source : null;
    const tgt = typeof link.target === 'object' ? link.target : null;
    if (!src || !tgt || src.x == null || tgt.x == null) return;

    const srcId = src.id;
    const tgtId = tgt.id;

    const isBiDir = biDirSet.has(`${srcId}->${tgtId}`);
    // For bidir pairs, draw only the canonical direction (lower string ID first)
    // to avoid rendering two overlapping lines
    if (isBiDir && srcId > tgtId) return;

    const isDimmed = (hoveredId || selectedNodeId)
      && srcId !== hoveredId && tgtId !== hoveredId
      && srcId !== selectedNodeId && tgtId !== selectedNodeId;
    const isHighlighted = !isDimmed && (
      srcId === hoveredId || tgtId === hoveredId ||
      srcId === selectedNodeId || tgtId === selectedNodeId
    );
    const w = link.weight || 1;

    const mx = (src.x + tgt.x) / 2;
    const my = (src.y + tgt.y) / 2;

    ctx.save();
    ctx.globalAlpha = isDimmed ? 0.02 : isHighlighted ? Math.min(w * 0.45 + 0.35, 0.85) : w * 0.12 + 0.04;
    ctx.strokeStyle = isHighlighted ? '#b07fff' : '#7c4dff';
    ctx.lineWidth = isHighlighted ? w * 1.2 + 0.5 : w * 0.6 + 0.15;
    ctx.shadowColor = '#9c6fff';
    ctx.shadowBlur = isDimmed ? 0 : isHighlighted ? 12 : 2;

    ctx.beginPath();
    ctx.moveTo(src.x, src.y);
    ctx.lineTo(tgt.x, tgt.y);
    ctx.stroke();

    // Relation labels
    if (showRelationLabels && !isDimmed) {
      const fontSize = Math.max(9 / globalScale, 2);
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 0.8;
      ctx.font = `${fontSize}px sans-serif`;
      ctx.fillStyle = '#b0c4ff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      if (isBiDir) {
        const fwd = link.type || '';
        const rev = biDirTypeMap.get(`${tgtId}->${srcId}`) || '';
        if (fwd === rev) {
          if (fwd) ctx.fillText(fwd, mx, my);
        } else {
          if (fwd) ctx.fillText(fwd, mx, my - fontSize);
          if (rev) ctx.fillText(rev, mx, my + fontSize);
        }
      } else if (link.type) {
        ctx.fillText(link.type, mx, my);
      }
    }

    ctx.restore();
  }, [hoveredId, selectedNodeId, showLinks, showRelationLabels, biDirSet, biDirTypeMap]);

  const isStaticMode = graphRenderMode === 'global' && !!globalLayoutCache;

  // Dynamic zoom limits — more nodes = allow further zoom-out
  const minZoom = Math.min(2, Math.max(0.04, 3 / Math.sqrt(Math.max(visibleNodes.length, 1))));
  const maxZoom = 8;

  // Recenter: fit all nodes, or zoom to selected node
  const handleRecenter = useCallback(() => {
    if (!graphRef.current) return;
    if (selectedNodeId) {
      const node = graphData.nodes.find(n => n.id === selectedNodeId);
      if (node?.x != null) {
        graphRef.current.centerAt(node.x, node.y, 400);
        graphRef.current.zoom(2.5, 400);
        return;
      }
    }
    graphRef.current.zoomToFit(400, 60);
  }, [selectedNodeId, graphData.nodes]);

  // ---------------------------------------------------------------------------
  // Category pills for cluster expand
  // ---------------------------------------------------------------------------
  const handleCategoryClick = (category) => {
    if (activeFilters.category === category) {
      setFilters({ category: null });
      if (graphRenderMode !== 'global') setGraphRenderMode('cluster');
    } else {
      setFilters({ category });
      if (graphRenderMode !== 'global') setGraphRenderMode('cluster');
    }
  };

  if (nodes.length === 0) {
    return <div ref={containerRef} style={{ flex: 1, position: 'relative', overflow: 'hidden' }}><EmptyState /></div>;
  }

  return (
    <div ref={containerRef} style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
      {/* Controls toolbar — view mode + visual toggles */}
      <div style={{ position: 'absolute', top: isMobile ? 8 : 12, left: isMobile ? 8 : 12, zIndex: 10, display: 'flex', gap: isMobile ? 4 : 6, alignItems: 'center', flexWrap: isMobile ? 'wrap' : 'nowrap', maxWidth: isMobile ? 'calc(100% - 16px)' : 'none' }}>
        <button
          className={graphRenderMode === 'cluster' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.72rem', padding: isMobile ? '0.3rem 0.5rem' : '0.25rem 0.65rem' }}
          onClick={() => { setGraphRenderMode('cluster'); setFilters({ category: null }); }}
        >
          {isMobile ? '◈' : 'Cluster'}
        </button>
        <button
          className={graphRenderMode === 'global' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.72rem', padding: isMobile ? '0.3rem 0.5rem' : '0.25rem 0.65rem' }}
          onClick={() => { setGraphRenderMode('global'); setFilters({ category: null }); }}
        >
          {isMobile ? '◉' : 'Global'}
        </button>

        <div style={{ width: 1, height: 16, background: 'var(--border)', margin: '0 2px' }} />

        <button
          onClick={toggleShowLinks}
          className="btn-secondary"
          style={{
            fontSize: '0.72rem', padding: isMobile ? '0.3rem 0.5rem' : '0.25rem 0.65rem',
            borderColor: showLinks ? 'var(--accent)' : 'var(--border)',
            color: showLinks ? 'var(--accent)' : 'var(--text-muted)',
          }}
          title={showLinks ? 'Masquer les liens' : 'Afficher les liens'}
        >
          {isMobile ? '⬡' : '⬡ Liens'}
        </button>
        <button
          onClick={toggleShowRelationLabels}
          className="btn-secondary"
          style={{
            fontSize: '0.72rem', padding: isMobile ? '0.3rem 0.5rem' : '0.25rem 0.65rem',
            borderColor: showRelationLabels ? 'var(--accent2)' : 'var(--border)',
            color: showRelationLabels ? 'var(--accent2)' : 'var(--text-muted)',
          }}
          title={showRelationLabels ? 'Masquer les types' : 'Afficher les types'}
        >
          {isMobile ? '✦' : '✦ Types'}
        </button>

        {/* Mobile: toggle category panel */}
        {isMobile && graphRenderMode !== 'global' && clusters.length > 0 && (
          <button
            onClick={() => setShowCatPanel(v => !v)}
            className="btn-secondary"
            style={{
              fontSize: '0.72rem', padding: '0.3rem 0.5rem',
              borderColor: showCatPanel ? 'var(--accent)' : 'var(--border)',
              color: showCatPanel ? 'var(--accent)' : 'var(--text-muted)',
            }}
            title="Catégories"
          >
            ☰
          </button>
        )}
      </div>

      {/* Category filter panel — vertical scrollable list */}
      {graphRenderMode !== 'global' && clusters.length > 0 && (!isMobile || showCatPanel) && (
        <div style={{
          position: 'absolute', top: isMobile ? 44 : 50, left: isMobile ? 8 : 12, zIndex: 10,
          width: isMobile ? 150 : 170,
          maxHeight: isMobile ? 'calc(100% - 56px)' : 'calc(100% - 70px)',
          display: 'flex', flexDirection: 'column',
          background: 'rgba(10, 7, 28, 0.78)',
          backdropFilter: 'blur(20px) saturate(160%)',
          WebkitBackdropFilter: 'blur(20px) saturate(160%)',
          border: '1px solid var(--border)',
          borderTopColor: 'var(--border-hi)',
          borderRadius: 10,
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}>
          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0.4rem 0.6rem',
            borderBottom: '1px solid var(--border)',
            flexShrink: 0,
          }}>
            <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Catégories
            </span>
            {activeFilters.category && (
              <button
                onClick={() => setFilters({ category: null })}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.7rem', padding: '0 2px', lineHeight: 1 }}
                title="Effacer le filtre"
              >
                ✕
              </button>
            )}
          </div>
          {/* Scrollable list */}
          <div style={{ overflowY: 'auto', padding: '0.3rem 0' }}>
            {clusters.map(cluster => {
              const isActive = activeFilters.category === cluster.category;
              return (
                <button
                  key={cluster.category}
                  onClick={() => handleCategoryClick(cluster.category)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.3rem 0.6rem',
                    background: isActive ? cluster.color + '22' : 'transparent',
                    border: 'none',
                    borderLeft: `3px solid ${isActive ? cluster.color : 'transparent'}`,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.12s',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                >
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: cluster.color, flexShrink: 0, boxShadow: `0 0 5px ${cluster.color}` }} />
                  <span style={{ flex: 1, fontSize: '0.76rem', color: isActive ? cluster.color : 'var(--text)', fontWeight: isActive ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {cluster.category}
                  </span>
                  <span style={{ fontSize: '0.67rem', color: 'var(--text-muted)', flexShrink: 0 }}>
                    {cluster.node_ids.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Recenter button */}
      <button
        onClick={handleRecenter}
        title={selectedNodeId ? 'Centrer sur le nœud sélectionné' : 'Recadrer le graphe'}
        style={{
          position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
          zIndex: 10, display: 'flex', alignItems: 'center', gap: '0.4rem',
          padding: '0.35rem 1rem', fontSize: '0.75rem',
          background: 'rgba(10, 7, 28, 0.7)',
          backdropFilter: 'blur(20px) saturate(160%)',
          WebkitBackdropFilter: 'blur(20px) saturate(160%)',
          border: '1px solid var(--border)',
          borderTopColor: 'var(--border-hi)',
          borderRadius: 20,
          color: 'var(--text-muted)', cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: '0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(167,139,250,0.4)'; e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(91,68,200,0.3), inset 0 1px 0 rgba(255,255,255,0.08)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)'; }}
      >
        {isMobile ? '⊙' : `⊙ ${selectedNodeId ? 'Centrer sur le nœud' : 'Recadrer'}`}
      </button>

      {/* Truncation warning */}
      {truncated && (
        <div style={{
          position: 'absolute', top: isMobile ? 8 : 12, right: isMobile ? 8 : 12, zIndex: 10,
          background: 'rgba(255,200,0,0.1)', border: '1px solid var(--warning)',
          borderRadius: 6, padding: '4px 10px', fontSize: '0.73rem', color: 'var(--warning)',
        }}>
          {activeFilters.category
            ? `Affichage de 40 sur ${nodes.filter(n => n.category === activeFilters.category).length} dans « ${activeFilters.category} »`
            : `Top 150 sur ${nodes.length} nœuds`}
        </div>
      )}

      {/* Layout spinner */}
      {computingLayout && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(6, 4, 26, 0.65)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '1rem', zIndex: 20,
        }}>
          <div className="spinner" />
          <p style={{ color: 'var(--text)', fontSize: '0.88rem', fontWeight: 500 }}>Calcul de la disposition…</p>
        </div>
      )}

      <ForceGraph2D
        ref={graphRef}
        graphData={graphData}
        width={dimensions.width}
        height={dimensions.height}
        nodeCanvasObject={paintNode}
        nodeCanvasObjectMode={() => 'replace'}
        linkCanvasObjectMode={() => 'replace'}
        linkCanvasObject={paintLink}
        onNodeClick={handleNodeClick}
        onBackgroundClick={() => selectNode(null)}
        onNodeHover={(node) => setHoveredId(node ? node.id : null)}
        d3AlphaDecay={isStaticMode ? 1 : 0.0228}
        d3VelocityDecay={isStaticMode ? 1 : 0.4}
        cooldownTicks={isStaticMode ? 0 : Infinity}
        backgroundColor="transparent"
        minZoom={minZoom}
        maxZoom={maxZoom}
      />
    </div>
  );
}

export default function GraphView() {
  return (
    <GraphErrorBoundary>
      <GraphInner />
    </GraphErrorBoundary>
  );
}
