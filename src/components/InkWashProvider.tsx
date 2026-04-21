"use client";

import { createContext, useContext, useRef, useCallback, ReactNode } from "react";

const InkWashCtx = createContext<{ navigate: (id: string) => void }>({ navigate: () => {} });
export const useInkWash = () => useContext(InkWashCtx);

export function InkWashProvider({ children }: { children: ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  const navigate = useCallback((id: string) => {
    const overlay = overlayRef.current;
    if (!overlay) { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); return; }

    // Phase 1: sweep in from left
    overlay.style.display     = "block";
    overlay.style.transition  = "none";
    overlay.style.clipPath    = "inset(0 100% 0 0)";

    requestAnimationFrame(() => requestAnimationFrame(() => {
      overlay.style.transition = "clip-path 0.38s cubic-bezier(0.76,0,0.24,1)";
      overlay.style.clipPath   = "inset(0 0% 0 0)";

      setTimeout(() => {
        // Mid-sweep: scroll into view
        document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
        // Phase 2: sweep out to right
        overlay.style.transition = "clip-path 0.38s cubic-bezier(0.76,0,0.24,1)";
        overlay.style.clipPath   = "inset(0 0 0 100%)";

        setTimeout(() => {
          overlay.style.display  = "none";
          overlay.style.clipPath = "inset(0 100% 0 0)";
        }, 420);
      }, 400);
    }));
  }, []);

  return (
    <InkWashCtx.Provider value={{ navigate }}>
      {children}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[900] pointer-events-none hidden"
        style={{
          background: "linear-gradient(135deg, #2C2416 0%, #3d3020 40%, #2C2416 100%)",
          clipPath: "inset(0 100% 0 0)",
        }}
      >
        {/* Central seal on wipe */}
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <svg width="180" height="180" viewBox="0 0 100 100" fill="none" stroke="#C6A87C" strokeWidth="0.6">
            <circle cx="50" cy="50" r="44" strokeDasharray="3 4" strokeWidth="0.3" />
            <circle cx="50" cy="50" r="36" />
            <polygon points="50,14 86,86 14,86" strokeWidth="0.5" fill="none" />
            <circle cx="50" cy="50" r="12" />
            <circle cx="50" cy="50" r="4" fill="#C6A87C" stroke="none" />
          </svg>
        </div>
      </div>
    </InkWashCtx.Provider>
  );
}
