interface TimerDisplayProps {
  remainingSeconds: number;
}

export function TimerDisplay({ remainingSeconds }: TimerDisplayProps) {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  
  const formatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="font-serif text-6xl md:text-7xl font-semibold text-cream tracking-wider 
                    px-6 py-3 bg-coffee-dark/30 rounded-2xl backdrop-blur-sm
                    shadow-lg">
      {formatted}
    </div>
  );
}
