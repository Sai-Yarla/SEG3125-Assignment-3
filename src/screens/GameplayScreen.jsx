import { useEffect, useRef } from 'react';
import { useTheme } from '../ThemeContext';
import TopBar from '../components/TopBar';
import GameGrid from '../components/GameGrid';
import useGameState from '../hooks/useGameState';
import useTimer from '../hooks/useTimer';

/* ═══════════════════════════════════════════════════════════════════════════
   GameplayScreen — Active game session
   Manages the core flip → match/mismatch → win/loss loop
   ═══════════════════════════════════════════════════════════════════════════ */

export default function GameplayScreen({ config, onGameOver, onBack }) {
  const { theme } = useTheme();
  const game = useGameState();
  const flipTimeoutRef = useRef(null);

  const {
    cards, flippedCardIds, matches, moves, totalPairs,
    gameStatus, mismatchIds,
    initGame, flipCard, checkMatch, mismatchReset, timeUp, restart,
  } = game;

  // Initialize game on mount
  useEffect(() => {
    initGame(config);
  }, [config, initGame]);

  // Timer
  const timer = useTimer({
    mode: config.timedMode ? 'countdown' : 'stopwatch',
    duration: config.timerDuration,
    isRunning: gameStatus === 'playing',
    onTimeUp: timeUp,
  });

  // Check for match when two cards are flipped
  useEffect(() => {
    if (flippedCardIds.length === 2) {
      // Small delay for the player to see both cards
      const timeout = setTimeout(() => {
        checkMatch();
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [flippedCardIds, checkMatch]);

  // Handle mismatch reset after delay
  useEffect(() => {
    if (mismatchIds.length === 2) {
      flipTimeoutRef.current = setTimeout(() => {
        mismatchReset();
      }, config.flipTimeout || 1200);

      return () => {
        if (flipTimeoutRef.current) {
          clearTimeout(flipTimeoutRef.current);
        }
      };
    }
  }, [mismatchIds, mismatchReset, config.flipTimeout]);

  // Transition to game over when game ends
  useEffect(() => {
    if (gameStatus === 'won' || gameStatus === 'lost') {
      // Small delay to let the final match animation play
      const timeout = setTimeout(() => {
        onGameOver({
          won: gameStatus === 'won',
          time: timer.timeDisplay,
          elapsed: timer.elapsed,
          matches,
          moves,
          totalPairs,
          accuracy: moves > 0 ? Math.round((matches / moves) * 100) : 0,
          config,
        });
      }, gameStatus === 'won' ? 800 : 300);
      return () => clearTimeout(timeout);
    }
  }, [gameStatus, timer.timeDisplay, timer.elapsed, matches, moves, totalPairs, onGameOver, config]);

  const accuracy = moves > 0 ? Math.round((matches / moves) * 100) : 100;
  const isDisabled = gameStatus !== 'playing' || mismatchIds.length > 0;

  return (
    <div className="gameplay-screen">
      <TopBar />

      {/* HUD Bar */}
      <div className="hud-bar" id="hud-bar">
        <div className="hud-bar__left">
          <div className="hud-bar__stat">
            <span>{theme === 'dark' ? 'MODE:' : 'Grid:'}</span>
            <span className="hud-bar__stat-value">
              {config.gridSize.toUpperCase()}
            </span>
          </div>
          <div className="hud-bar__stat">
            <span>{theme === 'dark' ? 'DECK:' : 'Theme:'}</span>
            <span className="hud-bar__stat-value">
              {config.deck === 'mechanical' ? (theme === 'dark' ? 'MECH' : 'Mechanical') : (theme === 'dark' ? 'SHARK' : 'Shark')}
            </span>
          </div>
          <div className="hud-bar__stat">
            <span>{theme === 'dark' ? 'M:' : 'Matches:'}</span>
            <span className="hud-bar__stat-value">{matches}/{totalPairs}</span>
          </div>
          <div className="hud-bar__stat">
            <span>{theme === 'dark' ? 'MOVES:' : 'Moves:'}</span>
            <span className="hud-bar__stat-value">{moves}</span>
          </div>
          <div className="hud-bar__stat">
            <span>{theme === 'dark' ? 'ACC:' : 'Accuracy:'}</span>
            <span className="hud-bar__stat-value">{accuracy}%</span>
          </div>
        </div>

        <div className="hud-bar__right">
          {/* Timer */}
          {config.timedMode ? (
            <div className={`hud-bar__timer ${timer.isUrgent ? 'hud-bar__timer--urgent' : ''}`} id="timer-display">
              {timer.timeDisplay}
            </div>
          ) : (
            <div className="hud-bar__timer hud-bar__timer--relaxed" id="timer-display">
              {timer.timeDisplay}
            </div>
          )}

          <button
            className="hud-bar__button"
            onClick={onBack}
            id="quit-button"
          >
            {theme === 'dark' ? 'END RACE →' : 'Quit'}
          </button>
        </div>
      </div>

      {/* Game Grid */}
      <GameGrid
        cards={cards}
        gridSize={config.gridSize}
        deck={config.deck}
        mismatchIds={mismatchIds}
        onCardClick={flipCard}
        disabled={isDisabled}
      />
    </div>
  );
}
