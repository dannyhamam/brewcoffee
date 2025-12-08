import { useState, useRef, useCallback, useEffect } from "react";

export interface UseSoundOptions {
  ambientSrc?: string;
  dingSrc?: string;
  ambientVolume?: number;
  dingVolume?: number;
}

export interface UseSoundReturn {
  isPlaying: boolean;
  toggle: () => void;
  playDing: () => void;
}

const DEFAULT_AMBIENT = "/cafe_sounds.mp3";
const DEFAULT_DING = "/ding.mp3";

export function useSound(options: UseSoundOptions = {}): UseSoundReturn {
  const {
    ambientSrc = DEFAULT_AMBIENT,
    dingSrc = DEFAULT_DING,
    ambientVolume = 1.0,
    dingVolume = 0.5,
  } = options;

  const [isPlaying, setIsPlaying] = useState(false);
  const ambientRef = useRef<HTMLAudioElement | null>(null);
  const dingRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio elements
  useEffect(() => {
    ambientRef.current = new Audio(ambientSrc);
    ambientRef.current.loop = true;
    ambientRef.current.volume = ambientVolume;

    dingRef.current = new Audio(dingSrc);
    dingRef.current.volume = dingVolume;

    return () => {
      if (ambientRef.current) {
        ambientRef.current.pause();
        ambientRef.current = null;
      }
      if (dingRef.current) {
        dingRef.current = null;
      }
    };
  }, [ambientSrc, dingSrc, ambientVolume, dingVolume]);

  const toggle = useCallback(() => {
    if (!ambientRef.current) return;

    if (isPlaying) {
      ambientRef.current.pause();
      setIsPlaying(false);
    } else {
      ambientRef.current.play().catch((e) => {
        console.log("Audio play prevented:", e);
      });
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const playDing = useCallback(() => {
    if (!dingRef.current) return;
    dingRef.current.currentTime = 0;
    dingRef.current.play().catch((e) => {
      console.log("Ding play prevented:", e);
    });
  }, []);

  return {
    isPlaying,
    toggle,
    playDing,
  };
}
