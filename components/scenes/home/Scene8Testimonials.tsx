"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { useSceneScrollMode } from "@/hooks/useSceneScrollMode";
import { useFlowSceneScroll } from "@/hooks/usePinnedSceneScroll";
import { scheduleSceneScrollRefresh } from "@/lib/scroll-engine";
import { SceneGate } from "@/components/scenes/SceneGate";
import { SceneGrain } from "@/components/design/SceneGrain";
import { TestimonialWall } from "@/components/hero/TestimonialWall";
import { STORY_REVEAL, storyPanelStyle } from "@/lib/story-motion";
import { SceneTrack } from "./shared";

export function Scene8Testimonials() {
  const { reducedMotion } = useSceneScrollMode();
  const trackRef = useRef<HTMLElement>(null);
  const sceneActive = useFlowSceneScroll(trackRef);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sceneActive || !trackRef.current || reducedMotion) return;
    registerGsapPlugins();

    const ctx = gsap.context(() => {
      const cards = trackRef.current!.querySelectorAll("[data-testimonial-card]");

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: STORY_REVEAL.y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: STORY_REVEAL.ease,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: STORY_REVEAL.duration,
          ease: STORY_REVEAL.ease,
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        },
      );

      cards.forEach((card, i) => {
        const role = card.getAttribute("data-role");
        const tilt = role === "customer" ? -1.2 : 1.2;

        gsap.fromTo(
          card,
          { opacity: 0, y: 48, rotate: tilt, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            scale: 1,
            duration: STORY_REVEAL.duration,
            ease: STORY_REVEAL.ease,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none none",
            },
            delay: (i % 2) * STORY_REVEAL.stagger,
          },
        );
      });
    }, trackRef);

    scheduleSceneScrollRefresh();
    return () => ctx.revert();
  }, [sceneActive, reducedMotion]);

  const copy = "Real people across Bengaluru — customers and travelers sharing the city.";

  return (
    <SceneGate
      reducedMotion={reducedMotion}
      scene={8}
      copy={copy}
      desktop={
        <SceneTrack ref={trackRef} scene={8} className="story-track--flow relative">
          <section
            className="story-flow-section story-panel relative overflow-hidden px-6 py-24 md:px-10 md:py-32 lg:py-40"
            style={storyPanelStyle()}
          >
            <SceneGrain />

            <div className="pointer-events-none absolute left-1/4 top-20 h-64 w-64 rounded-full bg-teal-500/5 blur-3xl" />
            <div className="pointer-events-none absolute bottom-32 right-1/4 h-48 w-48 rounded-full bg-orange-500/5 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-5xl">
              <p
                ref={titleRef}
                className="text-center text-xs font-medium uppercase tracking-[0.22em] text-white/45"
              >
                Voices from the city
              </p>
              <h2
                ref={subtitleRef}
                className="story-display mx-auto mt-4 max-w-2xl text-center text-3xl text-white md:text-4xl lg:text-5xl"
              >
                Trusted by people already on the move
              </h2>

              <div className="mt-14 md:mt-20">
                <TestimonialWall />
              </div>
            </div>

            <p className="sr-only">{copy}</p>
          </section>
        </SceneTrack>
      }
    >
      <TestimonialWall compact />
    </SceneGate>
  );
}
