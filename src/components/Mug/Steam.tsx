interface SteamProps {
  active: boolean;
  intensity?: number; // 0 to 1
}

export function Steam({ active, intensity = 1 }: SteamProps) {
  if (!active) return null;

  const opacityStyle = { opacity: 0.3 + intensity * 0.7 };

  return (
    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-20 md:w-32 md:h-24 pointer-events-none">
      <div
        className="steam-wisp absolute bottom-0 left-[20%] w-2 h-12 md:h-16 bg-gradient-to-t from-white/60 to-transparent rounded-full blur-sm"
        style={{ ...opacityStyle, animationDelay: "0s" }}
      />
      <div
        className="steam-wisp absolute bottom-0 left-1/2 w-2 h-14 md:h-20 bg-gradient-to-t from-white/60 to-transparent rounded-full blur-sm"
        style={{ ...opacityStyle, animationDelay: "0.5s" }}
      />
      <div
        className="steam-wisp absolute bottom-0 left-[75%] w-2 h-11 md:h-14 bg-gradient-to-t from-white/60 to-transparent rounded-full blur-sm"
        style={{ ...opacityStyle, animationDelay: "1s" }}
      />
    </div>
  );
}
