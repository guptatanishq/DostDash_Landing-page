"use client";

import { useSyncExternalStore } from "react";

export type StoryViewportTier =
  | "phone-portrait"
  | "phone-landscape"
  | "tablet"
  | "desktop";

const TRACK_SCALE: Record<StoryViewportTier, number> = {
  "phone-portrait": 0.72,
  "phone-landscape": 0.55,
  tablet: 0.82,
  desktop: 1,
};

export function getStoryViewportTier(): StoryViewportTier {
  if (typeof window === "undefined") return "desktop";

  const w = window.innerWidth;
  const h = window.innerHeight;
  const landscape = w > h;

  if (landscape && h < 520) return "phone-landscape";
  if (w < 640) return "phone-portrait";
  if (w < 1024) return "tablet";
  return "desktop";
}

export function getStoryTrackHeightVh(baseVh: number, tier = getStoryViewportTier()): number {
  return Math.max(Math.round(baseVh * TRACK_SCALE[tier]), Math.round(180 * TRACK_SCALE[tier]));
}

export function isStackedJourneyLayout(tier: StoryViewportTier): boolean {
  return tier === "phone-portrait";
}

function subscribe(onStoreChange: () => void) {
  const onChange = () => onStoreChange();
  window.addEventListener("resize", onChange, { passive: true });
  window.addEventListener("orientationchange", onChange);
  return () => {
    window.removeEventListener("resize", onChange);
    window.removeEventListener("orientationchange", onChange);
  };
}

function getSnapshot(): StoryViewportTier {
  return getStoryViewportTier();
}

function getServerSnapshot(): StoryViewportTier {
  return "desktop";
}

export function useStoryViewport() {
  const tier = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return {
    tier,
    trackScale: TRACK_SCALE[tier],
    isPhone: tier === "phone-portrait" || tier === "phone-landscape",
    isLandscape: tier === "phone-landscape",
    isStackedLayout: isStackedJourneyLayout(tier),
    trackHeight: (baseVh: number) => getStoryTrackHeightVh(baseVh, tier),
  };
}
