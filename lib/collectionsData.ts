import { certificatesData } from './certificatesData';
import { imagesData } from './imagesData';
import { videosData } from './videosData';

export interface DetailedReport {
  overview: string;
  keyFeatures: string[];
  architecture: string;
  impact?: string;
}

export interface CollectionItem {
  id: number;
  title: string;
  tag?: string;
  category?: string;
  description?: string;
  image: string;
  date?: string;
  link?: string;
  duration?: string;
  youtubeId?: string;
  isVertical?: boolean;
  loading?: 'eager' | 'lazy';
  techStack?: string[];
  liveUrl?: string;
  githubUrl?: string;
  detailedReport?: DetailedReport;
}

export interface CollectionCategory {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  itemCount: string;
  description: string;
  items: CollectionItem[];
}

export const collectionsData: CollectionCategory[] = [
  {
    id: 'certificates',
    icon: '🏆',
    title: 'Certificates',
    subtitle: `${certificatesData.length} achievements`,
    itemCount: `${certificatesData.length} Achievements`,
    description: 'Verified professional certifications, awards, leadership recognitions, and executive accomplishments in visual media and engineering.',
    items: certificatesData,
  },
  {
    id: 'images',
    icon: '📷',
    title: 'Images',
    subtitle: `${imagesData.length} captures`,
    itemCount: `${imagesData.length} Captures`,
    description: 'Curated gallery of editorial fashion portraits, architecture fine-art captures, and visual documentary series.',
    items: imagesData,
  },
  {
    id: 'videos',
    icon: '🎬',
    title: 'Videos',
    subtitle: `${videosData.length} films`,
    itemCount: `${videosData.length} Films`,
    description: 'Cinematic video reels, event aftermovies, fashion promos, and behind-the-scenes documentary shorts.',
    items: videosData,
  },
  {
    id: 'projects',
    icon: '💻',
    title: 'Projects',
    subtitle: '6 products',
    itemCount: '6 Selected Projects',
    description: 'High-impact web platforms, AI applications, fintech portals, and interactive digital experiences engineered for visual excellence.',
    items: [
      {
        id: 1,
        title: 'AmoraWeds',
        tag: 'MY NEW BUSINESS IDEA',
        description: 'A modern luxury wedding invitation website built using Next.js, React, and immersive UI animations. Designed for premium digital wedding experiences with elegant visuals, smooth interactions, and responsive layouts.',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
        date: '2026',
        techStack: ['Next.js 15', 'React 19', 'Framer Motion', 'Tailwind CSS', 'TypeScript', 'Node.js'],
        liveUrl: 'https://amoraweds.live',
        githubUrl: 'https://github.com/akshay-2024/amoraweds',
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
        id: 2,
        title: 'Coastal Connect',
        tag: 'COASTAL CULTURE',
        description: "Coastal Connect is an AI-powered platform that connects travelers with Kerala's authentic coastal culture. It offers immersive experiences like fishing village tours, homestays, and cultural storytelling while empowering local communities.",
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        date: '2026',
        techStack: ['Next.js', 'Python AI', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Mapbox API'],
        liveUrl: 'https://coastalconnect.kerala.gov',
        githubUrl: 'https://github.com/akshay/coastal-connect',
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
        id: 3,
        title: 'Care Console',
        tag: 'HEALTHCARE',
        description: 'Care console pro is a storage based platform, which provide a secure, user-friendly platform for managing personal medical records.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
        date: '2025',
        techStack: ['Django', 'MySQL', 'Python', 'HTML5', 'CSS3', 'AES-256 Security'],
        liveUrl: 'https://careconsole.health',
        githubUrl: 'https://github.com/akshay/care-console',
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
        id: 4,
        title: 'Dental AI',
        tag: 'HEALTHCARE',
        description: 'A complete application for dentist to consultation to analysis. Here we introduce many AI features on this website. This is an user friendly website which makes dentist to handle easily.',
        image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
        date: '2025',
        techStack: ['React', 'Python', 'PyTorch AI', 'FastAPI', 'Tailwind', 'Shadcn UI'],
        liveUrl: 'https://dental-ai.med',
        githubUrl: 'https://github.com/akshay/dental-ai',
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
        id: 5,
        title: 'Virtual Physics Lab',
        tag: 'EDUCATION',
        description: 'The Virtual Physics Lab is a modern educational web application designed to simplify complex physics concepts through visual learning, videos, and real-time simulations.',
        image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=1200&q=80',
        date: '2025',
        techStack: ['HTML5 Canvas', 'CSS3', 'Django', 'JavaScript', 'MathJax API'],
        liveUrl: 'https://virtualphysicslab.edu',
        githubUrl: 'https://github.com/akshay/virtual-physics-lab',
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
        id: 6,
        title: 'Eco-Campus',
        tag: 'SUSTAINABILITY',
        description: 'Year-round campus engagement model to encourage eco-friendly activities. Students earn points for environmental and social awareness tasks. Gamifies sustainability on campus.',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
        date: '2025',
        techStack: ['Django', 'Python', 'JavaScript', 'HTML5/CSS3', 'Chart.js'],
        liveUrl: 'https://ecocampus.org',
        githubUrl: 'https://github.com/akshay/eco-campus',
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
    ],
  },
];
