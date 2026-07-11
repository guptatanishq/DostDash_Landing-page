"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category?: "general" | "customer" | "traveler";
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "what",
    category: "general",
    question: "What is DostDrop?",
    answer:
      "DostDrop connects people who need something from across town with commuters already headed that way — turning everyday trips into purposeful deliveries.",
  },
  {
    id: "senders",
    category: "customer",
    question: "How does it work if I need something delivered?",
    answer:
      "Post what you need and where it should go. A nearby traveler already on route accepts the request, picks it up with minimal detour, and delivers it along their existing commute.",
  },
  {
    id: "travelers",
    category: "traveler",
    question: "How does it work if I'm already commuting?",
    answer:
      "Publish your route, get matched with nearby requests, and accept the ones that fit. You earn on trips you were already making — no extra vehicle, no dedicated delivery shift.",
  },
  {
    id: "safety",
    category: "general",
    question: "Is it safe?",
    answer:
      "Every traveler is verified. Deliveries are GPS-tracked end to end, and payment stays in escrow until handoff is confirmed.",
  },
  {
    id: "cost",
    category: "customer",
    question: "How much does a delivery cost?",
    answer:
      "Rewards are set when you post a request and reflect distance and detour for the traveler. You see the amount before anyone accepts — no surprise fees.",
  },
  {
    id: "launch",
    category: "general",
    question: "When is DostDrop launching?",
    answer:
      "We're opening city by city with early travelers and customers on our waitlist. Join from the home page to be first in your area.",
  },
];

const CATEGORY_LABEL = {
  general: null,
  customer: "Customers",
  traveler: "Travelers",
} as const;

function Chevron({ open }: { open: boolean }) {
  return (
    <motion.span
      className="faq-chevron flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      aria-hidden
    >
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.span>
  );
}

type FaqAccordionItemProps = {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
};

function FaqAccordionItem({ item, open, onToggle }: FaqAccordionItemProps) {
  const categoryLabel = item.category ? CATEGORY_LABEL[item.category] : null;

  return (
    <div
      className={`faq-item rounded-2xl border transition-colors duration-300 ${
        open ? "faq-item--open border-teal-400/25 bg-white/[0.05]" : "border-white/8 bg-white/[0.02]"
      }`}
    >
      <h3>
        <button
          type="button"
          className="faq-item__trigger flex w-full items-start justify-between gap-5 px-5 py-5 text-left md:px-6 md:py-6"
          onClick={onToggle}
          aria-expanded={open}
          id={`faq-trigger-${item.id}`}
          aria-controls={`faq-panel-${item.id}`}
        >
          <span className="min-w-0 flex-1">
            {categoryLabel && (
              <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-400/80">
                {categoryLabel}
              </span>
            )}
            <span className="block text-[15px] font-medium leading-snug text-white md:text-base">
              {item.question}
            </span>
          </span>
          <Chevron open={open} />
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-panel-${item.id}`}
            role="region"
            aria-labelledby={`faq-trigger-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 36, mass: 0.8 }}
            className="overflow-hidden"
          >
            <p className="faq-item__answer max-w-prose px-5 pb-5 text-[15px] leading-[1.7] text-slate-400 md:px-6 md:pb-6 md:text-base">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type FaqAccordionProps = {
  items?: FaqItem[];
  className?: string;
  defaultOpenId?: string | null;
};

export function FaqAccordion({ items = FAQ_ITEMS, className = "", defaultOpenId = null }: FaqAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);

  return (
    <div className={`faq-accordion flex flex-col gap-3 md:gap-4 ${className}`}>
      {items.map((item) => (
        <FaqAccordionItem
          key={item.id}
          item={item}
          open={openId === item.id}
          onToggle={() => setOpenId(openId === item.id ? null : item.id)}
        />
      ))}
    </div>
  );
}
