import { useState } from 'react';
import TopBar from '../components/TopBar';

/* ═══════════════════════════════════════════════════════════════════════════
   SetupScreen — Game configuration screen
   ═══════════════════════════════════════════════════════════════════════════ */

const GRID_OPTIONS = [
  { value: '4x4', label: '4×4', pairs: 8 },
  { value: '5x5', label: '5×5', pairs: 12 },
  { value: '6x6', label: '6×6', pairs: 18 },
];

const DECK_OPTIONS = [
  { value: 'mechanical', label: 'Mechanical Parts', description: 'Industrial gears, bolts, circuits' },
  { value: 'shark', label: 'Shark Silhouettes', description: 'Marine life & nautical shapes' },
];

const DIFFICULTY_OPTIONS = [
  { value: 'standard', label: 'Standard', timeout: '2.0s' },
  { value: 'advanced', label: 'Advanced', timeout: '1.2s' },
  { value: 'expert', label: 'Expert', timeout: '0.8s' },
];

const TIMER_DURATIONS = {
  '4x4': { standard: 180, advanced: 120, expert: 90 },
  '5x5': { standard: 240, advanced: 180, expert: 120 },
  '6x6': { standard: 300, advanced: 240, expert: 180 },
};

export default function SetupScreen({ onStart }) {
  const [gridSize, setGridSize] = useState('4x4');
  const [deck, setDeck] = useState('shark');
  const [difficulty, setDifficulty] = useState('standard');
  const [timedMode, setTimedMode] = useState(false);

  const selectedGrid = GRID_OPTIONS.find(g => g.value === gridSize);
  const selectedDiff = DIFFICULTY_OPTIONS.find(d => d.value === difficulty);
  const timerDuration = TIMER_DURATIONS[gridSize]?.[difficulty] || 180;

  const handleStart = () => {
    onStart({
      gridSize,
      deck,
      difficulty,
      timedMode,
      timerDuration,
      flipTimeout: difficulty === 'expert' ? 800 : difficulty === 'advanced' ? 1200 : 2000,
    });
  };

  return (
    <div className="setup-screen">
      <TopBar />

      <main className="setup-content">
        <div className="setup-container">

          {/* Header */}
          <div className="setup-header">
            <div className="setup-header__tag">
              Welcome to
            </div>
            <h1 className="setup-header__title">
              Steel<span> Shark</span>
            </h1>
            <div className="setup-header__subtitle">
              A visual memory game of complementary halves
            </div>
          </div>

          {/* Config Panel */}
          <div className="config-panel" id="config-panel">
            <div className="config-panel__header">
              <div className="config-panel__header-dot" />
              <span className="config-panel__header-text">
                Game Settings
              </span>
            </div>

            <div className="config-panel__body">

              {/* Grid Size */}
              <div className="config-row">
                <div className="config-row__header">
                  <label className="config-row__label" id="grid-label">
                    Grid Size
                  </label>
                  <span className="config-row__info">
                    {selectedGrid?.label} — {selectedGrid?.pairs} PAIRS
                  </span>
                </div>
                <div className="seg-buttons" role="radiogroup" aria-labelledby="grid-label">
                  {GRID_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      className={`seg-button ${gridSize === opt.value ? 'seg-button--active' : ''}`}
                      onClick={() => setGridSize(opt.value)}
                      role="radio"
                      aria-checked={gridSize === opt.value}
                      id={`grid-${opt.value}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div className="config-row">
                <div className="config-row__header">
                  <label className="config-row__label" id="difficulty-label">
                    Difficulty
                  </label>
                  <span className="config-row__info" style={{ color: difficulty === 'expert' ? 'var(--accent-danger)' : undefined }}>
                    Flip delay: {selectedDiff?.timeout}
                  </span>
                </div>
                <div className="seg-buttons" role="radiogroup" aria-labelledby="difficulty-label">
                  {DIFFICULTY_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      className={`seg-button ${difficulty === opt.value ? 'seg-button--active' : ''} ${opt.value === 'expert' ? 'seg-button--danger' : ''}`}
                      onClick={() => setDifficulty(opt.value)}
                      role="radio"
                      aria-checked={difficulty === opt.value}
                      id={`difficulty-${opt.value}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Card Deck */}
              <div className="config-row">
                <div className="config-row__header">
                  <label className="config-row__label" id="deck-label">
                    Card Theme
                  </label>
                </div>
                <div className="seg-buttons" role="radiogroup" aria-labelledby="deck-label">
                  {DECK_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      className={`seg-button ${deck === opt.value ? 'seg-button--active' : ''}`}
                      onClick={() => setDeck(opt.value)}
                      role="radio"
                      aria-checked={deck === opt.value}
                      id={`deck-${opt.value}`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timer Mode */}
              <div className="config-row">
                <div className="config-row__header">
                  <label className="config-row__label" id="timer-label">
                    Timer
                  </label>
                  <span className="config-row__info">
                    {timedMode
                      ? `${Math.floor(timerDuration / 60)} min countdown`
                      : 'Relaxed — No pressure'}
                  </span>
                </div>
                <div className="timer-toggle">
                  <button
                    className={`timer-toggle__switch ${timedMode ? 'timer-toggle__switch--active' : ''}`}
                    onClick={() => setTimedMode(!timedMode)}
                    role="switch"
                    aria-checked={timedMode}
                    aria-labelledby="timer-label"
                    id="timer-toggle-switch"
                  >
                    <div className="timer-toggle__switch-knob" />
                  </button>
                  <span className="timer-toggle__label">
                    {timedMode ? 'Timed' : 'Relaxed'}
                  </span>
                </div>
              </div>

              {/* Stats Row */}
              <div className="stats-row">
                {[
                  { label: 'Best Time', value: '1:42' },
                  { label: 'Played', value: '24' },
                  { label: 'Win Rate', value: '84%' },
                ].map(stat => (
                  <div key={stat.label} className="stats-row__item">
                    <div className="stats-row__value">{stat.value}</div>
                    <div className="stats-row__label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Start Button */}
          <button className="start-button" onClick={handleStart} id="start-button">
            Begin Session
          </button>

          <div className="start-hint">
            Click to start your matching session
          </div>
        </div>
      </main>
    </div>
  );
}
