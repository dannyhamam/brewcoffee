interface SoundToggleProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export function SoundToggle({ isPlaying, onToggle }: SoundToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium
                  bg-transparent transition-all duration-200
                  ${isPlaying ? "text-coffee-dark" : "text-coffee-medium"}`}
    >
      <span>{isPlaying ? "🔊" : "🔇"}</span>
      <span>Café Sounds</span>
      <div
        className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-200 ml-1 hover:cursor-pointer
                      ${isPlaying ? "bg-coffee-medium" : "bg-gray-300"}`}
      >
        <div
          className={`w-3 h-3 rounded-full bg-white shadow-sm transition-transform duration-200
                        ${isPlaying ? "translate-x-4" : "translate-x-0"}`}
        />
      </div>
    </button>
  );
}
