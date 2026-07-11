"use client";

import type { RefObject } from "react";
import { useStoryScroll } from "@/components/providers/StoryScrollProvider";
import { useSceneActivation } from "./useSceneActivation";
import { useSceneScrollMode } from "./useSceneScrollMode";

/** Gate for pinned desktop scroll scenes — waits until intro is complete. */
export function usePinnedSceneScroll(ref: RefObject<HTMLElement | null>) {
  const { useDesktopScroll } = useSceneScrollMode();
  const { ready } = useStoryScroll();
  return useSceneActivation(ref, useDesktopScroll && ready);
}

/** Gate for flow/reveal desktop scroll scenes */
export function useFlowSceneScroll(ref: RefObject<HTMLElement | null>) {
  const { useDesktopScroll, reducedMotion } = useSceneScrollMode();
  const { ready } = useStoryScroll();
  return useSceneActivation(ref, useDesktopScroll && ready && !reducedMotion);
}
