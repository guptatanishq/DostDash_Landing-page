"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import type Lenis from "lenis";
import { refreshScrollEngine } from "@/lib/scroll-engine";
import { SceneGrain } from "@/components/design/SceneGrain";
import { DostDropLogoDraw } from "@/components/design/illustrations/DostDropLogoDraw";
import { LoaderCityMap } from "@/components/design/illustrations/LoaderCityMap";

gsap.registerPlugin(MotionPathPlugin);

const MESSAGES = [
  "Preparing your journey...",
  "Finding nearby travelers...",
  "Optimizing routes...",
  "Connecting communities...",
] as const;

const INTRO_DURATION = 5.4;

type CinematicLoaderProps = {
  onComplete: () => void;
  lenis?: Lenis | null;
};

export function CinematicLoader({ onComplete, lenis }: CinematicLoaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const logoRouteRef = useRef<SVGPathElement>(null);
  const mapRouteRef = useRef<SVGPathElement>(null);
  const pinRef = useRef<SVGCircleElement>(null);
  const pinGlowRef = useRef<SVGCircleElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const mapDotsRef = useRef<HTMLDivElement>(null);
  const [messageIndex, setMessageIndex] = useState(0);
  const completedRef = useRef(false);

  useEffect(() => {
    document.body.classList.add("intro-active");
    lenis?.stop();

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      sessionStorage.setItem("dostdrop-cinematic-intro", "1");
      document.body.classList.remove("intro-active");
      lenis?.start();
      onComplete();
      return;
    }

    let pageReady = document.readyState === "complete";
    const onLoad = () => {
      pageReady = true;
    };
    if (!pageReady) {
      window.addEventListener("load", onLoad);
    }

    const finish = () => {
      if (completedRef.current) return;
      completedRef.current = true;

      const exitTl = gsap.timeline({
        onComplete: () => {
          document.body.classList.remove("intro-active");
          lenis?.start();
          onComplete();
          requestAnimationFrame(() => refreshScrollEngine());
        },
      });

      exitTl
        .to(contentRef.current, {
          opacity: 0,
          y: -12,
          scale: 0.99,
          duration: 0.85,
          ease: "power2.inOut",
        })
        .to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
          },
          0.12,
        );
    };

    const ctx = gsap.context(() => {
      const logoRoute = logoRouteRef.current;
      const mapRoute = mapRouteRef.current;
      const letters = logoRef.current?.querySelectorAll(".logo-letter");
      const dots = mapDotsRef.current?.querySelectorAll(".loader-map-dot");

      if (logoRoute) {
        const len = logoRoute.getTotalLength();
        gsap.set(logoRoute, { strokeDasharray: len, strokeDashoffset: len });
      }
      if (mapRoute) {
        const len = mapRoute.getTotalLength();
        gsap.set(mapRoute, { strokeDasharray: len, strokeDashoffset: len });
      }

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
      });

      tl.fromTo(
        dots ?? [],
        { opacity: 0, scale: 0 },
        { opacity: 0.6, scale: 1, duration: 0.55, stagger: 0.012, ease: "power1.out" },
        0.15,
      )
        .fromTo(
          letters ?? [],
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.055, ease: "power3.out" },
          0.4,
        );

      if (logoRoute) {
        tl.to(logoRoute, { strokeDashoffset: 0, duration: 0.85, ease: "power1.inOut" }, 0.55);
      }

      if (mapRoute) {
        tl.to(mapRoute, { strokeDashoffset: 0, duration: 2.4, ease: "power1.inOut" }, 0.75);
      }

      if (pinRef.current && mapRoute) {
        tl.fromTo(pinRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.9)
          .fromTo(pinGlowRef.current, { opacity: 0 }, { opacity: 0.45, duration: 0.3 }, 0.9)
          .to(
            pinRef.current,
            {
              motionPath: {
                path: mapRoute,
                align: mapRoute,
                alignOrigin: [0.5, 0.5],
              },
              duration: 2.2,
              ease: "power1.inOut",
            },
            0.95,
          )
          .to(
            pinGlowRef.current,
            {
              motionPath: {
                path: mapRoute,
                align: mapRoute,
                alignOrigin: [0.5, 0.5],
              },
              duration: 2.2,
              ease: "power1.inOut",
            },
            0.95,
          );
      }

      if (progressRef.current) {
        tl.to(progressRef.current, { scaleX: 1, duration: INTRO_DURATION - 0.3, ease: "power1.inOut" }, 0.35);
      }

      MESSAGES.forEach((_, i) => {
        const at = 1 + i * 1.05;
        tl.call(() => setMessageIndex(i), [], at);
        if (messageRef.current) {
          tl.fromTo(
            messageRef.current,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.45 },
            at,
          );
          if (i < MESSAGES.length - 1) {
            tl.to(messageRef.current, { opacity: 0, y: -6, duration: 0.35, ease: "power2.in" }, at + 0.72);
          }
        }
      });

      tl.to({}, { duration: 0.5 }, INTRO_DURATION - 0.5);
      tl.call(() => {
        const waitForReady = () => {
          if (pageReady) finish();
          else window.addEventListener("load", finish, { once: true });
        };
        waitForReady();
      });
    });

    return () => {
      window.removeEventListener("load", onLoad);
      document.body.classList.remove("intro-active");
      ctx.revert();
    };
  }, [lenis, onComplete]);

  return (
    <div
      ref={overlayRef}
      className="intro-overlay fixed inset-0 z-[200] flex items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label="Loading DostDrop"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #0f172a 0%, #1e293b 46%, #0f172a 100%)",
        }}
      />
      <SceneGrain />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 35%, rgba(0,0,0,0.1) 100%)",
        }}
      />

      <div
        ref={contentRef}
        className="relative z-10 flex w-full max-w-xl flex-col items-center px-6"
      >
        <DostDropLogoDraw ref={logoRef} routeRef={logoRouteRef} className="mb-10 md:mb-12" />

        <div ref={mapDotsRef} className="relative w-full">
          <LoaderCityMap className="h-auto w-full" />
          <svg
            viewBox="0 0 400 240"
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            aria-hidden
          >
            <path
              ref={mapRouteRef}
              d="M48 188 Q120 140 200 120 T352 72"
              fill="none"
              stroke="var(--senders-teal)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle
              ref={pinGlowRef}
              r="14"
              fill="var(--cinematic-glow)"
              opacity="0"
            />
            <circle
              ref={pinRef}
              r="6"
              fill="var(--cinematic-glow)"
              stroke="white"
              strokeWidth="2"
              opacity="0"
            />
          </svg>
        </div>

        <p
          ref={messageRef}
          className="story-subtitle story-subtitle--light mt-10 min-h-[2rem] text-center text-lg opacity-0 md:text-xl"
        >
          {MESSAGES[messageIndex]}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-600/15">
        <div
          ref={progressRef}
          className="h-full origin-left bg-gradient-to-r from-teal-500 to-amber-500"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
