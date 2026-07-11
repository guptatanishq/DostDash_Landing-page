"use client";

import { CinematicLoader } from "@/components/design/CinematicLoader";
import { useScrollContext } from "@/components/providers/ScrollProvider";
import { StoryScrollProvider } from "@/components/providers/StoryScrollProvider";
import { useCinematicIntro } from "@/hooks/useCinematicIntro";
import { refreshScrollEngine } from "@/lib/scroll-engine";
import { HeroSection } from "@/components/hero/HeroSection";
import { Scene2DeliveryInefficiency } from "@/components/scenes/home/Scene2DeliveryInefficiency";
import { Scene3SolutionReveal } from "@/components/scenes/home/Scene3SolutionReveal";
import { Scene4HowItWorks } from "@/components/scenes/home/Scene4HowItWorks";
import { Scene5SplitJourney } from "@/components/scenes/home/Scene5SplitJourney";
import { Scene6AppShowcase } from "@/components/scenes/home/Scene6AppShowcase";
import { Scene7CityImpact } from "@/components/scenes/home/Scene7CityImpact";
import { Scene8Testimonials } from "@/components/scenes/home/Scene8Testimonials";
import { Scene9ClosingMovement } from "@/components/scenes/home/Scene9ClosingMovement";
import { useLayoutEffect } from "react";

export function HomeChapter() {
  const { showIntro, completeIntro, hydrated } = useCinematicIntro();
  const { lenis } = useScrollContext();
  const storyReady = hydrated && !showIntro;

  useLayoutEffect(() => {
    if (!storyReady) return;

    refreshScrollEngine();
    const t1 = window.setTimeout(() => refreshScrollEngine(), 100);
    const t2 = window.setTimeout(() => refreshScrollEngine(), 400);
    const t3 = window.setTimeout(() => refreshScrollEngine(), 1000);
    const t4 = window.setTimeout(() => refreshScrollEngine(), 2000);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
    };
  }, [storyReady]);

  if (!hydrated) {
    return (
      <div
        className="fixed inset-0"
        style={{
          background: "linear-gradient(180deg, #0f172a 0%, #1e293b 46%, #0f172a 100%)",
        }}
        aria-hidden
      />
    );
  }

  return (
    <StoryScrollProvider ready={storyReady}>
      {showIntro && <CinematicLoader onComplete={completeIntro} lenis={lenis} />}
      <main id="main" className={showIntro ? "story-experience intro-behind" : "story-experience"}>
        <HeroSection animateIn={storyReady} />
        <Scene2DeliveryInefficiency />
        <Scene3SolutionReveal />
        <Scene4HowItWorks />
        <Scene5SplitJourney />
        <Scene6AppShowcase />
        <Scene7CityImpact />
        <Scene8Testimonials />
        <Scene9ClosingMovement />
      </main>
    </StoryScrollProvider>
  );
}
