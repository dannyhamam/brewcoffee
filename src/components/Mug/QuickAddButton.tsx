
interface QuickAddButtonProps {
  timeToAdd: number,
  onAddTime: (seconds: number) => void,
  isRunning: boolean,
  textColor: string,
  borderColor: string
}

export function QuickAddButton({
  timeToAdd,
  onAddTime,
  isRunning,
  textColor,
  borderColor
}: QuickAddButtonProps) {
  
  return (
    <div>
      <button
        onClick={() => onAddTime(timeToAdd)}
        disabled={isRunning}
        className={`p-1 rounded-lg text-sm font-semibold
                       ${textColor} ${borderColor} border-2
                       hover:bg-white/10 transition-colors
                       disabled:opacity-50 disabled:cursor-not-allowed
                       hover:cursor-pointer hover:opacity-80
                       `}
        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}
      >
        +{(timeToAdd / 60.00).toFixed(2)}
      </button>
    </div>
  );
}
