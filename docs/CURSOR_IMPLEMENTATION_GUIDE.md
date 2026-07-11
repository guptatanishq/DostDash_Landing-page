# Implementing DostDrop in Cursor (Grok 4.5) — Working Guide

This is not a single "build my website" prompt. Scrollytelling sites break when you ask an AI model to generate everything at once — it guesses at structure, motion timing, and pacing without ever seeing it run. Build it the way the roadmap already says: one chapter at a time, reviewed in the browser after every step.

---

## 0. Put the docs *in the repo*, not just in chat

Cursor's model reads your project files directly when you reference them with `@`. Chat-pasted context gets diluted over a long session; a file on disk doesn't.

```
your-project/
  docs/
    PRODUCT_VISION.md      <- the creative/tech plan
    SCENE_SCRIPT.md         <- the scene-by-scene script
  ...
```

Drop `PRODUCT_VISION.md` and `SCENE_SCRIPT.md` (the two files from this conversation) straight into a `docs/` folder before you open Cursor. Every prompt below assumes they're there.

---

## 1. Scaffold the project first (one prompt, once)

Open Cursor in an empty folder, Agent/Composer mode, and run:

```
Set up a new Next.js 15 App Router project for a scrollytelling website called DostDrop.

Requirements:
- TypeScript, Tailwind CSS
- Install and configure GSAP with ScrollTrigger
- Install and configure Lenis for smooth inertia scrolling, wired into GSAP's ticker
- Install framer-motion for smaller UI-level interactions (not the main scroll story)
- Folder structure: /app for routes, /components/chapters for each cinematic chapter,
  /components/scenes for individual scene components, /lib for the scroll engine setup,
  /public/illustrations for placeholder SVG assets
- Add a global ScrollProvider/Lenis setup in the root layout
- Respect prefers-reduced-motion at the root: expose a hook `useReducedMotion()` that
  components can check before running any GSAP animation

Read docs/PRODUCT_VISION.md first for the full technical rationale before setting this up.
Don't build any chapter content yet — just the working skeleton with one placeholder
route per chapter: /, /senders, /travelers, /trust, /company, /contact, /faq.
```

Run it, `npm run dev`, confirm it boots with blank placeholder pages before going further.

---

## 2. Build ONE chapter first — Home — and stop there

Don't ask for all five chapters together. Home is your test case for the entire scroll engine; everything after reuses it.

```
Read docs/PRODUCT_VISION.md and docs/SCENE_SCRIPT.md. Implement ONLY the "Home" chapter
(Chapter 1 in the scene script) on the `/` route.

Build it as 7 scene components under /components/scenes/home/, each one matching a row
in the Home scene table exactly — same visual description, same camera/scroll motion,
same on-screen copy. Use placeholder colored shapes/text instead of final illustrations
for now (I'll swap in real SVGs later) — focus on getting the scroll-driven timing and
pacing right, not the art.

Use GSAP ScrollTrigger with scrub: true so animation progress is tied to scroll position,
not time, per the plan doc. Pin scenes where the plan calls for a pinned camera-style
animation. Respect the useReducedMotion() hook — if true, render each scene as a simple
static stacked block with no pinning or scrubbing.

After building, tell me what to check in the browser at each scene before I move on.
```

Test this thoroughly: scroll speed variations, resize the window, throttle CPU in devtools, toggle `prefers-reduced-motion` in your OS settings. Fix pacing issues *here* — every later chapter inherits whatever's wrong with this one.

---

## 3. Reuse the engine for each remaining chapter (repeat per chapter)

Once Home feels right, use nearly the same prompt shape for each chapter, one at a time:

```
Read docs/SCENE_SCRIPT.md, Chapter [2/3/4/5] — [Senders/Travelers/Trust/Company].
Implement it on the /[route] page, reusing the same scene-component pattern and
ScrollTrigger setup established in the Home chapter (see /components/scenes/home/
for reference). Match the pacing note for this chapter specifically: [paste the
one-line pacing note from the script, e.g. "Trust should move slower and stiller
than Senders/Travelers — less motion, more held stillness"].

Keep using placeholder shapes/colors for art, matched to this chapter's palette from
docs/PRODUCT_VISION.md section 3.1.
```

Doing this chapter-by-chapter also gives you natural commit points — commit working code after each chapter passes your browser check, so a bad prompt never costs you more than one chapter's worth of work.

---

## 4. Prompts for the cross-cutting concerns (do these near the end)

**Mobile simplification:**
```
For every chapter built so far, add a simplified mobile variant per the plan doc:
below the [md/lg] breakpoint, disable pinning and scroll-scrubbing, and instead render
each scene as a static stacked card with a simple fade/slide-in on IntersectionObserver.
Don't touch desktop behavior.
```

**Performance pass:**
```
Audit all chapters for scroll performance. Each scene's assets and ScrollTrigger
instances should only initialize when the scene is about to enter the viewport, not
on initial page load. Use IntersectionObserver or ScrollTrigger's own lazy-loading
patterns. Report any scene still animating or loading assets off-screen.
```

**Analytics instrumentation:**
```
Add scroll-depth and chapter-completion tracking using [Mixpanel/PostHog]. Fire an
event when a visitor's scroll position enters each named scene (use the scene IDs
from docs/SCENE_SCRIPT.md as event names) so we can see exactly where people drop
off in the story.
```

---

## 5. How to work with Cursor + Grok 4.5 day-to-day

- **Scope every prompt to one chapter or one concern.** A prompt that says "build the whole site" will produce something that runs, but the pacing will be wrong everywhere and you won't know where to start fixing it.
- **Always test in the browser before your next prompt**, including a slow scroll and a fast scroll — scrubbed animations feel completely different depending on scroll speed, and that's the entire point of this design.
- **Reference the doc files by name in every prompt** (`docs/SCENE_SCRIPT.md`) rather than re-describing the scene — this keeps every chapter consistent with the locked script instead of drifting.
- **Commit after each working chapter.** If a later prompt breaks something, you want a clean point to roll back to.
- **When something feels "off" but hard to describe**, tell Cursor exactly what's wrong experientially ("scene 3 resolves before I've finished reading the text" / "the pin releases too early") rather than asking it to "make it feel more premium" — concrete scroll-timing feedback gets fixed; vibes-based feedback gets guessed at.
