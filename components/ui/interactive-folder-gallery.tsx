"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";

export interface GalleryPhoto {
  id: string | number;
  image: string;
  title?: string;
  tag?: string;
  description?: string;
  date?: string;
}

const defaultPhotos: GalleryPhoto[] = [
  { id: 1, image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80", title: "Director of Visual Media — Hult Prize", tag: "LEADERSHIP" },
  { id: 2, image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80", title: "Advanced Web Architecture & Next.js", tag: "TECHNICAL" },
  { id: 3, image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80", title: "International Editorial Photography Award", tag: "AWARD" },
  { id: 4, image: "https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&w=800&q=80", title: "Creative Team Direction Mastery", tag: "EXECUTIVE" },
  { id: 5, image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80", title: "Full Stack Engineering Certificate", tag: "ENGINEERING" },
];

export interface InteractiveFolderGalleryProps {
  photos?: GalleryPhoto[];
  folderName?: string;
  dragHintText?: string;
  targetHref?: string;
  className?: string;
}

export function InteractiveFolderGallery({
  photos = defaultPhotos,
  folderName = "Certificates.gallery",
  dragHintText = "Drag any certificate down to close",
  targetHref = "/collections/certificates",
  className,
}: InteractiveFolderGalleryProps) {
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [hoverFolder, setHoverFolder] = useState(false);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  // Responsive state detection
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Touch handlers for mobile swipe navigation (low threshold for instant finger response)
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Vertical swipe down (> 50px) closes the folder
    if (deltaY > 50 && Math.abs(deltaY) > Math.abs(deltaX)) {
      setIsFolderOpen(false);
      setHoverFolder(false);
    } else if (Math.abs(deltaX) > 30) {
      // Horizontal swipe to cycle certificates on mobile (30px threshold for snappy feel)
      if (deltaX < 0) {
        // Swipe left -> Next
        setActiveMobileIndex((prev) => Math.min(photos.length - 1, prev + 1));
      } else {
        // Swipe right -> Prev
        setActiveMobileIndex((prev) => Math.max(0, prev - 1));
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const currentMobilePhoto = photos[activeMobileIndex] || photos[0];

  return (
    <div className={`w-full py-4 sm:py-8 relative ${className || ""}`}>
      {/* Interactive Folder Gallery Canvas - 3D perspective enabled only on desktop to eliminate mobile lag */}
      <div
        className={`relative w-full flex flex-col items-center justify-center ${
          isFolderOpen
            ? "min-h-[440px] sm:min-h-[500px]"
            : "min-h-[290px] sm:min-h-[380px]"
        }`}
        style={isMobile ? undefined : { perspective: "1200px" }}
      >
        <div
          className={`relative w-full max-w-[420px] flex justify-center pointer-events-none z-0 ${
            isFolderOpen
              ? "h-[400px] sm:h-[460px]"
              : "h-[270px] sm:h-[340px]"
          }`}
          onTouchStart={isFolderOpen && isMobile ? handleTouchStart : undefined}
          onTouchEnd={isFolderOpen && isMobile ? handleTouchEnd : undefined}
        >
          {/* Folder Backing */}
          <motion.div
            className="absolute bottom-6 w-[270px] sm:w-80 h-44 sm:h-56 drop-shadow-xl pointer-events-none"
            animate={{
              opacity: isFolderOpen ? 0 : 1,
              scale: isFolderOpen ? 0.92 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute top-0 left-0 w-28 sm:w-32 h-8 sm:h-10 bg-gradient-to-t from-[#1e1e1e] to-[#2a2a2a] rounded-t-xl border-t border-l border-r border-white/10" />
            <div className="absolute top-6 sm:top-8 left-0 right-0 bottom-0 bg-gradient-to-b from-[#1e1e1e] to-[#0a0a0a] rounded-b-xl rounded-tr-xl border border-white/10 shadow-xl" />
            <div className="absolute top-8 sm:top-10 left-2 right-2 bottom-2 bg-black rounded-lg opacity-80" />
          </motion.div>

          {/* Stacked Photos */}
          <div className="absolute bottom-10 z-10 flex justify-center w-full">
            {photos.map((photo, i) => {
              const centerIndex = (photos.length - 1) / 2;
              const offset = i - centerIndex;

              // Closed stack layout
              const stackY = hoverFolder ? offset * -8 - 25 : offset * -4;
              const stackX = hoverFolder ? offset * 12 : offset * 2;
              const stackRotate = hoverFolder ? offset * 5 : offset * 2;
              const stackScale = 1 - Math.abs(offset) * 0.03;

              // Open layout - Hardware-accelerated 2D deck on mobile vs 3D fanned array on desktop
              let openX = 0;
              let openY = -85;
              let openRotate = 0;
              let openScale = 1;
              let openZIndex = 50;
              let openOpacity = 1;
              let isHiddenOnMobile = false;

              if (isMobile) {
                const diff = i - activeMobileIndex;
                if (diff === 0) {
                  // Active card front & center
                  openX = 0;
                  openY = -75;
                  openRotate = 0;
                  openScale = 1;
                  openZIndex = 60;
                  openOpacity = 1;
                } else if (diff === 1) {
                  // Next card peeking right
                  openX = 65;
                  openY = -70;
                  openRotate = 0;
                  openScale = 0.88;
                  openZIndex = 40;
                  openOpacity = 0.5;
                } else if (diff === -1) {
                  // Previous card peeking left
                  openX = -65;
                  openY = -70;
                  openRotate = 0;
                  openScale = 0.88;
                  openZIndex = 40;
                  openOpacity = 0.5;
                } else {
                  // Hide remaining cards on mobile to reduce GPU layers from 6 down to 3
                  isHiddenOnMobile = true;
                  openX = diff * 70;
                  openY = -65;
                  openRotate = 0;
                  openScale = 0.75;
                  openZIndex = 20;
                  openOpacity = 0;
                }
              } else {
                // Desktop / Tablet fanned spread
                const step = isTablet ? 85 : 120;
                openX = offset * step;
                openY = -95;
                openRotate = isTablet ? offset * 2 : offset * 2.5;
                openScale = isTablet ? 0.94 : 1.02;
                openZIndex = 40 + i;
                openOpacity = 1;
              }

              const isCurrentActive = isMobile ? i === activeMobileIndex : true;

              return (
                <motion.div
                  key={photo.id}
                  drag={isFolderOpen && !isMobile ? "y" : false}
                  dragSnapToOrigin={true}
                  onDragEnd={(e, info) => {
                    if (info.offset.y > 60 && isFolderOpen) {
                      setIsFolderOpen(false);
                      setHoverFolder(false);
                    }
                  }}
                  onClick={() => {
                    if (isFolderOpen && isMobile && i !== activeMobileIndex) {
                      setActiveMobileIndex(i);
                    }
                  }}
                  className={`absolute bottom-0 w-[270px] h-[190px] sm:w-72 sm:h-52 rounded-xl sm:rounded-2xl overflow-hidden border bg-zinc-900 origin-bottom select-none ${
                    isFolderOpen
                      ? "pointer-events-auto cursor-grab active:cursor-grabbing"
                      : "pointer-events-none"
                  } ${
                    isCurrentActive
                      ? "border-red-500 shadow-xl shadow-red-500/20"
                      : "border-zinc-700/60 shadow-lg"
                  }`}
                  style={{
                    display: isMobile && isFolderOpen && isHiddenOnMobile ? "none" : "block",
                    willChange: "transform, opacity",
                    transform: "translateZ(0)",
                    WebkitBackfaceVisibility: "hidden",
                    backfaceVisibility: "hidden",
                  }}
                  animate={
                    !isFolderOpen
                      ? {
                          y: stackY,
                          x: stackX,
                          rotate: isMobile ? 0 : stackRotate,
                          scale: stackScale,
                          zIndex: i + 10,
                          opacity: 1,
                        }
                      : {
                          y: openY,
                          x: openX,
                          rotate: openRotate,
                          scale: openScale,
                          zIndex: openZIndex,
                          opacity: openOpacity,
                        }
                  }
                  whileHover={
                    isFolderOpen && !isMobile
                      ? {
                          scale: openScale + 0.08,
                          y: openY - 20,
                          zIndex: 100,
                          borderColor: "rgba(255,59,48,0.9)",
                        }
                      : {}
                  }
                  transition={
                    isMobile
                      ? { type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.22 }
                      : { type: "spring", stiffness: 350, damping: 30 }
                  }
                >
                  <img
                    src={photo.image}
                    alt={photo.title || "Certificate"}
                    decoding="async"
                    loading="eager"
                    className="w-full h-full object-contain bg-white pointer-events-none select-none p-1"
                  />

                  {/* Category Tag Badge */}
                  {photo.tag && (
                    <span className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 bg-black/90 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold text-red-400 border border-red-500/40 uppercase tracking-wider shadow-md pointer-events-none">
                      {photo.tag}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Folder Front Cover */}
          <motion.div
            className="absolute bottom-0 w-[290px] sm:w-[340px] max-w-[92vw] h-36 sm:h-44 cursor-pointer z-20 pointer-events-auto drop-shadow-xl"
            style={{ transformOrigin: "bottom" }}
            animate={{
              opacity: isFolderOpen ? 0 : 1,
              rotateX: hoverFolder && !isMobile ? -25 : 0,
              y: hoverFolder && !isMobile ? 10 : 0,
              pointerEvents: isFolderOpen ? "none" : "auto",
            }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setHoverFolder(true)}
            onMouseLeave={() => setHoverFolder(false)}
            onClick={() => {
              setIsFolderOpen(true);
              setActiveMobileIndex(0);
            }}
          >
            <div className="w-full h-full bg-gradient-to-b from-[#2a2a2a] to-[#111115] rounded-2xl border border-red-500/50 shadow-xl relative overflow-hidden flex flex-col items-center justify-end pb-5 sm:pb-7 px-4 group">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/70 to-transparent" />

              <div className="px-4 py-2 sm:px-5 sm:py-2.5 bg-black/90 rounded-xl border border-red-500/40 shadow-inner flex items-center justify-center transition-transform group-hover:scale-105">
                <span className="text-red-400 font-serif text-xs sm:text-base font-semibold tracking-wide flex items-center gap-1.5 sm:gap-2 line-clamp-1">
                  <span>🏆</span> {folderName}
                </span>
              </div>

              {/* Pulsing Hint for Mobile */}
              <span className="mt-2 text-[10px] sm:text-xs text-zinc-400 font-medium tracking-wide flex items-center gap-1 animate-pulse">
                <span>Tap to Open Folder</span>
                <span className="text-red-400">📂</span>
              </span>
            </div>
          </motion.div>
        </div>

        {/* Mobile Interactive Controls & Active Certificate Info */}
        {isFolderOpen && isMobile && (
          <div className="w-full max-w-[340px] px-3 flex flex-col items-center text-center mt-2 z-40 animate-fadeIn">
            {/* Active Certificate Info */}
            <div className="bg-zinc-950/95 border border-zinc-800 rounded-xl px-4 py-2.5 w-full shadow-lg mb-2">
              <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
                <span className="text-red-400 font-bold uppercase tracking-wider text-[10px]">
                  {currentMobilePhoto.tag || "CERTIFICATE"}
                </span>
                <span className="font-mono text-zinc-500">
                  {activeMobileIndex + 1} of {photos.length}
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                {currentMobilePhoto.title || "Verified Certification"}
              </h4>
            </div>

            {/* Mobile Navigation Arrows & Dots */}
            <div className="flex items-center justify-between w-full mb-3 px-2">
              <button
                type="button"
                onClick={() =>
                  setActiveMobileIndex((prev) => Math.max(0, prev - 1))
                }
                disabled={activeMobileIndex === 0}
                className="h-8 w-8 rounded-full bg-zinc-900 border border-zinc-700 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-transform shadow-md cursor-pointer"
                aria-label="Previous Certificate"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Dots Indicator */}
              <div className="flex items-center gap-1.5">
                {photos.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={() => setActiveMobileIndex(dotIdx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      dotIdx === activeMobileIndex
                        ? "w-6 bg-red-500"
                        : "w-2 bg-zinc-700 hover:bg-zinc-500"
                    }`}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() =>
                  setActiveMobileIndex((prev) =>
                    Math.min(photos.length - 1, prev + 1)
                  )
                }
                disabled={activeMobileIndex === photos.length - 1}
                className="h-8 w-8 rounded-full bg-zinc-900 border border-zinc-700 text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-transform shadow-md cursor-pointer"
                aria-label="Next Certificate"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Global Controls Overlay when Open */}
        <div
          className={`flex flex-col sm:flex-row items-center gap-2 sm:gap-3 pointer-events-auto z-50 mt-1 transition-opacity duration-200 ${
            isFolderOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Close Folder Button */}
          <button
            type="button"
            onClick={() => {
              setIsFolderOpen(false);
              setHoverFolder(false);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-zinc-900/95 border border-zinc-700 text-zinc-300 text-xs font-semibold hover:bg-zinc-800 hover:text-white transition-colors shadow-md cursor-pointer"
          >
            <X className="w-3.5 h-3.5 text-red-500" />
            <span>Close Folder</span>
          </button>

          {/* Hint text */}
          <div className="px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-[11px] font-bold uppercase tracking-wider text-center">
            {isMobile ? "Swipe left / right • Swipe down to close" : dragHintText}
          </div>

          {/* Enter Full Page Button */}
          <Link
            href={targetHref}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-red-500 text-white text-xs font-bold hover:bg-red-600 active:scale-95 transition-all shadow-xl shadow-red-500/25"
          >
            <span>Enter Full Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export { InteractiveFolderGallery as Component };
