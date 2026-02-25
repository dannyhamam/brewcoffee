import type { ReactNode } from "react";
import { COFFEE_TYPES } from "../coffeeTypes";
import type { CoffeeType } from "../coffeeTypes";
import { Mug } from "./Mug";

interface CoffeeCarouselProps {
  currentIndex: number;
  onIndexChange: (index: number) => void;
  disabled: boolean;
  progress: number;
  isComplete: boolean;
  children: (coffeeType: CoffeeType) => ReactNode;
}

/**
 * Infinite carousel that slides between coffee mug types.
 * Arrows fade out when the timer is running or complete.
 */
export function CoffeeCarousel({
  currentIndex,
  onIndexChange,
  disabled,
  progress,
  isComplete,
  children,
}: CoffeeCarouselProps) {
  const count = COFFEE_TYPES.length;
  const current = COFFEE_TYPES[currentIndex];

  const goPrev = () => onIndexChange((currentIndex - 1 + count) % count);
  const goNext = () => onIndexChange((currentIndex + 1) % count);

  return (
    <div className="flex flex-col items-center">
      {/* Carousel row: arrow – mug – arrow */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Left arrow */}
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous coffee type"
          className={`h-11 w-11 flex items-center justify-center rounded-full
                     text-cream/30 hover:text-cream/60 hover:bg-white/5
                     transition-all duration-200 cursor-pointer ui-focus-ring shrink-0
                     ${disabled ? "opacity-0 pointer-events-none" : ""}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>

        {/* Mug viewport — crossfade between coffee types */}
        <div className="w-[80vw] sm:w-[65vw] md:w-[50vw] lg:w-[40vw] max-w-lg">
          <div key={current.id} className="w-full flex items-end animate-fade-in-up" style={{ aspectRatio: "15/15" }}>
            <Mug
              coffeeType={current}
              progress={progress}
              isComplete={isComplete}
              showSteam
            >
              {children(current)}
            </Mug>
          </div>
        </div>

        {/* Right arrow */}
        <button
          type="button"
          onClick={goNext}
          aria-label="Next coffee type"
          className={`h-11 w-11 flex items-center justify-center rounded-full
                     text-cream/30 hover:text-cream/60 hover:bg-white/5
                     transition-all duration-200 cursor-pointer ui-focus-ring shrink-0
                     ${disabled ? "opacity-0 pointer-events-none" : ""}`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      {/* Coffee type label */}
      {!disabled && (
        <p
          key={current.id}
          className="font-serif text-sm text-cream/50 tracking-widest uppercase mt-2 animate-fade-in-up"
        >
          {current.name}
        </p>
      )}
    </div>
  );
}
