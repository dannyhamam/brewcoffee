# brewcoffee Design System

A guide for making design decisions. This is about intent, not implementation.

---

## Vision

brewcoffee is a Pomodoro timer that feels like sitting in a quiet, well-designed cafe. The experience should be calming, focused, and invisible — the tool stays out of the way so the user can focus on their work. Inspired by Google's built-in search timer: nothing extra, everything purposeful.

---

## Design Principles

**1. The mug is the centerpiece.**
Every screen revolves around the coffee mug. It's the first thing users see, the primary feedback mechanism, and the emotional anchor. All other elements exist to support it. If a new element draws attention away from the mug, reconsider it.

**2. Earn every pixel.**
Before adding any visual element, ask: "What happens if I remove this?" If the answer is "nothing changes," don't add it. Whitespace is a feature, not wasted space. Fewer elements means less cognitive load.

**3. Warmth through restraint.**
The coffee theme should be felt, not seen. Warm colors, soft transitions, and subtle textures create the mood — not coffee bean icons, latte art, or barista illustrations. Think ambient lighting, not themed restaurant.

**4. Motion tells a story.**
Animation should answer "what just happened?" or "what should I look at?" Steam rising means the timer is active. The fill level communicates progress. A gentle fade-in welcomes the user. If an animation doesn't communicate something, it's decoration — remove it.

**5. Show less, reveal more.**
Don't present every option upfront. The idle state should be nearly empty — just the mug and a way to start. Controls appear when relevant and disappear when not. Users should never feel overwhelmed by choices.

---

## Visual Hierarchy

The user's eye should follow this priority:

1. **Mug + timer** — The hero. Always dominant.
2. **Primary action** — The one thing the user should do next (Start, Pause, or Reset).
3. **Status feedback** — What's happening right now (running, paused, complete).
4. **Secondary controls** — Quick-add time, sound, fullscreen. Discoverable but quiet.

If two elements feel equally prominent, one of them needs to be toned down.

---

## Color Intent

- **Dark background** — Creates focus, reduces eye strain during long sessions, evokes evening cafe ambiance.
- **Cream text** — Warm and readable. Opacity levels create hierarchy (brighter = more important).
- **Amber accent** — Reserved for the most important action. Only one amber element should be visible at a time. It says: "this is what you should do next."
- **Brown tones** — Supporting buttons and surfaces. Grounded and unobtrusive.

Never introduce a color that doesn't feel like it belongs in a coffee shop.

---

## Interaction Design

**Idle state:** Minimal. The mug, a timer you can set, and a Start button. Nothing else competes.

**Active state:** The mug fills, steam rises, the timer counts down. Controls shift to Pause and Reset. The interface communicates "you're in a session" without being loud about it.

**Complete state:** A subtle celebration — a glow, a status message. Not fireworks. The user was focused; don't jolt them out of it.

**Fullscreen mode:** Strip everything except the mug and timer. This is deep focus — the interface should practically disappear.

---

## Mobile Considerations

- The mug should feel large and centered on any screen size.
- Touch targets must be comfortable — no tiny icons or cramped buttons.
- Avoid hover-dependent interactions on mobile. If something only appears on hover, mobile users can't access it.
- Tooltips are a desktop convenience, not a mobile pattern.

---

## Emotional Design Goals

| The app should feel... | The app should NOT feel... |
|---|---|
| Calm and focused | Busy or cluttered |
| Warm and inviting | Cold or sterile |
| Professional and polished | Playful or gimmicky |
| Effortless to use | Feature-heavy or complex |
| Like a tool that respects your time | Like a toy or novelty |
