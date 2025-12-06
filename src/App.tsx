import { useEffect, useState } from 'react';
import { TimerDisplay, TimerControls, CoffeeCup, SoundToggle } from './components';
import { useTimer, useSound } from './hooks';

function App() {
  const [duration, setDuration] = useState(25);
  const timer = useTimer(duration);
  const sound = useSound();

  // Play ding when timer completes
  useEffect(() => {
    if (timer.isComplete) {
      sound.playDing();
    }
  }, [timer.isComplete, sound.playDing]);

  // Sync duration input with timer
  const handleDurationChange = (minutes: number) => {
    setDuration(minutes);
    if (!timer.isRunning) {
      timer.setDuration(minutes);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-coffee-dark via-coffee-medium to-coffee-dark 
                    flex flex-col items-center justify-center p-6 gap-6">
      {/* Header */}
      <header className="text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-cream tracking-wide
                       drop-shadow-lg">
          ☕ FillMyCoffee
        </h1>
        <p className="text-cream-dark/80 mt-1">Your cozy focus companion</p>
      </header>

      {/* Coffee Cup & Timer Display */}
      <div className="flex flex-col items-center gap-4">
        <CoffeeCup 
          progress={timer.progress} 
          isComplete={timer.isComplete}
        />
        <TimerDisplay remainingSeconds={timer.remainingSeconds} />
      </div>

      {/* Controls */}
      <TimerControls
        duration={duration}
        isRunning={timer.isRunning}
        onDurationChange={handleDurationChange}
        onStart={timer.start}
        onPause={timer.pause}
        onReset={timer.reset}
      />

      {/* Sound Toggle - wrapped in same card style */}
      <div className="bg-cream/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl 
                      border border-white/30 w-full max-w-sm">
        <SoundToggle 
          isPlaying={sound.isPlaying} 
          onToggle={sound.toggle} 
        />
      </div>

      {/* Status Message */}
      <div className="text-cream/80 text-center px-6 py-3 bg-coffee-dark/30 rounded-full
                      backdrop-blur-sm">
        {timer.isComplete 
          ? '🎉 Your coffee is ready! Great focus session!'
          : timer.isRunning 
            ? '☕ Brewing in progress... Stay focused!'
            : 'Set your duration and start brewing ☕'}
      </div>
    </div>
  );
}

export default App;
