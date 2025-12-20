import { Button } from "../shared";

interface SoundToggleProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export function SoundToggle({ isPlaying, onToggle }: SoundToggleProps) {
  return (
    <Button
      onClick={onToggle}
      displayText=""
      symbol={isPlaying ? "🔊" : "🔇"}
      additionalClassNames={`w-12 h-12 !min-w-0 rounded-full flex items-center justify-center p-0
        transition-colors duration-200
        ${
          isPlaying
            ? "bg-coffee-light/20 text-cream hover:bg-coffee-light/30"
            : "bg-transparent text-cream/50 hover:bg-white/10 hover:text-cream/80"
        }`}
    />
  );
}
