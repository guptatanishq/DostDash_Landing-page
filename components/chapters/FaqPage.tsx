"use client";

import Link from "next/link";
import { FaqAccordion } from "@/components/faq/FaqAccordion";
import { UtilityShell } from "@/components/design/UtilityShell";

export function FaqPage() {
  return (
    <UtilityShell className="faq-page">
      <div className="mx-auto max-w-xl">
        <Link
          href="/"
          className="utility-link inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-white"
        >
          <span aria-hidden>←</span> Back to home
        </Link>

        <header className="faq-page__header mt-10 md:mt-12">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
            Questions
          </p>
          <h1 className="story-display mt-3 text-[2rem] leading-[1.1] text-white md:text-5xl">
            Good to know
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-slate-400">
            Short answers about how DostDrop works — nothing buried, nothing overwhelming.
          </p>
        </header>

        <div className="mt-12">
          <FaqAccordion />
        </div>
      </div>
    </UtilityShell>
  );
}
