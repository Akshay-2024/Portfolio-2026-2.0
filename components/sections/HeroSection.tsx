'use client';

import React, { RefObject } from 'react';

interface HeroSectionProps {
  heroPersonRef: RefObject<HTMLImageElement | null>;
  heroImageParallaxStyle: React.CSSProperties;
  setIsCursorActive: (active: boolean) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  heroPersonRef,
  heroImageParallaxStyle,
  setIsCursorActive,
}) => {
  return (
    <main className="hero-section">
      <div className="hero-container">

        {/* Top Greeting */}
        <div className="greeting-wrapper">
          <span className="wave-emoji">👋</span>
          <p className="greeting-text">Hi, my name is Akshay S and I am a freelance</p>
        </div>

        {/* Headline Typography */}
        <div className="hero-typography">
          <div className="typo-line line-designer">
            <span>Web</span>
            <a 
              href="#projects"
              className="inline-arrow-badge" 
              title="View All Projects"
              onMouseEnter={() => setIsCursorActive(true)}
              onMouseLeave={() => setIsCursorActive(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <span>Developer</span>
          </div>

          <div className="typo-line line-photographer">
            <span className="typo-outline">& Photographer</span>
          </div>
        </div>

        {/* Person Portrait Layer */}
        <div className="person-container">
          <img 
            ref={heroPersonRef}
            src="/person.png" 
            alt="Akshay S — Webdesigner & Photographer" 
            className="person-image"
            style={heroImageParallaxStyle}
          />
        </div>



        

      </div>
    </main>
  );
};

export default HeroSection;
