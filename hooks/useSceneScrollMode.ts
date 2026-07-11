"use client";

import { useIsMobile } from "./useIsMobile";
import { useReducedMotion } from "./useReducedMotion";

export function useSceneScrollMode() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  return {
    reducedMotion,
    isMobile,
    useDesktopScroll: !reducedMotion && !isMobile,
  };
}
