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
  POINT_B,
  SolutionRevealCanvas,
} from "@/components/hero/SolutionRevealCanvas";
import { SceneTrack } from "./shared";
import { storyPanelStyle, storyPinScrollTrigger } from "@/lib/story-motion";

gsap.registerPlugin(MotionPathPlugin);

const COPY =
  "One traveler. One route. Pickup on the way. Delivered. Earned.";

export function Scene3SolutionReveal() {
  const { reducedMotion } = useSceneScrollMode();
  const trackRef = useRef<HTMLElement>(null);
  const { active: sceneActive, tier } = usePinnedSceneScroll(trackRef);
  const panelRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const chaosRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<SVGSVGElement>(null);
  const requestRef = useRef<HTMLDivElement>(null);
  const acceptRef = useRef<HTMLDivElement>(null);
  const earningsRef = useRef<HTMLDivElement>(null);
  const earningsValueRef = useRef<HTMLSpanElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (!sceneActive || !trackRef.current || !panelRef.current || !canvasRef.current) return;
    registerGsapPlugins();

    const ctx = gsap.context(() => {
      const svg = canvasRef.current!;
      const frozenChaos = svg.querySelector(".solution-frozen-chaos");
      const commutePath = svg.querySelector(".solution-commute-path");
      const solutionRoute = svg.querySelector(".solution-route") as SVGPathElement | null;
      const pointA = svg.querySelector(".solution-point-a");
      const pickup = svg.querySelector(".solution-pickup");
      const pointB = svg.querySelector(".solution-point-b");
      const traveler = svg.querySelector(".solution-traveler");
      const travelerGlow = svg.querySelector(".solution-traveler-glow");
      const packageG = svg.querySelector(".solution-package");
      const check = svg.querySelector(".solution-check");

      if (!solutionRoute || !traveler) return;

      const route = solutionRoute;
      const len = route.getTotalLength();
      gsap.set(route, { strokeDasharray: len, strokeDashoffset: len });
      if (check) {
        gsap.set(check, { x: POINT_B.x, y: POINT_B.y });
      }

      const tl = gsap.timeline({
        scrollTrigger: storyPinScrollTrigger(trackRef.current!, panelRef.current!),
      });

      // Continue from scene 2 end state, then freeze & calm
      gsap.set(cameraRef.current, { scale: 2.45, y: -200 });
      tl.to(cameraRef.current, { scale: 2.05, y: -110, duration: 0.18, ease: "none" }, 0)
        .to(chaosRef.current, { opacity: 0.85, duration: 0.08, ease: "none" }, 0)
        .to(chaosRef.current, { opacity: 0, duration: 0.14, ease: "none" }, 0.08)
        .to(frozenChaos, { opacity: 0.08, duration: 0.12, ease: "none" }, 0.1);

      // Highlight traveler on commute A → B
      tl.fromTo(pointA, { opacity: 0 }, { opacity: 1, duration: 0.06, ease: "none" }, 0.14)
        .fromTo(pointB, { opacity: 0 }, { opacity: 1, duration: 0.06, ease: "none" }, 0.16)
        .fromTo(commutePath, { opacity: 0 }, { opacity: 0.6, duration: 0.08, ease: "none" }, 0.15)
        .fromTo(traveler, { opacity: 0 }, { opacity: 1, duration: 0.06, ease: "none" }, 0.17);

      if (traveler) {
        gsap.set(traveler, {
          motionPath: { path: route, align: route, alignOrigin: [0.5, 0.5], start: 0, end: 0 },
        });
        tl.to(traveler, {
          motionPath: { path: route, align: route, alignOrigin: [0.5, 0.5], start: 0, end: 0.22 },
          duration: 0.14,
          ease: "none",
        }, 0.18);
      }

      // Nearby request appears
      tl.fromTo(
        requestRef.current,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.1, ease: "none" },
        0.28,
      )
        .fromTo(pickup, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.08, ease: "none" }, 0.3);

      // Accept — pulse ring, request locks on
      tl.fromTo(
        acceptRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1.2, duration: 0.06, ease: "none" },
        0.38,
      )
        .to(acceptRef.current, { opacity: 0, scale: 1.6, duration: 0.08, ease: "none" }, 0.44)
        .to(requestRef.current, { opacity: 0.4, scale: 0.95, duration: 0.06, ease: "none" }, 0.42)
        .to(commutePath, { opacity: 0.15, duration: 0.06, ease: "none" }, 0.4);

      tl.fromTo(route, { opacity: 0 }, { opacity: 1, duration: 0.06, ease: "none" }, 0.44);
      tl.to(route, { strokeDashoffset: 0, duration: 0.16, ease: "none" }, 0.46);

      // Traveler → pickup (with glow pulse)
      if (traveler) {
        tl.to(travelerGlow, { scale: 1.35, duration: 0.08, ease: "none" }, 0.5)
          .to(traveler, {
            motionPath: { path: route, align: route, alignOrigin: [0.5, 0.5], start: 0.22, end: 0.48 },
            duration: 0.16,
            ease: "none",
          }, 0.52);
      }

      // Pick up package
      if (packageG && traveler) {
        tl.fromTo(packageG, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.06, ease: "none" }, 0.66)
          .to(packageG, {
            motionPath: { path: route, align: route, alignOrigin: [0.5, 0.5], start: 0.48, end: 0.48 },
            duration: 0.01,
            ease: "none",
          }, 0.66)
          .to(traveler, {
            motionPath: { path: route, align: route, alignOrigin: [0.5, 0.5], start: 0.48, end: 0.82 },
            duration: 0.18,
            ease: "none",
          }, 0.68)
          .to(packageG, {
            motionPath: { path: route, align: route, alignOrigin: [0.5, 0.5], start: 0.48, end: 0.82 },
            duration: 0.18,
            ease: "none",
          }, 0.68);
      }

      // Deliver at B
      tl.fromTo(check, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.08, ease: "none" }, 0.84);
      if (packageG) {
        tl.to(packageG, { opacity: 0, scale: 0.6, duration: 0.06, ease: "none" }, 0.86);
      }
      tl.to(travelerGlow, { scale: 1, duration: 0.06, ease: "none" }, 0.86);

      // Earnings
      const counter = { val: 0 };
      tl.fromTo(
        earningsRef.current,
        { opacity: 0, y: 16, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.1, ease: "none" },
        0.9,
      )
        .to(counter, {
          val: 85,
          duration: 0.1,
          ease: "none",
          onUpdate: () => {
            if (earningsValueRef.current) {
              earningsValueRef.current.textContent = `₹${Math.round(counter.val)}`;
            }
          },
        }, 0.9)
        .fromTo(
          captionRef.current,
          { opacity: 0 },
          { opacity: 0.7, duration: 0.08, ease: "none" },
          0.94,
        );
    }, trackRef);

    scheduleSceneScrollRefresh();
    return () => ctx.revert();
  }, [sceneActive, tier]);

  const mobileVisual = (
    <div className="relative flex h-full flex-col items-center justify-center gap-4 p-6">
      <SolutionRevealCanvas className="max-h-48" />
      <p className="story-subtitle story-subtitle--dark text-center text-sm">{COPY}</p>
      <span className="rounded-full bg-teal-500/20 px-4 py-2 text-lg font-bold text-teal-300">₹85</span>
    </div>
  );

  return (
    <SceneGate
      reducedMotion={reducedMotion}
      scene={3}
      variant="teal"
      copy={COPY}
      desktop={
        <SceneTrack ref={trackRef} scene={3} baseVh={320}>
          <div
            ref={panelRef}
            className="story-panel scene-panel relative h-screen min-h-[100dvh] w-full overflow-hidden"
            style={storyPanelStyle("teal")}
          >
            <SceneGrain />

            <div
              ref={chaosRef}
              className="pointer-events-none absolute inset-0 z-[1] opacity-0"
              style={{
                background:
                  "radial-gradient(ellipse 55% 45% at 58% 40%, rgba(239,68,68,0.4) 0%, transparent 70%)",
              }}
            />

            <div
              ref={cameraRef}
              className="solution-camera absolute inset-0 origin-center will-change-transform"
            >
              <SolutionRevealCanvas ref={canvasRef} />
            </div>

            {/* Nearby request */}
            <div
              ref={requestRef}
              className="solution-request pointer-events-none absolute z-20 opacity-0"
              style={{ left: "52%", top: "38%" }}
            >
              <div className="rounded-xl border border-amber-400/50 bg-white/10 px-4 py-3 backdrop-blur-md">
                <p className="text-[10px] font-bold uppercase tracking-wide text-amber-300">
                  Nearby
                </p>
                <p className="mt-0.5 text-xs font-medium text-white/90">2 min off route</p>
              </div>
            </div>

            {/* Accept pulse */}
            <div
              ref={acceptRef}
              className="pointer-events-none absolute z-20 opacity-0"
              style={{ left: "38%", top: "52%" }}
            >
              <div className="h-16 w-16 rounded-full border-2 border-teal-400/60 bg-teal-400/10" />
            </div>

            {/* Earnings */}
            <div
              ref={earningsRef}
              className="pointer-events-none absolute bottom-24 right-10 z-20 opacity-0 md:bottom-28 md:right-16"
            >
              <div className="rounded-2xl border border-teal-400/30 bg-teal-950/40 px-6 py-4 backdrop-blur-md">
                <p className="text-[10px] font-medium uppercase tracking-wider text-teal-300/80">
                  Earned
                </p>
                <p className="story-display text-3xl text-white md:text-4xl">
                  <span ref={earningsValueRef}>₹0</span>
                </p>
              </div>
            </div>

            <p
              ref={captionRef}
              className="story-subtitle story-subtitle--dark pointer-events-none absolute bottom-10 left-0 right-0 z-20 px-8 text-center text-sm opacity-0 md:text-base"
            >
              {COPY}
            </p>

            <p className="sr-only">{COPY}</p>
          </div>
        </SceneTrack>
      }
    >
      {mobileVisual}
    </SceneGate>
  );
}
