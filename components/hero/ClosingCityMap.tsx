"use client";

import { forwardRef, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

type ClosingCityMapProps = {
  className?: string;
  reducedMotion?: boolean;
};

const COLORS = ["#14b8a6", "#f59e0b", "#38bdf8", "#fb923c", "#2dd4bf"] as const;

const HUBS = Array.from({ length: 24 }, (_, i) => ({
  x: 60 + (i % 6) * 175 + ((i * 17) % 35),
  y: 110 + Math.floor(i / 6) * 155 + ((i * 23) % 30),
}));

function buildRoutes() {
  const routes: { d: string; color: string; width: number; opacity: number }[] = [];
  const offsets = [1, 2, 3, 5, 8];

  for (let i = 0; i < HUBS.length; i++) {
    for (const off of offsets) {
      const j = (i + off) % HUBS.length;
      if (j === i) continue;
      const a = HUBS[i];
      const b = HUBS[j];
      const mx = (a.x + b.x) / 2 + (b.y - a.y) * 0.12;
      const my = (a.y + b.y) / 2 - (b.x - a.x) * 0.08;
      routes.push({
        d: `M${a.x} ${a.y} Q${mx} ${my} ${b.x} ${b.y}`,
        color: COLORS[(i + off) % COLORS.length],
        width: 1.2 + (off % 3) * 0.5,
        opacity: 0.3 + (off % 4) * 0.12,
      });
    }
  }
  return routes;
}

const CLOSING_ROUTES = buildRoutes();

const ROADS = [
  "M0 400 H1200",
  "M0 500 H1200",
  "M0 600 H1200",
  "M160 0 V800",
  "M400 0 V800",
  "M640 0 V800",
  "M880 0 V800",
] as const;

const BLOCKS = Array.from({ length: 64 }, (_, i) => ({
  x: 15 + ((i * 79) % 1160),
  y: 35 + ((i * 43) % 620),
  w: 20 + ((i * 8) % 34),
  h: 14 + ((i * 6) % 40),
  o: 0.02 + (i % 8) * 0.01,
}));

const TRAVELER_ROUTE_INDICES = [0, 12, 24, 36, 48, 60];

export const ClosingCityMap = forwardRef<HTMLDivElement, ClosingCityMapProps>(
  function ClosingCityMap({ className = "", reducedMotion = false }, ref) {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
      if (reducedMotion || !svgRef.current) return;

      const svg = svgRef.current;
      const travelers = svg.querySelectorAll<SVGGElement>(".closing-traveler");
      const routePaths = svg.querySelectorAll<SVGPathElement>(".closing-route");

      const ctx = gsap.context(() => {
        travelers.forEach((traveler, i) => {
          const routeIdx = TRAVELER_ROUTE_INDICES[i % TRAVELER_ROUTE_INDICES.length];
          const path = routePaths[routeIdx];
          if (!path) return;

          gsap.set(traveler, { opacity: 0.75 });
          gsap.to(traveler, {
            motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
            duration: 12 + (i % 3) * 4,
            ease: "none",
            repeat: -1,
          });
        });
      }, svg);

      return () => ctx.revert();
    }, [reducedMotion]);

    return (
      <div ref={ref} className={`closing-city-map relative h-full w-full ${className}`}>
        <div className={`closing-city-map__drift absolute inset-0 ${reducedMotion ? "" : "closing-city-map__drift--active"}`}>
          <svg
            ref={svgRef}
            viewBox="0 0 1200 800"
            className="closing-city-canvas h-full w-full"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden
          >
            <defs>
              <filter id="closing-route-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient id="closing-vignette" cx="50%" cy="50%" r="70%">
                <stop offset="35%" stopColor="#0f172a" stopOpacity="0" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.92" />
              </radialGradient>
            </defs>

            <g className="closing-blocks">
              {BLOCKS.map((b, i) => (
                <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="2" fill="white" opacity={b.o} />
              ))}
            </g>

            <g opacity="0.1">
              {ROADS.map((d, i) => (
                <path key={i} d={d} stroke="white" strokeWidth="1" fill="none" />
              ))}
            </g>

            <g className="closing-routes">
              {CLOSING_ROUTES.map((route, i) => (
                <path
                  key={i}
                  d={route.d}
                  fill="none"
                  stroke={route.color}
                  strokeWidth={route.width}
                  strokeLinecap="round"
                  opacity={route.opacity}
                  filter="url(#closing-route-glow)"
                  className={`closing-route ${reducedMotion ? "" : "closing-route--flow"}`}
                  style={{
                    animationDelay: `${(i % 16) * 0.4}s`,
                    strokeDasharray: i % 3 === 0 ? "6 10" : undefined,
                  }}
                />
              ))}
            </g>

            <g className="closing-hubs">
              {HUBS.map((hub, i) => (
                <g key={i}>
                  <circle
                    cx={hub.x}
                    cy={hub.y}
                    r="5"
                    fill="#14b8a6"
                    opacity="0.18"
                    className={reducedMotion ? "" : "closing-hub-pulse"}
                    style={{ animationDelay: `${(i % 8) * 0.45}s` }}
                  />
                  <circle cx={hub.x} cy={hub.y} r="1.5" fill="#14b8a6" opacity="0.65" />
                </g>
              ))}
            </g>

            <g className="closing-travelers-group">
              {TRAVELER_ROUTE_INDICES.map((_, i) => (
                <g key={i} className="closing-traveler">
                  <circle r="4" fill={COLORS[i % COLORS.length]} />
                </g>
              ))}
            </g>

            <rect width="1200" height="800" fill="url(#closing-vignette)" />
          </svg>
        </div>

        <div className="closing-city-map__fog pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-[#0f172a]/40" />
      </div>
    );
  },
);
