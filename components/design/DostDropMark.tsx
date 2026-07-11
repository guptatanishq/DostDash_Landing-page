type DostDropMarkProps = {
  className?: string;
  size?: "sm" | "md";
};

export function DostDropMark({ className = "", size = "md" }: DostDropMarkProps) {
  const textSize = size === "sm" ? "text-base sm:text-lg" : "text-lg sm:text-xl";

  return (
    <span className={`story-display inline-flex items-center gap-0.5 font-semibold tracking-tight ${textSize} ${className}`}>
      <span className="text-teal-400">Dost</span>
      <span className="text-white">Drop</span>
    </span>
  );
}
