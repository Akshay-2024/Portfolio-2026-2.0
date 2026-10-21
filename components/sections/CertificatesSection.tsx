'use client';

import React from 'react';
import { Award, Trophy } from 'lucide-react';
import { InteractiveFolderGallery } from '@/components/ui/interactive-folder-gallery';
import { collectionsData } from '@/lib/collectionsData';

export const CertificatesSection: React.FC = () => {
  const certCategory = collectionsData.find((c) => c.id === 'certificates');
  const certificatesList = certCategory ? certCategory.items : [];
  const latestCertificates = certificatesList.slice(0, 6);

  return (
    <section className="w-full py-14 sm:py-24 md:py-32 bg-[#0B0B0E] text-white relative z-20 border-t border-zinc-800/80 overflow-hidden" id="certificates">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-4 sm:mb-8">
          <div className="max-w-2xl">
            {/* Header Badges with Total Count */}
            <div className="flex items-center gap-2 sm:gap-3 mb-2.5 sm:mb-3 flex-wrap">
              <div className="inline-flex items-center gap-1.5 sm:gap-2 text-red-500 font-bold text-[11px] sm:text-xs uppercase tracking-widest">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>05 / CERTIFICATIONS & AWARDS</span>
              </div>
              
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500 shrink-0" />
                <span>{certificatesList.length} Verified Certificates</span>
              </div>
            </div>

            <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Certificates & Achievements
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base md:text-lg mt-2 sm:mt-3 leading-relaxed">
              A curated collection of certifications, achievements, leadership milestones, and technical credentials earned throughout my journey.
            </p>
          </div>
        </div>

        {/* 3D Interactive Folder Gallery */}
        <InteractiveFolderGallery
          photos={latestCertificates}
          folderName={`Certificates (${certificatesList.length} Uploaded)`}
          dragHintText="Drag any certificate down to close"
        />

      </div>
    </section>
  );
};

export default CertificatesSection;
