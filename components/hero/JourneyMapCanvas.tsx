import { forwardRef } from "react";

export const JOURNEY_ROUTE = "M150 620 Q320 520 480 420 Q640 340 820 300";

export const JOURNEY_POINTS = {
  sender: { x: 150, y: 620 },
  pickup: { x: 480, y: 420 },
  destination: { x: 820, y: 300 },
} as const;

const ROADS = [
  "M0 420 H1200",
  "M0 520 H1200",
  "M0 620 H1200",
  "M300 0 V800",
  "M600 0 V800",
  "M900 0 V800",
] as const;

export const JourneyMapCanvas = forwardRef<SVGSVGElement, { className?: string }>(
  function JourneyMapCanvas({ className = "" }, ref) {
    return (
      <svg
        ref={ref}
        viewBox="0 0 1200 800"
        className={`journey-map h-full w-full ${className}`}
        aria-hidden
      >
        <defs>
          <filter id="journey-glow" x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="journey-roads" opacity="0.9">
          {ROADS.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="rgba(148,163,184,0.15)"
              strokeWidth={i < 3 ? 24 : 18}
              strokeLinecap="round"
            />
          ))}
        </g>

        {/* Scan lines during matching */}
        <g className="journey-scan-lines" opacity="0">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line
              key={angle}
              className="journey-scan-line"
              x1={JOURNEY_POINTS.sender.x}
              y1={JOURNEY_POINTS.sender.y}
              x2={JOURNEY_POINTS.sender.x + Math.cos((angle * Math.PI) / 180) * 120}
              y2={JOURNEY_POINTS.sender.y + Math.sin((angle * Math.PI) / 180) * 120}
              stroke="#14b8a6"
              strokeWidth="1.5"
              opacity="0.4"
            />
          ))}
        </g>

        <path
          className="journey-route"
          d={JOURNEY_ROUTE}
          fill="none"
          stroke="#14b8a6"
          strokeWidth="5"
          strokeLinecap="round"
          filter="url(#journey-glow)"
          opacity="0"
        />

        <g className="journey-sender-pin" opacity="0">
          <circle cx={JOURNEY_POINTS.sender.x} cy={JOURNEY_POINTS.sender.y} r="12" fill="#fb923c" opacity="0.3" />
          <circle cx={JOURNEY_POINTS.sender.x} cy={JOURNEY_POINTS.sender.y} r="6" fill="#fb923c" stroke="white" strokeWidth="1.5" />
        </g>

        <g className="journey-pickup-pin" opacity="0">
          <rect
            x={JOURNEY_POINTS.pickup.x - 14}
            y={JOURNEY_POINTS.pickup.y - 18}
            width="28"
            height="22"
            rx="3"
            fill="rgba(255,255,255,0.12)"
            stroke="#fb923c"
            strokeWidth="2"
          />
        </g>

        <g className="journey-dest-pin" opacity="0">
          <circle cx={JOURNEY_POINTS.destination.x} cy={JOURNEY_POINTS.destination.y} r="12" fill="#fbbf24" opacity="0.3" />
          <circle cx={JOURNEY_POINTS.destination.x} cy={JOURNEY_POINTS.destination.y} r="6" fill="#fbbf24" stroke="white" strokeWidth="1.5" />
        </g>

        <g className="journey-traveler-pin" opacity="0">
          <circle r="18" fill="#14b8a6" opacity="0.25" className="journey-traveler-pulse" />
          <circle r="7" fill="#14b8a6" stroke="white" strokeWidth="2" />
        </g>

        <g className="journey-package" opacity="0">
          <rect x="-10" y="-8" width="20" height="16" rx="2" fill="white" stroke="#fb923c" strokeWidth="1.5" />
        </g>

        <g className="journey-delivered-check" opacity="0">
          <circle r="14" fill="rgba(74,222,128,0.25)" stroke="#4ade80" strokeWidth="2" />
          <path d="M-5 0 L-1 4 L7 -5" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
        </g>
      </svg>
    );
  },
);
