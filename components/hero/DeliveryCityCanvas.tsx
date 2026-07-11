import { forwardRef } from "react";

type DeliveryCityCanvasProps = {
  className?: string;
};

const ROADS = [
  "M0 420 H1200",
  "M0 520 H1200",
  "M0 620 H1200",
  "M180 0 V800",
  "M420 0 V800",
  "M660 0 V800",
  "M900 0 V800",
] as const;

/** Multiple couriers taking near-identical paths to the same hub */
const REDUNDANT_ROUTES = [
  "M80 680 Q220 520 420 380 T720 280",
  "M80 680 Q240 500 420 380 T720 280",
  "M80 680 Q200 540 420 380 T720 280",
  "M80 680 Q260 480 420 380 T720 280",
  "M80 680 Q180 560 420 380 T720 280",
  "M80 680 Q280 460 420 380 T720 280",
] as const;

const BIKE_ASSIGNMENTS = [
  { route: 0, color: "#ef4444" },
  { route: 1, color: "#f97316" },
  { route: 2, color: "#ef4444" },
  { route: 0, color: "#dc2626" },
  { route: 3, color: "#f97316" },
  { route: 4, color: "#ef4444" },
  { route: 5, color: "#fb923c" },
  { route: 1, color: "#dc2626" },
  { route: 2, color: "#f97316" },
  { route: 3, color: "#ef4444" },
  { route: 4, color: "#fb923c" },
  { route: 5, color: "#dc2626" },
] as const;

const BLOCKS = Array.from({ length: 56 }, (_, i) => ({
  x: 30 + ((i * 89) % 1120),
  y: 60 + ((i * 47) % 560),
  w: 24 + ((i * 11) % 36),
  h: 18 + ((i * 9) % 44),
  o: 0.03 + (i % 6) * 0.015,
}));

export const DeliveryCityCanvas = forwardRef<SVGSVGElement, DeliveryCityCanvasProps>(
  function DeliveryCityCanvas({ className = "" }, ref) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 1200 800"
      className={`delivery-city-canvas h-full w-full ${className}`}
      aria-hidden
    >
      <defs>
        <filter id="delivery-route-glow" x="-15%" y="-15%" width="130%" height="130%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className="delivery-city-blocks">
        {BLOCKS.map((b, i) => (
          <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="2" fill="white" opacity={b.o} />
        ))}
      </g>

      <g className="delivery-city-roads">
        {ROADS.map((d, i) => (
          <path
            key={`r-${i}`}
            d={d}
            fill="none"
            stroke="rgba(148,163,184,0.14)"
            strokeWidth={i < 3 ? 26 : 20}
            strokeLinecap="round"
          />
        ))}
        {ROADS.map((d, i) => (
          <path
            key={`rl-${i}`}
            d={d}
            fill="none"
            stroke="rgba(148,163,184,0.2)"
            strokeWidth="1.5"
            strokeDasharray="5 8"
          />
        ))}
      </g>

      <g className="delivery-redundant-routes" opacity="0">
        {REDUNDANT_ROUTES.map((d, i) => (
          <path
            key={`dup-${i}`}
            data-route-index={i}
            d={d}
            fill="none"
            stroke="#ef4444"
            strokeWidth={2.5 - i * 0.15}
            strokeLinecap="round"
            strokeDasharray="8 6"
            opacity={0.35 + i * 0.08}
            filter="url(#delivery-route-glow)"
          />
        ))}
        <circle cx="720" cy="280" r="36" fill="url(#hub-glow)" className="delivery-hub-pulse" />
        <circle cx="720" cy="280" r="8" fill="#ef4444" opacity="0.8" />
      </g>

      <g className="delivery-bikes" opacity="0">
        {BIKE_ASSIGNMENTS.map((bike, i) => (
          <g
            key={`bike-${i}`}
            className="delivery-bike"
            data-route-index={bike.route}
            opacity="0"
          >
            <ellipse cx="0" cy="0" rx="11" ry="7" fill={bike.color} />
            <circle cx="-6" cy="5" r="3.5" fill="#1e293b" />
            <circle cx="6" cy="5" r="3.5" fill="#1e293b" />
            <rect x="-4" y="-9" width="8" height="6" rx="1.5" fill="#fef2f2" opacity="0.9" />
          </g>
        ))}
      </g>

      <g className="delivery-traffic-dots" opacity="0">
        {Array.from({ length: 24 }, (_, i) => (
          <circle
            key={`t-${i}`}
            className="delivery-traffic-dot"
            cx={200 + ((i * 41) % 700)}
            cy={300 + ((i * 29) % 350)}
            r="2"
            fill="#fbbf24"
            opacity="0"
          />
        ))}
      </g>
    </svg>
  );
  },
);

export { REDUNDANT_ROUTES, BIKE_ASSIGNMENTS };
