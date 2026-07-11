export type Testimonial = {
  id: string;
  name: string;
  role: "customer" | "traveler";
  location: string;
  rating: number;
  quote: string;
  initials: string;
  accent: string;
  offset?: "none" | "low" | "high";
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "priya",
    name: "Priya S.",
    role: "customer",
    location: "Indiranagar",
    rating: 5,
    quote:
      "My mother needed a saree from Malleswaram. A traveler heading that way picked it up on her commute — it felt like asking a friend, not ordering delivery.",
    initials: "PS",
    accent: "#fb923c",
    offset: "none",
  },
  {
    id: "ravi",
    name: "Ravi K.",
    role: "traveler",
    location: "Koramangala",
    rating: 5,
    quote:
      "I publish my metro route every evening. Three deliveries last week, ₹340 earned — on trips I was already making.",
    initials: "RK",
    accent: "#14b8a6",
    offset: "high",
  },
  {
    id: "arjun",
    name: "Arjun M.",
    role: "customer",
    location: "HSR Layout",
    rating: 5,
    quote:
      "Forgot my documents at home before a client meeting. Someone going past my apartment had them on my desk in forty minutes.",
    initials: "AM",
    accent: "#fb923c",
    offset: "low",
  },
  {
    id: "sneha",
    name: "Sneha R.",
    role: "traveler",
    location: "Jayanagar",
    rating: 5,
    quote:
      "Two minutes off my route to help a neighbor get medicine. That's the city I want to live in — people looking out for each other.",
    initials: "SR",
    accent: "#14b8a6",
    offset: "high",
  },
  {
    id: "meera",
    name: "Meera D.",
    role: "customer",
    location: "Whitefield",
    rating: 5,
    quote:
      "No more waiting days for something from across town. DostDrop turned a stranger's commute into my delivery.",
    initials: "MD",
    accent: "#fb923c",
    offset: "none",
  },
  {
    id: "karthik",
    name: "Karthik V.",
    role: "traveler",
    location: "Bellandur",
    rating: 5,
    quote:
      "I cycle to work daily. Picking up small packages along the way pays for my coffee — and the chats with senders are genuinely nice.",
    initials: "KV",
    accent: "#14b8a6",
    offset: "low",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="testimonial-stars flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-3.5 w-3.5 md:h-4 md:w-4 ${i < rating ? "text-amber-400" : "text-white/15"}`}
          aria-hidden
        >
          <path
            fill="currentColor"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      ))}
    </div>
  );
}

type TestimonialCardProps = {
  testimonial: Testimonial;
  className?: string;
};

export function TestimonialCard({ testimonial, className = "" }: TestimonialCardProps) {
  const isCustomer = testimonial.role === "customer";

  return (
    <article
      className={`testimonial-card group relative rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md md:p-6 ${className}`}
      data-testimonial-card
      data-role={testimonial.role}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 20% 0%, ${testimonial.accent}12 0%, transparent 70%)`,
        }}
      />

      <div className="relative flex items-start gap-4">
        <div
          className="testimonial-avatar relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white md:h-14 md:w-14 md:text-base"
          style={{
            background: `linear-gradient(135deg, ${testimonial.accent} 0%, ${testimonial.accent}88 100%)`,
          }}
        >
          <span>{testimonial.initials}</span>
          <div
            className="absolute inset-0 rounded-full ring-2 ring-white/20 ring-offset-2 ring-offset-transparent"
            style={{ boxShadow: `0 0 20px ${testimonial.accent}40` }}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-white md:text-base">{testimonial.name}</h3>
            <span
              className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider md:text-[10px] ${
                isCustomer ? "bg-orange-500/15 text-orange-300" : "bg-teal-500/15 text-teal-300"
              }`}
            >
              {isCustomer ? "Customer" : "Traveler"}
            </span>
          </div>
          <p className="mt-0.5 text-[11px] text-white/40">{testimonial.location}</p>
          <div className="mt-2">
            <StarRating rating={testimonial.rating} />
          </div>
        </div>
      </div>

      <blockquote className="testimonial-quote story-subtitle story-subtitle--dark relative mt-5 text-base leading-relaxed md:text-lg">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
    </article>
  );
}
