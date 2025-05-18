'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { FiInstagram, FiYoutube, FiMail, FiLinkedin, FiPlay, FiVideo, FiExternalLink, FiArrowUp, FiCreditCard, FiGrid, FiGithub, FiMessageSquare } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  const footerRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);
  
  // Track mouse position for 3D effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Skip intensive calculations if user prefers reduced motion
      if (prefersReducedMotion) return;
      
      // Throttle the mouse move calculations for better performance
      requestAnimationFrame(() => {
        setMousePosition({
          x: e.clientX / window.innerWidth - 0.5,
          y: e.clientY / window.innerHeight - 0.5
        });
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    setIsLoaded(true);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [prefersReducedMotion]);
  
  // Parallax effect on scroll
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end start'],
    smooth: 0.08
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -10], {
    clamp: true
  });
  
  const socialLinks = [
    { name: 'YouTube Main', icon: <FiYoutube className="w-5 h-5" />, url: 'https://www.youtube.com/@mainvictim' },
    { name: 'YouTube Johan', icon: <FiYoutube className="w-5 h-5" />, url: 'https://www.youtube.com/@FakeJohan7' },
    { name: 'Instagram', icon: <FiInstagram className="w-5 h-5" />, url: 'https://www.instagram.com/florious.y/' },
    { name: 'Discord', icon: <FiMessageSquare className="w-5 h-5" />, url: 'https://discord.gg/yNfjdz8B9f' },
  ];

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer ref={footerRef} className="pt-20 pb-10 relative overflow-hidden bg-black perspective-1000">
      {/* Cinematic background with film grain and color grading */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Cinematic overlay with film grain and color grading */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black mix-blend-color-burn"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
        
        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]">
          <motion.div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(rgba(var(--primary),0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--primary),0.3) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
              transformStyle: "preserve-3d"
            }}
            animate={{
              rotateX: [0, 5, 0],
              rotateY: [0, 3, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        {/* Lens flares */}
        <motion.div 
          className="absolute w-32 h-32 rounded-full bg-gradient-radial from-primary/30 via-primary/5 to-transparent"
          style={{
            top: '30%',
            right: '25%',
            filter: 'blur(10px)'
          }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute w-24 h-24 rounded-full bg-gradient-radial from-accent/20 via-accent/5 to-transparent"
          style={{
            bottom: '25%',
            left: '15%',
            filter: 'blur(8px)'
          }}
          animate={{
            opacity: [0, 0.5, 0],
            scale: [0.7, 1.1, 0.7]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
        
        {/* Connection lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M0,30 Q25,50 50,30 T100,30"
              stroke="url(#footerGradient)"
              strokeWidth="0.2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(var(--primary-rgb), 0.5)" />
                <stop offset="50%" stopColor="rgba(var(--accent-rgb), 0.5)" />
                <stop offset="100%" stopColor="rgba(var(--primary-rgb), 0.5)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      
      {/* Top border with animated gradient */}
      <motion.div 
        className="h-px w-full max-w-6xl mx-auto overflow-hidden mb-16 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px 0px" }}
        transition={{ duration: 0.7 }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      <div ref={containerRef} className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Logo and description - with 3D effect */}
          <motion.div 
            className="md:col-span-5 transform-gpu will-change-transform"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            style={{ y }}
          >
            <motion.div
              className="relative perspective-1000"
              whileHover={{
                rotateY: mousePosition.x * 10,
                rotateX: -mousePosition.y * 10,
              }}
            >
              <Link href="/" className="text-2xl font-bold text-white flex items-center">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center backdrop-blur-sm border border-primary/20 mr-3 relative overflow-hidden group">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 opacity-0 group-hover:opacity-100"
                    animate={{
                      x: ['-200%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <FiPlay className="text-primary ml-0.5 relative z-10" />
                </div>
                <span>Johan</span>
              </Link>
            </motion.div>
            <p className="text-gray-300 text-sm mt-4 max-w-sm leading-relaxed backdrop-blur-sm bg-black/20 rounded-md p-3 border-l border-primary/20">
              Creating powerful visual narratives through expert video editing, motion graphics, and cinematic effects that captivate audiences and deliver results.
            </p>
            
            {/* Contact info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center text-sm text-gray-300">
                <FiMail className="mr-2 text-primary" />
                <a href="mailto:contact@johan.com" className="hover:text-primary transition-colors duration-300">
                  contact@johan.com
                </a>
              </div>
            </div>
            
            {/* Social links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((link, i) => (
                <motion.a 
                  key={link.name} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotateY: 10, rotateX: -10 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.1 + (i * 0.1) }}
                  className="w-10 h-10 rounded-lg bg-black/50 backdrop-blur-lg border border-primary/20 flex items-center justify-center hover:border-primary/40 hover:text-primary transition-all duration-300 group relative overflow-hidden"
                  aria-label={link.name}
                >
                  <motion.div 
                    className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0, borderRadius: '50%' }}
                    whileHover={{ scale: 1.5, borderRadius: '0%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10">{link.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          {/* Quick links */}
          <motion.div 
            className="md:col-span-3 transform-gpu"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ y }}
          >
            <div className="p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-primary/10 h-full">
              <h3 className="text-white font-semibold mb-4 text-lg flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/80 mr-2"></span>
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { label: 'Home', href: '/' },
                  { label: 'Projects', href: '/#projects' },
                  { label: 'Services', href: '/#services' },
                  { label: 'Tech Stack', href: '/#tech-stack' },
                  { label: 'Contact', href: '/#contact' },
                ].map((link, i) => (
                  <motion.li 
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.4, delay: 0.2 + (i * 0.1) }}
                  >
                    <Link 
                      href={link.href} 
                      className="text-gray-400 hover:text-primary transition-colors duration-300 inline-flex items-center group relative"
                    >
                      <motion.span 
                        className="w-0 h-[1px] bg-primary absolute -bottom-0.5 left-0 opacity-0 group-hover:opacity-100"
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="w-0 h-[1px] bg-primary group-hover:w-3 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
          
          {/* Services */}
          <motion.div 
            className="md:col-span-4 transform-gpu"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ y }}
          >
            <div className="p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-primary/10 h-full">
              <h3 className="text-white font-semibold mb-4 text-lg flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-accent/80 mr-2"></span>
                Services
              </h3>
              <ul className="space-y-3">
                {[
                  'Premium Video Editing',
                  'Advanced Color Grading',
                  'Dynamic Motion Graphics',
                  'Sound Design & Mixing',
                  '3D Visual Effects',
                  'Multi-Platform Optimization',
                ].map((service, i) => (
                  <motion.li 
                    key={service}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.4, delay: 0.2 + (i * 0.1) }}
                  >
                    <Link 
                      href="/#services" 
                      className="text-gray-400 hover:text-primary transition-colors duration-300 inline-flex items-center group relative"
                    >
                      <motion.span 
                        className="w-0 h-[1px] bg-primary absolute -bottom-0.5 left-0 opacity-0 group-hover:opacity-100"
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                      <span className="w-0 h-[1px] bg-primary group-hover:w-3 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                      {service}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
        
        {/* Back to top button */}
        <div className="flex justify-center mb-8">
          <motion.button 
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-lg border border-primary/20 flex items-center justify-center text-white hover:text-primary hover:border-primary/40 transition-all duration-300 relative overflow-hidden group"
            whileHover={{ y: -5 }}
            whileTap={{ y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div 
              className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100"
              initial={{ scale: 0, borderRadius: '50%' }}
              whileHover={{ scale: 1.5, borderRadius: '0%' }}
              transition={{ duration: 0.6 }}
            />
            <FiArrowUp className="relative z-10" />
          </motion.button>
        </div>
        
        {/* Bottom divider with animation */}
        <motion.div 
          className="h-px w-full overflow-hidden relative my-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        {/* Copyright and legal */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between text-xs"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-500 mb-4 md:mb-0">
            &copy; {currentYear} <span className="text-primary">Johan</span>. All rights reserved. 
            <span className="ml-2 text-gray-400">Made by <a href="https://github.com/dammnranaah" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-primary transition-colors duration-300">dammnranaah</a></span>
          </p>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 mr-2">
              <a href="https://github.com/dammnranaah" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors duration-300">
                <FiGithub className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/dammnranaah" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors duration-300">
                <FiInstagram className="w-4 h-4" />
              </a>
            </div>
            <a href="/privacy-policy" className="text-gray-400 hover:text-primary transition-colors duration-300 relative group">
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300"></span>
              Privacy Policy
            </a>
            <span className="text-gray-600">•</span>
            <a href="/terms-of-service" className="text-gray-400 hover:text-primary transition-colors duration-300 relative group">
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300"></span>
              Terms of Service
            </a>
            <span className="text-gray-600">•</span>
            <a href="/cookies" className="text-gray-400 hover:text-primary transition-colors duration-300 relative group">
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300"></span>
              Cookies
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Film grain effect overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-5 mix-blend-overlay">
        <div className="absolute inset-0 film-grain"></div>
      </div>
    </footer>
  );
}