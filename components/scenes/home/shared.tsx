import { forwardRef, type ReactNode } from "react";
import { MobileSceneBlock } from "../MobileSceneBlock";
import { SceneGrain } from "@/components/design/SceneGrain";
import { storyPanelStyle, type StoryPanelVariant } from "@/lib/story-motion";

export { storyPanelStyle, cinematicBackground } from "@/lib/story-motion";

export function SceneSubtitle({ children }: { children: ReactNode }) {
  return (
    <p className="story-subtitle story-subtitle--dark pointer-events-none absolute right-0 bottom-16 left-0 z-20 px-8 text-center text-xl md:bottom-24 md:text-3xl lg:text-4xl">
      {children}
    </p>
  );
}

type StaticSceneBlockProps = {
  scene: number;
  copy: string;
  children: ReactNode;
};

export function StaticSceneBlock({ scene, copy, children }: StaticSceneBlockProps) {
  return (
    <section
      aria-label={`Scene ${scene}`}
      className="flex min-h-screen flex-col items-center justify-center gap-10 border-b border-white/6 px-6 py-24"
      style={storyPanelStyle()}
    >
      <div className="story-card relative flex h-72 w-full max-w-lg items-center justify-center overflow-hidden rounded-3xl border border-white/15 bg-white/5">
        {children}
      </div>
      <p className="story-subtitle story-subtitle--dark max-w-xl text-center text-lg md:text-xl">
        {copy}
      </p>
    </section>
  );
}

export const SceneTrack = forwardRef<
  HTMLElement,
  { scene: number; children: ReactNode; className?: string }
>(function SceneTrack({ scene, children, className = "" }, ref) {
  return (
    <section
      ref={ref}
      aria-label={`Scene ${scene}`}
      className={`story-track relative ${className}`}
    >
      {children}
    </section>
  );
});

export const ScenePanel = forwardRef<
  HTMLDivElement,
  { children: ReactNode; className?: string; variant?: StoryPanelVariant }
>(function ScenePanel({ children, className = "", variant = "default" }, ref) {
  return (
    <div
      ref={ref}
      className={`scene-panel story-panel relative h-screen min-h-[100dvh] w-full overflow-hidden ${className}`}
      style={storyPanelStyle(variant)}
    >
      <SceneGrain />
      {children}
    </div>
  );
});

export function HomeMobileSceneBlock({
  scene,
  copy,
  children,
  variant = "default",
}: {
  scene: number;
  copy: string;
  children: ReactNode;
  variant?: StoryPanelVariant;
}) {
  return (
    <MobileSceneBlock scene={scene} copy={copy} backgroundStyle={storyPanelStyle(variant)} isDark>
      {children}
    </MobileSceneBlock>
  );
}
