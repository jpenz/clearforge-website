"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Types ── */

interface Node {
  /** Current rendered position */
  x: number;
  y: number;
  /** Chaotic (random) home position */
  chaosX: number;
  chaosY: number;
  /** Organized (grid) home position */
  gridX: number;
  gridY: number;
  /** Ambient drift offset */
  driftOffsetX: number;
  driftOffsetY: number;
  /** Drift phase (radians, unique per node) */
  driftPhase: number;
  /** Drift speed multiplier */
  driftSpeed: number;
  /** Drift amplitude */
  driftAmp: number;
  /** Base radius */
  radius: number;
  /** Base opacity (0.3 - 1.0) */
  opacity: number;
  /** Which pathway this node belongs to (-1 = none) */
  pathway: number;
}

interface EnergyDot {
  /** Index of source node */
  fromNode: number;
  /** Index of target node */
  toNode: number;
  /** Progress along the connection (0-1) */
  progress: number;
  /** Speed */
  speed: number;
  /** Which pathway */
  pathway: number;
}

/* ── Constants ── */

const TEAL = { r: 0, g: 229, b: 195 };
const CONNECTION_RADIUS_CHAOS = 120;
const CONNECTION_RADIUS_ORGANIZED = 180;
const NUM_PATHWAYS = 4;
const ENERGY_DOT_RADIUS = 2.5;
const NODE_COUNT_DESKTOP = 80;
const NODE_COUNT_MOBILE = 40;

/* ── Helpers ── */

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function dist(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Generate organized grid positions in a roughly hexagonal/organic pattern
 * with clear horizontal pathway channels.
 */
function generateOrganizedPositions(
  count: number,
  width: number,
  height: number
): { x: number; y: number; pathway: number }[] {
  const positions: { x: number; y: number; pathway: number }[] = [];
  const centerX = width / 2;
  const centerY = height / 2;

  // Define pathway Y positions (horizontal channels)
  const pathwaySpacing = height / (NUM_PATHWAYS + 1);
  const pathwayYs = Array.from({ length: NUM_PATHWAYS }, (_, i) => pathwaySpacing * (i + 1));

  // Allocate ~35% of nodes to pathways, rest as grid fill
  const pathwayNodeCount = Math.floor(count * 0.35);
  const gridNodeCount = count - pathwayNodeCount;
  const nodesPerPathway = Math.floor(pathwayNodeCount / NUM_PATHWAYS);

  // Pathway nodes: distributed along horizontal channels
  for (let p = 0; p < NUM_PATHWAYS; p++) {
    const py = pathwayYs[p];
    for (let i = 0; i < nodesPerPathway; i++) {
      const t = (i + 1) / (nodesPerPathway + 1);
      const px = width * 0.08 + t * width * 0.84;
      // Slight vertical jitter for organic feel
      const jitterY = (Math.random() - 0.5) * 20;
      const jitterX = (Math.random() - 0.5) * 15;
      positions.push({ x: px + jitterX, y: py + jitterY, pathway: p });
    }
  }

  // Grid fill nodes: hexagonal-ish distribution
  const cols = Math.ceil(Math.sqrt(gridNodeCount * (width / height)));
  const rows = Math.ceil(gridNodeCount / cols);
  const cellW = (width * 0.8) / cols;
  const cellH = (height * 0.8) / rows;
  const startX = width * 0.1;
  const startY = height * 0.1;

  let placed = 0;
  for (let row = 0; row < rows && placed < gridNodeCount; row++) {
    const offset = row % 2 === 0 ? 0 : cellW * 0.5; // hex offset
    for (let col = 0; col < cols && placed < gridNodeCount; col++) {
      const gx = startX + col * cellW + offset + (Math.random() - 0.5) * cellW * 0.3;
      const gy = startY + row * cellH + (Math.random() - 0.5) * cellH * 0.3;

      // Determine nearest pathway (if close enough, mark it)
      let nearestPathway = -1;
      let minPathDist = Infinity;
      for (let p = 0; p < NUM_PATHWAYS; p++) {
        const d = Math.abs(gy - pathwayYs[p]);
        if (d < minPathDist) {
          minPathDist = d;
          nearestPathway = p;
        }
      }
      // Only assign to pathway if very close (within 30px)
      const assignedPathway = minPathDist < 30 ? nearestPathway : -1;

      positions.push({ x: gx, y: gy, pathway: assignedPathway });
      placed++;
    }
  }

  // Center-bias: pull positions slightly toward center for organic look
  return positions.map((p) => ({
    x: lerp(p.x, centerX, 0.05),
    y: lerp(p.y, centerY, 0.05),
    pathway: p.pathway,
  }));
}

/* ── Component ── */

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef({ value: 0 });
  const nodesRef = useRef<Node[]>([]);
  const energyDotsRef = useRef<EnergyDot[]>([]);
  const animFrameRef = useRef<number>(0);
  const isVisibleRef = useRef(true);
  const sizeRef = useRef({ width: 0, height: 0 });
  const isMobileRef = useRef(false);
  const timeRef = useRef(0);
  const lastTimeRef = useRef(0);

  /** Initialize or reinitialize nodes for a given canvas size */
  const initNodes = useCallback((width: number, height: number) => {
    const isMobile = width < 768;
    isMobileRef.current = isMobile;
    const count = isMobile ? NODE_COUNT_MOBILE : NODE_COUNT_DESKTOP;

    const organized = generateOrganizedPositions(count, width, height);
    const nodes: Node[] = [];

    for (let i = 0; i < count; i++) {
      const chaosX = Math.random() * width;
      const chaosY = Math.random() * height;
      const org = organized[i] || { x: width / 2, y: height / 2, pathway: -1 };

      nodes.push({
        x: chaosX,
        y: chaosY,
        chaosX,
        chaosY,
        gridX: org.x,
        gridY: org.y,
        driftOffsetX: 0,
        driftOffsetY: 0,
        driftPhase: Math.random() * Math.PI * 2,
        driftSpeed: 0.3 + Math.random() * 0.5,
        driftAmp: isMobile ? 4 + Math.random() * 6 : 6 + Math.random() * 10,
        radius: isMobile ? 1.5 + Math.random() * 1.5 : 2 + Math.random() * 2,
        opacity: 0.3 + Math.random() * 0.7,
        pathway: org.pathway,
      });
    }

    nodesRef.current = nodes;

    // Initialize energy dots along pathways
    const energyDots: EnergyDot[] = [];
    for (let p = 0; p < NUM_PATHWAYS; p++) {
      const pathwayNodes = nodes
        .map((n, idx) => ({ node: n, idx }))
        .filter((entry) => entry.node.pathway === p)
        .sort((a, b) => a.node.gridX - b.node.gridX);

      if (pathwayNodes.length < 2) continue;

      // Create 2-3 energy dots per pathway
      const dotCount = isMobile ? 1 : 2 + Math.floor(Math.random() * 2);
      for (let d = 0; d < dotCount; d++) {
        const segIdx = Math.floor(Math.random() * (pathwayNodes.length - 1));
        energyDots.push({
          fromNode: pathwayNodes[segIdx].idx,
          toNode: pathwayNodes[segIdx + 1].idx,
          progress: Math.random(),
          speed: 0.3 + Math.random() * 0.4,
          pathway: p,
        });
      }
    }

    energyDotsRef.current = energyDots;
  }, []);

  /** Handle canvas resize */
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = rect.width;
    const height = rect.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    sizeRef.current = { width, height };
    initNodes(width, height);
  }, [initNodes]);

  /** Main render loop */
  const render = useCallback(() => {
    if (!isVisibleRef.current) {
      animFrameRef.current = requestAnimationFrame(render);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = sizeRef.current;
    if (width === 0 || height === 0) {
      animFrameRef.current = requestAnimationFrame(render);
      return;
    }

    const now = performance.now();
    const delta = lastTimeRef.current ? (now - lastTimeRef.current) / 1000 : 0.016;
    lastTimeRef.current = now;
    timeRef.current += delta;
    const time = timeRef.current;

    const progress = progressRef.current.value; // 0 = chaos, 1 = organized
    const nodes = nodesRef.current;
    const isMobile = isMobileRef.current;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // --- Update node positions ---
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      // Ambient drift
      node.driftOffsetX = Math.sin(time * node.driftSpeed + node.driftPhase) * node.driftAmp;
      node.driftOffsetY = Math.cos(time * node.driftSpeed * 0.7 + node.driftPhase + 1.5) * node.driftAmp * 0.6;

      // In chaos state, drift is larger; in organized, it's subtle
      const driftScale = lerp(1.0, 0.3, progress);

      // Interpolate between chaos and organized positions
      const baseX = lerp(node.chaosX, node.gridX, progress);
      const baseY = lerp(node.chaosY, node.gridY, progress);

      node.x = baseX + node.driftOffsetX * driftScale;
      node.y = baseY + node.driftOffsetY * driftScale;
    }

    // --- Connection radius interpolation ---
    const connectionRadius = lerp(CONNECTION_RADIUS_CHAOS, CONNECTION_RADIUS_ORGANIZED, progress);
    const lineAlphaBase = lerp(0.15, 0.4, progress);

    // --- Draw connections ---
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = dist(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
        if (d > connectionRadius || d < 1) continue;

        // Proximity-based alpha falloff
        const proximityAlpha = 1 - d / connectionRadius;
        const alpha = lineAlphaBase * proximityAlpha;

        if (alpha < 0.02) continue;

        // In organized state, pathway connections are brighter
        const isPathwayConnection =
          progress > 0.3 &&
          nodes[i].pathway >= 0 &&
          nodes[i].pathway === nodes[j].pathway;
        const finalAlpha = isPathwayConnection ? Math.min(alpha * 1.8, 0.6) : alpha;
        const lineWidth = isPathwayConnection ? lerp(0.5, 1.2, progress) : 0.5;

        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = `rgba(${TEAL.r}, ${TEAL.g}, ${TEAL.b}, ${finalAlpha})`;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }
    }

    // --- Draw nodes ---
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      // In organized state, pathway nodes glow slightly more
      const isPathwayNode = node.pathway >= 0;
      const glowBoost = isPathwayNode ? lerp(0, 0.2, progress) : 0;
      const nodeOpacity = Math.min(node.opacity + glowBoost, 1);

      // Subtle pulse for pathway nodes in organized state
      const pulse = isPathwayNode && progress > 0.5
        ? 1 + Math.sin(time * 2 + node.driftPhase) * 0.15 * progress
        : 1;

      const r = node.radius * pulse;

      ctx.beginPath();
      ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${TEAL.r}, ${TEAL.g}, ${TEAL.b}, ${nodeOpacity})`;
      ctx.fill();

      // Outer glow for larger nodes
      if (r > 2.5) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, r + 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${TEAL.r}, ${TEAL.g}, ${TEAL.b}, ${nodeOpacity * 0.15})`;
        ctx.fill();
      }
    }

    // --- Energy dots (only visible as organization increases) ---
    if (progress > 0.2 && !isMobile) {
      const energyAlpha = Math.min((progress - 0.2) / 0.3, 1); // fade in from 0.2 to 0.5

      const energyDots = energyDotsRef.current;

      for (let d = 0; d < energyDots.length; d++) {
        const dot = energyDots[d];
        dot.progress += dot.speed * delta;

        if (dot.progress >= 1) {
          // Move to next segment along the pathway
          const pathwayNodes = nodes
            .map((n, idx) => ({ node: n, idx }))
            .filter((entry) => entry.node.pathway === dot.pathway)
            .sort((a, b) => a.node.gridX - b.node.gridX);

          if (pathwayNodes.length < 2) continue;

          const currentToIdx = pathwayNodes.findIndex((pn) => pn.idx === dot.toNode);
          if (currentToIdx < pathwayNodes.length - 1) {
            dot.fromNode = dot.toNode;
            dot.toNode = pathwayNodes[currentToIdx + 1].idx;
            dot.progress = 0;
          } else {
            // Loop back to start
            dot.fromNode = pathwayNodes[0].idx;
            dot.toNode = pathwayNodes[1].idx;
            dot.progress = 0;
          }
        }

        const fromNode = nodes[dot.fromNode];
        const toNode = nodes[dot.toNode];
        if (!fromNode || !toNode) continue;

        const dotX = lerp(fromNode.x, toNode.x, dot.progress);
        const dotY = lerp(fromNode.y, toNode.y, dot.progress);

        // Glow
        ctx.beginPath();
        ctx.arc(dotX, dotY, ENERGY_DOT_RADIUS + 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${TEAL.r}, ${TEAL.g}, ${TEAL.b}, ${0.1 * energyAlpha})`;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(dotX, dotY, ENERGY_DOT_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${TEAL.r}, ${TEAL.g}, ${TEAL.b}, ${energyAlpha})`;
        ctx.fill();
      }
    }

    // Mobile: simpler energy indication (just brighter pathway lines, no separate dots)
    // Already handled by the pathway connection brightness above.

    // --- Radial vignette overlay ---
    const gradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      Math.min(width, height) * 0.2,
      width / 2,
      height / 2,
      Math.max(width, height) * 0.7
    );
    gradient.addColorStop(0, "rgba(6, 11, 20, 0)");
    gradient.addColorStop(1, "rgba(6, 11, 20, 0.4)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    animFrameRef.current = requestAnimationFrame(render);
  }, []);

  // --- ScrollTrigger integration via GSAP ---
  useGSAP(
    () => {
      if (typeof window === "undefined") return;
      const container = containerRef.current;
      if (!container) return;

      // Animate progressRef.current.value from 0 to 1 on scroll
      gsap.to(progressRef.current, {
        value: 1,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    },
    { scope: containerRef, dependencies: [] }
  );

  // --- Lifecycle: resize, visibility, animation loop ---
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initial setup
    handleResize();

    // Start render loop
    lastTimeRef.current = performance.now();
    animFrameRef.current = requestAnimationFrame(render);

    // Resize listener (debounced)
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 150);
    };
    window.addEventListener("resize", onResize);

    // Visibility listener
    const onVisibility = () => {
      isVisibleRef.current = !document.hidden;
      if (!document.hidden) {
        lastTimeRef.current = performance.now();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      clearTimeout(resizeTimer);
    };
  }, [handleResize, render]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
