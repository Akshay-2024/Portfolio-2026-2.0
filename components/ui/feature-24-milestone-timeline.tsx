"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { GraduationCap, Cpu, BookOpen, Award, MapPin, Sparkles } from "lucide-react";

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const popIn: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

export interface EducationMilestone {
  badge: string;
  institution: string;
  degree: string;
  location: string;
  icon: React.ReactNode;
  isPursuing?: boolean;
}

export const educationData: EducationMilestone[] = [
  {
    badge: "Pursuing",
    institution: "University College of Engineering, Kariavattom",
    degree: "BTech in Computer Science & Engineering",
    location: "Kariavattom, Trivandrum",
    icon: <GraduationCap className="w-5 h-5 text-red-500 group-hover:text-white transition-colors" />,
    isPursuing: true,
  },
  {
    badge: "2025",
    institution: "Central Polytechnic College, Thiruvananthapuram",
    degree: "Diploma in Computer Engineering",
    location: "Vattiyoorkavu, Trivandrum",
    icon: <Cpu className="w-5 h-5 text-red-500 group-hover:text-white transition-colors" />,
  },
  {
    badge: "2022",
    institution: "Govt. HSS Thonakkal",
    degree: "Higher Secondary (Computer Science)",
    location: "Thonakkal, Trivandrum",
    icon: <BookOpen className="w-5 h-5 text-red-500 group-hover:text-white transition-colors" />,
  },
  {
    badge: "2020",
    institution: "Govt. HSS Elampa",
    degree: "High School (SSLC)",
    location: "Elampa, Trivandrum",
    icon: <Award className="w-5 h-5 text-red-500 group-hover:text-white transition-colors" />,
  },
];

export default function Feature24MilestoneTimeline() {
  return (
    <section className="w-full py-24 sm:py-32 bg-[#0A0A0D] text-white relative z-20 border-t border-zinc-800/80 overflow-hidden" id="education">
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 font-bold text-xs uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>03 / ACADEMIC JOURNEY</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Academic Milestones
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg mt-3 leading-relaxed">
            Building a strong foundation in Computer Engineering, technology, and innovation.
          </p>
        </div>

        {/* Timeline Container */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="relative max-w-5xl mx-auto"
        >
          {/* Center Vertical Gradient Line */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-red-500 via-red-500/40 to-zinc-800" />

          <div className="space-y-12 sm:space-y-16">
            {educationData.map((mil, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={idx}
                  variants={popIn}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Glowing Center Dot Indicator */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6 md:top-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                    {mil.isPursuing ? (
                      <span className="relative flex h-5 w-5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-red-500 border-2 border-[#0A0A0D] shadow-[0_0_15px_rgba(255,59,48,0.8)]" />
                      </span>
                    ) : (
                      <div className="h-4 w-4 rounded-full bg-zinc-900 border-2 border-red-500 shadow-[0_0_12px_rgba(255,59,48,0.5)] transition-transform duration-300 group-hover:scale-125" />
                    )}
                  </div>

                  {/* Card Content Block */}
                  <div className="w-full md:w-1/2 pl-10 sm:pl-12 md:pl-0 md:px-8">
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="group relative rounded-2xl border border-zinc-800/90 bg-[#121216] p-6 sm:p-8 shadow-xl transition-all duration-300 hover:border-red-500/50 hover:shadow-[0_20px_40px_rgba(255,59,48,0.12)]"
                    >
                      {/* Top Row: Icon + Badge */}
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <div className="h-10 w-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0 group-hover:bg-red-500 transition-colors duration-300">
                          {mil.icon}
                        </div>

                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                            mil.isPursuing
                              ? "bg-red-500/15 text-red-400 border border-red-500/40"
                              : "bg-zinc-800/80 text-zinc-300 border border-zinc-700/60"
                          }`}
                        >
                          {mil.isPursuing && (
                            <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                          )}
                          {mil.badge}
                        </span>
                      </div>

                      {/* Institution Title & Degree */}
                      <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-extrabold text-white group-hover:text-red-400 transition-colors leading-snug break-words [overflow-wrap:anywhere]">
                        {mil.institution}
                      </h3>

                      <p className="text-zinc-300 font-semibold text-sm sm:text-base mt-2 break-words">
                        {mil.degree}
                      </p>

                      {/* Location Badge */}
                      <div className="flex items-center gap-1.5 text-zinc-500 text-xs mt-3 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-red-500" />
                        <span>{mil.location}</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
