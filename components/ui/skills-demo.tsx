'use client';

import React from 'react';
import Card, { CardData } from './course-design-cards';

export const skillsData: CardData[] = [
  {
    id: 1,
    colorClass: 'green',
    date: 'SKILL 01',
    title: 'Photography',
    description: 'Portrait, fashion & commercial photography.',
    progressPercent: '95%',
    progressValue: '95%',
    imgSrc1: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    imgAlt1: 'Portrait Shoot',
    imgSrc2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    imgAlt2: 'Fashion Shoot',
    countdownText: 'Available',
  },
  {
    id: 2,
    colorClass: 'orange',
    date: 'SKILL 02',
    title: 'Developer',
    description: 'Modern websites built with Next.js & React.',
    progressPercent: '92%',
    progressValue: '92%',
    imgSrc1: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    imgAlt1: 'React Dev',
    imgSrc2: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80',
    imgAlt2: 'Web Systems',
    countdownText: 'Active',
  },
  {
    id: 3,
    colorClass: 'red',
    date: 'SKILL 03',
    title: 'Editor',
    description: 'Photo retouching, video edit & color grading.',
    progressPercent: '88%',
    progressValue: '88%',
    imgSrc1: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80',
    imgAlt1: 'Color Grading',
    imgSrc2: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
    imgAlt2: 'Video Edit',
    countdownText: 'In Studio',
  },
  {
    id: 4,
    colorClass: 'blue',
    date: 'SKILL 04',
    title: 'Videography',
    description: 'Cinematic video shoots, reels & video production.',
    progressPercent: '90%',
    progressValue: '90%',
    imgSrc1: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=150&q=80',
    imgAlt1: 'Camera Shoot',
    imgSrc2: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    imgAlt2: 'Video Production',
    countdownText: 'Shoots',
  },
];

const SkillsSection: React.FC = () => {
  return (
    <section className="skills-section" id="skills">
      <div className="skills-header">
        <div className="skills-badge">
          <span>●</span> 02 / EXPERTISE
        </div>
        <h2 className="skills-title">
          Personal Skills
        </h2>
        <p className="skills-subtitle">
          Specialized capabilities in Photography, Development, Editing & Videography.
        </p>
      </div>

      <div className="skills-grid">
        {skillsData.map((card) => (
          <Card key={card.id} data={card} />
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
