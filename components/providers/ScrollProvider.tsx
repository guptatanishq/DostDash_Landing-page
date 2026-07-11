"use client";

import Lenis from "lenis";
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
  refreshScrollEngine,
} from "@/lib/scroll-engine";

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

    const instance = createScrollEngine();
    setLenis(instance);
    document.documentElement.classList.add("lenis", "lenis-smooth");

    const onResize = () => refreshScrollEngine();
    window.addEventListener("resize", onResize, { passive: true });

    const t = window.setTimeout(() => refreshScrollEngine(), 400);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", onResize);
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
