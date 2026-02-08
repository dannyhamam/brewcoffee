interface SteamProps {
  active: boolean;
  intensity?: number; // 0 to 1
}

/** Individual wisp configuration. */
interface Wisp {
  left: string;
  height: string;
  mdHeight: string;
  animation: string;
  duration: string;
  delay: string;
  blur: string;
  width: string;
}

const WISPS: Wisp[] = [
  { left: "15%", height: "h-10", mdHeight: "md:h-14", animation: "steam-rise-1", duration: "3.2s", delay: "0s", blur: "blur-[3px]", width: "w-1.5" },
  { left: "30%", height: "h-14", mdHeight: "md:h-20", animation: "steam-rise-2", duration: "3.8s", delay: "0.4s", blur: "blur-sm", width: "w-2" },
  { left: "48%", height: "h-16", mdHeight: "md:h-22", animation: "steam-rise-1", duration: "4s", delay: "0.8s", blur: "blur-sm", width: "w-2" },
  { left: "62%", height: "h-12", mdHeight: "md:h-16", animation: "steam-rise-3", duration: "3.5s", delay: "0.2s", blur: "blur-[3px]", width: "w-1.5" },
  { left: "78%", height: "h-10", mdHeight: "md:h-14", animation: "steam-rise-2", duration: "3.6s", delay: "1.2s", blur: "blur-sm", width: "w-1.5" },
  { left: "38%", height: "h-11", mdHeight: "md:h-15", animation: "steam-rise-3", duration: "4.2s", delay: "1.8s", blur: "blur-[4px]", width: "w-1" },
  { left: "55%", height: "h-9", mdHeight: "md:h-12", animation: "steam-rise-1", duration: "3.4s", delay: "2.4s", blur: "blur-[3px]", width: "w-1" },
];

export function Steam({ active, intensity = 1 }: SteamProps) {
  if (!active) return null;

  const baseOpacity = 0.2 + intensity * 0.8;

  return (
    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-28 h-24 md:w-36 md:h-28 pointer-events-none">
      {WISPS.map((w, i) => (
        <div
          key={i}
          className={`absolute bottom-0 ${w.width} ${w.height} ${w.mdHeight} bg-linear-to-t from-white/50 via-white/25 to-transparent rounded-full ${w.blur}`}
          style={{
            left: w.left,
            opacity: baseOpacity,
            animation: `${w.animation} ${w.duration} ease-out ${w.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
