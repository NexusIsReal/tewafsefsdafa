'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiLinkedin, FiInstagram, FiArrowRight, FiYoutube, FiPlay, FiMessageSquare } from 'react-icons/fi';
import { MdOutlineVideoLibrary, MdOutlineSpeed } from 'react-icons/md';
import { IoVideocamOutline, IoColorPaletteOutline } from 'react-icons/io5';
import { BsLightningCharge, BsCameraReels } from 'react-icons/bs';
import { TbBrandCinema4D } from 'react-icons/tb';
import { SiAdobepremierepro, SiAdobeaftereffects, SiAdobephotoshop, SiAdobeillustrator } from 'react-icons/si';
import { RiCameraLensFill, RiVidiconLine, RiScissorsCutFill } from 'react-icons/ri';

// Glitch Text Effect Component
const GlitchText = ({ text, className = "" }: { text: string, className?: string }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 z-0 text-primary/80 glitch-1">{text}</span>
      <span className="absolute top-0 left-0 z-0 text-accent/80 glitch-2">{text}</span>
    </div>
  );
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showReelVideo, setShowReelVideo] = useState(false);
  const [selectedProjectVideo, setSelectedProjectVideo] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Animated counters
  const projects = useMotionValue(0);
  const clients = useMotionValue(0);
  const springProjects = useSpring(projects, { stiffness: 100, damping: 30 });
  const springClients = useSpring(clients, { stiffness: 100, damping: 30 });
  
  const specialtyTexts = [
    "Cinematic Storytelling",
    "Visual Effects Master",
    "Color Grading Expert",
    "Motion Graphics Artist"
  ];
  
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
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [prefersReducedMotion]);
  
  // Set loaded state after component mounts for animations
  useEffect(() => {
    setIsLoaded(true);
    
    // Skip animations if user prefers reduced motion
    if (prefersReducedMotion) {
      // Skip specialty text rotation
      // Set counters directly without animations
      projects.set(120);
      clients.set(45);
      return;
    }
    
    // Cycle through specialty texts
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % specialtyTexts.length);
    }, 3000);
    
    // Animated counter effect
    const timeout = setTimeout(() => {
      projects.set(120);
      clients.set(45);
    }, 1000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [prefersReducedMotion]);
  
  // Parallax effect on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
    smooth: 0.1
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200], {
    clamp: false
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0], {
    clamp: true
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95], {
    clamp: true
  });

  // Scroll to contact section
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Toggle demo reel video
  const toggleDemoReel = () => {
    setSelectedProjectVideo(null);
    setShowReelVideo(!showReelVideo);
    if (!showReelVideo && videoRef.current) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  // Toggle project video
  const toggleProjectVideo = (videoUrl: string) => {
    setSelectedProjectVideo(videoUrl);
    setShowReelVideo(true);
    if (videoRef.current) {
      // Need to set src and load video before playing
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play();
          setIsVideoPlaying(true);
        }
      }, 100);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    }
  };
  
  // Film frame animation
  const filmFrameVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.5 } }
  };
  
  // Fancy hover effects for buttons
  const buttonHoverVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(var(--color-primary-rgb), 0.4)",
      transition: { duration: 0.2, ease: "easeOut" }
    }
  };
  
  // Shutter animation
  const shutterVariants = {
    closed: { height: '50%' },
    open: { 
      height: '0%',
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <section id="home" ref={sectionRef} className="min-h-screen relative overflow-hidden bg-gradient-to-br from-black via-[#070B14] to-[#0A0F1F] perspective-1000">
      {/* Cinematic shutter effect on load */}
      <motion.div 
        initial="closed"
        animate="open"
        variants={shutterVariants}
        className="absolute top-0 left-0 w-full bg-black z-50"
      />
      <motion.div 
        initial="closed"
        animate="open"
        variants={shutterVariants}
        className="absolute bottom-0 left-0 w-full bg-black z-50"
      />
    
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden perspective-1000">
        <div className="absolute top-0 left-0 w-full h-full bg-[#050505] opacity-90"></div>
        
        {/* Film grain effect - Overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none z-10">
          <div className="absolute inset-0 film-grain"></div>
        </div>
        
        {/* Dynamic grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[linear-gradient(rgba(50,50,75,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(50,50,75,0.15)_1px,transparent_1px)]" style={{ backgroundSize: '40px 40px' }}></div>
        </div>
        
        {/* Video background with enhanced overlay */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute w-full h-full object-cover opacity-40"
        >
          <source src="/videos/background-reel.mp4" type="video/mp4" />
        </video>
        
        {/* Circuitry pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] bg-repeat"></div>
        </div>
        
        {/* Animated color bands */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-70 z-10">
          <motion.div 
            className="h-full w-full bg-white"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-70 z-10">
          <motion.div 
            className="h-full w-full bg-white"
            animate={{ x: ['100%', '-100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        {/* 3D Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Left side 3D elements */}
          <div className="absolute left-10 top-1/4 transform-gpu perspective-1000">
            <motion.div
              className="w-60 h-40 bg-primary/5 backdrop-blur-sm rounded-md border border-white/10 shadow-xl shadow-primary/10"
              style={{
                rotateY: mousePosition.x * 20,
                rotateX: -mousePosition.y * 20,
                translateZ: 100,
                x: -50
              }}
              animate={{
                rotateY: [0, mousePosition.x * 20],
                rotateX: [0, -mousePosition.y * 20],
                y: [0, -10, 0],
              }}
              transition={{
                rotateY: { duration: 0.5 },
                rotateX: { duration: 0.5 },
                y: { duration: 4, repeat: Infinity, repeatType: "reverse" }
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-80"></div>
              <div className="absolute top-2 left-2 text-white/40 text-xs font-mono tracking-wider">SCENE.01</div>
              <div className="absolute bottom-2 right-2 text-white/40 text-xs font-mono">CAMERA A</div>
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <RiCameraLensFill className="text-primary/50 text-6xl" />
              </motion.div>
            </motion.div>
          </div>
          
          {/* Top-right corner element */}
          <motion.div
            className="absolute right-10 top-24 w-40 h-40"
            animate={{ 
              rotate: [0, 360],
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            }}
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 opacity-70"></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary"></div>
            </div>
          </motion.div>
          
          {/* Floating camera control elements */}
          <motion.div
            className="absolute right-28 top-44 w-10 h-10 bg-black/30 backdrop-blur-md border border-white/10 rounded-lg flex items-center justify-center"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          >
            <RiVidiconLine className="text-primary/80 text-lg" />
          </motion.div>
          
          <motion.div
            className="absolute right-40 top-52 w-8 h-8 bg-black/30 backdrop-blur-md border border-white/10 rounded-lg flex items-center justify-center"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
          >
            <RiScissorsCutFill className="text-accent/80 text-sm" />
          </motion.div>
          
          {/* 3D floating box with video frame */}
          <motion.div
            className="absolute left-20 top-1/2 perspective-1000 w-72 h-48 opacity-90"
            style={{
              rotateY: mousePosition.x * 10,
              rotateX: -mousePosition.y * 10,
              translateZ: 50,
            }}
            animate={{
              y: [0, 15, 0],
              rotateY: [0, mousePosition.x * 10],
              rotateX: [0, -mousePosition.y * 10],
            }}
            transition={{
              y: { duration: 6, repeat: Infinity, repeatType: "reverse" },
              rotateY: { duration: 0.5 },
              rotateX: { duration: 0.5 },
            }}
          >
            <div className="absolute inset-0 bg-black/30 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden transform-gpu">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/5"></div>
              <div className="absolute inset-0 p-4">
                {/* Video editing timeline effect */}
                <div className="absolute bottom-4 left-4 right-4 h-3 bg-black/50 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary/50 rounded-full"
                    animate={{ width: ['0%', '100%'] }}
                    transition={{ duration: 8, repeat: Infinity }}
                  />
                  {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div 
                      key={i}
                      className="absolute top-0 bottom-0 w-0.5 bg-white/50"
                      style={{ left: `${(i+1) * 12.5}%` }}
                      initial={{ height: 0 }}
                      animate={{ height: '100%' }}
                      transition={{ delay: i * 0.2 }}
                    />
                  ))}
                </div>
                
                {/* Code/Edit markers */}
                <div className="absolute top-2 left-2 flex items-center">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  <span className="ml-2 text-xs font-mono text-white/70">REC</span>
                </div>
                
                {/* Floating text elements */}
                <div className="relative h-full">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute px-2 py-0.5 bg-black/20 rounded text-white/70 text-xs border border-white/10"
                      style={{ 
                        top: `${20 + i * 15}%`, 
                        left: `${10 + (i % 3) * 20}%`,
                        opacity: 0.7
                      }}
                      animate={{ 
                        x: [0, 5, 0], 
                        opacity: [0.5, 0.8, 0.5] 
                      }}
                      transition={{ 
                        duration: 3 + i, 
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: i * 0.5 
                      }}
                    >
                      {["Frame", "Effect", "Color", "Audio", "Track"][i]}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Film strip animated overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -left-20 top-0 w-28 h-screen opacity-30"
            animate={{ x: [-20, 0], opacity: [0, 0.3] }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <div className="h-full w-full flex flex-col">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="w-full h-16 border-t-2 border-b-2 border-white/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white/30 mx-1"></div>
                  <div className="w-3 h-3 rounded-full bg-white/30 mx-1"></div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute -right-20 top-0 w-28 h-screen opacity-30"
            animate={{ x: [20, 0], opacity: [0, 0.3] }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            <div className="h-full w-full flex flex-col">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="w-full h-16 border-t-2 border-b-2 border-white/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white/30 mx-1"></div>
                  <div className="w-3 h-3 rounded-full bg-white/30 mx-1"></div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Animated film slider */}
          <motion.div 
            className="absolute -bottom-2 left-0 w-full h-10 opacity-50"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            transition={{ duration: 1, delay: 2, ease: "easeOut" }}
          >
            <div className="flex w-[200%] h-full">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="flex-shrink-0 h-full w-16 border-r border-primary/30 relative">
                  <motion.div
                    className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-primary/20 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.7, 0] }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      repeatType: "loop", 
                      delay: i * 0.05,
                      ease: "easeInOut" 
                    }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Improved gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10"></div>
        
        {/* Glowing orbs for dynamic effect */}
        <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-primary/5 blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
        
        {/* Video editor frame markers */}
        <div className="absolute bottom-0 left-0 w-full h-16 opacity-20">
          <div className="relative w-full h-full">
            <motion.div 
              className="absolute left-0 bottom-0 h-1 bg-primary"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div 
                key={i} 
                className="absolute bottom-1 w-0.5 h-4 bg-white/50"
                style={{ left: `${i * 5}%` }}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 16 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 pt-24 md:pt-36 pb-20 md:pb-0 h-screen flex flex-col justify-center relative z-20">
        {/* Demo reel modal */}
        <AnimatePresence>
          {showReelVideo && (
            <motion.div 
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleDemoReel}
            >
              <motion.div
                className="relative w-full max-w-5xl max-h-[80vh] rounded-lg overflow-hidden shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
              >
                <video 
                  ref={videoRef}
                  className="w-full h-full object-cover" 
                  src={selectedProjectVideo || "/videos/demo-reel.mp4"}
                  controls
                  autoPlay
                  onEnded={() => setIsVideoPlaying(false)}
                />
                <button
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDemoReel();
                  }}
                >
                  ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Main content */}
        <div className="flex flex-col md:flex-row items-center justify-center">
          {/* Text content with enhanced animations - centered */}
          <motion.div 
            className="w-full md:w-1/2 max-w-2xl z-10"
            style={{ y, opacity, scale }}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* Name with text effect and cinematic styling */}
            <motion.div variants={itemVariants} className="overflow-hidden relative">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight z-10 mb-2 text-center">
                <span className="relative inline-block">
                  <span className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/10 blur-xl"></span>
                  <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-primary/90 tracking-tight">Johan</span>
                </span>
            </h1>
              <div className="flex items-center space-x-3 mb-3 justify-center">
                <motion.div 
                  className="h-px w-6 bg-primary/50"
                  initial={{ width: 0 }}
                  animate={{ width: 24 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                />
                <motion.div 
                  className="text-white/40 text-xs tracking-widest font-mono"
                  animate={{ opacity: [0, 0.2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
                >
                  REC 00:15:32:08
                </motion.div>
                <motion.div 
                  className="h-px w-16 bg-primary/50"
                  initial={{ width: 0 }}
                  animate={{ width: 64 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                />
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="text-xl md:text-2xl font-medium text-center mb-2"
            >
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent font-light tracking-wide">Bringing Stories to Life</span>
                <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-primary/50 to-transparent"></span>
              </span>
            </motion.div>
            
            {/* Typing animation for specialties */}
            <motion.div 
              variants={itemVariants} 
              className="h-8 text-base text-white/90 text-center mb-5 font-light flex items-center justify-center"
            >
              <span className="mr-2 text-white/70 tracking-wide">Specialist in</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={specialtyTexts[textIndex]}
                  className="text-primary font-semibold tracking-wide px-2 py-0.5 bg-white/5 backdrop-blur-sm rounded-sm border-l border-primary/50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {specialtyTexts[textIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Software expertise */}
            <motion.div 
              variants={itemVariants} 
              className="flex flex-wrap gap-3 my-5 justify-center"
            >
              {[
                { icon: <SiAdobepremierepro className="text-sm" />, name: "Premiere Pro" },
                { icon: <SiAdobeaftereffects className="text-sm" />, name: "After Effects" },
                { icon: <SiAdobephotoshop className="text-sm" />, name: "Photoshop" },
                { icon: <TbBrandCinema4D className="text-sm" />, name: "Cinema 4D" },
              ].map((software, i) => (
                <motion.div
                  key={software.name}
                  className="flex items-center text-xs text-white/80 bg-gradient-to-r from-black/60 to-black/30 px-2.5 py-1.5 rounded-md border border-white/10 shadow-md backdrop-blur-sm"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <span className="mr-1.5 text-primary">{software.icon}</span>
                  <span className="tracking-wide font-medium">{software.name}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Skill tags with animations */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-2 my-5 justify-center"
            >
              {[
                { label: 'Commercial Production', icon: <BsCameraReels className="mr-1.5" /> },
                { label: 'Advanced Color Grading', icon: <IoColorPaletteOutline className="mr-1.5" /> },
                { label: 'Dynamic Motion Graphics', icon: <MdOutlineSpeed className="mr-1.5" /> },
                { label: '3D Visual Effects', icon: <TbBrandCinema4D className="mr-1.5" /> },
                { label: 'Cinematic Sound Design', icon: <BsLightningCharge className="mr-1.5" /> },
              ].map((skill, i) => (
                <motion.span 
                  key={skill.label}
                  className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-black/60 to-black/40 backdrop-blur-sm border border-white/10 rounded-full text-xs text-white/90 shadow-lg shadow-black/20 hover:border-primary/30 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {skill.icon} <span className="tracking-wide">{skill.label}</span>
                </motion.span>
              ))}
            </motion.div>

            {/* Description with enhanced styling */}
            <motion.div 
              variants={itemVariants}
              className="mb-6 mx-auto text-center"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/5 to-accent/5 blur-lg"></div>
                <p className="relative text-base max-w-lg text-gray-200/90 leading-relaxed backdrop-blur-sm bg-gradient-to-r from-black/40 to-black/20 p-4 rounded-lg border-l-2 border-primary/60 shadow-xl shadow-black/10 mx-auto">
                  I transform <span className="text-white font-medium">ordinary footage</span> into <span className="text-white font-medium">compelling visual narratives</span> that captivate and inspire. With meticulous attention to pacing, color science, and emotional storytelling, my work helps brands and creators achieve their vision with <span className="text-primary/90">cinematic polish</span> and <span className="text-accent/90">technical excellence</span>.
                </p>
              </div>
            </motion.div>

            {/* CTA buttons with enhanced styling */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-3 justify-center"
            >
              <motion.button 
                onClick={scrollToContact}
                className="px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-medium rounded-md transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 tracking-wide text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Let's Create Together
              </motion.button>
              
              <motion.button
                onClick={() => {
                  setSelectedProjectVideo("/videos/myworks.mp4");
                  setShowReelVideo(true);
                  if (videoRef.current) {
                    setTimeout(() => {
                      if (videoRef.current) {
                        videoRef.current.play();
                        setIsVideoPlaying(true);
                      }
                    }, 100);
                  }
                }}
                className="px-6 py-3 bg-black/40 backdrop-blur-sm border border-white/20 hover:border-primary/60 text-white font-medium rounded-md transition-all duration-300 hover:bg-black/50 transform hover:-translate-y-1 inline-flex items-center shadow-md tracking-wide text-sm group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiPlay className="mr-2 text-primary group-hover:text-white transition-colors duration-300" />
                Watch Portfolio Video
                <motion.span
                  className="ml-1 w-1.5 h-1.5 rounded-full bg-primary"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.button>
            </motion.div>
            
            {/* Social links and metrics - combined row */}
            <motion.div 
              variants={itemVariants}
              className="mt-8 flex items-center justify-center space-x-8"
            >
              {/* Social links */}
              <div className="flex space-x-4">
                {[
                  { href: "https://www.youtube.com/@mainvictim", icon: <FiYoutube className="w-5 h-5" /> },
                  { href: "https://www.youtube.com/@FakeJohan7", icon: <FiYoutube className="w-5 h-5" /> },
                  { href: "https://www.instagram.com/florious.y/", icon: <FiInstagram className="w-5 h-5" /> },
                  { href: "https://discord.gg/yNfjdz8B9f", icon: <FiMessageSquare className="w-5 h-5" /> }
                ].map((social, index) => (
                  <motion.div
                    key={social.href}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                <Link 
                      href={social.href}
                  target="_blank" 
                  rel="noopener noreferrer" 
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-primary transition-all duration-300 border border-white/10 hover:border-primary/50 shadow-lg shadow-black/10"
                >
                      {social.icon}
                </Link>
                  </motion.div>
                ))}
              </div>
              
              {/* Availability badge */}
              <motion.div 
                className="flex items-center space-x-2 backdrop-blur-sm bg-gradient-to-r from-black/50 to-black/30 px-4 py-2 rounded-full border border-primary/40 shadow-lg shadow-black/10"
                whileHover={{ scale: 1.05 }}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                <span className="text-xs font-medium text-white tracking-wide">Available for new projects</span>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* RIGHT SIDE content - 3D Video Portfolio Showcase */}
          <motion.div 
            className="hidden md:block w-full md:w-1/2 z-10 will-change-transform"
            style={{ y, opacity, scale }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="relative perspective-1000">
              {/* Main video monitor */}
              <motion.div
                className="relative w-full max-w-md mx-auto h-80 rounded-lg border border-white/10 shadow-2xl shadow-primary/10 overflow-hidden transform-gpu will-change-transform"
                style={{
                  rotateY: mousePosition.x * 5,
                  rotateX: -mousePosition.y * 5,
                  y: useTransform(scrollYProgress, [0, 0.2], [0, -20], { clamp: true })
                }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                {/* Header with "My Projects" */}
                <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-r from-black/80 to-black/60 backdrop-blur-md z-10 flex items-center justify-between px-4 border-b border-white/10">
                  <motion.div 
                    className="text-sm font-medium text-white flex items-center"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                  >
                    <BsCameraReels className="mr-2 text-primary" />
                    My Projects
                  </motion.div>
                  <motion.div 
                    className="flex space-x-2 text-white/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                  >
                    <div className="w-3 h-3 rounded-full bg-accent/70 border border-white/10"></div>
                    <div className="w-3 h-3 rounded-full bg-primary/70 border border-white/10"></div>
                    <div className="w-3 h-3 rounded-full bg-white/30 border border-white/10"></div>
                  </motion.div>
                </div>
                
                {/* Screen content */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-primary/5 backdrop-blur-sm pt-10">
                  {/* Video preview grid */}
                  <div className="grid grid-cols-2 grid-rows-2 gap-2 p-4 h-full">
                    {[
                      {
                        name: "Johan Set",
                        type: "4K",
                        thumbnail: "/images/MAIN JOHAN.jpg",
                        tags: ['Showcase', 'Portfolio'],
                        videoUrl: '/projects/MAIN JOHAN.mp4'
                      },
                      {
                        name: "MrBeast Interview",
                        type: "HD",
                        thumbnail: "/images/mr beast Interview (Short).jpg",
                        tags: ['Interview', 'Short'],
                        videoUrl: '/projects/mr beast Interview (Short).mp4'
                      },
                      {
                        name: "David",
                        type: "4K",
                        thumbnail: "/images/david.jpg",
                        tags: ['Story', 'Narrative'],
                        videoUrl: '/projects/david.mp4'
                      },
                      {
                        name: "Minecraft Cinematic",
                        type: "HD",
                        thumbnail: "/images/minecraft Cinematic.jpg",
                        tags: ['Gaming', 'Content'],
                        videoUrl: '/projects/minecraft Cinematic.mp4'
                      }
                    ].map((project, index) => (
                      <motion.div 
                        key={index}
                        className="relative rounded overflow-hidden border border-white/10 shadow-lg"
                        whileHover={{ scale: 1.05, zIndex: 10 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 + index * 0.2 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10 opacity-50"></div>
                        <div className="relative bg-black/40 h-full flex flex-col">
                          <div className="text-white/70 text-xs p-1 font-mono border-b border-white/10 bg-black/60 flex justify-between items-center">
                            <span>{project.name}</span>
                            <span className="text-primary text-xs">{project.type}</span>
                          </div>
                          <div className="flex-1 flex items-center justify-center p-2">
                            <motion.div 
                              className="relative w-full h-full bg-center bg-cover"
                              style={{ backgroundImage: `url('${project.thumbnail}')` }}
                            >
                              <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div 
                                  className="w-8 h-8 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center cursor-pointer shadow-lg shadow-primary/30"
                                  whileHover={{ scale: 1.2 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => toggleProjectVideo(project.videoUrl)}
                                >
                                  <FiPlay className="text-white ml-0.5" />
                                </motion.div>
                              </div>
                            </motion.div>
                          </div>
                          {/* Add project tags */}
                          <div className="absolute bottom-2 left-2 flex gap-1 z-10">
                            {project.tags.map((tag, tagIndex) => (
                              <span 
                                key={tagIndex}
                                className="text-[8px] px-1.5 py-0.5 bg-black/70 backdrop-blur-sm text-primary border border-primary/20 rounded-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Screen overlay effects */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-30"></div>
                  <div className="absolute inset-0 overflow-hidden opacity-10">
                    <div className="w-full h-full flex flex-col gap-1">
                      {Array.from({ length: 80 }).map((_, i) => (
                        <div key={i} className="w-full h-px bg-white/30"></div>
                      ))}
                    </div>
                  </div>
                  {/* Screen reflection */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent"></div>
                </div>
                
                {/* Instruction text below projects */}
                <div className="absolute -bottom-8 left-0 right-0 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 }}
                    className="text-xs text-white/70 bg-black/40 backdrop-blur-sm py-1 px-3 rounded-full border border-white/10 inline-flex items-center"
                  >
                    <span className="animate-pulse mr-1">👆</span> Click any project to watch the video
                  </motion.div>
                </div>
                
                {/* Monitor frame details */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent rounded-full"></div>
              </motion.div>
              
              {/* Animated filmstrip element */}
              <motion.div
                className="absolute -top-5 -right-5 z-10 transform-gpu"
                style={{
                  rotateZ: -15,
                  rotateY: mousePosition.x * 10,
                  rotateX: -mousePosition.y * 10,
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                <div className="w-40 h-20 relative overflow-visible">
                  <motion.div 
                    className="absolute inset-0 flex"
                    animate={{ x: [-40, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  >
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="flex-shrink-0 w-10 h-20 border-l border-r border-white/30 relative bg-gradient-to-b from-black/60 to-black/80">
                        <div className="absolute inset-0 flex flex-col justify-between py-1">
                          <div className="flex justify-center space-x-1">
                            <div className="w-1 h-1 rounded-full bg-white/30"></div>
                            <div className="w-1 h-1 rounded-full bg-white/30"></div>
                          </div>
                          <div className="flex justify-center space-x-1">
                            <div className="w-1 h-1 rounded-full bg-white/30"></div>
                            <div className="w-1 h-1 rounded-full bg-white/30"></div>
                          </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-7 h-12 bg-gradient-to-br from-primary/10 to-accent/5 border border-white/10 rounded-sm shadow-inner"></div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                  <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-10 h-12 bg-black/70 backdrop-blur-md rounded-md border border-white/10 flex items-center justify-center z-10">
                    <BsCameraReels className="text-primary text-lg" />
                  </div>
                </div>
              </motion.div>
              
              {/* Dynamic glitch effect on hover */}
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
                <motion.div
                  className="text-xs font-mono text-primary/70 px-3 py-1 border border-primary/30 rounded backdrop-blur-sm bg-black/30"
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0.8, 1, 0],
                    x: [0, 2, -2, 0],
                    scale: [1, 1.02, 0.98, 1]
                  }}
                  transition={{ 
                    opacity: { duration: 2, repeat: Infinity, repeatType: "loop", repeatDelay: 5 },
                    x: { duration: 0.2, repeat: 8, repeatType: "mirror", repeatDelay: 5 },
                    scale: { duration: 0.3, repeat: 5, repeatType: "mirror", repeatDelay: 5 }
                  }}
                >
                  FRAME_SEQUENCE_LOADED
                </motion.div>
              </div>
              
              {/* Video editing tools floating around the monitor */}
              <motion.div
                className="absolute -right-4 top-1/3 w-16 h-16 bg-black/60 backdrop-blur-md border border-white/10 rounded-md flex flex-col items-center justify-center z-20"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
                style={{
                  rotateY: mousePosition.x * 20,
                  rotateX: -mousePosition.y * 10,
                }}
              >
                <IoColorPaletteOutline className="text-primary/90 text-xl mb-1" />
                <div className="flex space-x-1 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <div className="w-2 h-2 rounded-full bg-accent"></div>
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                </div>
                <span className="text-white/50 text-xs mt-1 font-mono">COLOR</span>
              </motion.div>
              
              <motion.div
                className="absolute -left-6 top-1/4 w-14 h-14 bg-black/60 backdrop-blur-md border border-white/10 rounded-md flex flex-col items-center justify-center z-20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6 }}
                style={{
                  rotateY: mousePosition.x * 20,
                  rotateX: -mousePosition.y * 10,
                }}
              >
                <RiScissorsCutFill className="text-accent/90 text-lg mb-1" />
                <span className="text-white/50 text-xs mt-1 font-mono">CUT</span>
              </motion.div>
              
              {/* Stats box */}
              <motion.div
                className="absolute -bottom-4 -right-2 w-48 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 p-2 z-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
              >
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-white/70 text-xs font-medium">Completed Projects</span>
                  <motion.span 
                    className="text-primary text-sm font-mono font-bold"
                  >
                    {Math.round(springProjects.get())}+
                  </motion.span>
                </div>
                <div className="w-full h-1 bg-black/50 rounded-full mb-2">
                  <motion.div 
                    className="h-full bg-primary/70 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '80%' }}
                    transition={{ duration: 1, delay: 2 }}
                  />
                </div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-white/70 text-xs font-medium">Satisfied Clients</span>
                  <motion.span 
                    className="text-accent text-sm font-mono font-bold"
                  >
                    {Math.round(springClients.get())}+
                  </motion.span>
                </div>
                <div className="w-full h-1 bg-black/50 rounded-full">
                  <motion.div 
                    className="h-full bg-accent/70 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: '92%' }}
                    transition={{ duration: 1, delay: 2.2 }}
                  />
                </div>
              </motion.div>
              
              {/* Cinematic clapper board */}
              <motion.div
                className="absolute -bottom-14 left-10 transform-gpu perspective-1000 z-30"
                style={{
                  rotateY: mousePosition.x * 15,
                  rotateX: -mousePosition.y * 5,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 2.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-40 h-24 bg-black/80 backdrop-blur-sm rounded-md border border-white/20 shadow-xl overflow-hidden relative">
                  {/* Clapper top */}
                  <motion.div 
                    className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-black/80 to-black/60 border-b border-white/20"
                    initial={{ rotateX: -60, transformOrigin: "top" }}
                    whileHover={{ rotateX: -60, transformOrigin: "top" }}
                    whileTap={{ rotateX: 0, transformOrigin: "top" }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <div className="absolute inset-0 flex items-center justify-between px-3">
                      <div className="font-mono text-white/70 text-xs">Johan </div>
                      <div className="font-mono text-primary/90 text-xs">TAKE 1</div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 flex">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <motion.div 
                          key={i} 
                          className="flex-1 h-5 border-r border-white/10 relative overflow-hidden"
                          initial={{ background: i % 2 === 0 ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.3)" }}
                        >
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[8px] font-mono text-white/50">{i+1}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                  
                  {/* Clapper content */}
                  <div className="absolute top-8 inset-x-0 bottom-0 p-2">
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-center mb-1">
                        <div className="text-[10px] font-mono text-white/60">SCENE:</div>
                        <div className="text-[10px] font-mono text-white/80">Portfolio Intro</div>
                      </div>
                      <div className="flex justify-between items-center mb-1">
                        <div className="text-[10px] font-mono text-white/60">DIRECTOR:</div>
                        <div className="text-[10px] font-mono text-white/80">Johan</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-[10px] font-mono text-white/60">DATE:</div>
                        <div className="text-[10px] font-mono text-white/80">{new Date().toLocaleDateString()}</div>
                      </div>
                      <div className="mt-auto">
                        <motion.div 
                          className="h-px w-full bg-primary/40"
                          animate={{ width: ["0%", "100%"] }}
                          transition={{ duration: 2, repeat: Infinity, repeatType: "loop", repeatDelay: 1 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Timeline indicators */}
              <motion.div 
                className="absolute -bottom-2 left-10 right-10 h-1 bg-black/50 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 2 }}
              >
                <motion.div 
                  className="h-full bg-primary/70 rounded-full"
                  animate={{ width: ['0%', '100%'] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/70 hidden md:flex"
        animate={{ y: [0, 10, 0], opacity: [0, 1, 0.8] }}
        initial={{ opacity: 0 }}
        transition={{ 
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
        }}
      >
        <span className="text-xs mb-2 font-light tracking-wider">Scroll to explore</span>
        <div className="w-6 h-12 border border-white/30 rounded-full flex justify-center pt-1 backdrop-blur-sm bg-black/20">
          <motion.div 
            className="w-1.5 h-1.5 bg-primary rounded-full"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
      
      {/* Add custom styles for glitch effect */}
      <style jsx global>{`
        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }
        
        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(2px, -2px); }
          40% { transform: translate(2px, 2px); }
          60% { transform: translate(-2px, -2px); }
          80% { transform: translate(-2px, 2px); }
        }
        
        .glitch-1 {
          opacity: 0.3;
          animation: glitch-1 0.4s ease-in-out infinite alternate-reverse;
        }
        
        .glitch-2 {
          opacity: 0.3;
          animation: glitch-2 0.4s ease-in-out infinite alternate-reverse;
        }
        
        .film-grain {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background-image: url('/images/noise.png');
          background-repeat: repeat;
          animation: grain 0.5s steps(1) infinite;
          pointer-events: none;
        }
        
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-1%, -1%); }
          20% { transform: translate(1%, 1%); }
          30% { transform: translate(1%, -1%); }
          40% { transform: translate(-1%, 1%); }
          50% { transform: translate(-1%, -1%); }
          60% { transform: translate(1%, 1%); }
          70% { transform: translate(1%, -1%); }
          80% { transform: translate(-1%, 1%); }
          90% { transform: translate(-1%, -1%); }
        }
      `}</style>
    </section>
  );
}
