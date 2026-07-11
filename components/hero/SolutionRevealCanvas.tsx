import { forwardRef } from "react";

type SolutionRevealCanvasProps = {
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

/** Traveler's commute A → B, with detour to pickup */
export const SOLUTION_PATH =
  "M180 580 Q300 500 420 420 Q580 350 780 320";

export const POINT_A = { x: 180, y: 580 };
export const PICKUP = { x: 420, y: 420 };
export const POINT_B = { x: 780, y: 320 };

const FROZEN_BIKES = [
  { x: 320, y: 480, o: 0.12 },
  { x: 410, y: 410, o: 0.1 },
  { x: 500, y: 380, o: 0.11 },
  { x: 280, y: 520, o: 0.09 },
  { x: 550, y: 360, o: 0.1 },
  { x: 380, y: 450, o: 0.08 },
] as const;

const BLOCKS = Array.from({ length: 40 }, (_, i) => ({
  x: 30 + ((i * 89) % 1120),
  y: 60 + ((i * 47) % 560),
  w: 24 + ((i * 11) % 36),
  h: 18 + ((i * 9) % 44),
  o: 0.03 + (i % 6) * 0.015,
}));

export const SolutionRevealCanvas = forwardRef<SVGSVGElement, SolutionRevealCanvasProps>(
  function SolutionRevealCanvas({ className = "" }, ref) {
    return (
      <svg
        ref={ref}
        viewBox="0 0 1200 800"
        className={`solution-canvas h-full w-full ${className}`}
        aria-hidden
      >
        <defs>
          <filter id="solution-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="traveler-highlight" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g className="solution-blocks">
          {BLOCKS.map((b, i) => (
            <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="2" fill="white" opacity={b.o} />
          ))}
        </g>

        <g className="solution-roads">
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
        </g>

        {/* Frozen chaos from previous scene */}
        <g className="solution-frozen-chaos" opacity="0.35">
          {FROZEN_BIKES.map((b, i) => (
            <g key={`fb-${i}`} opacity={b.o * 3}>
              <ellipse cx={b.x} cy={b.y} rx="10" ry="6" fill="#ef4444" />
              <circle cx={b.x - 5} cy={b.y + 4} r="3" fill="#1e293b" />
              <circle cx={b.x + 5} cy={b.y + 4} r="3" fill="#1e293b" />
            </g>
          ))}
          <path
            d="M80 680 Q220 520 420 380 T720 280"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            strokeDasharray="6 8"
            opacity="0.25"
          />
          <path
            d="M80 680 Q240 500 420 380 T720 280"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2"
            strokeDasharray="6 8"
            opacity="0.2"
          />
        </g>

        {/* Commute path A → B (subtle, pre-solution) */}
        <path
          className="solution-commute-path"
          d={SOLUTION_PATH}
          fill="none"
          stroke="rgba(148,163,184,0.25)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="10 8"
          opacity="0"
        />

        {/* Glowing solution route */}
        <path
          className="solution-route"
          d={SOLUTION_PATH}
          fill="none"
          stroke="#14b8a6"
          strokeWidth="5"
          strokeLinecap="round"
          filter="url(#solution-glow)"
          opacity="0"
        />

        {/* Point A */}
        <g className="solution-point-a" opacity="0">
          <circle cx={POINT_A.x} cy={POINT_A.y} r="14" fill="url(#traveler-highlight)" />
          <circle cx={POINT_A.x} cy={POINT_A.y} r="6" fill="#94a3b8" stroke="white" strokeWidth="1.5" />
          <text x={POINT_A.x} y={POINT_A.y + 28} textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="600">
            A
          </text>
        </g>

        {/* Pickup */}
        <g className="solution-pickup" opacity="0">
          <rect
            x={PICKUP.x - 18}
            y={PICKUP.y - 22}
            width="36"
            height="28"
            rx="4"
            fill="rgba(255,255,255,0.15)"
            stroke="#fb923c"
            strokeWidth="2"
          />
          <circle cx={PICKUP.x} cy={PICKUP.y + 20} r="5" fill="#fb923c" opacity="0.8" />
        </g>

        {/* Point B */}
        <g className="solution-point-b" opacity="0">
          <circle cx={POINT_B.x} cy={POINT_B.y} r="14" fill="rgba(251,191,36,0.25)" />
          <circle cx={POINT_B.x} cy={POINT_B.y} r="6" fill="#fbbf24" stroke="white" strokeWidth="1.5" />
          <text x={POINT_B.x} y={POINT_B.y + 28} textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="600">
            B
          </text>
        </g>

        {/* Package (appears at pickup) */}
        <g className="solution-package" opacity="0">
          <rect
            x={-12}
            y={-10}
            width="24"
            height="20"
            rx="3"
            fill="white"
            stroke="#fb923c"
            strokeWidth="2"
          />
          <line x1="0" y1="-10" x2="0" y2="10" stroke="#fb923c" strokeWidth="1.5" />
        </g>

        {/* Traveler */}
        <g className="solution-traveler" opacity="0">
          <circle r="20" fill="url(#traveler-highlight)" className="solution-traveler-glow" />
          <circle r="8" fill="#14b8a6" stroke="white" strokeWidth="2.5" />
        </g>

        {/* Delivery confirmed */}
        <g className="solution-check" opacity="0">
          <circle r="16" fill="rgba(74,222,128,0.2)" stroke="#4ade80" strokeWidth="2" />
          <path
            d="M-6 0 L-1 5 L8 -6"
            fill="none"
            stroke="#4ade80"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    );
  },
);
