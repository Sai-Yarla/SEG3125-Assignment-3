import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import GameGrid from '../components/GameGrid';
import useGameState from '../hooks/useGameState';
import useTimer from '../hooks/useTimer';

/* ═══════════════════════════════════════════════════════════════════════════
   GameplayScreen — Active game session (Figma UI version)
   ═══════════════════════════════════════════════════════════════════════════ */

export default function GameplayScreen({ config, onGameOver, onBack }) {
  const game = useGameState();
  const flipTimeoutRef = useRef(null);

  const {
    cards, flippedCardIds, matches, moves, totalPairs,
    gameStatus, mismatchIds,
    initGame, flipCard, checkMatch, mismatchReset, timeUp,
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

  const isDisabled = gameStatus !== 'playing' || mismatchIds.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background flex flex-col"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Header */}
      <div className="shrink-0 pt-10 pb-5 px-6 flex items-end justify-between max-w-3xl mx-auto w-full">
        <div>
          <p className="text-xs tracking-[0.28em] uppercase text-muted-foreground">Steel Shark</p>
          <p className="text-xl text-foreground mt-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
            Gestalt Match
          </p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={onBack}
              className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              Quit Game
            </button>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Pairs found</p>
          <p
            className="text-[2rem] text-foreground leading-none mt-1"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
          >
            {matches}
            <span className="text-lg text-muted-foreground"> / {totalPairs}</span>
          </p>
          <p className="text-xs uppercase tracking-wider text-muted-foreground mt-2" style={{ color: config.timedMode && timer.isUrgent ? 'var(--destructive)' : undefined }}>
            Time: {timer.timeDisplay}
          </p>
        </div>
      </div>

      {/* Pair progress bar */}
      <div className="px-6 max-w-3xl mx-auto w-full mb-6">
        <div className="h-1.5 bg-border rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary/40 rounded-full"
            animate={{ width: `${totalPairs > 0 ? (matches / totalPairs) * 100 : 0}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 flex items-center justify-center px-5 pb-4">
        <GameGrid
          cards={cards}
          gridSize={config.gridSize}
          deck={config.deck}
          mismatchIds={mismatchIds}
          onCardClick={flipCard}
          disabled={isDisabled}
        />
      </div>

      {/* Hint */}
      <p className="shrink-0 pb-8 text-center text-[11px] text-muted-foreground">
        Pair each {config.deck === 'mechanical' ? 'part' : 'shark'}&apos;s left and right halves
      </p>
    </motion.div>
  );
}
