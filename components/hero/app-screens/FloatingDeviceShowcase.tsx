"use client";

import { forwardRef } from "react";
import { APP_SCREENS } from "./AppScreenContent";
import { PhoneDevice } from "./PhoneDevice";

type FloatingDeviceShowcaseProps = {
  variant?: "hero" | "showcase";
  className?: string;
};

export const FloatingDeviceShowcase = forwardRef<HTMLDivElement, FloatingDeviceShowcaseProps>(
  function FloatingDeviceShowcase({ variant = "showcase", className = "" }, ref) {
    const isHero = variant === "hero";

    if (isHero) {
      const home = APP_SCREENS[0];
      const route = APP_SCREENS[5];
      const Home = home.Screen;
      const Route = route.Screen;

      return (
        <div
          ref={ref}
          className={`device-showcase device-showcase--hero relative flex items-end justify-center gap-4 md:gap-8 ${className}`}
        >
          <div className="device-showcase__unit device-showcase__unit--left" data-device="satellite-left">
            <div className="device-showcase__glow device-showcase__glow--teal" />
            <PhoneDevice size="md" label={home.label} accent={home.accent}>
              <Home />
            </PhoneDevice>
          </div>
          <div className="device-showcase__unit device-showcase__unit--right -mb-6 md:-mb-10" data-device="satellite-right">
            <div className="device-showcase__glow device-showcase__glow--amber" />
            <PhoneDevice size="md" label={route.label} accent={route.accent}>
              <Route />
            </PhoneDevice>
          </div>
        </div>
      );
    }

    const RequestScreen = APP_SCREENS[1].Screen;
    const EarningsScreen = APP_SCREENS[6].Screen;

    return (
      <div
        ref={ref}
        className={`device-showcase device-showcase--story relative mx-auto flex h-full w-full max-w-5xl items-center justify-center ${className}`}
      >
        <div className="device-showcase__ambient pointer-events-none absolute inset-0" aria-hidden>
          <div className="device-showcase__orb device-showcase__orb--left" />
          <div className="device-showcase__orb device-showcase__orb--right" />
          <div className="device-showcase__connector" />
        </div>

        <div className="device-showcase__unit device-showcase__unit--satellite-left hidden lg:block" data-device="satellite-left">
          <PhoneDevice size="sm" label={APP_SCREENS[1].label} accent={APP_SCREENS[1].accent}>
            <RequestScreen />
          </PhoneDevice>
        </div>

        <div className="device-showcase__unit device-showcase__unit--primary relative z-10" data-device="primary">
          <div className="device-showcase__glow device-showcase__glow--primary" />
          <PhoneDevice size="lg">
            {APP_SCREENS.map((screen, i) => {
              const Screen = screen.Screen;
              return (
                <div
                  key={screen.id}
                  className={`device-screen-layer absolute inset-0 p-0 ${i === 0 ? "" : "opacity-0"}`}
                  data-screen={i}
                >
                  <Screen />
                </div>
              );
            })}
          </PhoneDevice>
          <p className="device-screen-caption relative pointer-events-none absolute -bottom-10 left-0 right-0 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 md:-bottom-12 md:text-xs">
            {APP_SCREENS.map((screen, i) => (
              <span
                key={screen.id}
                className={`absolute left-0 right-0 ${i === 0 ? "opacity-100" : "opacity-0"}`}
                data-screen-caption={i}
              >
                {screen.label}
              </span>
            ))}
          </p>
        </div>

        <div className="device-showcase__unit device-showcase__unit--satellite-right hidden lg:block" data-device="satellite-right">
          <PhoneDevice size="sm" label={APP_SCREENS[6].label} accent={APP_SCREENS[6].accent}>
            <EarningsScreen />
          </PhoneDevice>
        </div>
      </div>
    );
  },
);

export function AppScreenRail() {
  return (
    <div className="app-screen-rail mx-auto flex max-w-3xl items-center justify-between gap-1 px-2">
      {APP_SCREENS.map((screen, i) => (
        <div key={screen.id} className="flex flex-1 flex-col items-center gap-1.5">
          <div
            className="app-screen-dot h-2 w-2 rounded-full bg-white/20"
            data-screen-dot={i}
            style={i === 0 ? { background: screen.accent, opacity: 1, transform: "scale(1.4)" } : undefined}
          />
          <span
            className="app-screen-label hidden text-center text-[8px] leading-tight text-white/35 md:block"
            data-screen-label={i}
          >
            {screen.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export { APP_SCREENS };
