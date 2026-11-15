// ==============================================================================
// ORIENT-GR - Hook personnalisé de gestion du chronomètre d'épreuve
// ==============================================================================

import { useState, useEffect, useCallback } from 'react';

export function useTimer({
  durationMinutes = 30,
  initialSeconds = 0,
  isPaused = false,
  onExpire = null
}) {
  const totalSeconds = durationMinutes * 60;
  const [elapsed, setElapsed] = useState(initialSeconds);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 1;
        if (next >= totalSeconds) {
          clearInterval(interval);
          if (onExpire) onExpire();
          return totalSeconds;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, totalSeconds, onExpire]);

  const remaining = Math.max(0, totalSeconds - elapsed);
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  const reset = useCallback(() => setElapsed(0), []);

  return {
    elapsed,
    remaining,
    minutes,
    seconds,
    isLowTime: remaining <= 300,
    isCritical: remaining <= 120,
    formatted: `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
    reset
  };
}
