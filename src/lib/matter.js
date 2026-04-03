/**
 * Defensive gray-matter wrapper.
 * Vite's esbuild pre-bundler can wrap CJS module.exports as { default: fn }
 * instead of exposing the function directly. This handles both cases.
 */
import _matter from 'gray-matter';

const matter = typeof _matter === 'function' ? _matter : (_matter.default || _matter);

export default matter;
