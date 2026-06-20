import { MECHANICAL_SHAPES } from '../cards/MechanicalCards';
import { SHARK_SHAPES } from '../cards/SharkCards';

/* ═══════════════════════════════════════════════════════════════════════════
   GameOverScreen — Results / Completion
   Gallery-like showcase of completed Gestalt shapes
   ═══════════════════════════════════════════════════════════════════════════ */

const PAIR_COLORS = [
  '#2a9d8f', '#e9c46a', '#e76f51', '#264653',
  '#f4a261', '#7c3aed', '#2a9d8f', '#e9c46a',
];

export default function GameOverScreen({ results, onRestart, onBack }) {
  const shapes = results.config.deck === 'mechanical' ? MECHANICAL_SHAPES : SHARK_SHAPES;

  const formatTime = (elapsed) => {
    const m = Math.floor(elapsed / 60);
    const s = elapsed % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const displayTime = results.config.timedMode
    ? results.time
    : formatTime(results.elapsed);

  return (
    <div className="gameover-screen">
      {/* Blurred background grid */}
      <div className="gameover-bg" style={{ gridTemplateColumns: `repeat(6, 60px)` }}>
        {Array.from({ length: 36 }).map((_, i) => (
          <div key={i} className="gameover-bg__cell" />
        ))}
      </div>

      {/* Dark overlay */}
      <div className="gameover-overlay" />

      {/* Modal */}
      <div className="gameover-modal">
        <div className="gameover-card" id="gameover-modal">

          {/* Header */}
          <div className="gameover-card__header">
            <div className="gameover-card__header-left">
              <div className="gameover-card__header-dot" />
              <span className="gameover-card__header-text">
                Session Complete
              </span>
            </div>
          </div>

          <div className="gameover-card__body">

            {/* Title Area */}
            <div className="gameover-title-area">
              <div>
                <div className="gameover-tag">
                  {`${results.config.gridSize} ${results.config.deck} deck`}
                </div>
                <h2 className="gameover-title">
                  {results.won ? (
                    <>Session<br /><span>Complete</span></>
                  ) : (
                    <>Time's<br /><span style={{ color: 'var(--accent-danger)' }}>Up</span></>
                  )}
                </h2>
              </div>

              {results.won && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', marginLeft: '16px', flexShrink: 0 }}>
                  <div className="gameover-badge">
                    ★ Well Done
                  </div>
                </div>
              )}
            </div>

            {/* Completed shapes gallery */}
            {results.won && (
              <div className="gallery-grid">
                {shapes.slice(0, Math.min(shapes.length, 8)).map((shape, i) => {
                  const Complete = shape.Complete;
                  return (
                    <div
                      key={shape.name}
                      className="gallery-item"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <Complete color={PAIR_COLORS[i % PAIR_COLORS.length]} />
                    </div>
                  );
                })}
              </div>
            )}

            {/* Big stat: Time */}
            <div className="gameover-big-stat">
              <div className="gameover-big-stat__label">
                {results.config.timedMode ? 'Remaining Time' : 'Time Taken'}
              </div>
              <div className="gameover-big-stat__value">
                {displayTime}
              </div>
            </div>

            {/* Stats grid */}
            <div className="gameover-stats">
              <div className="gameover-stats__item">
                <div className="gameover-stats__value">{results.matches}/{results.totalPairs}</div>
                <div className="gameover-stats__label">
                  Pairs
                </div>
              </div>
              <div className="gameover-stats__item">
                <div className="gameover-stats__value">{results.moves}</div>
                <div className="gameover-stats__label">
                  Moves
                </div>
              </div>
              <div className="gameover-stats__item">
                <div className="gameover-stats__value">{results.accuracy}%</div>
                <div className="gameover-stats__label">
                  Accuracy
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="gameover-actions">
              <button className="gameover-btn gameover-btn--primary" onClick={onRestart} id="restart-button">
                Play Again
              </button>
              <button className="gameover-btn gameover-btn--secondary" onClick={onBack} id="back-button">
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
