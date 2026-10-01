'use client';

import React, { useEffect, useRef } from 'react';

export interface MouseTrailProps {
  variant?: 'line' | 'dots' | 'particles' | 'pixel';
  fillType?: 'solid' | 'gradient';
  trailColor?: string;
  trailColorEnd?: string;
  trailLength?: number;
  lineWidth?: number;
  fadeOut?: boolean;
  smoothing?: number;
  dotSize?: number;
  dotSpacing?: number;
  particleCount?: number;
  particleSize?: number;
  spreadAngle?: number;
  drift?: number;
  pixelSize?: number;
  snapToGrid?: boolean;
  blendMode?: GlobalCompositeOperation;
  autoFade?: boolean;
  fadeDuration?: number;
  style?: React.CSSProperties;
}

function parseColor(col: string) {
  if (col.startsWith('#')) {
    let hex = col.slice(1);
    if (hex.length === 3) {
      hex = hex.split('').map((c) => c + c).join('');
    }
    return {
      r: parseInt(hex.slice(0, 2), 16) || 0,
      g: parseInt(hex.slice(2, 4), 16) || 0,
      b: parseInt(hex.slice(4, 6), 16) || 0,
    };
  } else if (col.startsWith('rgb')) {
    const m = col.match(/\d+/g);
    return m ? { r: +m[0], g: +m[1], b: +m[2] } : { r: 0, g: 0, b: 0 };
  }
  return { r: 0, g: 0, b: 0 };
}

export default function MouseTrail(props: MouseTrailProps) {
  const {
    variant = 'line',
    fillType = 'gradient',
    trailColor = '#FF3B30',
    trailColorEnd = '#FF9500',
    trailLength = 24,
    lineWidth = 4,
    fadeOut = true,
    smoothing = 0.3,
    dotSize = 6,
    dotSpacing = 10,
    particleCount = 6,
    particleSize = 3,
    spreadAngle = 30,
    drift = 0.4,
    pixelSize = 6,
    snapToGrid = true,
    blendMode = 'source-over',
    autoFade = true,
    fadeDuration = 1.5,
    style,
  } = props;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const trailPointsRef = useRef<Array<{ x: number; y: number; life: number }>>([]);
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; life: number; size: number }>>([]);
  const rafRef = useRef<number | undefined>(undefined);
  const timeRef = useRef<number>(performance.now());
  const propsRef = useRef(props);

  useEffect(() => {
    propsRef.current = props;
  }, [props]);

  useEffect(() => {
    if (variant !== 'particles') particlesRef.current = [];
  }, [variant]);

  // Handle Resize
  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Pointer Move Tracking
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      const p = propsRef.current;
      const points = trailPointsRef.current;
      const last = points[points.length - 1];

      if (p.variant === 'dots' && last) {
        const dx = x - last.x;
        const dy = y - last.y;
        if (Math.hypot(dx, dy) < (p.dotSpacing ?? 10)) return;
      }

      const s = Math.max(0.001, 1 - (p.smoothing ?? 0.3));
      const sx = last ? last.x + (x - last.x) * s : x;
      const sy = last ? last.y + (y - last.y) * s : y;

      points.push({ x: sx, y: sy, life: 1 });

      const maxLen = p.trailLength ?? 24;
      if (points.length > maxLen) {
        points.splice(0, points.length - maxLen);
      }

      if (p.variant === 'particles' && last) {
        const dx = sx - last.x;
        const dy = sy - last.y;
        const speed = Math.hypot(dx, dy);
        if (speed > 2) {
          const angle = Math.atan2(dy, dx);
          const spread = ((p.spreadAngle ?? 30) * Math.PI) / 180;
          const count = p.particleCount ?? 6;
          for (let i = 0; i < count; i++) {
            const a = angle + (Math.random() - 0.5) * spread;
            const v = speed * 0.1 + Math.random() * 2;
            particlesRef.current.push({
              x: sx,
              y: sy,
              vx: Math.cos(a) * v,
              vy: Math.sin(a) * v,
              life: 0.8 + Math.random() * 0.4,
              size: (p.particleSize ?? 3) + Math.random() * 1.5,
            });
          }
        }
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  // Animation Loop
  useEffect(() => {
    timeRef.current = performance.now();

    const animate = () => {
      const now = performance.now();
      let dt = (now - timeRef.current) / 1000;
      dt = Math.max(0, Math.min(dt, 0.05));
      timeRef.current = now;

      const canvas = canvasRef.current;
      if (!canvas) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const p = propsRef.current;
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      ctx.globalCompositeOperation = p.blendMode ?? 'source-over';
      ctx.clearRect(0, 0, width, height);

      const rgbStart = parseColor(p.trailColor ?? '#FF3B30');
      const rgbEnd = parseColor(p.trailColorEnd ?? '#FF9500');

      const rgba = (a: number, t: number) => {
        if (p.fillType === 'gradient') {
          const r = rgbStart.r + (rgbEnd.r - rgbStart.r) * t;
          const g = rgbStart.g + (rgbEnd.g - rgbStart.g) * t;
          const b = rgbStart.b + (rgbEnd.b - rgbStart.b) * t;
          return `rgba(${r | 0},${g | 0},${b | 0},${Math.max(0, Math.min(1, a))})`;
        }
        return `rgba(${rgbStart.r},${rgbStart.g},${rgbStart.b},${Math.max(0, Math.min(1, a))})`;
      };

      const points = trailPointsRef.current;

      if ((p.autoFade ?? true) && points.length) {
        const decay = dt / Math.max(0.001, p.fadeDuration ?? 1.5);
        for (let i = points.length - 1; i >= 0; i--) {
          points[i].life -= decay;
          if (points[i].life <= 0) points.splice(i, 1);
        }
      }

      const indexAlpha = (i: number, n: number) => {
        if (!p.fadeOut) return 1;
        const t = n <= 1 ? 1 : i / (n - 1);
        return 1 - (1 - t) * (1 - t);
      };

      if (points.length < 1) {
        if (p.variant === 'particles') {
          const particles = particlesRef.current;
          const damping = Math.pow(0.98, dt * 60);
          const g = (p.drift ?? 0.4) * 60 * 0.001 * dt * 60;
          const decayP = 1.6 * dt;
          for (let i = particles.length - 1; i >= 0; i--) {
            const pt = particles[i];
            pt.x += pt.vx * dt * 60;
            pt.y += pt.vy * dt * 60;
            pt.vx *= damping;
            pt.vy = pt.vy * damping + g;
            pt.life -= decayP;
            if (pt.life <= 0) {
              particles[i] = particles[particles.length - 1];
              particles.pop();
            } else {
              ctx.fillStyle = rgba(pt.life, 1 - pt.life);
              ctx.beginPath();
              ctx.arc(pt.x, pt.y, pt.size * pt.life, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      if (p.variant === 'dots') {
        for (let i = 0; i < points.length; i++) {
          const pt = points[i];
          const t = i / (points.length - 1 || 1);
          const a = indexAlpha(i, points.length) * (p.autoFade ? pt.life : 1);
          const r = (p.dotSize ?? 6) * (p.fadeOut ? 0.3 + 0.7 * a : 1);
          ctx.fillStyle = rgba(a, t);
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (p.variant === 'pixel') {
        const pxSize = p.pixelSize ?? 6;
        for (let i = 0; i < points.length; i++) {
          let { x, y } = points[i];
          if (p.snapToGrid !== false) {
            x = Math.round(x / pxSize) * pxSize;
            y = Math.round(y / pxSize) * pxSize;
          }
          const t = i / (points.length - 1 || 1);
          const a = indexAlpha(i, points.length) * (p.autoFade ? points[i].life : 1);
          const s = pxSize * (p.fadeOut ? 0.6 + 0.4 * a : 1);
          ctx.fillStyle = rgba(a, t);
          ctx.fillRect(x - s / 2, y - s / 2, s, s);
        }
      } else if (p.variant === 'particles') {
        const particles = particlesRef.current;
        const damping = Math.pow(0.98, dt * 60);
        const g = (p.drift ?? 0.4) * 60 * 0.001 * dt * 60;
        const decayP = 1.6 * dt;
        for (let i = particles.length - 1; i >= 0; i--) {
          const pt = particles[i];
          pt.x += pt.vx * dt * 60;
          pt.y += pt.vy * dt * 60;
          pt.vx *= damping;
          pt.vy = pt.vy * damping + g;
          pt.life -= decayP;
          if (pt.life <= 0) {
            particles[i] = particles[particles.length - 1];
            particles.pop();
          } else {
            ctx.fillStyle = rgba(pt.life, 1 - pt.life);
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, pt.size * pt.life, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        if (points.length > 1) {
          for (let i = 1; i < points.length; i++) {
            const p1 = points[i - 1];
            const p2 = points[i];
            const lifeFactor = p.autoFade ? points[i].life : 1;
            const a = 0.15 * indexAlpha(i, points.length) * lifeFactor;
            ctx.strokeStyle = rgba(a, i / (points.length - 1 || 1));
            ctx.lineWidth = Math.max(1, (p.lineWidth ?? 3) * 0.5 * a);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      } else {
        // Line variant
        if (points.length < 2) {
          const pt = points[0];
          const a = p.autoFade ? pt.life : 1;
          ctx.fillStyle = rgba(a, 0);
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, Math.max(1, (p.lineWidth ?? 4) / 2), 0, Math.PI * 2);
          ctx.fill();
        } else {
          for (let i = 1; i < points.length; i++) {
            const p1 = points[i - 1];
            const p2 = points[i];
            const t = i / (points.length - 1 || 1);
            const lifeFactor = p.autoFade ? points[i].life : 1;
            const a = indexAlpha(i, points.length) * lifeFactor;
            const widthScale = p.fadeOut ? 0.3 + 0.7 * a : 1;
            ctx.strokeStyle = rgba(a, t);
            ctx.lineWidth = Math.max(1, (p.lineWidth ?? 4) * widthScale);
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99999,
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
        aria-label="Interactive mouse trail animation"
      />
    </div>
  );
}
