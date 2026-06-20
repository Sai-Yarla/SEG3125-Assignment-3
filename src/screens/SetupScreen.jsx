import { useState } from 'react';
import { motion } from 'motion/react';
import OptionCarousel from '../components/OptionCarousel';

/* ═══════════════════════════════════════════════════════════════════════════
   SetupScreen — Game configuration screen with Figma UI
   ═══════════════════════════════════════════════════════════════════════════ */

const GRID_OPTIONS = [
  { id: '4x4', label: '4×4 Grid', sub: '8 Pairs · Beginner', photo: 'photo-1505118380757-91f5f5632de0?w=700&h=400&fit=crop&auto=format' },
  { id: '5x5', label: '5×5 Grid', sub: '12 Pairs · Intermediate', photo: 'photo-1518020382113-a7e8fc38eac9?w=700&h=400&fit=crop&auto=format' },
  { id: '6x6', label: '6×6 Grid', sub: '18 Pairs · Expert', photo: 'photo-1550684848-fac1c5b4e853?w=700&h=400&fit=crop&auto=format' },
];

const DECK_OPTIONS = [
  { id: 'shark', label: 'Shark Silhouettes', sub: 'Apex Predator Forms', photo: 'photo-1560275619-4cc5fa59d3ae?w=700&h=400&fit=crop&auto=format' },
  { id: 'mechanical', label: 'Mechanical Parts', sub: 'Industrial Gears & Circuits', photo: 'photo-1581091226825-a6a2a5aee158?w=700&h=400&fit=crop&auto=format' },
];

const DIFFICULTY_OPTIONS = [
  { id: 'standard', label: 'Standard', sub: '2.0s Flip Delay', photo: 'photo-1506477331477-33d5d8b3dc85?w=700&h=400&fit=crop&auto=format' },
  { id: 'advanced', label: 'Advanced', sub: '1.2s Flip Delay', photo: 'photo-1454496522488-7a8e488e8606?w=700&h=400&fit=crop&auto=format' },
  { id: 'expert', label: 'Expert', sub: '0.8s Flip Delay', photo: 'photo-1518837695005-2083093ee35b?w=700&h=400&fit=crop&auto=format' },
];

const TIMER_OPTIONS = [
  { id: 'relaxed', label: 'Relaxed Mode', sub: 'No timer · No pressure', photo: 'photo-1499810631641-541e76d678a2?w=700&h=400&fit=crop&auto=format' },
  { id: 'timed', label: 'Timed Mode', sub: 'Race against the clock', photo: 'photo-1501139083538-0139583c060f?w=700&h=400&fit=crop&auto=format' },
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
  const [timerMode, setTimerMode] = useState('relaxed');

  const handleStart = () => {
    const timedMode = timerMode === 'timed';
    const timerDuration = TIMER_DURATIONS[gridSize]?.[difficulty] || 180;
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-background flex flex-col pb-10"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Wordmark */}
      <div className="shrink-0 pt-14 pb-8 px-6 text-center">
        <p className="text-[10px] tracking-[0.32em] uppercase text-muted-foreground mb-3">
          Memory · Gestalt
        </p>
        <h1
          className="text-foreground leading-none tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: "clamp(2.6rem, 9vw, 4rem)" }}
        >
          Steel Shark
        </h1>
        <p className="text-sm text-muted-foreground mt-2.5">Discover the form within</p>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-x-16 gap-y-10 px-6 max-w-3xl mx-auto w-full">
        {/* Grid Size */}
        <section>
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-[10px] tracking-[0.24em] uppercase text-muted-foreground">Grid Size</span>
            <span className="text-xs text-primary">{GRID_OPTIONS.find((t) => t.id === gridSize)?.label}</span>
          </div>
          <OptionCarousel items={GRID_OPTIONS} value={gridSize} onChange={setGridSize} />
          <div className="flex justify-center gap-1.5 mt-3">
            {GRID_OPTIONS.map((t) => (
              <button
                key={t.id}
                onClick={() => setGridSize(t.id)}
                className="rounded-full transition-all"
                style={{
                  width: t.id === gridSize ? 16 : 6,
                  height: 6,
                  background: t.id === gridSize ? "#4A7FA5" : "rgba(74,127,165,0.25)",
                }}
              />
            ))}
          </div>
        </section>

        {/* Theme / Deck */}
        <section>
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-[10px] tracking-[0.24em] uppercase text-muted-foreground">Theme</span>
            <span className="text-xs text-primary">{DECK_OPTIONS.find((t) => t.id === deck)?.label}</span>
          </div>
          <OptionCarousel items={DECK_OPTIONS} value={deck} onChange={setDeck} />
          <div className="flex justify-center gap-1.5 mt-3">
            {DECK_OPTIONS.map((t) => (
              <button
                key={t.id}
                onClick={() => setDeck(t.id)}
                className="rounded-full transition-all"
                style={{
                  width: t.id === deck ? 16 : 6,
                  height: 6,
                  background: t.id === deck ? "#4A7FA5" : "rgba(74,127,165,0.25)",
                }}
              />
            ))}
          </div>
        </section>

        {/* Difficulty */}
        <section>
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-[10px] tracking-[0.24em] uppercase text-muted-foreground">Difficulty</span>
            <span className="text-xs text-primary capitalize">{difficulty}</span>
          </div>
          <OptionCarousel items={DIFFICULTY_OPTIONS} value={difficulty} onChange={setDifficulty} />
          <div className="flex justify-center gap-1.5 mt-3">
            {DIFFICULTY_OPTIONS.map((t) => (
              <button
                key={t.id}
                onClick={() => setDifficulty(t.id)}
                className="rounded-full transition-all"
                style={{
                  width: t.id === difficulty ? 16 : 6,
                  height: 6,
                  background: t.id === difficulty ? "#4A7FA5" : "rgba(74,127,165,0.25)",
                }}
              />
            ))}
          </div>
        </section>

        {/* Timer Mode */}
        <section>
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-[10px] tracking-[0.24em] uppercase text-muted-foreground">Timer Mode</span>
            <span className="text-xs text-primary">{TIMER_OPTIONS.find((t) => t.id === timerMode)?.label}</span>
          </div>
          <OptionCarousel items={TIMER_OPTIONS} value={timerMode} onChange={setTimerMode} />
          <div className="flex justify-center gap-1.5 mt-3">
            {TIMER_OPTIONS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTimerMode(t.id)}
                className="rounded-full transition-all"
                style={{
                  width: t.id === timerMode ? 16 : 6,
                  height: 6,
                  background: t.id === timerMode ? "#4A7FA5" : "rgba(74,127,165,0.25)",
                }}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Begin Journey */}
      <div className="shrink-0 pt-12 flex flex-col items-center gap-2">
        <motion.button
          onClick={handleStart}
          whileHover={{ y: -1.5 }}
          whileTap={{ scale: 0.97 }}
          className="text-foreground border-b border-foreground/20 pb-px hover:border-foreground/50 transition-colors"
          style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: "1.0625rem" }}
        >
          Begin Journey
        </motion.button>
        <p className="text-[11px] text-muted-foreground mt-1">
          {timerMode === 'timed' ? 'Race against the clock!' : 'No timer · No pressure · Take your time'}
        </p>
      </div>
    </motion.div>
  );
}
