"use client";

import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const INTRO_STORAGE_KEY = "dostdrop-cinematic-intro";

export function useCinematicIntro() {
  const reducedMotion = useReducedMotion();
  const [showIntro, setShowIntro] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(INTRO_STORAGE_KEY);
    setShowIntro(!seen && !reducedMotion);
    setHydrated(true);
  }, [reducedMotion]);

  const completeIntro = useCallback(() => {
    sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    setShowIntro(false);
  }, []);

  return {
    showIntro,
    completeIntro,
    hydrated,
  };
}
