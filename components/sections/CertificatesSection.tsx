'use client';

import React from 'react';
import { Award, Trophy } from 'lucide-react';
import { InteractiveFolderGallery } from '@/components/ui/interactive-folder-gallery';
import { collectionsData } from '@/lib/collectionsData';

export const CertificatesSection: React.FC = () => {
  const certCategory = collectionsData.find((c) => c.id === 'certificates');
  const certificatesList = certCategory ? certCategory.items : [];

  return (
    <section className="w-full py-24 sm:py-32 bg-[#0B0B0E] text-white relative z-20 border-t border-zinc-800/80 overflow-hidden" id="certificates">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            {/* Header Badges with Total Count */}
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <div className="inline-flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-widest">
                <Award className="w-4 h-4" />
                <span>06 / CERTIFICATIONS & AWARDS</span>
              </div>
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
                <Trophy className="w-3.5 h-3.5 text-red-500" />
                <span>{certificatesList.length} Verified Certificates</span>
              </div>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Certificates & Achievements
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg mt-3 leading-relaxed">
              Explore verified leadership accomplishments, editorial awards, and technical diplomas. Click the 3D folder below to expand.
            </p>
          </div>
        </div>

        {/* 3D Interactive Folder Gallery */}
        <InteractiveFolderGallery
          photos={certificatesList}
          folderName={`Certificates (${certificatesList.length} Uploaded)`}
          dragHintText="Drag any certificate down to close"
        />

      </div>
    </section>
  );
};

export default CertificatesSection;
