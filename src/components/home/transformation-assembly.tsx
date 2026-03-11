"use client";

import { useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
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

const TEAL = "#00E5C3";
const BG = "#060B14";

/* ══════════════════════════════════════════════
   SVG Visual — Connected Business Architecture

   Three phases that build on each other:
   1. Understand: Scattered business nodes scanned & diagnosed
   2. Build: Nodes reorganize into engineered system with AI agents
   3. Operate: System runs — data flows, metrics pulse, scale expands
   ══════════════════════════════════════════════ */

/* Layout coordinates on a 600x450 viewBox */
const SCATTERED_NODES = [
  { x: 95,  y: 80,  label: "Revenue" },
  { x: 480, y: 65,  label: "Sales" },
  { x: 140, y: 340, label: "Operations" },
  { x: 510, y: 310, label: "Service" },
  { x: 300, y: 170, label: "Data" },
  { x: 210, y: 230, label: "Marketing" },
  { x: 430, y: 200, label: "Finance" },
];

const ORGANIZED_NODES = [
  { x: 120, y: 110 },
  { x: 480, y: 110 },
  { x: 120, y: 340 },
  { x: 480, y: 340 },
  { x: 300, y: 225 }, // center hub
  { x: 200, y: 225 },
  { x: 400, y: 225 },
];

const CONNECTIONS: [number, number][] = [
  [0, 4], [1, 4], [2, 4], [3, 4],
  [0, 5], [5, 4], [1, 6], [6, 4],
  [2, 5], [3, 6],
];

const DIAG_LINES: [number, number][] = [
  [0, 4], [1, 4], [2, 5], [3, 6], [4, 5], [4, 6], [0, 5], [1, 6],
];

const AI_POSITIONS = [
  { x: 300, y: 160 },
  { x: 190, y: 290 },
  { x: 410, y: 290 },
];

const METRIC_POSITIONS = [
  { x: 120, y: 110 },
  { x: 480, y: 110 },
  { x: 120, y: 340 },
  { x: 480, y: 340 },
];

/* ── Helper functions ── */

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

/* ── SVG Visual (desktop, ref-driven) ── */

function DesktopVisual({ progressRef }: { progressRef: React.RefObject<{ value: number }> }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let raf: number;

    const animate = () => {
      const svg = svgRef.current;
      if (!svg || !progressRef.current) { raf = requestAnimationFrame(animate); return; }

      const progress = progressRef.current.value;
      const phase = progress < 0.33 ? 0 : progress < 0.66 ? 1 : 2;
      const localT = phase === 0
        ? progress / 0.33
        : phase === 1
          ? (progress - 0.33) / 0.33
          : (progress - 0.66) / 0.34;

      /* ── Query elements (cached by browser) ── */
      const nodes = svg.querySelectorAll<SVGElement>(".n-group");
      const connLines = svg.querySelectorAll<SVGElement>(".c-line");
      const scanLine = svg.querySelector<SVGElement>(".s-line");
      const scanGlow = svg.querySelector<SVGElement>(".s-glow");
      const hubRings = svg.querySelectorAll<SVGElement>(".h-ring");
      const aiIcons = svg.querySelectorAll<SVGElement>(".a-icon");
      const flowDots = svg.querySelectorAll<SVGElement>(".f-dot");
      const metricPulses = svg.querySelectorAll<SVGElement>(".m-pulse");
      const diagLines = svg.querySelectorAll<SVGElement>(".d-line");
      const nodeLabels = svg.querySelectorAll<SVGElement>(".n-label");
      const operateGlow = svg.querySelector<SVGElement>(".o-glow");
      const scaleRings = svg.querySelectorAll<SVGElement>(".sc-ring");

      /* ── Interpolate node positions ── */
      nodes.forEach((node, i) => {
        const sn = SCATTERED_NODES[i];
        const on = ORGANIZED_NODES[i];
        if (!sn || !on) return;

        let nx: number, ny: number;
        if (phase === 0) {
          nx = sn.x;
          ny = sn.y;
        } else {
          const moveT = easeInOut(clamp01(phase === 1 ? localT * 1.5 : 1));
          nx = sn.x + (on.x - sn.x) * moveT;
          ny = sn.y + (on.y - sn.y) * moveT;
        }
        node.setAttribute("transform", `translate(${nx}, ${ny})`);

        /* Node appearance */
        const core = node.querySelector<SVGElement>(".n-core");
        const ring = node.querySelector<SVGElement>(".n-ring");
        if (core && ring) {
          if (phase === 0) {
            const scanThreshold = (sn.x / 600) * 0.8;
            const scanned = localT > scanThreshold;
            core.style.opacity = scanned ? "0.8" : "0.15";
            ring.style.opacity = scanned ? "0.4" : "0.06";
            ring.setAttribute("r", "18");
          } else if (phase === 1) {
            core.style.opacity = "0.9";
            ring.style.opacity = "0.35";
            ring.setAttribute("r", i === 4 ? "28" : "20");
          } else {
            core.style.opacity = "1";
            ring.style.opacity = "0.45";
            ring.setAttribute("r", i === 4 ? "32" : "22");
          }
        }
      });

      /* ── Scan line ── */
      if (scanLine && scanGlow) {
        if (phase === 0) {
          const scanX = easeOut(localT) * 600;
          scanLine.setAttribute("x1", String(scanX));
          scanLine.setAttribute("x2", String(scanX));
          scanLine.style.opacity = String(0.6 * (1 - localT * 0.4));
          scanGlow.setAttribute("cx", String(scanX));
          scanGlow.style.opacity = String(0.25 * (1 - localT * 0.4));
        } else {
          scanLine.style.opacity = "0";
          scanGlow.style.opacity = "0";
        }
      }

      /* ── Diagnostic dashed lines ── */
      diagLines.forEach((line, i) => {
        if (phase === 0) {
          const threshold = (i / diagLines.length) * 0.65;
          line.style.opacity = String(localT > threshold ? clamp01((localT - threshold) / 0.25) * 0.3 : 0);
        } else if (phase === 1) {
          line.style.opacity = String(0.3 * (1 - easeOut(clamp01(localT * 2))));
        } else {
          line.style.opacity = "0";
        }
      });

      /* ── Node labels ── */
      nodeLabels.forEach((label, i) => {
        if (phase === 0) {
          const threshold = 0.15 + (i / nodeLabels.length) * 0.5;
          label.style.opacity = localT > threshold ? String(clamp01((localT - threshold) / 0.2) * 0.55) : "0";
        } else if (phase === 1) {
          label.style.opacity = String(0.55 * (1 - easeOut(clamp01(localT * 2))));
        } else {
          label.style.opacity = "0";
        }
      });

      /* ── Connection lines (Build → Operate) ── */
      connLines.forEach((line, i) => {
        if (phase === 0) {
          line.style.opacity = "0";
          line.style.strokeDashoffset = "1";
        } else if (phase === 1) {
          const threshold = (i / connLines.length) * 0.5;
          const drawT = clamp01((localT - threshold) / 0.35);
          line.style.opacity = String(drawT * 0.45);
          line.style.strokeDashoffset = String(1 - easeOut(drawT));
        } else {
          line.style.opacity = "0.55";
          line.style.strokeDashoffset = "0";
        }
      });

      /* ── Hub rings ── */
      hubRings.forEach((ring, i) => {
        if (phase < 1) {
          ring.style.opacity = "0";
          ring.style.transform = "scale(0.3)";
        } else if (phase === 1) {
          const hubT = easeOut(clamp01((localT - 0.3) / 0.5));
          ring.style.opacity = String(hubT * (0.28 - i * 0.07));
          ring.style.transform = `scale(${0.3 + hubT * 0.7})`;
        } else {
          ring.style.opacity = String(0.28 - i * 0.07);
          ring.style.transform = "scale(1)";
        }
      });

      /* ── AI agent icons ── */
      aiIcons.forEach((icon, i) => {
        if (phase < 1) {
          icon.style.opacity = "0";
          icon.style.transform = "scale(0)";
        } else if (phase === 1) {
          const aiT = easeOut(clamp01((localT - 0.5 - i * 0.1) / 0.3));
          icon.style.opacity = String(aiT * 0.85);
          icon.style.transform = `scale(${aiT})`;
        } else {
          icon.style.opacity = "0.9";
          icon.style.transform = "scale(1)";
        }
      });

      /* ── Flow dots (Operate) ── */
      flowDots.forEach((dot, i) => {
        if (phase < 2) {
          dot.style.opacity = "0";
        } else {
          dot.style.opacity = String(easeOut(clamp01(localT * 2)) * 0.7);
        }
      });

      /* ── Metric pulses (Operate) ── */
      metricPulses.forEach((pulse, i) => {
        if (phase < 2) {
          pulse.style.opacity = "0";
        } else {
          pulse.style.opacity = String(easeOut(clamp01((localT - 0.15 - i * 0.08) / 0.35)) * 0.75);
        }
      });

      /* ── Operate glow ── */
      if (operateGlow) {
        operateGlow.style.opacity = phase === 2 ? String(easeOut(localT) * 0.12) : "0";
      }

      /* ── Scale rings ── */
      scaleRings.forEach((ring, i) => {
        if (phase < 2) {
          ring.style.opacity = "0";
          ring.style.transform = "scale(0.5)";
        } else {
          const scaleT = easeOut(clamp01((localT - 0.3 - i * 0.12) / 0.4));
          ring.style.opacity = String(scaleT * (0.1 - i * 0.025));
          ring.style.transform = `scale(${0.5 + scaleT * 0.5})`;
        }
      });

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [progressRef]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 600 450"
      fill="none"
      className="w-full h-full"
      style={{ background: BG }}
    >
      <defs>
        <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      {/* ── Operate center glow ── */}
      <circle
        className="o-glow"
        cx="300" cy="225" r="100"
        fill={TEAL}
        filter="url(#softGlow)"
        style={{ opacity: 0 }}
      />

      {/* ── Scale expansion rings (Operate) ── */}
      {[150, 190, 230].map((r, i) => (
        <circle
          key={`sc-${i}`}
          className="sc-ring"
          cx="300" cy="225" r={r}
          stroke={TEAL}
          strokeWidth="0.8"
          strokeDasharray="5 8"
          fill="none"
          style={{ opacity: 0, transformOrigin: "300px 225px" }}
        />
      ))}

      {/* ── Hub rings (Build → Operate) ── */}
      {[55, 40, 26].map((r, i) => (
        <circle
          key={`hr-${i}`}
          className="h-ring"
          cx="300" cy="225" r={r}
          stroke={TEAL}
          strokeWidth={i === 2 ? 1.8 : 1}
          strokeDasharray={i === 1 ? "4 3" : "none"}
          fill="none"
          style={{ opacity: 0, transformOrigin: "300px 225px" }}
        />
      ))}

      {/* ── Diagnostic dashed lines (Understand) ── */}
      {DIAG_LINES.map(([a, b], i) => (
        <line
          key={`dl-${i}`}
          className="d-line"
          x1={SCATTERED_NODES[a].x}
          y1={SCATTERED_NODES[a].y}
          x2={SCATTERED_NODES[b].x}
          y2={SCATTERED_NODES[b].y}
          stroke={TEAL}
          strokeWidth="0.8"
          strokeDasharray="4 6"
          style={{ opacity: 0 }}
        />
      ))}

      {/* ── Scan line (Understand) ── */}
      <line
        className="s-line"
        x1="0" y1="0" x2="0" y2="450"
        stroke={TEAL}
        strokeWidth="1.5"
        style={{ opacity: 0 }}
      />
      <ellipse
        className="s-glow"
        cx="0" cy="225" rx="25" ry="200"
        fill={TEAL}
        filter="url(#softGlow)"
        style={{ opacity: 0 }}
      />

      {/* ── Connection lines (Build/Operate) ── */}
      {CONNECTIONS.map(([a, b], i) => (
        <line
          key={`cl-${i}`}
          className="c-line"
          x1={ORGANIZED_NODES[a].x} y1={ORGANIZED_NODES[a].y}
          x2={ORGANIZED_NODES[b].x} y2={ORGANIZED_NODES[b].y}
          stroke={TEAL}
          strokeWidth="1.2"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset="1"
          style={{ opacity: 0 }}
        />
      ))}

      {/* ── Flow dots (Operate — SVG animateMotion) ── */}
      {CONNECTIONS.slice(0, 6).map(([a, b], i) => (
        <g key={`fg-${i}`}>
          <circle className="f-dot" r="2.5" fill={TEAL} filter="url(#nodeGlow)" style={{ opacity: 0 }}>
            <animateMotion
              dur={`${2.5 + (i % 3) * 0.6}s`}
              repeatCount="indefinite"
              path={`M${ORGANIZED_NODES[a].x},${ORGANIZED_NODES[a].y} L${ORGANIZED_NODES[b].x},${ORGANIZED_NODES[b].y}`}
            />
          </circle>
          <circle className="f-dot" r="2" fill={TEAL} style={{ opacity: 0 }}>
            <animateMotion
              dur={`${2.5 + (i % 3) * 0.6}s`}
              repeatCount="indefinite"
              begin={`${1.2 + i * 0.25}s`}
              path={`M${ORGANIZED_NODES[b].x},${ORGANIZED_NODES[b].y} L${ORGANIZED_NODES[a].x},${ORGANIZED_NODES[a].y}`}
            />
          </circle>
        </g>
      ))}

      {/* ── Business process nodes ── */}
      {SCATTERED_NODES.map((sn, i) => (
        <g key={`ng-${i}`} className="n-group" transform={`translate(${sn.x}, ${sn.y})`}>
          <circle className="n-ring" cx="0" cy="0" r="18" stroke={TEAL} strokeWidth="1" fill="none" style={{ opacity: 0.06 }} />
          <circle className="n-core" cx="0" cy="0" r="6" fill={TEAL} style={{ opacity: 0.15 }} />
          <circle cx="0" cy="0" r="2.5" fill={TEAL} opacity="0.7" />
          <text className="n-label" x="0" y="28" textAnchor="middle" fill={TEAL} fontSize="9" fontFamily="system-ui, sans-serif" letterSpacing="0.5" style={{ opacity: 0 }}>
            {sn.label}
          </text>
        </g>
      ))}

      {/* ── AI agent markers (Build → Operate) ── */}
      {AI_POSITIONS.map((pos, i) => (
        <g key={`ai-${i}`} className="a-icon" style={{ opacity: 0, transformOrigin: `${pos.x}px ${pos.y}px` }}>
          <circle cx={pos.x} cy={pos.y} r="14" fill={BG} stroke={TEAL} strokeWidth="1.2" opacity="0.5" />
          {/* Neural network dots */}
          <circle cx={pos.x - 4} cy={pos.y - 3} r="1.8" fill={TEAL} opacity="0.85" />
          <circle cx={pos.x + 4} cy={pos.y - 3} r="1.8" fill={TEAL} opacity="0.85" />
          <circle cx={pos.x} cy={pos.y + 4} r="1.8" fill={TEAL} opacity="0.85" />
          <line x1={pos.x - 4} y1={pos.y - 3} x2={pos.x + 4} y2={pos.y - 3} stroke={TEAL} strokeWidth="0.7" opacity="0.45" />
          <line x1={pos.x - 4} y1={pos.y - 3} x2={pos.x} y2={pos.y + 4} stroke={TEAL} strokeWidth="0.7" opacity="0.45" />
          <line x1={pos.x + 4} y1={pos.y - 3} x2={pos.x} y2={pos.y + 4} stroke={TEAL} strokeWidth="0.7" opacity="0.45" />
          <text x={pos.x} y={pos.y + 25} textAnchor="middle" fill={TEAL} fontSize="7.5" fontFamily="system-ui, sans-serif" letterSpacing="0.8" opacity="0.55">
            AI AGENT
          </text>
        </g>
      ))}

      {/* ── Metric indicators (Operate) ── */}
      {METRIC_POSITIONS.map((pos, i) => (
        <g key={`mp-${i}`} className="m-pulse" style={{ opacity: 0 }}>
          <rect x={pos.x + 24} y={pos.y - 6} width="3" height="5" rx="0.5" fill={TEAL} opacity="0.45" />
          <rect x={pos.x + 29} y={pos.y - 12} width="3" height="11" rx="0.5" fill={TEAL} opacity="0.6" />
          <rect x={pos.x + 34} y={pos.y - 16} width="3" height="15" rx="0.5" fill={TEAL} opacity="0.75" />
          <circle cx={pos.x} cy={pos.y} r="24" stroke={TEAL} strokeWidth="0.5" fill="none" opacity="0.15">
            <animate attributeName="r" values="24;29;24" dur="2.5s" repeatCount="indefinite" begin={`${i * 0.6}s`} />
            <animate attributeName="opacity" values="0.15;0.04;0.15" dur="2.5s" repeatCount="indefinite" begin={`${i * 0.6}s`} />
          </circle>
        </g>
      ))}

      {/* Subtle vignette */}
      <rect x="0" y="0" width="600" height="450" fill="url(#vignette)" pointerEvents="none" />
      <defs>
        <radialGradient id="vignette" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="100%" stopColor={BG} stopOpacity="0.4" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ── Mobile phase icons ── */

function MobilePhaseIcon({ phaseIndex }: { phaseIndex: number }) {
  const icons = [
    // Understand: Scattered nodes being diagnosed
    <svg key="m0" viewBox="0 0 120 120" fill="none" className="w-24 h-24 mx-auto">
      <line x1="38" y1="8" x2="38" y2="112" stroke={TEAL} strokeWidth="1.5" opacity="0.25" />
      <circle cx="25" cy="30" r="7" stroke={TEAL} strokeWidth="0.8" fill="none" opacity="0.3" />
      <circle cx="25" cy="30" r="2.5" fill={TEAL} opacity="0.7" />
      <circle cx="85" cy="28" r="7" stroke={TEAL} strokeWidth="0.8" fill="none" opacity="0.12" />
      <circle cx="85" cy="28" r="2.5" fill={TEAL} opacity="0.25" />
      <circle cx="60" cy="60" r="7" stroke={TEAL} strokeWidth="0.8" fill="none" opacity="0.3" />
      <circle cx="60" cy="60" r="2.5" fill={TEAL} opacity="0.7" />
      <circle cx="30" cy="90" r="7" stroke={TEAL} strokeWidth="0.8" fill="none" opacity="0.3" />
      <circle cx="30" cy="90" r="2.5" fill={TEAL} opacity="0.7" />
      <circle cx="90" cy="88" r="7" stroke={TEAL} strokeWidth="0.8" fill="none" opacity="0.12" />
      <circle cx="90" cy="88" r="2.5" fill={TEAL} opacity="0.25" />
      <line x1="25" y1="30" x2="60" y2="60" stroke={TEAL} strokeWidth="0.6" strokeDasharray="3 4" opacity="0.2" />
      <line x1="30" y1="90" x2="60" y2="60" stroke={TEAL} strokeWidth="0.6" strokeDasharray="3 4" opacity="0.2" />
    </svg>,

    // Build: Organized system with AI agents
    <svg key="m1" viewBox="0 0 120 120" fill="none" className="w-24 h-24 mx-auto">
      <circle cx="60" cy="60" r="26" stroke={TEAL} strokeWidth="0.8" fill="none" opacity="0.2" />
      <circle cx="60" cy="60" r="16" stroke={TEAL} strokeWidth="0.8" strokeDasharray="3 3" fill="none" opacity="0.3" />
      <circle cx="60" cy="60" r="5" fill={TEAL} opacity="0.8" />
      <line x1="25" y1="25" x2="60" y2="60" stroke={TEAL} strokeWidth="1" opacity="0.35" />
      <line x1="95" y1="25" x2="60" y2="60" stroke={TEAL} strokeWidth="1" opacity="0.35" />
      <line x1="25" y1="95" x2="60" y2="60" stroke={TEAL} strokeWidth="1" opacity="0.35" />
      <line x1="95" y1="95" x2="60" y2="60" stroke={TEAL} strokeWidth="1" opacity="0.35" />
      <circle cx="25" cy="25" r="7" stroke={TEAL} strokeWidth="0.8" fill="none" opacity="0.3" />
      <circle cx="25" cy="25" r="2.5" fill={TEAL} opacity="0.65" />
      <circle cx="95" cy="25" r="7" stroke={TEAL} strokeWidth="0.8" fill="none" opacity="0.3" />
      <circle cx="95" cy="25" r="2.5" fill={TEAL} opacity="0.65" />
      <circle cx="25" cy="95" r="7" stroke={TEAL} strokeWidth="0.8" fill="none" opacity="0.3" />
      <circle cx="25" cy="95" r="2.5" fill={TEAL} opacity="0.65" />
      <circle cx="95" cy="95" r="7" stroke={TEAL} strokeWidth="0.8" fill="none" opacity="0.3" />
      <circle cx="95" cy="95" r="2.5" fill={TEAL} opacity="0.65" />
      {/* AI agent */}
      <circle cx="60" cy="40" r="6" fill={BG} stroke={TEAL} strokeWidth="0.8" opacity="0.5" />
      <circle cx="58" cy="38" r="1" fill={TEAL} opacity="0.8" />
      <circle cx="62" cy="38" r="1" fill={TEAL} opacity="0.8" />
      <circle cx="60" cy="42" r="1" fill={TEAL} opacity="0.8" />
    </svg>,

    // Operate: Running system with flow and metrics
    <svg key="m2" viewBox="0 0 120 120" fill="none" className="w-24 h-24 mx-auto">
      <circle cx="60" cy="60" r="18" stroke={TEAL} strokeWidth="1.2" fill="none" opacity="0.3" />
      <circle cx="60" cy="60" r="5" fill={TEAL} opacity="0.85" />
      <circle cx="60" cy="60" r="36" stroke={TEAL} strokeWidth="0.6" strokeDasharray="4 6" fill="none" opacity="0.1" />
      <circle cx="60" cy="60" r="48" stroke={TEAL} strokeWidth="0.4" strokeDasharray="3 8" fill="none" opacity="0.06" />
      <line x1="60" y1="60" x2="22" y2="22" stroke={TEAL} strokeWidth="0.8" opacity="0.3" />
      <line x1="60" y1="60" x2="98" y2="22" stroke={TEAL} strokeWidth="0.8" opacity="0.3" />
      <line x1="60" y1="60" x2="98" y2="98" stroke={TEAL} strokeWidth="0.8" opacity="0.3" />
      <line x1="60" y1="60" x2="22" y2="98" stroke={TEAL} strokeWidth="0.8" opacity="0.3" />
      <circle cx="22" cy="22" r="7" stroke={TEAL} strokeWidth="0.8" fill="none" opacity="0.3" />
      <circle cx="22" cy="22" r="2.5" fill={TEAL} opacity="0.65" />
      <circle cx="98" cy="22" r="7" stroke={TEAL} strokeWidth="0.8" fill="none" opacity="0.3" />
      <circle cx="98" cy="22" r="2.5" fill={TEAL} opacity="0.65" />
      <circle cx="98" cy="98" r="7" stroke={TEAL} strokeWidth="0.8" fill="none" opacity="0.3" />
      <circle cx="98" cy="98" r="2.5" fill={TEAL} opacity="0.65" />
      <circle cx="22" cy="98" r="7" stroke={TEAL} strokeWidth="0.8" fill="none" opacity="0.3" />
      <circle cx="22" cy="98" r="2.5" fill={TEAL} opacity="0.65" />
      {/* Metrics */}
      <rect x="103" y="16" width="2" height="4" rx="0.5" fill={TEAL} opacity="0.45" />
      <rect x="107" y="12" width="2" height="8" rx="0.5" fill={TEAL} opacity="0.6" />
      <rect x="111" y="9" width="2" height="11" rx="0.5" fill={TEAL} opacity="0.75" />
      {/* Flow indicators */}
      <circle cx="40" cy="40" r="1.5" fill={TEAL} opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.15;0.5" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="80" cy="40" r="1.5" fill={TEAL} opacity="0.35">
        <animate attributeName="opacity" values="0.35;0.6;0.35" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="80" cy="80" r="1.5" fill={TEAL} opacity="0.5">
        <animate attributeName="opacity" values="0.5;0.15;0.5" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="40" cy="80" r="1.5" fill={TEAL} opacity="0.35">
        <animate attributeName="opacity" values="0.35;0.7;0.35" dur="1.6s" repeatCount="indefinite" />
      </circle>
    </svg>,
  ];

  return icons[phaseIndex] ?? null;
}

/* ══════════════════════════════════════════════
   Main Component
   ══════════════════════════════════════════════ */

export function TransformationAssembly({ phases }: TransformationAssemblyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef({ value: 0 });

  /* ── GSAP ScrollTrigger with SEQUENTIAL transitions ── */

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      const el = containerRef.current;
      if (!el) return;

      const phaseItems = el.querySelectorAll<HTMLElement>(".ta-phase-item");
      const progressFill = el.querySelector<HTMLElement>(".ta-progress-fill");
      const progressDots = el.querySelectorAll<HTMLElement>(".ta-progress-dot");
      const mobileIcons = el.querySelectorAll<HTMLElement>(".ta-mobile-icon");

      phaseItems.forEach((item, i) => {
        if (i > 0) gsap.set(item, { opacity: 0, y: 24 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=250%",
          pin: true,
          pinSpacing: true,
          scrub: 0.3,
          onUpdate: (self) => {
            progressRef.current.value = self.progress;
          },
        },
      });

      /*
       * Timeline structure — SEQUENTIAL, no overlap:
       *
       * 0.00 – 0.30  Phase 1 holds (Understand visible)
       * 0.30 – 0.38  Phase 1 fades out
       * 0.38 – 0.46  Phase 2 fades in (Build)
       * 0.46 – 0.62  Phase 2 holds
       * 0.62 – 0.70  Phase 2 fades out
       * 0.70 – 0.78  Phase 3 fades in (Operate)
       * 0.78 – 1.00  Phase 3 holds
       */

      // Phase 1 hold
      tl.to({}, { duration: 0.30 });

      // Phase 1 → 2 transition
      tl.to(phaseItems[0], { opacity: 0, y: -16, duration: 0.08, ease: "power2.in" });
      tl.fromTo(phaseItems[1], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.08, ease: "power2.out" });

      // Update progress bar and dots for phase 2
      if (progressFill) {
        tl.to(progressFill, { scaleY: 2 / phases.length, duration: 0.05 }, "<-0.08");
      }
      if (progressDots[1]) {
        tl.to(progressDots[1], { backgroundColor: TEAL, scale: 1.4, duration: 0.05 }, "<");
      }
      if (progressDots[0]) {
        tl.to(progressDots[0], { scale: 1, opacity: 0.5, duration: 0.05 }, "<");
      }
      if (mobileIcons.length > 0) {
        if (mobileIcons[0]) tl.to(mobileIcons[0], { opacity: 0, scale: 0.8, duration: 0.06 }, "<");
        if (mobileIcons[1]) tl.to(mobileIcons[1], { opacity: 1, scale: 1, duration: 0.06 }, "<+=0.04");
      }

      // Phase 2 hold
      tl.to({}, { duration: 0.16 });

      // Phase 2 → 3 transition
      tl.to(phaseItems[1], { opacity: 0, y: -16, duration: 0.08, ease: "power2.in" });
      tl.fromTo(phaseItems[2], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.08, ease: "power2.out" });

      // Update progress bar and dots for phase 3
      if (progressFill) {
        tl.to(progressFill, { scaleY: 1, duration: 0.05 }, "<-0.08");
      }
      if (progressDots[2]) {
        tl.to(progressDots[2], { backgroundColor: TEAL, scale: 1.4, duration: 0.05 }, "<");
      }
      if (progressDots[1]) {
        tl.to(progressDots[1], { scale: 1, opacity: 0.5, duration: 0.05 }, "<");
      }
      if (mobileIcons.length > 0) {
        if (mobileIcons[1]) tl.to(mobileIcons[1], { opacity: 0, scale: 0.8, duration: 0.06 }, "<");
        if (mobileIcons[2]) tl.to(mobileIcons[2], { opacity: 1, scale: 1, duration: 0.06 }, "<+=0.04");
      }

      // Phase 3 hold
      tl.to({}, { duration: 0.22 });
    },
    { scope: containerRef, dependencies: [phases] }
  );

  return (
    <div ref={containerRef} className="bg-bg-deep">
      <div className="relative min-h-[100vh] flex items-center">
        <div className="w-full mx-auto max-w-7xl px-6 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-12 items-center">

          {/* ── Left column: phase text + progress indicator ── */}
          <div className="lg:col-span-5 relative flex">

            {/* Vertical progress track */}
            <div className="hidden lg:flex flex-col items-center mr-8 relative h-[240px] self-center">
              <div className="relative w-0.5 h-full bg-border-subtle/30 rounded-full overflow-hidden">
                <div
                  className="ta-progress-fill absolute top-0 left-0 w-full rounded-full origin-top"
                  style={{
                    height: "100%",
                    transform: `scaleY(${1 / phases.length})`,
                    background: `linear-gradient(to bottom, ${TEAL}, #059E87)`,
                  }}
                />
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col justify-between h-full">
                {phases.map((_, i) => (
                  <div
                    key={i}
                    className="ta-progress-dot w-3 h-3 rounded-full border-2 transition-colors"
                    style={{
                      borderColor: i === 0 ? TEAL : "rgba(0, 229, 195, 0.3)",
                      backgroundColor: i === 0 ? TEAL : "transparent",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Phase text */}
            <div className="relative flex-1 min-h-[280px] flex items-center">
              {phases.map((phase, i) => (
                <div
                  key={phase.num}
                  className={`ta-phase-item ${i === 0 ? "relative" : "absolute inset-0"} flex items-center`}
                >
                  <div className="max-w-lg">
                    <span
                      className="metric block text-5xl lg:text-6xl font-bold leading-none"
                      style={{ color: TEAL, opacity: 0.2 }}
                    >
                      {phase.num}
                    </span>
                    <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-accent">
                      {phase.subtitle}
                    </p>
                    <h3
                      className="mt-3 text-2xl lg:text-3xl font-bold text-text-primary tracking-tight"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {phase.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-text-secondary">
                      {phase.description}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {phase.details.map((d, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-text-muted">
                          <svg className="mt-1 h-3.5 w-3.5 shrink-0 text-accent" viewBox="0 0 16 16" fill="none">
                            <path d="M2 8h12M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column: SVG Visual (desktop) / Static icons (mobile) ── */}
          <div className="lg:col-span-7 mt-10 lg:mt-0">

            {/* Desktop: SVG with ref-driven animation */}
            <div
              className="hidden lg:block relative w-full rounded-lg overflow-hidden"
              style={{ aspectRatio: "4 / 3" }}
            >
              <DesktopVisual progressRef={progressRef} />
            </div>

            {/* Mobile: static SVG icons */}
            <div className="lg:hidden relative w-full flex justify-center" style={{ minHeight: 120 }}>
              {phases.map((_, i) => (
                <div
                  key={i}
                  className={`ta-mobile-icon ${i === 0 ? "" : "absolute inset-0 flex justify-center"}`}
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  <MobilePhaseIcon phaseIndex={i} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
