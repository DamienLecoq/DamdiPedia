import { useAiStore } from '../stores/aiStore.js';

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

function OptionButton({ label, text, index, correctIndex, chosenIndex, disabled, onClick }) {
  let bg = 'var(--surface2)';
  let border = 'var(--border)';
  let color = 'var(--text)';

  if (chosenIndex !== null) {
    if (index === correctIndex) {
      bg = 'rgba(0,229,160,0.12)'; border = 'var(--success)'; color = 'var(--success)';
    } else if (index === chosenIndex) {
      bg = 'rgba(255,82,82,0.12)'; border = 'var(--danger)'; color = 'var(--danger)';
    }
  }

  return (
    <button
      onClick={() => !disabled && onClick(index)}
      disabled={disabled}
      style={{
        width: '100%', textAlign: 'left', padding: '0.5rem 0.75rem',
        marginBottom: 6, borderRadius: 6, fontSize: '0.83rem',
        background: bg, border: `1px solid ${border}`, color,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background 0.1s',
      }}
    >
      <span style={{ fontWeight: 600, marginRight: 8 }}>{label}.</span>{text}
    </button>
  );
}

function ScoreScreen({ quizState, onFinish, onDiscard, loading }) {
  const { questions, answers, score } = quizState;
  const correct = answers.filter((a, i) => a === questions[i].correct_answer).length;
  const pct = Math.round(score * 100);

  return (
    <div>
      <div style={{
        textAlign: 'center', padding: '1rem 0',
        borderBottom: '1px solid var(--border)', marginBottom: '0.75rem',
      }}>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: pct >= 80 ? 'var(--success)' : pct >= 60 ? 'var(--warning)' : 'var(--danger)' }}>
          {correct}/{questions.length}
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>
          {pct}% correct
        </div>
      </div>

      <div style={{ maxHeight: 280, overflowY: 'auto', marginBottom: '0.75rem' }}>
        {questions.map((q, qi) => {
          const chosen = answers[qi];
          const isCorrect = chosen === q.correct_answer;
          return (
            <div key={qi} style={{
              marginBottom: '0.6rem', padding: '0.5rem 0.65rem',
              background: 'var(--bg)', borderRadius: 6,
              border: `1px solid ${isCorrect ? 'rgba(0,229,160,0.3)' : 'rgba(255,82,82,0.3)'}`,
              fontSize: '0.78rem',
            }}>
              <div style={{ fontWeight: 500, marginBottom: 4, color: 'var(--text)' }}>
                {isCorrect ? '✓' : '✗'} Q{qi + 1} : {q.question}
              </div>
              {!isCorrect && (
                <div style={{ color: 'var(--text-muted)' }}>
                  Réponse : <span style={{ color: 'var(--success)' }}>{OPTION_LABELS[q.correct_answer]}. {q.options[q.correct_answer]}</span>
                </div>
              )}
              <div style={{ color: 'var(--text-muted)', marginTop: 2, fontStyle: 'italic' }}>
                {q.explanation}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn-primary" style={{ flex: 1, fontSize: '0.82rem' }}
          onClick={onFinish} disabled={loading}>
          {loading ? 'Enregistrement…' : 'Enregistrer et fermer'}
        </button>
        <button className="btn-secondary" style={{ fontSize: '0.82rem' }}
          onClick={onDiscard} disabled={loading}>
          Annuler
        </button>
      </div>
    </div>
  );
}

export default function QuizPanel({ onClose }) {
  const quizState      = useAiStore(s => s.quizState);
  const loading        = useAiStore(s => s.loading);
  const error          = useAiStore(s => s.error);
  const submitAnswer   = useAiStore(s => s.submitAnswer);
  const advanceQuestion = useAiStore(s => s.advanceQuestion);
  const completeQuiz   = useAiStore(s => s.completeQuiz);
  const finishQuiz     = useAiStore(s => s.finishQuiz);
  const resetQuiz      = useAiStore(s => s.resetQuiz);
  const clearError     = useAiStore(s => s.clearError);

  if (loading && !quizState) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 0', color: 'var(--text-muted)', fontSize: '0.83rem' }}>
        <div className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
        Génération du quiz…
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ background: 'var(--bg)', border: '1px solid var(--danger)', borderRadius: 6, padding: '0.65rem 0.75rem', fontSize: '0.8rem' }}>
        <div style={{ color: 'var(--danger)', marginBottom: '0.5rem' }}>{error}</div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.2rem 0.55rem' }}
            onClick={() => { clearError(); onClose?.(); }}>
            Fermer
          </button>
        </div>
      </div>
    );
  }

  if (!quizState) return null;

  const { questions, currentIndex, answers, completed } = quizState;

  if (completed) {
    return (
      <ScoreScreen
        quizState={quizState}
        onFinish={finishQuiz}
        onDiscard={() => { resetQuiz(); onClose?.(); }}
        loading={loading}
      />
    );
  }

  const current = questions[currentIndex];
  const currentAnswer = answers[currentIndex];
  const isAnswered = currentAnswer !== null;
  const isLast = currentIndex === questions.length - 1;

  return (
    <div>
      {/* Progression */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Question {currentIndex + 1} / {questions.length}
        </span>
        <div style={{ height: 3, flex: 1, marginLeft: 12, background: 'var(--border)', borderRadius: 2 }}>
          <div style={{
            height: '100%', borderRadius: 2, background: 'var(--accent)',
            width: `${((currentIndex + (isAnswered ? 1 : 0)) / questions.length) * 100}%`,
            transition: 'width 0.2s',
            boxShadow: 'var(--glow-violet)',
          }} />
        </div>
      </div>

      {/* Question */}
      <p style={{ fontSize: '0.88rem', color: 'var(--text)', marginBottom: '0.75rem', lineHeight: 1.5 }}>
        {current.question}
      </p>

      {/* Options */}
      <div>
        {current.options.map((opt, i) => (
          <OptionButton
            key={i}
            label={OPTION_LABELS[i]}
            text={opt}
            index={i}
            correctIndex={isAnswered ? current.correct_answer : null}
            chosenIndex={isAnswered ? currentAnswer : null}
            disabled={isAnswered}
            onClick={submitAnswer}
          />
        ))}
      </div>

      {/* Explication + navigation */}
      {isAnswered && (
        <div style={{ marginTop: '0.5rem' }}>
          <div style={{
            background: 'var(--bg)', border: '1px solid var(--border)',
            borderRadius: 6, padding: '0.5rem 0.65rem',
            fontSize: '0.78rem', color: 'var(--text-muted)',
            marginBottom: '0.5rem', fontStyle: 'italic',
          }}>
            {current.explanation}
          </div>
          {!isLast ? (
            <button className="btn-primary" style={{ width: '100%', fontSize: '0.82rem' }}
              onClick={advanceQuestion}>
              Suivant →
            </button>
          ) : (
            <button className="btn-primary" style={{ width: '100%', fontSize: '0.82rem' }}
              onClick={completeQuiz}>
              Terminer le quiz →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
