'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Types ── */

interface Phase {
  num: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
}

interface TransformationAssemblyProps {
  phases: Phase[];
}

/* ── Constants ── */

const TEAL = '#00E5C3';
const BG = '#060B14';

/* ═══════════════════════════════════════════════════════
   VISUAL DATA — positioned to fit a 800×500 viewBox
   (tighter, self-contained, no bleed)
   ═══════════════════════════════════════════════════════ */

const FUNCS = [
  {
    label: 'Sales',
    x: 460,
    y: 72,
    w: 110,
    h: 40,
    hotspot: true,
    metric: '+41%',
    mLabel: 'Revenue',
  },
  {
    label: 'Marketing',
    x: 660,
    y: 180,
    w: 118,
    h: 40,
    hotspot: true,
    metric: '3.2x',
    mLabel: 'Pipeline',
  },
  {
    label: 'Operations',
    x: 380,
    y: 390,
    w: 126,
    h: 40,
    hotspot: true,
    metric: '97%',
    mLabel: 'Efficiency',
  },
  { label: 'Support', x: 620, y: 385, w: 108, h: 40, hotspot: false, metric: '', mLabel: '' },
  { label: 'Finance', x: 240, y: 115, w: 108, h: 40, hotspot: false, metric: '', mLabel: '' },
  { label: 'People', x: 175, y: 290, w: 100, h: 40, hotspot: false, metric: '', mLabel: '' },
];

const AGENTS = [
  { x: 365, y: 145, label: 'AI + Team' },
  { x: 640, y: 285, label: 'AI + Team' },
  { x: 280, y: 350, label: 'AI + Team' },
];

const DASH = { x: 380, y: 200, w: 190, h: 110 };

const CONNS = [
  [FUNCS[4].x, FUNCS[4].y, AGENTS[0].x, AGENTS[0].y],
  [FUNCS[0].x, FUNCS[0].y, AGENTS[0].x, AGENTS[0].y],
  [FUNCS[1].x, FUNCS[1].y, AGENTS[1].x, AGENTS[1].y],
  [FUNCS[3].x, FUNCS[3].y, AGENTS[1].x, AGENTS[1].y],
  [FUNCS[5].x, FUNCS[5].y, AGENTS[2].x, AGENTS[2].y],
  [FUNCS[2].x, FUNCS[2].y, AGENTS[2].x, AGENTS[2].y],
  [AGENTS[0].x, AGENTS[0].y, DASH.x + DASH.w / 2, DASH.y + 10],
  [AGENTS[1].x, AGENTS[1].y, DASH.x + DASH.w - 10, DASH.y + DASH.h / 2],
  [AGENTS[2].x, AGENTS[2].y, DASH.x + 10, DASH.y + DASH.h - 10],
];

/* ── Phase 1: Scan discovery tags ── */

const SCAN_TAGS = [
  {
    fx: FUNCS[0].x,
    tags: [
      { label: 'GROWTH OPPORTUNITIES', dx: 0, dy: -48 },
      { label: 'EVENT TRIGGERS', dx: 72, dy: 8 },
      { label: 'HIGH-GROWTH SEGMENTS', dx: -12, dy: 38 },
    ],
  },
  {
    fx: FUNCS[1].x,
    tags: [
      { label: 'CUSTOMER SIGNALS', dx: 0, dy: -48 },
      { label: 'COMPETITIVE GAPS', dx: -88, dy: 6 },
      { label: 'UNTAPPED CHANNELS', dx: 10, dy: 44 },
    ],
  },
  {
    fx: FUNCS[2].x,
    tags: [
      { label: 'PROCESS BOTTLENECKS', dx: 0, dy: -48 },
      { label: 'MANUAL WORKFLOWS', dx: 85, dy: -14 },
      { label: 'COST LEAKAGE', dx: -80, dy: 6 },
    ],
  },
];

/* ── Phase 2: Benefit labels ── */

const BENEFITS = [
  {
    x: (FUNCS[0].x + AGENTS[0].x) / 2 + 8,
    y: (FUNCS[0].y + AGENTS[0].y) / 2 - 16,
    label: 'AUTOMATED OUTREACH',
  },
  {
    x: (FUNCS[1].x + AGENTS[1].x) / 2,
    y: (FUNCS[1].y + AGENTS[1].y) / 2 - 16,
    label: 'AI-DRIVEN TARGETING',
  },
  {
    x: (FUNCS[2].x + AGENTS[2].x) / 2,
    y: (FUNCS[2].y + AGENTS[2].y) / 2 - 16,
    label: 'WORKFLOW AUTOMATION',
  },
];

const MARKET_PATHS = [
  `M320,0 C340,60 ${AGENTS[0].x - 15},${AGENTS[0].y - 50} ${AGENTS[0].x},${AGENTS[0].y}`,
  `M460,0 C465,50 ${FUNCS[0].x},${FUNCS[0].y - 35} ${FUNCS[0].x},${FUNCS[0].y}`,
  `M640,0 C635,60 ${FUNCS[1].x},${FUNCS[1].y - 40} ${FUNCS[1].x},${FUNCS[1].y}`,
  `M740,0 C730,80 ${AGENTS[1].x + 15},${AGENTS[1].y - 60} ${AGENTS[1].x},${AGENTS[1].y}`,
];

const FLOW_PATHS = [
  `M${FUNCS[0].x},${FUNCS[0].y} C${FUNCS[0].x - 30},${FUNCS[0].y + 25} ${AGENTS[0].x + 25},${AGENTS[0].y - 8} ${DASH.x + DASH.w / 2},${DASH.y + 10}`,
  `M${DASH.x + DASH.w},${DASH.y + DASH.h / 2} C${DASH.x + DASH.w + 30},${DASH.y + DASH.h / 2 + 25} ${AGENTS[1].x - 15},${AGENTS[1].y - 25} ${FUNCS[1].x},${FUNCS[1].y}`,
  `M${DASH.x},${DASH.y + DASH.h} C${DASH.x - 25},${DASH.y + DASH.h + 25} ${AGENTS[2].x + 15},${AGENTS[2].y - 15} ${FUNCS[2].x},${FUNCS[2].y}`,
];

const AMBIENT = [
  { cx: 120, cy: 60 },
  { cx: 720, cy: 90 },
  { cx: 80, cy: 200 },
  { cx: 750, cy: 320 },
  { cx: 150, cy: 440 },
  { cx: 680, cy: 420 },
  { cx: 50, cy: 340 },
  { cx: 600, cy: 50 },
  { cx: 90, cy: 140 },
  { cx: 560, cy: 450 },
  { cx: 340, cy: 30 },
  { cx: 480, cy: 460 },
];

function bz(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  return `M${x1},${y1} Q${mx - dy * 0.12},${my + dx * 0.12} ${x2},${y2}`;
}

/* ═══════════════════════════════════════════════════════
   ForgeAnimation — rAF-driven SVG (contained, no bleed)
   ═══════════════════════════════════════════════════════ */

function ForgeAnimation({
  progressRef,
}: {
  progressRef: React.RefObject<{ value: number } | null>;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let raf: number;

    const animate = () => {
      const svg = svgRef.current;
      if (!svg || !progressRef.current) {
        raf = requestAnimationFrame(animate);
        return;
      }

      const p = progressRef.current.value;
      const phase = p < 0.33 ? 0 : p < 0.66 ? 1 : 2;
      const t = phase === 0 ? p / 0.33 : phase === 1 ? (p - 0.33) / 0.33 : (p - 0.66) / 0.34;
      const ease = (v: number) => 1 - (1 - v) ** 3;
      const cl = (v: number) => Math.max(0, Math.min(1, v));

      /* ── Scan line ── */
      const scan = svg.querySelector<SVGElement>('.fg-scan');
      if (scan) {
        if (phase === 0) {
          const scanX = 100 + ease(cl(t / 0.9)) * 650;
          scan.setAttribute('transform', `translate(${scanX}, 0)`);
          const fadeIn = cl(t * 5);
          const fadeOut = 1 - ease(cl((t - 0.85) / 0.15));
          scan.style.opacity = String(fadeIn * fadeOut * 0.9);
        } else {
          scan.style.opacity = '0';
        }
      }

      /* ── Function blocks ── */
      svg.querySelectorAll<SVGElement>('.fg-func').forEach((el) => {
        const fx = Number(el.getAttribute('data-x'));
        if (phase === 0) {
          const scanX = 100 + ease(cl(t / 0.9)) * 650;
          const scanned = fx < scanX + 60;
          const fadeT = scanned ? cl((scanX + 60 - fx) / 120) : 0;
          el.style.opacity = String(fadeT * 0.8);
        } else if (phase === 1) {
          el.style.opacity = '0.9';
        } else {
          el.style.opacity = '1';
        }
      });

      /* ── Hotspot rings (Phase 0 only) ── */
      svg.querySelectorAll<SVGElement>('.fg-hotspot').forEach((el) => {
        const fx = Number(el.getAttribute('data-x'));
        if (phase === 0) {
          const scanX = 100 + ease(cl(t / 0.9)) * 650;
          const hit = fx < scanX + 30;
          if (hit) {
            const pulse = 0.5 + Math.sin(Date.now() / 400) * 0.2;
            el.style.opacity = String(pulse);
          } else {
            el.style.opacity = '0';
          }
        } else {
          el.style.opacity = '0';
        }
      });

      /* ── Scan discovery tags (Phase 0 — staggered) ── */
      svg.querySelectorAll<SVGElement>('.fg-scan-tag').forEach((el) => {
        const fx = Number(el.getAttribute('data-x'));
        const delay = Number(el.getAttribute('data-delay')) || 0;
        if (phase === 0) {
          const scanX = 100 + ease(cl(t / 0.9)) * 650;
          const hit = fx < scanX + 20;
          if (hit) {
            const revealT = cl((scanX + 20 - fx) / 120 - delay);
            el.style.opacity = String(ease(revealT) * 0.8);
          } else {
            el.style.opacity = '0';
          }
        } else {
          el.style.opacity = '0';
        }
      });

      /* ── AI Agent nodes ── */
      svg.querySelectorAll<SVGElement>('.fg-agent').forEach((el, i) => {
        if (phase === 0) {
          el.style.opacity = '0';
        } else if (phase === 1) {
          const at = ease(cl((t - 0.1 - i * 0.12) / 0.25));
          el.style.opacity = String(at * 0.95);
        } else {
          el.style.opacity = '1';
        }
      });

      /* ── Connections ── */
      svg.querySelectorAll<SVGElement>('.fg-conn').forEach((conn, i) => {
        if (phase === 0) {
          conn.style.opacity = '0';
          conn.style.strokeDashoffset = '1';
        } else if (phase === 1) {
          const ct = ease(cl((t - (i / CONNS.length) * 0.45) / 0.3));
          conn.style.opacity = String(ct * 0.55);
          conn.style.strokeDashoffset = String(1 - ct);
        } else {
          conn.style.opacity = '0.45';
          conn.style.strokeDashoffset = '0';
        }
      });

      /* ── Benefit labels (Phase 2) ── */
      svg.querySelectorAll<SVGElement>('.fg-benefit').forEach((el, i) => {
        if (phase === 1) {
          const bt = ease(cl((t - 0.35 - i * 0.1) / 0.25));
          el.style.opacity = String(bt * 0.75);
        } else if (phase === 2) {
          el.style.opacity = String(0.55 + ease(cl(t / 0.3)) * 0.15);
        } else {
          el.style.opacity = '0';
        }
      });

      /* ── Dashboard ── */
      const dash = svg.querySelector<SVGElement>('.fg-dash');
      if (dash) {
        if (phase === 0) {
          dash.style.opacity = '0';
        } else if (phase === 1) {
          dash.style.opacity = String(ease(cl((t - 0.2) / 0.3)));
        } else {
          dash.style.opacity = '1';
        }
      }

      /* ── Dashboard glow ── */
      const dashGlow = svg.querySelector<SVGElement>('.fg-dash-glow');
      if (dashGlow) {
        dashGlow.style.opacity =
          phase < 1 ? '0' : phase === 1 ? String(ease(cl((t - 0.3) / 0.3)) * 0.04) : '0.06';
      }

      /* ── Dashboard fills ── */
      svg.querySelectorAll<SVGElement>('.fg-dash-fill').forEach((el, i) => {
        if (phase < 1) {
          el.style.opacity = '0';
        } else if (phase === 1) {
          el.style.opacity = String(ease(cl((t - 0.45 - i * 0.06) / 0.25)));
        } else {
          el.style.opacity = '1';
        }
      });

      /* ── Inline metrics (Phase 3) ── */
      svg.querySelectorAll<SVGElement>('.fg-inline-metric').forEach((m, i) => {
        m.style.opacity = phase === 2 ? String(ease(cl((t - 0.15 - i * 0.1) / 0.25))) : '0';
      });

      /* ── Market dots ── */
      svg.querySelectorAll<SVGElement>('.fg-market').forEach((dot) => {
        dot.style.opacity = phase === 2 ? String(ease(cl(t * 1.5)) * 0.7) : '0';
      });

      /* ── Flow dots ── */
      svg.querySelectorAll<SVGElement>('.fg-flow').forEach((dot) => {
        dot.style.opacity = phase === 2 ? String(ease(cl(t * 2)) * 0.8) : '0';
      });

      /* ── Grid ── */
      const grid = svg.querySelector<SVGElement>('.fg-grid');
      if (grid) {
        grid.style.opacity =
          phase === 0 ? String(ease(cl((t - 0.1) / 0.3)) * 0.08) : phase === 1 ? '0.06' : '0.04';
      }

      /* ── Ambient ── */
      const amb = svg.querySelector<SVGElement>('.fg-ambient');
      if (amb) {
        amb.style.opacity = String(0.06 + phase * 0.03);
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [progressRef]);

  const hotspotFuncs = FUNCS.filter((f) => f.hotspot);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 800 500"
      fill="none"
      className="w-full h-full pointer-events-none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <filter id="fgGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="fgGlowStrong" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="fgScanGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={`${TEAL}00`} />
          <stop offset="20%" stopColor={`${TEAL}33`} />
          <stop offset="50%" stopColor={`${TEAL}66`} />
          <stop offset="80%" stopColor={`${TEAL}33`} />
          <stop offset="100%" stopColor={`${TEAL}00`} />
        </linearGradient>
        <radialGradient id="fgCenterGlow" cx="50%" cy="42%" r="35%">
          <stop offset="0%" stopColor={TEAL} stopOpacity="0.06" />
          <stop offset="100%" stopColor={TEAL} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="800" height="500" fill="url(#fgCenterGlow)" />

      <g className="fg-ambient" style={{ opacity: 0.06 }}>
        {AMBIENT.map((d, i) => (
          <circle key={`amb${i}`} cx={d.cx} cy={d.cy} r={1 + (i % 3) * 0.4} fill={TEAL} />
        ))}
      </g>

      <g className="fg-grid" style={{ opacity: 0 }}>
        {[80, 160, 240, 320, 400].map((y) => (
          <line key={`h${y}`} x1="60" y1={y} x2="760" y2={y} stroke={TEAL} strokeWidth="0.3" />
        ))}
        {[140, 240, 340, 440, 540, 640, 740].map((x) => (
          <line key={`v${x}`} x1={x} y1="40" x2={x} y2="460" stroke={TEAL} strokeWidth="0.3" />
        ))}
      </g>

      {/* ── Scan line ── */}
      <g className="fg-scan" style={{ opacity: 0 }}>
        <rect x={-40} y="15" width="80" height="470" fill="url(#fgScanGrad)" />
        <line x1="0" y1="15" x2="0" y2="485" stroke={TEAL} strokeWidth="2" opacity="0.7" />
      </g>

      {/* ── Function blocks ── */}
      {FUNCS.map((f, i) => (
        <g key={`fn${i}`} className="fg-func" data-x={f.x} style={{ opacity: 0 }}>
          <rect
            x={f.x - f.w / 2}
            y={f.y - f.h / 2}
            width={f.w}
            height={f.h}
            rx="6"
            fill={`${BG}cc`}
            stroke={TEAL}
            strokeWidth="1.5"
          />
          <text
            x={f.x}
            y={f.y + (f.hotspot ? -2 : 5)}
            textAnchor="middle"
            fill={TEAL}
            fontSize="12"
            fontWeight="700"
            fontFamily="system-ui"
          >
            {f.label}
          </text>
          {f.hotspot && (
            <text
              className="fg-inline-metric"
              x={f.x}
              y={f.y + 12}
              textAnchor="middle"
              fill={TEAL}
              fontSize="9"
              fontWeight="700"
              fontFamily="monospace"
              style={{ opacity: 0 }}
            >
              {f.metric} {f.mLabel?.toUpperCase()}
            </text>
          )}
        </g>
      ))}

      {/* ── Hotspot rings ── */}
      {hotspotFuncs.map((f, i) => (
        <g key={`hs${i}`} className="fg-hotspot" data-x={f.x} style={{ opacity: 0 }}>
          <circle
            cx={f.x}
            cy={f.y}
            r={f.w / 2 + 12}
            fill="none"
            stroke={TEAL}
            strokeWidth="1.5"
            filter="url(#fgGlow)"
          />
          <circle
            cx={f.x}
            cy={f.y}
            r={f.w / 2 + 20}
            fill="none"
            stroke={TEAL}
            strokeWidth="0.5"
            strokeDasharray="4 6"
          />
        </g>
      ))}

      {/* ── Phase 1: Scan discovery tags ── */}
      {SCAN_TAGS.map((group, gi) => {
        const f = hotspotFuncs[gi];
        return group.tags.map((tag, ti) => {
          const tw = tag.label.length * 4 + 10;
          return (
            <g
              key={`st${gi}${ti}`}
              className="fg-scan-tag"
              data-x={String(group.fx)}
              data-delay={String(ti * 0.18)}
              style={{ opacity: 0 }}
            >
              <rect
                x={f.x + tag.dx - tw / 2}
                y={f.y + tag.dy - 7}
                width={tw}
                height="14"
                rx="3"
                fill={BG}
                opacity="0.9"
              />
              <rect
                x={f.x + tag.dx - tw / 2}
                y={f.y + tag.dy - 7}
                width={tw}
                height="14"
                rx="3"
                fill="none"
                stroke={TEAL}
                strokeWidth="0.5"
                opacity="0.35"
              />
              <text
                x={f.x + tag.dx}
                y={f.y + tag.dy + 3}
                textAnchor="middle"
                fill={TEAL}
                fontSize="6"
                fontWeight="600"
                fontFamily="monospace"
                letterSpacing="0.4"
              >
                {tag.label}
              </text>
            </g>
          );
        });
      })}

      {/* ── Connections ── */}
      {CONNS.map((c, i) => (
        <path
          key={`cn${i}`}
          className="fg-conn"
          d={bz(c[0], c[1], c[2], c[3])}
          stroke={TEAL}
          strokeWidth="1.5"
          fill="none"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset="1"
          style={{ opacity: 0 }}
        />
      ))}

      {/* ── Phase 2: Benefit labels ── */}
      {BENEFITS.map((b, i) => {
        const tw = b.label.length * 4 + 12;
        return (
          <g key={`bf${i}`} className="fg-benefit" style={{ opacity: 0 }}>
            <rect
              x={b.x - tw / 2}
              y={b.y - 7}
              width={tw}
              height="14"
              rx="3"
              fill={BG}
              opacity="0.85"
            />
            <rect
              x={b.x - tw / 2}
              y={b.y - 7}
              width={tw}
              height="14"
              rx="3"
              fill={TEAL}
              opacity="0.08"
            />
            <text
              x={b.x}
              y={b.y + 3}
              textAnchor="middle"
              fill={TEAL}
              fontSize="6"
              fontWeight="700"
              fontFamily="monospace"
              letterSpacing="0.5"
            >
              {b.label}
            </text>
          </g>
        );
      })}

      {/* ── AI Agent hubs ── */}
      {AGENTS.map((a, i) => (
        <g key={`ag${i}`} className="fg-agent" style={{ opacity: 0 }}>
          <circle
            cx={a.x}
            cy={a.y}
            r="22"
            fill="none"
            stroke={TEAL}
            strokeWidth="0.5"
            opacity="0.2"
          />
          <circle cx={a.x} cy={a.y} r="15" fill={`${BG}ee`} stroke={TEAL} strokeWidth="1.5" />
          <circle cx={a.x} cy={a.y - 3.5} r="1.4" fill={TEAL} opacity="0.85" />
          <circle cx={a.x - 3.5} cy={a.y + 2.5} r="1.4" fill={TEAL} opacity="0.85" />
          <circle cx={a.x + 3.5} cy={a.y + 2.5} r="1.4" fill={TEAL} opacity="0.85" />
          <line
            x1={a.x}
            y1={a.y - 3.5}
            x2={a.x - 3.5}
            y2={a.y + 2.5}
            stroke={TEAL}
            strokeWidth="0.5"
            opacity="0.5"
          />
          <line
            x1={a.x}
            y1={a.y - 3.5}
            x2={a.x + 3.5}
            y2={a.y + 2.5}
            stroke={TEAL}
            strokeWidth="0.5"
            opacity="0.5"
          />
          <line
            x1={a.x - 3.5}
            y1={a.y + 2.5}
            x2={a.x + 3.5}
            y2={a.y + 2.5}
            stroke={TEAL}
            strokeWidth="0.5"
            opacity="0.5"
          />
          <text
            x={a.x}
            y={a.y + 10}
            textAnchor="middle"
            fill={TEAL}
            fontSize="5"
            fontWeight="700"
            fontFamily="system-ui"
            letterSpacing="0.5"
            opacity="0.8"
          >
            AI + TEAM
          </text>
        </g>
      ))}

      {/* ── Dashboard glow ── */}
      <ellipse
        className="fg-dash-glow"
        cx={DASH.x + DASH.w / 2}
        cy={DASH.y + DASH.h / 2}
        rx={DASH.w / 2 + 30}
        ry={DASH.h / 2 + 20}
        fill={TEAL}
        style={{ opacity: 0 }}
        filter="url(#fgGlowStrong)"
      />

      {/* ── Dashboard ── */}
      <g className="fg-dash" style={{ opacity: 0 }}>
        <rect
          x={DASH.x}
          y={DASH.y}
          width={DASH.w}
          height={DASH.h}
          rx="7"
          fill={`${BG}dd`}
          stroke={TEAL}
          strokeWidth="1.5"
        />
        <line
          x1={DASH.x}
          y1={DASH.y + 20}
          x2={DASH.x + DASH.w}
          y2={DASH.y + 20}
          stroke={TEAL}
          strokeWidth="0.6"
          opacity="0.4"
        />
        <text
          x={DASH.x + DASH.w / 2}
          y={DASH.y + 14}
          textAnchor="middle"
          fill={TEAL}
          fontSize="8"
          fontWeight="700"
          fontFamily="system-ui"
          letterSpacing="1.2"
          opacity="0.75"
        >
          COMMAND CENTER
        </text>
        <circle cx={DASH.x + 10} cy={DASH.y + 10} r="2" fill={TEAL} opacity="0.5" />
        <circle cx={DASH.x + 17} cy={DASH.y + 10} r="2" fill={TEAL} opacity="0.3" />
        <circle cx={DASH.x + 24} cy={DASH.y + 10} r="2" fill={TEAL} opacity="0.15" />

        <g className="fg-dash-fill" style={{ opacity: 0 }}>
          <rect
            x={DASH.x + 12}
            y={DASH.y + 76}
            width="11"
            height="16"
            rx="2"
            fill={TEAL}
            opacity="0.25"
          />
          <rect
            x={DASH.x + 28}
            y={DASH.y + 66}
            width="11"
            height="26"
            rx="2"
            fill={TEAL}
            opacity="0.4"
          />
          <rect
            x={DASH.x + 44}
            y={DASH.y + 54}
            width="11"
            height="38"
            rx="2"
            fill={TEAL}
            opacity="0.55"
          />
          <rect
            x={DASH.x + 60}
            y={DASH.y + 40}
            width="11"
            height="52"
            rx="2"
            fill={TEAL}
            opacity="0.7"
          />
        </g>

        <g className="fg-dash-fill" style={{ opacity: 0 }}>
          <polyline
            points={`${DASH.x + 86},${DASH.y + 82} ${DASH.x + 100},${DASH.y + 72} ${DASH.x + 112},${DASH.y + 75} ${DASH.x + 126},${DASH.y + 56} ${DASH.x + 142},${DASH.y + 44} ${DASH.x + 170},${DASH.y + 30}`}
            stroke={TEAL}
            strokeWidth="1.5"
            fill="none"
            opacity="0.75"
          />
          <polygon
            points={`${DASH.x + 86},${DASH.y + 82} ${DASH.x + 100},${DASH.y + 72} ${DASH.x + 112},${DASH.y + 75} ${DASH.x + 126},${DASH.y + 56} ${DASH.x + 142},${DASH.y + 44} ${DASH.x + 170},${DASH.y + 30} ${DASH.x + 170},${DASH.y + 96} ${DASH.x + 86},${DASH.y + 96}`}
            fill={TEAL}
            opacity="0.06"
          />
        </g>

        <g className="fg-dash-fill" style={{ opacity: 0 }}>
          <text
            x={DASH.x + DASH.w / 2}
            y={DASH.y + DASH.h - 4}
            textAnchor="middle"
            fill={TEAL}
            fontSize="7"
            fontWeight="600"
            fontFamily="monospace"
            opacity="0.5"
          >
            LIVE · 24/7 ACTIVE
          </text>
        </g>
      </g>

      {/* ── Market flow dots ── */}
      {MARKET_PATHS.map((path, i) => (
        <circle
          key={`mk${i}`}
          className="fg-market"
          r="2"
          fill={TEAL}
          filter="url(#fgGlow)"
          style={{ opacity: 0 }}
        >
          <animateMotion dur={`${3.5 + i * 0.8}s`} repeatCount="indefinite" path={path} />
        </circle>
      ))}

      {/* ── System flow dots ── */}
      {FLOW_PATHS.map((path, i) => (
        <circle
          key={`fl${i}`}
          className="fg-flow"
          r="2.5"
          fill={TEAL}
          filter="url(#fgGlow)"
          style={{ opacity: 0 }}
        >
          <animateMotion dur={`${4 + i * 0.7}s`} repeatCount="indefinite" path={path} />
        </circle>
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════
   Main Component — 55% text | 45% contained animation
   ═══════════════════════════════════════════════════════ */

export function TransformationAssembly({ phases }: TransformationAssemblyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef({ value: 0 });

  useGSAP(
    () => {
      if (typeof window === 'undefined') return;
      const el = containerRef.current;
      if (!el) return;

      const cards = el.querySelectorAll<HTMLElement>('.ta-card');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: '+=280%',
          pin: true,
          pinSpacing: true,
          scrub: 1,
          onUpdate: (self) => {
            progressRef.current.value = self.progress;
          },
        },
      });

      /* Phase 1→2: card 1 brightens, card 0 dims */
      tl.to(cards[1], { opacity: 1, y: 0, duration: 0.06 }, 0.3);
      tl.to(cards[0], { opacity: 0.3, duration: 0.04 }, 0.3);

      /* Phase 2→3: card 2 brightens, card 1 dims */
      tl.to(cards[2], { opacity: 1, y: 0, duration: 0.06 }, 0.62);
      tl.to(cards[1], { opacity: 0.3, duration: 0.04 }, 0.62);
      tl.to(cards[0], { opacity: 0.2, duration: 0.04 }, 0.62);

      tl.to({}, { duration: 0.01 }, 1);
    },
    { scope: containerRef, dependencies: [phases] },
  );

  return (
    <div ref={containerRef} className="bg-bg-deep">
      <div className="relative h-screen w-full overflow-hidden">
        {/* ── Contained animation — right 45%, vertically centered ── */}
        <div className="absolute top-0 right-0 bottom-0 w-[45%] hidden lg:flex items-center justify-center p-6 pr-10">
          <ForgeAnimation progressRef={progressRef} />
        </div>

        {/* ── Soft edge blend between text and animation ── */}
        <div
          className="absolute top-0 bottom-0 right-[42%] w-[8%] z-[1] hidden lg:block"
          style={{
            background: `linear-gradient(to right, ${BG}, transparent)`,
          }}
        />

        {/* Top/bottom vignette */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, ${BG} 0%, transparent 5%, transparent 95%, ${BG} 100%)`,
          }}
        />

        {/* ── Left text column — generous 55% ── */}
        <div className="relative z-10 flex flex-col justify-center h-full w-full lg:w-[55%] px-6 sm:px-10 lg:px-16 xl:px-20 py-16 lg:py-0">
          {/* Section label */}
          <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: TEAL }}>
            How We Work
          </p>

          {/* Main heading — large and commanding */}
          <h2
            className="mt-5 text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.08] text-text-primary"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Strategy through production.{' '}
            <span className="text-text-muted">One partner, no handoffs.</span>
          </h2>

          {/* Description — legible body size */}
          <p className="mt-5 text-base text-text-secondary leading-relaxed max-w-[520px]">
            Every engagement follows three phases — each with clear owners, measurable outcomes, and
            the same team from start to finish.
          </p>

          {/* ── Phase cards ── */}
          <div className="mt-10 space-y-5">
            {phases.map((phase, i) => (
              <div
                key={phase.num}
                className="ta-card"
                style={{
                  opacity: i === 0 ? 1 : 0.18,
                  transform: i === 0 ? 'none' : 'translateY(6px)',
                }}
              >
                <div className="border-l-[2px] pl-5 py-2" style={{ borderColor: `${TEAL}35` }}>
                  <p
                    className="text-[10px] uppercase tracking-[0.16em] mb-1.5"
                    style={{ fontFamily: 'var(--font-mono)', color: TEAL }}
                  >
                    {phase.num} — {phase.subtitle}
                  </p>
                  <h4
                    className="text-base lg:text-lg text-text-primary leading-snug"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {phase.title}
                  </h4>
                  <p className="text-sm text-text-secondary leading-relaxed mt-1.5 max-w-[440px]">
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll hint */}
          <div className="mt-10 flex items-center gap-2 opacity-20">
            <div className="w-5 h-px bg-text-muted" />
            <p className="text-[9px] uppercase tracking-[0.2em] text-text-muted">
              Scroll to explore
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
