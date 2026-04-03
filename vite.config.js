import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import fs from 'fs';

/** Treat .md files as raw text (default export = string content) */
function rawMdPlugin() {
  return {
    name: 'raw-md',
    transform(code, id) {
      if (id.endsWith('.md')) {
        const content = fs.readFileSync(id, 'utf-8');
        return { code: `export default ${JSON.stringify(content)};`, map: null };
      }
    },
  };
}

export default defineConfig({
  base: '/DamdiPedia/',
  plugins: [
    rawMdPlugin(),
    react(),
    nodePolyfills(), // polyfills Buffer, process, etc. for gray-matter/js-yaml
  ],
  optimizeDeps: {
    include: ['gray-matter'],
  },
});
