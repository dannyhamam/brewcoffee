interface SteamProps {
  active: boolean;
  intensity?: number; // 0 to 1
}

export function Steam({ active, intensity = 1 }: SteamProps) {
  if (!active) return null;

  const opacityStyle = { opacity: 0.3 + intensity * 0.7 };

  return (
    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-16 pointer-events-none">
      <div
        className="steam-wisp absolute bottom-0 left-[20%] w-2 h-10 bg-gradient-to-t from-white/60 to-transparent rounded-full blur-sm"
        style={{ ...opacityStyle, animationDelay: "0s" }}
      />
      <div
        className="steam-wisp absolute bottom-0 left-1/2 w-2 h-12 bg-gradient-to-t from-white/60 to-transparent rounded-full blur-sm"
        style={{ ...opacityStyle, animationDelay: "0.5s" }}
      />
      <div
        className="steam-wisp absolute bottom-0 left-[75%] w-2 h-9 bg-gradient-to-t from-white/60 to-transparent rounded-full blur-sm"
        style={{ ...opacityStyle, animationDelay: "1s" }}
      />
    </div>
  );
}
