import Lenis from "lenis";
import { gsap, ScrollTrigger, registerGsapPlugins } from "./gsap";

let tickerCallback: ((time: number) => void) | null = null;
let lenisInstance: Lenis | null = null;

/** Fine-pointer desktops get Lenis; touch devices use native scroll for reliable GSAP pin */
export function shouldUseSmoothScroll(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

/**
 * Lenis on desktop wheel only. Touch devices use native scroll so ScrollTrigger
 * pin/scrub stays in sync (same pattern as premium scroll-story sites).
 */
export function createScrollEngine(): Lenis {
  registerGsapPlugins();

  const lenis = new Lenis({
    lerp: 0.08,
    duration: 1.1,
    smoothWheel: true,
    wheelMultiplier: 0.85,
    autoRaf: false,
    syncTouch: false,
  });

  lenisInstance = lenis;

  lenis.on("scroll", ScrollTrigger.update);

  tickerCallback = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

/** Register GSAP + native scroll listener when Lenis is off (phones/tablets) */
export function initNativeScrollEngine() {
  registerGsapPlugins();

  const onScroll = () => ScrollTrigger.update();
  window.addEventListener("scroll", onScroll, { passive: true });

  return () => {
    window.removeEventListener("scroll", onScroll);
  };
}

export function destroyScrollEngine(lenis: Lenis | null) {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }

  ScrollTrigger.clearScrollMemory();
  lenisInstance = null;
  lenis?.destroy();
}

export function refreshScrollEngine() {
  lenisInstance?.resize();
  ScrollTrigger.refresh(true);
}

/** Call after a scene mounts its ScrollTriggers so pin spacers recalculate */
export function scheduleSceneScrollRefresh() {
  requestAnimationFrame(() => refreshScrollEngine());
}

export function getLenisInstance() {
  return lenisInstance;
}
