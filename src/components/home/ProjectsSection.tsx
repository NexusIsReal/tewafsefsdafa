'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiPlay, FiExternalLink, FiFilm, FiAward, FiArrowRight, FiX } from 'react-icons/fi';
import { IoVideocamOutline, IoColorPaletteOutline } from 'react-icons/io5';
import { RiMovie2Line, RiCameraLensFill, RiVidiconLine } from 'react-icons/ri';
import { MdOutlineVideoLibrary } from 'react-icons/md';

// Featured projects from actual portfolio
const projects = [
  {
    id: 1,
    title: 'Johan Set',
    description: 'A showcase of my primary video work and editing style.',
    tags: ['Showcase', 'Portfolio'],
    client: 'Personal Portfolio',
    year: '2023',
    thumbnailUrl: '/images/MAIN JOHAN.jpg',
    videoUrl: '/projects/MAIN JOHAN.mp4',
  },
  {
    id: 2,
    title: 'MrBeast Interview',
    description: 'A short interview edit featuring MrBeast discussing his content and vision.',
    tags: ['Interview', 'Short'],
    client: 'Content Creator',
    year: '2023',
    thumbnailUrl: '/images/mr beast Interview (Short).jpg',
    videoUrl: '/projects/mr beast Interview (Short).mp4',
  },
  {
    id: 3,
    title: 'David',
    description: 'A focused project highlighting storytelling through video.',
    tags: ['Story', 'Narrative'],
    client: 'David',
    year: '2023',
    thumbnailUrl: '/images/david.jpg',
    videoUrl: '/projects/david.mp4',
  },
  {
    id: 4,
    title: 'Minecraft Cinematic',
    description: 'Creative gameplay footage edit showcasing Minecraft content.',
    tags: ['Gaming', 'Content'],
    client: 'Gaming Creator',
    year: '2023',
    thumbnailUrl: '/images/minecraft Cinematic.jpg',
    videoUrl: '/projects/minecraft Cinematic.mp4',
  },
  {
    id: 5,
    title: 'Iman Gadzhi',
    description: 'Professional interview edit featuring Iman Gadzhi.',
    tags: ['Interview', 'Business'],
    client: 'Business Channel',
    year: '2023',
    thumbnailUrl: '/images/iman_gadzhi.jpg',
    videoUrl: '/projects/iman_gadzhi.mp4',
  },
  {
    id: 6,
    title: 'Self Confidence',
    description: 'Motivational content focusing on building self-confidence.',
    tags: ['Motivational', 'Self-help'],
    client: 'Motivational Channel',
    year: '2023',
    thumbnailUrl: '/images/Self Confidence.jpg',
    videoUrl: '/projects/Self Confidence.mp4',
  }
];

export default function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  
  // Track mouse position for 3D effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    setIsLoaded(true);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Parallax effect on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  // Play video function
  const playVideo = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
  };
  
  // Close video player
  const closeVideo = () => {
    setSelectedVideo(null);
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
  
  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-black perspective-1000" id="projects">
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
            right: '20%',
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
        
        {/* Floating video icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { Icon: RiCameraLensFill, x: '15%', y: '20%', size: 28, color: 'primary' },
            { Icon: MdOutlineVideoLibrary, x: '75%', y: '15%', size: 32, color: 'accent' },
            { Icon: IoVideocamOutline, x: '25%', y: '75%', size: 30, color: 'primary' },
            { Icon: RiMovie2Line, x: '80%', y: '65%', size: 26, color: 'primary' },
          ].map((item, i) => (
            <motion.div
              key={`icon-${i}`}
              className={`absolute text-${item.color}/30`}
              style={{
                left: item.x,
                top: item.y,
                fontSize: `${item.size}px`,
                filter: `drop-shadow(0 0 10px rgba(var(--${item.color}),0.2))`
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.2, 0.4, 0.2],
                rotateY: [0, 180, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 8 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5
              }}
            >
              <item.Icon />
            </motion.div>
          ))}
        </div>
        
        {/* Film strip element on the sides */}
        <div className="absolute -right-8 top-0 bottom-0 w-20 opacity-20 pointer-events-none">
          <div className="h-full flex flex-col">
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div 
                key={i} 
                className="w-full h-20 border-t-2 border-b-2 border-primary/20 flex items-center justify-center"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 0.2 }}
                transition={{ duration: 1, delay: i * 0.05 }}
              >
                <div className="w-3 h-3 rounded-full bg-primary/30 mx-1"></div>
                <div className="w-3 h-3 rounded-full bg-primary/30 mx-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section header - enhanced with animations */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          style={{ y, opacity }}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="inline-block px-4 py-1 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-4 overflow-hidden relative"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span 
              className="absolute inset-0 bg-primary/10 -translate-x-full"
              animate={{ translateX: ['100%', '-100%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
            />
            <span className="text-sm font-medium text-primary relative z-10">Portfolio Showcase</span>
          </motion.div>
          
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6 text-white relative"
          >
            <span className="relative inline-block">
              <span className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-accent/5 blur-xl"></span>
              <span className="relative">Featured Projects</span>
            </span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            <span className="relative px-4 py-2 backdrop-blur-sm bg-black/10 rounded-lg border-l border-primary/20">
              A selection of my most impactful work showcasing technical expertise, 
              creative vision, and storytelling ability
            </span>
          </motion.p>
        </motion.div>
        
        {/* Video player modal */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div 
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeVideo}
            >
              <motion.div
                className="relative w-full max-w-5xl max-h-[80vh] rounded-lg overflow-hidden shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                <video 
                  ref={videoRef}
                  className="w-full h-full object-cover" 
                  src={selectedVideo}
                  controls
                  autoPlay
                />
                <button
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeVideo();
                  }}
                >
                  <FiX className="w-5 h-5" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Projects showcase - enhanced with 3D and animations */}
        <div 
          ref={containerRef}
          className="relative perspective-1000"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-secondary/30 backdrop-blur-sm rounded-xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/5 transform-gpu"
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
                style={{
                  perspective: '1000px',
                  transformStyle: 'preserve-3d',
                }}
                whileHover={{
                  rotateY: mousePosition.x * 5,
                  rotateX: -mousePosition.y * 5,
                }}
              >
                {/* Project thumbnail with enhanced hover effects */}
                <div className="aspect-video bg-gray-900 relative overflow-hidden">
                  <Image
                    src={project.thumbnailUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover opacity-90 transition-all duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Enhanced overlay gradient with animated elements */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:opacity-80 transition-opacity duration-300"></div>
                  
                  {/* Animated border effect on hover */}
                  <motion.div 
                    className="absolute inset-[2px] border border-primary/0 rounded-md opacity-0 group-hover:opacity-100 group-hover:border-primary/40 transition-all duration-300"
                    animate={{
                      boxShadow: hoveredProject === index ? [
                        'inset 0 0 0px rgba(var(--primary-rgb), 0)',
                        'inset 0 0 20px rgba(var(--primary-rgb), 0.3)',
                        'inset 0 0 0px rgba(var(--primary-rgb), 0)'
                      ] : 'inset 0 0 0px rgba(var(--primary-rgb), 0)'
                    }}
                    transition={{ duration: 2, repeat: hoveredProject === index ? Infinity : 0 }}
                  />
                  
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      onClick={() => playVideo(project.videoUrl)}
                      className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-sm text-white flex items-center justify-center shadow-lg shadow-primary/30"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiPlay className="w-6 h-6 ml-1" />
                    </motion.button>
                  </div>
                  
                  {/* Animated project type indicator */}
                  <motion.div 
                    className="absolute top-4 left-4 flex items-center space-x-2 z-10 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full"
                    initial={{ opacity: 0, x: -20 }}
                    animate={hoveredProject === index ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <RiVidiconLine className="text-primary/90 w-3.5 h-3.5" />
                    <span className="text-xs font-medium text-white">Video Project</span>
                  </motion.div>
                  
                  {/* Enhanced Tags */}
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 z-10">
                    {project.tags.slice(0, 2).map((tag, i) => (
                      <motion.span 
                        key={i} 
                        className="px-2.5 py-1 text-xs font-medium bg-black/70 backdrop-blur-sm border border-primary/20 text-white/90 rounded-full flex items-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={hoveredProject === index ? 
                          { opacity: 1, y: 0, transition: { delay: i * 0.1 } } : 
                          { opacity: 0, y: 10 }
                        }
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/80 mr-1.5"></span>
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  
                  {/* Year badge */}
                  <motion.div 
                    className="absolute top-4 right-4 bg-primary/10 backdrop-blur-sm px-2 py-1 rounded text-xs text-white/90 border border-primary/20 z-10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={hoveredProject === index ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  >
                    {project.year}
                  </motion.div>
                </div>
                
                {/* Enhanced Project details with animations */}
                <div className="p-5">
                  <motion.h3 
                    className="text-xl font-bold mb-2 group-hover:text-primary transition-colors flex items-center"
                    animate={{
                      x: hoveredProject === index ? [0, 2, 0] : 0
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: hoveredProject === index ? 1 : 0,
                      repeatType: "reverse"
                    }}
                  >
                    {project.title}
                    <motion.div
                      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{
                        rotate: hoveredProject === index ? [0, 10, 0, -10, 0] : 0
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: hoveredProject === index ? Infinity : 0,
                      }}
                    >
                      <FiAward className="text-primary/80 w-4 h-4" />
                    </motion.div>
                  </motion.h3>
                  
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2 relative">
                    <span className="relative backdrop-blur-sm bg-black/5 p-1.5 rounded-md block">
                      {project.description}
                    </span>
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                      {project.client}
                    </span>
                    
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link
                        href={`/projects/${project.id}`}
                        className="text-primary text-sm flex items-center gap-1.5 hover:text-white bg-primary/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-primary/10 hover:border-primary/30 transition-colors group-hover:shadow-sm group-hover:shadow-primary/10"
                      >
                        View details
                        <motion.div
                          animate={{
                            x: hoveredProject === index ? [0, 3, 0] : 0
                          }}
                          transition={{
                            duration: 1,
                            repeat: hoveredProject === index ? Infinity : 0,
                            repeatType: "reverse"
                          }}
                        >
                          <FiArrowRight className="w-3.5 h-3.5" />
                        </motion.div>
                      </Link>
                    </motion.div>
                  </div>
                </div>
                
                {/* Decorative element in the background */}
                <motion.div 
                  className="absolute -bottom-8 -right-8 w-20 h-20 rounded-full bg-primary/5 blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-700 z-0"
                  animate={{ 
                    scale: hoveredProject === index ? [1, 1.2, 1] : 1 
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: hoveredProject === index ? Infinity : 0,
                    repeatType: "reverse" 
                  }}
                />
              </motion.div>
            ))}
          </div>
          
          {/* Enhanced View all projects CTA */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="inline-block relative perspective-1000"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              style={{
                rotateY: mousePosition.x * 10,
                rotateX: -mousePosition.y * 10,
              }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-accent/20 rounded-full blur-lg opacity-70 hover:opacity-100 transition duration-200"></div>
              <Link
                href="/projects"
                className="relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-black/50 backdrop-blur-sm border border-primary/20 text-white font-medium transition-all duration-300 shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20"
              >
                <FiFilm className="text-primary text-lg" />
                <span>View All Projects</span>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Scroll-animated element for transition to next section */}
          <div className="h-24 relative overflow-hidden mt-16">
            <motion.div 
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
              animate={{ y: [30, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            />
          </div>
        </div>
      </div>
      
      {/* Film grain effect overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-5 mix-blend-overlay">
        <div className="absolute inset-0 film-grain"></div>
      </div>
    </section>
  );
}
