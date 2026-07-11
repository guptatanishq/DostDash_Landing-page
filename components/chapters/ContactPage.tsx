"use client";

import Link from "next/link";
import { UtilityShell } from "@/components/design/UtilityShell";

export function ContactPage() {
  return (
    <UtilityShell>
      <div className="mx-auto max-w-xl">
        <Link href="/" className="utility-link text-sm text-slate-400 transition-colors hover:text-white">
          ← Back to home
        </Link>
        <p className="mt-8 text-sm font-medium tracking-widest text-slate-400 uppercase">Get in touch</p>
        <h1 className="story-display mt-3 text-4xl text-white md:text-5xl">Contact</h1>
        <p className="mt-4 leading-relaxed text-slate-400">
          Questions, partnerships, or early access — we&apos;d love to hear from you.
        </p>

        <form className="mt-10 space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-300">
              Name
            </label>
            <input id="name" name="name" type="text" className="utility-input" placeholder="Your name" />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-300">
              Email
            </label>
            <input id="email" name="email" type="email" className="utility-input" placeholder="you@example.com" />
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-300">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="utility-input resize-none"
              placeholder="How can we help?"
            />
          </div>
          <button type="submit" className="utility-btn w-full md:w-auto">
            Send message
          </button>
        </form>
      </div>
    </UtilityShell>
  );
}
