import { useState, useEffect, useRef, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════════════════════
   useTimer — Countdown or Stopwatch timer
   ═══════════════════════════════════════════════════════════════════════════ */

export default function useTimer({ mode = 'countdown', duration = 180, isRunning = false, onTimeUp }) {
  // elapsed in seconds
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);
  const onTimeUpRef = useRef(onTimeUp);

  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  // Reset when duration or mode changes
  useEffect(() => {
    setElapsed(0);
  }, [duration, mode]);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setElapsed(prev => {
        const next = prev + 1;

        if (mode === 'countdown' && next >= duration) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          if (onTimeUpRef.current) onTimeUpRef.current();
          return duration;
        }

        return next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, mode, duration]);

  const reset = useCallback(() => {
    setElapsed(0);
  }, []);

  // Compute display values
  const remaining = mode === 'countdown' ? Math.max(0, duration - elapsed) : elapsed;
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const timeDisplay = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const isUrgent = mode === 'countdown' && remaining <= 30 && remaining > 0;
  const isExpired = mode === 'countdown' && remaining <= 0;

  return {
    timeDisplay,
    elapsed,
    remaining,
    isUrgent,
    isExpired,
    reset,
  };
}
