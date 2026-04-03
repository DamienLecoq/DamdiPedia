import Fuse from 'fuse.js';

let fuse = null;

export const buildFuseIndex = (nodes) => {
  fuse = new Fuse(nodes, {
    keys: [
      { name: 'label', weight: 0.6 },
      { name: 'category', weight: 0.2 },
      { name: 'markdown_body', weight: 0.2 },
    ],
    threshold: 0.3,
    includeScore: true,
    minMatchCharLength: 2,
  });
};

export const search = (q) => fuse?.search(q) || [];
