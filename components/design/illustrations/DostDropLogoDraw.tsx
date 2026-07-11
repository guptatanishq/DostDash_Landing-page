import { forwardRef } from "react";

type LogoDrawProps = {
  className?: string;
  routeRef?: React.Ref<SVGPathElement>;
};

const LETTERS = ["D", "o", "s", "t", "D", "r", "o", "p"] as const;

export const DostDropLogoDraw = forwardRef<HTMLDivElement, LogoDrawProps>(
  function DostDropLogoDraw({ className = "", routeRef }, ref) {
    return (
      <div ref={ref} className={`relative flex flex-col items-center ${className}`}>
        <h1
          className="story-display flex text-4xl tracking-tight text-slate-800 md:text-6xl"
          aria-label="DostDrop"
        >
          {LETTERS.map((letter, i) => (
            <span
              key={`${letter}-${i}`}
              className="logo-letter inline-block opacity-0"
              style={{ transform: "translateY(12px)" }}
            >
              {letter}
            </span>
          ))}
        </h1>
        <svg
          viewBox="0 0 280 24"
          className="mt-3 h-3 w-48 md:w-56"
          aria-hidden
        >
          <path
            ref={routeRef}
            d="M4 12 Q70 4 140 12 T276 12"
            fill="none"
            stroke="var(--senders-teal)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  },
);
