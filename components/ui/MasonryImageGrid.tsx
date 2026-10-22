'use client';

import React, { useState, useCallback, useEffect, useRef, startTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from 'lucide-react';

export interface MasonryImageItem {
  src: string | { src: string; alt?: string };
  alt?: string;
  title?: string;
  id?: number | string;
}

export interface MasonryImageGridProps {
  images?: MasonryImageItem[];
  columns?: number;
  gap?: number;
  borderRadius?: number;
  enableLightbox?: boolean;
  overlayColor?: string;
  enableImageHover?: boolean;
  imageHoverOverlayColor?: string;
  imageHoverTextColor?: string;
  imageHoverTextPadding?: number;
  lightboxImageHeight?: number;
  lightboxPadding?: { top: number; right: number; bottom: number; left: number };
  smoothness?: number;
  showHint?: boolean;
  hintText?: string;
  hintColor?: string;
  hintBottomOffset?: number;
  closeIconColor?: string;
  closeIconBg?: string;
  closeSize?: number;
  closeIconStroke?: number;
  galleryAnimateIn?: boolean;
  galleryAnimateDistance?: number;
  galleryAnimateDuration?: number;
  galleryAnimateStagger?: number;
  enableInfiniteScroll?: boolean;
  loadMoreCount?: number;
  className?: string;
}

export default function MasonryImageGrid({
  images = [],
  columns = 3,
  gap = 16,
  borderRadius = 16,
  enableLightbox = true,
  overlayColor = 'rgba(0, 0, 0, 0.95)',
  enableImageHover = true,
  imageHoverOverlayColor = 'rgba(0, 0, 0, 0.45)',
  imageHoverTextColor = '#FFFFFF',
  imageHoverTextPadding = 24,
  lightboxImageHeight = 75,
  lightboxPadding = { top: 40, right: 40, bottom: 40, left: 40 },
  smoothness = 100,
  showHint = true,
  hintText = 'Drag / swipe or scroll horizontal gallery',
  hintColor = '#FFFFFF',
  hintBottomOffset = 24,
  closeIconColor = '#FFFFFF',
  closeIconBg = 'rgba(255, 255, 255, 0.2)',
  closeSize = 44,
  closeIconStroke = 2.5,
  galleryAnimateIn = true,
  galleryAnimateDistance = 20,
  galleryAnimateDuration = 0.45,
  galleryAnimateStagger = 40,
  enableInfiniteScroll = true,
  loadMoreCount = 12,
  className = '',
}: MasonryImageGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const lightboxGap = 24;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const lightboxScrollerRef = useRef<HTMLDivElement | null>(null);
  const [isCloseHover, setIsCloseHover] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Screen detection for responsive layout & touch controls
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [visibleCount, setVisibleCount] = useState(() => {
    const cap = Math.max(0, images.length);
    if (!enableInfiniteScroll) return cap;
    return Math.max(1, Math.min(cap, Math.max(1, loadMoreCount)));
  });

  useEffect(() => {
    const cap = Math.max(0, images.length);
    if (!enableInfiniteScroll) {
      startTransition(() => setVisibleCount(cap));
      return;
    }
    startTransition(() => setVisibleCount((c) => Math.max(1, Math.min(c, cap))));
  }, [enableInfiniteScroll, images.length, loadMoreCount]);

  useEffect(() => {
    if (!enableInfiniteScroll) return;
    if (typeof window === 'undefined') return;
    const cap = Math.max(0, images.length);
    if (visibleCount >= cap) return;

    const node = sentinelRef.current;
    if (!node) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;
        startTransition(() => {
          setVisibleCount((c) => Math.max(1, Math.min(cap, c + Math.max(1, loadMoreCount))));
        });
      },
      { root: null, rootMargin: '400px 0px', threshold: 0 }
    );

    io.observe(node);
    return () => io.disconnect();
  }, [enableInfiniteScroll, images.length, loadMoreCount, visibleCount]);

  const targetScrollLeftRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const rafLastTimeRef = useRef<number | null>(null);
  const momentumVelocityRef = useRef(0);

  const cancelRaf = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (rafRef.current != null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      rafLastTimeRef.current = null;
    }
  }, []);

  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const lastDragTimeRef = useRef(0);
  const lastDragScrollLeftRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  // Desktop mouse drag handlers
  const onLightboxPointerDown = useCallback(
    (e: React.PointerEvent) => {
      // On mobile / touch screens, allow native smooth swipe + snap
      if (e.pointerType === 'touch') return;
      const el = lightboxScrollerRef.current;
      if (!el) return;
      cancelRaf();
      isDraggingRef.current = true;
      dragStartXRef.current = e.clientX;
      dragStartScrollLeftRef.current = el.scrollLeft;
      targetScrollLeftRef.current = el.scrollLeft;
      momentumVelocityRef.current = 0;
      lastDragTimeRef.current = typeof window !== 'undefined' ? window.performance.now() : 0;
      lastDragScrollLeftRef.current = el.scrollLeft;
      try {
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      } catch {}
      startTransition(() => setIsDragging(true));
    },
    [cancelRaf]
  );

  const onLightboxPointerMove = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'touch' || !isDraggingRef.current) return;
    const el = lightboxScrollerRef.current;
    if (!el) return;
    const dx = e.clientX - dragStartXRef.current;
    const dragMultiplier = 1.15;
    const next = dragStartScrollLeftRef.current - dx * dragMultiplier;
    const now = typeof window !== 'undefined' ? window.performance.now() : 0;
    const dt = Math.max(1, now - lastDragTimeRef.current);
    const scrollDelta = next - lastDragScrollLeftRef.current;
    momentumVelocityRef.current = scrollDelta / dt;
    lastDragTimeRef.current = now;
    lastDragScrollLeftRef.current = next;
    targetScrollLeftRef.current = next;
    el.scrollLeft = next;
  }, []);

  const startSmoothScrollLoop = useCallback(() => {
    if (typeof window === 'undefined') return;
    const el = lightboxScrollerRef.current;
    if (!el) return;
    if (rafRef.current != null) return;
    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

    const step = (now: number) => {
      const node = lightboxScrollerRef.current;
      if (!node) {
        rafRef.current = null;
        rafLastTimeRef.current = null;
        return;
      }
      const last = rafLastTimeRef.current;
      const dt = Math.max(1, Math.min(64, last == null ? 16 : now - last));
      rafLastTimeRef.current = now;

      if (!isDraggingRef.current && Math.abs(momentumVelocityRef.current) > 0.001) {
        targetScrollLeftRef.current += momentumVelocityRef.current * dt;
        const decay = Math.pow(0.9, dt / 16);
        momentumVelocityRef.current *= decay;
        if (Math.abs(momentumVelocityRef.current) < 0.02) {
          momentumVelocityRef.current = 0;
        }
      }

      const maxScroll = Math.max(0, node.scrollWidth - node.clientWidth);
      const target = clamp(targetScrollLeftRef.current, 0, maxScroll);
      targetScrollLeftRef.current = target;
      const current = node.scrollLeft;
      const diff = target - current;
      const t = Math.max(0, smoothness);
      const alpha = 1 / (1 + t / 10);

      if (Math.abs(diff) < 0.5) {
        node.scrollLeft = target;
        rafRef.current = null;
        rafLastTimeRef.current = null;
        return;
      }
      node.scrollLeft = current + diff * alpha;
      rafRef.current = window.requestAnimationFrame(step);
    };

    rafRef.current = window.requestAnimationFrame(step);
  }, [smoothness]);

  const onLightboxPointerUp = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    isDraggingRef.current = false;
    startSmoothScrollLoop();
    startTransition(() => setIsDragging(false));
  }, [startSmoothScrollLoop]);

  useEffect(() => {
    if (!lightboxOpen) return;
    if (typeof window === 'undefined') return;
    const el = lightboxScrollerRef.current;
    if (!el) return;

    targetScrollLeftRef.current = el.scrollLeft;
    momentumVelocityRef.current = 0;

    const onWheel = (e: WheelEvent) => {
      const dy = e.deltaY;
      if (!dy) return;
      e.preventDefault();
      targetScrollLeftRef.current = el.scrollLeft;
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? el.clientHeight : 1;
      const wheelMultiplier = 2.6;
      targetScrollLeftRef.current += dy * unit * wheelMultiplier;
      startSmoothScrollLoop();
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [lightboxOpen, startSmoothScrollLoop]);

  useEffect(() => {
    if (!lightboxOpen) {
      cancelRaf();
    }
  }, [lightboxOpen, cancelRaf]);

  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const el = lightboxScrollerRef.current;
    if (!el) return;
    const items = el.querySelectorAll("[data-lightbox-item='true']");
    const child = items.item(index) || null;
    if (!child) return;
    (child as HTMLElement).scrollIntoView({ behavior, inline: 'center', block: 'nearest' });
    setCurrentIndex(index);
    setIsZoomed(false);
  }, []);

  // Sync currentIndex as the user scrolls / swipes on mobile
  const handleScrollerScroll = useCallback(() => {
    const el = lightboxScrollerRef.current;
    if (!el) return;
    const items = el.querySelectorAll("[data-lightbox-item='true']");
    if (!items.length) return;
    const scrollCenter = el.scrollLeft + el.clientWidth / 2;
    let closestIndex = 0;
    let minDiff = Infinity;
    items.forEach((item, idx) => {
      const itemEl = item as HTMLElement;
      const itemCenter = itemEl.offsetLeft + itemEl.clientWidth / 2;
      const diff = Math.abs(scrollCenter - itemCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });
    if (closestIndex !== currentIndex) {
      setCurrentIndex(closestIndex);
      setIsZoomed(false);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!lightboxOpen) return;
    if (typeof document !== 'undefined') {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [lightboxOpen]);

  const closeLightbox = useCallback(() => {
    startTransition(() => {
      setLightboxOpen(false);
      setIsZoomed(false);
    });
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;
    if (typeof window === 'undefined') return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        scrollToIndex(Math.min(images.length - 1, currentIndex + 1));
      } else if (e.key === 'ArrowLeft') {
        scrollToIndex(Math.max(0, currentIndex - 1));
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxOpen, closeLightbox, currentIndex, images.length, scrollToIndex]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const t =
      typeof window !== 'undefined'
        ? window.setTimeout(() => {
            scrollToIndex(currentIndex, 'auto');
            const el = lightboxScrollerRef.current;
            if (el) targetScrollLeftRef.current = el.scrollLeft;
          }, 60)
        : null;

    return () => {
      if (typeof window !== 'undefined' && t) window.clearTimeout(t);
    };
  }, [lightboxOpen, currentIndex, scrollToIndex]);

  const openLightbox = useCallback(
    (index: number) => {
      if (!enableLightbox) return;
      startTransition(() => {
        setCurrentIndex(index);
        setIsZoomed(false);
        setLightboxOpen(true);
      });
    },
    [enableLightbox]
  );

  const effectiveColumns = isMobile ? Math.min(columns, 2) : columns;

  const distributeImages = () => {
    const shownImages = images.slice(0, Math.max(0, Math.min(images.length, Math.max(0, visibleCount))));
    const cols: Array<Array<{ image: MasonryImageItem; index: number }>> = Array.from(
      { length: effectiveColumns },
      () => []
    );
    shownImages.forEach((image, index) => {
      cols[index % effectiveColumns].push({ image, index });
    });
    return { cols, shownImages };
  };

  const { cols: columnImages, shownImages } = distributeImages();

  return (
    <div className={`relative w-full ${className}`}>
      {/* Masonry Grid View */}
      <div style={{ position: 'relative', width: '100%', display: 'flex', gap: `${gap}px`, backgroundColor: 'transparent' }}>
        {columnImages.map((column, colIndex) => (
          <div key={colIndex} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: `${gap}px` }}>
            {column.map(({ image, index: actualIndex }) => {
              const imageSrc = typeof image.src === 'string' ? image.src : image.src?.src || '';
              const imageAlt = image.alt || (typeof image.src === 'string' ? '' : image.src?.alt) || image.title || '';

              const imageContent = (
                <>
                  <img
                    src={imageSrc}
                    alt={imageAlt}
                    style={{ width: '100%', height: 'auto', display: 'block', borderRadius: `${borderRadius}px` }}
                  />
                  {enableImageHover && (
                    <motion.div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: imageHoverOverlayColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: `${Math.max(0, imageHoverTextPadding)}px`,
                        borderRadius: `${borderRadius}px`,
                        pointerEvents: 'none',
                      }}
                      initial={{ opacity: 0 }}
                      variants={{ hover: { opacity: 1 } }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <motion.div
                        style={{ color: imageHoverTextColor, textAlign: 'center', width: '100%', fontWeight: 700, fontSize: '15px' }}
                        initial={{ opacity: 0, y: -10 }}
                        variants={{ hover: { opacity: 1, y: 0 } }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {imageAlt || 'View Image'}
                      </motion.div>
                    </motion.div>
                  )}
                </>
              );

              if (enableLightbox) {
                return (
                  <motion.button
                    key={actualIndex}
                    type="button"
                    aria-label={imageAlt ? `Open ${imageAlt}` : `Open image ${actualIndex + 1}`}
                    style={{
                      width: '100%',
                      padding: 0,
                      margin: 0,
                      border: 'none',
                      background: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      borderRadius: `${borderRadius}px`,
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'block',
                    }}
                    onClick={() => openLightbox(actualIndex)}
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                  >
                    {imageContent}
                  </motion.button>
                );
              }

              return (
                <div
                  key={actualIndex}
                  style={{
                    width: '100%',
                    position: 'relative',
                    borderRadius: `${borderRadius}px`,
                    overflow: 'hidden',
                  }}
                >
                  {imageContent}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div ref={sentinelRef} style={{ width: '100%', height: 1 }} aria-hidden="true" />

      {/* Lightbox Horizontal Gallery Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: overlayColor,
              backdropFilter: 'blur(20px)',
              zIndex: 99999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              boxSizing: 'border-box',
            }}
          >
            {/* Top Bar: Title & Counter badge */}
            <div
              style={{
                position: 'absolute',
                top: 'max(16px, env(safe-area-inset-top, 16px))',
                left: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                zIndex: 10002,
                maxWidth: 'calc(100% - 130px)',
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '6px 14px',
                  borderRadius: 999,
                  color: '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
                }}
              >
                <span style={{ color: '#FF3B30', fontWeight: 800 }}>
                  {currentIndex + 1} / {shownImages.length}
                </span>
                {shownImages[currentIndex]?.alt && (
                  <span
                    style={{
                      opacity: 0.9,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    • {shownImages[currentIndex].alt}
                  </span>
                )}
              </div>
            </div>

            {/* Top Right Action Buttons: Zoom Toggle + Close */}
            <div
              style={{
                position: 'absolute',
                top: 'max(16px, env(safe-area-inset-top, 16px))',
                right: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                zIndex: 10002,
              }}
            >
              {/* Zoom In / Fit Toggle */}
              <button
                type="button"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: isZoomed ? 'rgba(255, 59, 48, 0.85)' : 'rgba(0, 0, 0, 0.65)',
                  backdropFilter: 'blur(12px)',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  display: 'grid',
                  placeItems: 'center',
                  padding: 0,
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed((prev) => !prev);
                }}
                aria-label={isZoomed ? 'Fit to screen' : 'Zoom into image'}
                title={isZoomed ? 'Fit to screen' : 'Zoom image'}
              >
                {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
              </button>

              {/* Close Button */}
              <button
                type="button"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'rgba(0, 0, 0, 0.65)',
                  backdropFilter: 'blur(12px)',
                  color: closeIconColor,
                  cursor: 'pointer',
                  display: 'grid',
                  placeItems: 'center',
                  padding: 0,
                  opacity: isCloseHover ? 0.75 : 1,
                  transition: 'opacity 0.2s ease',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  closeLightbox();
                }}
                onMouseEnter={() => setIsCloseHover(true)}
                onMouseLeave={() => setIsCloseHover(false)}
                aria-label="Close lightbox"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Left / Prev Navigation Arrow */}
            {currentIndex > 0 && (
              <button
                type="button"
                style={{
                  position: 'absolute',
                  left: isMobile ? '8px' : '24px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: isMobile ? '40px' : '50px',
                  height: isMobile ? '40px' : '50px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backgroundColor: 'rgba(0, 0, 0, 0.65)',
                  backdropFilter: 'blur(12px)',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  display: 'grid',
                  placeItems: 'center',
                  padding: 0,
                  zIndex: 10001,
                  transition: 'all 0.2s ease',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToIndex(currentIndex - 1);
                }}
                aria-label="Previous image"
              >
                <ChevronLeft size={isMobile ? 22 : 28} />
              </button>
            )}

            {/* Right / Next Navigation Arrow */}
            {currentIndex < shownImages.length - 1 && (
              <button
                type="button"
                style={{
                  position: 'absolute',
                  right: isMobile ? '8px' : '24px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: isMobile ? '40px' : '50px',
                  height: isMobile ? '40px' : '50px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backgroundColor: 'rgba(0, 0, 0, 0.65)',
                  backdropFilter: 'blur(12px)',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  display: 'grid',
                  placeItems: 'center',
                  padding: 0,
                  zIndex: 10001,
                  transition: 'all 0.2s ease',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToIndex(currentIndex + 1);
                }}
                aria-label="Next image"
              >
                <ChevronRight size={isMobile ? 22 : 28} />
              </button>
            )}

            {/* Bottom Hint Pill */}
            {showHint && (
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: 'max(18px, env(safe-area-inset-bottom, 18px))',
                  transform: 'translateX(-50%)',
                  background: 'rgba(0, 0, 0, 0.65)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: hintColor,
                  padding: '7px 18px',
                  borderRadius: 999,
                  zIndex: 10001,
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                  fontSize: '12px',
                  fontWeight: 600,
                  boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
                }}
                aria-hidden="true"
              >
                {isMobile ? 'Swipe left / right to browse • Tap zoom to inspect' : hintText}
              </div>
            )}

            {/* Scroller Canvas */}
            <div
              style={{
                width: '100%',
                height: '100%',
                maxWidth: '100%',
                maxHeight: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                id="lightboxScroller"
                ref={lightboxScrollerRef}
                onScroll={handleScrollerScroll}
                style={{
                  width: '100%',
                  height: '100%',
                  overflowX: 'auto',
                  overflowY: isZoomed ? 'auto' : 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  gap: isMobile ? '16px' : `${lightboxGap}px`,
                  padding: isMobile ? '0 16px' : '0 40px',
                  scrollSnapType: isZoomed ? 'none' : 'x mandatory',
                  WebkitOverflowScrolling: 'touch',
                  cursor: isDragging ? 'grabbing' : 'default',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  boxSizing: 'border-box',
                }}
                aria-label="Lightbox gallery"
                role="list"
              >
                <style>{`#lightboxScroller::-webkit-scrollbar{display:none;}`}</style>
                {shownImages.map((img, i) => {
                  const src = typeof img.src === 'string' ? img.src : img.src?.src || '';
                  const alt = img.alt || (typeof img.src === 'string' ? '' : img.src?.alt) || img.title || '';
                  const isCurrent = i === currentIndex;

                  return (
                    <div
                      key={i}
                      data-lightbox-item="true"
                      style={{
                        flex: isMobile ? '0 0 100%' : '0 0 auto',
                        width: isMobile ? '100%' : 'auto',
                        maxWidth: isMobile ? '100%' : '90vw',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: isMobile ? '60px 0' : '40px 0',
                        boxSizing: 'border-box',
                        scrollSnapAlign: 'center',
                        scrollSnapStop: 'always',
                      }}
                      role="listitem"
                      onPointerDown={onLightboxPointerDown}
                      onPointerMove={onLightboxPointerMove}
                      onPointerUp={onLightboxPointerUp}
                      onPointerCancel={onLightboxPointerUp}
                    >
                      <img
                        src={src}
                        alt={alt}
                        style={{
                          maxWidth: isMobile ? 'calc(100vw - 32px)' : 'calc(90vw - 80px)',
                          maxHeight: isMobile ? 'calc(100dvh - 160px)' : `${lightboxImageHeight}vh`,
                          width: 'auto',
                          height: 'auto',
                          objectFit: 'contain',
                          borderRadius: `${borderRadius}px`,
                          display: 'block',
                          userSelect: 'none',
                          pointerEvents: 'auto',
                          boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
                          transform: isZoomed && isCurrent ? 'scale(1.8)' : 'scale(1)',
                          transition: 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
                          cursor: isCurrent ? (isZoomed ? 'zoom-out' : 'zoom-in') : 'default',
                        }}
                        draggable={false}
                        onClick={() => {
                          if (isCurrent) {
                            setIsZoomed((prev) => !prev);
                          } else {
                            scrollToIndex(i);
                          }
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
