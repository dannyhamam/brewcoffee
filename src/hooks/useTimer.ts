import { useState, useEffect, useCallback, useRef } from "react";

export interface TimerState {
  remainingSeconds: number;
  totalSeconds: number;
  progress: number; // 0 to 1
  isRunning: boolean;
  isComplete: boolean;
}

export interface TimerActions {
  start: () => void;
  pause: () => void;
  reset: () => void;
  setDuration: (minutes: number) => void;
}

export type UseTimerReturn = TimerState & TimerActions;

export function useTimer(initialMinutes: number = 25): UseTimerReturn {
  const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60);
  const [remainingSeconds, setRemainingSeconds] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Calculate progress (0 = empty, 1 = full)
  const progress = totalSeconds > 0 ? 1 - remainingSeconds / totalSeconds : 0;

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Timer tick logic
  useEffect(() => {
    if (isRunning && remainingSeconds > 0) {
      intervalRef.current = window.setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsComplete(true);
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const start = useCallback(() => {
    if (remainingSeconds > 0) {
      setIsRunning(true);
      setIsComplete(false);
    }
  }, [remainingSeconds]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setIsComplete(false);
    setRemainingSeconds(totalSeconds);
  }, [totalSeconds]);

  const setDuration = useCallback((minutes: number) => {
    const clampedMinutes = Math.max(1, Math.min(240, minutes));
    const newTotal = clampedMinutes * 60;
    setTotalSeconds(newTotal);
    setRemainingSeconds(newTotal);
    setIsComplete(false);
  }, []);

  return {
    remainingSeconds,
    totalSeconds,
    progress,
    isRunning,
    isComplete,
    start,
    pause,
    reset,
    setDuration,
  };
}
