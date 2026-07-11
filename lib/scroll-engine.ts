import Lenis from "lenis";
import { gsap, ScrollTrigger, registerGsapPlugins } from "./gsap";

let tickerCallback: ((time: number) => void) | null = null;
let lenisInstance: Lenis | null = null;

/**
 * Lenis 1.x runs on native scroll — ScrollTrigger reads window.scrollY directly.
 * Do NOT use scrollerProxy on document; that fights native scroll and breaks pin.
 * @see https://github.com/darkroomengineering/lenis#gsap-scrolltrigger
 */
export function createScrollEngine(): Lenis {
  registerGsapPlugins();

  const lenis = new Lenis({
    lerp: 0.08,
    duration: 1.1,
    smoothWheel: true,
    wheelMultiplier: 0.85,
    touchMultiplier: 1,
    autoRaf: false,
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
