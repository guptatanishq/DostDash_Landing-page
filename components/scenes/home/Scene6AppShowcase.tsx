"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { useSceneScrollMode } from "@/hooks/useSceneScrollMode";
import { usePinnedSceneScroll } from "@/hooks/usePinnedSceneScroll";
import { scheduleSceneScrollRefresh } from "@/lib/scroll-engine";
import { SceneGate } from "@/components/scenes/SceneGate";
import { SceneGrain } from "@/components/design/SceneGrain";
import {
  APP_SCREENS,
  AppScreenRail,
  FloatingDeviceShowcase,
} from "@/components/hero/app-screens/FloatingDeviceShowcase";
import { SceneTrack } from "./shared";
import { STORY_CROSSFADE, storyPanelStyle, storyPinScrollTrigger } from "@/lib/story-motion";

const SCREEN_COUNT = APP_SCREENS.length;
const SEG = 1 / SCREEN_COUNT;

function transitionScreen(
  tl: gsap.core.Timeline,
  layers: Element[],
  from: number,
  to: number,
  at: number,
) {
  const dur = STORY_CROSSFADE;
  if (from !== to) {
    tl.to(layers[from], { opacity: 0, y: -10, duration: dur, ease: "none" }, at)
      .fromTo(layers[to], { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: dur, ease: "none" }, at);
  }
}

function activateDot(
  tl: gsap.core.Timeline,
  dots: Element[],
  labels: Element[],
  to: number,
  at: number,
) {
  const accent = APP_SCREENS[to].accent;
  tl.to(dots, { scale: 1, opacity: 0.25, backgroundColor: "rgba(255,255,255,0.2)", duration: 0.01, ease: "none" }, at)
    .to(dots[to], { scale: 1.5, opacity: 1, backgroundColor: accent, duration: 0.03, ease: "none" }, at)
    .to(labels, { opacity: 0.35, duration: 0.01, ease: "none" }, at)
    .to(labels[to], { opacity: 0.95, duration: 0.03, ease: "none" }, at);
}

export function Scene6AppShowcase() {
  const { reducedMotion } = useSceneScrollMode();
  const trackRef = useRef<HTMLElement>(null);
  const sceneActive = usePinnedSceneScroll(trackRef);
  const panelRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (!sceneActive || !trackRef.current || !panelRef.current || !showcaseRef.current) return;
    registerGsapPlugins();

    const ctx = gsap.context(() => {
      const root = showcaseRef.current!;
      const primary = root.querySelector('[data-device="primary"]');
      const satLeft = root.querySelector('[data-device="satellite-left"]');
      const satRight = root.querySelector('[data-device="satellite-right"]');
      const connector = root.querySelector(".device-showcase__connector");
      const glow = root.querySelector(".device-showcase__glow--primary");
      const layers = Array.from(root.querySelectorAll<HTMLElement>(".device-screen-layer"));
      const dots = panelRef.current!.querySelectorAll("[data-screen-dot]");
      const labels = panelRef.current!.querySelectorAll("[data-screen-label]");
      const caption = root.querySelectorAll("[data-screen-caption]");

      const tl = gsap.timeline({
        scrollTrigger: storyPinScrollTrigger(trackRef.current!, panelRef.current!),
      });

      tl.fromTo(titleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: SEG * 0.4, ease: "none" }, 0)
        .fromTo(root, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: SEG * 0.5, ease: "none" }, 0);

      if (primary) {
        tl.to(
          primary,
          {
            rotateY: 14,
            rotateX: -6,
            y: -24,
            duration: 1,
            ease: "none",
          },
          0,
        );
      }

      if (satLeft) {
        tl.fromTo(
          satLeft,
          { x: -30, rotateY: -18, rotateX: 8, opacity: 0.7 },
          { x: 0, rotateY: -22, rotateX: 6, opacity: 1, duration: 1, ease: "none" },
          0,
        );
      }

      if (satRight) {
        tl.fromTo(
          satRight,
          { x: 30, rotateY: 18, rotateX: 8, opacity: 0.7 },
          { x: 0, rotateY: 22, rotateX: 6, opacity: 1, duration: 1, ease: "none" },
          0,
        );
      }

      if (connector) {
        tl.fromTo(connector, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 0.6, duration: SEG * 2, ease: "none" }, SEG * 0.5);
      }

      if (glow) {
        tl.to(glow, { scale: 1.15, opacity: 0.9, duration: 1, ease: "none" }, 0);
      }

      activateDot(tl, Array.from(dots), Array.from(labels), 0, 0);

      for (let i = 1; i < SCREEN_COUNT; i++) {
        const at = SEG * i;
        transitionScreen(tl, layers, i - 1, i, at);
        if (caption.length) {
          tl.to(caption[i - 1], { opacity: 0, y: -4, duration: 0.02, ease: "none" }, at)
            .fromTo(caption[i], { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.02, ease: "none" }, at);
        }
        activateDot(tl, Array.from(dots), Array.from(labels), i, at);

        if (primary) {
          const wobble = i % 2 === 0 ? 4 : -4;
          tl.to(primary, { rotateY: 14 + wobble, duration: SEG * 0.3, ease: "none" }, at);
        }
      }
    }, trackRef);

    scheduleSceneScrollRefresh();
    return () => ctx.revert();
  }, [sceneActive]);

  const copy = APP_SCREENS.map((s) => s.label).join(" → ");

  return (
    <SceneGate
      reducedMotion={reducedMotion}
      scene={6}
      copy={copy}
      desktop={
        <SceneTrack ref={trackRef} scene={6} className="relative h-[420vh]">
          <div
            ref={panelRef}
            className="story-panel scene-panel relative h-screen w-full overflow-hidden"
            style={storyPanelStyle()}
          >
            <SceneGrain />

            <p
              ref={titleRef}
              className="pointer-events-none absolute left-0 right-0 top-16 z-20 px-6 text-center text-xs font-medium uppercase tracking-[0.22em] text-white/45 opacity-0 md:top-20"
            >
              The app behind every delivery
            </p>

            <div ref={showcaseRef} className="absolute inset-x-4 inset-y-20 md:inset-x-8 md:inset-y-24">
              <FloatingDeviceShowcase />
            </div>

            <div className="absolute bottom-10 left-0 right-0 z-20 px-4 md:bottom-14">
              <AppScreenRail />
            </div>

            <p className="sr-only">{copy}</p>
          </div>
        </SceneTrack>
      }
    >
      <FloatingDeviceShowcase variant="showcase" className="scale-75" />
    </SceneGate>
  );
}
