"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type MobileSceneBlockProps = {
  scene: number;
  copy: string;
  children: ReactNode;
  backgroundStyle: CSSProperties;
  isDark?: boolean;
};

export function MobileSceneBlock({
  scene,
  copy,
  children,
  backgroundStyle,
  isDark = false,
}: MobileSceneBlockProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      aria-label={`Scene ${scene}`}
      className={`flex min-h-[88vh] flex-col items-center justify-center gap-8 px-5 py-16 transition-all duration-700 ease-out ${
        isDark ? "border-white/8" : "border-slate-300/25"
      } border-b ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
      style={backgroundStyle}
    >
      <div
        className={`story-card relative flex h-60 w-full max-w-sm items-center justify-center overflow-hidden rounded-3xl border md:h-64 md:max-w-md ${
          isDark ? "border-white/15 bg-white/5" : "border-white/50 bg-white/35"
        }`}
      >
        {children}
      </div>
      <p
        className={`story-subtitle max-w-sm text-center text-base md:max-w-md md:text-lg ${
          isDark ? "story-subtitle--dark" : "story-subtitle--light"
        }`}
      >
        {copy}
      </p>
    </section>
  );
}
