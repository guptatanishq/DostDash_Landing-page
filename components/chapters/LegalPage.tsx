import Link from "next/link";
import { UtilityShell } from "@/components/design/UtilityShell";

type LegalPageProps = {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
};

export function LegalPage({ title, eyebrow, children }: LegalPageProps) {
  return (
    <UtilityShell>
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="utility-link text-sm text-slate-400 transition-colors hover:text-white">
          ← Back to home
        </Link>
        <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">{eyebrow}</p>
        <h1 className="story-display mt-3 text-4xl text-white md:text-5xl">{title}</h1>
        <div className="legal-prose mt-10 space-y-6 text-[15px] leading-relaxed text-slate-400">{children}</div>
      </div>
    </UtilityShell>
  );
}
