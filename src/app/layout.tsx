import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { InkWashProvider } from "@/components/InkWashProvider";
import OrbitingRuneCursor from "@/components/OrbitingRuneCursor";
import FloatingMotes from "@/components/FloatingMotes";
import ScrollProgress from "@/components/ScrollProgress";
import InkSplash from "@/components/InkSplash";
import Constellation from "@/components/Constellation";
import ThemeToggle from "@/components/ThemeToggle";
import GlyphRitual from "@/components/GlyphRitual";
import ArcaneAura from "@/components/ArcaneAura";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vaibhav Singh | Engineer's Codex",
  description: "Backend Systems & Applied Machine Learning — Portfolio",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased scroll-smooth`} suppressHydrationWarning>
      <head>
        {/* Flash-prevention: apply saved theme before first paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var saved=localStorage.getItem('codex-theme');var allowed=['light','dark','dawn','midnight'];var t=allowed.indexOf(saved||'')>=0?saved:null;if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground relative">
        <InkWashProvider>
          <ScrollProgress />
          <Constellation />
          <ArcaneAura />
          <FloatingMotes />
          <OrbitingRuneCursor />
          <InkSplash />
          <GlyphRitual />
          {children}
          <ThemeToggle />
        </InkWashProvider>
      </body>
    </html>
  );
}
