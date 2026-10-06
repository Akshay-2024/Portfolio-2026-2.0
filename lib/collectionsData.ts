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
    subtitle: '14 products',
    itemCount: '14 Selected Projects',
    description: 'High-impact web platforms, AI applications, fintech portals, and interactive digital experiences engineered for visual excellence.',
    items: [
      {
        id: 14,
        title: 'Portfolio 2026 (v1.0)',
        tag: 'PERSONAL PORTFOLIO',
        description: 'My first personal developer portfolio website. Highlights early creative coding projects, media work, skills showcase, and contact integration built with Next.js and Tailwind CSS.',
        image: '/projects/portfolio-v1.png',
        date: '2026',
        techStack: ['Next.js 14', 'React', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
        liveUrl: 'https://first-portfolio-2026.vercel.app/',
        githubUrl: 'https://github.com/Akshay-2024/Portfolio-2026',
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
        id: 13,
        title: 'IEDC UCK Web Portal',
        tag: 'INSTITUTIONAL & INNOVATION',
        description: 'The official web portal for Innovation and Entrepreneurship Development Centre (IEDC) at University College of Engineering Kariavattom (UCK). Showcasing student startups, innovation events, hackathons, and technical workshops.',
        image: '/projects/iedc-uck.png',
        date: '2026',
        techStack: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Node.js'],
        liveUrl: 'https://iedc.uck.ac.in/',
        githubUrl: 'https://iedc.uck.ac.in/',
        detailedReport: {
          overview: 'The official portal for IEDC UCK serves as the central platform for fostering innovation and entrepreneurial spirit among engineering students at University College of Engineering, Kariavattom.',
          keyFeatures: [
            'Event & Workshop Management: Central hub for hackathon registrations, bootcamps, and technical sessions',
            'Startup Incubation Showcase: Highlighting student-led ventures, patents, and prototype developments',
            'Leadership & Executive Directory: Interactive profiles of student leads, faculty advisors, and mentors',
            'Responsive Glassmorphic Interface: Modern high-performance web architecture optimized for mobile and desktop',
          ],
          architecture: 'Engineered using Next.js App Router for optimal Server-Side Rendering (SSR), structured content models, and fast asset delivery.',
        },
      },
      {
        id: 12,
        title: 'Interactive Campus Map',
        tag: 'GEO NAVIGATION & TECH',
        description: 'An interactive digital campus mapping platform providing real-time building navigation, department locator, event venue routes, and accessibility pathways for students, faculty, and visitors.',
        image: '/projects/campus-map.png',
        date: '2026',
        techStack: ['Next.js', 'React', 'Mapbox GL JS', 'Tailwind CSS', 'TypeScript', 'Vercel'],
        liveUrl: 'https://campus-map-psi.vercel.app/',
        githubUrl: 'https://github.com/Akshay-2024/Campus-Map',
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
        id: 11,
        title: 'My Link Hub',
        tag: 'PRODUCTIVITY & UTILITY',
        description: 'A sleek, customizable all-in-one personal link tree and digital hub. Consolidate social profiles, portfolio links, media channels, and contact endpoints into a unified high-performance landing page.',
        image: '/projects/my-link-hub.png',
        date: '2026',
        techStack: ['React', 'Tailwind CSS', 'HTML5', 'JavaScript', 'Netlify Cloud'],
        liveUrl: 'https://linkhub.akshays.me',
        githubUrl: 'https://github.com/Akshay-2024/My-Link-Hub',
        detailedReport: {
          overview: 'My Link Hub is a high-speed personal biolink platform designed to streamline digital identity sharing across social media, developer portfolios, and content channels.',
          keyFeatures: [
            'Unified Profile Portal: Aggregate all personal, project, and social links into a single landing page',
            'Responsive Glassmorphic UI: Modern dark mode styling with interactive hover effects',
            'Click Analytics & Fast Redirects: Optimized for rapid load times with zero bloat',
            'Netlify Continuous Deployment: Hosted on Netlify Edge with automated Git deployment pipelines',
          ],
          architecture: 'Built using React and Tailwind CSS for declarative UI rendering, with static deployment optimization on Netlify Cloud.',
        },
      },
      {
        id: 10,
        title: 'Scrolling Wedding Invitation 3.0',
        tag: 'LUXURY WEDDINGS',
        description: 'A stunning interactive parallax scrolling wedding invitation experience featuring immersive motion graphics, smooth scroll-driven story timelines, and elegant digital guest RSVP management.',
        image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
        date: '2026',
        techStack: ['Next.js 15', 'React 19', 'Framer Motion', 'Lenis Scroll', 'Tailwind CSS', 'Vercel'],
        liveUrl: 'https://scrolling-wedding-invitation-3.vercel.app/',
        githubUrl: 'https://github.com/Akshay-2024/Scrolling-Wedding-Invitation-3',
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
        id: 9,
        title: 'YT Audio & Video Downloader',
        tag: 'MEDIA DOWNLOADER',
        description: 'High-speed YouTube media extraction web service. Stream, convert, and download YouTube videos in HD MP4 formats or extract high-quality MP3 audio tracks directly.',
        image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80',
        date: '2026',
        techStack: ['Python', 'yt-dlp', 'FFmpeg', 'React', 'Tailwind CSS', 'Render Cloud'],
        liveUrl: 'https://yt-audio-downloader-x55g.onrender.com/',
        githubUrl: 'https://github.com/Akshay-2024/Yt-audio-video-Downloader',
        detailedReport: {
          overview: 'YT Audio & Video Downloader is a full-stack media extraction application allowing users to seamlessly convert and download YouTube videos in high-definition video formats and crisp audio bitrates.',
          keyFeatures: [
            'High-Speed Stream Extraction: Instant media conversion and downloading pipeline',
            'Audio & Video Multi-Format: Extract MP3 audio tracks or full MP4 HD video streams',
            'Custom Quality Options: Select between standard, high-definition, and high-bitrate outputs',
            'Cloud Backend Architecture: Deployed on Render with optimized asynchronous processing queues',
          ],
          architecture: 'Built with a Python server engine leveraging yt-dlp and FFmpeg for media stream processing and demuxing, connected to a responsive web dashboard deployed on Render Cloud.',
        },
      },
      {
        id: 8,
        title: 'Video to Audio Converter',
        tag: 'BROWSER UTILITY',
        description: 'Pull the audio track out of any video, right in your browser — MP3, WAV, or native format. 100% private with zero server upload.',
        image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
        date: '2026',
        techStack: ['Web Audio API', 'FFmpeg.wasm', 'React', 'Tailwind CSS', 'JavaScript', 'WebAssembly'],
        liveUrl: 'https://video-to-audio-ochre.vercel.app/',
        githubUrl: 'https://github.com/Akshay-2024/Video-to-Audio',
        detailedReport: {
          overview: 'Video-to-Audio (Unspool Video Converter) is a privacy-first web utility that extracts pristine audio tracks (MP3, WAV, AAC) directly inside the browser using WebAssembly. Designed with zero server upload architecture, your media files never leave your device.',
          keyFeatures: [
            '100% Client-Side Conversion: No file uploads or server processing required',
            'Multi-Format Export: Convert video inputs to MP3, WAV, and native browser audio formats',
            'Fast & Efficient: Powered by WebAssembly (FFmpeg.wasm) and Web Audio API',
            'Privacy-First Architecture: Total confidentiality with browser-based local processing',
          ],
          architecture: 'Built with React and Tailwind CSS on the frontend, utilizing FFmpeg WebAssembly modules for high-speed local media demuxing and transcoding directly in browser memory without external server dependencies.',
        },
      },
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
        title: 'Kerala Imposter Game',
        tag: 'GAMING & AI',
        description: 'A thrilling pass-and-play imposter deduction party game filled with Kerala culture, traditions, and Malayalam trivia for 3+ players, powered by Google Gemini AI.',
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
        date: '2026',
        techStack: ['Android Kotlin', 'Jetpack Compose', 'Google Gemini AI', 'Material 3', 'Coroutines', 'Retrofit'],
        liveUrl: 'https://github.com/Akshay-2024/Imposter-Game',
        githubUrl: 'https://github.com/Akshay-2024/Imposter-Game',
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
        id: 3,
        title: 'Coastal Connect',
        tag: 'COASTAL CULTURE',
        description: "Coastal Connect is an AI-powered platform that connects travelers with Kerala's authentic coastal culture. It offers immersive experiences like fishing village tours, homestays, and cultural storytelling while empowering local communities.",
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        date: '2026',
        techStack: ['Next.js', 'Python AI', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Mapbox API'],
        liveUrl: 'https://github.com/Akshay-2024/coastal-connect2.git',
        githubUrl: 'https://github.com/Akshay-2024/coastal-connect2.git',
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
        id: 4,
        title: 'Care Console',
        tag: 'HEALTHCARE',
        description: 'Care console pro is a storage based platform, which provide a secure, user-friendly platform for managing personal medical records.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
        date: '2025',
        techStack: ['Django', 'MySQL', 'Python', 'HTML5', 'CSS3', 'AES-256 Security'],
        liveUrl: 'https://github.com/Akshay-2024/Care-Console-Pro.git',
        githubUrl: 'https://github.com/Akshay-2024/Care-Console-Pro.git',
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
        id: 5,
        title: 'Dental AI',
        tag: 'HEALTHCARE',
        description: 'A complete application for dentist to consultation to analysis. Here we introduce many AI features on this website. This is an user friendly website which makes dentist to handle easily.',
        image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
        date: '2025',
        techStack: ['React', 'Python', 'PyTorch AI', 'FastAPI', 'Tailwind', 'Shadcn UI'],
        liveUrl: 'https://github.com/Akshay-2024/DentalAI.git',
        githubUrl: 'https://github.com/Akshay-2024/DentalAI.git',
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
        id: 6,
        title: 'Virtual Physics Lab',
        tag: 'EDUCATION',
        description: 'The Virtual Physics Lab is a modern educational web application designed to simplify complex physics concepts through visual learning, videos, and real-time simulations.',
        image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=1200&q=80',
        date: '2025',
        techStack: ['HTML5 Canvas', 'CSS3', 'Django', 'JavaScript', 'MathJax API'],
        liveUrl: 'https://github.com/Akshay-2024/Virtual-Physics-Lab.git',
        githubUrl: 'https://github.com/Akshay-2024/Virtual-Physics-Lab.git',
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
        id: 7,
        title: 'Eco-Campus',
        tag: 'SUSTAINABILITY',
        description: 'Year-round campus engagement model to encourage eco-friendly activities. Students earn points for environmental and social awareness tasks. Gamifies sustainability on campus.',
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
        date: '2025',
        techStack: ['Django', 'Python', 'JavaScript', 'HTML5/CSS3', 'Chart.js'],
        liveUrl: 'https://github.com/Akshay-2024/Eco-Campus.git',
        githubUrl: 'https://github.com/Akshay-2024/Eco-Campus.git',
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
