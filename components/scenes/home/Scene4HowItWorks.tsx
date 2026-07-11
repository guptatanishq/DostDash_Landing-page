"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useSceneScrollMode } from "@/hooks/useSceneScrollMode";
import { scheduleSceneScrollRefresh } from "@/lib/scroll-engine";
import { usePinnedSceneScroll } from "@/hooks/usePinnedSceneScroll";
import { SceneGate } from "@/components/scenes/SceneGate";
import { SceneGrain } from "@/components/design/SceneGrain";
import {
  JOURNEY_POINTS,
  JourneyMapCanvas,
} from "@/components/hero/JourneyMapCanvas";
import {
  JourneyPhonePreview,
  JourneyStageRail,
  STAGES,
} from "@/components/hero/JourneyPhonePreview";
import { SceneTrack } from "./shared";
import { STORY_CROSSFADE, storyPanelStyle, storyPinScrollTrigger } from "@/lib/story-motion";

gsap.registerPlugin(MotionPathPlugin);

const STAGE_COUNT = STAGES.length;
const SEG = 1 / STAGE_COUNT;

function crossfadeStage(
  tl: gsap.core.Timeline,
  layers: Element[],
  dots: Element[],
  labels: Element[],
  from: number,
  to: number,
  at: number,
) {
  const dur = STORY_CROSSFADE;
  tl.to(layers[from], { opacity: 0, duration: dur, ease: "none" }, at)
    .to(layers[to], { opacity: 1, duration: dur, ease: "none" }, at)
    .to(dots, { scale: 1, opacity: 0.25, duration: 0.01, ease: "none" }, at)
    .to(dots[to], { scale: 1.8, opacity: 1, duration: dur, ease: "none" }, at)
    .to(labels, { opacity: 0.4, duration: 0.01, ease: "none" }, at)
    .to(labels[to], { opacity: 0.95, duration: dur, ease: "none" }, at);
}

export function Scene4HowItWorks() {
  const { reducedMotion } = useSceneScrollMode();
  const trackRef = useRef<HTMLElement>(null);
  const { active: sceneActive, tier } = usePinnedSceneScroll(trackRef);
  const panelRef = useRef<HTMLDivElement>(null);
  const mapWrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<SVGSVGElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (!sceneActive || !trackRef.current || !panelRef.current || !canvasRef.current) return;
    registerGsapPlugins();

    const ctx = gsap.context(() => {
      const svg = canvasRef.current!;
      const route = svg.querySelector(".journey-route") as SVGPathElement | null;
      const scanLines = svg.querySelector(".journey-scan-lines");
      const senderPin = svg.querySelector(".journey-sender-pin");
      const pickupPin = svg.querySelector(".journey-pickup-pin");
      const destPin = svg.querySelector(".journey-dest-pin");
      const travelerPin = svg.querySelector(".journey-traveler-pin");
      const packageG = svg.querySelector(".journey-package");
      const check = svg.querySelector(".journey-delivered-check");

      const tl = gsap.timeline({
        scrollTrigger: storyPinScrollTrigger(trackRef.current!, panelRef.current!),
      });

      if (!route || !travelerPin) return;

      const routeEl = route;
      const len = routeEl.getTotalLength();
      gsap.set(routeEl, { strokeDasharray: len, strokeDashoffset: len });

      if (check) {
        gsap.set(check, { x: JOURNEY_POINTS.destination.x, y: JOURNEY_POINTS.destination.y });
      }

      const uiLayers = phoneRef.current
        ? Array.from(phoneRef.current.querySelectorAll<HTMLElement>(".journey-ui-layer"))
        : [];
      const dots = panelRef.current
        ? Array.from(panelRef.current.querySelectorAll<HTMLElement>(".journey-stage-dot"))
        : [];
      const labels = panelRef.current
        ? Array.from(panelRef.current.querySelectorAll<HTMLElement>(".journey-stage-label"))
        : [];

      // Stage 1: Create Request
      tl.fromTo(titleRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: SEG * 0.4, ease: "none" }, 0)
        .fromTo(senderPin, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: SEG * 0.5, ease: "none" }, 0)
        .fromTo(mapWrapRef.current, { scale: 1.05 }, { scale: 1, duration: SEG, ease: "none" }, 0)
        .fromTo(routeEl, { opacity: 0 }, { opacity: 1, duration: SEG * 0.3, ease: "none" }, SEG * 0.5);

      // Stage 2: Smart Matching
      crossfadeStage(tl, uiLayers, dots, labels, 0, 1, SEG);
      tl.fromTo(scanLines, { opacity: 0 }, { opacity: 1, duration: SEG * 0.4, ease: "none" }, SEG)
        .to(routeEl, { strokeDashoffset: len * 0.35, duration: SEG * 0.8, ease: "none" }, SEG)
        .to(scanLines, { opacity: 0, duration: SEG * 0.3, ease: "none" }, SEG * 1.8);

      // Stage 3: Traveler Accepts
      crossfadeStage(tl, uiLayers, dots, labels, 1, 2, SEG * 2);
      tl.fromTo(travelerPin, { opacity: 0 }, { opacity: 1, duration: SEG * 0.3, ease: "none" }, SEG * 2)
        .fromTo(pickupPin, { opacity: 0 }, { opacity: 1, duration: SEG * 0.3, ease: "none" }, SEG * 2 + 0.02)
        .fromTo(destPin, { opacity: 0 }, { opacity: 1, duration: SEG * 0.3, ease: "none" }, SEG * 2 + 0.02);

      gsap.set(travelerPin, {
        motionPath: { path: routeEl, align: routeEl, alignOrigin: [0.5, 0.5], start: 0, end: 0 },
      });
      tl.to(travelerPin, {
        motionPath: { path: routeEl, align: routeEl, alignOrigin: [0.5, 0.5], start: 0, end: 0.08 },
        duration: SEG * 0.6,
        ease: "none",
      }, SEG * 2 + 0.05);

      // Stage 4: Pickup
      crossfadeStage(tl, uiLayers, dots, labels, 2, 3, SEG * 3);
      tl.to(routeEl, { strokeDashoffset: len * 0.55, duration: SEG * 0.7, ease: "none" }, SEG * 3)
        .to(travelerPin, {
          motionPath: { path: routeEl, align: routeEl, alignOrigin: [0.5, 0.5], start: 0.08, end: 0.42 },
          duration: SEG * 0.8,
          ease: "none",
        }, SEG * 3)
        .fromTo(packageG, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: SEG * 0.35, ease: "none" }, SEG * 3 + 0.04)
        .to(packageG, {
          motionPath: { path: routeEl, align: routeEl, alignOrigin: [0.5, 0.5], start: 0.42, end: 0.42 },
          duration: 0.01,
          ease: "none",
        }, SEG * 3 + 0.04);

      // Stage 5: Live Tracking
      crossfadeStage(tl, uiLayers, dots, labels, 3, 4, SEG * 4);
      tl.to(routeEl, { strokeDashoffset: 0, duration: SEG * 0.6, ease: "none" }, SEG * 4)
        .to(travelerPin, {
          motionPath: { path: routeEl, align: routeEl, alignOrigin: [0.5, 0.5], start: 0.42, end: 0.78 },
          duration: SEG * 0.85,
          ease: "none",
        }, SEG * 4)
        .to(packageG, {
          motionPath: { path: routeEl, align: routeEl, alignOrigin: [0.5, 0.5], start: 0.42, end: 0.78 },
          duration: SEG * 0.85,
          ease: "none",
        }, SEG * 4);

      // Stage 6: OTP Verification
      crossfadeStage(tl, uiLayers, dots, labels, 4, 5, SEG * 5);
      tl.to(travelerPin, {
        motionPath: { path: routeEl, align: routeEl, alignOrigin: [0.5, 0.5], start: 0.78, end: 0.88 },
        duration: SEG * 0.5,
        ease: "none",
      }, SEG * 5);

      // Stage 7: Delivery Complete
      crossfadeStage(tl, uiLayers, dots, labels, 5, 6, SEG * 6);
      tl.to(travelerPin, {
        motionPath: { path: routeEl, align: routeEl, alignOrigin: [0.5, 0.5], start: 0.88, end: 1 },
        duration: SEG * 0.5,
        ease: "none",
      }, SEG * 6)
        .to(packageG, { opacity: 0, scale: 0.5, duration: SEG * 0.25, ease: "none" }, SEG * 6 + 0.03)
        .fromTo(check, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: SEG * 0.4, ease: "none" }, SEG * 6 + 0.05);

      // Stage 8: Reward Released
      crossfadeStage(tl, uiLayers, dots, labels, 6, 7, SEG * 7);
      tl.to(mapWrapRef.current, { scale: 0.98, duration: SEG * 0.5, ease: "none" }, SEG * 7);
    }, trackRef);

    scheduleSceneScrollRefresh();
    return () => ctx.revert();
  }, [sceneActive, tier]);

  const copy = STAGES.join(" → ");

  return (
    <SceneGate
      reducedMotion={reducedMotion}
      scene={4}
      copy={copy}
      desktop={
        <SceneTrack ref={trackRef} scene={4} baseVh={400}>
          <div
            ref={panelRef}
            className="story-panel scene-panel relative h-screen min-h-[100dvh] w-full overflow-hidden"
            style={storyPanelStyle()}
          >
            <SceneGrain />

            <p
              ref={titleRef}
              className="pointer-events-none absolute left-0 right-0 top-20 z-20 px-6 text-center text-xs font-medium uppercase tracking-[0.25em] text-white/50 opacity-0 md:top-24 md:text-sm"
            >
              How DostDrop works
            </p>

            <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center gap-4 px-4 pb-20 pt-20 sm:gap-6 sm:px-6 sm:pb-24 sm:pt-24 md:flex-row md:items-center md:gap-12 md:px-10 md:pb-24 md:pt-28">
              <div ref={mapWrapRef} className="relative w-full max-w-2xl flex-1 origin-center max-h-[42vh] sm:max-h-none">
                <JourneyMapCanvas ref={canvasRef} />
              </div>

              <div ref={phoneRef} className="relative shrink-0">
                <JourneyPhonePreview />
              </div>
            </div>

            <div className="absolute bottom-10 left-0 right-0 z-20 px-4 md:bottom-14">
              <JourneyStageRail />
            </div>

            <p className="sr-only">{copy}</p>
          </div>
        </SceneTrack>
      }
    >
      <div className="flex flex-col items-center gap-4 p-4">
        <JourneyMapCanvas className="max-h-40" />
        <JourneyPhonePreview />
        <p className="text-center text-xs text-slate-400">{STAGES.join(" · ")}</p>
      </div>
    </SceneGate>
  );
}
