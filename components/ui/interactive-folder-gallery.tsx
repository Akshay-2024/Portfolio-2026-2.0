"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";

export interface GalleryPhoto {
  id: string | number;
  image: string;
  title?: string;
  tag?: string;
}

const defaultPhotos: GalleryPhoto[] = [
  { id: 1, image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80", title: "Director of Visual Media — Hult Prize", tag: "LEADERSHIP" },
  { id: 2, image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80", title: "Advanced Web Architecture & Next.js", tag: "TECHNICAL" },
  { id: 3, image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80", title: "International Editorial Photography Award", tag: "AWARD" },
  { id: 4, image: "https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&w=800&q=80", title: "Creative Team Direction Mastery", tag: "EXECUTIVE" },
  { id: 5, image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80", title: "Full Stack Engineering Certificate", tag: "ENGINEERING" },
];

export interface InteractiveFolderGalleryProps {
  photos?: GalleryPhoto[];
  folderName?: string;
  dragHintText?: string;
  targetHref?: string;
  className?: string;
}

export function InteractiveFolderGallery({
  photos = defaultPhotos,
  folderName = "Certificates.gallery",
  dragHintText = "Drag any photo down to close",
  targetHref = "/collections/certificates",
  className
}: InteractiveFolderGalleryProps) {
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [hoverFolder, setHoverFolder] = useState(false);

  return (
    <div className={`w-full py-12 relative ${className || ""}`}>
      <div className="relative w-full min-h-[520px] flex flex-col items-center justify-center" style={{ perspective: "1200px" }}>

        <div className="relative w-[400px] max-w-full h-[500px] flex justify-center pointer-events-none z-0">

          {/* Folder Backing */}
          <motion.div 
            className="absolute bottom-6 w-80 h-56 drop-shadow-2xl"
            animate={{ opacity: isFolderOpen ? 0 : 1, scale: isFolderOpen ? 0.9 : 1 }}
            style={{ pointerEvents: 'none' }}
          >
            <div className="absolute top-0 left-0 w-32 h-10 bg-gradient-to-t from-[#1e1e1e] to-[#2a2a2a] rounded-t-xl border-t border-l border-r border-white/10" />
            <div className="absolute top-8 left-0 right-0 bottom-0 bg-gradient-to-b from-[#1e1e1e] to-[#0a0a0a] rounded-b-xl rounded-tr-xl border border-white/10 shadow-2xl" />
            <div className="absolute top-10 left-2 right-2 bottom-2 bg-black rounded-lg pointer-events-none opacity-80" />
          </motion.div>

          {/* Stacked Photos */}
          <div className="absolute bottom-10 z-10 flex justify-center w-full">
            {photos.map((photo, i) => {
              const centerIndex = (photos.length - 1) / 2;
              const offset = i - centerIndex;

              const stackY = hoverFolder ? offset * -10 - 40 : offset * -5;
              const stackX = hoverFolder ? offset * 20 : offset * 3;
              const stackRotate = hoverFolder ? offset * 8 : offset * 3;
              const stackScale = 1 - Math.abs(offset) * 0.03;

              const openY = -110;
              const openX = typeof window !== 'undefined' && window.innerWidth < 640 ? offset * 52 : offset * 130;
              const openRotate = 0;
              const openScale = typeof window !== 'undefined' && window.innerWidth < 640 ? 0.95 : 1.05;

              return (
                <motion.div
                  key={photo.id}
                  drag={isFolderOpen}
                  dragSnapToOrigin={true}
                  onDragEnd={(e, info) => {
                    if (info.offset.y > 80 && isFolderOpen) {
                      setIsFolderOpen(false);
                      setHoverFolder(false);
                    }
                  }}
                  className={`absolute bottom-0 w-36 h-48 sm:w-56 sm:h-72 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden border border-red-500/50 bg-zinc-900 origin-bottom ${isFolderOpen ? "cursor-grab active:cursor-grabbing pointer-events-auto" : "pointer-events-none"}`}
                  style={{
                    boxShadow: "0 20px 40px rgba(0,0,0,0.8)",
                  }}
                  animate={!isFolderOpen ? {
                    y: stackY,
                    x: stackX,
                    rotate: stackRotate,
                    scale: stackScale,
                    zIndex: i + 10
                  } : {
                    y: openY,
                    x: openX,
                    rotate: openRotate,
                    scale: openScale,
                    zIndex: 50
                  }}
                  whileHover={isFolderOpen ? { scale: openScale + 0.05, zIndex: 100 } : {}}
                  whileDrag={isFolderOpen ? { scale: openScale + 0.1, rotate: 5, zIndex: 150 } : {}}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                >
                  <img src={photo.image} alt={photo.title || "Certificate"} className="w-full h-full object-cover pointer-events-none select-none" />
                  {photo.tag && (
                    <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-black/80 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold text-red-400 border border-red-500/40 uppercase tracking-wider shadow-md">
                      {photo.tag}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Folder Front Cover */}
          <motion.div 
            className="absolute bottom-0 w-[340px] max-w-full h-44 cursor-pointer z-20 pointer-events-auto drop-shadow-2xl"
            style={{ transformOrigin: "bottom" }}
            animate={{ 
              opacity: isFolderOpen ? 0 : 1, 
              rotateX: hoverFolder ? -25 : 0, 
              y: hoverFolder ? 10 : 0,
              pointerEvents: isFolderOpen ? "none" : "auto" 
            }}
            onMouseEnter={() => setHoverFolder(true)}
            onMouseLeave={() => setHoverFolder(false)}
            onClick={() => setIsFolderOpen(true)}
          >
            <div className="w-full h-full bg-gradient-to-b from-[#2a2a2a] to-[#111115] rounded-2xl border border-red-500/50 shadow-2xl relative overflow-hidden flex items-end justify-center pb-8">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/70 to-transparent" />

              <div className="px-5 py-2.5 bg-black/90 rounded-xl border border-red-500/40 shadow-inner flex items-center justify-center backdrop-blur-md">
                <span className="text-red-400 font-serif text-sm sm:text-base font-semibold tracking-wide flex items-center gap-2">
                  <span>🏆</span> {folderName}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Controls Overlay when Open */}
        <motion.div 
          animate={{ opacity: isFolderOpen ? 1 : 0, y: isFolderOpen ? 0 : 40 }}
          className="absolute bottom-4 flex flex-col items-center gap-2 pointer-events-auto z-50"
        >
          <div className="px-5 py-2 rounded-full bg-red-500/10 border border-red-500/30 backdrop-blur-md text-red-400 text-xs font-bold uppercase tracking-widest">
            {dragHintText}
          </div>
          <Link
            href={targetHref}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-red-500 text-white text-xs font-bold hover:bg-red-600 transition-all shadow-xl shadow-red-500/20"
          >
            <span>Enter Full Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}

export { InteractiveFolderGallery as Component };
