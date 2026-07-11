"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { scheduleSceneScrollRefresh } from "@/lib/scroll-engine";
import { SceneGrain } from "@/components/design/SceneGrain";
import { LivingCityMap } from "./LivingCityMap";
import { HeroPhoneMockups } from "./HeroPhoneMockups";

const HEADLINE_WORDS = ["Someone", "is", "Already", "Going", "Your", "Way."] as const;

const FLOATING_REQUESTS = [
  { top: "18%", left: "58%", label: "Medicine · Koramangala", delay: 0 },
  { top: "32%", left: "72%", label: "Documents · HSR", delay: 0.8 },
  { top: "48%", left: "52%", label: "Keys · Indiranagar", delay: 1.6 },
  { top: "62%", left: "68%", label: "Gift · Jayanagar", delay: 2.4 },
] as const;

type HeroSectionProps = {
  animateIn?: boolean;
};

export function HeroSection({ animateIn = true }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const phonesRef = useRef<HTMLDivElement>(null);
  const requestsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const animatedRef = useRef(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (reducedMotion) return;
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setParallax({ x: x * 24, y: y * 16 });
    },
    [reducedMotion],
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reducedMotion) return;
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove, reducedMotion]);

  useEffect(() => {
    if (!animateIn || animatedRef.current) return;
    animatedRef.current = true;

    const words = headlineRef.current?.querySelectorAll(".hero-word");
    const buttons = ctaRef.current?.querySelectorAll(".hero-cta");
    const phones = phonesRef.current?.querySelectorAll(".device-showcase__unit");
    const requests = requestsRef.current?.querySelectorAll(".hero-request");

    if (reducedMotion) {
      gsap.set([words, subRef.current, buttons, phones, requests], { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(words ?? [], { opacity: 0, y: 48 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.2)
      .fromTo(subRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, 0.75)
      .fromTo(buttons ?? [], { opacity: 0, y: 20, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.12 }, 1)
      .fromTo(
        phones ?? [],
        { opacity: 0, y: 60, rotateY: -8 },
        { opacity: 1, y: 0, rotateY: 0, duration: 1.1, stagger: 0.15, ease: "power2.out" },
        0.9,
      )
      .fromTo(
        requests ?? [],
        { opacity: 0, y: 16, scale: 0.92 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1 },
        1.1,
      );
  }, [animateIn, reducedMotion]);

  useEffect(() => {
    if (!animateIn || !sectionRef.current || !phonesRef.current || reducedMotion) return;
    registerGsapPlugins();

    const units = phonesRef.current.querySelectorAll(".device-showcase__unit");
    const ctx = gsap.context(() => {
      gsap.to(units, {
        y: -80,
        rotateY: (i) => (i === 0 ? -16 : 16),
        rotateX: 8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    scheduleSceneScrollRefresh();
    return () => ctx.revert();
  }, [animateIn, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-label="DostDrop hero"
      className="hero-section relative h-screen min-h-[640px] w-full overflow-hidden"
    >
      <p className="sr-only">
        Someone is Already Going Your Way. Access what&apos;s not near you through people who
        already are. Start delivering or become a traveler.
      </p>
      <LivingCityMap
        parallaxX={parallax.x}
        parallaxY={parallax.y}
        reducedMotion={reducedMotion}
      />

      <div
        ref={requestsRef}
        className="pointer-events-none absolute inset-0 z-[2] hidden lg:block"
        aria-hidden
      >
        {FLOATING_REQUESTS.map((req) => (
          <div
            key={req.label}
            className="hero-request absolute rounded-xl border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-md"
            style={{ top: req.top, left: req.left, animationDelay: `${req.delay}s` }}
          >
            <span className="text-[11px] font-medium text-white/90">{req.label}</span>
          </div>
        ))}
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[3]"
        style={{
          background:
            "linear-gradient(105deg, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.65) 42%, rgba(15,23,42,0.25) 68%, transparent 100%)",
        }}
      />
      <SceneGrain />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-center px-6 pb-16 pt-24 md:px-10 lg:px-14">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
          <div className="max-w-xl">
            <h1
              ref={headlineRef}
              className="story-display text-[2.35rem] leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]"
            >
              {HEADLINE_WORDS.map((word, i) => (
                <span key={`${word}-${i}`} className="hero-word mr-[0.22em] inline-block opacity-0">
                  {word}
                </span>
              ))}
            </h1>

            <p
              ref={subRef}
              className="mt-6 max-w-md text-base leading-relaxed text-slate-300 opacity-0 md:text-lg"
            >
              Access what&apos;s not near you — through people who already are.
            </p>

            <div ref={ctaRef} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="hero-cta inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-slate-900 opacity-0 shadow-lg shadow-white/10 transition-all hover:bg-slate-100 hover:shadow-xl md:text-base"
              >
                Start Delivering
              </Link>
              <Link
                href="/contact"
                className="hero-cta inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-8 py-4 text-sm font-semibold text-white opacity-0 backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/15 md:text-base"
              >
                Become a Traveler
              </Link>
            </div>
          </div>

          <HeroPhoneMockups
            ref={phonesRef}
            className="mx-auto w-full max-w-md scale-[0.82] sm:scale-90 md:max-w-none md:scale-100"
          />
        </div>
      </div>

      <div className="hero-scroll-hint pointer-events-none absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 md:block">
        <div className="flex flex-col items-center gap-2 text-white/40">
          <span className="text-[10px] font-medium uppercase tracking-[0.2em]">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>
    </section>
  );
}
