"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { useSceneScrollMode } from "@/hooks/useSceneScrollMode";
import { useFlowSceneScroll } from "@/hooks/usePinnedSceneScroll";
import { scheduleSceneScrollRefresh } from "@/lib/scroll-engine";
import { SceneGate } from "@/components/scenes/SceneGate";
import { SceneGrain } from "@/components/design/SceneGrain";
import { ClosingCityMap } from "@/components/hero/ClosingCityMap";
import { SceneTrack } from "./shared";
import { STORY_REVEAL, storyPanelStyle } from "@/lib/story-motion";

const MESSAGE = "Every journey has the potential to help someone.";
const HEADLINE = "Join the Movement.";

export function Scene9ClosingMovement() {
  const { reducedMotion } = useSceneScrollMode();
  const trackRef = useRef<HTMLElement>(null);
  const sceneActive = useFlowSceneScroll(trackRef);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sceneActive || !trackRef.current || reducedMotion) return;
    registerGsapPlugins();

    const ctx = gsap.context(() => {
      const words = headlineRef.current?.querySelectorAll(".closing-headline-word");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        mapRef.current,
        { opacity: 0.6, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
        0,
      )
        .fromTo(
          messageRef.current,
          { opacity: 0, y: STORY_REVEAL.y },
          { opacity: 1, y: 0, duration: 0.9, ease: STORY_REVEAL.ease },
          0.15,
        )
        .fromTo(
          words ?? [],
          { opacity: 0, y: 32 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: "power3.out" },
          0.45,
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: STORY_REVEAL.duration, ease: STORY_REVEAL.ease },
          0.75,
        );
    }, trackRef);

    scheduleSceneScrollRefresh();
    return () => ctx.revert();
  }, [sceneActive, reducedMotion]);

  const hidden = reducedMotion ? "" : "opacity-0";

  const ctas = (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
      <Link
        href="/contact"
        className="closing-cta closing-cta--primary inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-slate-900 shadow-lg shadow-white/10 transition-colors hover:bg-slate-100 sm:w-auto md:px-10 md:text-base"
      >
        Download the App
      </Link>
      <Link
        href="/contact"
        className="closing-cta closing-cta--secondary inline-flex w-full items-center justify-center rounded-full border border-teal-400/40 bg-teal-500/15 px-8 py-4 text-sm font-semibold text-teal-100 backdrop-blur-sm transition-colors hover:border-teal-400/60 hover:bg-teal-500/25 sm:w-auto md:px-10 md:text-base"
      >
        Join the Waitlist
      </Link>
    </div>
  );

  return (
    <SceneGate
      reducedMotion={reducedMotion}
      scene={9}
      copy={`${MESSAGE} ${HEADLINE}`}
      desktop={
        <SceneTrack ref={trackRef} scene={9} className="story-track--flow relative">
          <section
            className="story-flow-section story-panel relative flex min-h-screen flex-col justify-center overflow-hidden py-24 md:min-h-[105vh] md:py-32"
            style={storyPanelStyle()}
          >
            <SceneGrain />

            <div ref={mapRef} className="closing-map-layer absolute inset-0 opacity-80">
              <ClosingCityMap reducedMotion={reducedMotion} className="h-full" />
            </div>

            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(15,23,42,0.55) 0%, rgba(15,23,42,0.82) 70%)",
              }}
            />

            <div className="closing-content relative z-10 mx-auto w-full max-w-3xl px-6 text-center md:px-10">
              <p
                ref={messageRef}
                className={`story-subtitle story-subtitle--dark mx-auto max-w-xl text-lg leading-relaxed md:text-2xl lg:text-[1.65rem] ${hidden}`}
              >
                {MESSAGE}
              </p>

              <h2
                ref={headlineRef}
                className="story-display mt-8 text-4xl leading-[1.05] text-white md:mt-10 md:text-6xl lg:text-7xl"
              >
                {HEADLINE.split(" ").map((word, i) => (
                  <span key={i} className={`closing-headline-word mr-[0.2em] inline-block ${hidden}`}>
                    {word}
                  </span>
                ))}
              </h2>

              <div ref={ctaRef} className={`mt-10 md:mt-12 ${hidden}`}>
                {ctas}
              </div>

              <p className="mt-6 text-[11px] text-white/30 md:text-xs">
                iOS &amp; Android — Bengaluru first
              </p>
            </div>

            <p className="sr-only">{MESSAGE} {HEADLINE}</p>
          </section>
        </SceneTrack>
      }
    >
      <div className="flex flex-col items-center gap-6 p-4 text-center">
        <ClosingCityMap reducedMotion className="h-40 w-full max-w-sm rounded-2xl overflow-hidden" />
        <p className="story-subtitle story-subtitle--dark text-base">{MESSAGE}</p>
        <p className="story-display text-2xl text-white">{HEADLINE}</p>
        {ctas}
      </div>
    </SceneGate>
  );
}
