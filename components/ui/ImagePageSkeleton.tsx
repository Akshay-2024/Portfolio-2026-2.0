'use client';

import React from 'react';
import { Camera } from 'lucide-react';

interface ImagePageSkeletonProps {
  columns?: number;
  gap?: number;
  cardCount?: number;
}

export const ImagePageSkeleton: React.FC<ImagePageSkeletonProps> = ({
  columns = 3,
  gap = 20,
  cardCount = 9,
}) => {
  // Staggered realistic masonry card heights for a natural photography layout
  const heights = [380, 260, 440, 320, 410, 290, 360, 430, 280, 390, 330, 460];

  // Distribute dummy skeleton cards across columns
  const [effectiveCols, setEffectiveCols] = React.useState(columns);

  React.useEffect(() => {
    const handleResize = () => {
      setEffectiveCols(window.innerWidth < 768 ? 2 : columns);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [columns]);

  const cols: number[][] = Array.from({ length: effectiveCols }, () => []);
  for (let i = 0; i < cardCount; i++) {
    cols[i % effectiveCols].push(heights[i % heights.length]);
  }

  return (
    <div
      className="relative w-full animate-fadeIn"
      style={{
        display: 'flex',
        gap: `${gap}px`,
        width: '100%',
      }}
      aria-busy="true"
      aria-label="Loading curated captures"
    >
      {cols.map((colHeights, colIdx) => (
        <div
          key={colIdx}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: `${gap}px`,
          }}
        >
          {colHeights.map((h, cardIdx) => (
            <div
              key={cardIdx}
              className="relative w-full rounded-[20px] bg-[#121216] border border-zinc-800/80 overflow-hidden shadow-lg flex flex-col justify-between p-5"
              style={{
                height: `${h}px`,
              }}
            >
              {/* Shimmer sweep animation overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none animate-skeleton-shimmer"
                style={{ width: '200%' }}
              />

              {/* Top skeleton tag */}
              <div className="flex items-center justify-between z-10">
                <div className="h-5 w-20 rounded-full bg-zinc-800/70 animate-pulse" />
                <div className="h-5 w-8 rounded-full bg-zinc-800/50 animate-pulse" />
              </div>

              {/* Center subtle camera watermark */}
              <div className="flex flex-col items-center justify-center my-auto z-10 opacity-30">
                <div className="w-12 h-12 rounded-2xl bg-zinc-800/60 border border-zinc-700/40 flex items-center justify-center mb-2">
                  <Camera className="w-6 h-6 text-zinc-400" />
                </div>
                <div className="h-2 w-16 bg-zinc-800/60 rounded-full" />
              </div>

              {/* Bottom skeleton captions */}
              <div className="flex flex-col gap-2 z-10">
                <div className="h-4 w-3/4 rounded-md bg-zinc-800/80 animate-pulse" />
                <div className="h-3 w-1/2 rounded-md bg-zinc-800/50 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ImagePageSkeleton;

