'use client';

import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';

export interface InfiniteGridItem {
  image: string;
  href?: string;
}

export interface InfiniteGridProps {
  items: InfiniteGridItem[];
  itemSize?: number;
  gap?: number;
  maxSpeed?: number;
  damping?: number;
  magnify?: number;
  radius?: number;
  fitMode?: 'square' | 'original';
  className?: string;
  style?: React.CSSProperties;
}

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function normalizeImage(v: any): string | null {
  if (!v) return null;
  if (typeof v === 'string') return v;
  if (typeof v?.src === 'string') return v.src;
  return null;
}

function normalizeHref(h?: string): string | null {
  if (!h || typeof h !== 'string') return null;
  const s = h.trim();
  if (!s) return null;
  if (s.startsWith('http://') || s.startsWith('https://')) return s;
  return s.startsWith('/') ? s : `/${s}`;
}

const roundToDpr = (v: number) => {
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  return Math.round(v * dpr) / dpr;
};

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 1831565813) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function hashString(s: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function buildTile(images: any[], tileW: number, tileH: number, seed: number) {
  const n = images.length;
  const tile = new Int32Array(tileW * tileH);
  tile.fill(0);
  if (n <= 0) return tile;

  const rnd = mulberry32(seed);
  const bag = Array.from({ length: n }, (_, i) => i);
  const shuffle = () => {
    for (let i = bag.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [bag[i], bag[j]] = [bag[j], bag[i]];
    }
  };

  shuffle();
  let ptr = 0;
  const next = () => {
    const v = bag[ptr++ % bag.length];
    if (ptr % bag.length === 0) shuffle();
    return v;
  };

  const MAX_TRIES = 80;
  for (let y = 0; y < tileH; y++) {
    for (let x = 0; x < tileW; x++) {
      let di = next();
      let tries = 0;
      const left = x > 0 ? tile[y * tileW + (x - 1)] : -1;
      const up = y > 0 ? tile[(y - 1) * tileW + x] : -1;
      const ul = x > 0 && y > 0 ? tile[(y - 1) * tileW + (x - 1)] : -1;
      const ur = x < tileW - 1 && y > 0 ? tile[(y - 1) * tileW + (x + 1)] : -1;

      while (tries < MAX_TRIES && n > 1 && (di === left || di === up || di === ul || di === ur)) {
        di = next();
        tries++;
      }
      tile[y * tileW + x] = di;
    }
  }
  return tile;
}

export default function InfiniteGrid({
  items = [],
  itemSize = 220,
  gap = 30,
  maxSpeed = 260,
  damping = 0.7,
  magnify = 0.45,
  radius = 220,
  fitMode = 'square',
  className = '',
  style = {},
}: InfiniteGridProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const worldRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  const inside = useRef(false);
  const target = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const pointerPx = useRef({ x: 0, y: 0, has: false });

  const offset = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });
  const baseCell = useRef({ bx: 0, by: 0 });
  const cellsRef = useRef<any[]>([]);

  const data = useMemo(() => {
    const out: Array<{ src: string; href?: string }> = [];
    for (const it of items || []) {
      const src = normalizeImage(it.image);
      if (!src) continue;
      const href = normalizeHref(it.href);
      out.push({ src, href: href ?? undefined });
    }
    return out;
  }, [items]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect;
      if (!r) return;
      if (r.width > 10 && r.height > 10) setSize({ w: r.width, h: r.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const isIn = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      inside.current = isIn;
      if (!isIn) {
        target.current = { x: 0, y: 0 };
        pointerPx.current = { x: 0, y: 0, has: false };
        return;
      }
      pointerPx.current = { x, y, has: true };
      const nx = x / rect.width - 0.5;
      const ny = y / rect.height - 0.5;
      target.current = { x: clamp(nx, -0.5, 0.5), y: clamp(ny, -0.5, 0.5) };
    };

    const onBlur = () => {
      inside.current = false;
      target.current = { x: 0, y: 0 };
      pointerPx.current = { x: 0, y: 0, has: false };
    };

    window.addEventListener('pointermove', onMove, { capture: true });
    window.addEventListener('blur', onBlur);
    return () => {
      window.removeEventListener('pointermove', onMove, true);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  const step = Math.max(1, itemSize + gap);
  const overscan = 2;
  const cols = Math.max(1, Math.ceil((size.w || 900) / step) + 2 * overscan);
  const rows = Math.max(1, Math.ceil((size.h || 600) / step) + 2 * overscan);

  const tileSize = useMemo(() => {
    const n = data.length;
    const targetCells = clamp(Math.max(81, Math.min(256, n * 3 || 81)), 81, 256);
    const s = Math.ceil(Math.sqrt(targetCells));
    return clamp(s, 9, 18);
  }, [data.length]);

  const tileW = tileSize;
  const tileH = tileSize;

  const tile = useMemo(() => {
    const seedBase =
      (data.length * 1315423911 + tileW * 374761393 + tileH * 668265263 + Math.floor(itemSize * 7) + Math.floor(gap * 3)) >>> 0;
    let srcHash = 0;
    for (let i = 0; i < data.length; i++) srcHash ^= hashString(data[i].src);
    const seed = (seedBase ^ srcHash) >>> 0;
    return buildTile(data, tileW, tileH, seed);
  }, [data, tileW, tileH, itemSize, gap]);

  const objectFit = fitMode === 'original' ? 'contain' : 'cover';

  const applyAssignment = useCallback(() => {
    if (!data.length) return;
    const bx = baseCell.current.bx;
    const by = baseCell.current.by;

    for (const cell of cellsRef.current) {
      const gx = bx + (cell.c - overscan);
      const gy = by + (cell.r - overscan);
      if (gx === cell.gx && gy === cell.gy) continue;
      cell.gx = gx;
      cell.gy = gy;
      const tx = mod(gx, tileW);
      const ty = mod(gy, tileH);
      const di = tile[ty * tileW + tx] % data.length;
      const item = data[di];
      if (!item) continue;

      const src = item.src;
      const href = item.href;

      if (cell.src !== src) {
        cell.src = src;
        cell.img.src = src;
      }

      if (href) {
        if (cell.href !== href) {
          cell.href = href;
          cell.a.href = href;
        }
        cell.a.target = '_blank';
        cell.a.rel = 'noopener noreferrer';
        cell.a.style.pointerEvents = 'auto';
        cell.a.style.cursor = 'pointer';
      } else {
        cell.href = undefined;
        cell.a.removeAttribute('href');
        cell.a.style.pointerEvents = 'none';
        cell.a.style.cursor = 'default';
      }
    }
  }, [data, tile, tileW, tileH]);

  useEffect(() => {
    offset.current = { x: 0, y: 0 };
    vel.current = { x: 0, y: 0 };
    baseCell.current = { bx: 0, by: 0 };
    requestAnimationFrame(() => applyAssignment());
  }, [cols, rows, data.length, tileW, tileH, fitMode, itemSize, gap, magnify, applyAssignment]);

  useEffect(() => {
    if (!rootRef.current || !worldRef.current) return;
    if (!data.length) return;

    let raf = 0;
    let last = performance.now();
    const sigma = Math.max(1, radius) * 0.55;
    const sigma2 = 2 * sigma * sigma;
    const mag = Math.max(0, magnify);

    const tick = () => {
      const now = performance.now();
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;

      const k = clamp(1 - damping, 0.03, 0.35);
      smooth.current.x = lerp(smooth.current.x, target.current.x, k);
      smooth.current.y = lerp(smooth.current.y, target.current.y, k);

      const cx = inside.current ? smooth.current.x / 0.5 : 0;
      const cy = inside.current ? smooth.current.y / 0.5 : 0;

      vel.current.x = lerp(vel.current.x, cx * maxSpeed, k);
      vel.current.y = lerp(vel.current.y, cy * maxSpeed, k);

      offset.current.x += vel.current.x * dt;
      offset.current.y += vel.current.y * dt;

      const bx = Math.floor(offset.current.x / step);
      const by = Math.floor(offset.current.y / step);
      const lx = offset.current.x - bx * step;
      const ly = offset.current.y - by * step;

      if (bx !== baseCell.current.bx || by !== baseCell.current.by) {
        baseCell.current = { bx, by };
        applyAssignment();
      }

      if (worldRef.current) {
        worldRef.current.style.transform = `translate3d(${roundToDpr(-lx)}px, ${roundToDpr(-ly)}px, 0)`;
      }

      const hasFocus = inside.current && pointerPx.current.has && mag > 0 && radius > 0;
      if (!hasFocus) {
        for (const cell of cellsRef.current) cell.a.style.setProperty('--s', '1');
      } else {
        const px = pointerPx.current.x;
        const py = pointerPx.current.y;
        for (const cell of cellsRef.current) {
          const cxv = cell.px - lx + itemSize / 2;
          const cyv = cell.py - ly + itemSize / 2;
          const dx = cxv - px;
          const dy = cyv - py;
          const d2 = dx * dx + dy * dy;
          const g = Math.exp(-d2 / sigma2);
          let s = 1 + mag * g;
          s = Math.round(s * 800) / 800;
          cell.a.style.setProperty('--s', String(s));
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [data.length, step, itemSize, maxSpeed, damping, magnify, radius, applyAssignment]);

  if (!data.length) {
    return <div ref={rootRef} style={{ width: '100%', height: '100%', minHeight: 400, background: 'transparent' }} />;
  }

  cellsRef.current = [];
  const nodes = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const px = c * step;
      const py = r * step;
      nodes.push(
        <a
          key={`cell-${r}-${c}`}
          ref={(el) => {
            if (!el) return;
            const img = el.querySelector('img');
            if (!img) return;
            el.style.setProperty('--s', '1');
            el.style.pointerEvents = 'none';
            el.style.cursor = 'default';
            cellsRef.current.push({
              a: el,
              img,
              r,
              c,
              px,
              py,
              gx: Number.NaN,
              gy: Number.NaN,
              di: -1,
              src: '',
              href: undefined,
            });
          }}
          style={{
            position: 'absolute',
            left: px,
            top: py,
            width: itemSize,
            height: itemSize,
            display: 'block',
            overflow: 'hidden',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'rgba(20, 20, 25, 0.6)',
            transform: 'scale(var(--s, 1))',
            transformOrigin: 'center center',
            willChange: 'transform',
            textDecoration: 'none',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
          }}
        >
          <img
            src={data[0]?.src || ''}
            alt=""
            draggable={false}
            loading="lazy"
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
              objectFit,
              objectPosition: 'center',
              pointerEvents: 'none',
            }}
          />
        </a>
      );
    }
  }

  return (
    <div
      ref={rootRef}
      className={`w-full h-full relative overflow-hidden select-none touch-none ${className}`}
      style={{
        width: '100%',
        height: '100%',
        minHeight: 450,
        position: 'relative',
        overflow: 'hidden',
        background: 'transparent',
        userSelect: 'none',
        touchAction: 'none',
        ...style,
      }}
    >
      <div
        ref={worldRef}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: cols * step,
          height: rows * step,
          transform: 'translate3d(0px, 0px, 0px)',
          willChange: 'transform',
        }}
      >
        {nodes}
      </div>
    </div>
  );
}
