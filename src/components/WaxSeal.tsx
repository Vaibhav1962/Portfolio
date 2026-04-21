interface WaxSealProps {
  className?: string;
  size?: number;
  label?: string;
}

export default function WaxSeal({ className = "", size = 100, label = "VS" }: WaxSealProps) {
  return (
    <div className={`pointer-events-none select-none ${className}`} style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
        {/* Wax drip blobs */}
        <ellipse cx="50" cy="54" rx="38" ry="36" fill="#C6A87C" opacity="0.15" />
        <ellipse cx="50" cy="52" rx="34" ry="33" fill="#C6A87C" opacity="0.25" />
        {/* Main wax circle */}
        <circle cx="50" cy="50" r="32" fill="#C6A87C" opacity="0.85" />
        <circle cx="50" cy="50" r="32" stroke="#b8944a" strokeWidth="0.8" fill="none" />
        {/* Rim detail */}
        <circle cx="50" cy="50" r="28" stroke="#e8d5a3" strokeWidth="0.5" fill="none" strokeDasharray="2 3" opacity="0.6" />
        {/* Inner ring */}
        <circle cx="50" cy="50" r="22" stroke="#b8944a" strokeWidth="0.6" fill="none" opacity="0.8" />
        {/* Monogram */}
        <text
          x="50"
          y="56"
          textAnchor="middle"
          fontSize="16"
          fontFamily="serif"
          fill="#5C4B37"
          fontWeight="bold"
          opacity="0.9"
          letterSpacing="1"
        >
          {label}
        </text>
        {/* Small star ornaments at cardinal points */}
        {[0, 90, 180, 270].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const cx = 50 + 27 * Math.cos(rad);
          const cy = 50 + 27 * Math.sin(rad);
          return <circle key={i} cx={cx} cy={cy} r="1.5" fill="#b8944a" opacity="0.7" />;
        })}
      </svg>
    </div>
  );
}
