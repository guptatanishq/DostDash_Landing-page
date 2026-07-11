type LoaderCityMapProps = {
  className?: string;
};

const DOTS = Array.from({ length: 36 }, (_, i) => ({
  cx: 24 + ((i * 31) % 352),
  cy: 24 + ((i * 19) % 192),
  r: i % 7 === 0 ? 3.5 : 2,
  delay: (i % 6) * 0.04,
}));

export function LoaderCityMap({ className = "" }: LoaderCityMapProps) {
  return (
    <svg viewBox="0 0 400 240" className={className} aria-hidden>
      <rect
        x="8"
        y="8"
        width="384"
        height="224"
        rx="20"
        fill="rgba(255,255,255,0.22)"
        stroke="rgba(71,85,105,0.12)"
        strokeWidth="1"
      />
      {/* subtle grid */}
      {Array.from({ length: 7 }).map((_, i) => (
        <line
          key={`v-${i}`}
          x1={60 + i * 48}
          y1="20"
          x2={60 + i * 48}
          y2="220"
          stroke="rgba(71,85,105,0.06)"
          strokeWidth="1"
        />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <line
          key={`h-${i}`}
          x1="20"
          y1={48 + i * 40}
          x2="380"
          y2={48 + i * 40}
          stroke="rgba(71,85,105,0.06)"
          strokeWidth="1"
        />
      ))}
      {DOTS.map((d, i) => (
        <circle
          key={i}
          className="loader-map-dot"
          cx={d.cx}
          cy={d.cy}
          r={d.r}
          fill={i % 5 === 0 ? "var(--cinematic-glow)" : "#14b8a6"}
          opacity={0.45}
          style={{ animationDelay: `${d.delay}s` }}
        />
      ))}
    </svg>
  );
}
