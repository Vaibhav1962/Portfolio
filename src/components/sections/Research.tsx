import { ExternalLink } from "lucide-react";
import SpellSeal from "@/components/SpellSeal";
import QuillHeading from "@/components/QuillHeading";
import SpellBurst from "@/components/SpellBurst";

export default function Research() {
  return (
    <section id="research" className="py-24 px-16 xl:px-32 border-t codex-border relative overflow-hidden min-h-screen flex flex-col justify-center">
      
      {/* Background spell seal */}
      <div className="absolute right-[-10%] top-[10%] pointer-events-none">
        <SpellSeal size={900} opacity={0.04} variant={2} />
      </div>

      {/* Corner ornament top-right */}
      <div className="absolute top-8 right-8 pointer-events-none">
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none" stroke="#C6A87C" strokeWidth="0.5" opacity="0.45">
          <path d="M70 0 L30 0 L30 2 M70 0 L70 30 L68 30" />
          <circle cx="56" cy="14" r="5" />
          <circle cx="56" cy="14" r="9" strokeDasharray="1 2" />
          <polygon points="56,8 61,17 51,17" strokeWidth="0.4" fill="none" />
        </svg>
      </div>

      <div className="max-w-7xl relative z-10 h-full flex flex-col">
        <SpellBurst variant={2} className="opacity-50" />
        <QuillHeading
          text="II. Publications & Research"
          tag="h2"
          className="font-serif text-4xl mb-3 text-[var(--color-gold)] font-bold italic tracking-wide"
          delay={200}
        />
        <p className="font-sans text-xs tracking-[0.25em] uppercase text-foreground/40 mb-16">✦ Inscribed in the archives of IEEE ✦</p>

        <div className="group relative border-l-2 border-[var(--color-gold)] pl-10 py-8 hover:bg-[var(--card-bg)] transition-colors duration-500 hat-corner">
          <div className="absolute left-[-5px] top-10 w-2.5 h-2.5 rounded-full border border-[var(--color-gold)] bg-background group-hover:bg-[var(--color-gold)] transition-colors ink-pulse"></div>
          
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="text-xs uppercase tracking-widest text-[var(--color-brown)] font-bold border border-[var(--color-brown)]/30 px-3 py-1">IEEE Xplore</span>
            <a
              href="https://ieeexplore.ieee.org/document/10847534"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-2 text-xs tracking-widest uppercase hover:text-[var(--color-gold)] transition-colors text-foreground/60 rune-underline"
            >
              <ExternalLink className="w-3 h-3" />
              <span>View on IEEE Xplore</span>
            </a>
          </div>

          <h3 className="text-3xl font-serif text-foreground mb-14 group-hover:text-[var(--color-brown)] transition-colors max-w-4xl leading-snug">
            Smart Retail: ML for Demand Prediction and Price Strategy
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl">
            {[
              {
                label: "The Problem",
                text: "Optimizing inventory flow and pricing in modern retail environments requires adapting to external signals and shifting demand dynamics at scale."
              },
              {
                label: "The Approach",
                text: "Engineered a comprehensive feature pipeline and deployed Random Forest models, carefully structured to weigh external economic signals alongside internal historical sales patterns."
              },
              {
                label: "The Results",
                text: "Achieved a Demand MSE of 8.15% and a Price MSE of 1.11%, validating the robustness of the feature engineering strategy."
              },
              {
                label: "Learnings",
                text: "Discovered critical nuances in feature augmentation, establishing a clear link between external macro signals and pricing strategy optimization accuracy."
              }
            ].map(({ label, text }) => (
              <div key={label} className="relative pl-5 border-l codex-border group/item">
                <div className="absolute left-[-4px] top-2 w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] opacity-60 group-hover/item:opacity-100 transition-opacity" />
                <h4 className="font-sans uppercase tracking-[0.2em] text-xs text-[var(--color-gold)] mb-3">{label}</h4>
                <p className="text-foreground/75 font-sans leading-relaxed tracking-wide text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
