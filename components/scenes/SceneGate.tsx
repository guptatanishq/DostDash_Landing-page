"use client";

import type { StoryPanelVariant } from "@/lib/story-motion";
import { HomeMobileSceneBlock, StaticSceneBlock } from "./home/shared";

type SceneGateProps = {
  reducedMotion: boolean;
  scene: number;
  copy: string;
  children: React.ReactNode;
  desktop: React.ReactNode;
  variant?: StoryPanelVariant;
};

export function SceneGate({
  reducedMotion,
  scene,
  copy,
  children,
  desktop,
  variant = "default",
}: SceneGateProps) {
  const staticCard = (
    <StaticSceneBlock scene={scene} copy={copy}>
      {children}
    </StaticSceneBlock>
  );

  const mobileCard = (
    <HomeMobileSceneBlock scene={scene} copy={copy} variant={variant}>
      {children}
    </HomeMobileSceneBlock>
  );

  return (
    <>
      <div className="max-md:hidden">{reducedMotion ? staticCard : desktop}</div>
      <div className="md:hidden">{reducedMotion ? staticCard : mobileCard}</div>
    </>
  );
}
