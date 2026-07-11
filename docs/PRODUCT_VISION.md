**DostDrop**

**Website Storytelling Experience — Full Creative & Build Plan**

*Prepared for Tanishq Gupta \| Reference inspiration:
eathungrytigers.com, lernpi.ai, apple.com*

1\. Why This Plan Exists

Your vision document is already clear on intent: DostDrop's website
should not read like a typical startup landing page with Features /
Pricing / Testimonials. It should feel like a short film — the visitor
follows one commuter through their day, and the product idea reveals
itself through that journey rather than through bullet points.

This document turns that vision into something buildable: a narrative
structure, a page-by-page creative breakdown, a visual and motion
language, a technical stack matched to your own skillset (Next.js,
React, JS), and a phased roadmap you can actually execute — solo or with
a small team — before your FluxGen internship ends.

2\. The Core Story — "A City That Never Wastes a Trip"

Every scrollytelling site that works (Apple product pages, LernPi's
founder-led explainer flow, EatHungryTigers' illustrated brand stories)
succeeds because it commits to ONE throughline and never breaks it.
Yours is:

> *A city is already moving. DostDrop just gives that movement a
> purpose.*

The recurring character is a guide — an ordinary commuter (let's call
them "the Traveler" in design docs; no need to name them publicly). The
visitor meets this person in the very first scene and follows them, in
some form, through every chapter. This is the single thread that stops
the site from feeling like six disconnected pages.

2.1 Story Spine (maps to your existing chapter list)

Your vision doc already defines the chapters: Home, Senders, Travelers,
Trust, Company, Contact/FAQ. Below is how each becomes a continuous
scene rather than a static section.

| **Chapter**   | **Story Beat**                                                                                                                                                                                                                 | **Emotional Goal**            |
|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------|
| Home          | The city wakes up. Thousands of dots move across a map at dawn. We zoom into one — the Traveler, leaving for work. A request appears somewhere else in the city. The idea is stated, not explained.                            | Wonder + curiosity            |
| Senders       | We meet the other half of the story: someone who needs an item from a place they can't get to. We follow their small, human moment of need → opening the app → posting a request → watching it get matched.                    | Relatability + relief         |
| Travelers     | Back to our guide. Mid-commute, a notification. A small detour. A pickup. A short scene of the delivery. Then: the earnings tick up. This is where the value prop for travelers lands emotionally before it lands financially. | Empowerment + reward          |
| Trust         | The story pauses. The pace slows down. This is the 'invisible thread' chapter — verification, live GPS, escrowed payment, delivery proof — shown as the quiet system holding the whole city together.                          | Confidence + safety           |
| Company       | Camera pulls all the way back out. The single dot becomes thousands of glowing routes across the whole city map. Vision statement. Where this goes next.                                                                       | Scale + belief in the mission |
| Contact / FAQ | Deliberately NOT cinematic. Clean, fast, utilitarian — same design system, but the story pauses here because these are lookup pages, not narrative ones.                                                                       | Clarity + trust               |

3\. Visual & Creative Direction

You asked to blend eathungrytigers.com, lernpi.ai, and apple.com. These
three don't conflict — they each solve a different part of your problem:

- **Apple → teaches you restraint: one idea per screen, huge confident
  typography, scroll that behaves like a camera (pin, zoom, dolly),
  generous negative space, motion that is smooth but never gimmicky.**

- **LernPi.ai → teaches you warmth: founder-voice tone, human
  illustration over stock photography, an explainer flow that never
  feels corporate or cold.**

- **EatHungryTigers → teaches you character: bold illustrated scenes, a
  recurring visual character the reader follows, comic-panel-like scene
  transitions, color used to carry mood.**

The synthesis: Apple's restraint and pacing, told through LernPi's human
warmth, using EatHungryTigers' illustrated character technique.

3.1 Art Style Recommendation

Use a flat-to-semi-dimensional illustrated city (not photo-realistic,
not overly corporate flat-icon style). Think: layered vector
illustration with subtle depth via parallax, similar to modern editorial
scrollytelling pieces, but with a single consistent "Traveler" character
redrawn in different poses across chapters.

Time-of-day color grading is your strongest storytelling tool and it's
free: shift the palette per chapter so scrolling itself feels like a day
passing.

| **Chapter** | **Palette Mood**                                 | **Notes**                                 |
|-------------|--------------------------------------------------|-------------------------------------------|
| Home        | Dawn — soft blue-grey to pale amber              | City waking up, low contrast, calm        |
| Senders     | Warm daylight — cream, soft orange, teal accents | Everyday, approachable, human             |
| Travelers   | Golden hour — amber, rust, deep teal             | Motion-forward, energetic, rewarding      |
| Trust       | Dusk / deep navy                                 | Slower pace, calm confidence, less motion |
| Company     | Night city glow — navy with glowing route lines  | Scale, ambition, forward-looking          |

3.2 Typography

- Display / narrative headlines: one confident, large-scale serif or
  grotesk sans (Apple-style) used ONLY for story beats — short lines,
  never paragraphs.

- Body / UI: a clean humanist sans (Inter, General Sans, or Satoshi) for
  anything functional — FAQ, forms, footers.

- Rule of thumb: if a sentence needs more than ~12 words on a story
  screen, it's not a story screen anymore — cut it or move it to a
  caption.

4\. Motion & Interaction System

This is what actually makes a site feel like Apple/EatHungryTigers
instead of a normal page with animations bolted on. The scroll position
should always feel like it's controlling a camera or a character, not
just fading elements in.

- Pinned scroll scenes: the background scene stays fixed while scroll
  progress drives an animation timeline inside it (Traveler walking,
  request card appearing, map dot moving).

- Scroll-scrubbed animation: tie animation progress directly to scroll
  position (not time) so fast scrolling = fast story, slow scrolling =
  slow story — this is the exact mechanic Apple product pages use.

- Parallax depth: sky / skyline / street / foreground character move at
  different speeds to sell depth without 3D rendering cost.

- Scene transitions as "cuts": treat each chapter boundary like a film
  cut — a brief color-wash or shape transition, not just a hard page
  load.

- Micro-interactions kept honest: hover states on request cards, a
  live-feeling counter for traveler earnings, a pulsing GPS dot — small,
  not distracting.

Important restraint note: EatHungryTigers-style whimsy is best used in
the Senders/Travelers chapters (human, warm) and dialed back in Trust
(calmer, more Apple-like precision) — this contrast is intentional and
keeps the site from feeling one-note.

5\. Technical Stack Recommendation

Matched to your existing stack (Next.js, React, JS) so you can build
this yourself without learning a new framework.

| **Layer**                       | **Recommendation**                   | **Why**                                                                                                                            |
|---------------------------------|--------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| Framework                       | Next.js 15 (App Router)              | You already used this for the school website rebuild — same foundation, route per chapter                                          |
| Scroll engine                   | GSAP + ScrollTrigger                 | Industry standard for exactly this kind of pinned, scrubbed scrollytelling; used behind many Apple-style sites                     |
| Smooth inertia scroll           | Lenis                                | Gives that "buttery" Apple scroll feel on top of native scroll                                                                     |
| Illustration / character motion | SVG animation or Lottie/Rive         | Lightweight vector animation for the Traveler character and city scenes; avoids heavy 3D cost                                      |
| Optional stretch (Phase 2)      | Three.js / Spline for a 3D city hero | Only if Home chapter needs a literal 3D city — heavier, treat as a v2 enhancement, not MVP                                         |
| Hosting                         | Vercel                               | Native fit for Next.js, easy previews per feature branch                                                                           |
| Analytics                       | Mixpanel or PostHog                  | You already have Mixpanel experience from the FluxGen Aquagen work — track scroll depth and chapter completion, not just pageviews |

6\. Site Map

| **Route**  | **Type**                        | **Notes**                                                                                    |
|------------|---------------------------------|----------------------------------------------------------------------------------------------|
| /          | Cinematic chapter               | Home — the city wakes up, story begins                                                       |
| /senders   | Cinematic chapter               | Continues story from sender's POV, ends with a soft CTA to post a request (waitlist for MVP) |
| /travelers | Cinematic chapter               | Continues story from Traveler's POV, ends with CTA to join as an early traveler              |
| /trust     | Cinematic chapter (slower pace) | Safety and verification systems explained visually                                           |
| /company   | Cinematic chapter (wide shot)   | Vision, mission, roadmap, "why now"                                                          |
| /contact   | Utility page                    | Simple form, no scroll-story                                                                 |
| /faq       | Utility page                    | Accordion-style, plain and fast                                                              |

7\. Content & Asset Checklist

Do this before writing any code — the story has to work as a storyboard
first, exactly like a short film script, or the build will drift.

- Traveler character sheet: 6–8 poses (commuting, noticing notification,
  detour walk, pickup, handoff, earnings moment)

- Sender character (can be several different people across chapters to
  show breadth of use cases)

- City layers: sky, skyline silhouette, mid-ground streets, foreground
  detail — each as separate assets for parallax

- Icon set: verification badge, live GPS pin, wallet/escrow, chat
  bubble, delivery confirmation checkmark

- Micro-copy for every scene — one short cinematic line per screen, not
  paragraphs (write these like subtitles, not marketing copy)

- A written storyboard/script document (scene-by-scene) reviewed and
  locked before any illustration or animation work starts

8\. Accessibility & Fallback (non-negotiable)

Scrollytelling sites frequently fail here — don't repeat that mistake.

- Respect prefers-reduced-motion: serve a simplified, mostly-static
  version of each chapter (stacked cards, no pinning) for users who opt
  out of motion.

- Every story beat needs a plain-text equivalent for screen readers —
  the narrative shouldn't only exist visually.

- Mobile gets a simplified version of pinned/scrubbed scenes — full
  desktop-style pinning is often janky on phones; Apple itself ships
  lighter mobile variants of these pages.

- Keep total media weight in check: compress illustrations to SVG/WebP,
  lazy-load each chapter's assets only when it's about to enter view.

9\. Build Roadmap

| **Phase**               | **Focus**                                                                                                         | **Output**                                                                            |
|-------------------------|-------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| 0 — Story Lock          | Write the full scene-by-scene script across all chapters; rough storyboard sketches                               | Locked narrative script (this is the actual hard part — do not skip)                  |
| 1 — Design System       | Character design, city layers, color/type system, Figma prototype of the Home chapter only                        | Clickable prototype of one chapter to validate the feel before building anything else |
| 2 — Home Chapter Build  | Next.js + GSAP/Lenis scroll engine built and performance-tested on Home only                                      | Working, deployed Home page — this proves the technical approach                      |
| 3 — Senders & Travelers | Reuse the scroll engine and design system from Phase 2 for the two POV chapters                                   | Two more cinematic chapters live                                                      |
| 4 — Trust & Company     | Slower-paced Trust chapter, wide-shot Company chapter                                                             | Full narrative site complete                                                          |
| 5 — Utility Pages       | Contact & FAQ, plain and fast                                                                                     | Full site map complete                                                                |
| 6 — Polish & QA         | Reduced-motion fallback, mobile simplification, cross-browser and cross-device testing, analytics instrumentation | Launch-ready site                                                                     |

10\. Starter Hero Copy Options

A few directions for the very first line the visitor reads, before any
story motion begins — pick the tone that matches how emotional vs.
practical you want the opening beat to feel:

> *Every day, this city moves. DostDrop just gives that movement a
> purpose.*
>
> *You're already going there. Someone just needed you to stop for a
> minute.*
>
> *Access what's not near you — through people who already are.*

11\. Immediate Next Step

The single highest-leverage thing to do before touching Figma or code is
Phase 0: write the full scene-by-scene script for all five cinematic
chapters as a shared document (like a shot list). Once that's locked,
the design and build phases move fast because every decision downstream
just serves an already-agreed story.

If it's useful, I can draft that full scene-by-scene script next —
screen by screen, with the exact micro-copy and motion direction for
each beat of Home, Senders, Travelers, Trust, and Company.
