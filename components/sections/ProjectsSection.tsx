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
  {
    id: 'care-console',
    tag: 'HEALTHCARE',
    date: '2025',
    title: 'Care Console',
    description: 'Care console pro is a storage based platform, which provide a secure, user-friendly platform for managing personal medical records.',
    action: 'View Project',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    techStack: ['Django', 'MySQL', 'Python', 'HTML5', 'CSS3', 'AES-256 Security'],
    liveUrl: 'https://careconsole.health',
    githubUrl: 'https://github.com/akshay/care-console',
    details: 'The system leverages cloud technology to provide users with the ability to upload, store, access, and share their medical data from any device, ensuring a seamless experience that prioritizes data security and privacy.',
    detailedReport: {
      overview: 'Care Console Pro delivers a secure, centralized cloud vault for personal health records. It allows patients to aggregate medical reports, prescriptions, and diagnostic scans into an encrypted profile accessible anytime across devices.',
      keyFeatures: [
        'AES-256 encrypted medical document storage and viewer',
        'Granular doctor-patient file sharing with expiring access tokens',
        'Emergency QR code generator for instant paramedic medical summary access',
        'Multi-device responsive dashboard for patients and clinics',
      ],
      architecture: 'Built with Django Web Framework backed by MySQL for transactional record safety. File storage utilizes encrypted cloud bucket storage with token-authenticated pre-signed download URLs.',
    },
  },
  {
    id: 'dental-ai',
    tag: 'HEALTHCARE',
    date: '2025',
    title: 'Dental AI',
    description: 'A complete application for dentist to consultation to analysis. Here we introduce many AI features on this website. This is an user friendly website which makes dentist to handle easily.',
    action: 'Explore Concept',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    techStack: ['React', 'Python', 'PyTorch AI', 'FastAPI', 'Tailwind', 'Shadcn UI'],
    liveUrl: 'https://dental-ai.med',
    githubUrl: 'https://github.com/akshay/dental-ai',
    details: 'Putting patients first with technology that enhances the human touch.',
    detailedReport: {
      overview: 'Dental AI is a diagnostic workstation designed for dental practices. It combines computer vision AI for X-ray radiograph analysis with an intuitive patient consultation manager to streamline clinical workflows.',
      keyFeatures: [
        'AI Radiograph X-ray anomaly detection with heatmap overlays',
        'Automated patient consultation summaries and treatment plan generator',
        'Interactive 3D dental chart interface for patient education',
        'Real-time appointment scheduling & treatment progress tracking',
      ],
      architecture: 'Frontend built in React with Shadcn UI components for sleek clinical design, communicating with a PyTorch Deep Learning backend via FastAPI REST endpoints.',
    },
  },
  {
    id: 'virtual-physics-lab',
    tag: 'EDUCATION',
    date: '2025',
    title: 'Virtual Physics Lab',
    description: 'The Virtual Physics Lab is a modern educational web application designed to simplify complex physics concepts through visual learning, videos, and real-time simulations.',
    action: 'View Project',
    image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=1200&q=80',
    techStack: ['HTML5 Canvas', 'CSS3', 'Django', 'JavaScript', 'MathJax API'],
    liveUrl: 'https://virtualphysicslab.edu',
    githubUrl: 'https://github.com/akshay/virtual-physics-lab',
    details: 'The platform focuses on making physics intuitive, engaging, and accessible for students of all levels by combining theory with interactive experiences.',
    detailedReport: {
      overview: 'Virtual Physics Lab brings interactive laboratory experiences to STEM students globally. It features real-time 2D physics simulations where users can manipulate physical parameters like velocity, gravity, friction, and charge to observe instant mathematical feedback.',
      keyFeatures: [
        'Interactive HTML5 Canvas 2D simulation engine for mechanics and optics',
        'Real-time parameter controls for mass, velocity, gravity, and resistance',
        'Integrated step-by-step video tutorials and interactive quizzes',
        'Automated lab report exporter for student assignment submission',
      ],
      architecture: 'Leverages HTML5 Canvas API and custom JavaScript numerical solvers for smooth 60fps physics simulations, paired with a Django backend for lab course management.',
    },
  },
  {
    id: 'eco-campus',
    tag: 'SUSTAINABILITY',
    date: '2025',
    title: 'Eco-Campus',
    description: 'Year-round campus engagement model to encourage eco-friendly activities. Students earn points for environmental and social awareness tasks. Gamifies sustainability on campus.',
    action: 'Explore Concept',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    techStack: ['Django', 'Python', 'JavaScript', 'HTML5/CSS3', 'Chart.js'],
    liveUrl: 'https://ecocampus.org',
    githubUrl: 'https://github.com/akshay/eco-campus',
    details: 'Uses volunteer verification. Encourage consistent participation in sustainability efforts. Reward meaningful contributions with badges and prizes. Build year-wise eco-leaders through gamification. Create visible campus impact.',
    detailedReport: {
      overview: 'Eco-Campus gamifies environmental responsibility across university campuses. Students submit proof of eco-friendly actions (recycling, energy saving, tree planting) to earn points, badges, and rewards on competitive campus leaderboards.',
      keyFeatures: [
        'Gamified task verification system with photo proof and peer approval',
        'Live campus carbon offset leaderboard & sustainability analytics',
        'Rewards redemption portal for eco-friendly campus perks',
        'Student green ambassador recruitment and badge milestones',
      ],
      architecture: 'Django web backend managing volunteer verification workflows and database point totals, rendering interactive Chart.js analytics for institution-wide impact tracking.',
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
