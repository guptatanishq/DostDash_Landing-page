"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { useSceneScrollMode } from "@/hooks/useSceneScrollMode";
import { usePinnedSceneScroll } from "@/hooks/usePinnedSceneScroll";
import { scheduleSceneScrollRefresh } from "@/lib/scroll-engine";
import { SceneGate } from "@/components/scenes/SceneGate";
import { SceneGrain } from "@/components/design/SceneGrain";
import { SplitJourneyView, SplitSyncRail, SYNC_BEATS } from "@/components/hero/SplitJourneyView";
import { SceneTrack } from "./shared";
import { STORY_CROSSFADE, storyPanelStyle, storyPinScrollTrigger } from "@/lib/story-motion";

const BEAT_COUNT = SYNC_BEATS.length;
const SEG = 1 / (BEAT_COUNT + 1);

function crossfadePanels(
  tl: gsap.core.Timeline,
  stages: Element[],
  to: number,
  at: number,
) {
  stages.forEach((el, i) => {
    tl.to(el, { opacity: i === to ? 1 : 0, duration: STORY_CROSSFADE, ease: "none" }, at);
  });
}

function activateSyncDot(
  tl: gsap.core.Timeline,
  dots: Element[],
  labels: Element[],
  to: number,
  at: number,
) {
  tl.to(dots, { scale: 1, opacity: 0.25, backgroundColor: "rgba(255,255,255,0.2)", duration: 0.01, ease: "none" }, at)
    .to(dots[to], { scale: 1.6, opacity: 1, backgroundColor: "#14b8a6", duration: STORY_CROSSFADE, ease: "none" }, at)
    .to(labels, { opacity: 0.35, duration: 0.01, ease: "none" }, at)
    .to(labels[to], { opacity: 0.9, duration: 0.03, ease: "none" }, at);
}

export function Scene5SplitJourney() {
  const { reducedMotion } = useSceneScrollMode();
  const trackRef = useRef<HTMLElement>(null);
  const sceneActive = usePinnedSceneScroll(trackRef);
  const panelRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<HTMLDivElement>(null);
  const communityRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (!sceneActive || !trackRef.current || !panelRef.current || !splitRef.current) return;
    registerGsapPlugins();

    const ctx = gsap.context(() => {
      const root = splitRef.current!;
      const customerStages = Array.from(root.querySelectorAll<HTMLElement>("[data-customer-stage]"));
      const travelerStages = Array.from(root.querySelectorAll<HTMLElement>("[data-traveler-stage]"));
      const customerHalf = root.querySelector(".split-journey-half--customer");
      const travelerHalf = root.querySelector(".split-journey-half--traveler");
      const bridge = root.querySelector(".split-connector-bridge");
      const merge = root.querySelector(".split-connector-merge");
      const connectorLine = root.querySelector(".split-connector-line");
      const mergeRing = root.querySelector(".split-merge-ring");
      const nodes = root.querySelectorAll(".split-connector-node");
      const particles = root.querySelectorAll(".split-connector-particle");
      const dots = panelRef.current!.querySelectorAll("[data-sync-dot]");
      const labels = panelRef.current!.querySelectorAll("[data-sync-label]");

      gsap.set(travelerStages[0], { opacity: 1 });

      const tl = gsap.timeline({
        scrollTrigger: storyPinScrollTrigger(trackRef.current!, panelRef.current!),
      });

      tl.fromTo(root, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: SEG * 0.5, ease: "none" }, 0);
      activateSyncDot(tl, Array.from(dots), Array.from(labels), 0, 0);

      // Beat 2 — posted / route live
      const t2 = SEG;
      crossfadePanels(tl, customerStages, 1, t2);
      crossfadePanels(tl, travelerStages, 1, t2);
      activateSyncDot(tl, Array.from(dots), Array.from(labels), 1, t2);
      tl.fromTo(nodes[0], { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: SEG * 0.25, ease: "none" }, t2 + 0.02);

      // Beat 3 — match sync (collaboration pulse)
      const t3 = SEG * 2;
      crossfadePanels(tl, customerStages, 2, t3);
      crossfadePanels(tl, travelerStages, 2, t3);
      activateSyncDot(tl, Array.from(dots), Array.from(labels), 2, t3);
      tl.fromTo(bridge, { width: 0, opacity: 0 }, { width: 72, opacity: 1, duration: SEG * 0.45, ease: "none" }, t3)
        .fromTo(nodes[1], { opacity: 0, scale: 0 }, { opacity: 1, scale: 1.8, duration: SEG * 0.3, ease: "none" }, t3 + 0.03)
        .to(customerHalf, { scale: 1.02, duration: SEG * 0.2, ease: "none" }, t3 + 0.05)
        .to(travelerHalf, { scale: 1.02, duration: SEG * 0.2, ease: "none" }, t3 + 0.05)
        .to(customerHalf, { scale: 1, duration: SEG * 0.2, ease: "none" }, t3 + 0.25)
        .to(travelerHalf, { scale: 1, duration: SEG * 0.2, ease: "none" }, t3 + 0.25);

      particles.forEach((p, i) => {
        tl.fromTo(
          p,
          { opacity: 0, x: i % 2 === 0 ? -20 : 20 },
          { opacity: 0.9, x: 0, duration: SEG * 0.35, ease: "none" },
          t3 + 0.08 + i * 0.04,
        ).to(p, { opacity: 0, x: i % 2 === 0 ? 20 : -20, duration: SEG * 0.35, ease: "none" }, t3 + 0.4);
      });

      // Beat 4 — parallel journey
      const t4 = SEG * 3;
      crossfadePanels(tl, customerStages, 3, t4);
      crossfadePanels(tl, travelerStages, 3, t4);
      activateSyncDot(tl, Array.from(dots), Array.from(labels), 3, t4);
      tl.fromTo(nodes[2], { opacity: 0 }, { opacity: 1, duration: SEG * 0.2, ease: "none" }, t4)
        .to(bridge, { width: 96, opacity: 0.85, duration: SEG * 0.3, ease: "none" }, t4);

      // Beat 5 — both complete
      const t5 = SEG * 4;
      crossfadePanels(tl, customerStages, 4, t5);
      crossfadePanels(tl, travelerStages, 4, t5);
      activateSyncDot(tl, Array.from(dots), Array.from(labels), 4, t5);
      tl.fromTo(nodes[3], { opacity: 0 }, { opacity: 1, duration: SEG * 0.2, ease: "none" }, t5);

      // Beat 6 — MERGE: panels converge, community
      const t6 = SEG * 5;
      tl.to(customerHalf, { x: "14%", duration: SEG * 0.65, ease: "none" }, t6)
        .to(travelerHalf, { x: "-14%", duration: SEG * 0.65, ease: "none" }, t6)
        .to(connectorLine, { opacity: 0, duration: SEG * 0.35, ease: "none" }, t6)
        .to(bridge, { width: 180, opacity: 1, duration: SEG * 0.5, ease: "none" }, t6 + 0.04)
        .fromTo(merge, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: SEG * 0.45, ease: "none" }, t6 + 0.08)
        .fromTo(mergeRing, { scale: 1, opacity: 0.8 }, { scale: 1.6, opacity: 0, duration: SEG * 0.5, ease: "none" }, t6 + 0.12)
        .fromTo(
          communityRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: SEG * 0.4, ease: "none" },
          t6 + 0.18,
        );
    }, trackRef);

    scheduleSceneScrollRefresh();
    return () => ctx.revert();
  }, [sceneActive]);

  const copy =
    "Customer creates a request while a traveler publishes a route — two journeys, one delivery, stronger together.";

  return (
    <SceneGate
      reducedMotion={reducedMotion}
      scene={5}
      variant="dual"
      copy={copy}
      desktop={
        <SceneTrack ref={trackRef} scene={5} className="relative h-[360vh]">
          <div
            ref={panelRef}
            className="story-panel scene-panel relative h-screen w-full overflow-hidden"
            style={storyPanelStyle("dual")}
          >
            <SceneGrain />

            <p className="pointer-events-none absolute left-0 right-0 top-16 z-30 px-6 text-center text-xs font-medium uppercase tracking-[0.22em] text-white/45 md:top-20">
              Two people · One city · One delivery
            </p>

            <div ref={splitRef} className="absolute inset-x-4 inset-y-24 md:inset-x-12 md:inset-y-28">
              <SplitJourneyView />
            </div>

            <div className="absolute bottom-10 left-0 right-0 z-20 px-4 md:bottom-14">
              <SplitSyncRail />
            </div>

            <p
              ref={communityRef}
              className="story-subtitle story-subtitle--dark pointer-events-none absolute bottom-24 left-0 right-0 z-30 px-8 text-center text-sm opacity-0 md:bottom-28 md:text-lg"
            >
              Access what&apos;s not near you — through people who already are.
            </p>

            <p className="sr-only">{copy}</p>
          </div>
        </SceneTrack>
      }
    >
      <div className="flex h-80 w-full flex-col">
        <SplitJourneyView layout="stacked" preview />
        <p className="mt-3 text-center text-[10px] text-slate-400">
          {SYNC_BEATS.map((b) => `${b.customer} / ${b.traveler}`).join(" · ")}
        </p>
      </div>
    </SceneGate>
  );
}
