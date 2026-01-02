# ☕ Brew Coffee

A cozy Pomodoro timer that fills your coffee cup as you focus.

## Features

- 🕐 **Timer** — Set any duration from 1–240 minutes
- ☕ **Animation** — Watch your cup fill as time progresses
- 💨 **Steam** — Animated steam that intensifies as the cup fills
- 🔔 **Completion Sound** — Satisfying ding when your focus session ends
- 🎵 **Café Ambiance** — Toggle background café sounds for immersion

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── components/
│   ├── Mug/
│   │   ├── Mug.tsx               # SVG cup with fill animation
│   │   ├── Timer.tsx             # Timer display & duration input
│   │   └── Steam.tsx             # Rising steam effect
│   ├── Options/
│   │   ├── Options.tsx           # Control panel
│   │   └── SoundToggle.tsx       # Ambient audio toggle
│   └── UI/
│       └── Button.tsx            # Generic UI button
├── hooks/
│   ├── useTimer.ts               # Timer state & logic
│   └── useSound.ts               # Audio playback control
├── App.tsx                       # Main composition
└── index.css                     # Tailwind config & theme
```

## Customization

This project is designed to be modular and extensible:

| To change...     | Modify...                    |
| ---------------- | ---------------------------- |
| Coffee animation | `components/Mug/Mug.tsx`     |
| Timer behavior   | `hooks/useTimer.ts`          |
| Sound effects    | `hooks/useSound.ts`          |
| Color palette    | `index.css` → `@theme` block |

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development
- **Tailwind CSS v4** for styling
- **pnpm** for package management
