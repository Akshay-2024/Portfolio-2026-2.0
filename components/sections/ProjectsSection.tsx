'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Layers, ArrowRight, ExternalLink, X, Sparkles, Code2, Globe } from 'lucide-react';

export interface TopProject {
  id: string;
  title: string;
  description: string;
  action: string;
  image: string;
  tag: string;
  techStack?: string[];
  liveUrl?: string;
  details?: string;
}

export const topProjectsData: TopProject[] = [
  {
    id: 'aero-landing-page',
    title: 'Aero Landing Page',
    description: 'A comprehensive AI chatbot platform. This project focuses on the design and development of a user-friendly and visually appealing landing page.',
    action: 'View Project',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    tag: 'AI CHATBOT PLATFORM',
    techStack: ['Next.js 15', 'Tailwind CSS', 'Framer Motion', 'OpenAI API'],
    liveUrl: 'https://example.com/aero',
    details: 'Architected an ultra-sleek landing experience for Aero, featuring interactive AI conversation demos, dynamic pricing cards, and WebGL floating micro-animations.',
  },
  {
    id: 'dreamland-app-concept',
    title: 'Dreamland App Concept',
    description: 'A dreamy mobile app prototype designed for mindfulness and relaxation, featuring calming animations and a serene user interface.',
    action: 'Explore Concept',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    tag: 'MINDFULNESS & UI',
    techStack: ['React Native', 'TypeScript', 'Tailwind', 'Rive Animations'],
    liveUrl: 'https://example.com/dreamland',
    details: 'Crafted a calming mobile UX with fluid gesture-driven navigation, ambient audio visualizers, and customized light/dark theme transitions.',
  },
  {
    id: 'quantum-analytics-dashboard',
    title: 'Quantum Analytics Dashboard',
    description: 'A data visualization tool for quantum computing experiments, providing real-time insights and complex data analysis.',
    action: 'View Project',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    tag: 'DATA VISUALIZATION',
    techStack: ['React', 'D3.js', 'ChartJS', 'Tailwind CSS'],
    liveUrl: 'https://example.com/quantum',
    details: 'Designed a high-density dark mode dashboard for quantum researchers, rendering multi-stream sensor telemetry at 60 FPS with zero layout jitter.',
  },
  {
    id: 'lvmh-maison-experience',
    title: 'LVMH Maison Digital Experience',
    description: 'Luxury digital storefront featuring seamless 3D product interaction, high-conversion editorial layouts, and tailored customer journeys.',
    action: 'View Project',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    tag: 'LUXURY E-COMMERCE',
    techStack: ['Three.js', 'Next.js', 'Shopify Plus', 'GSAP'],
    liveUrl: 'https://example.com/lvmh',
    details: 'Engineered an exclusive e-commerce portal with custom 3D web-GL viewer for high-end luxury products and smooth page transitions.',
  },
  {
    id: 'krypton-financial-vault',
    title: 'Krypton Web3 Financial Vault',
    description: 'Next-generation decentralized finance vault management platform with real-time portfolio analytics and smart contract telemetry.',
    action: 'Explore Concept',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    tag: 'FINTECH & WEB3',
    techStack: ['Ethers.js', 'Wagmi', 'Next.js', 'Tailwind CSS'],
    liveUrl: 'https://example.com/krypton',
    details: 'Created an intuitive Web3 asset vault dashboard featuring real-time yield calculators, transaction history graphs, and wallet connection modals.',
  },
  {
    id: 'aura-spatial-audio',
    title: 'Aura Spatial Audio Interface',
    description: 'Immersive dark-mode web app for spatial sound tuning, active noise cancellation profiling, and interactive acoustic wave manipulation.',
    action: 'View Project',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    tag: 'AUDIO SOFTWARE',
    techStack: ['Web Audio API', 'React', 'Canvas API', 'Tailwind'],
    liveUrl: 'https://example.com/aura',
    details: 'Built a browser-based spatial equalizer with Web Audio API nodes, permitting realtime 360-degree sound field positioning and preset sharing.',
  },
];

export const ProjectsSection: React.FC = () => {
  const [activeModalProject, setActiveModalProject] = useState<TopProject | null>(null);

  // Show only 3 projects on the home section
  const displayedProjects = topProjectsData.slice(0, 3);

  return (
    <section className="w-full py-24 sm:py-32 bg-white text-zinc-900 relative z-20 border-t border-zinc-200 overflow-hidden" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            {/* Header Badge */}
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <div className="inline-flex items-center gap-2 text-[#FF3B30] font-bold text-xs uppercase tracking-widest">
                <Layers className="w-4 h-4" />
                <span>08 / FEATURED WORKS</span>
              </div>
              
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-[#B45309] text-xs font-bold uppercase tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                <span>{topProjectsData.length} Selected Projects</span>
              </div>
            </div>

            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900">
              Top Featured Projects
            </h2>
            <p className="text-zinc-600 text-base sm:text-lg mt-3 leading-relaxed font-sans">
              High-impact web platforms, AI applications, and interactive digital experiences engineered for visual excellence.
            </p>
          </div>
        </div>

        {/* 3-Column Dark Card Grid on White Background */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveModalProject(project)}
              className="group flex flex-col rounded-2xl sm:rounded-3xl bg-[#18181C] text-white border border-zinc-800/80 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400/40 cursor-pointer"
            >
              {/* Media Screenshot Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Optional Tag Overlay */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-bold tracking-wider text-red-400 uppercase">
                    {project.tag}
                  </span>
                </div>
              </div>

              {/* Card Body Content */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 gap-4">
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-white group-hover:text-red-400 transition-colors leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mt-2.5 font-sans font-normal line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Bottom Left Action Link with Arrow */}
                <div className="inline-flex items-center gap-2 text-sm font-bold text-white group-hover:text-red-400 transition-colors pt-2">
                  <span>{project.action}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Link (Navigates to /collections/projects next page) */}
        <div className="flex justify-center mt-12 sm:mt-16">
          <Link
            href="/collections/projects"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-zinc-900 text-white font-bold text-base hover:bg-zinc-800 transition-all shadow-xl hover:scale-105 group border border-zinc-700/50"
          >
            <span>💻 View All {topProjectsData.length} Projects</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
          </Link>
        </div>

      </div>

      {/* Lightbox Detail Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn">
          <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-3xl border border-zinc-800 bg-[#121216] text-white shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-[#16161C]">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
                  {activeModalProject.tag}
                </span>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="h-9 w-9 rounded-full bg-zinc-800 text-zinc-300 hover:bg-white hover:text-zinc-950 flex items-center justify-center transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 flex flex-col gap-6">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
                <img
                  src={activeModalProject.image}
                  alt={activeModalProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-3">
                  {activeModalProject.title}
                </h2>
                <p className="text-zinc-300 text-base leading-relaxed mb-4">
                  {activeModalProject.details || activeModalProject.description}
                </p>

                {/* Tech Stack Pills */}
                {activeModalProject.techStack && (
                  <div className="mt-4 pt-4 border-t border-zinc-800/80">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
                      <Code2 className="w-4 h-4" />
                      <span>Technologies Used</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeModalProject.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
