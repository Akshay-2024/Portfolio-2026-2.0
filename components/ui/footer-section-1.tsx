"use client";

import React from "react";
import { SocialCloud } from "@/components/ui/footer-section-1-utils/social-cloud";
import { motion, Variants } from "framer-motion";

const PortfolioLogo = ({ className }: { className?: string }) => {
  return (
    <a href="#" className={`inline-flex items-center gap-2 font-bold text-2xl tracking-tight no-underline text-zinc-950 dark:text-white ${className || ""}`}>
      <span className="h-9 w-9 rounded-full bg-red-500 text-white flex items-center justify-center font-serif text-xl font-bold shadow-md shadow-red-500/20">
        ∞
      </span>
      <span className="font-heading">
        Akshay S<span className="text-red-500">.</span>
      </span>
    </a>
  );
};

export default function Footer1() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Education", href: "#education" },
    { name: "Experience", href: "#experience" },
    { name: "Certificates", href: "#certificates" },
    { name: "Images", href: "#images" },
    { name: "Videos", href: "#videos" },
    { name: "Projects", href: "#projects" },
    { name: "Entertainment", href: "/hidden-talent" },
  ];

  return (
    <footer className="w-full py-16 bg-white dark:bg-[#0A0A0D] text-zinc-900 dark:text-zinc-100 border-t border-zinc-200 dark:border-zinc-800/80 overflow-hidden relative z-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        variants={containerVariants}
        className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-10 mb-12"
      >
        {/* Logo */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <PortfolioLogo className="h-10 w-auto" />
        </motion.div>

        {/* Navigation Links */}
        <motion.nav
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-base font-medium relative z-10"
        >
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="relative px-3 py-1.5 group text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors duration-300 no-underline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 font-medium">
                {item.name}
              </span>
              <motion.span
                className="absolute inset-0 bg-red-500/20 dark:bg-red-500/15 rounded-lg -z-0 origin-center"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            </motion.a>
          ))}
        </motion.nav>

        {/* Social Media Icons */}
        <motion.div variants={itemVariants}>
          <SocialCloud className="text-zinc-900 dark:text-zinc-100" />
        </motion.div>
      </motion.div>

      {/* Pattern Animated Divider */}
      <motion.div
        className="w-full h-12 border-y border-zinc-200 dark:border-zinc-800 opacity-30 dark:opacity-20 bg-[repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,transparent_0,transparent_50%)] text-zinc-900 dark:text-white"
        style={{ backgroundSize: "10px 10px" }}
        initial={{ backgroundPositionX: "0%" }}
        whileInView={{ backgroundPositionX: "100%" }}
        viewport={{ once: true }}
        transition={{
          ease: "linear",
          duration: 20,
        }}
      />

      {/* Copyright */}
      <motion.div
        className="max-w-7xl mx-auto px-4 mt-8 text-center text-sm text-zinc-500 dark:text-zinc-400 font-medium"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={itemVariants}
      >
        <p>&copy; {new Date().getFullYear()} Akshay S. All rights reserved.</p>
      </motion.div>
    </footer>
  );
}
