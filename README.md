# IT Knowledge Graph (DamdiPedia)

> A graph-based second brain for IT learning, powered by local files and AI.

Your knowledge lives in plain Markdown files on your own machine. The app reads and writes them directly — no server, no account, no lock-in. If the app disappears, the knowledge remains.

---

## Browser support

| Feature | Chrome / Edge | Firefox / Safari |
|---|---|---|
| Open a local folder | ✓ (File System Access API) | ZIP mode only |
| Read / write nodes | ✓ | ✓ (ZIP) |
| AI features | ✓ (requires internet) | ✓ (requires internet) |
| Graph visualization | ✓ | ✓ |

**Recommended browser: Chrome or Edge** for the best experience (direct folder access).  
Firefox and Safari fall back to ZIP mode automatically.

---

## Quick start

```bash
npm install
npm run dev
```

Then open `http://localhost:5173/DamdiPedia/` in Chrome or Edge.

- Click **Open Folder** and select a directory containing `.md` files (or use the sample notes).
- Or click **Load ZIP** to open a `.zip` archive of Markdown notes.

---

## Folder structure

```
your-notes/
  docker.md
  kubernetes.md
  tcpip.md        ← slugified from "TCP/IP"
  c-basics.md     ← slugified from "C++ Basics"
  ...
```

Each file is a Markdown document with a YAML frontmatter block:

```markdown
---
id: docker
label: Docker
category: DevOps
status: learning        # learning | to_review | mastered
priority: high          # low | medium | high
relations:
  - target: kubernetes
    type: relates_to
    weight: 3
resources:
  - title: Docker Docs
    url: https://docs.docker.com
    type: docs
createdAt: 2024-01-01T00:00:00.000Z
updatedAt: 2024-01-01T00:00:00.000Z
---

Your notes in **Markdown** here.
```

---

## Node IDs and slugify

Node IDs are derived from the label using `slugify()`:

| Label | ID / filename |
|---|---|
| `Docker` | `docker` |
| `TCP/IP` | `tcpip` |
| `C++ Basics` | `c-basics` |
| `HTTP: Protocol` | `http-protocol` |

- Slashes, plus signs, colons, and special characters are stripped or replaced.
- Spaces become hyphens.
- All lowercase.

If a collision occurs (two labels produce the same slug), the second node gets a `-2` suffix, and so on.

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```
VITE_AI_PROXY_URL=https://your-worker.workers.dev
VITE_AI_MODEL=claude-sonnet-4-20250514
VITE_AI_MAX_TOKENS=2048
```

AI features are disabled if `VITE_AI_PROXY_URL` is not set. All other features work without it.

---

## AI features (Cloudflare Worker setup)

AI calls are proxied through a Cloudflare Worker so your Anthropic API key is never exposed to the browser.

### Deploy the worker

1. Go to [cloudflare.com](https://cloudflare.com) → **Workers & Pages** → **Create Worker**.
2. Paste the following code and click **Deploy**:

```js
export default {
  async fetch(request, env) {
    const allowed = [
      'https://yourusername.github.io',
      'http://localhost:5173',
      'http://localhost:4173'
    ];
    if (request.method === 'OPTIONS') return new Response(null, { headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }});
    const origin = request.headers.get('Origin') || '';
    if (!allowed.some(o => origin.startsWith(o))) return new Response('Forbidden', { status: 403 });
    if (env.AI_LIMITER) {
      const { success } = await env.AI_LIMITER.limit({ key: request.headers.get('CF-Connecting-IP') || 'x' });
      if (!success) return new Response('Rate limit exceeded', { status: 429 });
    }
    if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
    const body = await request.json();
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': env.ANTHROPIC_KEY, 'anthropic-version': '2023-06-01', 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    return new Response(await res.text(), {
      status: res.status,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': origin }
    });
  }
}
```

3. Update `allowed` origins to include your GitHub Pages URL.
4. Go to **Settings → Variables and Secrets** → add `ANTHROPIC_KEY` as a secret (your Anthropic API key).
5. (Optional) Add rate limiting via `wrangler.toml`.
6. Copy the Worker URL (e.g. `https://my-worker.workers.dev`) → paste into `.env.local` as `VITE_AI_PROXY_URL`.

> **Note:** The `localhost` entries in `allowed` let you use AI features during development. Remove them before sharing the Worker URL publicly.

---

## Vite base path

The `vite.config.js` sets `base: '/DamdiPedia/'` for GitHub Pages deployment. If you fork this repo under a different name, update that value to match your repository name:

```js
// vite.config.js
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

---

## GitHub Pages deployment

```bash
npm run build
# Push dist/ to your gh-pages branch, or configure GitHub Actions.
```

The app uses `HashRouter` so all routes work under a sub-path without server configuration.

---

## Keyboard shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl+K` | Focus search |
| `Esc` | Close detail panel (or AI sub-panel first if open) |

---

## Single-tab limitation

Only one browser tab should have the same folder open at a time. The app detects a second tab opening and shows a dismissible warning banner.

Concurrent tabs writing to the same folder can cause write conflicts. There is no cross-tab file locking available in the File System Access API.

---

## Known limitations

- **Single tab only.** Concurrent tabs with the same folder may cause write conflicts.
- **Chrome / Edge only for folder mode.** Firefox and Safari use ZIP mode (no direct disk writes).
- **AI features require internet.** All other features (graph, CRUD, search, spaced repetition) work fully offline.
- **No real-time collaboration.** Single-user by design.
- **Back button quiz guard.** `useBlocker` (React Router) is unreliable with `HashRouter`. The quiz navigation guard uses `hashchange` events instead — the browser back button is guarded but not bulletproof in every edge case.
- **Bundle size.** ~880 kB minified (~260 kB gzipped) due to D3 and react-force-graph-2d. Acceptable for a single-user desktop app.
