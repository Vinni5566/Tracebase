import { useEffect, useRef, useMemo } from "react";

/**
 * Canvas-based immersive SOC background:
 * Layer 1 – deep navy gradient base
 * Layer 2 – slow-drifting animated grid
 * Layer 3 – network nodes + connection lines + packet pulses
 * Layer 4 – floating data particles
 * Layer 5 – radar sweep
 * + Mouse parallax: nearby nodes glow on cursor proximity
 */
export function CyberBackground({
  intensity = "normal",
}: {
  intensity?: "subtle" | "normal" | "intense";
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const raf = useRef<number>(0);

  const cfg = useMemo(
    () => ({
      nodeCount:     intensity === "intense" ? 20 : intensity === "subtle" ? 9  : 14,
      particleCount: intensity === "intense" ? 28 : intensity === "subtle" ? 10 : 18,
      gridOpacity:   intensity === "subtle"  ? 0.04 : 0.07,
      networkOpacity:intensity === "subtle"  ? 0.35 : 0.55,
    }),
    [intensity],
  );

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    // ── Seeded pseudo-random (deterministic for SSR/hydration) ──────────
    let seed = 42;
    function rng() {
      seed = (seed * 1664525 + 1013904223) & 0xffffffff;
      return (seed >>> 0) / 4294967296;
    }

    // ── Resize handler ──────────────────────────────────────────────────
    let W = 0, H = 0;
    function resize() {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W * devicePixelRatio;
      canvas.height = H * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── Build static scene data ─────────────────────────────────────────
    seed = 42; // reset so data matches across re-renders

    const CYAN   = "0,210,255";
    const PURPLE = "150,80,255";

    // Nodes
    type Node = { x: number; y: number; vx: number; vy: number; r: number; col: string; phase: number };
    const nodes: Node[] = Array.from({ length: cfg.nodeCount }, () => ({
      x: rng() * 100, y: rng() * 100,
      vx: (rng() - 0.5) * 0.012, vy: (rng() - 0.5) * 0.012,
      r: 1.5 + rng() * 2.5,
      col: rng() > 0.5 ? CYAN : PURPLE,
      phase: rng() * Math.PI * 2,
    }));

    // Edges (connect nodes within distance 30 in normalised %)
    type Edge = { a: number; b: number };
    const edges: Edge[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        if (Math.hypot(dx, dy) < 30) edges.push({ a: i, b: j });
      }
    }

    // Packets: travel along a subset of edges
    type Packet = { edge: Edge; t: number; speed: number };
    const packets: Packet[] = edges.slice(0, Math.min(8, edges.length)).map(edge => ({
      edge,
      t: rng(),
      speed: 0.002 + rng() * 0.003,
    }));

    // Particles
    type Particle = { x: number; y: number; vx: number; vy: number; r: number; opacity: number; phase: number };
    const particles: Particle[] = Array.from({ length: cfg.particleCount }, () => ({
      x: rng() * 100, y: rng() * 100,
      vx: (rng() - 0.5) * 0.025, vy: -0.01 - rng() * 0.025,
      r: 0.8 + rng() * 1.4,
      opacity: 0.2 + rng() * 0.5,
      phase: rng() * Math.PI * 2,
    }));

    // Radar state
    let radarAngle = 0;

    // Grid drift
    let gridOffset = 0;

    // ── Main render loop ────────────────────────────────────────────────
    let t = 0;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      t += 0.016;
      gridOffset = (gridOffset + 0.04) % 50;

      // ── Layer 1: Base gradient ──────────────────────────────────────
      const base = ctx.createRadialGradient(W * 0.5, H * 0.4, 0, W * 0.5, H * 0.4, Math.max(W, H) * 0.8);
      base.addColorStop(0, "rgba(8,12,28,1)");
      base.addColorStop(0.6, "rgba(4,6,18,1)");
      base.addColorStop(1, "rgba(2,3,10,1)");
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, W, H);

      // Ambient glows
      const g1 = ctx.createRadialGradient(W * 0.15, H * 0.2, 0, W * 0.15, H * 0.2, W * 0.45);
      g1.addColorStop(0, "rgba(80,20,200,0.12)"); g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H);

      const g2 = ctx.createRadialGradient(W * 0.85, H * 0.75, 0, W * 0.85, H * 0.75, W * 0.4);
      g2.addColorStop(0, "rgba(0,180,240,0.10)"); g2.addColorStop(1, "transparent");
      ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);

      // ── Layer 2: Animated grid ──────────────────────────────────────
      const cellPx = W < 640 ? 40 : 60;
      ctx.strokeStyle = `rgba(${CYAN},${cfg.gridOpacity})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      const ox = gridOffset % cellPx;
      for (let x = ox - cellPx; x < W + cellPx; x += cellPx) {
        ctx.moveTo(x, 0); ctx.lineTo(x, H);
      }
      const oy = gridOffset % cellPx;
      for (let y = oy - cellPx; y < H + cellPx; y += cellPx) {
        ctx.moveTo(0, y); ctx.lineTo(W, y);
      }
      ctx.stroke();

      // ── Layer 3a: Update + draw edges ────────────────────────────────
      const mx = mouse.current.x, my = mouse.current.y;
      edges.forEach(({ a, b }) => {
        const ax = nodes[a].x / 100 * W, ay = nodes[a].y / 100 * H;
        const bx = nodes[b].x / 100 * W, by = nodes[b].y / 100 * H;
        // Proximity highlight
        const midX = (ax + bx) / 2, midY = (ay + by) / 2;
        const dist  = Math.hypot(midX - mx, midY - my);
        const boost = dist < 120 ? (1 - dist / 120) * 0.5 : 0;

        const lg = ctx.createLinearGradient(ax, ay, bx, by);
        const op = (0.12 + boost).toFixed(2);
        lg.addColorStop(0,   `rgba(${nodes[a].col},${op})`);
        lg.addColorStop(0.5, `rgba(${CYAN},${(parseFloat(op) * 1.8).toFixed(2)})`);
        lg.addColorStop(1,   `rgba(${nodes[b].col},${op})`);

        ctx.beginPath();
        ctx.moveTo(ax, ay); ctx.lineTo(bx, by);
        ctx.strokeStyle = lg;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      });

      // ── Layer 3b: Packets ────────────────────────────────────────────
      packets.forEach(p => {
        p.t = (p.t + p.speed) % 1;
        const { a, b } = p.edge;
        const ax = nodes[a].x / 100 * W, ay = nodes[a].y / 100 * H;
        const bx = nodes[b].x / 100 * W, by = nodes[b].y / 100 * H;
        const px = ax + (bx - ax) * p.t;
        const py = ay + (by - ay) * p.t;
        const alpha = Math.sin(p.t * Math.PI);
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${CYAN},${(alpha * cfg.networkOpacity).toFixed(2)})`;
        ctx.fill();
        // Trail glow
        ctx.beginPath();
        ctx.arc(px, py, 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${CYAN},${(alpha * 0.15).toFixed(2)})`;
        ctx.fill();
      });

      // ── Layer 3c: Update + draw nodes ───────────────────────────────
      nodes.forEach(n => {
        n.x = (n.x + n.vx + 100) % 100;
        n.y = (n.y + n.vy + 100) % 100;

        const nx = n.x / 100 * W, ny = n.y / 100 * H;
        const dist = Math.hypot(nx - mx, ny - my);
        const proximity = dist < 100 ? 1 - dist / 100 : 0;
        const pulse = 0.4 + 0.4 * Math.sin(t * 1.6 + n.phase);

        // Outer glow
        const glow = ctx.createRadialGradient(nx, ny, 0, nx, ny, n.r * (4 + proximity * 6));
        glow.addColorStop(0, `rgba(${n.col},${((pulse + proximity) * 0.55).toFixed(2)})`);
        glow.addColorStop(1, `rgba(${n.col},0)`);
        ctx.beginPath();
        ctx.arc(nx, ny, n.r * (4 + proximity * 6), 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(nx, ny, n.r * (0.8 + proximity * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${n.col},${(0.7 + proximity * 0.3).toFixed(2)})`;
        ctx.fill();
      });

      // ── Layer 4: Particles ───────────────────────────────────────────
      particles.forEach(p => {
        p.x = (p.x + p.vx + 100) % 100;
        p.y = ((p.y + p.vy) + 100) % 100;
        const px = p.x / 100 * W, py = p.y / 100 * H;
        const flicker = p.opacity * (0.6 + 0.4 * Math.sin(t * 2.5 + p.phase));
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${CYAN},${flicker.toFixed(2)})`;
        ctx.fill();
      });

      // ── Layer 5: Radar sweep (top-right quarter) ─────────────────────
      radarAngle = (radarAngle + 0.004) % (Math.PI * 2);
      const rCx = W * 0.88, rCy = H * 0.08, rR = Math.min(W, H) * 0.18;

      // Radar rings
      [1, 0.7, 0.4].forEach((f, i) => {
        ctx.beginPath();
        ctx.arc(rCx, rCy, rR * f, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${CYAN},${0.05 - i * 0.01})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Sweep cone

      ctx.save();
      ctx.translate(rCx, rCy);
      ctx.rotate(radarAngle);
      const cone = ctx.createLinearGradient(0, 0, rR, 0);
      cone.addColorStop(0,   `rgba(${CYAN},0.18)`);
      cone.addColorStop(0.6, `rgba(${CYAN},0.06)`);
      cone.addColorStop(1,   `rgba(${CYAN},0)`);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, rR, 0, Math.PI / 3);
      ctx.closePath();
      ctx.fillStyle = cone;
      ctx.fill();
      ctx.restore();

      // ── Vignette ─────────────────────────────────────────────────────
      const vig = ctx.createRadialGradient(W/2, H/2, H * 0.2, W/2, H/2, Math.max(W, H) * 0.85);
      vig.addColorStop(0, "transparent");
      vig.addColorStop(1, "rgba(2,3,10,0.70)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      // ── Scan line ────────────────────────────────────────────────────
      const scanY = ((t * 60) % (H + 40)) - 40;
      const scan = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2);
      scan.addColorStop(0, "transparent");
      scan.addColorStop(0.5, `rgba(${CYAN},0.18)`);
      scan.addColorStop(1, "transparent");
      ctx.fillStyle = scan;
      ctx.fillRect(0, scanY - 2, W, 4);

      // ── HUD corners ──────────────────────────────────────────────────
      const cornerSize = 18, cornerPad = 20;
      ctx.strokeStyle = `rgba(${CYAN},0.35)`;
      ctx.lineWidth = 1;
      const corners = [
        [cornerPad, cornerPad, 1, 1],
        [W - cornerPad, cornerPad, -1, 1],
        [cornerPad, H - cornerPad, 1, -1],
        [W - cornerPad, H - cornerPad, -1, -1],
      ] as const;
      corners.forEach(([cx, cy, dx, dy]) => {
        ctx.beginPath();
        ctx.moveTo(cx, cy + dy * cornerSize);
        ctx.lineTo(cx, cy);
        ctx.lineTo(cx + dx * cornerSize, cy);
        ctx.stroke();
      });

      raf.current = requestAnimationFrame(draw);
    }

    raf.current = requestAnimationFrame(draw);

    // ── Mouse tracking ──────────────────────────────────────────────────
    function onMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, [cfg]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 size-full"
      aria-hidden
    />
  );
}
