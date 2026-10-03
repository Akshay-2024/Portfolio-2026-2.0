'use client';

import React from 'react';
import Link from 'next/link';
import { Film, ArrowRight } from 'lucide-react';
import { FilmstripGallery, type FilmstripImage } from '@/components/ui/filmstrip-gallery';
import { collectionsData } from '@/lib/collectionsData';

export const VideosSection: React.FC = () => {
  const videoCategory = collectionsData.find((c) => c.id === 'videos');
  const videoItems = videoCategory ? videoCategory.items : [];
  const actualCount = videoItems.length;

  const [frameWidth, setFrameWidth] = React.useState<number>(320);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setFrameWidth(240);
      } else {
        setFrameWidth(320);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filmstripImages: FilmstripImage[] = videoItems.map((item) => ({
    src: item.image,
    alt: item.title,
    caption: `${item.title} — ${item.description}`,
    youtubeId: item.youtubeId,
    isVertical: item.isVertical,
  }));

  return (
    <section className="w-full py-24 sm:py-32 bg-[#0B0B0E] text-white relative z-20 border-t border-zinc-800/80 overflow-hidden" id="videos">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-widest mb-3">
              <Film className="w-4 h-4" />
              <span>07 / CINEMATIC PRODUCTIONS</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Videos & Film Reels
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg mt-3 leading-relaxed">
              {actualCount} cinematic aftermovies, brand commercials, and documentary shorts. Scroll the filmstrip and click any frame to view the reel.
            </p>
          </div>

          <Link
            href="/collections/videos"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-all shadow-lg shadow-red-500/20 group self-start md:self-auto"
          >
            <span>Watch All {actualCount} Film Reels</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 35mm Filmstrip Gallery Component */}
        <div className="w-full my-6">
          <FilmstripGallery
            images={filmstripImages}
            defaultIndex={0}
            negative={true}
            mask={0.6}
            lit={1}
            frameWidth={frameWidth}
            aspect="16 / 10"
            film="35MM · KODAK VISION3 500T · 4K"
            stripColor="#141418"
            inkColor="#E5B842"
          />
        </div>

      </div>
    </section>
  );
};

export default VideosSection;
