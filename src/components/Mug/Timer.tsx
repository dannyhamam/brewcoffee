import { COLOR_SWITCH_PERCENTAGE } from "../../constants";

interface TimerProps {
  duration: number;
  onDurationChange: (minutes: number) => void;
  remainingSeconds: number;
  isRunning: boolean;
  progress?: number;
}

/**
 * Displays either the editable duration input (when idle) or the running countdown timer.
 *
 * Logic:
 * - If `isRunning` is true OR `progress > 0` (coffee is brewing/brewed), show countdown.
 * - Otherwise, show the duration input to let user set the time.
 */
export function Timer({
  duration,
  onDurationChange,
  remainingSeconds,
  isRunning,
  progress = 0,
}: TimerProps) {
  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      onDurationChange(Math.max(1, Math.min(240, value)));
    }
  };

  // Dynamic color: brown on empty mug, cream on filled mug (switch at configured percentage)
  const textColor =
    progress >= COLOR_SWITCH_PERCENTAGE ? "text-cream" : "text-coffee-medium";
  const borderColor =
    progress >= COLOR_SWITCH_PERCENTAGE
      ? "border-cream/50"
      : "border-coffee-medium/50";

  // Show countdown if running OR invalid duration (fallback) OR if mug has coffee
  const showCountdown = isRunning || progress > 0;

  if (showCountdown) {
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;

    const formatted = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    return (
      <div
        className={`font-serif text-3xl md:text-4xl font-bold tracking-wider 
                    text-center drop-shadow-md ${textColor}`}
        style={{ textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
      >
        {formatted}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <input
        type="number"
        min={1}
        max={240}
        value={duration}
        onChange={handleDurationChange}
        disabled={isRunning}
        className={`font-serif text-3xl md:text-4xl font-bold tracking-wider 
                   text-center bg-transparent outline-none w-16 md:w-20
                   border-b-2 ${borderColor} ${textColor}
                   disabled:opacity-50 disabled:cursor-not-allowed
                   [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none 
                   [&::-webkit-inner-spin-button]:appearance-none`}
        style={{ textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
      />
      <span
        className={`font-serif text-lg md:text-xl ${textColor} opacity-80`}
        style={{ textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
      >
        min
      </span>
    </div>
  );
}
