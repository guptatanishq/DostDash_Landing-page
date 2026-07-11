import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { ScrollProvider } from "@/components/providers/ScrollProvider";
import { SiteFooter } from "@/components/design/SiteFooter";
import { SkipLink } from "@/components/design/SkipLink";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DostDrop — Access what's not near you",
  description:
    "Access what's not near you — through people who already are.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fraunces.variable} font-sans antialiased`}>
        <ScrollProvider>
          <SkipLink />
          {children}
          <SiteFooter />
        </ScrollProvider>
      </body>
    </html>
  );
}
