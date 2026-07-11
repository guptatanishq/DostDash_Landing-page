"use client";

import type { RefObject } from "react";
import { useStoryScroll } from "@/components/providers/StoryScrollProvider";
import { useStoryViewport } from "@/hooks/useStoryViewport";
import { useSceneActivation } from "./useSceneActivation";
import { useSceneScrollMode } from "./useSceneScrollMode";

/** Gate for pinned scroll scenes — waits until intro is complete. */
export function usePinnedSceneScroll(ref: RefObject<HTMLElement | null>) {
  const { useCinematicScroll } = useSceneScrollMode();
  const { ready } = useStoryScroll();
  const { tier } = useStoryViewport();
  const active = useSceneActivation(ref, useCinematicScroll && ready);

  return { active, tier };
}

/** Gate for flow/reveal scroll scenes */
export function useFlowSceneScroll(ref: RefObject<HTMLElement | null>) {
  const { useCinematicScroll, reducedMotion } = useSceneScrollMode();
  const { ready } = useStoryScroll();
  const { tier } = useStoryViewport();
  const active = useSceneActivation(ref, useCinematicScroll && ready && !reducedMotion);

  return { active, tier };
}
