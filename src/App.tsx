import { useEffect, useState } from "react";
import { Mug, Options, Timer } from "./components";
import { QuickAddButton } from "./components/Mug/QuickAddButton";
import { useTimer, useSound } from "./hooks";

function App() {
  const [duration, setDuration] = useState(60);
  const timer = useTimer(duration);
  const sound = useSound();

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
      <header className="absolute top-8 left-1/2 -translate-x-1/2 text-center animate-fade-in-up">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-cream/90 tracking-wide">
          brew coffee
        </h1>
        <p className="font-sans text-xs text-cream/40 mt-1 tracking-wider">
          a cozy focus timer — toggle sound below for cafe vibes
        </p>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center gap-5 pb-28">
        <div className="animate-fade-in-scale">
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
        {!timer.isRunning && (
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
        <p className="text-cream/50 text-sm font-sans tracking-wide animate-fade-in-up" style={{ animationDelay: "500ms" }}>
          {timer.isComplete
            ? "Your coffee is ready! Great focus session."
            : timer.isRunning
            ? "Brewing in progress... Stay focused."
            : "Click the timer to set your duration"}
        </p>
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
    </div>
  );
}

export default App;
