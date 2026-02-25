import { useEffect, useState } from "react";
import { Mug, Timer } from "./components";
import { QuickAddButton } from "./components/Mug/QuickAddButton";
import { useTimer, useSound, useFullscreen } from "./hooks";

function App() {
  const [duration, setDuration] = useState(60);
  const timer = useTimer(duration);
  const sound = useSound();
  const fullscreen = useFullscreen();

  // Play ding when timer completes
  useEffect(() => {
    if (timer.isComplete) {
      sound.playDing();
    }
  }, [timer.isComplete, sound.playDing]);

  // Sync duration input with timer
  const handleDurationChange = (seconds: number) => {
    setDuration(seconds);
    if (!timer.isRunning) {
      timer.setDuration(seconds);
    }
  };

  // Handle quick add time buttons
  const handleAddTime = (seconds: number) => {
    timer.addTime(seconds);
    setDuration(timer.totalSeconds);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-coffee-dark via-coffee-medium to-coffee-dark
                    flex flex-col items-center justify-center p-4 relative"
    >
      {/* Header */}
      {!fullscreen.isFullscreen && (
        <header className="absolute top-8 left-1/2 -translate-x-1/2 text-center animate-fade-in-up">
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-cream/90 tracking-wide">
            brew coffee
          </h1>
          <p className="font-sans text-xs text-cream/40 mt-1 tracking-wider">
            a cozy focus timer
          </p>
        </header>
      )}

      {/* Main Content */}
      <div className="flex flex-col items-center gap-5">
        {/* Mug area with utility icons */}
        <div className="relative animate-fade-in-scale">
          {/* Utility icons — top-right of mug */}
          <div
            className="absolute -top-1 -right-2 z-10 flex items-center gap-1 animate-fade-in-up"
            style={{ animationDelay: "400ms" }}
          >
            {/* Fullscreen toggle */}
            <div className="relative group">
              <button
                type="button"
                onClick={fullscreen.toggle}
                className="h-8 w-8 rounded-full flex items-center justify-center
                           text-cream/60 hover:text-cream hover:bg-white/10
                           transition-colors cursor-pointer ui-focus-ring animate-pulse-ring"
                style={{ animationDelay: "1s" }}
                aria-label={fullscreen.isFullscreen ? "Exit full screen" : "Enter full screen"}
              >
                {fullscreen.isFullscreen ? (
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M5 1v4H1M11 1v4h4M5 15v-4H1M11 15v-4h4" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M1 5V1h4M15 5V1h-4M1 11v4h4M15 11v4h-4" />
                  </svg>
                )}
              </button>
              <span
                className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded
                           bg-black/70 text-cream/80 text-[10px] font-sans whitespace-nowrap
                           opacity-0 group-hover:opacity-100 transition-opacity duration-150
                           pointer-events-none"
              >
                {fullscreen.isFullscreen ? "Exit full screen" : "Full screen"}
              </span>
            </div>

            {/* Sound toggle + volume slider */}
            <div className="relative group">
              <button
                type="button"
                onClick={sound.toggle}
                className="relative h-8 w-8 rounded-full flex items-center justify-center
                           text-cream/60 hover:text-cream hover:bg-white/10
                           transition-colors cursor-pointer ui-focus-ring animate-pulse-ring"
                style={{ animationDelay: "1.4s" }}
                aria-label={sound.isPlaying ? "Mute cafe sounds" : "Play cafe sounds"}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 1.5L4 5H1v6h3l4 3.5V1.5z" />
                  {sound.isPlaying && sound.volume > 0 && (
                    <>
                      <path d="M11 5.5c.6.7 1 1.6 1 2.5s-.4 1.8-1 2.5" />
                      <path d="M13 3.5C14.2 4.8 15 6.8 15 8s-.8 3.2-2 4.5" />
                    </>
                  )}
                </svg>
                {/* Red mute line */}
                {(!sound.isPlaying || sound.volume === 0) && (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    className="absolute inset-0 m-auto"
                  >
                    <line x1="3" y1="2" x2="14" y2="14" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                )}
              </button>
              <span
                className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded
                           bg-black/70 text-cream/80 text-[10px] font-sans whitespace-nowrap
                           opacity-0 group-hover:opacity-100 transition-opacity duration-150
                           pointer-events-none"
              >
                {sound.isPlaying && sound.volume > 0 ? "Mute" : "Unmute"}
              </span>

              {/* Volume slider — appears on hover */}
              <div
                className="absolute left-full top-1/2 -translate-y-1/2 pl-3 px-3 py-1
                           opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto
                           transition-opacity duration-200"
              >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={sound.isPlaying ? sound.volume : 0}
                  onChange={(e) => sound.setVolume(parseFloat(e.target.value))}
                  className="w-20 h-1.5 appearance-none bg-cream/20 rounded-full cursor-pointer
                             [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3
                             [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full
                             [&::-webkit-slider-thumb]:bg-cream [&::-webkit-slider-thumb]:cursor-pointer
                             [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3
                             [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-cream
                             [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:cursor-pointer"
                  aria-label="Volume"
                />
              </div>
            </div>
          </div>

          <Mug progress={timer.progress} isComplete={timer.isComplete}>
            <Timer
              totalSeconds={timer.totalSeconds}
              onDurationChange={handleDurationChange}
              remainingSeconds={timer.remainingSeconds}
              isRunning={timer.isRunning}
              progress={timer.progress}
            />
          </Mug>
        </div>

        {/* Quick Add Buttons */}
        {!fullscreen.isFullscreen && !timer.isRunning && (
          <div className="flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: "400ms" }}>
            <QuickAddButton
              timeToAdd={30}
              onAddTime={handleAddTime}
              isRunning={timer.isRunning}
            />
            <QuickAddButton
              timeToAdd={60}
              onAddTime={handleAddTime}
              isRunning={timer.isRunning}
            />
            <QuickAddButton
              timeToAdd={300}
              onAddTime={handleAddTime}
              isRunning={timer.isRunning}
            />
          </div>
        )}

        {/* Status Message */}
        {!fullscreen.isFullscreen && (
          <p className="text-cream/50 text-sm font-sans tracking-wide animate-fade-in-up" style={{ animationDelay: "500ms" }}>
            {timer.isComplete
              ? "Your coffee is ready! Great focus session."
              : timer.isRunning
              ? "Brewing in progress... Stay focused."
              : "Click the timer to set your duration"}
          </p>
        )}

        {/* Play / Pause / Reset */}
        {!fullscreen.isFullscreen && (
          <div className="flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: "600ms" }}>
            {timer.isComplete ? (
              <button
                type="button"
                onClick={timer.reset}
                className="px-6 py-2.5 rounded-full font-sans font-semibold text-sm
                           bg-coffee-medium text-cream hover:bg-coffee-light
                           transition-colors cursor-pointer ui-focus-ring"
              >
                Reset
              </button>
            ) : timer.isRunning ? (
              <>
                <button
                  type="button"
                  onClick={timer.pause}
                  className="px-6 py-2.5 rounded-full font-sans font-semibold text-sm
                             bg-warm-amber text-coffee-dark hover:bg-warm-glow
                             transition-colors cursor-pointer ui-focus-ring"
                >
                  Pause
                </button>
                <button
                  type="button"
                  onClick={timer.reset}
                  className="px-5 py-2.5 rounded-full font-sans font-semibold text-sm
                             bg-transparent text-cream/70 border border-cream/20
                             hover:bg-cream/10 hover:text-cream hover:border-cream/40
                             transition-colors cursor-pointer ui-focus-ring"
                >
                  Reset
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={timer.start}
                className="px-8 py-2.5 rounded-full font-sans font-semibold text-sm
                           bg-coffee-medium text-cream hover:bg-coffee-light
                           transition-colors cursor-pointer ui-focus-ring"
              >
                Start
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
