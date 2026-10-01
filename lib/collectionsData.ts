import { certificatesData } from './certificatesData';
import { imagesData } from './imagesData';
import { videosData } from './videosData';

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
        title: 'Aero Landing Page',
        tag: 'AI CHATBOT PLATFORM',
        description: 'A comprehensive AI chatbot platform. This project focuses on the design and development of a user-friendly and visually appealing landing page.',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        date: '2024',
      },
      {
        id: 2,
        title: 'Dreamland App Concept',
        tag: 'MINDFULNESS & UI',
        description: 'A dreamy mobile app prototype designed for mindfulness and relaxation, featuring calming animations and a serene user interface.',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
        date: '2024',
      },
      {
        id: 3,
        title: 'Quantum Analytics Dashboard',
        tag: 'DATA VISUALIZATION',
        description: 'A data visualization tool for quantum computing experiments, providing real-time insights and complex data analysis.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        date: '2024',
      },
      {
        id: 4,
        title: 'LVMH Maison Digital Experience',
        tag: 'LUXURY E-COMMERCE',
        description: 'Luxury digital storefront featuring seamless 3D product interaction, high-conversion editorial layouts, and tailored customer journeys.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        date: '2024',
      },
      {
        id: 5,
        title: 'Krypton Web3 Financial Vault',
        tag: 'FINTECH & WEB3',
        description: 'Next-generation decentralized finance vault management platform with real-time portfolio analytics and smart contract telemetry.',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
        date: '2024',
      },
      {
        id: 6,
        title: 'Aura Spatial Audio Interface',
        tag: 'AUDIO SOFTWARE',
        description: 'Immersive dark-mode web app for spatial sound tuning, active noise cancellation profiling, and interactive acoustic wave manipulation.',
        image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
        date: '2024',
      },
    ],
  },
];
