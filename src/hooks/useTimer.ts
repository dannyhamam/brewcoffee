import { useState, useEffect, useCallback, useRef } from "react";
import { MAX_DURATION_IN_SECONDS } from "../constants";

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
  setDuration: (seconds: number) => void;
  addTime: (seconds: number) => void;
}

export type UseTimerReturn = TimerState & TimerActions;

export function useTimer(initialSeconds: number = 3600): UseTimerReturn {
  const [totalSeconds, setTotalSeconds] = useState(initialSeconds);
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds);
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

  const setDuration = useCallback((seconds: number) => {
    const clampedSeconds = Math.max(0, Math.min(MAX_DURATION_IN_SECONDS, seconds));
    setTotalSeconds(clampedSeconds);
    setRemainingSeconds(clampedSeconds);
    setIsComplete(false);
  }, []);

  const addTime = useCallback((seconds: number) => {
    if (!isRunning) {
      setTotalSeconds((prev) => {
        const newTotal = Math.min(MAX_DURATION_IN_SECONDS, prev + seconds); // Max 99:59:59
        setRemainingSeconds(newTotal);
        return newTotal;
      });
    }
  }, [isRunning]);

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
    addTime,
  };
}
