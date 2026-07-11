"use client";

import { usePathname, useRouter } from "next/navigation";
import { DostDropMark } from "@/components/design/DostDropMark";
import {
  requestIntroReplayFromRoute,
  useCinematicIntroContext,
} from "@/components/providers/CinematicIntroProvider";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { showIntro, hydrated, replayIntro } = useCinematicIntroContext();
  const isHome = pathname === "/";

  const triggerIntro = () => {
    if (isHome) {
      replayIntro();
      return;
    }
    requestIntroReplayFromRoute();
    router.push("/");
  };

  if (!hydrated || showIntro) return null;

  return (
    <header className="site-header pointer-events-none fixed inset-x-0 top-0 z-[180]">
      <div className="site-header__inner mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 md:px-10 lg:px-14">
        <button
          type="button"
          onClick={triggerIntro}
          className="site-header__brand pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/55 px-3 py-2 backdrop-blur-md transition-colors hover:border-teal-400/35 hover:bg-slate-900/75 sm:px-4"
          aria-label="DostDrop — replay intro"
        >
          <DostDropMark size="sm" />
        </button>

        <button
          type="button"
          onClick={triggerIntro}
          className="site-header__search pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/55 text-slate-300 backdrop-blur-md transition-colors hover:border-teal-400/35 hover:bg-slate-900/75 hover:text-white sm:h-11 sm:w-11"
          aria-label="Explore DostDrop — replay intro"
        >
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  );
}
