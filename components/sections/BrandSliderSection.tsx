'use client';

import React from 'react';
import { InfiniteSlider } from '../ui/infinite-slider';

interface SoftwareItem {
  name: string;
  icon: React.ReactNode;
}

export const BrandSliderSection: React.FC = () => {
  // Software from user's image (Row 1: Creative, Video & Core Dev)
  const row1Software: SoftwareItem[] = [
    {
      name: 'Photoshop',
      icon: (
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="10" fill="#001E36" />
          <text x="11" y="32" fill="#31A8FF" fontSize="22" fontWeight="800" fontFamily="sans-serif">Ps</text>
        </svg>
      ),
    },
    {
      name: 'Figma',
      icon: (
        <svg width="36" height="36" viewBox="0 0 38 57" fill="none">
          <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38H19V28.5Z" fill="#1ABCFE" />
          <path d="M0 47.5C0 42.2533 4.2533 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.2533 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
          <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.2533 33.7467 0 28.5 0H19Z" fill="#FF7262" />
          <path d="M0 9.5C0 14.7467 4.2533 19 9.5 19H19V0H9.5C4.2533 0 0 4.2533 0 9.5Z" fill="#F24E1E" />
          <path d="M0 28.5C0 33.7467 4.2533 38 9.5 38H19V19H9.5C4.2533 19 0 23.2533 0 28.5Z" fill="#A259FF" />
        </svg>
      ),
    },
    {
      name: 'Canva',
      icon: (
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="10" fill="#00C4CC" />
          <path d="M24 12C17.37 12 12 17.37 12 24C12 30.63 17.37 36 24 36C27.5 36 30.6 34.5 32.8 32.1L29.6 28.9C28.2 30.2 26.2 31.1 24 31.1C20.1 31.1 16.9 27.9 16.9 24C16.9 20.1 20.1 16.9 24 16.9C26.2 16.9 28.2 17.8 29.6 19.1L32.8 15.9C30.6 13.5 27.5 12 24 12Z" fill="white" />
        </svg>
      ),
    },
    {
      name: 'Lightroom',
      icon: (
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="10" fill="#001E36" />
          <text x="11" y="32" fill="#31A8FF" fontSize="22" fontWeight="800" fontFamily="sans-serif">Lr</text>
        </svg>
      ),
    },
    {
      name: 'CapCut',
      icon: (
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="10" fill="#111111" stroke="#333333" strokeWidth="2" />
          <path d="M14 16L24 24L14 32V16Z" fill="#FFFFFF" />
          <path d="M34 16L24 24L34 32V16Z" fill="#FFFFFF" />
        </svg>
      ),
    },
    {
      name: 'VN',
      icon: (
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="10" fill="#1A1A1A" stroke="#333333" strokeWidth="2" />
          <text x="8" y="32" fill="#FFFFFF" fontSize="20" fontWeight="900" fontFamily="sans-serif">VN</text>
        </svg>
      ),
    },
    {
      name: 'HTML5',
      icon: (
        <svg width="36" height="36" viewBox="0 0 512 512" fill="none">
          <path d="M108.4 0h295.2l-26.8 300.2L256 336l-120.8-35.8L108.4 0z" fill="#E44D26" />
          <path d="M256 308.2l99.3-27.5 22.3-249.7H256v277.2z" fill="#F16529" />
          <path d="M256 128h-80l5.4 60h74.6v58.5h-74.6l5.4 60 69.2 18.7v60.9l-129.2-35.8-16.1-180.2H256V128z" fill="#EBEBEB" />
          <path d="M256 128v58.5h74.6l-7.3 81.5-67.3 18.2v60.9l129.2-35.8 17.5-195.3H256z" fill="#FFFFFF" />
        </svg>
      ),
    },
    {
      name: 'CSS3',
      icon: (
        <svg width="36" height="36" viewBox="0 0 512 512" fill="none">
          <path d="M108.4 0h295.2l-26.8 300.2L256 336l-120.8-35.8L108.4 0z" fill="#264DE4" />
          <path d="M256 308.2l99.3-27.5 22.3-249.7H256v277.2z" fill="#2965F1" />
          <path d="M256 128h-80l5.4 60h74.6v58.5h-74.6l5.4 60 69.2 18.7v60.9l-129.2-35.8-16.1-180.2H256V128z" fill="#EBEBEB" />
          <path d="M256 128v58.5h74.6l-7.3 81.5-67.3 18.2v60.9l129.2-35.8 17.5-195.3H256z" fill="#FFFFFF" />
        </svg>
      ),
    },
    {
      name: 'JavaScript',
      icon: (
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="8" fill="#F7DF1E" />
          <path d="M25.3 36.8c1.3.8 2.8 1.4 4.5 1.4 2.4 0 3.8-1.2 3.8-3 0-2-1.4-2.8-3.9-3.9l-1.3-.6c-3.8-1.6-6.2-3.6-6.2-7.9 0-4.6 3.7-8.1 9.4-8.1 3.2 0 5.6.8 7.3 1.8l-1.8 4.3c-1.3-.8-3-1.4-5.3-1.4-2.2 0-3.6 1.1-3.6 2.6 0 1.9 1.3 2.6 4.1 3.8l1.3.6c4.3 1.8 6.5 3.9 6.5 8.1 0 5.2-4 8.4-10.3 8.4-3.6 0-6.7-1.1-8.5-2.2l1.8-4.3zM10.8 31.4l4.3-2.5c.8 1.4 1.8 2.5 3.5 2.5 1.7 0 2.7-.8 2.7-3.1V15.2h5.5v13.3c0 5.2-3 7.8-8.1 7.8-3.9 0-6.6-1.9-7.9-4.9z" fill="#000000" />
        </svg>
      ),
    },
    {
      name: 'TypeScript',
      icon: (
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="8" fill="#3178C6" />
          <path d="M27 22H37V26H34V37H29V26H27V22ZM13 22H26V26H21.5V37H17.5V26H13V22Z" fill="white" />
        </svg>
      ),
    },
    {
      name: 'React',
      icon: (
        <svg width="36" height="36" viewBox="0 0 100 100" fill="none">
          <ellipse cx="50" cy="50" rx="11" ry="28" transform="rotate(30 50 50)" stroke="#61DAFB" strokeWidth="4" />
          <ellipse cx="50" cy="50" rx="11" ry="28" transform="rotate(90 50 50)" stroke="#61DAFB" strokeWidth="4" />
          <ellipse cx="50" cy="50" rx="11" ry="28" transform="rotate(150 50 50)" stroke="#61DAFB" strokeWidth="4" />
          <circle cx="50" cy="50" r="7" fill="#61DAFB" />
        </svg>
      ),
    },
    {
      name: 'Next.js',
      icon: (
        <svg width="36" height="36" viewBox="0 0 180 180" fill="none">
          <circle cx="90" cy="90" r="90" fill="black" />
          <path d="M149.508 157.52L69.142 54H54V125.97H66.8136V70.3523L138.825 163.66C142.607 161.854 146.183 159.79 149.508 157.52Z" fill="white" />
          <path d="M115 54H127.814V126H115V54Z" fill="white" />
        </svg>
      ),
    },
  ];

  // Software from user's image (Row 2: Backend, DB, Languages & Utilities)
  const row2Software: SoftwareItem[] = [
    {
      name: 'Python',
      icon: (
        <svg width="36" height="36" viewBox="0 0 110 110" fill="none">
          <path d="M54.2 2C30.7 2 31.9 12.2 31.9 12.2v12.5h23v3.3H22.7S6 26.2 6 50.1s14.8 24.3 14.8 24.3h8.8V61.8s-.5-15 14.8-15h25.4s14.3 0 14.3-13.8V19.4S102.3 2 54.2 2zm-12.7 10a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" fill="#3776AB" />
          <path d="M55.8 108c23.5 0 22.3-10.2 22.3-10.2V85.3h-23v-3.3h32.2s16.7 1.8 16.7-22.1-14.8-24.3-14.8-24.3h-8.8v12.6s.5 15-14.8 15H50.2s-14.3 0-14.3 13.8v13.6S23.7 108 55.8 108zm12.7-10a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" fill="#FFD43B" />
        </svg>
      ),
    },
    {
      name: 'Java',
      icon: (
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
          <path d="M22 10C22 10 18 16 26 20C30 22 36 21 32 28C28 35 14 36 12 28C10 20 22 10 22 10Z" fill="#5382A1" />
          <path d="M16 38C24 40 32 38 34 35C36 32 30 31 24 32C18 33 12 36 16 38Z" fill="#E76F00" />
        </svg>
      ),
    },
    {
      name: 'C',
      icon: (
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="8" fill="#1E293B" stroke="#334155" strokeWidth="2" />
          <text x="16" y="33" fill="#A5B4FC" fontSize="26" fontWeight="900" fontFamily="sans-serif">C</text>
        </svg>
      ),
    },
    {
      name: 'C++',
      icon: (
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="8" fill="#004482" />
          <text x="8" y="32" fill="#FFFFFF" fontSize="20" fontWeight="900" fontFamily="sans-serif">C++</text>
        </svg>
      ),
    },
    {
      name: 'MySQL',
      icon: (
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="8" fill="#00618A" />
          <text x="6" y="31" fill="#F29111" fontSize="16" fontWeight="900" fontFamily="sans-serif">MySQL</text>
        </svg>
      ),
    },
    {
      name: 'MongoDB',
      icon: (
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
          <path d="M24 4C24 4 12 16 12 28C12 34.6 17.4 40 24 40C30.6 40 36 34.6 36 28C36 16 24 4 24 4Z" fill="#47A248" />
          <path d="M24 4V40C24.3 40 24.6 39.9 24.8 39.8C30.2 38.8 34 34.1 34 28C34 18 24 4 24 4Z" fill="#499D4A" />
        </svg>
      ),
    },
    {
      name: 'PHP',
      icon: (
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="8" fill="#777BB4" />
          <text x="8" y="31" fill="#FFFFFF" fontSize="18" fontWeight="900" fontFamily="sans-serif">PHP</text>
        </svg>
      ),
    },
    {
      name: 'Node.js',
      icon: (
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
          <path d="M24 6L40 15V33L24 42L8 33V15L24 6Z" fill="#339933" />
          <path d="M24 6L40 15V33L24 42V6Z" fill="#41B883" opacity="0.3" />
        </svg>
      ),
    },
    {
      name: 'Bootstrap',
      icon: (
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="10" fill="#7952B3" />
          <text x="15" y="34" fill="#FFFFFF" fontSize="26" fontWeight="900" fontFamily="sans-serif">B</text>
        </svg>
      ),
    },
    {
      name: 'Tailwind CSS',
      icon: (
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
          <path d="M12 21C14 16 18 14 23 15.5C26 16.4 27.5 19 29.5 19.5C32.5 20.2 35 18 37 15C36 20 33 22 28 21C25 20.4 23.5 17.5 21.5 17C18.5 16.2 16 18.5 12 21ZM12 31C14 26 18 24 23 25.5C26 26.4 27.5 29 29.5 29.5C32.5 30.2 35 28 37 25C36 30 33 32 28 31C25 30.4 23.5 27.5 21.5 27C18.5 26.2 16 28.5 12 31Z" fill="#38BDF8" />
        </svg>
      ),
    },
    {
      name: 'Git',
      icon: (
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="8" fill="#F05032" />
          <circle cx="18" cy="18" r="4" fill="white" />
          <circle cx="18" cy="30" r="4" fill="white" />
          <circle cx="30" cy="24" r="4" fill="white" />
          <path d="M18 18V30M18 24H30" stroke="white" strokeWidth="3" />
        </svg>
      ),
    },
    {
      name: 'VS Code',
      icon: (
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
          <path d="M36 8L24 20L16 13L10 17L6 14L10 24L6 34L10 31L16 35L24 28L36 40V8Z" fill="#007ACC" />
        </svg>
      ),
    },
  ];

  return (
    <section className="software-slider-section" id="tools">
      {/* 2 Rows Infinity Scroll with Edge Gradient Fade */}
      <div className="software-rows-container">
        {/* Row 1 */}
        <div className="software-ticker-row">
          <InfiniteSlider gap={48} duration={32} durationOnHover={55} className="w-full">
            {row1Software.map((tool, idx) => (
              <div key={idx} className="brand-minimal-item">
                <div className="brand-logo-icon">{tool.icon}</div>
                <span className="brand-logo-name">{tool.name}</span>
              </div>
            ))}
          </InfiniteSlider>
        </div>

        {/* Row 2 */}
        <div className="software-ticker-row">
          <InfiniteSlider gap={48} duration={38} durationOnHover={60} className="w-full">
            {row2Software.map((tool, idx) => (
              <div key={idx} className="brand-minimal-item">
                <div className="brand-logo-icon">{tool.icon}</div>
                <span className="brand-logo-name">{tool.name}</span>
              </div>
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
};

export default BrandSliderSection;


