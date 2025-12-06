interface SoundToggleProps {
  isPlaying: boolean;
  onToggle: () => void;
  label?: string;
}

export function SoundToggle({ 
  isPlaying, 
  onToggle, 
  label = '☕ Café Ambiance' 
}: SoundToggleProps) {
  return (
    <div className="pt-4 border-t border-cream-dark">
      <label className="flex items-center justify-between cursor-pointer">
        <span className="text-sm font-medium text-coffee-medium">
          {label}
        </span>
        <div className="relative">
          <input
            type="checkbox"
            checked={isPlaying}
            onChange={onToggle}
            className="sr-only peer"
          />
          <div 
            className="w-14 h-7 bg-gray-300 rounded-full 
                       peer-checked:bg-coffee-medium
                       peer-focus:ring-2 peer-focus:ring-coffee-light/50
                       transition-colors duration-300"
          />
          <div 
            className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full 
                       shadow-md transform transition-transform duration-300
                       peer-checked:translate-x-7"
          />
        </div>
      </label>
    </div>
  );
}
