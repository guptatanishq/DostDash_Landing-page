"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Returns true once scroll-driven scene animations are allowed to initialize.
 * Immediate when enabled — no IntersectionObserver delay (that caused empty
 * scroll gaps before ScrollTrigger pinned sections).
 */
export function useSceneActivation(
  _ref: RefObject<HTMLElement | null>,
  enabled: boolean,
): boolean {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(enabled);
  }, [enabled]);

  return isActive;
}
