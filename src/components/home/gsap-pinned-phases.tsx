'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Phase {
  num: string;
  title: string;
  description: string;
}

interface GSAPPinnedPhasesProps {
  phases: Phase[];
}

export function GSAPPinnedPhases({ phases }: GSAPPinnedPhasesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined') return;
      const el = containerRef.current;
      if (!el) return;

      const items = el.querySelectorAll<HTMLElement>('.phase-item');
      const progressFill = el.querySelector<HTMLElement>('.progress-fill');
      const progressDots = el.querySelectorAll<HTMLElement>('.progress-dot');
      const phaseIcons = el.querySelectorAll<SVGElement>('.phase-icon');
      if (!items.length) return;

      items.forEach((item, i) => {
        if (i > 0) gsap.set(item, { opacity: 0, y: 30 });
      });
      gsap.set(phaseIcons, { opacity: 0, scale: 0.5 });
      if (phaseIcons[0]) gsap.set(phaseIcons[0], { opacity: 1, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 15%',
          end: `+=${phases.length * 60}%`,
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
        },
      });

      items.forEach((item, i) => {
        if (i > 0) {
          tl.to(items[i - 1], { opacity: 0, y: -20, duration: 0.3 }, `phase${i}`);
          tl.fromTo(item, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3 }, `phase${i}`);
          if (progressFill) {
            tl.to(
              progressFill,
              { scaleY: (i + 1) / phases.length, duration: 0.3, ease: 'power2.out' },
              `phase${i}`,
            );
          }
          if (progressDots[i]) {
            tl.to(
              progressDots[i],
              { backgroundColor: '#059E87', scale: 1.3, duration: 0.2 },
              `phase${i}`,
            );
          }
          if (phaseIcons[i - 1]) {
            tl.to(phaseIcons[i - 1], { opacity: 0, scale: 0.5, duration: 0.2 }, `phase${i}`);
          }
          if (phaseIcons[i]) {
            tl.to(
              phaseIcons[i],
              { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' },
              `phase${i}`,
            );
          }
        }
        if (i < items.length - 1) {
          tl.to({}, { duration: 0.4 });
        }
      });
    },
    { scope: containerRef, dependencies: [phases] },
  );

  /* ─────────────────────────────────────────────────
     UNIFIED VISUAL SYSTEM: "The Signal Path"

     Same ~16 dots in 4 progressive states:
     scattered → organized → assembled → scaled

     Visual vocabulary:
     • 3px dots = data points
     • 5px dots = key nodes
     • 8px dots = system hubs
     • 1px lines = connections
     • 2px lines = active flows
     • Monospace labels
  ───────────────────────────────────────────────── */

  // Shared dot positions (scattered state)
  // These same conceptual elements appear in every icon
  const phaseIcons = [
    /* ── 01 PREPARE: Map the landscape ──
       Scattered dots. A scan line sweeps left-to-right,
       revealing which signals matter. Discovery phase.
    */
    <svg
      key="p0"
      className="phase-icon absolute inset-0"
      viewBox="0 0 220 220"
      fill="none"
      aria-hidden
    >
      {/* Scan line — vertical bar sweeping across */}
      <rect x="62" y="15" width="3" height="190" fill="url(#scanGrad)" rx="1.5" />
      <rect x="58" y="15" width="10" height="190" fill="rgba(5,158,135,0.06)" rx="4" />

      {/* Already scanned (left of line) — bright, tagged */}
      <circle cx="30" cy="45" r="7" fill="#059E87" opacity="0.9" />
      <line x1="38" y1="45" x2="52" y2="45" stroke="#059E87" strokeWidth="1.5" opacity="0.6" />
      <text
        x="55"
        y="48"
        fill="#059E87"
        fontSize="8"
        fontFamily="monospace"
        fontWeight="600"
        opacity="0.8"
      >
        REV
      </text>

      <circle cx="45" cy="95" r="5.5" fill="#059E87" opacity="0.8" />
      <line x1="51" y1="95" x2="58" y2="88" stroke="#059E87" strokeWidth="1.5" opacity="0.5" />

      <circle cx="25" cy="140" r="7" fill="#059E87" opacity="0.9" />
      <line x1="33" y1="140" x2="48" y2="140" stroke="#059E87" strokeWidth="1.5" opacity="0.6" />
      <text
        x="51"
        y="143"
        fill="#059E87"
        fontSize="8"
        fontFamily="monospace"
        fontWeight="600"
        opacity="0.8"
      >
        OPS
      </text>

      <circle cx="50" cy="175" r="5" fill="#059E87" opacity="0.7" />
      <circle cx="35" cy="70" r="4.5" fill="#059E87" opacity="0.65" />

      {/* Not yet scanned (right of line) — dim, waiting */}
      <circle cx="100" cy="38" r="5" fill="rgba(5,158,135,0.3)" />
      <circle cx="140" cy="65" r="5.5" fill="rgba(5,158,135,0.25)" />
      <circle cx="175" cy="42" r="4.5" fill="rgba(5,158,135,0.2)" />
      <circle cx="120" cy="110" r="5" fill="rgba(5,158,135,0.28)" />
      <circle cx="160" cy="130" r="5.5" fill="rgba(5,158,135,0.25)" />
      <circle cx="190" cy="95" r="4.5" fill="rgba(5,158,135,0.2)" />
      <circle cx="145" cy="170" r="5" fill="rgba(5,158,135,0.25)" />
      <circle cx="180" cy="155" r="4.5" fill="rgba(5,158,135,0.2)" />
      <circle cx="110" cy="155" r="4.5" fill="rgba(5,158,135,0.28)" />
      <circle cx="195" cy="175" r="4" fill="rgba(5,158,135,0.18)" />
      <circle cx="85" cy="140" r="4" fill="rgba(5,158,135,0.3)" />

      {/* Progress bar at bottom */}
      <rect x="15" y="207" width="190" height="4" rx="2" fill="rgba(5,158,135,0.15)" />
      <rect x="15" y="207" width="52" height="4" rx="2" fill="#059E87" opacity="0.8" />
      <text
        x="15"
        y="203"
        fill="#059E87"
        fontSize="7"
        fontFamily="monospace"
        fontWeight="600"
        opacity="0.6"
      >
        SCANNING
      </text>

      <defs>
        <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059E87" stopOpacity="0" />
          <stop offset="20%" stopColor="#059E87" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#059E87" stopOpacity="1" />
          <stop offset="80%" stopColor="#059E87" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#059E87" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>,

    /* ── 02 MODERNIZE: Organize the flows ──
       The scattered dots now slide into 4 clean rows.
       Old tangled connections fade. New parallel channels form.
    */
    <svg
      key="p1"
      className="phase-icon absolute inset-0"
      viewBox="0 0 220 220"
      fill="none"
      aria-hidden
    >
      {/* Ghost traces — where dots used to be (old positions) */}
      <circle cx="30" cy="45" r="3" fill="rgba(5,158,135,0.12)" />
      <circle cx="175" cy="42" r="3" fill="rgba(5,158,135,0.1)" />
      <circle cx="50" cy="175" r="3" fill="rgba(5,158,135,0.1)" />
      <path
        d="M 30,45 Q 80,60 100,38 Q 130,20 175,42"
        fill="none"
        stroke="rgba(5,158,135,0.1)"
        strokeWidth="1"
        strokeDasharray="3 4"
      />
      <path
        d="M 45,95 Q 90,120 120,110 Q 150,100 190,95"
        fill="none"
        stroke="rgba(5,158,135,0.1)"
        strokeWidth="1"
        strokeDasharray="3 4"
      />

      {/* Row labels */}
      <text
        x="10"
        y="55"
        fill="#059E87"
        fontSize="8"
        fontFamily="monospace"
        fontWeight="600"
        opacity="0.6"
      >
        01
      </text>
      <text
        x="10"
        y="95"
        fill="#059E87"
        fontSize="8"
        fontFamily="monospace"
        fontWeight="600"
        opacity="0.6"
      >
        02
      </text>
      <text
        x="10"
        y="135"
        fill="#059E87"
        fontSize="8"
        fontFamily="monospace"
        fontWeight="600"
        opacity="0.6"
      >
        03
      </text>
      <text
        x="10"
        y="175"
        fill="#059E87"
        fontSize="8"
        fontFamily="monospace"
        fontWeight="600"
        opacity="0.6"
      >
        04
      </text>

      {/* Row 1 — Revenue (highlighted as optimized) */}
      <line x1="30" y1="52" x2="200" y2="52" stroke="#059E87" strokeWidth="2" opacity="0.6" />
      <circle cx="45" cy="52" r="7" fill="#059E87" opacity="0.9" />
      <circle cx="90" cy="52" r="5.5" fill="#059E87" opacity="0.8" />
      <circle cx="135" cy="52" r="6" fill="#059E87" opacity="0.85" />
      <circle cx="180" cy="52" r="5.5" fill="#059E87" opacity="0.8" />

      {/* Row 2 — Ops */}
      <line x1="30" y1="92" x2="200" y2="92" stroke="#059E87" strokeWidth="2" opacity="0.5" />
      <circle cx="50" cy="92" r="5.5" fill="#059E87" opacity="0.65" />
      <circle cx="100" cy="92" r="5" fill="#059E87" opacity="0.6" />
      <circle cx="150" cy="92" r="5.5" fill="#059E87" opacity="0.65" />
      <circle cx="190" cy="92" r="4.5" fill="#059E87" opacity="0.55" />

      {/* Row 3 — Data */}
      <line x1="30" y1="132" x2="200" y2="132" stroke="#059E87" strokeWidth="2" opacity="0.45" />
      <circle cx="40" cy="132" r="5" fill="#059E87" opacity="0.6" />
      <circle cx="85" cy="132" r="5.5" fill="#059E87" opacity="0.65" />
      <circle cx="140" cy="132" r="5" fill="#059E87" opacity="0.6" />
      <circle cx="185" cy="132" r="4.5" fill="#059E87" opacity="0.55" />

      {/* Row 4 — People */}
      <line x1="30" y1="172" x2="200" y2="172" stroke="#059E87" strokeWidth="2" opacity="0.4" />
      <circle cx="55" cy="172" r="5" fill="#059E87" opacity="0.55" />
      <circle cx="110" cy="172" r="4.5" fill="#059E87" opacity="0.5" />
      <circle cx="165" cy="172" r="5" fill="#059E87" opacity="0.55" />

      {/* Status */}
      <text
        x="30"
        y="203"
        fill="#059E87"
        fontSize="7"
        fontFamily="monospace"
        fontWeight="600"
        opacity="0.6"
      >
        4 WORKFLOWS ORGANIZED
      </text>
      <rect x="30" y="207" width="170" height="4" rx="2" fill="rgba(5,158,135,0.15)" />
      <rect x="30" y="207" width="85" height="4" rx="2" fill="#059E87" opacity="0.8" />
    </svg>,

    /* ── 03 BUILD: Assemble the system ──
       The 4 organized rows converge into a central engine.
       Clear INPUT → ENGINE → OUTPUT flow.
    */
    <svg
      key="p2"
      className="phase-icon absolute inset-0"
      viewBox="0 0 220 220"
      fill="none"
      aria-hidden
    >
      {/* Input channels — left side, converging */}
      <line x1="15" y1="50" x2="70" y2="85" stroke="#059E87" strokeWidth="2" opacity="0.6" />
      <line x1="15" y1="90" x2="70" y2="100" stroke="#059E87" strokeWidth="2" opacity="0.6" />
      <line x1="15" y1="130" x2="70" y2="115" stroke="#059E87" strokeWidth="2" opacity="0.6" />
      <line x1="15" y1="170" x2="70" y2="130" stroke="#059E87" strokeWidth="2" opacity="0.6" />

      {/* Input dots */}
      <circle cx="15" cy="50" r="6" fill="#059E87" opacity="0.85" />
      <circle cx="15" cy="90" r="6" fill="#059E87" opacity="0.75" />
      <circle cx="15" cy="130" r="6" fill="#059E87" opacity="0.75" />
      <circle cx="15" cy="170" r="6" fill="#059E87" opacity="0.85" />

      {/* Input labels */}
      <text
        x="4"
        y="38"
        fill="#059E87"
        fontSize="7"
        fontFamily="monospace"
        fontWeight="600"
        opacity="0.7"
      >
        DATA
      </text>
      <text
        x="4"
        y="78"
        fill="#059E87"
        fontSize="7"
        fontFamily="monospace"
        fontWeight="600"
        opacity="0.7"
      >
        FLOW
      </text>
      <text
        x="4"
        y="122"
        fill="#059E87"
        fontSize="7"
        fontFamily="monospace"
        fontWeight="600"
        opacity="0.7"
      >
        RULES
      </text>
      <text
        x="4"
        y="162"
        fill="#059E87"
        fontSize="7"
        fontFamily="monospace"
        fontWeight="600"
        opacity="0.7"
      >
        TEAM
      </text>

      {/* Central ENGINE — the hub */}
      <rect
        x="68"
        y="70"
        width="84"
        height="75"
        rx="5"
        fill="rgba(5,158,135,0.1)"
        stroke="#059E87"
        strokeWidth="2.5"
        opacity="0.7"
      />
      {/* Engine core — concentric circles */}
      <circle cx="110" cy="108" r="24" fill="none" stroke="#059E87" strokeWidth="3" />
      <circle
        cx="110"
        cy="108"
        r="16"
        fill="none"
        stroke="#059E87"
        strokeWidth="2"
        opacity="0.6"
        strokeDasharray="4 3"
      />
      <circle
        cx="110"
        cy="108"
        r="8"
        fill="none"
        stroke="#059E87"
        strokeWidth="1.5"
        opacity="0.7"
      />
      <circle cx="110" cy="108" r="4" fill="#059E87" />
      {/* Engine glow */}
      <circle cx="110" cy="108" r="30" fill="rgba(5,158,135,0.06)" />

      {/* Output channels — right side, diverging */}
      <line x1="152" y1="90" x2="200" y2="60" stroke="#059E87" strokeWidth="2" opacity="0.7" />
      <line x1="152" y1="108" x2="200" y2="108" stroke="#059E87" strokeWidth="2" opacity="0.7" />
      <line x1="152" y1="126" x2="200" y2="155" stroke="#059E87" strokeWidth="2" opacity="0.7" />

      {/* Output nodes */}
      <circle
        cx="200"
        cy="60"
        r="7"
        fill="#059E87"
        opacity="0.9"
        stroke="#059E87"
        strokeWidth="1.5"
      />
      <circle
        cx="200"
        cy="108"
        r="7"
        fill="#059E87"
        opacity="0.8"
        stroke="#059E87"
        strokeWidth="1.5"
      />
      <circle
        cx="200"
        cy="155"
        r="7"
        fill="#059E87"
        opacity="0.9"
        stroke="#059E87"
        strokeWidth="1.5"
      />

      {/* Output labels */}
      <text
        x="185"
        y="48"
        fill="#059E87"
        fontSize="7"
        fontFamily="monospace"
        fontWeight="600"
        textAnchor="end"
        opacity="0.7"
      >
        AGENTS
      </text>
      <text
        x="185"
        y="98"
        fill="#059E87"
        fontSize="7"
        fontFamily="monospace"
        fontWeight="600"
        textAnchor="end"
        opacity="0.7"
      >
        CONTROLS
      </text>
      <text
        x="185"
        y="148"
        fill="#059E87"
        fontSize="7"
        fontFamily="monospace"
        fontWeight="600"
        textAnchor="end"
        opacity="0.7"
      >
        KPIs
      </text>

      {/* Governance strip at bottom */}
      <line x1="68" y1="158" x2="152" y2="158" stroke="rgba(5,158,135,0.3)" strokeWidth="1" />
      <rect x="72" y="162" width="16" height="6" rx="2" fill="#059E87" opacity="0.5" />
      <rect x="92" y="162" width="16" height="6" rx="2" fill="#059E87" opacity="0.4" />
      <rect x="112" y="162" width="16" height="6" rx="2" fill="#059E87" opacity="0.65" />
      <rect x="132" y="162" width="16" height="6" rx="2" fill="#059E87" opacity="0.45" />
      <text
        x="110"
        y="180"
        textAnchor="middle"
        fill="#059E87"
        fontSize="6"
        fontFamily="monospace"
        fontWeight="600"
        opacity="0.55"
      >
        GOVERNANCE
      </text>

      {/* Flow dots */}
      <circle r="3" fill="#059E87">
        <animateMotion dur="2.5s" repeatCount="indefinite" path="M 15,90 L 70,100 L 110,108" />
      </circle>
      <circle r="3" fill="#059E87" opacity="0.8">
        <animateMotion dur="2s" repeatCount="indefinite" path="M 152,108 L 200,108" begin="0.5s" />
      </circle>

      {/* Status */}
      <text
        x="30"
        y="203"
        fill="#059E87"
        fontSize="7"
        fontFamily="monospace"
        fontWeight="600"
        opacity="0.6"
      >
        SYSTEM ASSEMBLED
      </text>
      <rect x="30" y="207" width="160" height="4" rx="2" fill="rgba(5,158,135,0.15)" />
      <rect x="30" y="207" width="120" height="4" rx="2" fill="#059E87" opacity="0.8" />
    </svg>,

    /* ── 04 SCALE: Multiply and sustain ──
       The central engine now replicates outward.
       Multiple connected systems. People attached. Data flowing.
    */
    <svg
      key="p3"
      className="phase-icon absolute inset-0"
      viewBox="0 0 220 220"
      fill="none"
      aria-hidden
    >
      {/* Central engine — small version */}
      <rect
        x="88"
        y="88"
        width="44"
        height="44"
        rx="4"
        fill="rgba(5,158,135,0.12)"
        stroke="#059E87"
        strokeWidth="2.5"
        opacity="0.7"
      />
      <circle cx="110" cy="110" r="14" fill="none" stroke="#059E87" strokeWidth="2.5" />
      <circle cx="110" cy="110" r="5" fill="#059E87" />

      {/* Expansion rings — subtle */}
      <circle
        cx="110"
        cy="110"
        r="55"
        fill="none"
        stroke="rgba(5,158,135,0.15)"
        strokeWidth="1.5"
        strokeDasharray="4 6"
      />
      <circle
        cx="110"
        cy="110"
        r="90"
        fill="none"
        stroke="rgba(5,158,135,0.1)"
        strokeWidth="1"
        strokeDasharray="3 8"
      />

      {/* Connection lines to satellite systems */}
      <line x1="110" y1="88" x2="110" y2="30" stroke="#059E87" strokeWidth="2" opacity="0.55" />
      <line x1="132" y1="98" x2="178" y2="52" stroke="#059E87" strokeWidth="2" opacity="0.55" />
      <line x1="132" y1="122" x2="178" y2="168" stroke="#059E87" strokeWidth="2" opacity="0.55" />
      <line x1="88" y1="122" x2="42" y2="168" stroke="#059E87" strokeWidth="2" opacity="0.55" />
      <line x1="88" y1="98" x2="42" y2="52" stroke="#059E87" strokeWidth="2" opacity="0.55" />

      {/* Satellite system 1 — top */}
      <rect
        x="95"
        y="10"
        width="30"
        height="22"
        rx="4"
        fill="rgba(5,158,135,0.12)"
        stroke="#059E87"
        strokeWidth="1.5"
        opacity="0.65"
      />
      <circle cx="110" cy="21" r="5" fill="none" stroke="#059E87" strokeWidth="1.5" />
      <circle cx="110" cy="21" r="2" fill="#059E87" />
      <circle cx="130" cy="15" r="4" fill="#059E87" opacity="0.6" />
      <line x1="130" y1="19" x2="130" y2="28" stroke="#059E87" strokeWidth="1.5" opacity="0.5" />

      {/* Satellite system 2 — top-right */}
      <rect
        x="166"
        y="34"
        width="30"
        height="22"
        rx="4"
        fill="rgba(5,158,135,0.12)"
        stroke="#059E87"
        strokeWidth="1.5"
        opacity="0.65"
      />
      <circle cx="181" cy="45" r="5" fill="none" stroke="#059E87" strokeWidth="1.5" />
      <circle cx="181" cy="45" r="2" fill="#059E87" />
      <circle cx="201" cy="39" r="4" fill="#059E87" opacity="0.6" />
      <line x1="201" y1="43" x2="201" y2="52" stroke="#059E87" strokeWidth="1.5" opacity="0.5" />

      {/* Satellite system 3 — bottom-right */}
      <rect
        x="166"
        y="156"
        width="30"
        height="22"
        rx="4"
        fill="rgba(5,158,135,0.12)"
        stroke="#059E87"
        strokeWidth="1.5"
        opacity="0.65"
      />
      <circle cx="181" cy="167" r="5" fill="none" stroke="#059E87" strokeWidth="1.5" />
      <circle cx="181" cy="167" r="2" fill="#059E87" />
      <circle cx="201" cy="161" r="4" fill="#059E87" opacity="0.6" />
      <line x1="201" y1="165" x2="201" y2="174" stroke="#059E87" strokeWidth="1.5" opacity="0.5" />

      {/* Satellite system 4 — bottom-left */}
      <rect
        x="24"
        y="156"
        width="30"
        height="22"
        rx="4"
        fill="rgba(5,158,135,0.12)"
        stroke="#059E87"
        strokeWidth="1.5"
        opacity="0.65"
      />
      <circle cx="39" cy="167" r="5" fill="none" stroke="#059E87" strokeWidth="1.5" />
      <circle cx="39" cy="167" r="2" fill="#059E87" />
      <circle cx="19" cy="161" r="4" fill="#059E87" opacity="0.6" />
      <line x1="19" y1="165" x2="19" y2="174" stroke="#059E87" strokeWidth="1.5" opacity="0.5" />

      {/* Satellite system 5 — top-left */}
      <rect
        x="24"
        y="34"
        width="30"
        height="22"
        rx="4"
        fill="rgba(5,158,135,0.12)"
        stroke="#059E87"
        strokeWidth="1.5"
        opacity="0.65"
      />
      <circle cx="39" cy="45" r="5" fill="none" stroke="#059E87" strokeWidth="1.5" />
      <circle cx="39" cy="45" r="2" fill="#059E87" />
      <circle cx="19" cy="39" r="4" fill="#059E87" opacity="0.6" />
      <line x1="19" y1="43" x2="19" y2="52" stroke="#059E87" strokeWidth="1.5" opacity="0.5" />

      {/* Flow dots on connections */}
      <circle r="3" fill="#059E87" opacity="0.9">
        <animateMotion dur="1.8s" repeatCount="indefinite" path="M 110,88 L 110,30" />
      </circle>
      <circle r="3" fill="#059E87" opacity="0.8">
        <animateMotion dur="2s" repeatCount="indefinite" path="M 132,122 L 178,168" begin="0.3s" />
      </circle>
      <circle r="3" fill="#059E87" opacity="0.8">
        <animateMotion dur="2.2s" repeatCount="indefinite" path="M 88,98 L 42,52" begin="0.7s" />
      </circle>

      {/* Status */}
      <text
        x="30"
        y="203"
        fill="#059E87"
        fontSize="7"
        fontFamily="monospace"
        fontWeight="600"
        opacity="0.6"
      >
        5 TEAMS RUNNING
      </text>
      <rect x="30" y="207" width="160" height="4" rx="2" fill="rgba(5,158,135,0.15)" />
      <rect x="30" y="207" width="160" height="4" rx="2" fill="#059E87" opacity="0.8" />
    </svg>,
  ];

  return (
    <div ref={containerRef}>
      <div className="relative min-h-[40vh] flex items-center">
        {/* Vertical progress track */}
        <div className="hidden lg:flex flex-col items-center gap-0 absolute left-0 top-1/2 -translate-y-1/2 h-[60%]">
          <div className="relative w-0.5 h-full bg-border-light/30 rounded-full overflow-hidden">
            <div
              className="progress-fill absolute top-0 left-0 w-full bg-accent-dark origin-top rounded-full"
              style={{ height: '100%', transform: 'scaleY(0.25)' }}
            />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col justify-between h-full">
            {phases.map((_, i) => (
              <div
                key={i}
                className="progress-dot w-2.5 h-2.5 rounded-full border border-accent-dark/30"
                style={{ backgroundColor: i === 0 ? '#059E87' : 'transparent' }}
              />
            ))}
          </div>
        </div>

        {/* Phase content + icon */}
        <div className="lg:pl-12 w-full lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="relative">
            {phases.map((phase) => (
              <div
                key={phase.num}
                className="phase-item absolute inset-0 flex items-center first:relative"
              >
                <div className="flex items-baseline gap-6 max-w-xl">
                  <span className="metric text-4xl lg:text-6xl text-accent-dark/30 font-bold shrink-0">
                    {phase.num}
                  </span>
                  <div>
                    <h3
                      className="text-3xl lg:text-5xl text-text-on-light tracking-tight"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {phase.title}
                    </h3>
                    <p className="mt-4 text-lg leading-relaxed text-text-on-light-sub font-medium">
                      {phase.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:block relative w-full aspect-square max-w-[420px] mx-auto">
            {phaseIcons}
          </div>
        </div>
      </div>
    </div>
  );
}
