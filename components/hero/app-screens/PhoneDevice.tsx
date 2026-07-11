import { forwardRef, type ReactNode } from "react";

type PhoneDeviceProps = {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
  accent?: string;
};

const SIZES = {
  sm: "w-[140px] md:w-[155px]",
  md: "w-[168px] md:w-[190px]",
  lg: "w-[200px] md:w-[240px]",
} as const;

const MIN_HEIGHTS = {
  sm: "min-h-[220px]",
  md: "min-h-[280px]",
  lg: "min-h-[320px]",
} as const;

export const PhoneDevice = forwardRef<HTMLDivElement, PhoneDeviceProps>(function PhoneDevice(
  { children, size = "md", className = "", label, accent = "#14b8a6" },
  ref,
) {
  return (
    <div ref={ref} className={`phone-device relative ${className}`}>
      <div
        className={`phone-device__frame overflow-hidden rounded-[2.25rem] border-[3px] border-slate-800 bg-slate-900 shadow-2xl shadow-black/50 ${SIZES[size]}`}
      >
        <div className="flex items-center justify-between bg-slate-900 px-4 pb-1.5 pt-2.5 md:px-5 md:pt-3">
          <span className="text-[9px] font-medium text-white/80 md:text-[10px]">9:41</span>
          <div className="mx-auto h-[18px] w-[64px] rounded-full bg-black md:h-[22px] md:w-[72px]" />
          <span className="text-[9px] text-white/60 md:text-[10px]">●●●</span>
        </div>
        <div className={`phone-device__screen relative bg-white p-3 md:p-4 ${MIN_HEIGHTS[size]}`}>
          {children}
        </div>
      </div>
      {label && (
        <span
          className="phone-device__label absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[9px] font-semibold uppercase tracking-wider text-white/95 md:text-[10px]"
          style={{ background: accent }}
        >
          {label}
        </span>
      )}
    </div>
  );
});
