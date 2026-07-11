const STAGES = [
  "Create Request",
  "Smart Matching",
  "Traveler Accepts",
  "Pickup",
  "Live Tracking",
  "OTP Verification",
  "Delivery Complete",
  "Reward Released",
] as const;

function CreateUI() {
  return (
    <div className="journey-ui journey-ui--create space-y-3">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-teal-500" />
        <span className="text-xs font-bold text-slate-800">DostDrop</span>
      </div>
      <p className="text-[11px] font-semibold text-slate-600">New request</p>
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-[11px] text-slate-700">
        Saree from Malleswaram
      </div>
      <div className="flex h-20 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
        <span className="text-[10px] text-slate-400">+ Photo</span>
      </div>
      <button type="button" className="w-full rounded-full bg-teal-500 py-2.5 text-[11px] font-semibold text-white">
        Post request
      </button>
    </div>
  );
}

function MatchUI() {
  return (
    <div className="journey-ui journey-ui--match flex flex-col items-center justify-center gap-4 py-8">
      <div className="h-12 w-12 rounded-full border-2 border-teal-400 border-t-transparent" />
      <p className="text-center text-[11px] font-medium text-slate-600">Finding travelers on your route...</p>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-1.5 w-1.5 rounded-full bg-teal-400" style={{ opacity: 0.4 + i * 0.2 }} />
        ))}
      </div>
    </div>
  );
}

function AcceptUI() {
  return (
    <div className="journey-ui journey-ui--accept space-y-3 py-2">
      <p className="text-[10px] font-bold uppercase tracking-wide text-amber-700">Traveler view</p>
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
        <p className="text-[10px] font-bold text-amber-800">New request nearby</p>
        <p className="mt-1 text-[11px] text-slate-700">2 min off your route · ₹85</p>
      </div>
      <button type="button" className="w-full rounded-full bg-amber-600 py-2.5 text-[11px] font-semibold text-white">
        Accept
      </button>
    </div>
  );
}

function PickupUI() {
  return (
    <div className="journey-ui journey-ui--pickup flex flex-col items-center gap-4 py-6">
      <div className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-orange-300 bg-orange-50 text-xl">
        ▣
      </div>
      <p className="text-[11px] font-medium text-slate-700">Confirm pickup</p>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500 text-white">✓</div>
    </div>
  );
}

function TrackingUI() {
  return (
    <div className="journey-ui journey-ui--tracking space-y-3 py-2">
      <p className="text-[10px] font-semibold text-slate-500">Live tracking</p>
      <div className="relative h-32 overflow-hidden rounded-xl bg-slate-100">
        <svg viewBox="0 0 200 120" className="h-full w-full">
          <path d="M20 90 Q80 40 160 50" fill="none" stroke="#14b8a6" strokeWidth="3" />
          <circle cx="100" cy="58" r="6" fill="#f59e0b" />
        </svg>
        <span className="absolute bottom-2 left-2 rounded-full bg-teal-500 px-2 py-0.5 text-[9px] font-bold text-white">
          Live
        </span>
      </div>
      <p className="text-[10px] text-slate-500">Arriving in 12 min</p>
    </div>
  );
}

function OtpUI() {
  return (
    <div className="journey-ui journey-ui--otp flex flex-col items-center gap-4 py-6">
      <p className="text-[11px] font-medium text-slate-700">Enter delivery OTP</p>
      <div className="flex gap-2">
        {["4", "8", "2", "1"].map((d, i) => (
          <div
            key={i}
            className="flex h-11 w-9 items-center justify-center rounded-lg border-2 border-teal-400 bg-teal-50 text-lg font-bold text-slate-800"
          >
            {d}
          </div>
        ))}
      </div>
      <p className="text-[10px] text-slate-400">Verify handoff</p>
    </div>
  );
}

function CompleteUI() {
  return (
    <div className="journey-ui journey-ui--complete flex flex-col items-center gap-3 py-10">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
        ✓
      </div>
      <p className="text-sm font-semibold text-slate-800">Delivered</p>
      <p className="text-[10px] text-slate-500">Handoff confirmed</p>
    </div>
  );
}

function RewardUI() {
  return (
    <div className="journey-ui journey-ui--reward flex flex-col items-center gap-3 py-8">
      <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">Reward released</p>
      <p className="story-display text-4xl text-slate-800">₹85</p>
      <div className="rounded-full bg-teal-50 px-4 py-2 text-[11px] font-medium text-teal-800">
        Added to wallet
      </div>
    </div>
  );
}

const UI_STATES = [CreateUI, MatchUI, AcceptUI, PickupUI, TrackingUI, OtpUI, CompleteUI, RewardUI] as const;

export function JourneyPhonePreview() {
  return (
    <div className="journey-phone mx-auto w-[200px] md:w-[220px]">
      <div className="overflow-hidden rounded-[2rem] border-[3px] border-slate-800 bg-slate-900 shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between bg-slate-900 px-4 pb-1.5 pt-2.5">
          <span className="text-[9px] font-medium text-white/70">9:41</span>
          <div className="mx-auto h-[18px] w-[64px] rounded-full bg-black" />
          <span className="text-[9px] text-white/50">●●●</span>
        </div>
        <div className="relative min-h-[280px] bg-white">
          {UI_STATES.map((UI, i) => (
            <div
              key={STAGES[i]}
              className={`journey-ui-layer absolute inset-0 p-4 ${i === 0 ? "opacity-100" : "opacity-0"}`}
              data-stage={i}
            >
              <UI />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function JourneyStageRail() {
  return (
    <div className="journey-stage-rail flex items-center justify-center gap-2 md:gap-3">
      {STAGES.map((label, i) => (
        <div key={label} className="flex flex-col items-center gap-1.5">
          <div
            className={`journey-stage-dot h-1.5 w-1.5 rounded-full bg-white/25 ${i === 0 ? "journey-stage-dot--active" : ""}`}
            data-stage-dot={i}
          />
          <span
            className={`journey-stage-label hidden text-[9px] font-medium uppercase tracking-wider md:block ${i === 0 ? "text-white/90" : "text-white/40"}`}
            data-stage-label={i}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export { STAGES };
