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
      className="bg-cream/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl 
                    border border-white/30 w-full max-w-sm space-y-5"
    >
      {/* Timer Buttons */}
      <div className="flex gap-3 flex-wrap justify-center">
        <Button
          onClick={onStart}
          disabled={isRunning}
          symbol="▶"
          displayText="Start"
          additionalClassNames="bg-gradient-to-br from-coffee-medium to-coffee-dark text-cream"
        />

        <Button
          onClick={onPause}
          disabled={!isRunning}
          symbol="⏸"
          displayText="Pause"
          additionalClassNames="bg-warm-amber text-coffee-dark hover:bg-warm-glow"
        />

        <Button
          onClick={onReset}
          symbol="↺"
          displayText="Reset"
          additionalClassNames="bg-transparent text-coffee-medium border-2 border-cream-dark
                     hover:bg-cream-dark hover:text-coffee-dark"
        />
      </div>

      {/* Sound Toggle */}
      <div className="flex justify-center">
        <SoundToggle isPlaying={isSoundPlaying} onToggle={onSoundToggle} />
      </div>
    </div>
  );
}
