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

  const arcImages = imagesList.map((item) => item.image);

  return (
    <section className="w-full py-24 sm:py-32 bg-white text-zinc-900 relative z-20 border-t border-zinc-200 overflow-hidden" id="images">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Normal Top Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4">
          <div className="max-w-2xl">
            {/* Header Badges showing actual uploaded count */}
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <div className="inline-flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-widest">
                <Camera className="w-4 h-4" />
                <span>07 / CURATED PHOTOGRAPHY</span>
              </div>
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-600 text-xs font-bold uppercase tracking-wider">
                <CameraIcon className="w-3.5 h-3.5 text-red-500" />
                <span>{actualCount} Captures Uploaded</span>
              </div>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900">
              Images & Photography
            </h2>
          </div>
        </div>

        {/* 3D Arc Gallery Display on White Background */}
        <ArcGalleryHero
          images={arcImages}
          className="my-2"
        />

        {/* Centered Caption Positioned "Little Up" & CTA Button */}
        <div className="flex flex-col items-center justify-center -mt-28 sm:-mt-36 md:-mt-44 lg:-mt-52 z-30 relative text-center max-w-xl mx-auto px-4">
          {/* Centered Caption */}
          <p className="text-zinc-600 text-base sm:text-lg font-medium leading-relaxed mb-6">
            Explore {actualCount} editorial portraits, Paris fashion week captures, and fine-art architecture studies.
          </p>

          {/* Glowing CTA Button */}
          <Link
            href="/collections/images"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-zinc-900 text-white font-bold text-base hover:bg-zinc-800 transition-all shadow-xl hover:scale-105 group"
          >
            <span>📷 View All {actualCount} Captures</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default ImagesSection;
