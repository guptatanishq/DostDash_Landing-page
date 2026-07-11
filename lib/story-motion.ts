/** Shared timing & scroll constants for the cinematic home story */
export const STORY_OVERLAP = "-16vh";
export const STORY_FLOW_OVERLAP = "-8vh";

/** Slight scrub smoothing — feels closer to premium scroll-story sites */
export const STORY_SCRUB = 0.5;

export const STORY_PIN = {
  anticipatePin: 1.2,
  invalidateOnRefresh: true,
  pinSpacing: true,
} as const;

export const STORY_REVEAL = {
  duration: 0.85,
  ease: "power2.out" as const,
  y: 28,
  stagger: 0.08,
};

export const STORY_SCRUB_EASE = "none" as const;
export const STORY_CROSSFADE = 0.03;

/**
 * ScrollTrigger config for pinned story scenes.
 * `end` is derived from the track's real pixel height so pin duration
 * always matches the scroll runway (no empty gaps).
 */
export function storyPinScrollTrigger(
  trigger: HTMLElement,
  panel: HTMLElement,
) {
  return {
    trigger,
    pin: panel,
    start: "top top" as const,
    end: () => `+=${Math.max(trigger.offsetHeight - window.innerHeight, window.innerHeight * 0.25)}`,
    scrub: STORY_SCRUB,
    ...STORY_PIN,
  };
}

/** @deprecated Use storyPinScrollTrigger(trigger, panel) */
export function storyPinConfig() {
  return {
    start: "top top" as const,
    end: "bottom bottom" as const,
    scrub: STORY_SCRUB,
    ...STORY_PIN,
  };
}

export type StoryPanelVariant = "default" | "warm" | "teal" | "dual" | "impact";

const STORY_BASE =
  "linear-gradient(180deg, #0f172a 0%, #1e293b 46%, #0f172a 100%)";

const STORY_ACCENTS: Record<StoryPanelVariant, string> = {
  default:
    "radial-gradient(ellipse 80% 50% at 50% 28%, rgba(20,184,166,0.06) 0%, transparent 55%)",
  warm:
    "radial-gradient(ellipse 70% 45% at 28% 42%, rgba(251,146,60,0.05) 0%, transparent 52%), radial-gradient(ellipse 70% 45% at 72% 42%, rgba(20,184,166,0.04) 0%, transparent 52%)",
  teal:
    "radial-gradient(ellipse 90% 55% at 50% 22%, rgba(56,189,248,0.06) 0%, transparent 55%)",
  dual:
    "radial-gradient(ellipse 55% 45% at 25% 50%, rgba(251,146,60,0.05) 0%, transparent 55%), radial-gradient(ellipse 55% 45% at 75% 50%, rgba(20,184,166,0.05) 0%, transparent 55%)",
  impact:
    "radial-gradient(ellipse 90% 65% at 50% 50%, rgba(20,184,166,0.07) 0%, transparent 58%), radial-gradient(ellipse 55% 40% at 28% 58%, rgba(245,158,11,0.04) 0%, transparent 50%)",
};

export function storyPanelStyle(variant: StoryPanelVariant = "default") {
  return {
    background: `${STORY_ACCENTS[variant]}, ${STORY_BASE}`,
  };
}

export const cinematicBackground = storyPanelStyle;
