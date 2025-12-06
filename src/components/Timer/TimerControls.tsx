import { TimerButton } from "./TimerButton";

interface TimerControlsProps {
  duration: number;
  isRunning: boolean;
  onDurationChange: (minutes: number) => void;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export function TimerControls({
  duration,
  isRunning,
  onDurationChange,
  onStart,
  onPause,
  onReset,
}: TimerControlsProps) {
  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      onDurationChange(Math.max(1, Math.min(240, value)));
    }
  };

  return (
    <div
      className="bg-cream/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl 
                    border border-white/30 w-full max-w-sm space-y-5"
    >
      {/* Duration Input */}
      <div className="space-y-2">
        <label
          htmlFor="duration"
          className="block text-sm font-medium text-coffee-medium uppercase tracking-wide"
        >
          Focus Duration
        </label>
        <div
          className="flex items-center gap-3 bg-white rounded-xl px-4 py-3
                        border-2 border-transparent focus-within:border-coffee-light
                        transition-colors"
        >
          <input
            type="number"
            id="duration"
            min={1}
            max={240}
            value={duration}
            onChange={handleDurationChange}
            disabled={isRunning}
            className="text-2xl font-semibold text-coffee-dark w-20 bg-transparent
                       outline-none disabled:opacity-50
                       [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                       [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="text-sm text-coffee-medium">minutes</span>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap">
        <TimerButton
          onClick={onStart}
          disabled={isRunning}
          symbol="▶"
          displayText="Start"
          additionalClassNames="bg-gradient-to-br from-coffee-medium to-coffee-dark text-cream"
        />

        <TimerButton
          onClick={onPause}
          disabled={!isRunning}
          symbol="⏸"
          displayText="Pause"
          additionalClassNames="bg-warm-amber text-coffee-dark hover:bg-warm-glow"
        />

        <TimerButton
          onClick={onReset}
          symbol="↺"
          displayText="Reset"
          additionalClassNames="bg-transparent text-coffee-medium border-2 border-cream-dark
                     hover:bg-cream-dark hover:text-coffee-dark"
        />
      </div>
    </div>
  );
}
