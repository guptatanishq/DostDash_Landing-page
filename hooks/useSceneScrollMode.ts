"use client";

import { useReducedMotion } from "./useReducedMotion";

/** Cinematic pinned scroll is enabled on all devices unless reduced-motion is on. */
export function useSceneScrollMode() {
  const reducedMotion = useReducedMotion();

  return {
    reducedMotion,
    useCinematicScroll: !reducedMotion,
    /** @deprecated Use useCinematicScroll */
    useDesktopScroll: !reducedMotion,
    isMobile: false,
  };
}
