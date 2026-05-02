const signalLanes = [
  'M-40 520 C170 420 315 468 470 358 S775 188 1020 245 S1315 385 1440 300',
  'M-60 392 C140 318 298 332 460 292 S760 170 960 176 S1238 258 1460 138',
  'M170 710 C300 590 440 596 620 505 S900 380 1055 410 S1260 462 1460 380',
];

const nodes = [
  [444, 360, 7, 'delay-0'],
  [610, 258, 5, 'delay-1'],
  [760, 211, 6, 'delay-2'],
  [940, 177, 5, 'delay-3'],
  [1064, 415, 6, 'delay-4'],
  [1198, 276, 5, 'delay-5'],
];

export function HeroSignalOverlay() {
  return (
    <div
      className="hero-signal-overlay pointer-events-none absolute inset-0 z-[1] hidden lg:block"
      aria-hidden="true"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
      >
        <defs>
          <linearGradient id="hero-signal-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0" />
            <stop offset="45%" stopColor="#34d399" stopOpacity="0.72" />
            <stop offset="72%" stopColor="#c7a66a" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#c7a66a" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="hero-node-gradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#eaeaf2" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#34d399" stopOpacity="0.62" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g opacity="0.18">
          <path d="M570 128 H1190 V620 H570 Z" fill="none" stroke="#eaeaf2" strokeWidth="1" />
          <path d="M710 170 H1280 V570 H710 Z" fill="none" stroke="#34d399" strokeWidth="1" />
          <path d="M858 216 H1360 V528 H858 Z" fill="none" stroke="#c7a66a" strokeWidth="1" />
        </g>

        {signalLanes.map((lane, index) => (
          <g key={lane}>
            <path d={lane} fill="none" stroke="#eaeaf2" strokeOpacity="0.12" strokeWidth="1" />
            <path
              className={`hero-signal-line hero-signal-line-${index + 1}`}
              d={lane}
              fill="none"
              stroke="url(#hero-signal-gradient)"
              strokeLinecap="round"
              strokeWidth={index === 0 ? 3 : 2}
              pathLength="1"
            />
          </g>
        ))}

        {nodes.map(([cx, cy, r, delay]) => (
          <g key={`${cx}-${cy}`} className={`hero-signal-node ${delay}`}>
            <circle cx={cx} cy={cy} r={Number(r) + 16} fill="url(#hero-node-gradient)" />
            <circle cx={cx} cy={cy} r={r} fill="#eaeaf2" opacity="0.78" />
          </g>
        ))}
      </svg>
    </div>
  );
}
