import { Mail, NotebookPen, Send } from "lucide-react";
import SpellSeal from "@/components/SpellSeal";
import WaxSeal from "@/components/WaxSeal";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
  </svg>
);

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-16 xl:px-32 border-t codex-border relative overflow-hidden min-h-screen flex flex-col justify-center">

      {/* Background Seal */}
      <div className="absolute right-[-12%] bottom-[-10%] pointer-events-none">
        <SpellSeal size={700} opacity={0.045} variant={1} />
      </div>
      <div className="absolute left-[-10%] top-[5%] pointer-events-none">
        <SpellSeal size={400} opacity={0.03} reverse variant={2} />
      </div>

      {/* Top corner ornament */}
      <div className="absolute top-8 left-16 xl:left-32 pointer-events-none">
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none" stroke="#C6A87C" strokeWidth="0.5" opacity="0.4">
          <path d="M0 0 L30 0 L30 2 M0 0 L0 30 L2 30" />
          <circle cx="14" cy="14" r="6" />
          <circle cx="14" cy="14" r="10" strokeDasharray="1.5 2.5" />
          <circle cx="14" cy="14" r="2" fill="#C6A87C" stroke="none" opacity="0.6"/>
        </svg>
      </div>

      <div className="max-w-7xl relative z-10 w-full">
        <div className="flex flex-col items-center mb-3">
          <WaxSeal size={72} label="VS" className="mb-4 opacity-80" />
          <h2 className="font-serif text-4xl text-[var(--color-gold)] font-bold italic tracking-wide text-center">
            IV. Summons &amp; Correspondence
          </h2>
        </div>
        <p className="font-sans text-xs tracking-[0.25em] uppercase text-foreground/40 mb-16 text-center">✦ Open to internships &amp; collaborations ✦</p>

        <div className="flex flex-col lg:flex-row gap-16 items-start justify-center">
          
          {/* Parchment Form */}
          <div className="w-full lg:w-1/2 codex-card backdrop-blur-md border codex-border p-10 spell-card hat-corner relative">
            <h3 className="font-serif text-2xl text-[var(--color-brown)] mb-10 flex items-center gap-3">
              <Mail className="w-5 h-5 text-[var(--color-gold)]" /> 
              Scribe a Message
            </h3>
            
            <form className="space-y-8 font-sans">
              {[
                { label: "Your Identity", placeholder: "Name", type: "text" },
                { label: "Return Address", placeholder: "vaibhav.singh.252005@gmail.com", type: "email" },
              ].map(({ label, placeholder, type }) => (
                <div key={label}>
                  <label className="block text-xs uppercase tracking-widest codex-label mb-2 font-bold">{label}</label>
                  <input
                    type={type}
                    className="w-full bg-transparent border-b codex-input pb-2 focus:outline-none focus:border-[var(--color-gold)] transition-colors text-sm placeholder:text-foreground/30"
                    placeholder={placeholder}
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs uppercase tracking-widest codex-label mb-2 font-bold">The Missive</label>
                <textarea
                  rows={4}
                  className="w-full bg-transparent border-b codex-input pb-2 focus:outline-none focus:border-[var(--color-gold)] transition-colors text-sm resize-none placeholder:text-foreground/30"
                  placeholder="Write your message here..."
                />
              </div>
              
              <button className="flex items-center justify-center space-x-3 w-full py-4 mt-2 border codex-border text-[var(--color-brown)] hover:bg-[var(--color-gold)] hover:text-[var(--background)] hover:border-[var(--color-gold)] transition-all duration-400 text-xs tracking-[0.25em] uppercase hat-corner">
                <span>Dispatch Missive</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Right info panel */}
          <div className="w-full lg:w-1/3 flex flex-col gap-12 lg:mt-6">
            
            {/* Email */}
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[var(--color-gold)] block">Direct Channel</span>
              <a
                href="mailto:vaibhav.singh.252005@gmail.com"
                className="font-serif text-lg text-[var(--color-brown)] hover:text-[var(--color-gold)] transition-colors rune-underline inline-block"
              >
                vaibhav.singh.252005@gmail.com
              </a>
            </div>

            {/* Social links */}
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-widest text-[var(--color-gold)] block">Digital Archives</span>
              {[
                {
                  name: "GitHub / Vaibhav1962",
                  href: "https://github.com/Vaibhav1962",
                  Icon: GithubIcon,
                },
                {
                  name: "LeetCode / user3723OG",
                  href: "https://leetcode.com/u/user3723OG/",
                  Icon: NotebookPen,
                },
              ].map(({ name, href, Icon }) => (
                <a key={name} href={href} target="_blank" rel="noreferrer" className="group flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full border codex-icon-bg flex items-center justify-center group-hover:border-[var(--color-gold)] group-hover:shadow-[0_0_15px_rgba(198,168,124,0.3)] transition-all">
                    <Icon className="w-5 h-5 text-foreground/50 group-hover:text-[var(--color-brown)] transition-colors" />
                  </div>
                  <span className="font-sans text-sm tracking-wider text-foreground/70 group-hover:text-[var(--color-brown)] transition-colors rune-underline">
                    {name}
                  </span>
                </a>
              ))}
            </div>

            {/* Availability badge */}
            <div className="flex items-center gap-3 border codex-border px-5 py-3 codex-card">
              <span className="w-2 h-2 rounded-full bg-[var(--color-gold)] ink-pulse block" />
              <span className="font-sans text-xs uppercase tracking-widest text-foreground/60">
                Open to Internships & Research
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
