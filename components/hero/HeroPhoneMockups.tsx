"use client";

import { forwardRef } from "react";
import { FloatingDeviceShowcase } from "./app-screens/FloatingDeviceShowcase";

type HeroPhoneMockupsProps = {
  className?: string;
};

export const HeroPhoneMockups = forwardRef<HTMLDivElement, HeroPhoneMockupsProps>(
  function HeroPhoneMockups({ className = "" }, ref) {
    return <FloatingDeviceShowcase ref={ref} variant="hero" className={className} />;
  },
);
