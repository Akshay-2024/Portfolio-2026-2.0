'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/ui/Navbar';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import SkillsSection from '../components/ui/skills-demo';
import Feature24MilestoneTimeline from '../components/ui/feature-24-milestone-timeline';
import ExperienceSection from '../components/sections/ExperienceSection';
import CertificatesSection from '../components/sections/CertificatesSection';
import ImagesSection from '../components/sections/ImagesSection';
import VideosSection from '../components/sections/VideosSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import BrandSliderSection from '../components/sections/BrandSliderSection';
import ContactDrawer from '../components/ui/ContactDrawer';
import Footer1 from '../components/ui/footer-section-1';
import MouseTrail from '../components/ui/MouseTrail';

export default function Home() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isCursorActive, setIsCursorActive] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [windowWidth, setWindowWidth] = useState(1200);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const heroPersonRef = useRef<HTMLImageElement | null>(null);
  const targetCardRef = useRef<HTMLDivElement | null>(null);
  const [deltaPos, setDeltaPos] = useState({ x: 340, y: 640 });

  // Calculate dynamic vector between hero image center and about target box center
  const calculateDistance = () => {
    if (heroPersonRef.current && targetCardRef.current) {
      const heroEl = heroPersonRef.current;
      const targetEl = targetCardRef.current;

      // Temporarily clear inline transform to measure true un-shifted base coordinates
      const currentTransform = heroEl.style.transform;
      heroEl.style.transform = 'none';

      const heroRect = heroEl.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();

      // Restore inline transform immediately
      heroEl.style.transform = currentTransform;

      const currentScrollY = window.scrollY;
      const heroCenterX = heroRect.left + heroRect.width / 2;
      const heroCenterY = heroRect.top + heroRect.height / 2 + currentScrollY;

      const targetCenterX = targetRect.left + targetRect.width / 2;
      const targetCenterY = targetRect.top + targetRect.height / 2 + currentScrollY;

      const newX = Math.round(targetCenterX - heroCenterX);
      const newY = Math.round(targetCenterY - heroCenterY);

      if (newX !== 0 || newY !== 0) {
        setDeltaPos({ x: newX, y: newY });
      }
    }
  };

  // Track scroll position & mouse move for parallax transition
  useEffect(() => {
    let animId: number = 0;
    let mouseAnimId: number = 0;

    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
    }

    const updateParallax = () => {
      if (targetCardRef.current) {
        const targetRect = targetCardRef.current.getBoundingClientRect();
        const viewportH = window.innerHeight || 800;
        
        const targetTop = targetRect.top + window.scrollY;
        const endScroll = Math.max(100, targetTop - viewportH * 0.2);

        const currentScroll = window.scrollY;
        const progress = Math.min(1, Math.max(0, currentScroll / endScroll));
        setScrollProgress(progress);
      } else {
        const scrollY = window.scrollY;
        const windowH = window.innerHeight || 800;
        const progress = Math.min(1, Math.max(0, scrollY / (windowH * 0.7)));
        setScrollProgress(progress);
      }
    };

    updateParallax();
    calculateDistance();

    const t1 = setTimeout(calculateDistance, 100);
    const t2 = setTimeout(calculateDistance, 500);
    const t3 = setTimeout(calculateDistance, 1200);

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseAnimId) {
        mouseAnimId = requestAnimationFrame(() => {
          setCursorPos({ x: e.clientX, y: e.clientY });

          const { innerWidth, innerHeight } = window;
          const xPercent = (e.clientX / innerWidth - 0.5) * 2;
          const yPercent = (e.clientY / innerHeight - 0.5) * 2;
          setMouseOffset({ x: xPercent * 8, y: yPercent * 6 });
          mouseAnimId = 0;
        });
      }
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      calculateDistance();
    };

    const handleScroll = () => {
      if (!animId) {
        animId = requestAnimationFrame(() => {
          updateParallax();
          animId = 0;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (animId) cancelAnimationFrame(animId);
      if (mouseAnimId) cancelAnimationFrame(mouseAnimId);
    };
  }, []);

  // Dynamic parallax calculations: Hero image glides cleanly into About target box
  const isMobile = windowWidth <= 768;
  const translateX = isMobile ? 0 : mouseOffset.x + (scrollProgress * deltaPos.x);
  const translateY = isMobile ? 0 : mouseOffset.y + (scrollProgress * (deltaPos.y - 25));
  const scale = isMobile ? 1 : 1.15 - (scrollProgress * 0.15);

  const heroImageParallaxStyle = {
    transform: isMobile ? 'none' : `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
    zIndex: 100,
    position: 'relative' as const,
    transition: 'transform 0.05s linear',
  };

  return (
    <>
      {/* Interactive Framer Mouse Trail */}
      <MouseTrail 
        variant="line"
        fillType="gradient"
        trailColor="#FF3B30"
        trailColorEnd="#FF9500"
        trailLength={24}
        lineWidth={4}
        fadeOut={true}
        smoothing={0.25}
      />

      {/* Custom Cursor Follower */}
      <div 
        className={`custom-cursor ${isCursorActive ? 'active' : ''}`}
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
      />

      {/* Navbar Header */}
      <Navbar 
        onOpenDrawer={() => setIsDrawerOpen(true)}
      />

      {/* Hero Section Component */}
      <HeroSection 
        heroPersonRef={heroPersonRef}
        heroImageParallaxStyle={heroImageParallaxStyle}
        setIsCursorActive={setIsCursorActive}
      />

      {/* About Section Component */}
      <AboutSection 
        targetCardRef={targetCardRef}
        onOpenDrawer={() => setIsDrawerOpen(true)}
      />

      {/* Personal Skills Section Component */}
      <SkillsSection />

      {/* Brand & Clients Infinite Slider Section Component */}
      <BrandSliderSection />

      {/* Education & Milestones Timeline Section */}
      <Feature24MilestoneTimeline />

      {/* Experience & Roles Section */}
      <ExperienceSection />

      {/* 06 / Certificates & Achievements Section */}
      <CertificatesSection />

      {/* 07 / Curated Images & Photography Gallery Section */}
      <ImagesSection />

      {/* 08 / Cinematic Videos & Film Reels Section */}
      <VideosSection />

      {/* 09 / Top Featured Projects Section (White Background) */}
      <ProjectsSection />

      {/* Footer 1 Section */}
      <Footer1 />

      {/* Contact Slide-over Drawer */}
      <ContactDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}
