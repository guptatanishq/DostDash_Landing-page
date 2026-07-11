"use client";

import type { RefObject } from "react";
import { useSceneActivation } from "./useSceneActivation";

/**
 * @deprecated Use useSceneActivation or usePinnedSceneScroll instead.
 * Kept for compatibility — now activates immediately when enabled.
 */
export function useLazySceneActivation(
  ref: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  return useSceneActivation(ref, enabled);
}
