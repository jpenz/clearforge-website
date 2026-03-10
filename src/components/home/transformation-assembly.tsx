"use client";

import { useRef, useEffect, useCallback } from "react";
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
const PARTICLE_COUNT = 60;

/* ── Particle state targets for each phase ── */

interface ParticleState {
  x: number;
  y: number;
  r: number;
  opacity: number;
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Generate three target states (Understand → Build → Operate). */
function generateParticleStates(
  count: number,
  w: number,
  h: number
): ParticleState[][] {
  const states: ParticleState[][] = [[], [], []];
  const cx = w * 0.5;
  const cy = h * 0.5;

  // Cluster centers for Understand phase (loose business areas being diagnosed)
  const clusters = [
    { x: w * 0.2, y: h * 0.25 },
    { x: w * 0.7, y: h * 0.2 },
    { x: w * 0.3, y: h * 0.75 },
    { x: w * 0.8, y: h * 0.72 },
  ];

  // Satellite positions for Operate phase
  const sats = [
    { x: w * 0.14, y: h * 0.14 },
    { x: w * 0.86, y: h * 0.14 },
    { x: w * 0.86, y: h * 0.86 },
    { x: w * 0.14, y: h * 0.86 },
  ];

  for (let i = 0; i < count; i++) {
    const s = seededRandom(i + 1);
    const s2 = seededRandom(i + 100);
    const s3 = seededRandom(i + 200);
    const s4 = seededRandom(i + 300);

    // ── UNDERSTAND: Loose clusters being mapped ──
    const cIdx = i % 4;
    const cl = clusters[cIdx];
    const spread = 35 + s * 55;
    const a0 = s2 * Math.PI * 2;
    const bright = s3 > 0.65;
    states[0].push({
      x: cl.x + Math.cos(a0) * spread * s3,
      y: cl.y + Math.sin(a0) * spread * s4,
      r: 2 + s * 2,
      opacity: bright ? 0.65 + s4 * 0.35 : 0.12 + s4 * 0.2,
    });

    // ── BUILD: Organized hub-and-spoke network ──
    const isCore = i < 10;
    const isPathway = i >= 10 && i < 34;

    if (isCore) {
      const ring = i < 3 ? 0 : i < 7 ? 1 : 2;
      const rR = ring === 0 ? 0 : ring === 1 ? 20 : 40;
      const rA =
        (i / (ring === 0 ? 3 : ring === 1 ? 4 : 3)) * Math.PI * 2 + s * 0.4;
      states[1].push({
        x: cx + (rR > 0 ? Math.cos(rA) * rR : (s - 0.5) * 6),
        y: cy + (rR > 0 ? Math.sin(rA) * rR : (s2 - 0.5) * 6),
        r: ring === 0 ? 3.5 : ring === 1 ? 2.5 : 2,
        opacity: ring === 0 ? 0.9 : 0.6,
      });
    } else if (isPathway) {
      const pIdx = (i - 10) % 6;
      const pPos = Math.floor((i - 10) / 6);
      const endpoints = [
        { x: w * 0.04, y: h * 0.22 },
        { x: w * 0.04, y: h * 0.78 },
        { x: w * 0.96, y: h * 0.18 },
        { x: w * 0.96, y: h * 0.82 },
        { x: w * 0.5, y: h * 0.04 },
        { x: w * 0.5, y: h * 0.96 },
      ];
      const ep = endpoints[pIdx];
      const t = 0.15 + (pPos / 4) * 0.72;
      states[1].push({
        x: ep.x + (cx - ep.x) * t,
        y: ep.y + (cy - ep.y) * t,
        r: 2 + t * 1.5,
        opacity: 0.25 + t * 0.45,
      });
    } else {
      const oAngle = ((i - 34) / (count - 34)) * Math.PI * 2;
      const oR = 58 + s * 22;
      states[1].push({
        x: cx + Math.cos(oAngle) * oR,
        y: cy + Math.sin(oAngle) * oR,
        r: 1.5 + s3,
        opacity: 0.18 + s4 * 0.18,
      });
    }

    // ── OPERATE: Running machine with satellites ──
    const isCoreOp = i < 8;
    const isFlow = i >= 8 && i < 28;
    const isSat = i >= 28 && i < 44;

    if (isCoreOp) {
      const cA = (i / 8) * Math.PI * 2;
      const cR = i < 3 ? 0 : i < 6 ? 14 : 26;
      states[2].push({
        x: cx + (cR > 0 ? Math.cos(cA) * cR : (s - 0.5) * 5),
        y: cy + (cR > 0 ? Math.sin(cA) * cR : (s2 - 0.5) * 5),
        r: cR === 0 ? 4 : 2.5,
        opacity: 0.95,
      });
    } else if (isFlow) {
      const fSat = (i - 8) % 4;
      const sat = sats[fSat];
      const fT = ((i - 8) / 20) * 0.78 + 0.11;
      states[2].push({
        x: cx + (sat.x - cx) * fT,
        y: cy + (sat.y - cy) * fT,
        r: 2,
        opacity: 0.35 + (1 - Math.abs(fT - 0.5) * 2) * 0.4,
      });
    } else if (isSat) {
      const sIdx = (i - 28) % 4;
      const sI = Math.floor((i - 28) / 4);
      const sat = sats[sIdx];
      const sA = (sI / 4) * Math.PI * 2;
      const sR = 8 + (sI % 2) * 11;
      states[2].push({
        x: sat.x + Math.cos(sA) * sR,
        y: sat.y + Math.sin(sA) * sR,
        r: 2,
        opacity: 0.55 + s3 * 0.25,
      });
    } else {
      // Feedback ring + expansion
      const eA = ((i - 44) / (count - 44)) * Math.PI * 2;
      const isRing = i % 2 === 0;
      const eR = isRing ? 44 : 82 + s * 30;
      states[2].push({
        x: cx + Math.cos(eA) * eR,
        y: cy + Math.sin(eA) * eR,
        r: isRing ? 1.5 : 2,
        opacity: isRing ? 0.45 : 0.2 + s3 * 0.2,
      });
    }
  }

  return states;
}

/* ── Mobile static SVG icons per phase ── */

function MobilePhaseIcon({ phaseIndex }: { phaseIndex: number }) {
  const icons = [
    // Understand: Scattered clusters being scanned
    <svg key="m0" viewBox="0 0 120 120" fill="none" className="w-20 h-20 mx-auto">
      <rect x="38" y="8" width="2" height="104" fill={TEAL} opacity={0.35} rx={1} />
      {/* Cluster 1 */}
      <circle cx="18" cy="28" r="4" fill={TEAL} opacity={0.8} />
      <circle cx="26" cy="22" r="3" fill={TEAL} opacity={0.5} />
      <circle cx="14" cy="36" r="2.5" fill={TEAL} opacity={0.4} />
      {/* Cluster 2 */}
      <circle cx="80" cy="30" r="3.5" fill={TEAL} opacity={0.7} />
      <circle cx="90" cy="25" r="3" fill={TEAL} opacity={0.4} />
      {/* Cluster 3 */}
      <circle cx="25" cy="85" r="3.5" fill={TEAL} opacity={0.6} />
      <circle cx="18" cy="78" r="2.5" fill={TEAL} opacity={0.35} />
      {/* Cluster 4 */}
      <circle cx="85" cy="80" r="3" fill={TEAL} opacity={0.5} />
      <circle cx="78" cy="88" r="2.5" fill={TEAL} opacity={0.3} />
      {/* Dim unscanned */}
      <circle cx="60" cy="55" r="2" fill={TEAL} opacity={0.12} />
      <circle cx="100" cy="60" r="2" fill={TEAL} opacity={0.1} />
    </svg>,

    // Build: Hub with pathways
    <svg key="m1" viewBox="0 0 120 120" fill="none" className="w-20 h-20 mx-auto">
      {/* Central hub */}
      <circle cx="60" cy="60" r="30" fill="none" stroke={TEAL} strokeWidth={1.5} opacity={0.25} />
      <circle cx="60" cy="60" r="18" fill="none" stroke={TEAL} strokeWidth={1.5} opacity={0.4} strokeDasharray="4 3" />
      <circle cx="60" cy="60" r="3.5" fill={TEAL} opacity={0.9} />
      {/* Pathways */}
      <line x1="8" y1="25" x2="42" y2="48" stroke={TEAL} strokeWidth={1} opacity={0.4} />
      <line x1="8" y1="95" x2="42" y2="72" stroke={TEAL} strokeWidth={1} opacity={0.4} />
      <line x1="112" y1="20" x2="78" y2="46" stroke={TEAL} strokeWidth={1} opacity={0.4} />
      <line x1="112" y1="100" x2="78" y2="74" stroke={TEAL} strokeWidth={1} opacity={0.4} />
      <line x1="60" y1="6" x2="60" y2="30" stroke={TEAL} strokeWidth={1} opacity={0.4} />
      <line x1="60" y1="114" x2="60" y2="90" stroke={TEAL} strokeWidth={1} opacity={0.4} />
      {/* Pathway dots */}
      <circle cx="25" cy="36" r="2.5" fill={TEAL} opacity={0.5} />
      <circle cx="25" cy="84" r="2.5" fill={TEAL} opacity={0.5} />
      <circle cx="95" cy="33" r="2.5" fill={TEAL} opacity={0.5} />
      <circle cx="95" cy="87" r="2.5" fill={TEAL} opacity={0.5} />
      <circle cx="60" cy="18" r="2.5" fill={TEAL} opacity={0.5} />
      <circle cx="60" cy="102" r="2.5" fill={TEAL} opacity={0.5} />
    </svg>,

    // Operate: Running machine with satellites
    <svg key="m2" viewBox="0 0 120 120" fill="none" className="w-20 h-20 mx-auto">
      {/* Hub */}
      <circle cx="60" cy="60" r="18" fill="none" stroke={TEAL} strokeWidth={2} opacity={0.5} />
      <circle cx="60" cy="60" r="4" fill={TEAL} opacity={0.95} />
      {/* Feedback ring */}
      <circle cx="60" cy="60" r="32" fill="none" stroke={TEAL} strokeWidth={1} opacity={0.2} strokeDasharray="3 5" />
      {/* Satellites + connections */}
      <line x1="60" y1="60" x2="18" y2="18" stroke={TEAL} strokeWidth={1} opacity={0.3} />
      <line x1="60" y1="60" x2="102" y2="18" stroke={TEAL} strokeWidth={1} opacity={0.3} />
      <line x1="60" y1="60" x2="102" y2="102" stroke={TEAL} strokeWidth={1} opacity={0.3} />
      <line x1="60" y1="60" x2="18" y2="102" stroke={TEAL} strokeWidth={1} opacity={0.3} />
      <circle cx="18" cy="18" r="7" fill="none" stroke={TEAL} strokeWidth={1.5} opacity={0.5} />
      <circle cx="18" cy="18" r="2.5" fill={TEAL} opacity={0.7} />
      <circle cx="102" cy="18" r="7" fill="none" stroke={TEAL} strokeWidth={1.5} opacity={0.5} />
      <circle cx="102" cy="18" r="2.5" fill={TEAL} opacity={0.7} />
      <circle cx="102" cy="102" r="7" fill="none" stroke={TEAL} strokeWidth={1.5} opacity={0.5} />
      <circle cx="102" cy="102" r="2.5" fill={TEAL} opacity={0.7} />
      <circle cx="18" cy="102" r="7" fill="none" stroke={TEAL} strokeWidth={1.5} opacity={0.5} />
      <circle cx="18" cy="102" r="2.5" fill={TEAL} opacity={0.7} />
      {/* Flow dots */}
      <circle cx="38" cy="38" r="2" fill={TEAL} opacity={0.6} />
      <circle cx="82" cy="38" r="2" fill={TEAL} opacity={0.6} />
      <circle cx="82" cy="82" r="2" fill={TEAL} opacity={0.6} />
      <circle cx="38" cy="82" r="2" fill={TEAL} opacity={0.6} />
    </svg>,
  ];

  return icons[phaseIndex] ?? null;
}

/* ── Main Component ── */

export function TransformationAssembly({ phases }: TransformationAssemblyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef({ value: 0 });
  const animFrameRef = useRef<number>(0);
  const particleStatesRef = useRef<ParticleState[][] | null>(null);
  const dimensionsRef = useRef({ w: 0, h: 0 });

  const rebuildStates = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = rect.width;
    const h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    dimensionsRef.current = { w, h };
    particleStatesRef.current = generateParticleStates(PARTICLE_COUNT, w, h);
  }, []);

  /* ── Canvas draw loop ── */

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const allStates = particleStatesRef.current;
    if (!allStates) return;

    const { w, h } = dimensionsRef.current;
    const dpr = canvas.width / w;
    const progress = progressRef.current.value;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const cx = w * 0.5;
    const cy = h * 0.5;

    // Determine interpolation between 3 phases (0..2)
    const totalPhases = 3;
    const phaseFloat = progress * (totalPhases - 1);
    const phaseA = Math.min(Math.floor(phaseFloat), totalPhases - 2);
    const phaseB = phaseA + 1;
    const t = phaseFloat - phaseA;

    const statesA = allStates[phaseA];
    const statesB = allStates[phaseB];

    // ── Background elements per phase ──

    // Understand: Blueprint grid + scan line
    const gridOpacity = Math.max(0, 0.07 - progress * 0.06);
    if (gridOpacity > 0.004) {
      ctx.strokeStyle = `rgba(0, 229, 195, ${gridOpacity})`;
      ctx.lineWidth = 0.5;
      const spacing = 40;
      ctx.beginPath();
      for (let x = 0; x < w; x += spacing) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
      }
      for (let y = 0; y < h; y += spacing) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();
    }

    // Scan line (Understand phase)
    if (progress < 0.4) {
      const scanP = Math.min(progress / 0.35, 1);
      const scanX = scanP * w;
      const grad = ctx.createLinearGradient(scanX - 8, 0, scanX + 8, 0);
      grad.addColorStop(0, "rgba(0, 229, 195, 0)");
      grad.addColorStop(0.5, `rgba(0, 229, 195, ${0.35 * (1 - scanP)})`);
      grad.addColorStop(1, "rgba(0, 229, 195, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(scanX - 10, 0, 20, h);

      ctx.strokeStyle = `rgba(0, 229, 195, ${0.5 * (1 - scanP)})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(scanX, 0);
      ctx.lineTo(scanX, h);
      ctx.stroke();
    }

    // Cluster highlight rings (Understand → fade into Build)
    if (progress < 0.6) {
      const clusterOp = progress < 0.15
        ? progress / 0.15
        : progress > 0.4
          ? 1 - (progress - 0.4) / 0.2
          : 1;
      if (clusterOp > 0) {
        const cls = [
          { x: w * 0.2, y: h * 0.25 },
          { x: w * 0.7, y: h * 0.2 },
          { x: w * 0.3, y: h * 0.75 },
          { x: w * 0.8, y: h * 0.72 },
        ];
        cls.forEach((c) => {
          ctx.strokeStyle = `rgba(0, 229, 195, ${0.15 * clusterOp})`;
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 4]);
          ctx.beginPath();
          ctx.arc(c.x, c.y, 50, 0, Math.PI * 2);
          ctx.stroke();
        });
        ctx.setLineDash([]);
      }
    }

    // Build: Hub rings + pathway lines
    if (progress > 0.25 && progress < 0.85) {
      const hubOp = progress < 0.4
        ? (progress - 0.25) / 0.15
        : progress > 0.7
          ? 1 - (progress - 0.7) / 0.15
          : 1;
      if (hubOp > 0) {
        // Concentric hub rings
        [42, 28, 14].forEach((r, ri) => {
          ctx.strokeStyle = `rgba(0, 229, 195, ${(0.2 - ri * 0.04) * hubOp})`;
          ctx.lineWidth = ri === 2 ? 2 : 1.5;
          if (ri === 1) ctx.setLineDash([4, 3]);
          else ctx.setLineDash([]);
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.stroke();
        });
        ctx.setLineDash([]);

        // Hub core glow
        const glowG = ctx.createRadialGradient(cx, cy, 0, cx, cy, 50);
        glowG.addColorStop(0, `rgba(0, 229, 195, ${0.08 * hubOp})`);
        glowG.addColorStop(1, "rgba(0, 229, 195, 0)");
        ctx.fillStyle = glowG;
        ctx.beginPath();
        ctx.arc(cx, cy, 50, 0, Math.PI * 2);
        ctx.fill();

        // Hub core dot
        ctx.fillStyle = `rgba(0, 229, 195, ${0.9 * hubOp})`;
        ctx.beginPath();
        ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.fill();

        // Pathway lines from edges to center
        const eps = [
          { x: w * 0.04, y: h * 0.22 },
          { x: w * 0.04, y: h * 0.78 },
          { x: w * 0.96, y: h * 0.18 },
          { x: w * 0.96, y: h * 0.82 },
          { x: w * 0.5, y: h * 0.04 },
          { x: w * 0.5, y: h * 0.96 },
        ];
        eps.forEach((ep) => {
          ctx.strokeStyle = `rgba(0, 229, 195, ${0.12 * hubOp})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(ep.x, ep.y);
          ctx.lineTo(cx, cy);
          ctx.stroke();
        });
      }
    }

    // Operate: Satellites + energy flow + feedback ring
    if (progress > 0.6) {
      const opOp = (progress - 0.6) / 0.4;

      // Feedback ring
      ctx.strokeStyle = `rgba(0, 229, 195, ${0.15 * opOp})`;
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 5]);
      ctx.beginPath();
      ctx.arc(cx, cy, 44, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Expansion rings
      ctx.strokeStyle = `rgba(0, 229, 195, ${0.06 * opOp})`;
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.arc(cx, cy, Math.min(w, h) * 0.35, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Satellite connections and nodes
      const sats = [
        { x: w * 0.14, y: h * 0.14 },
        { x: w * 0.86, y: h * 0.14 },
        { x: w * 0.86, y: h * 0.86 },
        { x: w * 0.14, y: h * 0.86 },
      ];

      sats.forEach((sat) => {
        // Connection line
        ctx.strokeStyle = `rgba(0, 229, 195, ${0.2 * opOp})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(sat.x, sat.y);
        ctx.stroke();

        // Satellite ring
        ctx.strokeStyle = `rgba(0, 229, 195, ${0.4 * opOp})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(sat.x, sat.y, 14, 0, Math.PI * 2);
        ctx.stroke();

        // Satellite core
        ctx.fillStyle = `rgba(0, 229, 195, ${0.7 * opOp})`;
        ctx.beginPath();
        ctx.arc(sat.x, sat.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Animated energy flow dots
      const time = Date.now() * 0.001;
      sats.forEach((sat, si) => {
        const frac = ((time * 0.6 + si * 0.5) % 1.5) / 1.5;
        const fx = cx + (sat.x - cx) * frac;
        const fy = cy + (sat.y - cy) * frac;
        const fOp = (0.8 - frac * 0.5) * opOp;
        ctx.fillStyle = `rgba(0, 229, 195, ${fOp})`;
        ctx.beginPath();
        ctx.arc(fx, fy, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Second dot staggered
        const frac2 = ((time * 0.6 + si * 0.5 + 0.75) % 1.5) / 1.5;
        const fx2 = cx + (sat.x - cx) * frac2;
        const fy2 = cy + (sat.y - cy) * frac2;
        ctx.fillStyle = `rgba(0, 229, 195, ${(0.6 - frac2 * 0.4) * opOp})`;
        ctx.beginPath();
        ctx.arc(fx2, fy2, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Hub glow intensifies
      const hubGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 55);
      hubGlow.addColorStop(0, `rgba(0, 229, 195, ${0.12 * opOp})`);
      hubGlow.addColorStop(1, "rgba(0, 229, 195, 0)");
      ctx.fillStyle = hubGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, 55, 0, Math.PI * 2);
      ctx.fill();

      // Hub core (stays visible through Operate)
      ctx.fillStyle = `rgba(0, 229, 195, ${0.95 * opOp})`;
      ctx.beginPath();
      ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // ── Draw particles ──
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const a = statesA[i];
      const b = statesB[i];
      if (!a || !b) continue;

      const eased = t * t * (3 - 2 * t); // smoothstep

      const px = lerp(a.x, b.x, eased);
      const py = lerp(a.y, b.y, eased);
      const pr = lerp(a.r, b.r, eased);
      const po = lerp(a.opacity, b.opacity, eased);

      // Glow
      const glowR = pr * 3;
      const glow = ctx.createRadialGradient(px, py, 0, px, py, glowR);
      glow.addColorStop(0, `rgba(0, 229, 195, ${po * 0.25})`);
      glow.addColorStop(1, "rgba(0, 229, 195, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(px, py, glowR, 0, Math.PI * 2);
      ctx.fill();

      // Core dot
      ctx.fillStyle = `rgba(0, 229, 195, ${po})`;
      ctx.beginPath();
      ctx.arc(px, py, pr, 0, Math.PI * 2);
      ctx.fill();
    }

    animFrameRef.current = requestAnimationFrame(draw);
  }, []);

  /* ── Resize ── */

  useEffect(() => {
    const handleResize = () => rebuildStates();

    const mql = window.matchMedia("(min-width: 1024px)");
    if (mql.matches) {
      rebuildStates();
      animFrameRef.current = requestAnimationFrame(draw);
    }

    const onMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        rebuildStates();
        animFrameRef.current = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(animFrameRef.current);
      }
    };

    window.addEventListener("resize", handleResize);
    mql.addEventListener("change", onMediaChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      mql.removeEventListener("change", onMediaChange);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [rebuildStates, draw]);

  /* ── GSAP ScrollTrigger ── */

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
          scrub: 0.5,
          onUpdate: (self) => {
            progressRef.current.value = self.progress;
          },
        },
      });

      for (let i = 1; i < phases.length; i++) {
        const label = `phase${i}`;

        tl.to(
          phaseItems[i - 1],
          { opacity: 0, y: -20, duration: 0.2, ease: "power2.in" },
          label
        );

        tl.fromTo(
          phaseItems[i],
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" },
          `${label}+=0.05`
        );

        if (progressFill) {
          tl.to(
            progressFill,
            {
              scaleY: (i + 1) / phases.length,
              duration: 0.2,
              ease: "power2.out",
            },
            label
          );
        }

        if (progressDots[i]) {
          tl.to(
            progressDots[i],
            { backgroundColor: TEAL, scale: 1.4, duration: 0.15 },
            label
          );
        }
        if (progressDots[i - 1] && i > 0) {
          tl.to(
            progressDots[i - 1],
            { scale: 1, opacity: 0.5, duration: 0.15 },
            label
          );
        }

        if (mobileIcons.length > 0) {
          if (mobileIcons[i - 1]) {
            tl.to(
              mobileIcons[i - 1],
              { opacity: 0, scale: 0.8, duration: 0.15 },
              label
            );
          }
          if (mobileIcons[i]) {
            tl.to(
              mobileIcons[i],
              { opacity: 1, scale: 1, duration: 0.2 },
              `${label}+=0.05`
            );
          }
        }

        if (i < phases.length - 1) {
          tl.to({}, { duration: 0.4 });
        }
      }

      tl.to({}, { duration: 0.3 });
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

          {/* ── Right column: Canvas (desktop) / Static icons (mobile) ── */}
          <div className="lg:col-span-7 mt-10 lg:mt-0">

            {/* Desktop canvas */}
            <div
              className="hidden lg:block relative w-full rounded-lg overflow-hidden"
              style={{ aspectRatio: "4 / 3", backgroundColor: BG }}
            >
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ display: "block" }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at center, transparent 40%, ${BG} 100%)`,
                  opacity: 0.5,
                }}
              />
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
