import React, { useRef, useEffect, useCallback, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import { forceCollide as d3ForceCollide, forceX as d3ForceX, forceY as d3ForceY } from 'd3-force';
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
  const maxDisplayNodes = useUiStore(s => s.maxDisplayNodes);
  const setMaxDisplayNodes = useUiStore(s => s.setMaxDisplayNodes);

  const editUnlocked = useUiStore(s => s.editUnlocked);
  const addRelation = useGraphStore(s => s.addRelation);
  const addToast = useUiStore(s => s.addToast);

  const isMobile = useIsMobile();
  const [showCatPanel, setShowCatPanel] = useState(false);
  const [linkMode, setLinkMode] = useState(false);
  const [linkSource, setLinkSource] = useState(null);
  // Accumulates label bounding rects for the current frame to avoid overlap
  const labelRectsRef = useRef([]);

  // Configure d3 forces for better spacing
  useEffect(() => {
    if (!graphRef.current) return;
    graphRef.current.d3Force('charge').strength(-420);
    graphRef.current.d3Force('link').distance(155);
    graphRef.current.d3Force('collision', d3ForceCollide(42));
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
    const visibleNodes = selectTopNodes(candidates, links, maxDisplayNodes, null);
    const visibleIds = new Set(visibleNodes.map(n => n.id));
    // Normalize source/target — force-graph mutates them from string IDs to node objects
    const visibleLinks = links.filter(l => {
      const s = typeof l.source === 'object' ? l.source?.id : l.source;
      const t = typeof l.target === 'object' ? l.target?.id : l.target;
      return visibleIds.has(s) && visibleIds.has(t);
    });
    const truncated = candidates.length > visibleNodes.length;
    return { visibleNodes, visibleLinks, truncated };
  }, [nodes, links, graphRenderMode, activeFilters.category, maxDisplayNodes]);

  // Category anchors — stable ring layout, one slot per category
  const categoryAnchors = React.useMemo(() => {
    const cats = [...new Set(visibleNodes.map(n => n.category).filter(Boolean))].sort();
    const radius = Math.max(220, Math.sqrt(visibleNodes.length) * 65);
    const map = new Map();
    cats.forEach((cat, i) => {
      const angle = (i / Math.max(cats.length, 1)) * Math.PI * 2 - Math.PI / 2;
      map.set(cat, { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius });
    });
    return map;
  }, [visibleNodes]);

  // Continuous rAF loop while hovering/selecting — keeps the pulse ring
  // animating even when the d3 simulation has cooled down
  useEffect(() => {
    if (!hoveredId && !selectedNodeId) return;
    let raf = 0;
    const tick = () => {
      graphRef.current?.refresh?.();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hoveredId, selectedNodeId]);

  // Auto-center + zoom whenever selectedNodeId changes (click OR search)
  // Runs after the simulation has had a chance to give the node coordinates
  useEffect(() => {
    if (!selectedNodeId || !graphRef.current) return;
    const animate = () => {
      const node = graphData.nodes.find(n => n.id === selectedNodeId);
      if (node && node.x != null && node.y != null) {
        graphRef.current.centerAt(node.x, node.y, 500);
        graphRef.current.zoom(3.2, 500);
      } else {
        // Node not yet positioned — retry next frame
        requestAnimationFrame(animate);
      }
    };
    animate();
  }, [selectedNodeId, graphData.nodes]);

  // Apply per-category attraction — only in live (non-global) mode
  useEffect(() => {
    if (!graphRef.current) return;
    if (graphRenderMode === 'global') {
      graphRef.current.d3Force('clusterX', null);
      graphRef.current.d3Force('clusterY', null);
      return;
    }
    const getX = (n) => categoryAnchors.get(n.category)?.x || 0;
    const getY = (n) => categoryAnchors.get(n.category)?.y || 0;
    graphRef.current.d3Force('clusterX', d3ForceX(getX).strength(0.13));
    graphRef.current.d3Force('clusterY', d3ForceY(getY).strength(0.13));
    graphRef.current.d3ReheatSimulation?.();
  }, [categoryAnchors, graphRenderMode]);

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
  // Degree + neighbor maps — computed once per visible graph (used by
  // paintNode, paintLink AND graphData sort for priority label painting)
  // ---------------------------------------------------------------------------
  const { degreeMap, neighborMap, maxDegree } = React.useMemo(() => {
    const deg = new Map();
    const neigh = new Map();
    visibleNodes.forEach(n => { deg.set(n.id, 0); neigh.set(n.id, new Set()); });
    visibleLinks.forEach(l => {
      const s = typeof l.source === 'object' ? l.source?.id : l.source;
      const t = typeof l.target === 'object' ? l.target?.id : l.target;
      if (deg.has(s)) deg.set(s, deg.get(s) + 1);
      if (deg.has(t)) deg.set(t, deg.get(t) + 1);
      if (neigh.has(s) && t != null) neigh.get(s).add(t);
      if (neigh.has(t) && s != null) neigh.get(t).add(s);
    });
    let max = 0;
    deg.forEach(v => { if (v > max) max = v; });
    return { degreeMap: deg, neighborMap: neigh, maxDegree: max };
  }, [visibleNodes, visibleLinks]);

  // ---------------------------------------------------------------------------
  // Build graph data — nodes sorted by degree desc so hubs paint first and
  // reserve label slots before lesser nodes
  // ---------------------------------------------------------------------------
  const graphData = React.useMemo(() => {
    let gNodes = visibleNodes
      .map(n => ({ ...n }))
      .sort((a, b) => (degreeMap.get(b.id) || 0) - (degreeMap.get(a.id) || 0));
    if (graphRenderMode === 'global' && globalLayoutCache) {
      gNodes = gNodes.map(n => {
        const pos = globalLayoutCache.positions.get(n.id);
        return pos ? { ...n, fx: pos.x, fy: pos.y } : n;
      });
    }
    // Deep-copy links so force-graph mutation doesn't affect the store's array
    return { nodes: gNodes, links: visibleLinks.map(l => ({ ...l })) };
  }, [visibleNodes, visibleLinks, graphRenderMode, globalLayoutCache, degreeMap]);

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

    if (linkMode) {
      if (!linkSource) {
        setLinkSource(node.id);
        addToast(`Source : ${node.label}. Cliquez sur le nœud cible.`, 'info');
      } else if (node.id === linkSource) {
        setLinkSource(null);
        addToast('Sélection annulée.', 'info');
      } else {
        addRelation(linkSource, node.id);
        setLinkSource(null);
      }
      return;
    }

    // Camera animation is handled by the selectedNodeId useEffect so that
    // both click and search trigger the same visual outcome
    selectNode(node.id);
  }, [selectNode, linkMode, linkSource, addRelation, addToast]);

  // Right-click (or dbl-click fallback): reset to global view
  const handleNodeDoubleClick = useCallback(() => {
    selectNode(null);
    if (graphRef.current) graphRef.current.zoomToFit(500, 80);
  }, [selectNode]);

  const handleBackgroundClick = useCallback(() => {
    selectNode(null);
  }, [selectNode]);

  // ---------------------------------------------------------------------------
  // Node canvas painter — brain/neural aesthetic with glow
  // ---------------------------------------------------------------------------
  const paintNode = useCallback((node, ctx, globalScale) => {
    const color = getNodeColor(node);
    const isSelected = node.id === selectedNodeId;
    const isHovered = node.id === hoveredId;
    const isLinkSource = linkMode && node.id === linkSource;

    // Selection (click or search) takes precedence over hover
    const activeId = selectedNodeId || hoveredId;
    const activeNeighbors = activeId ? neighborMap.get(activeId) : null;
    const isNeighbor = !!(activeNeighbors && activeNeighbors.has(node.id));
    const isActive = isHovered || isSelected || isLinkSource || isNeighbor;

    // Hierarchical sizing — hubs get a stronger boost so the macro spine
    // of the graph (Git, Docker, Python…) visually dominates at a glance
    const degree = degreeMap.get(node.id) || 0;
    const hubThresholdLocal = Math.max(3, maxDegree * 0.35);
    const isHubLocal = degree >= hubThresholdLocal;
    const baseR = Math.min(14, 3.4 + Math.sqrt(degree) * (isHubLocal ? 1.55 : 1.15));
    const r = isSelected ? baseR + 2.5 : isLinkSource ? baseR + 3 : isHovered ? baseR + 1.8 : baseR;

    // Progressive disclosure — at low zoom, only hubs are visible
    // Smooth fade between zoomFadeStart and zoomFadeEnd for non-hubs
    let zoomAlpha = 1;
    if (!isHubLocal && !isActive) {
      const zoomFadeStart = 0.35;
      const zoomFadeEnd = 0.95;
      if (globalScale <= zoomFadeStart) zoomAlpha = 0;
      else if (globalScale >= zoomFadeEnd) zoomAlpha = 1;
      else zoomAlpha = (globalScale - zoomFadeStart) / (zoomFadeEnd - zoomFadeStart);
    }
    if (zoomAlpha <= 0.02) return;

    // Baseline opacity: focus mode dims non-subgraph much more than hover alone
    const dimLevel = selectedNodeId ? 0.03 : 0.08;
    const baseAlpha = (activeId ? (isActive ? 1 : dimLevel) : 0.78) * zoomAlpha;
    ctx.globalAlpha = baseAlpha;

    // Outer glow — reserved for interactive/active states
    ctx.shadowColor = isLinkSource ? '#00ff88' : color;
    ctx.shadowBlur = isLinkSource ? 28 : isSelected ? 24 : isHovered ? 18 : (isNeighbor ? 8 : 4);

    ctx.beginPath();
    ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();

    // Thin white ring — detaches the node from the colored halo backdrop
    ctx.shadowBlur = 0;
    ctx.strokeStyle = `rgba(255,255,255,${0.45 * baseAlpha})`;
    ctx.lineWidth = Math.max(0.4, 0.7 / globalScale);
    ctx.stroke();

    // Bright core
    ctx.beginPath();
    ctx.arc(node.x, node.y, r * 0.38, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.fill();

    ctx.shadowBlur = 0;

    // Pulse ring — animated expanding circle on hovered node
    if (isHovered || isSelected) {
      const t = (Date.now() % 1600) / 1600;
      const pulseR = r + 4 + t * 14;
      ctx.globalAlpha = Math.max(0, 0.55 * (1 - t));
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(node.x, node.y, pulseR, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.globalAlpha = baseAlpha;
    }

    // Label — conditional visibility
    // Show when: hovered/selected/linkSource, neighbor of active, zoomed-in enough,
    // or high-degree "hub" node (macro-level importance — threshold aligned
    // with the progressive-disclosure hub threshold so painted hubs always label)
    const isHub = maxDegree > 0 && degree >= Math.max(3, maxDegree * 0.35);
    const zoomedIn = globalScale >= 1.6;
    const showLabel = isHovered || isSelected || isLinkSource
      || isNeighbor
      || zoomedIn
      || (isHub && !activeId);

    if (showLabel) {
      const fontSize = Math.max(10 / globalScale, 3);
      ctx.font = `500 ${fontSize}px Inter, system-ui, -apple-system, sans-serif`;
      const labelWidth = ctx.measureText(node.label).width;
      const ly = node.y + r + fontSize + 1;
      const rectX = node.x - labelWidth / 2 - 1;
      const rectY = ly - fontSize;
      const rectW = labelWidth + 2;
      const rectH = fontSize + 2;

      // Anti-overlap: skip passive labels that collide with an already-painted one
      const forceShow = isHovered || isSelected || isLinkSource;
      const rects = labelRectsRef.current;
      let collides = false;
      if (!forceShow) {
        for (const rr of rects) {
          if (rectX < rr.x + rr.w && rectX + rectW > rr.x &&
              rectY < rr.y + rr.h && rectY + rectH > rr.y) {
            collides = true;
            break;
          }
        }
      }

      if (!collides) {
        rects.push({ x: rectX, y: rectY, w: rectW, h: rectH });

        const labelAlpha = forceShow ? 1
          : isNeighbor ? 0.9
          : isHub && !activeId ? 0.7
          : 0.75;
        ctx.globalAlpha = baseAlpha * labelAlpha;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'alphabetic';
        // Dark outline for contrast over any background
        ctx.lineWidth = Math.max(1.5, fontSize * 0.3);
        ctx.strokeStyle = 'rgba(0,0,0,0.85)';
        ctx.lineJoin = 'round';
        ctx.strokeText(node.label, node.x, ly);
        ctx.fillStyle = 'rgba(235,245,255,0.98)';
        ctx.fillText(node.label, node.x, ly);
      }
    }

    ctx.globalAlpha = 1;
  }, [selectedNodeId, hoveredId, linkMode, linkSource, neighborMap, degreeMap, maxDegree]);

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

    // Focus mode takes precedence: any link outside the focused 1-hop neighborhood
    // becomes near-invisible, everything inside glows
    const activeId = selectedNodeId || hoveredId;
    const touchesActive = activeId && (srcId === activeId || tgtId === activeId);
    const isDimmed = !!activeId && !touchesActive;
    const isHighlighted = !isDimmed && touchesActive;
    const w = link.weight || 1;
    const isInterCat = src.category && tgt.category && src.category !== tgt.category;

    // Curved link — quadratic bezier, control point offset perpendicular to
    // the chord. Curvature scales with link length: short links stay near
    // straight, long links arc far out so they don't cross the node cloud.
    // Direction alternates by node id hash so parallel long links don't overlap.
    const dx = tgt.x - src.x;
    const dy = tgt.y - src.y;
    const len = Math.sqrt(dx * dx + dy * dy) || 1;
    const lengthFactor = Math.min(1, Math.max(0, (len - 90) / 220));
    const baseCurv = isInterCat ? 0.22 : 0.14;
    const maxCurv = isInterCat ? 0.55 : 0.42;
    const curvMag = baseCurv + (maxCurv - baseCurv) * lengthFactor;
    // Alternate side: simple hash of ids to get a stable ±1
    const hash = (srcId.charCodeAt(0) + tgtId.charCodeAt(0)) & 1 ? 1 : -1;
    const curvature = curvMag * hash;
    const cpx = (src.x + tgt.x) / 2 + dy * curvature;
    const cpy = (src.y + tgt.y) / 2 - dx * curvature;

    // Progressive disclosure — fade links whose endpoints are both non-hubs at low zoom
    const srcDeg = degreeMap.get(srcId) || 0;
    const tgtDeg = degreeMap.get(tgtId) || 0;
    const hubThreshold = Math.max(3, maxDegree * 0.35);
    const endpointVisible = srcDeg >= hubThreshold || tgtDeg >= hubThreshold;
    let zoomAlpha = 1;
    if (!endpointVisible && !touchesActive) {
      const zoomFadeStart = 0.35;
      const zoomFadeEnd = 0.95;
      if (globalScale <= zoomFadeStart) zoomAlpha = 0;
      else if (globalScale >= zoomFadeEnd) zoomAlpha = 1;
      else zoomAlpha = (globalScale - zoomFadeStart) / (zoomFadeEnd - zoomFadeStart);
    }
    if (zoomAlpha <= 0.02) return;

    // Architecture mode — at low zoom hide intra-cat links entirely,
    // only inter-cluster bridges remain so the macro structure is clear
    if (!isInterCat && !touchesActive && globalScale < 0.7) return;

    // Curve midpoint at t=0.5 of a quadratic bezier: (P0 + 2*CP + P2) / 4
    const mx = (src.x + 2 * cpx + tgt.x) / 4;
    const my = (src.y + 2 * cpy + tgt.y) / 4;

    ctx.save();
    // Opacity: inter-category links dominate at rest (structure),
    // intra-cat calmer so the cluster doesn't turn into a fur ball
    const rawAlpha = isDimmed
      ? (selectedNodeId ? 0.008 : 0.015)
      : isHighlighted
        ? Math.min(w * 0.5 + 0.55, 0.98)
        : isInterCat
          ? Math.min(w * 0.2 + 0.5, 0.78)
          : Math.min(w * 0.2 + 0.18, 0.38);
    ctx.globalAlpha = rawAlpha * zoomAlpha;

    // Stroke: gradient src→tgt category colors for inter-cat links, purple otherwise
    if (isInterCat && !isDimmed) {
      const grad = ctx.createLinearGradient(src.x, src.y, tgt.x, tgt.y);
      grad.addColorStop(0, getNodeColor(src));
      grad.addColorStop(1, getNodeColor(tgt));
      ctx.strokeStyle = grad;
    } else {
      ctx.strokeStyle = isHighlighted ? '#b07fff' : '#7c4dff';
    }

    ctx.lineWidth = isHighlighted
      ? w * 1.4 + 0.9
      : isInterCat
        ? w * 0.7 + 0.5
        : w * 0.5 + 0.3;
    ctx.shadowColor = isInterCat ? getNodeColor(tgt) : '#9c6fff';
    ctx.shadowBlur = isDimmed ? 0 : isHighlighted ? 14 : (isInterCat ? 6 : 0);

    ctx.beginPath();
    ctx.moveTo(src.x, src.y);
    ctx.quadraticCurveTo(cpx, cpy, tgt.x, tgt.y);
    ctx.stroke();

    // Relation labels
    if (showRelationLabels && !isDimmed) {
      const fontSize = Math.max(9 / globalScale, 2);
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 0.8;
      ctx.font = `500 ${fontSize}px Inter, system-ui, -apple-system, sans-serif`;
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
  }, [hoveredId, selectedNodeId, showLinks, showRelationLabels, biDirSet, biDirTypeMap, degreeMap, maxDegree]);

  // ---------------------------------------------------------------------------
  // Background pre-render — category halos + faint watermark labels
  // Runs every frame BEFORE nodes/links, reads live positions from graphData.nodes
  // ---------------------------------------------------------------------------
  const onRenderFramePre = useCallback((ctx, globalScale) => {
    // Reset per-frame label occupancy — paintNode pushes rects as it paints
    labelRectsRef.current = [];
    if (!graphData.nodes.length) return;
    // Aggregate per-category live stats
    const stats = new Map();
    graphData.nodes.forEach(n => {
      if (n.x == null || n.y == null || !n.category) return;
      let s = stats.get(n.category);
      if (!s) {
        s = { sumX: 0, sumY: 0, count: 0, members: [] };
        stats.set(n.category, s);
      }
      s.sumX += n.x;
      s.sumY += n.y;
      s.count += 1;
      s.members.push(n);
    });

    stats.forEach((s, cat) => {
      const cx = s.sumX / s.count;
      const cy = s.sumY / s.count;
      let maxR = 0;
      for (const n of s.members) {
        const dx = n.x - cx;
        const dy = n.y - cy;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d > maxR) maxR = d;
      }
      const haloR = Math.max(50, maxR + 32);
      const color = getNodeColor({ category: cat });

      // Radial-gradient halo
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, haloR);
      grad.addColorStop(0, color + '33');   // ~20%
      grad.addColorStop(0.55, color + '15'); // ~8%
      grad.addColorStop(1, color + '00');   // 0%
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, haloR, 0, Math.PI * 2);
      ctx.fill();

      // Watermark label — centered, faint, scales with zoom
      const fontSize = Math.max(16 / globalScale, 9);
      ctx.font = `800 ${fontSize}px Inter, system-ui, -apple-system, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.globalAlpha = selectedNodeId ? 0.08 : 0.22;
      ctx.fillStyle = color;
      ctx.fillText(cat.toUpperCase(), cx, cy);
      ctx.globalAlpha = 1;
    });
  }, [graphData.nodes, selectedNodeId]);

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

  const focusedNode = selectedNodeId ? graphData.nodes.find(n => n.id === selectedNodeId) : null;
  const focusedDegree = selectedNodeId ? (degreeMap.get(selectedNodeId) || 0) : 0;

  return (
    <div
      ref={containerRef}
      style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        // Subtle radial vignette — anchors the eye at the center
        background: 'radial-gradient(ellipse at center, rgba(40, 28, 80, 0.28) 0%, rgba(10, 7, 28, 0.05) 55%, rgba(4, 2, 14, 0.6) 100%)',
      }}
    >
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

        <div style={{ width: 1, height: 16, background: 'var(--border)', margin: '0 2px' }} />

        <label
          title="Nombre maximum de nœuds affichés (les plus connectés)"
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: '0.72rem', color: 'var(--text-muted)',
            padding: isMobile ? '0.3rem 0.5rem' : '0.25rem 0.55rem',
            background: 'rgba(10, 7, 28, 0.55)',
            border: '1px solid var(--border)',
            borderRadius: 6,
          }}
        >
          <span>Max</span>
          <input
            type="number"
            min={1}
            max={Math.max(1, nodes.length)}
            step={10}
            value={maxDisplayNodes}
            onChange={(e) => setMaxDisplayNodes(e.target.value)}
            style={{
              width: 56,
              background: 'transparent',
              border: 'none',
              borderBottom: '1px solid var(--border)',
              color: 'var(--text)',
              fontSize: '0.72rem',
              padding: '1px 2px',
              outline: 'none',
            }}
          />
        </label>

        {editUnlocked && (
          <button
            onClick={() => { setLinkMode(m => !m); setLinkSource(null); }}
            className="btn-secondary"
            style={{
              fontSize: '0.72rem', padding: isMobile ? '0.3rem 0.5rem' : '0.25rem 0.65rem',
              borderColor: linkMode ? 'var(--success)' : 'var(--border)',
              color: linkMode ? 'var(--success)' : 'var(--text-muted)',
              background: linkMode ? 'rgba(52, 211, 153, 0.1)' : undefined,
            }}
            title={linkMode ? 'Désactiver le mode liaison' : 'Activer le mode liaison'}
          >
            {isMobile ? '🔗' : '🔗 Lier'}
          </button>
        )}

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

      {/* Focused node info — compact overlay showing focused node stats */}
      {focusedNode && (
        <div style={{
          position: 'absolute', bottom: 64, left: '50%', transform: 'translateX(-50%)',
          zIndex: 10,
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '0.5rem 0.9rem',
          background: 'rgba(10, 7, 28, 0.82)',
          backdropFilter: 'blur(22px) saturate(180%)',
          WebkitBackdropFilter: 'blur(22px) saturate(180%)',
          border: '1px solid var(--border)',
          borderTopColor: 'var(--border-hi)',
          borderRadius: 10,
          boxShadow: '0 10px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
          fontSize: '0.78rem',
          maxWidth: 'calc(100% - 32px)',
        }}>
          <div style={{
            width: 10, height: 10, borderRadius: '50%',
            background: getNodeColor(focusedNode),
            boxShadow: `0 0 8px ${getNodeColor(focusedNode)}`,
            flexShrink: 0,
          }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
            <span style={{ color: 'var(--text)', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {focusedNode.label}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.68rem' }}>
              {focusedNode.category} · {focusedDegree} connexion{focusedDegree > 1 ? 's' : ''}
            </span>
          </div>
          <button
            onClick={handleBackgroundClick}
            title="Quitter le focus"
            style={{
              background: 'none', border: 'none', color: 'var(--text-muted)',
              cursor: 'pointer', fontSize: '0.9rem', padding: '0 2px',
              lineHeight: 1, flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Link mode indicator */}
      {linkMode && (
        <div style={{
          position: 'absolute', top: isMobile ? 8 : 12, right: isMobile ? 8 : 12, zIndex: 10,
          background: 'rgba(52, 211, 153, 0.1)', border: '1px solid var(--success)',
          borderRadius: 6, padding: '6px 12px', fontSize: '0.76rem', color: 'var(--success)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span>{linkSource
            ? `Source : ${nodes.find(n => n.id === linkSource)?.label || linkSource} — cliquez sur la cible`
            : 'Cliquez sur le nœud source'
          }</span>
          <button onClick={() => { setLinkMode(false); setLinkSource(null); }}
            style={{ background: 'none', border: 'none', color: 'var(--success)', cursor: 'pointer', fontSize: '0.8rem', padding: 0 }}>✕</button>
        </div>
      )}

      {/* Truncation warning */}
      {truncated && (
        <div style={{
          position: 'absolute', top: isMobile ? 8 : 12, right: isMobile ? 8 : 12, zIndex: 10,
          background: 'rgba(255,200,0,0.1)', border: '1px solid var(--warning)',
          borderRadius: 6, padding: '4px 10px', fontSize: '0.73rem', color: 'var(--warning)',
        }}>
          {activeFilters.category
            ? `Top ${visibleNodes.length} sur ${nodes.filter(n => n.category === activeFilters.category).length} dans « ${activeFilters.category} »`
            : `Top ${visibleNodes.length} sur ${nodes.length} nœuds`}
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
        onRenderFramePre={onRenderFramePre}
        nodeCanvasObject={paintNode}
        nodeCanvasObjectMode={() => 'replace'}
        linkCanvasObjectMode={() => 'replace'}
        linkCanvasObject={paintLink}
        onNodeClick={handleNodeClick}
        onNodeRightClick={handleNodeDoubleClick}
        onBackgroundClick={handleBackgroundClick}
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
