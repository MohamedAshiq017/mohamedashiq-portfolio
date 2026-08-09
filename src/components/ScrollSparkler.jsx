import { useEffect, useRef } from "react";

/**
 * ScrollSparkler
 * A scroll-down indicator with a golden sparkler effect falling
 * from the tip of the indicator line, like sparks off a sparkler cracker.
 *
 * Usage:
 *   <ScrollSparkler />
 * Place it absolutely/fixed at the bottom of your hero section.
 */
export default function ScrollSparkler({
  height = 140,
  width = 60,
  color = "245,197,110", // base spark RGB (mid-life gold)
  tipY = 90,
  className = "",
  style = {},
}) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.scale(dpr, dpr);

    const trackX = width / 2;

    function spawnParticle(x, y) {
      particlesRef.current.push({
        baseX: x,
        y,
        trail: [],
        swirlPhase: Math.random() * Math.PI * 2,
        swirlSpeed: 0.06 + Math.random() * 0.05,
        swirlRadius: 9 + Math.random() * 14,
        vy: 0.15 + Math.random() * 0.4,
        life: 1,
        decay: 0.006 + Math.random() * 0.009,
        size: 2.5 + Math.random() * 2.5,
        rot: Math.random() * Math.PI,
        rotSpeed: (Math.random() - 0.5) * 0.06,
        flicker: Math.random() * Math.PI * 2,
      });
    }

    // soft-edged 4-point "sparkle" star, glowing
    function drawStar(x, y, size, rot, alpha, hue) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = alpha;
      ctx.shadowColor = `rgba(${hue},0.9)`;
      ctx.shadowBlur = size * 3;
      ctx.fillStyle = `rgba(${hue},1)`;
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.quadraticCurveTo(size * 0.15, -size * 0.15, size, 0);
      ctx.quadraticCurveTo(size * 0.15, size * 0.15, 0, size);
      ctx.quadraticCurveTo(-size * 0.15, size * 0.15, -size, 0);
      ctx.quadraticCurveTo(-size * 0.15, -size * 0.15, 0, -size);
      ctx.fill();
      ctx.restore();
    }

    function tick() {
      ctx.clearRect(0, 0, width, height);

      if (Math.random() < 0.55) {
        spawnParticle(trackX + (Math.random() - 0.5) * 5, tipY);
      }

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.y += p.vy;
        p.vy += 0.012;
        p.swirlPhase += p.swirlSpeed;
        p.rot += p.rotSpeed;
        p.life -= p.decay;
        p.flicker += 0.3;

        const swirlDamp = Math.max(0, p.life);
        const x = p.baseX + Math.sin(p.swirlPhase) * p.swirlRadius * swirlDamp;

        p.trail.push({ x, y: p.y });
        if (p.trail.length > 10) p.trail.shift();

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const flick = 0.5 + Math.sin(p.flicker) * 0.5;
        const alpha = Math.max(0, p.life * flick);
        const hue =
          p.life > 0.65
            ? "255,245,220"
            : p.life > 0.3
            ? color
            : "212,150,70";

        // faint curved wisp trail behind the particle
        if (p.trail.length > 2) {
          ctx.save();
          ctx.globalAlpha = alpha * 0.35;
          ctx.strokeStyle = `rgba(${hue},1)`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let j = 1; j < p.trail.length; j++) {
            ctx.lineTo(p.trail[j].x, p.trail[j].y);
          }
          ctx.stroke();
          ctx.restore();
        }

        drawStar(x, p.y, p.size * (0.5 + p.life * 0.5), p.rot, alpha, hue);
      }
      ctx.shadowBlur = 0;

      rafRef.current = requestAnimationFrame(tick);
    }

    tick();
    return () => cancelAnimationFrame(rafRef.current);
  }, [width, height, color]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", pointerEvents: "none", ...style }}
      aria-hidden="true"
    />
  );
}
