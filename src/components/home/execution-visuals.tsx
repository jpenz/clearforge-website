"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ───────────────────────────────────────────────
   01 · UNDERSTAND — Diagnostic Scanner
   Nodes, connections, and a rotating scan line
   ─────────────────────────────────────────────── */

export function AnalyzeVisual() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      const svg = svgRef.current;
      if (!svg) return;

      const nodes = svg.querySelectorAll(".a-node");
      const lines = svg.querySelectorAll(".a-line");
      const scanLine = svg.querySelector(".a-scan");
      const pulses = svg.querySelectorAll(".a-pulse");

      // Initial state
      gsap.set(nodes, { opacity: 0, scale: 0 });
      gsap.set(lines, { strokeDashoffset: 200 });
      gsap.set(scanLine, { opacity: 0, rotation: -45, transformOrigin: "center center" });
      gsap.set(pulses, { opacity: 0, scale: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svg,
          start: "top 80%",
          end: "bottom 40%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(scanLine, { opacity: 0.6, duration: 0.4 })
        .to(scanLine, { rotation: 315, duration: 2, ease: "power1.inOut" }, "<")
        .to(nodes, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.08, ease: "back.out(2)" }, 0.3)
        .to(lines, { strokeDashoffset: 0, duration: 0.6, stagger: 0.05, ease: "power2.out" }, 0.5)
        .to(pulses, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.1 }, 1)
        .to(pulses, {
          scale: 1.5,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          repeat: -1,
          yoyo: false,
          ease: "power1.out",
        }, 1.5);
    },
    { scope: svgRef }
  );

  const nodes = [
    { cx: 200, cy: 80 },
    { cx: 320, cy: 140 },
    { cx: 280, cy: 260 },
    { cx: 120, cy: 280 },
    { cx: 80, cy: 160 },
    { cx: 200, cy: 180 },
    { cx: 360, cy: 220 },
    { cx: 140, cy: 100 },
  ];

  const connections = [
    [0, 1], [0, 5], [0, 7], [1, 2], [1, 6], [2, 3], [2, 5], [3, 4], [4, 5], [4, 7], [5, 1], [5, 6],
  ];

  return (
    <svg ref={svgRef} viewBox="0 0 400 360" className="w-full h-auto" aria-hidden>
      {/* Outer ring */}
      <circle cx="200" cy="180" r="140" fill="none" stroke="rgba(5,158,135,0.15)" strokeWidth="1" />
      <circle cx="200" cy="180" r="100" fill="none" stroke="rgba(5,158,135,0.12)" strokeWidth="1" strokeDasharray="4 8" />

      {/* Scan line */}
      <line
        className="a-scan"
        x1="200" y1="180" x2="200" y2="40"
        stroke="url(#scanGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Connection lines */}
      {connections.map(([a, b], i) => (
        <line
          key={`line-${i}`}
          className="a-line"
          x1={nodes[a].cx} y1={nodes[a].cy}
          x2={nodes[b].cx} y2={nodes[b].cy}
          stroke="rgba(5,158,135,0.4)"
          strokeWidth="1"
          strokeDasharray="200"
        />
      ))}

      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={`node-${i}`}>
          <circle className="a-pulse" cx={n.cx} cy={n.cy} r="12" fill="rgba(5,158,135,0.2)" />
          <circle className="a-node" cx={n.cx} cy={n.cy} r={i === 5 ? 6 : 4} fill="#059E87" />
        </g>
      ))}

      {/* Center accent */}
      <circle cx="200" cy="180" r="18" fill="none" stroke="rgba(5,158,135,0.35)" strokeWidth="1.5" className="a-node" />
      <circle cx="200" cy="180" r="3" fill="#059E87" className="a-node" />

      <defs>
        <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#059E87" stopOpacity="0" />
          <stop offset="100%" stopColor="#059E87" stopOpacity="0.6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ───────────────────────────────────────────────
   02 · BUILD — System Assembly
   Blocks connecting, workflow forming
   ─────────────────────────────────────────────── */

export function SystemVisual() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      const svg = svgRef.current;
      if (!svg) return;

      const blocks = svg.querySelectorAll(".b-block");
      const paths = svg.querySelectorAll(".b-path");
      const arrows = svg.querySelectorAll(".b-arrow");
      const glow = svg.querySelector(".b-glow");

      gsap.set(blocks, { opacity: 0, y: 20 });
      gsap.set(paths, { strokeDashoffset: 300 });
      gsap.set(arrows, { opacity: 0, scale: 0 });
      gsap.set(glow, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svg,
          start: "top 80%",
          end: "bottom 40%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(blocks, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" })
        .to(paths, { strokeDashoffset: 0, duration: 0.8, stagger: 0.1, ease: "power2.inOut" }, 0.3)
        .to(arrows, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.08, ease: "back.out(2)" }, 0.8)
        .to(glow, { opacity: 1, duration: 0.6 }, 1)
        .to(glow, { opacity: 0.4, duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut" }, 1.5);
    },
    { scope: svgRef }
  );

  return (
    <svg ref={svgRef} viewBox="0 0 400 360" className="w-full h-auto" aria-hidden>
      {/* Grid background */}
      <pattern id="buildGrid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(5,158,135,0.08)" strokeWidth="0.5" />
      </pattern>
      <rect width="400" height="360" fill="url(#buildGrid)" />

      {/* Connecting paths */}
      <path className="b-path" d="M 80 100 L 160 100" stroke="rgba(5,158,135,0.45)" strokeWidth="1.5" fill="none" strokeDasharray="300" />
      <path className="b-path" d="M 240 100 L 320 100" stroke="rgba(5,158,135,0.45)" strokeWidth="1.5" fill="none" strokeDasharray="300" />
      <path className="b-path" d="M 200 140 L 200 200" stroke="rgba(5,158,135,0.45)" strokeWidth="1.5" fill="none" strokeDasharray="300" />
      <path className="b-path" d="M 120 240 L 200 240 L 280 240" stroke="rgba(5,158,135,0.45)" strokeWidth="1.5" fill="none" strokeDasharray="300" />
      <path className="b-path" d="M 200 280 L 200 320" stroke="rgba(5,158,135,0.45)" strokeWidth="1.5" fill="none" strokeDasharray="300" />

      {/* Blocks — top row */}
      <rect className="b-block" x="40" y="80" width="40" height="40" rx="4" fill="rgba(5,158,135,0.22)" stroke="rgba(5,158,135,0.45)" strokeWidth="1" />
      <rect className="b-block" x="160" y="80" width="80" height="40" rx="4" fill="rgba(5,158,135,0.15)" stroke="rgba(5,158,135,0.4)" strokeWidth="1" />
      <rect className="b-block" x="320" y="80" width="40" height="40" rx="4" fill="rgba(5,158,135,0.22)" stroke="rgba(5,158,135,0.45)" strokeWidth="1" />

      {/* Center hub */}
      <rect className="b-block" x="160" y="200" width="80" height="80" rx="6" fill="rgba(5,158,135,0.12)" stroke="rgba(5,158,135,0.5)" strokeWidth="1.5" />
      <rect className="b-glow" x="165" y="205" width="70" height="70" rx="4" fill="rgba(5,158,135,0.15)" />
      <text x="200" y="244" textAnchor="middle" fill="rgba(5,158,135,0.6)" fontSize="10" fontFamily="monospace">AI</text>

      {/* Side blocks */}
      <rect className="b-block" x="80" y="220" width="40" height="40" rx="4" fill="rgba(5,158,135,0.2)" stroke="rgba(5,158,135,0.35)" strokeWidth="1" />
      <rect className="b-block" x="280" y="220" width="40" height="40" rx="4" fill="rgba(5,158,135,0.2)" stroke="rgba(5,158,135,0.35)" strokeWidth="1" />

      {/* Output */}
      <rect className="b-block" x="170" y="310" width="60" height="30" rx="4" fill="rgba(5,158,135,0.25)" stroke="rgba(5,158,135,0.55)" strokeWidth="1" />

      {/* Flow arrows */}
      <circle className="b-arrow" cx="140" cy="100" r="3" fill="#059E87" />
      <circle className="b-arrow" cx="300" cy="100" r="3" fill="#059E87" />
      <circle className="b-arrow" cx="200" cy="170" r="3" fill="#059E87" />
      <circle className="b-arrow" cx="200" cy="300" r="3" fill="#059E87" />
    </svg>
  );
}

/* ───────────────────────────────────────────────
   03 · OPERATE — Performance Dashboard
   Rising charts, pulsing metrics, progress ring
   ─────────────────────────────────────────────── */

export function DashboardVisual() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      const svg = svgRef.current;
      if (!svg) return;

      const bars = svg.querySelectorAll(".d-bar");
      const line = svg.querySelector(".d-line");
      const dots = svg.querySelectorAll(".d-dot");
      const ring = svg.querySelector(".d-ring");
      const metrics = svg.querySelectorAll(".d-metric");

      gsap.set(bars, { scaleY: 0, transformOrigin: "bottom center" });
      gsap.set(line, { strokeDashoffset: 600 });
      gsap.set(dots, { opacity: 0, scale: 0 });
      gsap.set(ring, { strokeDashoffset: 440 });
      gsap.set(metrics, { opacity: 0, y: 10 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svg,
          start: "top 80%",
          end: "bottom 40%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(bars, { scaleY: 1, duration: 0.6, stagger: 0.06, ease: "power2.out" })
        .to(line, { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, 0.2)
        .to(dots, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.06, ease: "back.out(2)" }, 0.8)
        .to(ring, { strokeDashoffset: 110, duration: 1, ease: "power2.out" }, 0.3)
        .to(metrics, { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 }, 0.6)
        .to(dots, {
          opacity: 0.5,
          duration: 0.8,
          stagger: 0.1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        }, 2);
    },
    { scope: svgRef }
  );

  // Bar chart data
  const barData = [0.3, 0.45, 0.55, 0.5, 0.65, 0.7, 0.6, 0.8, 0.75, 0.85, 0.9, 0.95];
  const linePoints = "60,220 90,200 120,210 150,185 180,175 210,165 240,150 270,135 300,115 330,95";

  return (
    <svg ref={svgRef} viewBox="0 0 400 360" className="w-full h-auto" aria-hidden>
      {/* Subtle axis lines */}
      <line x1="50" y1="250" x2="350" y2="250" stroke="rgba(5,158,135,0.2)" strokeWidth="0.5" />
      <line x1="50" y1="200" x2="350" y2="200" stroke="rgba(5,158,135,0.12)" strokeWidth="0.5" strokeDasharray="4 4" />
      <line x1="50" y1="150" x2="350" y2="150" stroke="rgba(5,158,135,0.12)" strokeWidth="0.5" strokeDasharray="4 4" />
      <line x1="50" y1="100" x2="350" y2="100" stroke="rgba(5,158,135,0.12)" strokeWidth="0.5" strokeDasharray="4 4" />

      {/* Bar chart */}
      {barData.map((h, i) => (
        <rect
          key={`bar-${i}`}
          className="d-bar"
          x={58 + i * 25}
          y={250 - h * 160}
          width="14"
          height={h * 160}
          rx="2"
          fill={`rgba(5,158,135,${0.15 + h * 0.25})`}
        />
      ))}

      {/* Trend line */}
      <polyline
        className="d-line"
        points={linePoints}
        fill="none"
        stroke="#059E87"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="600"
      />

      {/* Data points on line */}
      {linePoints.split(" ").map((pt, i) => {
        const [x, y] = pt.split(",").map(Number);
        return <circle key={`dot-${i}`} className="d-dot" cx={x} cy={y} r="3" fill="#059E87" />;
      })}

      {/* Progress ring — top right */}
      <circle cx="340" cy="50" r="30" fill="none" stroke="rgba(5,158,135,0.15)" strokeWidth="3" />
      <circle
        className="d-ring"
        cx="340" cy="50" r="30"
        fill="none"
        stroke="#059E87"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="188"
        transform="rotate(-90 340 50)"
      />
      <text className="d-metric" x="340" y="55" textAnchor="middle" fill="#059E87" fontSize="14" fontFamily="monospace" fontWeight="bold">87%</text>

      {/* KPI labels */}
      <text className="d-metric" x="60" y="290" fill="rgba(5,158,135,0.55)" fontSize="9" fontFamily="monospace">THROUGHPUT</text>
      <text className="d-metric" x="60" y="305" fill="#059E87" fontSize="16" fontFamily="monospace" fontWeight="bold">+42%</text>

      <text className="d-metric" x="200" y="290" fill="rgba(5,158,135,0.55)" fontSize="9" fontFamily="monospace">CYCLE TIME</text>
      <text className="d-metric" x="200" y="305" fill="#059E87" fontSize="16" fontFamily="monospace" fontWeight="bold">-31%</text>
    </svg>
  );
}
