'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Award, Camera, Film } from 'lucide-react';
import { collectionsData } from '@/lib/collectionsData';

interface NavbarProps {
  onOpenDrawer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDrawer,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const certs = collectionsData.find((c) => c.id === 'certificates');
  const images = collectionsData.find((c) => c.id === 'images');
  const videos = collectionsData.find((c) => c.id === 'videos');

  const collectionItems = [
    {
      title: 'Certificates',
      subtitle: `${certs?.items.length || 6} achievements`,
      icon: <Award className="w-4 h-4 text-red-500 group-hover:text-white transition-colors" />,
      href: '#certificates',
    },
    {
      title: 'Images',
      subtitle: `${images?.items.length || 6} captures`,
      icon: <Camera className="w-4 h-4 text-red-500 group-hover:text-white transition-colors" />,
      href: '#images',
    },
    {
      title: 'Videos',
      subtitle: `${videos?.items.length || 11} films`,
      icon: <Film className="w-4 h-4 text-red-500 group-hover:text-white transition-colors" />,
      href: '#videos',
    },
  ];

  return (
    <header className="navbar">
      <div className="nav-container">
        <a href="#" className="logo">
          <span className="logo-icon">∞</span>
          <span className="logo-text">Akshay S<span className="dot">.</span></span>
        </a>

        <nav className="nav-links">
          <a href="#about" className="nav-item">About</a>
          <a href="#skills" className="nav-item">Skills</a>
          <a href="#education" className="nav-item">Education</a>
          <a href="#experience" className="nav-item">Experience</a>
          
          {/* Collections Dropdown */}
          <div 
            ref={dropdownRef}
            className="relative inline-block"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button 
              type="button"
              className="nav-item flex items-center gap-1 cursor-pointer bg-transparent border-none font-inherit text-inherit p-0"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              Collections
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-red-500' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-60 rounded-2xl border border-zinc-800 bg-[#16161A] text-white shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-2.5 z-[9999] opacity-100 pointer-events-auto">
                <div className="flex flex-col gap-1.5">
                  {collectionItems.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      onClick={() => setIsDropdownOpen(false)}
                      className="group flex items-center gap-3 p-2.5 rounded-xl hover:bg-zinc-800/90 transition-all duration-200 no-underline text-left"
                    >
                      <div className="h-9 w-9 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0 group-hover:bg-red-500 group-hover:border-red-500 transition-all duration-200">
                        {item.icon}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">
                          {item.title}
                        </span>
                        <span className="text-[11px] text-zinc-400 font-medium">
                          {item.subtitle}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a href="#projects" className="nav-item">Projects</a>
        </nav>

        <div className="nav-right">
          <button className="contact-btn" onClick={onOpenDrawer}>
            Connect
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
