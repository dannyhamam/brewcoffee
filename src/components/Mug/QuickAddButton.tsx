
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

  const numMinutes = String(Math.floor(timeToAdd / 60)).padStart(2, '0')
  const numSeconds = String(timeToAdd % 60).padStart(2, '0')
  
  return (
    <div>
      <button
        onClick={() => onAddTime(timeToAdd)}
        disabled={isRunning}
        className={`p-1 rounded-lg text-sm font-semibold
                       ${textColor} ${borderColor} border-2
                       cursor-pointer ui-hover-surface ui-hover-fade ui-disabled
                       `}
        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}
      >
        {/* +{(timeToAdd / 60.00).toFixed(2)} */}
        {numMinutes}:{numSeconds}
      </button>
    </div>
  );
}
