import { SceneGrain } from "@/components/design/SceneGrain";
import { storyPanelStyle } from "@/lib/story-motion";

type UtilityShellProps = {
  children: React.ReactNode;
  className?: string;
};

export function UtilityShell({ children, className = "" }: UtilityShellProps) {
  return (
    <main
      id="main"
      className={`utility-page relative min-h-screen overflow-hidden px-6 py-24 md:px-8 md:py-32 ${className}`}
      style={storyPanelStyle()}
    >
      <SceneGrain />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(20,184,166,0.06) 0%, transparent 55%), radial-gradient(ellipse 40% 30% at 80% 80%, rgba(245,158,11,0.04) 0%, transparent 50%)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </main>
  );
}
