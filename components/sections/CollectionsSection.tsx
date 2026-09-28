'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { collectionsData } from '@/lib/collectionsData';

export const CollectionsSection: React.FC = () => {
  return (
    <section className="collections-section" id="collections">
      <div className="collections-header">
        <div className="collections-badge">
          <span>●</span> 06 / CURATED ARCHIVE
        </div>
        <h2 className="collections-title">Collections & Archive</h2>
        <p className="collections-subtitle">
          Explore certificates, curated image captures, and cinematic video productions.
        </p>
      </div>

      <div className="collections-container">
        <div className="collections-grid">
          {collectionsData.map((category) => (
            <Link
              key={category.id}
              href={`/collections/${category.id}`}
              className="group relative flex flex-col justify-between p-8 md:p-10 rounded-2xl border border-zinc-800 bg-[#121216] text-zinc-100 cursor-pointer transition-all duration-300 hover:border-amber-400/60 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1 text-left no-underline block"
            >
              {/* Top Icon Row */}
              <div className="flex items-center justify-between mb-8">
                <div className="text-4xl sm:text-5xl transition-transform duration-300 group-hover:scale-110">
                  {category.icon}
                </div>
                <div className="h-9 w-9 rounded-full bg-zinc-800/80 text-zinc-300 border border-zinc-700/50 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-zinc-950 transition-all">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>

              {/* Title & Subtitle Matching Screenshot */}
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors mb-2">
                  {category.title}
                </h3>
                <p className="text-zinc-400 text-sm sm:text-base font-medium">
                  {category.subtitle}
                </p>
              </div>

              {/* Subtle Ambient Glow Effect */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-amber-400/0 via-amber-400/0 to-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;
