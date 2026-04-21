"use client";

import { useEffect, useState } from "react";
import { BookOpen, Map, Library, GraduationCap, Feather } from "lucide-react";
import { useInkWash } from "@/components/InkWashProvider";
import { NAV_SECTIONS } from "@/lib/navigation";

const navItems = NAV_SECTIONS.map((section, idx) => ({
  ...section,
  icon: [BookOpen, Map, Library, GraduationCap, Feather][idx],
}));

// Extended rune scroll for the spine
const RUNE_SCROLL = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("intro");
  const { navigate } = useInkWash();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(navItems[i].id);
        if (el && el.offsetTop <= scrollY + 300) {
          setActiveItem(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed left-0 top-0 h-full w-20 hover:w-72 bg-background border-r codex-border flex flex-col pt-16 pb-8 transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden z-50 group shadow-[4px_0_20px_rgba(44,36,22,0.04)]">

      {/* ── Runic spine: scrolling rune column on the right edge of sidebar ── */}
      <div className="absolute right-[2px] top-0 w-4 h-full overflow-hidden pointer-events-none select-none">
        <div className="flex flex-col items-center" style={{ animation: "runeScroll 18s linear infinite" }}>
          {RUNE_SCROLL.split("").map((r, i) => {
            const sectionIdx = navItems.findIndex((n, idx) =>
              i >= idx * Math.ceil(RUNE_SCROLL.length / navItems.length) &&
              i < (idx + 1) * Math.ceil(RUNE_SCROLL.length / navItems.length)
            );
            const isActive = sectionIdx >= 0 && navItems[sectionIdx]?.id === activeItem;
            return (
              <span key={i} className="text-[8px] leading-[1.5] block transition-colors duration-500"
                style={{ color: isActive ? "#C6A87C" : "rgba(92,75,55,0.2)" }}>
                {r}
              </span>
            );
          })}
        </div>
      </div>

      {/* Top seal ornament */}
      <div className="w-full flex justify-center group-hover:justify-start px-7 mb-12">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#C6A87C" strokeWidth="0.8"
          className="group-hover:rotate-45 transition-transform duration-700">
          <circle cx="14" cy="14" r="12" strokeDasharray="2 3" opacity="0.5" />
          <circle cx="14" cy="14" r="8" />
          <rect x="8" y="8" width="12" height="12" transform="rotate(45 14 14)" strokeWidth="0.6" />
          <circle cx="14" cy="14" r="2.5" fill="#C6A87C" stroke="none" opacity="0.8" />
          {[0, 90, 180, 270].map(deg => {
            const rad = (deg * Math.PI) / 180;
            return <line key={deg} x1={+(14 + 9 * Math.cos(rad)).toFixed(2)} y1={+(14 + 9 * Math.sin(rad)).toFixed(2)} x2={+(14 + 12 * Math.cos(rad)).toFixed(2)} y2={+(14 + 12 * Math.sin(rad)).toFixed(2)} strokeWidth="1" />;
          })}
        </svg>
      </div>

      {/* Nav items */}
      <ul className="flex flex-col space-y-8 w-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          return (
            <li key={item.id} className="w-full">
              <button
                onClick={() => navigate(item.id)}
                className={`flex items-center w-full px-7 space-x-5 text-xs tracking-widest transition-all duration-300 cursor-pointer bg-transparent border-none ${
                  isActive ? "text-[var(--color-gold)]" : "text-foreground/50 hover:text-[var(--color-brown)]"
                }`}
              >
                <div className="relative shrink-0">
                  {isActive && <span className="absolute inset-[-4px] rounded-full border border-[var(--color-gold)] ink-pulse" />}
                  <Icon className={`w-5 h-5 relative z-10 transition-colors ${isActive ? "text-[var(--color-gold)]" : "text-foreground/30"}`} />
                </div>
                <span className={`uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap rune-underline ${isActive ? "active font-bold" : ""}`}>
                  {item.name}
                </span>
                {/* Rune glyph shown in collapsed state */}
                <span className={`font-mono text-[10px] ml-auto opacity-100 group-hover:opacity-0 transition-opacity absolute right-1.5 ${isActive ? "text-[var(--color-gold)]" : "text-foreground/20"}`}>
                  {item.rune}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Bottom colophon */}
      <div className="mt-auto px-7 opacity-0 group-hover:opacity-100 transition-opacity duration-500 whitespace-nowrap space-y-1 border-t codex-border pt-6">
        <p className="font-serif italic text-[var(--color-gold)] text-sm">Engineer&rsquo;s Codex</p>
        <p className="font-sans text-[10px] tracking-widest uppercase text-foreground/40">Vol. I — MMXXVI</p>
      </div>
    </nav>
  );
}
