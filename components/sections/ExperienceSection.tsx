'use client';

import React from 'react';
import {
  CardCurtainReveal,
  CardCurtainRevealBody,
  CardCurtainRevealDescription,
  CardCurtainRevealFooter,
  CardCurtainRevealTitle,
  CardCurtain,
} from '@/components/ui/card-curtain-reveal';
import { ArrowUpRight, Camera, Code, Sparkles, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ExperienceItem {
  id: number;
  roleTag: string;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  isFeatured?: boolean;
}

export const experienceData: ExperienceItem[] = [
  {
    id: 1,
    roleTag: 'MEDIA LEAD',
    title: 'Director of Visual Media',
    description: 'Capturing every moment and story of Hult Prize UCEK 📷 🎬.',
    image: 'https://img.freepik.com/premium-photo/black-camera-lens-focus-with-blurry-blue-smoke-background_14117-1020898.jpg',
    icon: <Camera className="w-5 h-5 text-red-500" />,
    isFeatured: true,
  },
  {
    id: 2,
    roleTag: 'TECHNICAL LEAD',
    title: 'Technical Direction',
    description: 'Managed technical infrastructure and development workflows for digital projects.',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    icon: <Code className="w-5 h-5 text-red-500" />,
  },
  {
    id: 3,
    roleTag: 'CREATIVE TEAM LEAD',
    title: 'Creative Leadership',
    description: 'Led the creative team, overseeing design and media production for events and campaigns.',
    image: 'https://img.freepik.com/premium-photo/illustration-colorful-bulb-with-splash-colors-white-backgroundgenerative-ai_391052-11290.jpg?w=1380',
    icon: <Sparkles className="w-5 h-5 text-red-500" />,
  },
  {
    id: 4,
    roleTag: 'MEMBER',
    title: 'Kerala Tourism Club',
    description: 'Active member contributing photography and visual storytelling.',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    icon: <Compass className="w-5 h-5 text-red-500" />,
  },
];

export const ExperienceSection: React.FC = () => {
  const featured = experienceData.find((item) => item.isFeatured);
  const secondaryItems = experienceData.filter((item) => !item.isFeatured);

  return (
    <section className="experience-section" id="experience">
      <div className="experience-header">
        <div className="experience-badge">
          <span>●</span> 05 / LEADERSHIP & ROLES
        </div>
        <h2 className="experience-title">Professional Experience</h2>
        <p className="experience-subtitle">
          Leading visual media, technical engineering, and creative storytelling teams.
        </p>
      </div>

      <div className="experience-container">
        {/* Top Featured Experience Card */}
        {featured && (
          <div className="experience-featured-wrapper">
            <CardCurtainReveal className="group relative w-full h-[185px] md:h-[195px] overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950 text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-zinc-700">
              <CardCurtainRevealBody className="relative z-10 flex flex-col justify-between h-full p-5 md:p-6 gap-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-zinc-900/90 px-3.5 py-1 text-[11px] font-bold tracking-wider text-white uppercase transition-colors group-hover:border-red-500/60 group-hover:bg-red-500/20 group-hover:text-red-400">
                    {featured.icon}
                    {featured.roleTag}
                  </span>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 rounded-full bg-zinc-900/90 border border-white/20 text-white hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shrink-0 group-hover:bg-red-500 group-hover:text-white"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-col gap-2">
                  <CardCurtainRevealTitle className="font-heading text-lg md:text-xl font-bold tracking-tight text-white group-hover:text-red-400 transition-colors leading-snug">
                    {featured.title}
                  </CardCurtainRevealTitle>

                  <CardCurtainRevealDescription className="text-zinc-300 text-xs md:text-sm max-w-2xl leading-relaxed transition-colors">
                    <p>{featured.description}</p>
                  </CardCurtainRevealDescription>
                </div>
              </CardCurtainRevealBody>

              <CardCurtainRevealFooter className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="relative w-full h-full">
                  <img
                    width="100%"
                    height="100%"
                    alt={featured.title}
                    className="w-full h-full object-cover object-center brightness-125 contrast-105"
                    src={featured.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/45 to-transparent" />
                </div>
              </CardCurtainRevealFooter>
            </CardCurtainReveal>
          </div>
        )}

        {/* Bottom 3 Grid Experience Cards */}
        <div className="experience-grid">
          {secondaryItems.map((item) => (
            <CardCurtainReveal
              key={item.id}
              className="group relative h-[185px] md:h-[195px] w-full overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950 text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-zinc-700"
            >
              <CardCurtainRevealBody className="relative z-10 flex flex-col justify-between h-full p-5 gap-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-zinc-900/90 px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase transition-colors group-hover:border-red-500/60 group-hover:bg-red-500/20 group-hover:text-red-400">
                    {item.icon}
                    {item.roleTag}
                  </span>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-7 w-7 rounded-full bg-zinc-900/90 border border-white/20 text-white hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shrink-0 group-hover:bg-red-500 group-hover:text-white"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Button>
                </div>

                <div className="flex flex-col gap-1.5">
                  <CardCurtainRevealTitle className="font-heading text-base md:text-lg font-bold tracking-tight text-white group-hover:text-red-400 transition-colors leading-snug">
                    {item.title}
                  </CardCurtainRevealTitle>

                  <CardCurtainRevealDescription className="text-zinc-300 text-xs md:text-sm leading-relaxed transition-colors">
                    <p>{item.description}</p>
                  </CardCurtainRevealDescription>
                </div>
              </CardCurtainRevealBody>

              <CardCurtainRevealFooter className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="relative w-full h-full">
                  <img
                    width="100%"
                    height="100%"
                    alt={item.title}
                    className={`w-full h-full object-cover object-center ${item.id === 2 ? 'brightness-125 contrast-105' : 'brightness-110'}`}
                    src={item.image}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.id === 2 ? 'from-zinc-950/90 via-zinc-950/45 to-transparent' : 'from-zinc-950/90 via-zinc-950/60 to-zinc-950/30'}`} />
                </div>
              </CardCurtainRevealFooter>
            </CardCurtainReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
