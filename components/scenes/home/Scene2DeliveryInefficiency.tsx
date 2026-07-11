"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useSceneScrollMode } from "@/hooks/useSceneScrollMode";
import { usePinnedSceneScroll } from "@/hooks/usePinnedSceneScroll";
import { SceneGate } from "@/components/scenes/SceneGate";
import { SceneGrain } from "@/components/design/SceneGrain";
import { DeliveryCityCanvas } from "@/components/hero/DeliveryCityCanvas";
import { SceneTrack } from "./shared";
import { storyPanelStyle, storyPinScrollTrigger } from "@/lib/story-motion";
import { scheduleSceneScrollRefresh } from "@/lib/scroll-engine";

gsap.registerPlugin(MotionPathPlugin);

const COPY_LINE_1 = "Thousands of deliveries happen every day...";
const COPY_LINE_2 = "even when someone is already going there.";

export function Scene2DeliveryInefficiency() {
  const { reducedMotion } = useSceneScrollMode();
  const trackRef = useRef<HTMLElement>(null);
  const { active: sceneActive, tier } = usePinnedSceneScroll(trackRef);
  const panelRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const congestionRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);
  const canvasRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    if (!sceneActive || !trackRef.current || !panelRef.current || !canvasRef.current) return;
    registerGsapPlugins();

    const ctx = gsap.context(() => {
      const svg = canvasRef.current!;
      const routes = svg.querySelectorAll<SVGPathElement>(".delivery-redundant-routes path[data-route-index]");
      const bikesGroup = svg.querySelector(".delivery-bikes");
      const bikes = svg.querySelectorAll<SVGGElement>(".delivery-bike");
      const trafficDots = svg.querySelectorAll(".delivery-traffic-dot");
      const redundantGroup = svg.querySelector(".delivery-redundant-routes");
      const blocks = svg.querySelector(".delivery-city-blocks");

      const tl = gsap.timeline({
        scrollTrigger: storyPinScrollTrigger(trackRef.current!, panelRef.current!),
      });

      // Camera dolly — continuous push through the city from hero altitude
      tl.fromTo(
        cameraRef.current,
        { scale: 1, y: 0 },
        { scale: 2.15, y: -140, duration: 0.35, ease: "none" },
        0,
      )
        .fromTo(
          blocks,
          { opacity: 0.7 },
          { opacity: 1, duration: 0.25, ease: "none" },
          0,
        )
        .to(cameraRef.current, { scale: 2.45, y: -200, duration: 0.3, ease: "none" }, 0.35);

      // Redundant delivery routes draw in and stack
      tl.fromTo(
        redundantGroup,
        { opacity: 0 },
        { opacity: 1, duration: 0.12, ease: "none" },
        0.18,
      );

      routes.forEach((path, i) => {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        tl.to(path, { strokeDashoffset: 0, duration: 0.08, ease: "none" }, 0.2 + i * 0.04);
      });

      // Delivery bikes appear in waves and ride separate paths
      tl.fromTo(bikesGroup, { opacity: 0 }, { opacity: 1, duration: 0.05, ease: "none" }, 0.28);

      bikes.forEach((bike, i) => {
        const routeIndex = Number(bike.dataset.routeIndex ?? 0);
        const path = routes[routeIndex];
        if (!path) return;

        const wave = Math.floor(i / 4);
        const start = 0.3 + wave * 0.1 + (i % 4) * 0.025;

        tl.fromTo(bike, { opacity: 0 }, { opacity: 1, duration: 0.03, ease: "none" }, start)
          .to(
            bike,
            {
              motionPath: {
                path,
                align: path,
                alignOrigin: [0.5, 0.5],
                start: 0,
                end: 0.55 + (i % 3) * 0.12,
              },
              duration: 0.22,
              ease: "none",
            },
            start,
          );
      });

      // Traffic density builds
      tl.fromTo(
        trafficDots,
        { opacity: 0, scale: 0 },
        { opacity: 0.7, scale: 1, duration: 0.15, stagger: 0.004, ease: "none" },
        0.45,
      )
        .to(trafficDots, { opacity: 1, duration: 0.12, stagger: 0.003, ease: "none" }, 0.62);

      // Congestion wash — unnecessary movement visualised
      tl.fromTo(
        congestionRef.current,
        { opacity: 0 },
        { opacity: 0.55, duration: 0.35, ease: "none" },
        0.5,
      )
        .to(congestionRef.current, { opacity: 0.72, duration: 0.2, ease: "none" }, 0.72);

      // Message reveals gradually — animation carries the story, text is the punchline
      tl.fromTo(
        line1Ref.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.12, ease: "none" },
        0.78,
      )
        .fromTo(
          line2Ref.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.1, ease: "none" },
          0.9,
        );
    }, trackRef);

    scheduleSceneScrollRefresh();
    return () => ctx.revert();
  }, [sceneActive, tier]);

  const mobileVisual = (
    <div className="relative h-full w-full">
      <DeliveryCityCanvas />
      <div className="absolute inset-0 bg-red-950/25" />
    </div>
  );

  return (
    <SceneGate
      reducedMotion={reducedMotion}
      scene={2}
      variant="teal"
      copy={`${COPY_LINE_1} ${COPY_LINE_2}`}
      desktop={
        <SceneTrack ref={trackRef} scene={2} baseVh={300}>
          <div
            ref={panelRef}
            className="story-panel scene-panel relative h-screen min-h-[100dvh] w-full overflow-hidden"
            style={storyPanelStyle("teal")}
          >
            <SceneGrain />

            <div ref={cameraRef} className="delivery-camera absolute inset-0 origin-center will-change-transform">
              <DeliveryCityCanvas ref={canvasRef} />
            </div>

            <div
              ref={congestionRef}
              className="pointer-events-none absolute inset-0 opacity-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 58% 38%, rgba(239,68,68,0.35) 0%, transparent 65%), linear-gradient(180deg, transparent 0%, rgba(15,23,42,0.4) 100%)",
              }}
            />

            <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-end px-8 pb-20 md:pb-28">
              <p
                ref={line1Ref}
                className="story-subtitle story-subtitle--dark max-w-3xl text-center text-xl opacity-0 md:text-3xl lg:text-4xl"
              >
                {COPY_LINE_1}
              </p>
              <p
                ref={line2Ref}
                className="story-subtitle story-subtitle--dark mt-3 max-w-2xl text-center text-lg opacity-0 md:text-2xl lg:text-3xl"
              >
                {COPY_LINE_2}
              </p>
            </div>

            <p className="sr-only">{COPY_LINE_1} {COPY_LINE_2}</p>
          </div>
        </SceneTrack>
      }
    >
      {mobileVisual}
    </SceneGate>
  );
}
