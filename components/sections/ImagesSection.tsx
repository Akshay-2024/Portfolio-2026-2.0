'use client';

import React from 'react';
import Link from 'next/link';
import { Camera, ArrowRight, CameraIcon } from 'lucide-react';
import { ArcGalleryHero } from '@/components/ui/arc-gallery-hero-component';
import { collectionsData } from '@/lib/collectionsData';

export const ImagesSection: React.FC = () => {
  const imageCategory = collectionsData.find((c) => c.id === 'images');
  const imagesList = imageCategory ? imageCategory.items : [];
  const actualCount = imagesList.length;

  // Select top 9 curated images for a clean, perfectly symmetrical arc display on the homepage
  const arcImages = imagesList.slice(0, 9).map((item) => item.image);

  return (
    <section className="w-full py-16 sm:py-24 md:py-32 bg-white text-zinc-900 relative z-20 border-t border-zinc-200 overflow-hidden" id="images">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Normal Top Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-2 sm:mb-4">
          <div className="max-w-2xl">
            {/* Header Badges showing actual uploaded count */}
            <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-3 flex-wrap">
              <div className="inline-flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-widest">
                <Camera className="w-4 h-4" />
                <span>06 / CURATED PHOTOGRAPHY</span>
              </div>
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-600 text-xs font-bold uppercase tracking-wider">
                <CameraIcon className="w-3.5 h-3.5 text-red-500" />
                <span>{actualCount} Captures Uploaded</span>
              </div>
            </div>

            <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900">
              Images & Photography
            </h2>
          </div>
        </div>

        {/* 3D Arc Gallery Display on White Background */}
        <ArcGalleryHero
          images={arcImages}
          className="my-2"
        />

        {/* Centered Caption Positioned Below/Slightly Overlapped on larger screens & CTA Button */}
        <div className="flex flex-col items-center justify-center mt-4 sm:-mt-24 md:-mt-40 lg:-mt-52 z-30 relative text-center max-w-xl mx-auto px-4">
          {/* Centered Caption */}
          <p className="text-zinc-600 text-sm sm:text-base md:text-lg font-medium leading-relaxed mb-6">
            Explore a curated collection of editorial portraits, cinematic frames, and fine-art architectural studies.
          </p>

          {/* Glowing CTA Button */}
          <Link
            href="/collections/images"
            className="inline-flex items-center justify-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-zinc-900 text-white font-bold text-sm sm:text-base hover:bg-zinc-800 transition-all shadow-xl hover:scale-105 group w-full sm:w-auto"
          >
            <span>📷 View All {actualCount} Captures</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1.5" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ImagesSection;
