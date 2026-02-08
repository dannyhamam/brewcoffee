import type { ReactNode } from "react";
import { Steam } from "./Steam";

interface CoffeeCupProps {
  progress: number; // 0 (empty) to 1 (full)
  isComplete?: boolean;
  showSteam?: boolean;
  children?: ReactNode;
}

export function Mug({
  progress,
  isComplete = false,
  showSteam = true,
  children,
}: CoffeeCupProps) {
  // Cup dimensions from SVG viewBox
  const cupTop = 70;
  const cupBottom = 220;
  const cupHeight = cupBottom - cupTop;

  // Calculate fill position (Y coordinate of coffee surface)
  const fillY = cupBottom - progress * cupHeight;
  const cremaY = fillY + 4;

  return (
    <div className="relative w-[80vw] sm:w-[65vw] md:w-[50vw] lg:w-[40vw] max-w-lg aspect-15/16 flex items-center justify-center">
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
        viewBox="-20 0 225 240"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cupGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4C4B5" />
            <stop offset="18%" stopColor="#EDE4DA" />
            <stop offset="42%" stopColor="#FFF8F0" />
            <stop offset="58%" stopColor="#FFF8F0" />
            <stop offset="82%" stopColor="#EDE4DA" />
            <stop offset="100%" stopColor="#D4C4B5" />
          </linearGradient>
          <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="30%" stopColor="rgba(255,255,255,0)" />
            <stop offset="45%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="55%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="70%" stopColor="rgba(255,255,255,0)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <linearGradient id="coffeeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B6914" />
            <stop offset="20%" stopColor="#6F4E37" />
            <stop offset="100%" stopColor="#3D2314" />
          </linearGradient>
          <linearGradient id="cremaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#D4A574" />
            <stop offset="100%" stopColor="#C4956A" />
          </linearGradient>
          <clipPath id="cupClip">
            <path d="M30 60 Q25 200 50 220 L130 220 Q155 200 150 60 Z" />
          </clipPath>
          <filter id="shadowBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
          </filter>
        </defs>

        {/* Cup Shadow */}
        <ellipse
          cx="90"
          cy="232"
          rx="78"
          ry="10"
          fill="rgba(0,0,0,0.18)"
          filter="url(#shadowBlur)"
        />

        {/* Cup Body */}
        <path
          d="M30 60 Q25 200 50 220 L130 220 Q155 200 150 60 Z"
          fill="url(#cupGradient)"
          stroke="#C4B5A6"
          strokeWidth="1.5"
        />
        <path
          d="M30 60 Q25 200 50 220 L130 220 Q155 200 150 60 Z"
          fill="url(#highlightGradient)"
        />

        {/* Coffee Fill */}
        <g clipPath="url(#cupClip)">
          <rect
            x="25"
            y={fillY}
            width="130"
            height="160"
            fill="url(#coffeeGradient)"
            className="transition-all duration-500 ease-out"
          />
          {progress > 0.05 && (
            <ellipse
              cx="90"
              cy={cremaY}
              rx="55"
              ry="8"
              fill="url(#cremaGradient)"
              className="transition-all duration-500 ease-out"
            />
          )}
        </g>

        {/* Cup Rim */}
        <ellipse
          cx="90"
          cy="60"
          rx="62"
          ry="12"
          fill="url(#cupGradient)"
          stroke="#C4B5A6"
          strokeWidth="1.5"
        />
        <ellipse
          cx="90"
          cy="60"
          rx="55"
          ry="9"
          fill="#F5EDE3"
          stroke="#E0D5C8"
          strokeWidth="0.5"
        />

        {/* Cup Handle */}
        <path
          d="M150 90 Q192 90 192 140 Q192 180 150 180"
          fill="none"
          stroke="url(#cupGradient)"
          strokeWidth="18"
          strokeLinecap="round"
        />
        <path
          d="M150 100 Q182 100 182 140 Q182 170 150 170"
          fill="none"
          stroke="#C4B5A6"
          strokeWidth="1.5"
        />
      </svg>

      {/* Timer overlay inside the cup */}
      {children && (
        <div className="absolute inset-0 flex items-center justify-center pt-[2%]">
          {children}
        </div>
      )}
    </div>
  );
}
