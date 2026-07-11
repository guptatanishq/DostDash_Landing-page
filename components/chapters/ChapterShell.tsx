import Image from "next/image";
import type { ReactNode } from "react";

type ChapterShellProps = {
  title: string;
  mood: string;
  description: string;
  children?: ReactNode;
};

export function ChapterShell({
  title,
  mood,
  description,
  children,
}: ChapterShellProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-8 px-6 py-24 text-center">
        <Image
          src="/illustrations/placeholder.svg"
          alt=""
          width={120}
          height={120}
          aria-hidden
          className="opacity-60"
        />
        <div className="space-y-4">
          <p className="text-sm font-medium tracking-widest text-foreground/50 uppercase">
            {mood}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="text-lg text-foreground/70">{description}</p>
        </div>
        {children}
      </section>
    </main>
  );
}
