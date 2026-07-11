"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const INTRO_STORAGE_KEY = "dostdrop-cinematic-intro";
const REPLAY_FLAG_KEY = "dostdrop-replay-intro";

type CinematicIntroContextValue = {
  showIntro: boolean;
  hydrated: boolean;
  introKey: number;
  completeIntro: () => void;
  replayIntro: () => void;
};

const CinematicIntroContext = createContext<CinematicIntroContextValue>({
  showIntro: false,
  hydrated: false,
  introKey: 0,
  completeIntro: () => {},
  replayIntro: () => {},
});

export function useCinematicIntroContext() {
  return useContext(CinematicIntroContext);
}

/** @deprecated Use useCinematicIntroContext */
export function useCinematicIntro() {
  return useCinematicIntroContext();
}

export function CinematicIntroProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const [showIntro, setShowIntro] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const [introKey, setIntroKey] = useState(0);

  useEffect(() => {
    const seen = sessionStorage.getItem(INTRO_STORAGE_KEY);
    const forceReplay = sessionStorage.getItem(REPLAY_FLAG_KEY);
    if (forceReplay) sessionStorage.removeItem(REPLAY_FLAG_KEY);

    setShowIntro((!seen && !reducedMotion) || (!!forceReplay && !reducedMotion));
    setHydrated(true);
  }, [reducedMotion]);

  useEffect(() => {
    if (pathname !== "/" || reducedMotion) return;

    const forceReplay = sessionStorage.getItem(REPLAY_FLAG_KEY);
    if (!forceReplay) return;

    sessionStorage.removeItem(REPLAY_FLAG_KEY);
    sessionStorage.removeItem(INTRO_STORAGE_KEY);
    window.scrollTo({ top: 0, behavior: "instant" });
    setIntroKey((k) => k + 1);
    setShowIntro(true);
  }, [pathname, reducedMotion]);

  useLayoutEffect(() => {
    const booting = !hydrated || showIntro;
    document.body.classList.toggle("story-booting", booting);
    return () => document.body.classList.remove("story-booting");
  }, [hydrated, showIntro]);

  const completeIntro = useCallback(() => {
    sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    setShowIntro(false);
  }, []);

  const replayIntro = useCallback(() => {
    if (reducedMotion) return;
    sessionStorage.removeItem(INTRO_STORAGE_KEY);
    window.scrollTo({ top: 0, behavior: "instant" });
    setIntroKey((k) => k + 1);
    setShowIntro(true);
  }, [reducedMotion]);

  return (
    <CinematicIntroContext.Provider
      value={{ showIntro, hydrated, introKey, completeIntro, replayIntro }}
    >
      {children}
    </CinematicIntroContext.Provider>
  );
}

export function requestIntroReplayFromRoute() {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(REPLAY_FLAG_KEY, "1");
  }
}
