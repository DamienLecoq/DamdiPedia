import * as d3 from 'd3';
import matter from './matter.js';
import { slugify } from './slugify.js';

// ---------------------------------------------------------------------------
// normalizeNode — call on EVERY parsed node, never use raw frontmatter directly
// ---------------------------------------------------------------------------
export function normalizeNode(raw) {
  return {
    id: raw.id || slugify(raw.label || 'unnamed'),
    label: raw.label || raw.id || 'Unnamed',
    category: raw.category || 'concept',
    color: raw.color || null,
    priority: ['low', 'medium', 'high'].includes(raw.priority) ? raw.priority : 'medium',
    status: ['learning', 'to_review', 'mastered'].includes(raw.status) ? raw.status : 'learning',
    last_quiz_score: raw.last_quiz_score || null,
    next_review: raw.next_review || null,
    ease_factor: (typeof raw.ease_factor === 'number' && !isNaN(raw.ease_factor)) ? raw.ease_factor : 2.5,
    interval: (typeof raw.interval === 'number' && !isNaN(raw.interval) && raw.interval > 0) ? raw.interval : 1,
    createdAt: raw.createdAt ? String(raw.createdAt) : new Date().toISOString(),
    updatedAt: raw.updatedAt ? String(raw.updatedAt) : new Date().toISOString(),
    relations: Array.isArray(raw.relations) ? raw.relations : [],
    resources: Array.isArray(raw.resources) ? raw.resources : [],
    markdown_body: raw.markdown_body || '',
    _handle: raw._handle || null,
    _filename: raw._filename || ((raw.id || 'unknown') + '.md'),
  };
}

// ---------------------------------------------------------------------------
// getNode — always pass current nodes array from store
// ---------------------------------------------------------------------------
export const getNode = (nodeId, nodes) => nodes.find(n => n.id === nodeId);

// ---------------------------------------------------------------------------
// getNeighborIds — BFS, treats links as undirected
// ---------------------------------------------------------------------------
export function getNeighborIds(nodeId, depth, links) {
  const visited = new Set([nodeId]);
  let frontier = new Set([nodeId]);
  for (let d = 0; d < depth; d++) {
    const next = new Set();
    links.forEach(l => {
      const src = typeof l.source === 'object' ? l.source.id : l.source;
      const tgt = typeof l.target === 'object' ? l.target.id : l.target;
      if (frontier.has(src) && !visited.has(tgt)) next.add(tgt);
      if (frontier.has(tgt) && !visited.has(src)) next.add(src);
    });
    next.forEach(id => visited.add(id));
    frontier = next;
  }
  visited.delete(nodeId);
  return visited;
}

// ---------------------------------------------------------------------------
// buildGraph — full in-memory graph from parsed nodes
// ---------------------------------------------------------------------------
export function buildGraph(parsedNodes) {
  const warnings = [];
  const seenIds = new Map();
  const validNodes = [];

  for (const node of parsedNodes) {
    if (seenIds.has(node.id)) {
      warnings.push({
        type: 'slug_collision',
        file: node._filename,
        detail: `ID '${node.id}' conflicts with '${seenIds.get(node.id)}'`,
      });
    } else {
      seenIds.set(node.id, node._filename);
      validNodes.push(node);
    }
  }

  const links = buildLinks(validNodes);
  const clusters = buildClusters(validNodes);

  // Detect dangling relations
  const validIds = new Set(validNodes.map(n => n.id));
  validNodes.forEach(node => {
    node.relations.forEach(rel => {
      if (!validIds.has(rel.target)) {
        warnings.push({
          type: 'dangling_relation',
          file: node._filename,
          detail: `Broken link to '${rel.target}' (type: ${rel.type})`,
        });
      }
    });
  });

  return { nodes: validNodes, links, clusters, warnings };
}

// ---------------------------------------------------------------------------
// buildLinks — skips dangling relations
// ---------------------------------------------------------------------------
export function buildLinks(nodes) {
  const validIds = new Set(nodes.map(n => n.id));
  const links = [];
  nodes.forEach(node => {
    node.relations.forEach(rel => {
      if (validIds.has(rel.target)) {
        links.push({
          source: node.id,
          target: rel.target,
          type: rel.type || 'related',
          weight: typeof rel.weight === 'number' ? rel.weight : 0.5,
        });
      }
    });
  });
  return links;
}

// ---------------------------------------------------------------------------
// buildClusters — group nodes by category
// ---------------------------------------------------------------------------
export function buildClusters(nodes) {
  const CATEGORY_COLORS = {
    langage:   '#c084fc',   // violet
    framework: '#60a5fa',   // bleu
    logiciel:  '#5eead4',   // teal
    os:        '#4ade80',   // vert
    protocole: '#818cf8',   // indigo
    bdd:       '#fbbf24',   // ambre
    service:   '#fb923c',   // orange
    concept:   '#f472b6',   // rose
    materiel:  '#f87171',   // rouge
    default:   '#94a3b8',   // gris
  };

  const map = new Map();
  nodes.forEach(node => {
    if (!map.has(node.category)) {
      map.set(node.category, {
        category: node.category,
        node_ids: [],
        color: CATEGORY_COLORS[node.category] || CATEGORY_COLORS.default,
      });
    }
    map.get(node.category).node_ids.push(node.id);
  });
  return [...map.values()];
}

// ---------------------------------------------------------------------------
// refreshWarnings — recompute dangling warnings from in-memory nodes
// ---------------------------------------------------------------------------
export function refreshWarnings(nodes, existingWarnings) {
  const validIds = new Set(nodes.map(n => n.id));
  const dangling = [];
  nodes.forEach(node => {
    node.relations.forEach(rel => {
      if (!validIds.has(rel.target)) {
        dangling.push({
          type: 'dangling_relation',
          file: node._filename,
          detail: `Broken link to '${rel.target}' (type: ${rel.type})`,
        });
      }
    });
  });
  const preserved = existingWarnings.filter(
    w => w.type === 'parse_error' || w.type === 'slug_collision'
  );
  return [...preserved, ...dangling];
}

// ---------------------------------------------------------------------------
// computeStaticForceLayout — pre-compute positions via D3 simulation ticks
// Note: requestIdleCallback delays the START, but the ticks run synchronously
// and will block the main thread ~50–300ms. Acceptable for < 150 nodes.
// ---------------------------------------------------------------------------
export function computeStaticForceLayout(nodes, links, onComplete) {
  const simNodes = nodes.map(n => ({ id: n.id }));
  const simLinks = links
    .filter(l => simNodes.some(n => n.id === l.source) && simNodes.some(n => n.id === l.target))
    .map(l => ({ source: l.source, target: l.target }));

  const TICKS = nodes.length > 100 ? 150 : 300;

  const run = () => {
    const sim = d3.forceSimulation(simNodes)
      .force('link', d3.forceLink(simLinks).id(d => d.id).distance(120))
      .force('charge', d3.forceManyBody().strength(-260))
      .force('center', d3.forceCenter(0, 0))
      .force('collision', d3.forceCollide(35))
      .stop();
    for (let i = 0; i < TICKS; i++) sim.tick();
    const positions = new Map();
    simNodes.forEach(n => positions.set(n.id, { x: n.x || 0, y: n.y || 0 }));
    onComplete(positions);
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(run, { timeout: 2000 });
  } else {
    setTimeout(run, 0);
  }
}

// ---------------------------------------------------------------------------
// selectTopNodes — pick most-connected 150 nodes for global view
// ---------------------------------------------------------------------------
export function selectTopNodes(nodes, links, maxCount = 150, categoryFilter = null) {
  let candidates = categoryFilter
    ? nodes.filter(n => n.category === categoryFilter)
    : nodes;
  if (candidates.length <= maxCount) return candidates;
  const connectionCount = new Map(candidates.map(n => [n.id, 0]));
  links.forEach(l => {
    const src = typeof l.source === 'object' ? l.source.id : l.source;
    const tgt = typeof l.target === 'object' ? l.target.id : l.target;
    if (connectionCount.has(src)) connectionCount.set(src, connectionCount.get(src) + 1);
    if (connectionCount.has(tgt)) connectionCount.set(tgt, connectionCount.get(tgt) + 1);
  });
  return candidates
    .sort((a, b) => (connectionCount.get(b.id) || 0) - (connectionCount.get(a.id) || 0))
    .slice(0, maxCount);
}

// ---------------------------------------------------------------------------
// Node color — computed at render time, never auto-written to file
// ---------------------------------------------------------------------------
export const CATEGORY_COLOR_MAP = {
  langage:   '#c084fc',   // violet
  framework: '#60a5fa',   // bleu
  logiciel:  '#5eead4',   // teal
  os:        '#4ade80',   // vert
  protocole: '#818cf8',   // indigo
  bdd:       '#fbbf24',   // ambre
  service:   '#fb923c',   // orange
  concept:   '#f472b6',   // rose
  materiel:  '#f87171',   // rouge
  default:   '#94a3b8',   // gris
};

export const getNodeColor = (node) =>
  node.color || CATEGORY_COLOR_MAP[node.category] || CATEGORY_COLOR_MAP.default;

// ---------------------------------------------------------------------------
// YAML round-trip verification
// ---------------------------------------------------------------------------
export const verifyYamlRoundTrip = (original, serialized) => {
  const r = matter(serialized).data;
  if (r.id !== original.id) throw new Error(`id mismatch: '${r.id}'`);
  if (r.label !== original.label) throw new Error(`label mismatch — may contain YAML special chars`);
  if (r.category !== original.category) throw new Error(`category mismatch`);
  const ol = (original.relations || []).length;
  const rl = (r.relations || []).length;
  if (ol !== rl) throw new Error(`relations count: expected ${ol}, got ${rl}`);
};
