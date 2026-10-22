'use client';

import React, { useEffect, useState } from 'react';

type ArcGalleryHeroProps = {
  images: string[];
  startAngle?: number;
  endAngle?: number;
  radiusLg?: number;
  radiusMd?: number;
  radiusSm?: number;
  cardSizeLg?: number;
  cardSizeMd?: number;
  cardSizeSm?: number;
  className?: string;
};

// Fast thumbnail optimization helper to avoid decoding multi-megapixel images on scroll
function getOptimizedArcImage(url: string, width = 320): string {
  if (!url) return '';
  if (url.includes('cloudinary.com') && url.includes('/upload/')) {
    return url.replace('/upload/', `/upload/w_${width},c_limit,q_auto,f_auto/`);
  }
  if (url.includes('unsplash.com')) {
    return url.replace(/w=\d+/, `w=${width}`);
  }
  return url;
}

export const ArcGalleryHero: React.FC<ArcGalleryHeroProps> = ({
  images,
  startAngle = 20,
  endAngle = 160,
  radiusLg = 480,
  radiusMd = 360,
  radiusSm = 150,
  cardSizeLg = 135,
  cardSizeMd = 110,
  cardSizeSm = 65,
  className = '',
}) => {
  const [dimensions, setDimensions] = useState({
    radius: radiusLg,
    cardSize: cardSizeLg,
    isMobile: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        const dynamicRadius = Math.min(radiusSm, Math.max(110, (width - 80) / 2));
        const dynamicCardSize = Math.min(cardSizeSm, Math.max(50, width * 0.16));
        setDimensions({ radius: dynamicRadius, cardSize: dynamicCardSize, isMobile: true });
      } else if (width < 1024) {
        setDimensions({ radius: radiusMd, cardSize: cardSizeMd, isMobile: false });
      } else {
        setDimensions({ radius: radiusLg, cardSize: cardSizeLg, isMobile: false });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [radiusLg, radiusMd, radiusSm, cardSizeLg, cardSizeMd, cardSizeSm]);

  // On mobile screens, select up to 9 evenly spaced images so cards don't overlap into a dense block
  const visibleImages = dimensions.isMobile && images.length > 9
    ? images.filter((_, idx) => idx % Math.ceil(images.length / 9) === 0).slice(0, 9)
    : images;

  const count = Math.max(visibleImages.length, 2);
  const step = (endAngle - startAngle) / (count - 1);

  return (
    <div
      className={`relative overflow-visible bg-white text-zinc-900 pt-4 sm:pt-8 pb-4 flex flex-col ${className}`}
      style={{
        contain: 'paint',
      }}
      suppressHydrationWarning
    >
      {/* Background Arc Ring Container — Hardware accelerated */}
      <div
        className="relative mx-auto w-full overflow-visible"
        style={{
          height: dimensions.radius * 1.35,
          transform: 'translateZ(0)',
          willChange: 'transform',
        }}
      >
        {/* Center pivot for transform calculations */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
          {visibleImages.map((src, i) => {
            const angle = startAngle + step * i;
            const angleRad = (angle * Math.PI) / 180;
            
            const x = Math.round(Math.cos(angleRad) * dimensions.radius * 100) / 100;
            const y = Math.round(Math.sin(angleRad) * dimensions.radius * 100) / 100;
            const rotationDeg = Math.round(((angle - 90) / 3.8) * 100) / 100;
            const optimizedSrc = getOptimizedArcImage(src, 320);

            return (
              <div
                key={i}
                className="absolute"
                style={{
                  width: `${dimensions.cardSize}px`,
                  height: `${Math.round(dimensions.cardSize * 1.25 * 100) / 100}px`,
                  left: `calc(50% + ${x}px)`,
                  bottom: `${y}px`,
                  transform: 'translate(-50%, 50%)',
                  zIndex: count - i,
                  willChange: 'transform',
                }}
                suppressHydrationWarning
              >
                <div 
                  className="rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg overflow-hidden ring-1 ring-zinc-200/90 bg-white transition-transform duration-300 hover:scale-110 hover:ring-red-500 hover:shadow-xl hover:shadow-red-500/20 hover:z-50 w-full h-full cursor-pointer group"
                  style={{ 
                    transform: `rotate(${rotationDeg}deg) translateZ(0)`,
                    WebkitBackfaceVisibility: 'hidden',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <img
                    src={optimizedSrc}
                    alt={`Photography capture ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="block w-full h-full object-cover pointer-events-none select-none transition-transform duration-500 group-hover:scale-110"
                    draggable={false}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=80`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ArcGalleryHero;
