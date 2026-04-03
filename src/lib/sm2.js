/**
 * SM-2 spaced repetition algorithm.
 * score: float 0.0–1.0 (correctCount / total)
 * Returns: { newEF, newInterval, nextReview (ISO date string) }
 *
 * Status rules:
 *   score < 0.6  → 'learning'
 *   0.6–0.8      → 'to_review'
 *   >= 0.8       → 'mastered'
 */
export function sm2(score, easeFactor, interval) {
  const ef = (typeof easeFactor === 'number' && !isNaN(easeFactor)) ? easeFactor : 2.5;
  const iv = (typeof interval === 'number' && !isNaN(interval) && interval > 0) ? interval : 1;

  const q = Math.round(score * 5); // convert 0–1 score to SM-2 quality 0–5
  const newEF = Math.max(
    1.3,
    parseFloat((ef + 0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)).toFixed(2))
  );

  const newInterval = q < 3 ? 1 : iv === 1 ? 6 : Math.round(iv * newEF);

  const next = new Date();
  next.setDate(next.getDate() + newInterval);

  return {
    newEF,
    newInterval,
    nextReview: next.toISOString().split('T')[0],
  };
}

export function scoreToStatus(score) {
  if (score < 0.6) return 'learning';
  if (score < 0.8) return 'to_review';
  return 'mastered';
}
