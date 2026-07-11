import Link from "next/link";
import { NewsletterSignup } from "./NewsletterSignup";

const EXPLORE = [
  { href: "/", label: "Home" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

const LEGAL = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
] as const;

const SOCIAL = [
  {
    label: "X (Twitter)",
    href: "https://x.com/dostdrop",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/dostdrop",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/dostdrop",
    icon: (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
] as const;

function FooterLinkGroup({ title, links }: { title: string; links: readonly { href: string; label: string }[] }) {
  return (
    <div>
      <p className="footer-link-group__title text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">
        {title}
      </p>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="footer-link text-sm text-slate-400 transition-colors hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer relative overflow-hidden">
      <div
        className="site-footer__fade pointer-events-none absolute inset-x-0 top-0 h-32"
        aria-hidden
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(15,23,42,0.6) 100%)",
        }}
      />

      <div className="site-footer__glow pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-teal-400/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-20 md:px-10 md:pb-20 md:pt-28 lg:px-14">
        <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          <NewsletterSignup />

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:gap-12">
            <FooterLinkGroup title="Explore" links={EXPLORE} />
            <FooterLinkGroup title="Legal" links={LEGAL} />
            <div className="col-span-2 sm:col-span-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">
                Contact
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-400">
                <li>
                  <a href="mailto:hello@dostdrop.com" className="footer-link transition-colors hover:text-white">
                    hello@dostdrop.com
                  </a>
                </li>
                <li>Bengaluru, India</li>
                <li className="text-slate-500">Launching city by city</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="site-footer__divider mt-16 h-px bg-white/8 md:mt-20" />

        <div className="mt-10 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
          <div>
            <Link href="/" className="story-display text-2xl text-white transition-opacity hover:opacity-80 md:text-3xl">
              DostDrop
            </Link>
            <p className="story-subtitle story-subtitle--dark mt-2 max-w-xs text-sm not-italic text-slate-500">
              Access what&apos;s not near you — through people who already are.
            </p>
          </div>

          <div className="flex flex-col gap-6 sm:items-end">
            <div className="flex items-center gap-3">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="footer-social flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-teal-400/30 hover:bg-teal-500/10 hover:text-teal-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} DostDrop. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
