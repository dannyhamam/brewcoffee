import { useState, useEffect, useRef } from "react";
import { COLOR_SWITCH_PERCENTAGE, MAX_DURATION_IN_SECONDS } from "../../constants";

interface TimerProps {
  totalSeconds: number;
  onDurationChange: (seconds: number) => void;
  remainingSeconds: number;
  isRunning: boolean;
  progress?: number;
}

/**
 * Displays either the editable duration input (when idle) or the running countdown timer.
 *
 * Logic:
 * - If `isRunning` is true OR `progress > 0` (coffee is brewing/brewed), show countdown.
 * - Otherwise, show the duration input to let user set the time.
 */
export function Timer({
  totalSeconds,
  onDurationChange,
  remainingSeconds,
  isRunning,
  progress = 0,
}: TimerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Format seconds to HH:MM:SS
  const formatTime = (seconds: number, editing: boolean): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (editing) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }

    // Smart stripping for display mode
    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    if (minutes > 0) {
      return `${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
    return secs.toString();
  };

  // Parse HH:MM:SS to seconds
  const parseTime = (timeString: string): number | null => {
    const parts = timeString.split(":").map((p) => parseInt(p, 10));
    if (parts.length !== 3 || parts.some((p) => isNaN(p) || p < 0)) {
      return null;
    }
    const [hours, minutes, seconds] = parts;
    if (minutes >= 60 || seconds >= 60) {
      return null;
    }
    return hours * 3600 + minutes * 60 + seconds;
  };

  // Focus and select input when entering edit mode
  useEffect(() => {
    if (isEditing) {
      // Focus and select all text after a brief delay to ensure it's rendered
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 0);
    }
  }, [isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    let value = e.target.value;

    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");

    // If we have more than 6 digits, take only the last 6 (shift left behavior)
    const limited = digits.length > 6 ? digits.slice(-6) : digits;
    
    // Format as HH:MM:SS
    if (limited.length > 0) {
      const padded = limited.padStart(6, "0");
      value = `${padded.slice(0, 2)}:${padded.slice(2, 4)}:${padded.slice(4, 6)}`;
    } else {
      value = "00:00:00";
    }
    setInputValue(value);
  };

  const handleInputBlur = () => {
    const parsed = parseTime(inputValue);
    if (parsed !== null && parsed >= 0) {
      const clamped = Math.min(MAX_DURATION_IN_SECONDS, parsed);
      onDurationChange(clamped);
    } else {
      // Restore previous value if input is invalid
      setInputValue(formatTime(totalSeconds, true));
    }
    setIsEditing(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    } else if (e.key === "Escape") {
      setIsEditing(false);
    }
  };

  const handleTimerClick = () => {
    if (!isRunning && progress === 0) {
      setInputValue(formatTime(totalSeconds, true));
      setIsEditing(true);
    }
  };

  const textColor =
    progress >= COLOR_SWITCH_PERCENTAGE ? "text-cream" : "text-coffee-medium";

  // Show countdown if running OR if mug has coffee
  const showCountdown = isRunning || progress > 0;

  // Determine which time value to display/edit
  const displaySeconds = showCountdown ? remainingSeconds : totalSeconds;

  return (
    <div
      className="max-w-[95%] mx-auto animate-fade-in-up"
      style={{ animationDelay: "200ms" }}
    >
      {isEditing && !showCountdown ? (
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          placeholder="00:00:00"
          className={`font-serif text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide
                     text-center bg-transparent outline-none w-full ${textColor}`}
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
        />
      ) : (
        <div
          onClick={handleTimerClick}
          className={`font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide
                      text-center drop-shadow-md ${textColor}
                      ${!showCountdown ? "cursor-text hover:opacity-80 transition-opacity" : ""}`}
          style={{ textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}
        >
          {formatTime(displaySeconds, false)}
        </div>
      )}
    </div>
  );
}
