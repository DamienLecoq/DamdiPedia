import { getNode, getNeighborIds } from './graph.js';

// ---------------------------------------------------------------------------
// callAI — POST to proxy worker, never directly to Anthropic API
// ---------------------------------------------------------------------------
export const callAI = async (userMessage, systemPrompt) => {
  if (!import.meta.env.VITE_AI_PROXY_URL) throw new Error('AI_NOT_CONFIGURED');
  if (!navigator.onLine) throw new Error('OFFLINE');

  let response;
  try {
    response = await fetch(import.meta.env.VITE_AI_PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: import.meta.env.VITE_AI_MODEL || 'claude-sonnet-4-20250514',
        max_tokens: parseInt(import.meta.env.VITE_AI_MAX_TOKENS || '2048'),
        system: systemPrompt,
        messages: [{ role: 'user', content: userMessage }],
      }),
    });
  } catch (e) {
    if (e instanceof TypeError) throw new Error('NETWORK_ERROR');
    throw e;
  }

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `HTTP ${response.status}`);
  }

  return (await response.json()).content[0].text;
};

const AI_ERRORS = {
  AI_NOT_CONFIGURED: 'AI not configured — set VITE_AI_PROXY_URL in .env.local.',
  OFFLINE: 'No internet connection.',
  NETWORK_ERROR: 'Network error — check your connection.',
};
export const getAIErrorMessage = (err) =>
  AI_ERRORS[err.message] || 'AI error: ' + err.message;

// ---------------------------------------------------------------------------
// buildAIContext — assembles main node + top-10 weighted neighbors
// _handle and _filename are stripped before sending to AI
// ---------------------------------------------------------------------------
export const buildAIContext = (nodeId, depth, nodes, links) => {
  const mainNode = getNode(nodeId, nodes);
  if (!mainNode) throw new Error(`Node '${nodeId}' not found`);

  const neighborIds = getNeighborIds(nodeId, depth, links);

  const neighborsWithWeight = [...neighborIds].map(nId => {
    const node = getNode(nId, nodes);
    // Join with links array to get weight (never use _weight field)
    const directLink = links.find(l => {
      const src = typeof l.source === 'object' ? l.source.id : l.source;
      const tgt = typeof l.target === 'object' ? l.target.id : l.target;
      return (src === nodeId && tgt === nId) || (src === nId && tgt === nodeId);
    });
    return { node, weight: directLink?.weight || 0 };
  });

  const topNeighbors = neighborsWithWeight
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 10)
    .map(({ node }) => {
      // Strip internal fields before sending to AI
      const { _handle, _filename, ...cleanNode } = node;
      return { ...cleanNode, markdown_body: cleanNode.markdown_body?.slice(0, 200) || '' };
    });

  const { _handle, _filename, ...cleanMain } = mainNode;
  return { main_node: cleanMain, neighbors: topNeighbors };
};

// ---------------------------------------------------------------------------
// Prompt builders
// ---------------------------------------------------------------------------
export const buildSummaryPrompt = (node, neighbors) => ({
  system: 'You are a technical educator. Generate structured pedagogical explanations in Markdown.',
  user: `Explain '${node.label}' (${node.category}).

My notes: ${node.markdown_body}

Related: ${neighbors.map(n => `- ${n.label}: ${n.markdown_body}`).join('\n')}

## Definition
## Key Concepts
## How it relates to ${neighbors.map(n => n.label).join(', ')}
## Practical Use Cases
## Common Pitfalls`,
});

export const buildQuizPrompt = (node, neighbors, count, difficulty) => ({
  system: 'You are a technical quiz generator. Return ONLY raw JSON arrays. No markdown, no code fences.',
  user: `Generate exactly ${count} MCQ about '${node.label}'. Difficulty: ${difficulty}.

Context: ${node.markdown_body.slice(0, 500)}
Related: ${neighbors.map(n => `${n.label}: ${n.markdown_body}`).join(' | ')}

Raw JSON only:
[{"question":"...","options":["A","B","C","D"],"correct_answer":0,"explanation":"..."}]`,
});

// ---------------------------------------------------------------------------
// Exercise generation prompt
// ---------------------------------------------------------------------------
export const buildExercisePrompt = (node, neighbors, depth, types, count) => {
  const typeDescriptions = {
    open_question: 'Question ouverte (l\'apprenant doit rédiger une réponse détaillée)',
    flashcard: 'Flashcard (question courte → réponse courte à mémoriser)',
    code_challenge: 'Code challenge (l\'apprenant doit écrire du code)',
    reverse_explanation: 'Explication inverse (expliquer pourquoi NE PAS faire quelque chose)',
    mcq: 'QCM (4 options, 1 seule correcte)',
  };

  const typeList = types.map(t => typeDescriptions[t] || t).join('\n- ');

  const neighborsContext = neighbors.length > 0
    ? `\n\nNœuds voisins (profondeur ${depth}) :\n${neighbors.map(n => `- ${n.label} (${n.category}): ${n.markdown_body}`).join('\n')}`
    : '';

  return {
    system: `Tu es un générateur d'exercices pédagogiques IT. Tu génères des exercices variés pour aider à la révision.
Retourne UNIQUEMENT un tableau JSON brut. Pas de markdown, pas de code fences.

Chaque exercice doit avoir :
- "type": un parmi [${types.map(t => `"${t}"`).join(', ')}]
- "question": la question ou consigne
- "relatedNodeId": l'id du nœud principal ou d'un voisin sur lequel porte l'exercice
- "relatedNodeLabel": le label du nœud concerné

Selon le type, ajoute :
- open_question / reverse_explanation : "referenceAnswer" (réponse détaillée attendue)
- flashcard : "answer" (réponse courte)
- code_challenge : "language", "referenceCode" (solution de référence)
- mcq : "options" (4 strings), "correct_answer" (0-3), "explanation"

Les exercices doivent couvrir le nœud principal ET ses voisins quand depth > 0.`,
    user: `Génère exactement ${count} exercices sur '${node.label}' (${node.category}).
Profondeur du graphe : ${depth}.

Types demandés :
- ${typeList}

Contenu du nœud principal :
${node.markdown_body || '(pas de contenu)'}${neighborsContext}

Retourne le JSON brut uniquement :
[{"type":"...","question":"...","relatedNodeId":"${node.id}","relatedNodeLabel":"${node.label}", ...}]`,
  };
};

// ---------------------------------------------------------------------------
// Correction prompt (for evaluating user answers)
// ---------------------------------------------------------------------------
export const buildCorrectionPrompt = (exercise, userAnswer, action) => {
  const actionInstructions = {
    evaluate: `Évalue la réponse de l'apprenant. Indique ce qui est correct, ce qui manque, et donne une note sur 10.`,
    explain: `Explique en détail le concept abordé par cette question. Sois pédagogique et structuré.`,
    simplify: `Simplifie l'explication de ce concept au maximum. Utilise des analogies simples et du vocabulaire accessible.`,
    example: `Donne un ou plusieurs exemples concrets et pratiques pour illustrer ce concept.`,
  };

  return {
    system: `Tu es un tuteur IT bienveillant. Tu aides l'apprenant à comprendre ses erreurs et à progresser. Réponds en français, en Markdown.`,
    user: `Exercice (${exercise.type}) :
${exercise.question}

${exercise.referenceAnswer ? `Réponse attendue : ${exercise.referenceAnswer}` : ''}
${exercise.answer ? `Réponse attendue : ${exercise.answer}` : ''}
${exercise.referenceCode ? `Code attendu :\n\`\`\`${exercise.language || ''}\n${exercise.referenceCode}\n\`\`\`` : ''}
${exercise.correct_answer !== undefined ? `Réponse correcte : ${exercise.options[exercise.correct_answer]}` : ''}

Réponse de l'apprenant :
${userAnswer}

${actionInstructions[action] || actionInstructions.evaluate}`,
  };
};

// ---------------------------------------------------------------------------
// parseExerciseResponse — validates AI exercise output
// ---------------------------------------------------------------------------
export const parseExerciseResponse = (raw) => {
  const cleaned = raw
    .replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();

  let parsed;
  try { parsed = JSON.parse(cleaned); } catch (e) {
    throw new Error('Invalid JSON: ' + e.message);
  }
  if (!Array.isArray(parsed)) throw new Error('Not an array');

  const VALID_TYPES = ['open_question', 'flashcard', 'code_challenge', 'reverse_explanation', 'mcq'];

  parsed.forEach((ex, i) => {
    if (!VALID_TYPES.includes(ex.type))
      throw new Error(`Ex${i}: invalid type '${ex.type}'`);
    if (typeof ex.question !== 'string' || !ex.question.trim())
      throw new Error(`Ex${i}: missing question`);

    if (ex.type === 'mcq') {
      if (!Array.isArray(ex.options) || ex.options.length !== 4)
        throw new Error(`Ex${i}: MCQ needs 4 options`);
      if (typeof ex.correct_answer !== 'number' || ex.correct_answer < 0 || ex.correct_answer > 3)
        throw new Error(`Ex${i}: correct_answer must be 0–3`);
    }
  });

  return parsed;
};

// ---------------------------------------------------------------------------
// parseQuizResponse — validates AI output, throws on bad schema
// ---------------------------------------------------------------------------
export const parseQuizResponse = (raw) => {
  const cleaned = raw
    .replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();

  let parsed;
  try { parsed = JSON.parse(cleaned); } catch (e) {
    throw new Error('Invalid JSON: ' + e.message);
  }
  if (!Array.isArray(parsed)) throw new Error('Not an array');

  parsed.forEach((q, i) => {
    if (typeof q.question !== 'string' || !q.question.trim())
      throw new Error(`Q${i}: missing question`);
    if (!Array.isArray(q.options) || q.options.length !== 4)
      throw new Error(`Q${i}: need exactly 4 options`);
    if (typeof q.correct_answer !== 'number' || q.correct_answer < 0 || q.correct_answer > 3)
      throw new Error(`Q${i}: correct_answer must be 0–3`);
    if (typeof q.explanation !== 'string')
      throw new Error(`Q${i}: missing explanation`);
  });

  return parsed;
};
