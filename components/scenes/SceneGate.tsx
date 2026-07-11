"use client";

import type { StoryPanelVariant } from "@/lib/story-motion";
import { StaticSceneBlock } from "./home/shared";

type SceneGateProps = {
  reducedMotion: boolean;
  scene: number;
  copy: string;
  children: React.ReactNode;
  /** Full cinematic experience (pinned scroll + GSAP) — all viewports */
  desktop: React.ReactNode;
  variant?: StoryPanelVariant;
};

export function SceneGate({
  reducedMotion,
  scene,
  copy,
  children,
  desktop,
}: SceneGateProps) {
  if (reducedMotion) {
    return (
      <StaticSceneBlock scene={scene} copy={copy}>
        {children}
      </StaticSceneBlock>
    );
  }

  return <>{desktop}</>;
}
