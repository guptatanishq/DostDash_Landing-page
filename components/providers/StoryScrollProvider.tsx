"use client";

import { createContext, useContext, type ReactNode } from "react";

type StoryScrollContextValue = {
  /** True when cinematic intro is done and pinned scroll scenes may initialize */
  ready: boolean;
};

const StoryScrollContext = createContext<StoryScrollContextValue>({ ready: false });

export function useStoryScroll() {
  return useContext(StoryScrollContext);
}

export function StoryScrollProvider({
  ready,
  children,
}: {
  ready: boolean;
  children: ReactNode;
}) {
  return (
    <StoryScrollContext.Provider value={{ ready }}>{children}</StoryScrollContext.Provider>
  );
}
