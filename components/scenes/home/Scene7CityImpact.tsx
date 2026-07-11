"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useSceneScrollMode } from "@/hooks/useSceneScrollMode";
import { usePinnedSceneScroll } from "@/hooks/usePinnedSceneScroll";
import { scheduleSceneScrollRefresh } from "@/lib/scroll-engine";
import { SceneGate } from "@/components/scenes/SceneGate";
import { SceneGrain } from "@/components/design/SceneGrain";
import { ImpactCityCanvas, IMPACT_ROUTES } from "@/components/hero/ImpactCityCanvas";
import { COUNTERS, ImpactCounters } from "@/components/hero/ImpactCounters";
import { SceneTrack } from "./shared";
import { storyPanelStyle, storyPinScrollTrigger } from "@/lib/story-motion";

gsap.registerPlugin(MotionPathPlugin);

const PHASES = 4;
const SEG = 1 / PHASES;

const ROUTES_PER_PHASE = Math.ceil(IMPACT_ROUTES.length / PHASES);

function animateCounter(
  tl: gsap.core.Timeline,
  panel: HTMLElement,
  id: string,
  target: number,
  format: (n: number) => string,
  suffix: string,
  at: number,
  duration: number,
  valueEls: Map<string, HTMLElement>,
) {
  const el = valueEls.get(id);
  const bar = panel.querySelector(`[data-impact-bar-fill="${id}"]`);
  if (!el) return;

  const counter = { val: 0 };
  tl.fromTo(
    `[data-impact-counter="${id}"]`,
    { opacity: 0.4, y: 8 },
    { opacity: 1, y: 0, duration: duration * 0.3, ease: "none" },
    at,
  )
    .to(counter, {
      val: target,
      duration,
      ease: "none",
      onUpdate: () => {
        el.textContent = `${format(counter.val)}${suffix}`;
      },
    }, at);

  if (bar) {
    tl.to(bar, { width: "100%", duration, ease: "none" }, at);
  }
}

export function Scene7CityImpact() {
  const { reducedMotion } = useSceneScrollMode();
  const trackRef = useRef<HTMLElement>(null);
  const sceneActive = usePinnedSceneScroll(trackRef);
  const panelRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<SVGSVGElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const communityRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (!sceneActive || !trackRef.current || !panelRef.current || !canvasRef.current) return;
    registerGsapPlugins();

    const ctx = gsap.context(() => {
      const svg = canvasRef.current!;
      const routesGroup = svg.querySelector(".impact-network-routes");
      const routes = svg.querySelectorAll<SVGPathElement>(".impact-network-route");
      const hubs = svg.querySelectorAll(".impact-hub");
      const rings = svg.querySelectorAll(".impact-community-ring");
      const travelersGroup = svg.querySelector(".impact-travelers");
      const travelers = svg.querySelectorAll(".impact-traveler");
      const blocks = svg.querySelector(".impact-city-blocks");
      const vignette = svg.querySelector(".impact-vignette");

      routes.forEach((path) => {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      });

      const valueEls = new Map<string, HTMLElement>();
      COUNTERS.forEach((c) => {
        const el = panelRef.current!.querySelector<HTMLElement>(`[data-impact-value="${c.id}"]`);
        if (el) valueEls.set(c.id, el);
      });

      const tl = gsap.timeline({
        scrollTrigger: storyPinScrollTrigger(trackRef.current!, panelRef.current!),
      });

      tl.fromTo(titleRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: SEG * 0.35, ease: "none" }, 0)
        .fromTo(
          cameraRef.current,
          { scale: 1.15, opacity: 0.7 },
          { scale: 1, opacity: 1, duration: SEG * 0.5, ease: "none" },
          0,
        )
        .fromTo(blocks, { opacity: 0.5 }, { opacity: 1, duration: SEG * 0.4, ease: "none" }, 0);

      // Phase 1 — first connections light up
      const p1 = 0;
      tl.fromTo(routesGroup, { opacity: 0 }, { opacity: 1, duration: SEG * 0.15, ease: "none" }, p1 + 0.02);

      for (let i = 0; i < ROUTES_PER_PHASE; i++) {
        const route = routes[i];
        if (route) {
          tl.to(route, { strokeDashoffset: 0, duration: SEG * 0.2, ease: "none" }, p1 + 0.05 + i * 0.03);
        }
      }

      tl.to(hubs[0], { opacity: 1, duration: SEG * 0.15, ease: "none" }, p1 + 0.08)
        .to(hubs[1], { opacity: 1, duration: SEG * 0.15, ease: "none" }, p1 + 0.1)
        .to(rings[0], { opacity: 0.6, scale: 1.5, duration: SEG * 0.25, ease: "none" }, p1 + 0.12);

      animateCounter(
        tl,
        panelRef.current!,
        COUNTERS[0].id,
        COUNTERS[0].value,
        COUNTERS[0].format,
        COUNTERS[0].suffix,
        p1 + 0.06,
        SEG * 0.35,
        valueEls,
      );

      // Phase 2 — network grows, earnings
      const p2 = SEG;
      for (let i = ROUTES_PER_PHASE; i < ROUTES_PER_PHASE * 2; i++) {
        const route = routes[i];
        if (route) {
          tl.to(route, { strokeDashoffset: 0, duration: SEG * 0.18, ease: "none" }, p2 + (i - ROUTES_PER_PHASE) * 0.025);
        }
      }

      tl.fromTo(travelersGroup, { opacity: 0 }, { opacity: 1, duration: SEG * 0.1, ease: "none" }, p2 + 0.05);

      travelers.forEach((traveler, i) => {
        const routeIdx = Number(traveler.getAttribute("data-traveler-route") ?? 0);
        const path = routes[routeIdx];
        if (!path) return;
        const start = p2 + 0.08 + i * 0.04;
        tl.fromTo(traveler, { opacity: 0 }, { opacity: 1, duration: 0.02, ease: "none" }, start).to(
          traveler,
          {
            motionPath: { path, align: path, alignOrigin: [0.5, 0.5], start: 0, end: 1 },
            duration: SEG * 0.55,
            ease: "none",
          },
          start,
        );
      });

      hubs.forEach((hub, i) => {
        if (i < 5) {
          tl.to(hub, { opacity: 1, duration: SEG * 0.08, ease: "none" }, p2 + 0.04 + i * 0.02);
        }
      });

      animateCounter(
        tl,
        panelRef.current!,
        COUNTERS[1].id,
        COUNTERS[1].value,
        COUNTERS[1].format,
        COUNTERS[1].suffix,
        p2 + 0.06,
        SEG * 0.35,
        valueEls,
      );

      // Phase 3 — density, distance optimized
      const p3 = SEG * 2;
      for (let i = ROUTES_PER_PHASE * 2; i < ROUTES_PER_PHASE * 3; i++) {
        const route = routes[i];
        if (route) {
          tl.to(route, { strokeDashoffset: 0, duration: SEG * 0.15, ease: "none" }, p3 + (i - ROUTES_PER_PHASE * 2) * 0.02);
        }
      }

      tl.to(cameraRef.current, { scale: 0.92, duration: SEG * 0.5, ease: "none" }, p3)
        .to(vignette, { opacity: 0.35, duration: SEG * 0.4, ease: "none" }, p3);

      hubs.forEach((hub, i) => {
        if (i >= 5) {
          tl.to(hub, { opacity: 1, duration: SEG * 0.06, ease: "none" }, p3 + 0.03 + (i - 5) * 0.015);
        }
      });

      rings.forEach((ring, i) => {
        tl.to(ring, { opacity: 0.5, scale: 1.8, duration: SEG * 0.2, ease: "none" }, p3 + 0.08 + i * 0.015);
      });

      animateCounter(
        tl,
        panelRef.current!,
        COUNTERS[2].id,
        COUNTERS[2].value,
        COUNTERS[2].format,
        COUNTERS[2].suffix,
        p3 + 0.06,
        SEG * 0.35,
        valueEls,
      );

      // Phase 4 — full city connected, emissions, community
      const p4 = SEG * 3;
      for (let i = ROUTES_PER_PHASE * 3; i < routes.length; i++) {
        const route = routes[i];
        if (route) {
          tl.to(route, { strokeDashoffset: 0, duration: SEG * 0.12, ease: "none" }, p4 + (i - ROUTES_PER_PHASE * 3) * 0.02);
        }
      }

      tl.to(cameraRef.current, { scale: 0.88, duration: SEG * 0.4, ease: "none" }, p4)
        .to(routesGroup, { opacity: 1, duration: SEG * 0.2, ease: "none" }, p4);

      animateCounter(
        tl,
        panelRef.current!,
        COUNTERS[3].id,
        COUNTERS[3].value,
        COUNTERS[3].format,
        COUNTERS[3].suffix,
        p4 + 0.06,
        SEG * 0.35,
        valueEls,
      );

      tl.fromTo(
        communityRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: SEG * 0.35, ease: "none" },
        p4 + 0.2,
      );
    }, trackRef);

    scheduleSceneScrollRefresh();
    return () => ctx.revert();
  }, [sceneActive]);

  const copy =
    "A city in motion — journeys connected, commuters earning, empty miles avoided, cleaner air together.";

  return (
    <SceneGate
      reducedMotion={reducedMotion}
      scene={7}
      variant="impact"
      copy={copy}
      desktop={
        <SceneTrack ref={trackRef} scene={7} className="relative h-[400vh]">
          <div
            ref={panelRef}
            className="story-panel scene-panel relative h-screen w-full overflow-hidden"
            style={storyPanelStyle("impact")}
          >
            <SceneGrain />

            <p
              ref={titleRef}
              className="pointer-events-none absolute left-0 right-0 top-14 z-30 px-6 text-center text-xs font-medium uppercase tracking-[0.22em] text-white/45 opacity-0 md:top-20"
            >
              A city, connected
            </p>

            <div
              ref={cameraRef}
              className="impact-camera absolute inset-x-0 top-16 bottom-44 origin-center md:top-20 md:bottom-48"
            >
              <ImpactCityCanvas ref={canvasRef} />
            </div>

            <div className="absolute inset-x-4 bottom-24 z-20 md:inset-x-8 md:bottom-28 lg:inset-x-12">
              <ImpactCounters />
            </div>

            <p
              ref={communityRef}
              className="story-subtitle story-subtitle--dark pointer-events-none absolute bottom-8 left-0 right-0 z-30 px-8 text-center text-sm opacity-0 md:bottom-10 md:text-base"
            >
              Every commute becomes someone&apos;s delivery — a city moving together.
            </p>

            <p className="sr-only">{copy}</p>
          </div>
        </SceneTrack>
      }
    >
      <div className="flex flex-col items-center gap-4 p-4">
        <ImpactCityCanvas className="max-h-48" />
        <ImpactCounters className="w-full max-w-md" />
      </div>
    </SceneGate>
  );
}
