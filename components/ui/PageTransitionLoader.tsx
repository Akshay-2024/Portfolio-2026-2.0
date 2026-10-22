'use client';

import React, { useEffect, useState, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  CircularProgress,
  CircularProgressIndicator,
  CircularProgressTrack,
  CircularProgressRange,
  CircularProgressValueText,
} from '@/components/ui/circular-progress';

function getDestinationLabel(pathname: string): { title: string; subtitle: string } {
  if (pathname.includes('/collections/images')) {
    return { title: 'Opening Captures', subtitle: 'Curated Photography & Studies' };
  }
  if (pathname.includes('/collections/projects')) {
    return { title: 'Opening Projects', subtitle: 'Full-Stack Apps & Systems' };
  }
  if (pathname.includes('/collections/certificates')) {
    return { title: 'Opening Honors', subtitle: 'Verified Credentials & Awards' };
  }
  if (pathname.includes('/collections/films') || pathname.includes('/collections/videos')) {
    return { title: 'Opening Films', subtitle: 'Cinematic Visual Media' };
  }
  if (pathname === '/' || pathname === '') {
    return { title: 'Returning to Portfolio', subtitle: 'Main Showcase' };
  }
  return { title: 'Switching View', subtitle: 'Loading section data...' };
}

function PageTransitionLoaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [targetPath, setTargetPath] = useState('');

  const isFirstRender = useRef(true);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);
  const safetyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const finishTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startLoader = (destination: string) => {
    // Clear any existing timers
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
    if (finishTimeoutRef.current) clearTimeout(finishTimeoutRef.current);

    setTargetPath(destination);
    setIsFading(false);
    setIsLoading(true);
    setProgress(15);

    // Smoothly increment progress towards 90% while waiting for page load
    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 88) {
          if (progressTimerRef.current) clearInterval(progressTimerRef.current);
          return 88;
        }
        const delta = Math.max(2, Math.floor((90 - prev) * 0.28));
        return Math.min(88, prev + delta);
      });
    }, 45);

    // Hard safety timeout in case navigation is cancelled or delayed
    safetyTimeoutRef.current = setTimeout(() => {
      completeLoader();
    }, 3500);
  };

  const completeLoader = () => {
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = null;
    }

    setProgress(100);

    // Hold at 100% briefly so the user sees complete ring
    finishTimeoutRef.current = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsFading(false);
        setProgress(0);
        setTargetPath('');
      }, 260);
    }, 160);
  };

  // Trigger completion when pathname or searchParams change (navigation succeeded)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (isLoading) {
      completeLoader();
    }
  }, [pathname, searchParams]);

  // Intercept internal link clicks for immediate responsive visual feedback
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Ignore modified clicks (new tab, etc.) or right/middle clicks
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor || !anchor.href) return;

      // Skip download links or links opening in a new tab/window
      if (anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) {
        return;
      }

      // Check if URL belongs to this domain
      if (anchor.href.startsWith(window.location.origin)) {
        try {
          const url = new URL(anchor.href);

          // Skip static document and media files
          const staticFilePattern = /\.(pdf|zip|tar|gz|rar|7z|doc|docx|xls|xlsx|ppt|pptx|png|jpg|jpeg|svg|webp|gif|mp3|mp4|wav|avi|mov)$/i;
          if (staticFilePattern.test(url.pathname)) {
            return;
          }

          // Skip hash anchors on the same pathname (e.g. #images, #contact on homepage)
          if (url.pathname === window.location.pathname) {
            return;
          }

          // It's a page transition! Trigger the 2nd loader immediately
          startLoader(url.pathname);
        } catch {
          // ignore
        }
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
      if (finishTimeoutRef.current) clearTimeout(finishTimeoutRef.current);
    };
  }, []);

  if (!isLoading) return null;

  const labels = getDestinationLabel(targetPath || pathname);
  const clampedProgress = Math.min(100, Math.max(0, Math.round(progress)));

  return (
    <>
      {/* Top glowing gradient progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[100000] pointer-events-none">
        <div
          className="h-[3px] bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 transition-all duration-150 ease-out shadow-[0_0_12px_rgba(239,68,68,0.8)]"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>

      {/* Luxury Backdrop & Center Progress Card */}
      <div
        className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black/85 backdrop-blur-xl text-white transition-opacity duration-250 ease-out select-none ${
          isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-live="polite"
        role="status"
      >
        <div className="flex flex-col items-center gap-5 p-7 rounded-3xl bg-[#121216]/95 border border-zinc-800/80 shadow-2xl backdrop-blur-2xl max-w-xs w-[90vw]">
          {/* Circular Progress Gauge */}
          <CircularProgress value={clampedProgress} size={72} thickness={6} className="text-red-500">
            <CircularProgressIndicator>
              <CircularProgressTrack className="text-zinc-800" />
              <CircularProgressRange className="text-red-500 transition-all duration-150" />
            </CircularProgressIndicator>
            <CircularProgressValueText className="text-white font-mono font-bold text-xs" />
          </CircularProgress>

          {/* Dynamic Destination Text */}
          <div className="flex flex-col items-center text-center gap-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 font-bold text-[10px] uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>{labels.title}</span>
            </div>
            <span className="text-xs text-zinc-400 font-medium">
              {labels.subtitle}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default function PageTransitionLoader() {
  return (
    <Suspense fallback={null}>
      <PageTransitionLoaderContent />
    </Suspense>
  );
}

