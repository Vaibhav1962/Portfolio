export default function InkDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full flex items-center justify-center py-8 ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 600 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-2xl"
        stroke="#C6A87C"
        strokeWidth="0.6"
      >
        {/* Left arm */}
        <path d="M0 20 Q 80 20 120 20" strokeWidth="0.4" opacity="0.3" />
        <path d="M80 20 Q 100 14 120 20 Q 100 26 80 20" strokeWidth="0.5" opacity="0.5" />
        
        {/* Left leaf flourish */}
        <path d="M110 20 Q 120 12 135 16 Q 128 20 110 20" opacity="0.7" />
        <path d="M110 20 Q 120 28 135 24 Q 128 20 110 20" opacity="0.7" />
        <line x1="110" y1="20" x2="136" y2="20" strokeWidth="0.4" />

        {/* Left small ornament */}
        <circle cx="148" cy="20" r="2" strokeWidth="0.8" opacity="0.8" />
        <line x1="142" y1="20" x2="152" y2="20" strokeWidth="0.4" />
        <path d="M148 14 L 148 18" strokeWidth="0.5" opacity="0.6" />
        <path d="M148 22 L 148 26" strokeWidth="0.5" opacity="0.6" />

        {/* Center sigil */}
        <g transform="translate(300,20)">
          {/* outer ring */}
          <circle cx="0" cy="0" r="14" strokeWidth="0.5" opacity="0.7" />
          <circle cx="0" cy="0" r="10" strokeWidth="0.4" strokeDasharray="1 2" opacity="0.5" />
          {/* Star */}
          <polygon
            points={Array.from({length:6}).map((_,i) => {
              const a = (i/6)*Math.PI*2 - Math.PI/2;
              return `${10*Math.cos(a)},${10*Math.sin(a)}`;
            }).join(" ")}
            strokeWidth="0.4"
            opacity="0.6"
          />
          {/* Inner cross */}
          <line x1="-6" y1="0" x2="6" y2="0" strokeWidth="0.5" opacity="0.7" />
          <line x1="0" y1="-6" x2="0" y2="6" strokeWidth="0.5" opacity="0.7" />
          <circle cx="0" cy="0" r="2" fill="#C6A87C" stroke="none" opacity="0.9" />
          {/* Tick marks */}
          {Array.from({length:12}).map((_,i) => {
            const a = (i/12)*Math.PI*2;
            return <line key={i} x1={12*Math.cos(a)} y1={12*Math.sin(a)} x2={14*Math.cos(a)} y2={14*Math.sin(a)} strokeWidth={i%3===0?"0.8":"0.3"} opacity="0.7" />;
          })}
        </g>

        {/* Right small ornament */}
        <circle cx="452" cy="20" r="2" strokeWidth="0.8" opacity="0.8" />
        <line x1="446" y1="20" x2="456" y2="20" strokeWidth="0.4" />
        <path d="M452 14 L 452 18" strokeWidth="0.5" opacity="0.6" />
        <path d="M452 22 L 452 26" strokeWidth="0.5" opacity="0.6" />

        {/* Right leaf flourish */}
        <path d="M490 20 Q 480 12 465 16 Q 472 20 490 20" opacity="0.7" />
        <path d="M490 20 Q 480 28 465 24 Q 472 20 490 20" opacity="0.7" />
        <line x1="464" y1="20" x2="490" y2="20" strokeWidth="0.4" />

        {/* Right arm */}
        <path d="M480 20 Q 500 14 520 20 Q 500 26 480 20" strokeWidth="0.5" opacity="0.5" />
        <path d="M520 20 Q 560 20 600 20" strokeWidth="0.4" opacity="0.3" />
      </svg>
    </div>
  );
}
