import { forwardRef } from "react";

type ImpactCityCanvasProps = {
  className?: string;
};

const ROADS = [
  "M0 400 H1200",
  "M0 500 H1200",
  "M0 600 H1200",
  "M0 700 H1200",
  "M160 0 V800",
  "M360 0 V800",
  "M560 0 V800",
  "M760 0 V800",
  "M960 0 V800",
] as const;

export const IMPACT_HUBS = [
  { x: 180, y: 520, label: "north" },
  { x: 380, y: 380, label: "central" },
  { x: 620, y: 440, label: "east" },
  { x: 880, y: 360, label: "tech" },
  { x: 1020, y: 520, label: "south" },
  { x: 280, y: 620, label: "market" },
  { x: 720, y: 580, label: "campus" },
  { x: 480, y: 280, label: "uptown" },
  { x: 840, y: 640, label: "harbor" },
  { x: 120, y: 360, label: "west" },
] as const;

export const IMPACT_ROUTES = [
  { d: "M180 520 Q300 450 380 380", color: "#14b8a6", width: 3 },
  { d: "M380 380 Q500 400 620 440", color: "#f59e0b", width: 3 },
  { d: "M620 440 Q750 400 880 360", color: "#14b8a6", width: 3 },
  { d: "M880 360 Q950 430 1020 520", color: "#38bdf8", width: 2.5 },
  { d: "M180 520 Q230 570 280 620", color: "#f59e0b", width: 2.5 },
  { d: "M280 620 Q480 600 720 580", color: "#14b8a6", width: 3 },
  { d: "M720 580 Q780 610 840 640", color: "#38bdf8", width: 2.5 },
  { d: "M380 380 Q430 330 480 280", color: "#fb923c", width: 2.5 },
  { d: "M480 280 Q550 360 620 440", color: "#14b8a6", width: 2.5 },
  { d: "M120 360 Q150 440 180 520", color: "#f59e0b", width: 2.5 },
  { d: "M120 360 Q300 320 480 280", color: "#38bdf8", width: 2 },
  { d: "M620 440 Q700 500 720 580", color: "#fb923c", width: 2.5 },
  { d: "M880 360 Q760 480 720 580", color: "#14b8a6", width: 2 },
  { d: "M1020 520 Q920 580 840 640", color: "#f59e0b", width: 2 },
  { d: "M280 620 Q340 500 380 380", color: "#38bdf8", width: 2 },
  { d: "M180 520 Q400 500 620 440", color: "#14b8a6", width: 2 },
] as const;

const TRAVELER_ROUTES = [0, 2, 5, 8, 11, 13] as const;

const BLOCKS = Array.from({ length: 72 }, (_, i) => ({
  x: 20 + ((i * 83) % 1140),
  y: 40 + ((i * 41) % 600),
  w: 22 + ((i * 9) % 38),
  h: 16 + ((i * 7) % 42),
  o: 0.025 + (i % 7) * 0.012,
}));

export const ImpactCityCanvas = forwardRef<SVGSVGElement, ImpactCityCanvasProps>(
  function ImpactCityCanvas({ className = "" }, ref) {
    return (
      <svg
        ref={ref}
        viewBox="0 0 1200 800"
        className={`impact-city-canvas h-full w-full ${className}`}
        aria-hidden
      >
        <defs>
          <filter id="impact-route-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="impact-hub-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="impact-city-vignette" cx="50%" cy="50%" r="65%">
            <stop offset="40%" stopColor="#0f172a" stopOpacity="0" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.85" />
          </radialGradient>
        </defs>

        <g className="impact-city-blocks">
          {BLOCKS.map((b, i) => (
            <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="2" fill="white" opacity={b.o} />
          ))}
        </g>

        <g className="impact-city-roads" opacity="0.12">
          {ROADS.map((d, i) => (
            <path key={i} d={d} stroke="white" strokeWidth="1" fill="none" />
          ))}
        </g>

        <g className="impact-network-routes" opacity="0">
          {IMPACT_ROUTES.map((route, i) => (
            <path
              key={i}
              d={route.d}
              fill="none"
              stroke={route.color}
              strokeWidth={route.width}
              strokeLinecap="round"
              filter="url(#impact-route-glow)"
              className="impact-network-route"
              data-route-index={i}
            />
          ))}
        </g>

        <g className="impact-hubs">
          {IMPACT_HUBS.map((hub, i) => (
            <g key={hub.label} className="impact-hub" data-hub={i} opacity="0.3">
              <circle cx={hub.x} cy={hub.y} r="18" fill="url(#impact-hub-glow)" className="impact-hub-glow" />
              <circle cx={hub.x} cy={hub.y} r="4" fill="#14b8a6" className="impact-hub-core" />
              <circle
                cx={hub.x}
                cy={hub.y}
                r="10"
                fill="none"
                stroke="#14b8a6"
                strokeWidth="1"
                opacity="0"
                className="impact-community-ring"
              />
            </g>
          ))}
        </g>

        <g className="impact-travelers" opacity="0">
          {TRAVELER_ROUTES.map((routeIdx, i) => (
            <g key={i} className="impact-traveler" data-traveler-route={routeIdx}>
              <circle r="5" fill="#f59e0b" className="impact-traveler-dot" />
              <circle r="10" fill="#f59e0b" opacity="0.25" className="impact-traveler-pulse" />
            </g>
          ))}
        </g>

        <rect width="1200" height="800" fill="url(#impact-city-vignette)" className="impact-vignette" opacity="0.6" />
      </svg>
    );
  },
);
