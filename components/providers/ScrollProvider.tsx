"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  createScrollEngine,
  destroyScrollEngine,
  initNativeScrollEngine,
  refreshScrollEngine,
  shouldUseSmoothScroll,
} from "@/lib/scroll-engine";
import type Lenis from "lenis";

type ScrollContextValue = {
  lenis: Lenis | null;
  reducedMotion: boolean;
};

const ScrollContext = createContext<ScrollContextValue>({
  lenis: null,
  reducedMotion: false,
});

export function useScrollContext() {
  return useContext(ScrollContext);
}

export function ScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      setLenis(null);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      return;
    }

    const useLenis = shouldUseSmoothScroll();
    let teardownNative: (() => void) | undefined;
    let instance: Lenis | null = null;

    if (useLenis) {
      instance = createScrollEngine();
      setLenis(instance);
      document.documentElement.classList.add("lenis", "lenis-smooth");
    } else {
      teardownNative = initNativeScrollEngine();
      setLenis(null);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    }

    const onResize = () => refreshScrollEngine();
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize);

    const t = window.setTimeout(() => refreshScrollEngine(), 400);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      teardownNative?.();
      destroyScrollEngine(instance);
      setLenis(null);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, [reducedMotion]);

  return (
    <ScrollContext.Provider value={{ lenis, reducedMotion }}>
      {children}
    </ScrollContext.Provider>
  );
}
