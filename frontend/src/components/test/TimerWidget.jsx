import React, { useEffect, useState } from 'react';
import { Clock, Pause, Play, AlertTriangle } from 'lucide-react';

export default function TimerWidget({
  durationMinutes = 35,
  initialElapsedSeconds = 0,
  onTimeUp = null,
  isPaused = false,
  allowPause = true,
  onTogglePause = null,
  onTick = null
}) {
  const totalSeconds = durationMinutes * 60;
  const [elapsed, setElapsed] = useState(initialElapsedSeconds);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 1;
        if (onTick) onTick(next);

        if (next >= totalSeconds) {
          clearInterval(timer);
          if (onTimeUp) onTimeUp();
          return totalSeconds;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused, totalSeconds, onTimeUp, onTick]);

  const remainingSeconds = Math.max(0, totalSeconds - elapsed);
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  const isLowTime = remainingSeconds <= 300; // < 5 min
  const isCriticalTime = remainingSeconds <= 120; // < 2 min

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return (
    <div
      className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border transition-all duration-300 font-mono text-sm font-semibold select-none ${
        isCriticalTime
          ? 'bg-red-50 text-red-700 border-red-300 ring-2 ring-red-400/40 animate-pulse'
          : isLowTime
          ? 'bg-amber-50 text-amber-700 border-amber-300 ring-2 ring-amber-400/30'
          : 'bg-white text-gendarmerie border-slateSubtle-200 shadow-sm'
      }`}
    >
      <Clock className={`w-4 h-4 ${isCriticalTime ? 'text-red-600' : isLowTime ? 'text-amber-600' : 'text-gold'}`} />
      
      <span className="tracking-wider">{formattedTime}</span>

      {allowPause && onTogglePause && (
        <button
          type="button"
          onClick={onTogglePause}
          className="ml-1 p-1 rounded-md text-slateSubtle-700 hover:text-gendarmerie hover:bg-cream-100 transition"
          title={isPaused ? "Reprendre l'épreuve" : "Mettre en pause"}
        >
          {isPaused ? <Play className="w-3.5 h-3.5 text-gendarmerie" /> : <Pause className="w-3.5 h-3.5" />}
        </button>
      )}
    </div>
  );
}
