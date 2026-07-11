type WordmarkProps = {
  className?: string;
  tagline?: boolean;
};

export function DostDropWordmark({ className = "", tagline = false }: WordmarkProps) {
  return (
    <div className={`text-center ${className}`}>
      <h2 className="story-display text-5xl text-white md:text-7xl">DostDrop</h2>
      {tagline && (
        <p className="story-subtitle story-subtitle--dark mx-auto mt-5 max-w-md text-lg md:text-xl">
          Access what&apos;s not near you — through people who already are.
        </p>
      )}
    </div>
  );
}
