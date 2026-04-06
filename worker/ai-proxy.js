/**
 * Cloudflare Worker — AI proxy for DamdiPedia (Gemini).
 *
 * Proxies requests to Google Gemini API without exposing the API key client-side.
 * Translates internal request format to Gemini and back, so the frontend code
 * doesn't need to know which provider is behind the proxy.
 *
 * Environment variables (set via `wrangler secret put`):
 *   GEMINI_KEY — Google AI Studio API key
 *
 * Usage from frontend (unchanged):
 *   fetch(WORKER_URL, { method: 'POST', body: JSON.stringify({
 *     model: 'gemini-2.0-flash',
 *     max_tokens: 2048,
 *     system: '...',
 *     messages: [{ role: 'user', content: '...' }]
 *   }) })
 */

const ALLOWED_ORIGINS = [
  'https://damienlecoq.github.io',
  'http://localhost:5173',
  'http://localhost:4173',
];

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';

    const corsHeaders = {
      'Access-Control-Allow-Origin': ALLOWED_ORIGINS.some(o => origin.startsWith(o)) ? origin : ALLOWED_ORIGINS[0],
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // Only POST allowed
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Origin check
    if (!ALLOWED_ORIGINS.some(o => origin.startsWith(o))) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // API key check
    if (!env.GEMINI_KEY) {
      return new Response(JSON.stringify({ error: 'GEMINI_KEY not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Rate limiting (optional — if AI_LIMITER binding exists)
    if (env.AI_LIMITER) {
      try {
        const { success } = await env.AI_LIMITER.limit({
          key: request.headers.get('CF-Connecting-IP') || 'anonymous',
        });
        if (!success) {
          return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
            status: 429,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
          });
        }
      } catch { /* limiter error — continue anyway */ }
    }

    // Proxy to Gemini
    try {
      const body = await request.json();
      const model = body.model || 'gemini-2.0-flash';

      // Translate from internal format → Gemini format
      const geminiBody = {
        contents: (body.messages || []).map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        })),
        generationConfig: {
          maxOutputTokens: body.max_tokens || 2048,
        },
      };

      if (body.system) {
        geminiBody.systemInstruction = { parts: [{ text: body.system }] };
      }

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${env.GEMINI_KEY}`;

      const geminiRes = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(geminiBody),
      });

      const geminiData = await geminiRes.json();

      if (!geminiRes.ok) {
        return new Response(JSON.stringify({
          error: { message: geminiData.error?.message || `Gemini HTTP ${geminiRes.status}` },
        }), {
          status: geminiRes.status,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        });
      }

      // Translate Gemini response → internal format { content: [{ text }] }
      const text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || '';

      return new Response(JSON.stringify({ content: [{ text }] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Proxy error: ' + e.message }), {
        status: 502,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
  },
};
