'use client';

import React, { useEffect, useRef, useState } from 'react';

export const MainLoader: React.FC = () => {
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [canSkip, setCanSkip] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const completedRef = useRef(false);

  const handleComplete = () => {
    if (completedRef.current) return;
    completedRef.current = true;

    // Restore body scrolling
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';

    setIsExiting(true);
    setTimeout(() => {
      setIsFinished(true);
    }, 700);
  };

  useEffect(() => {
    // Lock scrolling while loader is displaying
    const prevDocOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // Show subtle skip button after 1.2 seconds
    const skipTimer = setTimeout(() => {
      setCanSkip(true);
    }, 1200);

    // Hard safety timeout: video is 3.23s, guarantee dismissal by 3.8s under all circumstances
    const safetyTimer = setTimeout(() => {
      handleComplete();
    }, 3800);

    // Ensure video autoplays reliably across all browsers/mobile devices
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // In case autoplay is restricted by low-power mode, fallback to safety timer
        });
      }
    }

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(safetyTimer);
      document.documentElement.style.overflow = prevDocOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, []);

  if (isFinished) return null;

  return (
    <div
      className={`fixed inset-0 z-[999999] flex items-center justify-center bg-black transition-all duration-700 ease-out select-none ${
        isExiting ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
      style={{
        backgroundColor: '#000000',
      }}
      aria-hidden={isExiting}
      role="dialog"
      aria-label="Loading animation"
    >
      {/* Centered Intro Animation Video */}
      <div className="relative flex items-center justify-center w-full h-full max-w-5xl max-h-[85vh] p-4">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleComplete}
          onError={handleComplete}
          className="w-full h-full object-contain pointer-events-none"
        >
          <source src="/main-loader.mp4" type="video/mp4" />
          <source src="/main%20loader.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Subtle Skip Option */}
      {canSkip && !isExiting && (
        <button
          type="button"
          onClick={handleComplete}
          className="absolute top-6 right-6 z-10 px-4 py-1.5 rounded-full text-xs font-mono font-medium tracking-wider uppercase text-zinc-400 hover:text-white bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 transition-all duration-300 animate-fadeIn cursor-pointer"
        >
          Skip ✕
        </button>
      )}
    </div>
  );
};

export default MainLoader;

