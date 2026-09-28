import { CollectionItem } from './collectionsData';

/**
 * ==============================================================================
 * CERTIFICATES DATASET
 * Add or edit your certificates here.
 * Format:
 * {
 *   id: number,
 *   title: 'Certificate Name',
 *   tag: 'CATEGORY TAG',
 *   description: 'Details about the certification',
 *   image: 'Image URL or path',
 *   date: 'Year'
 * }
 * ==============================================================================
 */
export const certificatesData: CollectionItem[] = [
  {
    id: 1,
    title: 'Director of Visual Media — Hult Prize UCEK',
    tag: 'EVENT / LEADERSHIP',
    category: 'Event',
    description: 'Official appointment certificate for leading visual identity, photography, and creative direction across all campus event releases.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1000&q=80',
    date: '2024',
  },
  {
    id: 2,
    title: 'Advanced Web Architecture & Next.js 15',
    tag: 'COURSE CERTIFICATION',
    category: 'Course',
    description: 'Certified in modern React server components, tailwind design systems, performance optimization, and WebGL integrations.',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80',
    date: '2024',
  },
  {
    id: 3,
    title: 'AI & Full-Stack Hackathon First Prize',
    tag: 'HACKATHON WINNER',
    category: 'Hackathon',
    description: 'Awarded 1st place in national engineering hackathon for building real-time collaborative web application.',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=1000&q=80',
    date: '2025',
  },
  {
    id: 4,
    title: 'Creative Production & Media Workshop',
    tag: 'WORKSHOP CERTIFICATE',
    category: 'Workshop',
    description: 'Mastery certification in media production pipelines, lighting design, and creative direction for commercial brand projects.',
    image: 'https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&w=1000&q=80',
    date: '2023',
  },
  {
    id: 5,
    title: 'Visual Engineering & UI Design Internship',
    tag: 'INTERNSHIP CERTIFICATE',
    category: 'Internship',
    description: 'Completed 6-month software engineering internship focusing on scalable web platforms and TypeScript components.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1000&q=80',
    date: '2023',
  },
  {
    id: 6,
    title: 'Community Leadership & Media Volunteering',
    tag: 'VOLUNTEERING AWARD',
    category: 'Volunteering',
    description: 'Recognized for outstanding volunteer contributions in visual storytelling and media direction.',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1000&q=80',
    date: '2022',
  },
];
