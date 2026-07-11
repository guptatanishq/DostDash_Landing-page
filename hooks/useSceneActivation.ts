"use client";

import type { RefObject } from "react";
import { useStoryScroll } from "@/components/providers/StoryScrollProvider";
import { useStoryViewport } from "@/hooks/useStoryViewport";
import { useSceneScrollMode } from "./useSceneScrollMode";

/**
 * Returns true once scroll-driven scene animations are allowed to initialize.
 * No async delay — must be synchronous so useLayoutEffect can pin on first frame.
 */
export function useSceneActivation(
  _ref: RefObject<HTMLElement | null>,
  enabled: boolean,
): boolean {
  return enabled;
}
