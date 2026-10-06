'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Layers, ArrowRight, ExternalLink, X, Sparkles, Code2, Globe, FileText, CheckCircle2 } from 'lucide-react';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export interface DetailedReport {
  overview: string;
  keyFeatures: string[];
  architecture: string;
  impact?: string;
}

export interface TopProject {
  id: string;
  title: string;
  description: string;
  action: string;
  image: string;
  tag: string;
  date?: string;
  techStack?: string[];
  liveUrl?: string;
  githubUrl?: string;
  details?: string;
  detailedReport?: DetailedReport;
}

export const topProjectsData: TopProject[] = [
  {
    id: 'portfolio-2026-v1',
    tag: 'PERSONAL PORTFOLIO',
    date: '2026',
    title: 'Portfolio 2026 (v1.0)',
    description: 'My first personal developer portfolio website. Highlights early creative coding projects, media work, skills showcase, and contact integration built with Next.js and Tailwind CSS.',
    action: 'View Project',
    image: '/projects/portfolio-v1.png',
    techStack: ['Next.js 14', 'React', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    liveUrl: 'https://first-portfolio-2026.vercel.app/',
    githubUrl: 'https://github.com/Akshay-2024/Portfolio-2026',
    details: 'The original v1 iteration of Akshay\'s developer portfolio featuring interactive project showcases, bio sections, and personal branding.',
    detailedReport: {
      overview: 'Portfolio 2026 (v1.0) represents the initial milestone in building a digital personal brand. Designed to highlight full-stack projects, creative design work, and developer milestones.',
      keyFeatures: [
        'Interactive Project Showcase: Filterable portfolio cards displaying live deployments',
        'Personal Bio & Skills Matrix: Highlighted tech stack competencies and developer experience',
        'Smooth Micro-Animations: Built with Framer Motion for responsive component transitions',
        'Vercel Continuous Deployment: Hosted on Vercel with automated GitHub CI/CD integration',
      ],
      architecture: 'Built using Next.js App Router and React with Tailwind CSS styling, deployed on Vercel Edge Infra.',
    },
  },
  
  {
    id: 'campus-map',
    tag: 'GEO NAVIGATION & TECH',
    date: '2026',
    title: 'Interactive Campus Map',
    description: 'An interactive digital campus mapping platform providing real-time building navigation, department locator, event venue routes, and accessibility pathways for students, faculty, and visitors.',
    action: 'View Project',
    image: '/projects/campus-map.png',
    techStack: ['Next.js', 'React', 'Mapbox GL JS', 'Tailwind CSS', 'TypeScript', 'Vercel'],
    liveUrl: 'https://campus-map-psi.vercel.app/',
    githubUrl: 'https://github.com/Akshay-2024/Campus-Map',
    details: 'A smart campus navigation portal helping users navigate university buildings, locate classrooms, find accessibility routes, and view live campus events.',
    detailedReport: {
      overview: 'Interactive Campus Map is a responsive web application designed to simplify campus navigation. It offers real-time route directions, building search filters, accessibility options, and dynamic event pinpoints across university grounds.',
      keyFeatures: [
        'Interactive Map Rendering: High-performance vector map rendering with zoom, tilt, and pan controls',
        'Smart Building & Room Search: Instant autocomplete search for departments, lecture halls, and facilities',
        'Turn-by-Turn Campus Navigation: Step-by-step walking directions and wheelchair-accessible routes',
        'Live Event Pinpointing: Geo-tagged map pins highlighting active campus activities and announcements',
      ],
      architecture: 'Built with Next.js App Router and Mapbox GL JS on the frontend, integrated with spatial geo-data JSON schemas and deployed on Vercel Edge Network.',
    },
  },
  {
    id: 'amoraweds',
    tag: 'MY NEW BUSINESS IDEA',
    date: '2026',
    title: 'AmoraWeds',
    description: 'A modern luxury wedding invitation website built using Next.js, React, and immersive UI animations. Designed for premium digital wedding experiences with elegant visuals, smooth interactions, and responsive layouts.',
    action: 'View Project',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    techStack: ['Next.js 15', 'React 19', 'Framer Motion', 'Tailwind CSS', 'TypeScript', 'Node.js'],
    liveUrl: 'https://amoraweds.live',
    githubUrl: 'https://github.com/akshay-2024/amoraweds',
    details: 'Amora Weds focuses on creating cinematic and luxury digital wedding invitations for premium & budget friendly clients using modern web technologies.',
    detailedReport: {
      overview: 'AmoraWeds is a state-of-the-art luxury digital wedding invitation and event experience platform. Built to replace traditional paper invitations, it provides interactive RSVP management, dynamic guest pass generation, live venue mapping, and visual photo galleries.',
      keyFeatures: [
        'Cinematic glassmorphic UI with smooth 60fps animations',
        'Interactive RSVP management with dynamic guest seat tracking',
        'Digital QR guest pass generation for seamless event check-in',
        'Embedded interactive Google Maps venue locator & event schedule timeline',
      ],
      architecture: 'Engineered using Next.js App Router for optimal Server-Side Rendering (SSR) and instant static generation (SSG). Zero layout shift, mobile-first responsive architecture, and optimized media assets.',
    },
  },
  {
    id: 'scrolling-wedding-invitation-3',
    tag: 'LUXURY WEDDINGS',
    date: '2026',
    title: 'Scrolling Wedding Invitation 3.0',
    description: 'A stunning interactive parallax scrolling wedding invitation experience featuring immersive motion graphics, smooth scroll-driven story timelines, and elegant digital guest RSVP management.',
    action: 'View Project',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    techStack: ['Next.js 15', 'React 19', 'Framer Motion', 'Lenis Scroll', 'Tailwind CSS', 'Vercel'],
    liveUrl: 'https://scrolling-wedding-invitation-3.vercel.app/',
    githubUrl: 'https://github.com/Akshay-2024/Scrolling-Wedding-Invitation-3',
    details: 'An interactive digital wedding invitation website built with scroll-triggered visual story scenes, audio player integration, countdown timer, and venue navigation.',
    detailedReport: {
      overview: 'Scrolling Wedding Invitation 3.0 is a cinematic web experience designed to replace traditional paper invitations with interactive scroll-driven storytelling, personalized guest greetings, and real-time event details.',
      keyFeatures: [
        'Parallax Scroll Storytelling: Immersive multi-layer scroll animations powered by Framer Motion & Lenis',
        'Interactive Event Timeline: Smooth animated schedule of wedding ceremonies & reception details',
        'Integrated Venue Navigation: Live Google Maps embedding & venue location direction links',
        'RSVP & Guest Management: Instant digital attendance response form with instant confirmation',
      ],
      architecture: 'Engineered with Next.js 15 App Router and React 19, utilizing Framer Motion and Lenis for 60fps smooth scroll performance and Vercel Edge hosting.',
    },
  },
  
  {
    id: 'kerala-imposter-game',
    tag: 'GAMING & AI',
    date: '2026',
    title: 'Kerala Imposter Game',
    description: 'A thrilling pass-and-play imposter deduction party game filled with Kerala culture, traditions, and Malayalam trivia for 3+ players, powered by Google Gemini AI.',
    action: 'View Project',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    techStack: ['Android Kotlin', 'Jetpack Compose', 'Google Gemini AI', 'Material 3', 'Coroutines', 'Retrofit'],
    liveUrl: 'https://github.com/Akshay-2024/Imposter-Game',
    githubUrl: 'https://github.com/Akshay-2024/Imposter-Game',
    details: 'A local multiplayer deduction game bringing Kerala culture, traditions, and Malayalam trivia to life with pass-and-play gameplay, dynamic imposter roles, and Gemini AI integration.',
    detailedReport: {
      overview: 'Kerala Imposter Game is a social deduction party game designed for mobile devices. Built natively for Android with Kotlin and Jetpack Compose, players pass the device around to discover secret Kerala-themed words while one player is secretly assigned as the Imposter. Powered by Google Gemini AI, the game dynamically generates rich Malayalam cultural topics and trivia.',
      keyFeatures: [
        'Pass-and-play local multiplayer mechanism for 3+ players',
        'Gemini AI integration for dynamic Malayalam trivia & topic generation',
        'Native Jetpack Compose UI with modern Material 3 styling',
        'Rich collection of Kerala cultural themes, festivals, cinema & food categories',
      ],
      architecture: 'Developed using Kotlin native Android architecture with Jetpack Compose for declarative UI rendering. Integrates Gemini API for server-side AI prompt generation and Room database for local state caching.',
    },
  },
  {
    id: 'coastal-connect',
    tag: 'COASTAL CULTURE',
    date: '2026',
    title: 'Coastal Connect',
    description: "Coastal Connect is an AI-powered platform that connects travelers with Kerala's authentic coastal culture. It offers immersive experiences like fishing village tours, homestays, and cultural storytelling while empowering local communities.",
    action: 'Explore Concept',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    techStack: ['Next.js', 'Python AI', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Mapbox API'],
    liveUrl: 'https://coastalconnect.kerala.gov',
    githubUrl: 'https://github.com/akshay/coastal-connect',
    details: 'By blending technology with tradition, it promotes sustainable tourism and preserves the rich heritage of coastal life for future generations.',
    detailedReport: {
      overview: 'Coastal Connect bridges modern tourism technology with indigenous coastal traditions. The AI engine curates tailored itineraries based on user travel preferences while channeling direct booking revenues back to local fishing communities.',
      keyFeatures: [
        'AI Travel Concierge generating personalized coastal itineraries',
        'Direct booking portal for authentic fishing village homestays',
        'Multilingual audio guides & cultural storytelling modules',
        'Verified community marketplace for local coastal experiences',
      ],
      architecture: 'Powered by Next.js for high-speed frontend rendering connected to Python FastAPI microservices for AI itinerary generation and PostgreSQL for spatial geo-location indexing.',
    },
  },
  
  
  
  
];

export const ProjectsSection: React.FC = () => {
  const [activeModalProject, setActiveModalProject] = useState<TopProject | null>(null);

  // Show only 3 projects on the home page section
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

        {/* 3-Column Image Card Grid on White Background */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveModalProject(project)}
              className="group flex flex-col rounded-2xl sm:rounded-3xl bg-[#18181C] text-white border border-zinc-800/80 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400/40 cursor-pointer"
            >
              {/* Top Screenshot Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Tag Overlay */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
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
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fadeIn cursor-pointer"
          onClick={() => setActiveModalProject(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl border border-zinc-800 bg-[#0F0F13] text-white shadow-2xl overflow-hidden cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-[#16161C] shrink-0">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
                  {activeModalProject.tag}
                </span>
                {activeModalProject.date && (
                  <span className="text-xs text-zinc-400 font-medium">
                    📅 {activeModalProject.date}
                  </span>
                )}
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="h-9 w-9 rounded-full bg-zinc-800/80 text-zinc-300 hover:bg-white hover:text-zinc-950 flex items-center justify-center transition-all"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
              
              {/* Project Image Banner */}
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 group">
                <img
                  src={activeModalProject.image}
                  alt={activeModalProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                <a
                  href={activeModalProject.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-xs font-semibold text-zinc-200 hover:bg-white hover:text-black transition-all flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Full Resolution</span>
                </a>
              </div>

              {/* Title & Action Buttons Row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
                <div>
                  <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {activeModalProject.title}
                  </h2>
                  <p className="text-zinc-400 text-sm sm:text-base mt-1.5 leading-relaxed">
                    {activeModalProject.description}
                  </p>
                </div>

                {/* Action Buttons: Live Preview & GitHub */}
                <div className="flex items-center gap-3 shrink-0 flex-wrap">
                  {activeModalProject.liveUrl && (
                    <a
                      href={activeModalProject.liveUrl}
                      target={activeModalProject.liveUrl === '#' ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm shadow-lg shadow-red-500/25 transition-all hover:scale-105 active:scale-95"
                    >
                      <Globe className="w-4 h-4" />
                      <span>Live Preview</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                    </a>
                  )}

                  {activeModalProject.githubUrl && (
                    <a
                      href={activeModalProject.githubUrl}
                      target={activeModalProject.githubUrl === '#' ? '_self' : '_blank'}
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold text-sm border border-zinc-700/60 transition-all hover:scale-105 active:scale-95"
                    >
                      <GithubIcon className="w-4 h-4 text-white" />
                      <span>GitHub Repo</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-0.5 text-zinc-400" />
                    </a>
                  )}
                </div>
              </div>

              {/* Tech Stack Pills */}
              {activeModalProject.techStack && activeModalProject.techStack.length > 0 && (
                <div className="bg-[#141419] p-4 sm:p-5 rounded-2xl border border-zinc-800/80">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                    <Code2 className="w-4 h-4" />
                    <span>Technology Stack & Frameworks</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700/60 text-zinc-200 text-xs font-semibold shadow-sm flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Detailed Project Report Card */}
              {activeModalProject.detailedReport && (
                <div className="bg-[#141419] p-5 sm:p-7 rounded-2xl border border-zinc-800/80 space-y-5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-400 pb-2 border-b border-zinc-800">
                    <FileText className="w-4 h-4 text-red-500" />
                    <span>Detailed Project Report & Technical Architecture</span>
                  </div>

                  {/* Overview */}
                  <div>
                    <h4 className="text-sm font-bold text-zinc-200 mb-1.5 uppercase tracking-wider">
                      📌 Project Executive Summary
                    </h4>
                    <p className="text-zinc-300 text-sm leading-relaxed font-normal">
                      {activeModalProject.detailedReport.overview}
                    </p>
                  </div>

                  {/* Key Features */}
                  {activeModalProject.detailedReport.keyFeatures && (
                    <div>
                      <h4 className="text-sm font-bold text-zinc-200 mb-2.5 uppercase tracking-wider">
                        ⚡ Key Features & Capabilities
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {activeModalProject.detailedReport.keyFeatures.map((feat, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300"
                          >
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="leading-snug">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Architecture & Impact */}
                  {activeModalProject.detailedReport.architecture && (
                    <div className="pt-2">
                      <h4 className="text-sm font-bold text-zinc-200 mb-1.5 uppercase tracking-wider">
                        🏗 Architecture & Impact
                      </h4>
                      <p className="text-zinc-300 text-sm leading-relaxed bg-zinc-950/60 p-4 rounded-xl border border-zinc-800/80 text-zinc-300">
                        {activeModalProject.detailedReport.architecture}
                      </p>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
