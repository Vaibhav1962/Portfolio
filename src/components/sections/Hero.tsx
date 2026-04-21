import { ArrowRight, NotebookPen } from "lucide-react";
import SpellBurst from "@/components/SpellBurst";
import InkDiffusion from "@/components/InkDiffusion";
import HeroSpellDraw from "@/components/HeroSpellDraw";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
  </svg>
);

export default function Hero() {
  return (
    <section id="intro" className="min-h-screen flex flex-col justify-center px-16 xl:px-32 relative z-10 py-24 overflow-hidden">
      
      {/* Canvas ink diffusion */}
      <InkDiffusion />

      {/* Hero spell drawing on load */}
      <HeroSpellDraw />

      {/* Scroll-activated burst overlay */}
      <SpellBurst variant={1} className="z-[1]" />

      {/* Runic corner ornaments */}
      <div className="absolute top-8 left-16 xl:left-32 pointer-events-none z-[2]">
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none" stroke="#C6A87C" strokeWidth="0.5" opacity="0.5">
          <path d="M0 0 L36 0 L36 2 M0 0 L0 36 L2 36" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="9" strokeDasharray="1 2" />
          <line x1="12" y1="3" x2="12" y2="21" strokeWidth="0.3" />
          <line x1="3" y1="12" x2="21" y2="12" strokeWidth="0.3" />
        </svg>
      </div>
      <div className="absolute bottom-8 right-8 pointer-events-none z-[2]">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="#C6A87C" strokeWidth="0.5" opacity="0.4">
          <path d="M56 56 L20 56 L20 54 M56 56 L56 20 L54 20" />
          <circle cx="44" cy="44" r="4" />
          <circle cx="44" cy="44" r="8" strokeDasharray="1 2" />
        </svg>
      </div>

      <div className="flex flex-col max-w-4xl tracking-tight relative z-10">
        <span className="font-sans text-xs tracking-[0.3em] uppercase text-[var(--color-gold)] mb-8 ml-1 block ink-reveal" style={{animationDelay:'0.1s'}}>
          ✦ Codex Volume I — Of Magic & Machines ✦
        </span>
        
        <h1 className="text-7xl lg:text-8xl font-serif text-[var(--color-brown)] leading-tight mb-8 tracking-tight ink-reveal" style={{animationDelay:'0.25s'}}>
          Vaibhav Singh
        </h1>

        <p className="font-sans text-sm tracking-wide text-foreground/70 max-w-2xl leading-loose mb-16 uppercase border-l-2 border-[var(--color-gold)] pl-6 ink-reveal" style={{animationDelay:'0.45s'}}>
          I build scalable backend systems and ML-driven applications focused on performance, reliability, and real-world impact. From transformer models to production-ready pipelines.
        </p>

        <div className="flex flex-wrap items-center gap-12 ink-reveal" style={{animationDelay:'0.6s'}}>
          <a href="#projects" className="group flex items-center space-x-4 border-b border-[var(--color-brown)] pb-2 hover:border-[var(--color-gold)] transition-colors">
            <span className="font-sans uppercase tracking-[0.2em] text-sm text-[var(--color-brown)] group-hover:text-[var(--color-gold)] transition-colors">View Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform text-[var(--color-brown)] group-hover:text-[var(--color-gold)]" />
          </a>
          <a href="https://github.com/Vaibhav1962" target="_blank" rel="noreferrer" className="group flex items-center space-x-2 text-sm tracking-widest uppercase hover:text-[var(--color-gold)] transition-colors text-foreground/80">
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>
          <a href="https://leetcode.com/u/user3723OG/" target="_blank" rel="noreferrer" className="group flex items-center space-x-2 text-sm tracking-widest uppercase hover:text-[var(--color-gold)] transition-colors text-foreground/80">
            <NotebookPen className="w-4 h-4" />
            <span>LeetCode</span>
          </a>
        </div>
      </div>
    </section>
  );
}
