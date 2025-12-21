import { useEffect, useState } from "react";
import { Modal, Mug, Options, Timer } from "./components";
import { useTimer, useSound } from "./hooks";

const ONBOARDING_KEY = "brewcoffee:onboardingSeen";

function App() {
  const [duration, setDuration] = useState(60);
  const timer = useTimer(duration);
  const sound = useSound();
  const [isHelpOpen, setIsHelpOpen] = useState(() => {
    try {
      return window.localStorage.getItem(ONBOARDING_KEY) !== "true";
    } catch {
      return true;
    }
  });

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

  const handleCloseHelp = () => {
    try {
      window.localStorage.setItem(ONBOARDING_KEY, "true");
    } catch {}
    setIsHelpOpen(false);
  };

  return ( 
    <div
      className="min-h-screen bg-gradient-to-br from-coffee-dark via-coffee-medium to-coffee-dark 
                    flex flex-col items-center justify-center p-6 gap-6 relative"
    >
      {/* Help */}
      <button
        type="button"
        onClick={() => setIsHelpOpen(true)}
        className="absolute top-6 right-6 h-11 w-11 rounded-full border border-cream/15
                   bg-coffee-dark/25 text-cream/90 shadow-lg backdrop-blur
                   hover:bg-coffee-dark/35 hover:text-cream transition-colors
                   ui-hover-fade ui-focus-ring ui-hover-surface cursor-pointer"
        aria-label="About Brew Coffee"
      >
        ?
      </button>

      <Modal
        isOpen={isHelpOpen}
        onClose={handleCloseHelp}
        title="A cozy focus timer for coffee breaks"
      >
        <p className="text-cream/80 leading-relaxed">
          Brew Coffee is a simple visual timer. Pick a duration, hit start,
          and let the mug fill as you focus.
        </p>

        <ul className="mt-4 space-y-2 text-cream/85">
          <li className="flex gap-3">
            <span className="mt-2 inline-block h-2 w-2 rounded-full bg-cream/60" />
            Set your time by clicking the timer.
          </li>
          <li className="flex gap-3">
            <span className="mt-2 inline-block h-2 w-2 rounded-full bg-cream/60" />
            Start brewing and stay in flow.
          </li>
          <li className="flex gap-3">
            <span className="mt-2 inline-block h-2 w-2 rounded-full bg-cream/60" />
            Use quick adds to extend your session.
          </li>
        </ul>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleCloseHelp}
            className="rounded-xl bg-cream/90 px-4 py-2 font-semibold text-coffee-dark
                       shadow-md hover:bg-cream transition-colors
                       ui-focus-ring"
          >
            Got it
          </button>
        </div>
      </Modal>

      {/* Coffee Cup with Timer inside */}
      <div className="flex flex-col items-center">
        <Mug progress={timer.progress} isComplete={timer.isComplete}>
          <Timer
            totalSeconds={timer.totalSeconds}
            onDurationChange={handleDurationChange}
            onAddTime={handleAddTime}
            remainingSeconds={timer.remainingSeconds}
            isRunning={timer.isRunning}
            progress={timer.progress}
          />
        </Mug>
      </div>

      {/* Controls */}
      <Options
        isRunning={timer.isRunning}
        onStart={timer.start}
        onPause={timer.pause}
        onReset={timer.reset}
        isSoundPlaying={sound.isPlaying}
        onSoundToggle={sound.toggle}
      />

      {/* Status Message */}
      <div
        className="text-cream/80 text-center px-6 py-3 bg-coffee-dark/30 rounded-full
                      backdrop-blur-sm"
      >
        {timer.isComplete
          ? "🎉 Your coffee is ready! Great focus session!"
          : timer.isRunning
          ? "☕ Brewing in progress... Stay focused!"
          : "Set your duration and start brewing ☕"}
      </div>
    </div>
  );
}

export default App;
