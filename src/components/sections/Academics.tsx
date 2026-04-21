"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import SpellSeal from "@/components/SpellSeal";
import QuillHeading from "@/components/QuillHeading";
import SpellBurst from "@/components/SpellBurst";

const data = [
  { semester: "I",   cgpa: 8.3 },
  { semester: "II",  cgpa: 8.1 },
  { semester: "III", cgpa: 7.6 },
  { semester: "IV",  cgpa: 7.4 },
  { semester: "V",   cgpa: 7.25 },
];

const CustomDot = (props: any) => {
  const { cx, cy } = props;
  // Read the current background CSS var for the dot fill so it
  // looks correct in both light (parchment) and dark (obsidian) modes.
  const bg = typeof document !== "undefined"
    ? getComputedStyle(document.documentElement).getPropertyValue("--background").trim()
    : "#FCF9F2";
  return (
    <g>
      <circle cx={cx} cy={cy} r={6} fill={bg} stroke="#C6A87C" strokeWidth={1.5} />
      <circle cx={cx} cy={cy} r={10} fill="none" stroke="#C6A87C" strokeWidth={0.5} strokeDasharray="2 2" />
      <circle cx={cx} cy={cy} r={2.5} fill="#C6A87C" />
    </g>
  );
};

export default function Academics() {
  return (
    <section id="academics" className="py-24 px-16 xl:px-32 border-t codex-border relative overflow-hidden min-h-[80vh] flex flex-col justify-center">
      
      {/* Background Spell Seal — smaller, reverse */}
      <div className="absolute -left-48 top-[15%] pointer-events-none">
        <SpellSeal size={700} opacity={0.04} reverse variant={3} />
      </div>

      {/* Corner ornament */}
      <div className="absolute bottom-10 right-10 pointer-events-none">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="#C6A87C" strokeWidth="0.5" opacity="0.4">
          <path d="M80 80 L40 80 L40 78 M80 80 L80 40 L78 40" />
          <circle cx="60" cy="60" r="8" />
          <circle cx="60" cy="60" r="14" strokeDasharray="1 3" />
          <line x1="60" y1="46" x2="60" y2="74" strokeWidth="0.3" />
          <line x1="46" y1="60" x2="74" y2="60" strokeWidth="0.3" />
          <circle cx="60" cy="60" r="3" fill="#C6A87C" stroke="none" opacity="0.5" />
        </svg>
      </div>

      <div className="max-w-7xl relative z-10 w-full">
        <SpellBurst variant={3} className="opacity-50" />
        <QuillHeading
          text="III. Academic Trajectory"
          tag="h2"
          className="font-serif text-4xl mb-3 text-[var(--color-gold)] font-bold italic tracking-wide"
          delay={150}
        />
        <p className="font-sans text-xs tracking-[0.25em] uppercase text-foreground/40 mb-16">✦ A record etched in semester and ink ✦</p>

        <div className="codex-card backdrop-blur-sm border codex-border p-10 relative overflow-hidden hat-corner spell-card">
          
          <div className="flex flex-col md:flex-row items-start justify-between gap-12">
            {/* Left: info */}
            <div className="w-full md:w-1/3 space-y-8">
              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-foreground/50 mb-1">Institution</p>
                <h3 className="text-2xl font-serif text-[var(--color-brown)]">JIIT</h3>
                <p className="font-sans text-sm text-foreground/60 italic">B.Tech Computer Science</p>
              </div>

              <div>
                <p className="font-sans text-xs uppercase tracking-widest text-foreground/50 mb-1">Current CGPA</p>
                <p className="text-6xl font-serif text-foreground leading-none">
                  7.25
                  <span className="text-xl text-[var(--color-gold)] italic ml-2">/ 10</span>
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t codex-border">
                {[
                  "Algorithms & Data Structures",
                  "Machine Learning & CV",
                  "Backend Systems Design",
                ].map((subject) => (
                  <div key={subject} className="flex items-center gap-3 text-sm font-sans text-foreground/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)] shrink-0" />
                    {subject}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: chart */}
            <div className="w-full md:w-2/3 h-72 relative">
              {/* Chart axis label */}
              <p className="absolute -top-6 right-0 font-sans text-xs tracking-widest uppercase text-foreground/40">CGPA over semesters</p>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis
                    dataKey="semester"
                    stroke="#c6a87c"
                    tick={{ fill: '#5c4b37', fontFamily: 'serif', fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: '#cfc5b5', strokeWidth: 0.5 }}
                  />
                  <YAxis
                    domain={[6.8, 8.6]}
                    stroke="#c6a87c"
                    tick={{ fill: '#5c4b37', fontFamily: 'serif', fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--background)',
                      border: '1px solid var(--card-border)',
                      borderRadius: '2px',
                      fontFamily: 'serif',
                      fontSize: '13px',
                      color: 'var(--foreground)',
                      boxShadow: '0 4px 20px rgba(198,168,124,0.12)'
                    }}
                    itemStyle={{ color: 'var(--color-brown)' }}
                    labelStyle={{ color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '10px' }}
                  />
                  <ReferenceLine y={7.25} stroke="#C6A87C" strokeDasharray="4 4" strokeWidth={0.6} opacity={0.5} />
                  <Line
                    type="monotone"
                    dataKey="cgpa"
                    stroke="#C6A87C"
                    strokeWidth={1.5}
                    dot={<CustomDot />}
                    activeDot={{ r: 7, fill: 'var(--color-gold)', stroke: '#FCF9F2', strokeWidth: 2 }}
                    animationDuration={2500}
                    animationEasing="ease-out"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
