import type { ComponentType } from "react";

function ScreenHome() {
  return (
    <div className="app-screen app-screen--home space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-teal-500" />
          <span className="text-xs font-bold text-slate-800">DostDrop</span>
        </div>
        <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[9px] font-semibold text-teal-700">
          Bengaluru
        </span>
      </div>
      <p className="text-[11px] text-slate-500">Good evening, Priya</p>
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Send", icon: "↑", color: "bg-orange-50 text-orange-700" },
          { label: "Travel", icon: "→", color: "bg-teal-50 text-teal-700" },
        ].map((a) => (
          <div key={a.label} className={`rounded-xl p-3 ${a.color}`}>
            <span className="text-lg">{a.icon}</span>
            <p className="mt-1 text-[10px] font-semibold">{a.label}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
        <p className="text-[10px] font-bold text-slate-600">Active delivery</p>
        <p className="mt-1 text-[11px] text-slate-700">Saree · arriving 12 min</p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full w-3/4 rounded-full bg-teal-500" />
        </div>
      </div>
      <div className="flex gap-2 overflow-hidden">
        {["Medicine", "Keys", "Gift"].map((t) => (
          <span key={t} className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[9px] text-slate-500 shadow-sm ring-1 ring-slate-100">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function ScreenDeliveryRequest() {
  return (
    <div className="app-screen app-screen--request space-y-2.5">
      <p className="text-[11px] font-bold text-slate-800">New delivery request</p>
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-700">
        Pickup: Malleswaram Saree Shop
      </div>
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-700">
        Drop: Indiranagar, 560038
      </div>
      <div className="flex h-20 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
        <span className="text-[10px] text-slate-400">+ Add photo</span>
      </div>
      <div className="flex items-center justify-between rounded-lg bg-orange-50 px-3 py-2">
        <span className="text-[10px] text-orange-800">Suggested reward</span>
        <span className="text-sm font-bold text-orange-900">₹85</span>
      </div>
      <button type="button" className="w-full rounded-full bg-teal-500 py-2.5 text-[11px] font-semibold text-white">
        Post request
      </button>
    </div>
  );
}

function ScreenLiveTracking() {
  return (
    <div className="app-screen app-screen--tracking space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold text-slate-800">Live tracking</p>
        <span className="rounded-full bg-teal-500 px-2 py-0.5 text-[9px] font-bold text-white">Live</span>
      </div>
      <div className="relative h-36 overflow-hidden rounded-xl bg-slate-900">
        <svg viewBox="0 0 200 140" className="h-full w-full" aria-hidden>
          <path d="M20 100 Q70 30 120 60 T180 45" fill="none" stroke="#14b8a6" strokeWidth="2.5" opacity="0.8" />
          <circle cx="110" cy="55" r="5" fill="#f59e0b" />
          <circle cx="110" cy="55" r="12" fill="#f59e0b" opacity="0.25" />
        </svg>
        <div className="absolute bottom-2 left-2 rounded-lg bg-black/50 px-2 py-1 text-[9px] text-white backdrop-blur-sm">
          Arriving in 8 min
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-teal-100 text-center text-sm leading-9">R</div>
        <div>
          <p className="text-[10px] font-semibold text-slate-800">Ravi · Traveler</p>
          <p className="text-[9px] text-slate-500">2.1 km away</p>
        </div>
      </div>
    </div>
  );
}

function ScreenWallet() {
  return (
    <div className="app-screen app-screen--wallet space-y-3">
      <p className="text-[11px] font-bold text-slate-800">Wallet</p>
      <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-4 text-white">
        <p className="text-[10px] text-white/60">Available balance</p>
        <p className="story-display mt-1 text-3xl">₹1,240</p>
      </div>
      <p className="text-[10px] font-semibold text-slate-500">Recent</p>
      {[
        { label: "Delivery reward", amt: "+₹85", time: "Today" },
        { label: "Request payment", amt: "-₹85", time: "Yesterday" },
      ].map((t) => (
        <div key={t.label} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
          <div>
            <p className="text-[10px] font-medium text-slate-800">{t.label}</p>
            <p className="text-[9px] text-slate-400">{t.time}</p>
          </div>
          <span className={`text-[11px] font-bold ${t.amt.startsWith("+") ? "text-teal-600" : "text-slate-600"}`}>
            {t.amt}
          </span>
        </div>
      ))}
    </div>
  );
}

function ScreenChat() {
  return (
    <div className="app-screen app-screen--chat flex h-full flex-col">
      <div className="mb-3 flex items-center gap-2 border-b border-slate-100 pb-2">
        <div className="h-8 w-8 rounded-full bg-teal-100 text-center text-xs leading-8 text-teal-800">R</div>
        <div>
          <p className="text-[10px] font-semibold text-slate-800">Ravi</p>
          <p className="text-[9px] text-teal-600">Online · en route</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="max-w-[85%] self-start rounded-2xl rounded-bl-sm bg-slate-100 px-3 py-2 text-[10px] text-slate-700">
          Picked up your saree! On my way.
        </div>
        <div className="max-w-[85%] self-end rounded-2xl rounded-br-sm bg-teal-500 px-3 py-2 text-[10px] text-white">
          Thanks! I&apos;ll share the OTP when you arrive.
        </div>
        <div className="max-w-[85%] self-start rounded-2xl rounded-bl-sm bg-slate-100 px-3 py-2 text-[10px] text-slate-700">
          5 min away 🙌
        </div>
      </div>
      <div className="mt-2 rounded-full bg-slate-100 px-3 py-2 text-[10px] text-slate-400">Type a message…</div>
    </div>
  );
}

function ScreenRoutePublishing() {
  return (
    <div className="app-screen app-screen--route space-y-2.5">
      <p className="text-[11px] font-bold text-slate-800">Publish your route</p>
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-700">
        From: Indiranagar Metro
      </div>
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-700">
        To: Koramangala 5th Block
      </div>
      <div className="h-24 rounded-xl bg-slate-900 p-2">
        <svg viewBox="0 0 180 80" className="h-full w-full" aria-hidden>
          <path d="M10 60 L170 30" fill="none" stroke="#14b8a6" strokeWidth="2" strokeDasharray="5 4" />
          <circle cx="90" cy="45" r="4" fill="#f59e0b" />
        </svg>
      </div>
      <div className="flex items-center justify-between text-[10px] text-slate-500">
        <span>Departs 6:30 PM</span>
        <span className="font-semibold text-teal-600">3 requests nearby</span>
      </div>
      <button type="button" className="w-full rounded-full bg-amber-600 py-2.5 text-[11px] font-semibold text-white">
        Publish route
      </button>
    </div>
  );
}

function ScreenEarnings() {
  return (
    <div className="app-screen app-screen--earnings space-y-3">
      <p className="text-[11px] font-bold text-slate-800">Earnings</p>
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-center">
        <p className="text-[10px] font-medium text-amber-800">Today</p>
        <p className="story-display mt-1 text-4xl text-slate-900">₹340</p>
        <p className="mt-1 text-[9px] text-amber-700">4 deliveries · 2 routes</p>
      </div>
      {[
        { route: "Malleswaram → Indiranagar", earn: "₹85" },
        { route: "HSR → Koramangala", earn: "₹120" },
      ].map((t) => (
        <div key={t.route} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
          <p className="text-[10px] text-slate-600">{t.route}</p>
          <span className="text-[11px] font-bold text-teal-600">{t.earn}</span>
        </div>
      ))}
    </div>
  );
}

export type AppScreenDef = {
  id: string;
  label: string;
  Screen: ComponentType;
  accent: string;
};

export const APP_SCREENS: AppScreenDef[] = [
  { id: "home", label: "Home", Screen: ScreenHome, accent: "#14b8a6" },
  { id: "request", label: "Delivery Request", Screen: ScreenDeliveryRequest, accent: "#fb923c" },
  { id: "tracking", label: "Live Tracking", Screen: ScreenLiveTracking, accent: "#14b8a6" },
  { id: "wallet", label: "Wallet", Screen: ScreenWallet, accent: "#64748b" },
  { id: "chat", label: "Chat", Screen: ScreenChat, accent: "#14b8a6" },
  { id: "route", label: "Route Publishing", Screen: ScreenRoutePublishing, accent: "#d97706" },
  { id: "earnings", label: "Earnings", Screen: ScreenEarnings, accent: "#f59e0b" },
];
