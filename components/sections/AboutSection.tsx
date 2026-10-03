'use client';

import React, { RefObject } from 'react';

interface AboutSectionProps {
  targetCardRef: RefObject<HTMLDivElement | null>;
  onOpenDrawer: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  targetCardRef,
  onOpenDrawer,
}) => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        
        {/* Left Column Text Content */}
        <div className="about-left-content">
          <div className="about-badge">
            <span>●</span> 01 / WHO I AM
          </div>

          <h2 className="about-headline">
            Creating clean digital experiences & striking visuals.
          </h2>

          <div className="about-description">
            <p>
              Hi, I’m Akshay S — a Computer Engineering student, Front-End Developer, Photographer & Videographer focused on building modern digital experiences and creating compelling visual content.
            </p>
            <p>
              I work across web development, UI/UX design, photography, videography, and digital design, combining technical skills with a strong eye for visual detail.
            </p>
            <p>
             My approach combines clean code, thoughtful design, and visual storytelling — whether I’m developing a website, designing a digital experience, or creating content for a brand.
            </p>
            <p><b>
              Technology meets creativity in everything I create.
              </b>
            </p>
          </div>

          <div className="about-cta-row">
            <button className="cta-btn btn-primary" onClick={onOpenDrawer}>
              <span>Get In Touch</span>
              <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>

            <a 
              href="#cv" 
              className="cv-link" 
              onClick={(e) => { 
                e.preventDefault(); 
                alert('Downloading Akshay S — Resume/CV...'); 
              }}
            >
              <span>Download Resume</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Right Column Target Box for Parallax Portrait Landing */}
        <div className="about-right-frame">
          <div className="parallax-target-card" ref={targetCardRef}>
            
            <img 
              src="/person.png" 
              alt="Akshay S" 
              className="w-full h-full object-contain pointer-events-none block md:hidden max-h-[500px] mt-2 scale-105" 
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
