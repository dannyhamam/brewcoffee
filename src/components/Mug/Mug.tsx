import type { ReactNode } from "react";
import type { CoffeeType } from "../../coffeeTypes";
import { Steam } from "./Steam";

interface CoffeeCupProps {
  progress: number; // 0 (empty) to 1 (full)
  isComplete?: boolean;
  showSteam?: boolean;
  coffeeType: CoffeeType;
  children?: ReactNode;
}

/**
 * Renders a parameterized coffee mug SVG with fill animation, steam, and a timer overlay.
 * Visual dimensions, colors, and shape are driven by the `coffeeType` config.
 */
export function Mug({
  progress,
  isComplete = false,
  showSteam = true,
  coffeeType,
  children,
}: CoffeeCupProps) {
  const { mug, id } = coffeeType;

  const cupHeight = mug.cupBottom - mug.cupTop;
  const fillY = mug.cupBottom - progress * cupHeight;
  const cremaY = fillY + 4;

  // Rim position sits at the top of the cup
  const rimCy = mug.cupTop;

  // Timer position: slightly above geometric center (42%) to account for the
  // tapered cup shape — the visual weight sits higher than the midpoint.
  const cupCenterY = mug.cupTop + cupHeight * 0.42;
  const foreignHeight = cupHeight * 0.5;
  const foreignY = cupCenterY - foreignHeight / 2;

  // Unique SVG IDs to avoid collisions when multiple mugs are in the DOM
  const gid = (name: string) => `${name}-${id}`;

  return (
    <div
      className="relative w-[80vw] sm:w-[65vw] md:w-[50vw] lg:w-[40vw] max-w-lg flex items-center justify-center"
      style={{ aspectRatio: mug.aspectRatio }}
    >
      {/* Steam */}
      {showSteam && <Steam active={progress > 0.05} intensity={progress} />}

      {/* Completion Glow */}
      {isComplete && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-3/4 h-3/4 rounded-full pointer-events-none animate-pulse"
          style={{
            background:
              "radial-gradient(circle, rgba(255,183,77,0.5) 0%, transparent 70%)",
          }}
        />
      )}

      {/* Coffee Cup SVG */}
      <svg
        className="w-full h-full drop-shadow-2xl transition-transform duration-300"
        viewBox={`-20 0 225 ${mug.viewBoxHeight}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={gid("cupGradient")} x1="0%" y1="0%" x2="100%" y2="0%">
            {mug.cupGradientStops.map((s) => (
              <stop key={s.offset} offset={s.offset} stopColor={s.color} />
            ))}
          </linearGradient>
          <linearGradient id={gid("highlightGradient")} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="30%" stopColor="rgba(255,255,255,0)" />
            <stop offset="45%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="55%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="70%" stopColor="rgba(255,255,255,0)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <linearGradient id={gid("coffeeGradient")} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B6914" />
            <stop offset="20%" stopColor="#6F4E37" />
            <stop offset="100%" stopColor="#3D2314" />
          </linearGradient>
          <linearGradient id={gid("cremaGradient")} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4A574" />
            <stop offset="100%" stopColor="#C4956A" />
          </linearGradient>
          <clipPath id={gid("cupClip")}>
            <path d={mug.clipPath} />
          </clipPath>
          <filter id={gid("shadowBlur")}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>
        </defs>

        {/* Cup Shadow */}
        <ellipse
          cx="90"
          cy={mug.shadowCy}
          rx={mug.shadowRx}
          ry="10"
          fill="rgba(0,0,0,0.18)"
          filter={`url(#${gid("shadowBlur")})`}
        />

        {/* Cup Body */}
        <path
          d={mug.cupPath}
          fill={`url(#${gid("cupGradient")})`}
          stroke="#C4B5A6"
          strokeWidth="1.5"
        />
        <path
          d={mug.cupPath}
          fill={`url(#${gid("highlightGradient")})`}
        />

        {/* Coffee Fill */}
        <g clipPath={`url(#${gid("cupClip")})`}>
          <rect
            x="25"
            y={fillY}
            width="135"
            height={mug.cupBottom - mug.cupTop + 10}
            fill={`url(#${gid("coffeeGradient")})`}
            className="transition-all duration-500 ease-out"
          />
          {progress > 0.05 && (
            <ellipse
              cx="90"
              cy={cremaY}
              rx="55"
              ry={mug.cremaRy}
              fill={`url(#${gid("cremaGradient")})`}
              className="transition-all duration-500 ease-out"
            />
          )}
        </g>

        {/* Cup Rim */}
        <ellipse
          cx="90"
          cy={rimCy}
          rx="62"
          ry="12"
          fill={`url(#${gid("cupGradient")})`}
          stroke="#C4B5A6"
          strokeWidth="1.5"
        />
        <ellipse
          cx="90"
          cy={rimCy}
          rx="55"
          ry="9"
          fill={mug.rimInnerFill}
          stroke={mug.rimStroke}
          strokeWidth="0.5"
        />

        {/* Cup Handle */}
        <path
          d={mug.handleOuter}
          fill="none"
          stroke={`url(#${gid("cupGradient")})`}
          strokeWidth={mug.handleStrokeWidth}
          strokeLinecap="round"
        />

        {/* Timer — rendered inside SVG via foreignObject for exact cup-center alignment.
            HTML inside foreignObject maps 1 SVG unit → 1 CSS px, so we render at a
            larger virtual size and scale down to keep text crisp and proportional. */}
        {children && (() => {
          const cupBodyWidth = mug.cupRight - mug.cupLeft;
          const virtualWidth = 220;
          const scale = cupBodyWidth / virtualWidth;
          return (
            <foreignObject
              x={mug.cupLeft}
              y={foreignY}
              width={cupBodyWidth}
              height={foreignHeight}
            >
              <div
                style={{
                  width: virtualWidth,
                  height: foreignHeight / scale,
                  transform: `scale(${scale})`,
                  transformOrigin: "0 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {children}
              </div>
            </foreignObject>
          );
        })()}
      </svg>
    </div>
  );
}
