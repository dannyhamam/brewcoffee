interface QuickAddButtonProps {
  timeToAdd: number;
  onAddTime: (seconds: number) => void;
  isRunning: boolean;
}

/** Renders a quick-add time pill for adding seconds to the timer. */
export function QuickAddButton({
  timeToAdd,
  onAddTime,
  isRunning,
}: QuickAddButtonProps) {
  const numMinutes = String(Math.floor(timeToAdd / 60)).padStart(2, "0");
  const numSeconds = String(timeToAdd % 60).padStart(2, "0");

  return (
    <button
      onClick={() => onAddTime(timeToAdd)}
      disabled={isRunning}
      className="px-3 py-1.5 rounded-full text-sm font-sans font-medium
                 text-cream/70 border border-cream/20
                 hover:text-cream hover:border-cream/40 transition-colors
                 cursor-pointer ui-disabled"
    >
      +{numMinutes}:{numSeconds}
    </button>
  );
}
