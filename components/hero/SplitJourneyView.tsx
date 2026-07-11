const SYNC_BEATS = [
  { customer: "Create request", traveler: "Publish route" },
  { customer: "Request posted", traveler: "Route live" },
  { customer: "Matched", traveler: "Accept" },
  { customer: "Tracking", traveler: "Delivering" },
  { customer: "Received", traveler: "Earned" },
] as const;

function PanelShell({
  side,
  children,
}: {
  side: "customer" | "traveler";
  children: React.ReactNode;
}) {
  const isCustomer = side === "customer";
  return (
    <div
      className={`split-panel relative flex h-full flex-col overflow-hidden rounded-2xl border ${
        isCustomer
          ? "border-orange-400/20 bg-gradient-to-br from-orange-950/40 to-slate-900/60"
          : "border-teal-400/20 bg-gradient-to-br from-teal-950/40 to-slate-900/60"
      }`}
    >
      <div
        className={`px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] ${
          isCustomer ? "text-orange-300/80" : "text-teal-300/80"
        }`}
      >
        {isCustomer ? "Customer" : "Traveler"}
      </div>
      <div className="relative flex flex-1 flex-col items-center justify-center px-5 pb-6">
        {children}
      </div>
    </div>
  );
}

function CustomerCreate() {
  return (
    <div className="split-ui split-ui--customer w-full max-w-[200px] space-y-2.5" data-customer-stage={0}>
      <p className="text-[11px] font-semibold text-orange-100/90">New request</p>
      <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-white/80">
        Saree from Malleswaram
      </div>
      <div className="flex h-16 items-center justify-center rounded-lg border border-dashed border-white/15 bg-white/5">
        <span className="text-[10px] text-white/40">+ Photo</span>
      </div>
      <button type="button" className="w-full rounded-full bg-orange-500 py-2 text-[10px] font-semibold text-white">
        Post request
      </button>
    </div>
  );
}

function CustomerPosted() {
  return (
    <div className="split-ui split-ui--customer flex flex-col items-center gap-3 py-4 opacity-0" data-customer-stage={1}>
      <div className="h-14 w-14 animate-spin rounded-full border-2 border-orange-400/40 border-t-orange-400 [animation-duration:2.5s]" />
      <p className="text-center text-[11px] text-white/70">Finding someone already headed there...</p>
    </div>
  );
}

function CustomerTracking() {
  return (
    <div className="split-ui split-ui--customer w-full max-w-[200px] space-y-2 opacity-0" data-customer-stage={2}>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-teal-400">Matched</span>
        <span className="rounded-full bg-teal-500/20 px-2 py-0.5 text-[9px] text-teal-300">Live</span>
      </div>
      <div className="h-24 rounded-xl bg-white/5 p-2">
        <svg viewBox="0 0 160 80" className="h-full w-full" aria-hidden>
          <path d="M10 60 Q60 20 140 35" fill="none" stroke="#14b8a6" strokeWidth="2" />
          <circle cx="80" cy="38" r="5" fill="#f59e0b" />
        </svg>
      </div>
    </div>
  );
}

function CustomerEnRoute() {
  return (
    <div className="split-ui split-ui--customer flex flex-col items-center gap-3 py-4 opacity-0" data-customer-stage={3}>
      <div className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-orange-400/50 bg-orange-500/10 text-2xl">
        ▣
      </div>
      <p className="text-[11px] text-white/70">Arriving in 8 min</p>
    </div>
  );
}

function CustomerReceived() {
  return (
    <div className="split-ui split-ui--customer flex flex-col items-center gap-2 py-6 opacity-0" data-customer-stage={4}>
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500/20 text-2xl text-green-400">✓</div>
      <p className="text-sm font-semibold text-white/90">Item received</p>
    </div>
  );
}

function TravelerRoute() {
  return (
    <div className="split-ui split-ui--traveler w-full max-w-[200px] space-y-2.5 opacity-0" data-traveler-stage={0}>
      <p className="text-[11px] font-semibold text-teal-100/90">My commute</p>
      <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-white/80">
        Indiranagar → Koramangala
      </div>
      <div className="h-16 rounded-lg bg-white/5 p-2">
        <svg viewBox="0 0 160 60" className="h-full w-full" aria-hidden>
          <path d="M10 40 L150 25" fill="none" stroke="#14b8a6" strokeWidth="2" strokeDasharray="4 4" />
        </svg>
      </div>
      <button type="button" className="w-full rounded-full bg-teal-500 py-2 text-[10px] font-semibold text-white">
        Publish route
      </button>
    </div>
  );
}

function TravelerLive() {
  return (
    <div className="split-ui split-ui--traveler flex flex-col items-center gap-3 py-4 opacity-0" data-traveler-stage={1}>
      <div className="rounded-full bg-teal-500/20 px-3 py-1 text-[10px] font-medium text-teal-300">Route active</div>
      <p className="text-center text-[11px] text-white/60">Listening for nearby requests</p>
    </div>
  );
}

function TravelerAccept() {
  return (
    <div className="split-ui split-ui--traveler w-full max-w-[200px] space-y-2 opacity-0" data-traveler-stage={2}>
      <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-3">
        <p className="text-[10px] font-bold text-amber-300">Nearby request</p>
        <p className="mt-1 text-[11px] text-white/80">2 min detour · ₹85</p>
      </div>
      <button type="button" className="w-full rounded-full bg-amber-600 py-2 text-[10px] font-semibold text-white">
        Accept
      </button>
    </div>
  );
}

function TravelerDeliver() {
  return (
    <div className="split-ui split-ui--traveler w-full max-w-[200px] space-y-2 opacity-0" data-traveler-stage={3}>
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg border border-orange-400/40 bg-white/10" />
        <span className="text-[10px] text-white/70">→</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/30 text-xs">✓</div>
      </div>
      <p className="text-[10px] text-white/50">Pickup done · En route</p>
    </div>
  );
}

function TravelerReward() {
  return (
    <div className="split-ui split-ui--traveler flex flex-col items-center gap-2 py-6 opacity-0" data-traveler-stage={4}>
      <p className="text-[10px] uppercase tracking-wide text-teal-300/70">Earned</p>
      <p className="story-display text-3xl text-white">₹85</p>
    </div>
  );
}

const CUSTOMER_UI = [CustomerCreate, CustomerPosted, CustomerTracking, CustomerEnRoute, CustomerReceived];
const TRAVELER_UI = [TravelerRoute, TravelerLive, TravelerAccept, TravelerDeliver, TravelerReward];

export function SplitSyncRail() {
  return (
    <div className="split-sync-rail mx-auto flex max-w-3xl items-center justify-between gap-1 px-2">
      {SYNC_BEATS.map((beat, i) => (
        <div key={beat.customer} className="flex flex-1 flex-col items-center gap-1.5">
          <div
            className="split-sync-dot h-2 w-2 rounded-full bg-white/20 transition-none"
            data-sync-dot={i}
          />
          <span
            className="split-sync-label hidden text-center text-[8px] leading-tight text-white/35 md:block"
            data-sync-label={i}
          >
            {beat.customer} · {beat.traveler}
          </span>
        </div>
      ))}
    </div>
  );
}

type SplitJourneyViewProps = {
  layout?: "split" | "stacked";
  preview?: boolean;
};

export function SplitJourneyView({ layout = "split", preview = false }: SplitJourneyViewProps) {
  const isStacked = layout === "stacked";

  return (
    <div
      className={`split-journey-view relative h-full w-full ${
        isStacked ? "flex flex-col gap-4" : "flex items-stretch gap-0"
      }`}
    >
      <div
        className={`split-journey-half split-journey-half--customer relative z-10 ${
          isStacked ? "h-1/2 w-full" : "w-1/2 pr-2 md:pr-3"
        }`}
      >
        <PanelShell side="customer">
          {CUSTOMER_UI.map((UI, i) => (
            <div
              key={i}
              className={`absolute inset-0 flex items-center justify-center ${
                preview && i !== 0 ? "hidden" : i === 0 ? "" : "pointer-events-none"
              }`}
            >
              <UI />
            </div>
          ))}
        </PanelShell>
      </div>

      {!preview && (
        <div
          className={`split-journey-connector absolute left-1/2 top-0 z-20 flex h-full w-px -translate-x-1/2 flex-col items-center justify-center ${
            isStacked ? "pointer-events-none opacity-0" : ""
          }`}
        >
          <div className="split-connector-line absolute inset-y-8 w-px bg-white/15" />
          <div className="split-connector-bridge absolute left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-orange-400 via-white to-teal-400 opacity-0" />

          {[0.15, 0.35, 0.55, 0.75].map((pos) => (
            <div
              key={pos}
              className="split-connector-node absolute h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-white/20 opacity-0"
              style={{ top: `${pos * 100}%` }}
            />
          ))}

          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="split-connector-particle absolute h-1.5 w-1.5 rounded-full bg-white/60 opacity-0"
              style={{ top: `${30 + i * 15}%`, left: i % 2 === 0 ? "-4px" : "4px" }}
            />
          ))}

          <div className="split-connector-merge absolute flex flex-col items-center gap-2 opacity-0">
            <div className="split-merge-orb relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-400/40 via-white/25 to-teal-400/40 backdrop-blur-sm">
              <span className="text-lg">🤝</span>
              <div className="split-merge-ring absolute inset-0 rounded-full border border-white/30" />
            </div>
            <span className="whitespace-nowrap text-[9px] font-semibold uppercase tracking-widest text-white/80">
              One delivery
            </span>
          </div>
        </div>
      )}

      <div
        className={`split-journey-half split-journey-half--traveler relative z-10 ${
          isStacked ? "h-1/2 w-full" : "w-1/2 pl-2 md:pl-3"
        }`}
      >
        <PanelShell side="traveler">
          {TRAVELER_UI.map((UI, i) => (
            <div
              key={i}
              className={`absolute inset-0 flex items-center justify-center ${
                preview && i !== 0 ? "hidden" : i === 0 ? "" : "pointer-events-none"
              }`}
            >
              {preview && i === 0 ? (
                <div className="opacity-100 [&_[data-traveler-stage]]:opacity-100">
                  <UI />
                </div>
              ) : (
                <UI />
              )}
            </div>
          ))}
        </PanelShell>
      </div>
    </div>
  );
}

export { SYNC_BEATS };
