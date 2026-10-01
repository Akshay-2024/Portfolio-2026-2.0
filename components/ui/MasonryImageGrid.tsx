'use client';

import React, { useState, useCallback, useEffect, useRef, startTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  overlayColor = 'rgba(0, 0, 0, 0.92)',
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
  const lightboxGap = 20;
  const [currentIndex, setCurrentIndex] = useState(0);
  const lightboxScrollerRef = useRef<HTMLDivElement | null>(null);
  const [isCloseHover, setIsCloseHover] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

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

  const onLightboxPointerDown = useCallback(
    (e: React.PointerEvent) => {
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
    if (!isDraggingRef.current) return;
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

  const onLightboxPointerUp = useCallback(() => {
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
  }, []);

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
    });
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;
    if (typeof window === 'undefined') return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxOpen, closeLightbox]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const t =
      typeof window !== 'undefined'
        ? window.setTimeout(() => {
            scrollToIndex(currentIndex, 'auto');
            const el = lightboxScrollerRef.current;
            if (el) targetScrollLeftRef.current = el.scrollLeft;
          }, 0)
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
        setLightboxOpen(true);
      });
    },
    [enableLightbox]
  );

  const distributeImages = () => {
    const shownImages = images.slice(0, Math.max(0, Math.min(images.length, Math.max(0, visibleCount))));
    const cols: Array<Array<{ image: MasonryImageItem; index: number }>> = Array.from(
      { length: columns },
      () => []
    );
    shownImages.forEach((image, index) => {
      cols[index % columns].push({ image, index });
    });
    return { cols, shownImages };
  };

  const { cols: columnImages, shownImages } = distributeImages();

  return (
    <div className={`relative w-full ${className}`}>
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
                      overflow: 'hidden',
                      position: 'relative',
                      display: 'block',
                    }}
                    initial={!galleryAnimateIn ? false : { opacity: 0, y: Math.max(0, galleryAnimateDistance) }}
                    animate={!galleryAnimateIn ? undefined : { opacity: 1, y: 0 }}
                    transition={
                      !galleryAnimateIn
                        ? undefined
                        : {
                            duration: Math.max(0.05, galleryAnimateDuration),
                            ease: [0.22, 1, 0.36, 1],
                            delay: (Math.max(0, actualIndex) * Math.max(0, galleryAnimateStagger)) / 1000,
                          }
                    }
                    whileHover={!enableImageHover ? undefined : 'hover'}
                    onClick={() => openLightbox(actualIndex)}
                  >
                    {imageContent}
                  </motion.button>
                );
              }

              return (
                <div
                  key={actualIndex}
                  style={{ width: '100%', borderRadius: `${borderRadius}px`, overflow: 'hidden', position: 'relative' }}
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
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: overlayColor,
              backdropFilter: 'blur(16px)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: `${lightboxPadding.top}px`,
              paddingRight: `${lightboxPadding.right}px`,
              paddingBottom: `${lightboxPadding.bottom}px`,
              paddingLeft: `${lightboxPadding.left}px`,
              overflow: 'hidden',
              boxSizing: 'border-box',
            }}
          >
            {/* Close Button */}
            <button
              type="button"
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                width: `${Math.max(20, closeSize)}px`,
                height: `${Math.max(20, closeSize)}px`,
                borderRadius: '50%',
                border: 'none',
                backgroundColor: closeIconBg,
                color: closeIconColor,
                cursor: 'pointer',
                display: 'grid',
                placeItems: 'center',
                padding: 0,
                zIndex: 10001,
                opacity: isCloseHover ? 0.7 : 1,
                transition: 'opacity 0.25s ease',
              }}
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              onMouseEnter={() => setIsCloseHover(true)}
              onMouseLeave={() => setIsCloseHover(false)}
              aria-label="Close lightbox"
            >
              <svg
                width={Math.max(20, closeSize) * 0.5}
                height={Math.max(20, closeSize) * 0.5}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={Math.max(1, closeIconStroke)}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </svg>
            </button>

            {showHint && (
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: `${Math.max(0, hintBottomOffset)}px`,
                  transform: 'translateX(-50%)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: hintColor,
                  padding: '8px 18px',
                  borderRadius: 999,
                  zIndex: 10001,
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                  fontSize: '13px',
                  fontWeight: 600,
                }}
                aria-hidden="true"
              >
                {hintText}
              </div>
            )}

            <div style={{ width: '100%', height: '100%', maxWidth: '100%', maxHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div
                id="lightboxScroller"
                ref={lightboxScrollerRef}
                style={{
                  width: '100%',
                  height: '100%',
                  overflowX: 'auto',
                  overflowY: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  gap: `${lightboxGap}px`,
                  WebkitOverflowScrolling: 'touch',
                  cursor: 'default',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
                aria-label="Lightbox gallery"
                role="list"
              >
                <style>{`#lightboxScroller::-webkit-scrollbar{display:none;}`}</style>
                {shownImages.map((img, i) => {
                  const src = typeof img.src === 'string' ? img.src : img.src?.src || '';
                  const alt = img.alt || (typeof img.src === 'string' ? '' : img.src?.alt) || img.title || '';
                  return (
                    <div
                      key={i}
                      data-lightbox-item="true"
                      style={{
                        flex: '0 0 auto',
                        width: 'auto',
                        height: `${lightboxImageHeight}%`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 0,
                        boxSizing: 'border-box',
                        cursor: isDragging ? 'grabbing' : 'grab',
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
                          width: 'auto',
                          maxWidth: 'none',
                          maxHeight: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          borderRadius: `${borderRadius}px`,
                          display: 'block',
                          userSelect: 'none',
                          pointerEvents: 'auto',
                        }}
                        draggable={false}
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
