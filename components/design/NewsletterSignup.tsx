"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("success");
    setEmail("");
  }

  return (
    <div className="footer-newsletter">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
        Newsletter
      </p>
      <h2 className="story-display mt-3 text-2xl text-white md:text-3xl">
        Stay in the loop
      </h2>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400 md:text-[15px]">
        Launch updates, new cities, and stories from people already on the move.
      </p>

      {status === "success" ? (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="footer-newsletter__success mt-6 text-sm text-teal-400"
        >
          You&apos;re on the list. We&apos;ll be in touch.
        </motion.p>
      ) : (
        <form onSubmit={handleSubmit} className="footer-newsletter__form mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label htmlFor="footer-email" className="sr-only">
            Email address
          </label>
          <input
            id="footer-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="footer-input min-w-0 flex-1"
          />
          <button type="submit" className="footer-btn shrink-0">
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}
