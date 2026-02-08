import { useState, useRef, useCallback, useEffect } from "react";

export interface UseSoundOptions {
  ambientSrc?: string;
  dingSrc?: string;
  ambientVolume?: number;
  dingVolume?: number;
}

export interface UseSoundReturn {
  isPlaying: boolean;
  volume: number;
  toggle: () => void;
  setVolume: (v: number) => void;
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
  const [volume, setVolumeState] = useState(ambientVolume);
  const ambientRef = useRef<HTMLAudioElement | null>(null);
  const dingRef = useRef<HTMLAudioElement | null>(null);
  const prevVolumeRef = useRef(ambientVolume);

  // Initialize audio elements
  useEffect(() => {
    ambientRef.current = new Audio(ambientSrc);
    ambientRef.current.loop = true;
    ambientRef.current.volume = volume;

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
  }, [ambientSrc, dingSrc, dingVolume]);

  /** Update volume and auto-pause/resume when slider hits 0 or leaves 0. */
  const setVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setVolumeState(clamped);
    if (ambientRef.current) {
      ambientRef.current.volume = clamped;
    }

    if (clamped === 0 && isPlaying) {
      ambientRef.current?.pause();
      setIsPlaying(false);
    } else if (clamped > 0 && !isPlaying) {
      ambientRef.current?.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [isPlaying]);

  /** Toggle mute: saves/restores previous volume. */
  const toggle = useCallback(() => {
    if (!ambientRef.current) return;

    if (isPlaying) {
      prevVolumeRef.current = volume || prevVolumeRef.current;
      ambientRef.current.pause();
      setIsPlaying(false);
      setVolumeState(0);
      ambientRef.current.volume = 0;
    } else {
      const restored = prevVolumeRef.current > 0 ? prevVolumeRef.current : 0.5;
      setVolumeState(restored);
      ambientRef.current.volume = restored;
      ambientRef.current.play().catch((e) => {
        console.log("Audio play prevented:", e);
      });
      setIsPlaying(true);
    }
  }, [isPlaying, volume]);

  const playDing = useCallback(() => {
    if (!dingRef.current) return;
    dingRef.current.currentTime = 0;
    dingRef.current.play().catch((e) => {
      console.log("Ding play prevented:", e);
    });
  }, []);

  return {
    isPlaying,
    volume,
    toggle,
    setVolume,
    playDing,
  };
}
