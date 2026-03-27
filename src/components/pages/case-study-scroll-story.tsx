'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Pinned scroll-driven story animation for the case study hero.
 * 4 phases that build on each other as you scroll:
 *   1. Understand — assess the landscape, find where growth is hiding
 *   2. Find — AI agents scan the market, surface hotspots and signals
 *   3. Build — construct the engine: dashboard, playbooks, orchestration
 *   4. Run & Optimize — system compounds, agents work the loop, growth without headcount
 */
export function CaseStudyScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);

  // Refs for each phase's elements
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const phase3Ref = useRef<HTMLDivElement>(null);
  const phase4Ref = useRef<HTMLDivElement>(null);

  // SVG refs
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (typeof window === 'undefined') return;
      const container = containerRef.current;
      const pinned = pinnedRef.current;
      if (!container || !pinned) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=400%',
          pin: pinned,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
        },
      });

      // ── Phase 1: Understand (0% - 25%) ──
      // Scattered nodes fade in, assessment beam sweeps
      tl.fromTo(
        '.story-phase-1',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        0,
      );
      tl.fromTo(
        '.svg-nodes-scattered',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
        0.1,
      );
      tl.fromTo(
        '.svg-scan-beam',
        { opacity: 0, rotation: -90, transformOrigin: 'center center' },
        { opacity: 0.6, rotation: 180, duration: 1.5, ease: 'none' },
        0.3,
      );
      // Fade out phase 1 text
      tl.to('.story-phase-1', { opacity: 0, y: -20, duration: 0.4 }, 1.8);

      // ── Phase 2: Find (25% - 50%) ──
      // Hotspots pulse, connections start forming
      tl.fromTo(
        '.story-phase-2',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        2.2,
      );
      tl.fromTo(
        '.svg-hotspots',
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 1, stagger: 0.1, ease: 'back.out(2)' },
        2.4,
      );
      tl.fromTo(
        '.svg-connections-1',
        { opacity: 0, strokeDashoffset: 300 },
        { opacity: 0.5, strokeDashoffset: 0, duration: 1.2, ease: 'power1.inOut' },
        2.6,
      );
      tl.to('.svg-scan-beam', { opacity: 0, duration: 0.5 }, 2.2);
      tl.to('.story-phase-2', { opacity: 0, y: -20, duration: 0.4 }, 3.8);

      // ── Phase 3: Build (50% - 75%) ──
      // Hub materializes, dashboard wireframe draws, agent paths connect
      tl.fromTo(
        '.story-phase-3',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        4.2,
      );
      tl.fromTo(
        '.svg-hub',
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)' },
        4.4,
      );
      tl.fromTo(
        '.svg-dashboard',
        { opacity: 0, strokeDashoffset: 600 },
        { opacity: 1, strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' },
        4.6,
      );
      tl.fromTo(
        '.svg-agent-paths',
        { opacity: 0, strokeDashoffset: 400 },
        { opacity: 0.6, strokeDashoffset: 0, duration: 1.2, stagger: 0.15, ease: 'power1.inOut' },
        5.0,
      );
      tl.to('.story-phase-3', { opacity: 0, y: -20, duration: 0.4 }, 5.8);

      // ── Phase 4: Run & Optimize (75% - 100%) ──
      // Everything lights up, metrics appear, feedback loops pulse
      tl.fromTo(
        '.story-phase-4',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        6.2,
      );
      tl.to(
        '.svg-nodes-scattered circle',
        { fill: 'rgba(0, 229, 195, 0.9)', duration: 0.8, stagger: 0.02 },
        6.4,
      );
      tl.fromTo(
        '.svg-metrics',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out' },
        6.6,
      );
      tl.fromTo(
        '.svg-feedback-loop',
        { opacity: 0, strokeDashoffset: 500 },
        { opacity: 0.8, strokeDashoffset: 0, duration: 1.5, ease: 'power1.inOut' },
        6.8,
      );
      tl.to('.svg-hub', { scale: 1.15, duration: 0.8, ease: 'power2.inOut' }, 7.0);
    },
    { scope: containerRef, dependencies: [] },
  );

  return (
    <div ref={containerRef} className="relative">
      <div ref={pinnedRef} className="relative h-screen w-full overflow-hidden bg-bg-deep">
        {/* SVG Animation Layer */}
        <svg
          ref={svgRef}
          viewBox="0 0 1200 700"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          style={{ padding: '5vh 5vw' }}
        >
          <defs>
            {/* Glow filter */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Gradient for scan beam */}
            <linearGradient id="scan-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0,229,195,0)" />
              <stop offset="50%" stopColor="rgba(0,229,195,0.3)" />
              <stop offset="100%" stopColor="rgba(0,229,195,0)" />
            </linearGradient>
          </defs>

          {/* ── Scattered nodes (divisions as isolated clusters) ── */}
          <g className="svg-nodes-scattered">
            {/* Cluster 1 - top left */}
            <circle cx="120" cy="140" r="4" fill="rgba(0,120,100,0.4)" />
            <circle cx="145" cy="125" r="3" fill="rgba(0,120,100,0.3)" />
            <circle cx="110" cy="165" r="3.5" fill="rgba(0,120,100,0.35)" />
            <circle cx="155" cy="155" r="2.5" fill="rgba(0,120,100,0.25)" />
            {/* Cluster 2 - top center-left */}
            <circle cx="320" cy="100" r="4" fill="rgba(0,120,100,0.4)" />
            <circle cx="340" cy="120" r="3" fill="rgba(0,120,100,0.3)" />
            <circle cx="305" cy="115" r="3.5" fill="rgba(0,120,100,0.35)" />
            {/* Cluster 3 - top right */}
            <circle cx="520" cy="90" r="4" fill="rgba(0,120,100,0.4)" />
            <circle cx="545" cy="105" r="3" fill="rgba(0,120,100,0.3)" />
            <circle cx="510" cy="115" r="3" fill="rgba(0,120,100,0.3)" />
            {/* Cluster 4 - far right top */}
            <circle cx="780" cy="120" r="4" fill="rgba(0,120,100,0.4)" />
            <circle cx="800" cy="140" r="3" fill="rgba(0,120,100,0.3)" />
            <circle cx="765" cy="145" r="3.5" fill="rgba(0,120,100,0.35)" />
            {/* Cluster 5 - right */}
            <circle cx="950" cy="180" r="4" fill="rgba(0,120,100,0.4)" />
            <circle cx="970" cy="200" r="3" fill="rgba(0,120,100,0.3)" />
            <circle cx="935" cy="195" r="3" fill="rgba(0,120,100,0.3)" />
            {/* Cluster 6 - far right */}
            <circle cx="1050" cy="280" r="4" fill="rgba(0,120,100,0.4)" />
            <circle cx="1070" cy="300" r="3" fill="rgba(0,120,100,0.3)" />
            <circle cx="1035" cy="295" r="3.5" fill="rgba(0,120,100,0.35)" />
            {/* Cluster 7 - center left */}
            <circle cx="180" cy="320" r="4" fill="rgba(0,120,100,0.4)" />
            <circle cx="200" cy="340" r="3" fill="rgba(0,120,100,0.3)" />
            <circle cx="165" cy="335" r="3.5" fill="rgba(0,120,100,0.35)" />
            {/* Cluster 8 - center */}
            <circle cx="440" cy="280" r="4" fill="rgba(0,120,100,0.4)" />
            <circle cx="460" cy="300" r="3" fill="rgba(0,120,100,0.3)" />
            <circle cx="425" cy="295" r="3" fill="rgba(0,120,100,0.3)" />
            {/* Cluster 9 - center right */}
            <circle cx="700" cy="310" r="4" fill="rgba(0,120,100,0.4)" />
            <circle cx="720" cy="330" r="3" fill="rgba(0,120,100,0.3)" />
            <circle cx="685" cy="325" r="3" fill="rgba(0,120,100,0.3)" />
            {/* Cluster 10 - bottom left */}
            <circle cx="130" cy="480" r="4" fill="rgba(0,120,100,0.4)" />
            <circle cx="150" cy="500" r="3" fill="rgba(0,120,100,0.3)" />
            <circle cx="115" cy="495" r="3.5" fill="rgba(0,120,100,0.35)" />
            {/* Cluster 11 - bottom center-left */}
            <circle cx="350" cy="460" r="4" fill="rgba(0,120,100,0.4)" />
            <circle cx="370" cy="480" r="3" fill="rgba(0,120,100,0.3)" />
            <circle cx="335" cy="475" r="3" fill="rgba(0,120,100,0.3)" />
            {/* Cluster 12 - bottom center */}
            <circle cx="560" cy="500" r="4" fill="rgba(0,120,100,0.4)" />
            <circle cx="580" cy="520" r="3" fill="rgba(0,120,100,0.3)" />
            <circle cx="545" cy="515" r="3" fill="rgba(0,120,100,0.3)" />
            {/* Cluster 13 - bottom right */}
            <circle cx="800" cy="480" r="4" fill="rgba(0,120,100,0.4)" />
            <circle cx="820" cy="500" r="3" fill="rgba(0,120,100,0.3)" />
            <circle cx="785" cy="495" r="3.5" fill="rgba(0,120,100,0.35)" />
            {/* Cluster 14 - far bottom right */}
            <circle cx="1000" cy="450" r="4" fill="rgba(0,120,100,0.4)" />
            <circle cx="1020" cy="470" r="3" fill="rgba(0,120,100,0.3)" />
            <circle cx="985" cy="465" r="3" fill="rgba(0,120,100,0.3)" />
            {/* Cluster 15 - bottom */}
            <circle cx="600" cy="620" r="4" fill="rgba(0,120,100,0.4)" />
            <circle cx="620" cy="640" r="3" fill="rgba(0,120,100,0.3)" />
            {/* Cluster 16 - bottom far */}
            <circle cx="900" cy="600" r="4" fill="rgba(0,120,100,0.4)" />
            <circle cx="920" cy="620" r="3" fill="rgba(0,120,100,0.3)" />
          </g>

          {/* ── Scan beam (Phase 1) ── */}
          <g className="svg-scan-beam" opacity="0">
            <line
              x1="600"
              y1="350"
              x2="600"
              y2="0"
              stroke="url(#scan-grad)"
              strokeWidth="60"
              opacity="0.3"
            />
            <line x1="600" y1="350" x2="600" y2="0" stroke="rgba(0,229,195,0.15)" strokeWidth="2" />
          </g>

          {/* ── Hotspots (Phase 2) ── */}
          <g className="svg-hotspots" filter="url(#glow)">
            <circle
              cx="120"
              cy="140"
              r="8"
              fill="none"
              stroke="rgba(0,229,195,0.8)"
              strokeWidth="1.5"
              opacity="0"
            />
            <circle
              cx="320"
              cy="100"
              r="8"
              fill="none"
              stroke="rgba(0,229,195,0.8)"
              strokeWidth="1.5"
              opacity="0"
            />
            <circle
              cx="520"
              cy="90"
              r="10"
              fill="none"
              stroke="rgba(0,229,195,0.9)"
              strokeWidth="2"
              opacity="0"
            />
            <circle
              cx="780"
              cy="120"
              r="8"
              fill="none"
              stroke="rgba(0,229,195,0.8)"
              strokeWidth="1.5"
              opacity="0"
            />
            <circle
              cx="950"
              cy="180"
              r="9"
              fill="none"
              stroke="rgba(0,229,195,0.85)"
              strokeWidth="1.5"
              opacity="0"
            />
            <circle
              cx="440"
              cy="280"
              r="10"
              fill="none"
              stroke="rgba(0,229,195,0.9)"
              strokeWidth="2"
              opacity="0"
            />
            <circle
              cx="700"
              cy="310"
              r="9"
              fill="none"
              stroke="rgba(0,229,195,0.85)"
              strokeWidth="1.5"
              opacity="0"
            />
            <circle
              cx="350"
              cy="460"
              r="8"
              fill="none"
              stroke="rgba(0,229,195,0.8)"
              strokeWidth="1.5"
              opacity="0"
            />
            <circle
              cx="800"
              cy="480"
              r="9"
              fill="none"
              stroke="rgba(0,229,195,0.85)"
              strokeWidth="1.5"
              opacity="0"
            />
          </g>

          {/* ── Initial connections between nearby hotspots (Phase 2) ── */}
          <g
            className="svg-connections-1"
            fill="none"
            stroke="rgba(0,229,195,0.3)"
            strokeWidth="1"
            strokeDasharray="300"
            opacity="0"
          >
            <line x1="120" y1="140" x2="320" y2="100" />
            <line x1="320" y1="100" x2="520" y2="90" />
            <line x1="520" y1="90" x2="780" y2="120" />
            <line x1="780" y1="120" x2="950" y2="180" />
            <line x1="440" y1="280" x2="700" y2="310" />
            <line x1="350" y1="460" x2="560" y2="500" />
            <line x1="800" y1="480" x2="1000" y2="450" />
          </g>

          {/* ── Central Hub (Phase 3) ── */}
          <g className="svg-hub" opacity="0" filter="url(#glow-strong)">
            {/* Outer ring */}
            <circle
              cx="600"
              cy="350"
              r="40"
              fill="none"
              stroke="rgba(0,229,195,0.3)"
              strokeWidth="1"
            />
            {/* Middle ring */}
            <circle
              cx="600"
              cy="350"
              r="28"
              fill="none"
              stroke="rgba(0,229,195,0.5)"
              strokeWidth="1.5"
            />
            {/* Core */}
            <circle
              cx="600"
              cy="350"
              r="14"
              fill="rgba(0,229,195,0.15)"
              stroke="rgba(0,229,195,0.8)"
              strokeWidth="2"
            />
            {/* Inner dot */}
            <circle cx="600" cy="350" r="5" fill="rgba(0,229,195,0.9)" />
          </g>

          {/* ── Dashboard wireframe (Phase 3) — abstract UI near hub ── */}
          <g className="svg-dashboard" opacity="0" strokeDasharray="600">
            {/* Dashboard frame */}
            <rect
              x="510"
              y="260"
              width="180"
              height="100"
              rx="4"
              fill="none"
              stroke="rgba(0,229,195,0.4)"
              strokeWidth="1"
            />
            {/* Header bar */}
            <line
              x1="510"
              y1="278"
              x2="690"
              y2="278"
              stroke="rgba(0,229,195,0.3)"
              strokeWidth="1"
            />
            {/* Pipeline columns */}
            <line
              x1="555"
              y1="278"
              x2="555"
              y2="360"
              stroke="rgba(0,229,195,0.15)"
              strokeWidth="0.5"
            />
            <line
              x1="600"
              y1="278"
              x2="600"
              y2="360"
              stroke="rgba(0,229,195,0.15)"
              strokeWidth="0.5"
            />
            <line
              x1="645"
              y1="278"
              x2="645"
              y2="360"
              stroke="rgba(0,229,195,0.15)"
              strokeWidth="0.5"
            />
            {/* Data dots in columns */}
            <circle cx="532" cy="295" r="2.5" fill="rgba(0,229,195,0.6)" />
            <circle cx="532" cy="310" r="2.5" fill="rgba(0,229,195,0.4)" />
            <circle cx="532" cy="325" r="2.5" fill="rgba(0,229,195,0.5)" />
            <circle cx="577" cy="295" r="2.5" fill="rgba(0,229,195,0.5)" />
            <circle cx="577" cy="310" r="2.5" fill="rgba(0,229,195,0.6)" />
            <circle cx="622" cy="295" r="2.5" fill="rgba(0,229,195,0.7)" />
            <circle cx="622" cy="310" r="2.5" fill="rgba(0,229,195,0.4)" />
            <circle cx="667" cy="295" r="2.5" fill="rgba(0,229,195,0.8)" />
          </g>

          {/* ── Agent paths from hub to clusters (Phase 3) ── */}
          <g fill="none" strokeWidth="1" strokeDasharray="400">
            <path
              className="svg-agent-paths"
              d="M600,350 Q400,200 120,140"
              stroke="rgba(0,229,195,0.25)"
              opacity="0"
            />
            <path
              className="svg-agent-paths"
              d="M600,350 Q500,180 320,100"
              stroke="rgba(0,229,195,0.25)"
              opacity="0"
            />
            <path
              className="svg-agent-paths"
              d="M600,350 Q580,200 520,90"
              stroke="rgba(0,229,195,0.25)"
              opacity="0"
            />
            <path
              className="svg-agent-paths"
              d="M600,350 Q700,220 780,120"
              stroke="rgba(0,229,195,0.25)"
              opacity="0"
            />
            <path
              className="svg-agent-paths"
              d="M600,350 Q800,250 950,180"
              stroke="rgba(0,229,195,0.25)"
              opacity="0"
            />
            <path
              className="svg-agent-paths"
              d="M600,350 Q500,320 440,280"
              stroke="rgba(0,229,195,0.25)"
              opacity="0"
            />
            <path
              className="svg-agent-paths"
              d="M600,350 Q650,330 700,310"
              stroke="rgba(0,229,195,0.25)"
              opacity="0"
            />
            <path
              className="svg-agent-paths"
              d="M600,350 Q450,420 350,460"
              stroke="rgba(0,229,195,0.25)"
              opacity="0"
            />
            <path
              className="svg-agent-paths"
              d="M600,350 Q700,430 800,480"
              stroke="rgba(0,229,195,0.25)"
              opacity="0"
            />
            <path
              className="svg-agent-paths"
              d="M600,350 Q800,400 1000,450"
              stroke="rgba(0,229,195,0.25)"
              opacity="0"
            />
          </g>

          {/* ── Feedback loop arrows (Phase 4) ── */}
          <g
            className="svg-feedback-loop"
            opacity="0"
            fill="none"
            strokeWidth="1.5"
            strokeDasharray="500"
          >
            {/* Circular feedback loop around hub */}
            <path d="M640,320 A50,50 0 1,1 560,320" stroke="rgba(0,229,195,0.5)" />
            <path d="M560,380 A50,50 0 1,1 640,380" stroke="rgba(0,229,195,0.5)" />
            {/* Arrow heads */}
            <polygon points="558,318 565,325 555,325" fill="rgba(0,229,195,0.5)" />
            <polygon points="642,382 635,375 645,375" fill="rgba(0,229,195,0.5)" />
          </g>

          {/* ── Metric labels (Phase 4) ── */}
          <g className="svg-metrics">
            <text
              x="120"
              y="170"
              className="svg-metrics"
              opacity="0"
              fill="rgba(0,229,195,0.9)"
              fontSize="13"
              fontFamily="monospace"
              fontWeight="bold"
              textAnchor="middle"
            >
              1,181
            </text>
            <text
              x="520"
              y="70"
              className="svg-metrics"
              opacity="0"
              fill="rgba(0,229,195,0.9)"
              fontSize="13"
              fontFamily="monospace"
              fontWeight="bold"
              textAnchor="middle"
            >
              99.8%
            </text>
            <text
              x="950"
              y="160"
              className="svg-metrics"
              opacity="0"
              fill="rgba(0,229,195,0.9)"
              fontSize="13"
              fontFamily="monospace"
              fontWeight="bold"
              textAnchor="middle"
            >
              32x
            </text>
            <text
              x="700"
              y="290"
              className="svg-metrics"
              opacity="0"
              fill="rgba(0,229,195,0.9)"
              fontSize="13"
              fontFamily="monospace"
              fontWeight="bold"
              textAnchor="middle"
            >
              631+
            </text>
          </g>
        </svg>

        {/* Text overlay — phases fade in/out as you scroll */}
        <div
          className="absolute inset-0 z-10 flex items-end pointer-events-none"
          style={{ padding: '0 5vw 8vh' }}
        >
          <div className="max-w-xl">
            {/* Phase 1 */}
            <div className="story-phase-1 absolute bottom-[8vh] left-[5vw]" style={{ opacity: 0 }}>
              <p
                className="text-xs uppercase tracking-[0.2em] text-accent mb-3"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                01 — Understand
              </p>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl text-text-primary leading-[1.1] mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Sixteen divisions.
                <br />
                No shared view of the market.
              </h2>
              <p className="text-base text-text-secondary max-w-md leading-relaxed">
                Every group prospecting on its own. No line of sight into where capital is flowing,
                which accounts are under-served, or where the real white space sits.
              </p>
            </div>

            {/* Phase 2 */}
            <div className="story-phase-2 absolute bottom-[8vh] left-[5vw]" style={{ opacity: 0 }}>
              <p
                className="text-xs uppercase tracking-[0.2em] text-accent mb-3"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                02 — Find
              </p>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl text-text-primary leading-[1.1] mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                AI agents scan the market.
                <br />
                Hotspots surface in real time.
              </h2>
              <p className="text-base text-text-secondary max-w-md leading-relaxed">
                Proprietary intelligence agents monitor capital projects, demand signals, and
                competitive shifts across 20+ states — matched to what you actually sell.
              </p>
            </div>

            {/* Phase 3 */}
            <div className="story-phase-3 absolute bottom-[8vh] left-[5vw]" style={{ opacity: 0 }}>
              <p
                className="text-xs uppercase tracking-[0.2em] text-accent mb-3"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                03 — Build
              </p>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl text-text-primary leading-[1.1] mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                The engine takes shape.
                <br />
                Dashboard. Playbooks. Orchestration.
              </h2>
              <p className="text-base text-text-secondary max-w-md leading-relaxed">
                A purpose-built platform your team uses daily — pipeline management, AI-generated
                playbooks, contact intelligence, and structured feedback loops that make the system
                smarter with every interaction.
              </p>
            </div>

            {/* Phase 4 */}
            <div className="story-phase-4 absolute bottom-[8vh] left-[5vw]" style={{ opacity: 0 }}>
              <p
                className="text-xs uppercase tracking-[0.2em] text-accent mb-3"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                04 — Run &amp; Optimize
              </p>
              <h2
                className="text-2xl sm:text-3xl lg:text-4xl text-text-primary leading-[1.1] mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Growth without headcount.
                <br />
                The system compounds.
              </h2>
              <p className="text-base text-text-secondary max-w-md leading-relaxed">
                AI agents work the loop continuously — discovering, scoring, generating playbooks,
                and learning from every outcome. Your team orchestrates. The machine scales.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator at bottom */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 opacity-40">
          <p className="text-[10px] uppercase tracking-widest text-text-muted">Scroll</p>
          <div className="w-px h-6 bg-gradient-to-b from-text-muted to-transparent" />
        </div>
      </div>
    </div>
  );
}
