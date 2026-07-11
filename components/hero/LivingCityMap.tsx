"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

type LivingCityMapProps = {
  parallaxX: number;
  parallaxY: number;
  reducedMotion?: boolean;
};

const ROADS = [
  "M0 420 H1200",
  "M0 520 H1200",
  "M0 620 H1200",
  "M180 0 V800",
  "M420 0 V800",
  "M660 0 V800",
  "M900 0 V800",
  "M1080 0 V800",
] as const;

const ROUTES = [
  { d: "M120 520 Q360 380 580 440 T920 360", color: "#14b8a6", width: 4 },
  { d: "M200 620 Q480 500 720 560 T1080 480", color: "#f59e0b", width: 3.5 },
  { d: "M80 420 Q300 300 520 380 T880 320", color: "#fb923c", width: 3 },
  { d: "M340 620 Q560 480 800 520 T1120 400", color: "#38bdf8", width: 3 },
] as const;

const TRAVELERS = [
  { color: "#f59e0b", routeIndex: 0, duration: 14 },
  { color: "#14b8a6", routeIndex: 1, duration: 18 },
  { color: "#fb923c", routeIndex: 2, duration: 16 },
] as const;

const BLOCKS = Array.from({ length: 48 }, (_, i) => ({
  x: 40 + ((i * 97) % 1100),
  y: 80 + ((i * 53) % 520),
  w: 28 + ((i * 13) % 40),
  h: 20 + ((i * 11) % 50),
  o: 0.04 + (i % 5) * 0.02,
}));

export function LivingCityMap({ parallaxX, parallaxY, reducedMotion = false }: LivingCityMapProps) {
  const routeRefs = useRef<(SVGPathElement | null)[]>([]);
  const travelerRefs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      routeRefs.current.forEach((path, i) => {
        if (!path) return;
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2.4 + i * 0.35,
          ease: "power2.inOut",
          delay: 0.4 + i * 0.2,
        });
      });

      travelerRefs.current.forEach((dot, i) => {
        const route = routeRefs.current[TRAVELERS[i].routeIndex];
        if (!dot || !route) return;
        gsap.set(dot, { opacity: 1 });
        gsap.to(dot, {
          motionPath: { path: route, align: route, alignOrigin: [0.5, 0.5] },
          duration: TRAVELERS[i].duration,
          ease: "none",
          repeat: -1,
        });
      });
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  const layer = (depth: number) => ({
    transform: `translate3d(${parallaxX * depth}px, ${parallaxY * depth}px, 0)`,
    transition: reducedMotion ? "none" : "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
  });

  return (
    <div className="hero-map absolute inset-0" aria-hidden>
      <div
        className="hero-map__layer hero-map__layer--sky absolute inset-0"
        style={{
          ...layer(0.012),
          background:
            "radial-gradient(ellipse 90% 60% at 50% 20%, rgba(56,189,248,0.08) 0%, transparent 55%), linear-gradient(180deg, #0f172a 0%, #1e293b 46%, #0f172a 100%)",
        }}
      />

      <svg
        viewBox="0 0 1200 800"
        className="hero-map__layer hero-map__layer--blocks absolute inset-0 h-full w-full"
        style={{ ...layer(0.018), opacity: 0.9 }}
        preserveAspectRatio="xMidYMid slice"
      >
        {BLOCKS.map((b, i) => (
          <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="3" fill="white" opacity={b.o} />
        ))}
      </svg>

      <svg
        viewBox="0 0 1200 800"
        className="hero-map__layer hero-map__layer--roads absolute inset-0 h-full w-full"
        style={layer(0.028)}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="route-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {ROADS.map((d, i) => (
          <path
            key={`road-${i}`}
            d={d}
            fill="none"
            stroke="rgba(148,163,184,0.12)"
            strokeWidth={i < 3 ? 28 : 22}
            strokeLinecap="round"
          />
        ))}
        {ROADS.map((d, i) => (
          <path
            key={`road-line-${i}`}
            d={d}
            fill="none"
            stroke="rgba(148,163,184,0.22)"
            strokeWidth="1.5"
            strokeDasharray="6 10"
            className={reducedMotion ? "" : "hero-road-dash"}
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
        {ROUTES.map((route, i) => (
          <path
            key={`route-${i}`}
            ref={(el) => {
              routeRefs.current[i] = el;
            }}
            d={route.d}
            fill="none"
            stroke={route.color}
            strokeWidth={route.width}
            strokeLinecap="round"
            filter="url(#route-glow)"
            className={reducedMotion ? "" : "hero-route-glow"}
            style={{ animationDelay: `${i * 0.5}s` }}
            opacity={reducedMotion ? 0.85 : 0.95}
          />
        ))}
        {TRAVELERS.map((t, i) => (
          <circle
            key={`traveler-${i}`}
            ref={(el) => {
              travelerRefs.current[i] = el;
            }}
            cx="0"
            cy="0"
            r="6"
            fill={t.color}
            stroke="white"
            strokeWidth="1.5"
            opacity="0"
          />
        ))}
      </svg>

      <div
        className="hero-map__layer hero-map__layer--fog pointer-events-none absolute inset-0"
        style={{
          ...layer(0.035),
          background:
            "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(15,23,42,0.5) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
