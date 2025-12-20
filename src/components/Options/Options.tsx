import { useEffect, useState, useCallback } from "react";
import { Button } from "../shared";
import { SoundToggle } from "./SoundToggle";

interface OptionsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  isSoundPlaying: boolean;
  onSoundToggle: () => void;
}

export function Options({
  isRunning,
  onStart,
  onPause,
  onReset,
  isSoundPlaying,
  onSoundToggle,
}: OptionsProps) {
  return (
    <div
      className={`fixed bottom-10 left-1/2 -translate-x-1/2 
        flex items-center gap-4 px-6 py-3 rounded-full 
        bg-coffee-dark/60 backdrop-blur-md border border-white/10 shadow-2xl z-50 
        transition-opacity duration-500 ease-in-out`}
    >
      {/* Play/Pause Button */}
      <Button
        onClick={isRunning ? onPause : onStart}
        displayText=""
        symbol={isRunning ? "⏸" : "▶"}
        additionalClassNames={`w-12 h-12 !min-w-0 rounded-full flex items-center justify-center p-0
          ${
            isRunning
              ? "bg-warm-amber text-coffee-dark hover:bg-warm-glow"
              : "bg-coffee-medium text-cream hover:bg-coffee-light"
          }`}
      />

      {/* Reset Button */}
      <Button
        onClick={onReset}
        displayText=""
        symbol="↺"
        additionalClassNames="w-12 h-12 !min-w-0 rounded-full flex items-center justify-center p-0
          bg-transparent text-cream/80 border-2 border-cream/20
          hover:bg-cream/10 hover:text-cream hover:border-cream/40"
      />

      {/* Divider */}
      <div className="w-px h-8 bg-white/20 mx-1" />

      {/* Sound Toggle */}
      <SoundToggle isPlaying={isSoundPlaying} onToggle={onSoundToggle} />
    </div>
  );
}
