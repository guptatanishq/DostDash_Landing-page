const COUNTERS = [
  {
    id: "deliveries",
    community: "Journeys completed",
    value: 12480,
    format: (n: number) => n.toLocaleString("en-IN"),
    suffix: "+",
    accent: "#14b8a6",
  },
  {
    id: "earnings",
    community: "Earned by travelers",
    value: 840000,
    format: (n: number) => {
      if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
      return `₹${Math.round(n).toLocaleString("en-IN")}`;
    },
    suffix: "+",
    accent: "#f59e0b",
  },
  {
    id: "distance",
    community: "Empty miles avoided",
    value: 24600,
    format: (n: number) => n.toLocaleString("en-IN"),
    suffix: " km",
    accent: "#38bdf8",
  },
  {
    id: "emissions",
    community: "CO₂ kept out of the air",
    value: 1.8,
    format: (n: number) => n.toFixed(1),
    suffix: " t",
    accent: "#4ade80",
  },
] as const;

type ImpactCountersProps = {
  className?: string;
};

export function ImpactCounters({ className = "" }: ImpactCountersProps) {
  return (
    <div className={`impact-counters grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4 ${className}`}>
      {COUNTERS.map((c) => (
        <div
          key={c.id}
          className="impact-counter-card rounded-2xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-md md:px-5 md:py-5"
          data-impact-counter={c.id}
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/45 md:text-[11px]">
            {c.community}
          </p>
          <p className="impact-counter-value story-display mt-2 text-2xl text-white md:text-3xl" data-impact-value={c.id}>
            {c.id === "earnings" ? "₹0" : c.id === "emissions" ? "0.0 t" : "0"}
          </p>
          <div
            className="impact-counter-bar mt-3 h-0.5 overflow-hidden rounded-full bg-white/10"
            data-impact-bar={c.id}
          >
            <div
              className="impact-counter-bar__fill h-full w-0 rounded-full"
              style={{ background: c.accent }}
              data-impact-bar-fill={c.id}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export { COUNTERS };
