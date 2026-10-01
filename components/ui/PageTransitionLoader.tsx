'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  CircularProgress,
  CircularProgressIndicator,
  CircularProgressTrack,
  CircularProgressRange,
  CircularProgressValueText,
} from '@/components/ui/circular-progress';

function PageTransitionLoaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const isFirstRender = React.useRef(true);

  // Trigger smooth progress animation only on actual route navigation
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return Math.min(95, prev + 15);
      });
    }, 35);

    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }, 300);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [pathname, searchParams]);

  // Intercept local link clicks for instant visual feedback
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (anchor && anchor.href && anchor.href.startsWith(window.location.origin)) {
        const url = new URL(anchor.href);
        if (url.pathname !== window.location.pathname) {
          setLoading(true);
          setProgress(20);
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  if (!loading) return null;

  const clampedProgress = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <div className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0B0B0E]/85 backdrop-blur-xl text-white transition-opacity duration-300 animate-fadeIn">
      <div className="flex flex-col items-center gap-5 p-8 rounded-3xl bg-[#121216] border border-zinc-800 shadow-2xl">
        <CircularProgress value={clampedProgress} size={72} thickness={6} className="text-red-500">
          <CircularProgressIndicator>
            <CircularProgressTrack className="text-zinc-800" />
            <CircularProgressRange className="text-red-500" />
          </CircularProgressIndicator>
          <CircularProgressValueText className="text-white font-mono font-bold text-xs" />
        </CircularProgress>
        
        <div className="flex flex-col items-center text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-red-400 animate-pulse">
            Switching View...
          </span>
          <span className="text-[11px] text-zinc-400 font-mono mt-1">
            Loading section data
          </span>
        </div>
      </div>
    </div>
  );
}

export default function PageTransitionLoader() {
  return (
    <Suspense fallback={null}>
      <PageTransitionLoaderContent />
    </Suspense>
  );
}
