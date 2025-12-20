import { useEffect, useState } from "react";
import { Mug, Timer, Options } from "./components";
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
                    flex flex-col items-center justify-center p-6 gap-6"
    >
      {/* Header */}
      <header className="text-center">
        <h1
          className="font-serif text-4xl md:text-5xl font-bold text-cream tracking-wide
                       drop-shadow-lg"
        >
          ☕ Fill My Coffee
        </h1>
        <p className="text-cream-dark/80 mt-1">Your cozy focus companion</p>
      </header>

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
