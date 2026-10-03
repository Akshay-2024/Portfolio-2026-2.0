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

  // On mobile screens, select up to 11 evenly spaced images so cards don't overlap into a dense block
  const visibleImages = dimensions.isMobile && images.length > 11
    ? images.filter((_, idx) => idx % Math.ceil(images.length / 11) === 0).slice(0, 11)
    : images;

  const count = Math.max(visibleImages.length, 2);
  const step = (endAngle - startAngle) / (count - 1);

  return (
    <div className={`relative overflow-visible bg-white text-zinc-900 pt-4 sm:pt-8 pb-4 flex flex-col ${className}`} suppressHydrationWarning>
      {/* Background Arc Ring Container — Ample height prevents top cropping */}
      <div
        className="relative mx-auto w-full overflow-visible"
        style={{
          height: dimensions.radius * 1.35,
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
            const waveDelay = `${(i % 4) * 0.7}s`;

            return (
              <div
                key={i}
                className="absolute opacity-0 animate-fade-in-up"
                style={{
                  width: `${dimensions.cardSize}px`,
                  height: `${Math.round(dimensions.cardSize * 1.25 * 100) / 100}px`,
                  left: `calc(50% + ${x}px)`,
                  bottom: `${y}px`,
                  transform: `translate(-50%, 50%)`,
                  animationDelay: `${i * 90}ms`,
                  animationFillMode: 'forwards',
                  zIndex: count - i,
                }}
                suppressHydrationWarning
              >
                <div 
                  className="rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden ring-1 ring-zinc-300 bg-white transition-all duration-500 hover:scale-115 hover:ring-red-500 hover:shadow-2xl hover:shadow-red-500/25 hover:z-50 w-full h-full cursor-pointer animate-float-gentle group"
                  style={{ 
                    transform: `rotate(${rotationDeg}deg)`,
                    animationDelay: waveDelay,
                  }}
                >
                  <img
                    src={src}
                    alt={`Photography capture ${i + 1}`}
                    className="block w-full h-full object-cover pointer-events-none select-none transition-transform duration-700 group-hover:scale-110"
                    draggable={false}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Embedded CSS Animations */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translate(-50%, 65%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 50%);
          }
        }
        @keyframes float-gentle {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .animate-fade-in-up {
          animation-name: fade-in-up;
          animation-duration: 0.9s;
          animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-float-gentle {
          animation: float-gentle 4.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ArcGalleryHero;
