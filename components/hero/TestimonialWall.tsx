import { TestimonialCard, TESTIMONIALS } from "./TestimonialCard";

type TestimonialWallProps = {
  className?: string;
  compact?: boolean;
};

const OFFSET_CLASS = {
  none: "",
  low: "md:mt-8",
  high: "md:mt-16",
} as const;

export function TestimonialWall({ className = "", compact = false }: TestimonialWallProps) {
  if (compact) {
    return (
      <div className={`testimonial-wall testimonial-wall--compact flex flex-col gap-5 ${className}`}>
        {TESTIMONIALS.map((t) => (
          <TestimonialCard key={t.id} testimonial={t} />
        ))}
      </div>
    );
  }

  const leftColumn = TESTIMONIALS.filter((_, i) => i % 2 === 0);
  const rightColumn = TESTIMONIALS.filter((_, i) => i % 2 === 1);

  return (
    <div className={`testimonial-wall relative ${className}`}>
      <div className="testimonial-wall__grid mx-auto grid max-w-5xl gap-5 md:grid-cols-2 md:gap-6 lg:gap-8">
        <div className="testimonial-wall__col flex flex-col gap-5 md:gap-6">
          {leftColumn.map((t) => (
            <TestimonialCard
              key={t.id}
              testimonial={t}
              className={OFFSET_CLASS[t.offset ?? "none"]}
            />
          ))}
        </div>
        <div className="testimonial-wall__col flex flex-col gap-5 md:gap-6 md:pt-12">
          {rightColumn.map((t) => (
            <TestimonialCard
              key={t.id}
              testimonial={t}
              className={OFFSET_CLASS[t.offset ?? "none"]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export { TESTIMONIALS };
