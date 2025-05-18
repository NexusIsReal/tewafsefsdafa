'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { FiCode, FiLayers, FiCpu, FiCamera, FiGrid } from 'react-icons/fi';
import { 
  SiAdobepremierepro, 
  SiAdobeaftereffects, 
  SiAdobephotoshop, 
  SiCinema4D, 
  SiBlender,
  SiAdobeaudition
} from 'react-icons/si';
import { RiMovie2Line } from 'react-icons/ri';
import { MdOutlineVideoLibrary } from 'react-icons/md';

// Tech stack categories with tools
const techStack = [
  {
    id: 1,
    category: 'Editing',
    description: 'Professional video editing software',
    tools: [
      { 
        name: 'Adobe Premiere Pro', 
        icon: SiAdobepremierepro, 
        color: '#9999FF',
        description: 'Professional video editing with advanced timeline features',
        experience: 'Expert'
      },
      { 
        name: 'Final Cut Pro', 
        icon: MdOutlineVideoLibrary, 
        color: '#FCFCFC',
        description: 'Streamlined editing with magnetic timeline',
        experience: 'Advanced'
      },
      { 
        name: 'DaVinci Resolve', 
        icon: RiMovie2Line, 
        color: '#FF8D85',
        description: 'All-in-one solution for editing, color, effects',
        experience: 'Intermediate'
      }
    ]
  },
  {
    id: 2,
    category: 'Motion & VFX',
    description: 'Visual effects and motion graphics',
    tools: [
      { 
        name: 'After Effects', 
        icon: SiAdobeaftereffects, 
        color: '#9999FF',
        description: 'Motion graphics and visual effects compositing',
        experience: 'Expert'
      },
      { 
        name: 'Cinema 4D', 
        icon: SiCinema4D, 
        color: '#88CEF7',
        description: '3D modeling and animation for video integration',
        experience: 'Intermediate'
      },
      { 
        name: 'Blender', 
        icon: SiBlender, 
        color: '#EA7600',
        description: 'Open-source 3D creation for custom visual elements',
        experience: 'Intermediate'
      }
    ]
  },
  {
    id: 3,
    category: 'Color & Audio',
    description: 'Color grading and audio production',
    tools: [
      { 
        name: 'DaVinci Resolve Color', 
        icon: RiMovie2Line, 
        color: '#FF8D85',
        description: 'Professional color grading and correction',
        experience: 'Advanced'
      },
      { 
        name: 'Adobe Audition', 
        icon: SiAdobeaudition, 
        color: '#9999FF',
        description: 'Professional audio editing and sound design',
        experience: 'Advanced'
      },
      { 
        name: 'Photoshop', 
        icon: SiAdobephotoshop, 
        color: '#31A8FF',
        description: 'Image editing for thumbnails and graphic elements',
        experience: 'Expert'
      }
    ]
  }
];

export default function TechStackSection() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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

  // Handle mouse hover for tools
  const handleToolHover = (toolName: string) => {
    setHoveredTool(toolName);
  };
  
  const handleToolLeave = () => {
    setHoveredTool(null);
  };
  
  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-black perspective-1000" id="tech-stack">
      {/* Cinematic background with film grain and color grading */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Cinematic overlay with film grain and color grading */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black mix-blend-color-burn"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-primary/10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
        
        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]">
          <motion.div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(rgba(var(--accent),0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--accent),0.3) 1px, transparent 1px)`,
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
          className="absolute w-32 h-32 rounded-full bg-gradient-radial from-accent/30 via-accent/5 to-transparent"
          style={{
            top: '20%',
            right: '15%',
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
          className="absolute w-24 h-24 rounded-full bg-gradient-radial from-primary/20 via-primary/5 to-transparent"
          style={{
            bottom: '15%',
            left: '25%',
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
        
        {/* Floating tech icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { Icon: FiCode, x: '12%', y: '25%', size: 30, color: 'accent' },
            { Icon: FiLayers, x: '85%', y: '18%', size: 26, color: 'primary' },
            { Icon: FiCpu, x: '20%', y: '70%', size: 28, color: 'accent' },
            { Icon: FiCamera, x: '80%', y: '60%', size: 32, color: 'primary' },
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
        
        {/* Tech circuit lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M0,50 Q25,30 50,50 T100,50"
              stroke="url(#techGradient)"
              strokeWidth="0.2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
            <motion.path
              d="M0,60 Q40,80 60,50 T100,60"
              stroke="url(#techGradient)"
              strokeWidth="0.2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 4, delay: 1, ease: "easeInOut" }}
            />
            <motion.path
              d="M0,40 Q60,20 80,50 T100,40"
              stroke="url(#techGradient)"
              strokeWidth="0.2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 4, delay: 2, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(var(--primary-rgb), 0.5)" />
                <stop offset="50%" stopColor="rgba(var(--accent-rgb), 0.5)" />
                <stop offset="100%" stopColor="rgba(var(--primary-rgb), 0.5)" />
              </linearGradient>
            </defs>
          </svg>
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
            className="inline-block px-4 py-1 rounded-full bg-accent/10 backdrop-blur-sm border border-accent/20 mb-4 overflow-hidden relative"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span 
              className="absolute inset-0 bg-accent/10 -translate-x-full"
              animate={{ translateX: ['100%', '-100%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
            />
            <span className="text-sm font-medium text-accent relative z-10">Professional Tools</span>
          </motion.div>
          
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6 text-white relative"
          >
            <span className="relative inline-block">
              <span className="absolute -inset-1 bg-gradient-to-r from-accent/10 to-primary/5 blur-xl"></span>
              <span className="relative">Tech Stack</span>
            </span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            <span className="relative px-4 py-2 backdrop-blur-sm bg-black/10 rounded-lg border-l border-accent/20">
              Industry-standard tools and software I use to bring creative visions to life
            </span>
          </motion.p>
        </motion.div>
        
        {/* Tech Stack Categories */}
        <div 
          ref={containerRef}
          className="relative perspective-1000"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {techStack.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-secondary/20 backdrop-blur-lg rounded-xl overflow-hidden border border-accent/10 transform-gpu"
                style={{
                  perspective: '1000px',
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Category Header */}
                <div className="p-6 border-b border-accent/10 relative overflow-hidden">
                  {/* Animated gradient background */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-primary/5"
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  
                  <motion.h3 
                    className="text-2xl font-bold text-white mb-2 relative z-10"
                    whileHover={{ scale: 1.02 }}
                  >
                    {category.category}
                  </motion.h3>
                  
                  <p className="text-gray-300 text-sm relative z-10">
                    {category.description}
                  </p>
                  
                  {/* Decorative element */}
                  <motion.div 
                    className="absolute top-0 right-0 w-20 h-20 rounded-bl-full bg-gradient-to-br from-accent/20 to-primary/10 z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  />
                </div>
                
                {/* Tools List */}
                <div className="p-6 space-y-5">
                  {category.tools.map((tool, i) => (
                    <motion.div
                      key={tool.name}
                      className="relative"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ duration: 0.3, delay: (index * 0.2) + (i * 0.1) }}
                      onMouseEnter={() => handleToolHover(tool.name)}
                      onMouseLeave={handleToolLeave}
                      whileHover={{
                        scale: 1.02,
                        rotateY: mousePosition.x * 2,
                        rotateX: -mousePosition.y * 2,
                      }}
                    >
                      <div className={`p-4 rounded-lg backdrop-blur-md bg-black/30 border ${hoveredTool === tool.name ? 'border-[' + tool.color + ']/50' : 'border-accent/10'} relative overflow-hidden transition-all duration-300 transform-gpu`}>
                        {/* Glowing effect on hover */}
                        <motion.div 
                          className="absolute inset-0 opacity-0"
                          style={{ 
                            background: `radial-gradient(circle at center, ${tool.color}20 0%, transparent 70%)`,
                          }}
                          animate={{ 
                            opacity: hoveredTool === tool.name ? 0.3 : 0 
                          }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        <div className="flex items-center space-x-4">
                          <div className="rounded-full p-2.5" style={{ backgroundColor: `${tool.color}15` }}>
                            <tool.icon className="w-6 h-6" style={{ color: tool.color }} />
                          </div>
                          
                          <div>
                            <h4 className="text-white font-medium">{tool.name}</h4>
                            
                            {/* Tool description - shown on hover */}
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ 
                                height: hoveredTool === tool.name ? 'auto' : 0,
                                opacity: hoveredTool === tool.name ? 1 : 0,
                              }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <p className="text-gray-400 text-xs mt-1 pr-2">
                                {tool.description}
                              </p>
                            </motion.div>
                          </div>
                          
                          {/* Experience level */}
                          <div className="ml-auto">
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full`} 
                              style={{ 
                                backgroundColor: `${tool.color}15`, 
                                color: tool.color 
                              }}
                            >
                              {tool.experience}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Animated border on hover */}
                      <motion.div 
                        className="absolute inset-0 rounded-lg opacity-0 border-2 border-transparent"
                        style={{ borderColor: tool.color + "00" }}
                        animate={{
                          opacity: hoveredTool === tool.name ? 1 : 0,
                          borderColor: hoveredTool === tool.name ? tool.color + "30" : tool.color + "00",
                          boxShadow: hoveredTool === tool.name ? `0 0 20px 0 ${tool.color}20` : "none"
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  ))}
                </div>
                
                {/* Decorative category icon */}
                <div className="absolute bottom-4 right-4 opacity-5">
                  <FiGrid className="w-20 h-20 text-white" />
                </div>
                
                {/* Animated accent corners */}
                <motion.div
                  className="absolute top-0 left-0 w-3 h-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <path d="M1,0 L0,0 L0,1 L0,5 L1,5 L1,1 L5,1 L5,0 L1,0" fill={index === 0 ? '#9999FF' : index === 1 ? '#88CEF7' : '#FF8D85'} />
                  </svg>
                </motion.div>
                
                <motion.div
                  className="absolute bottom-0 right-0 w-3 h-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: (index * 0.2) + 0.2 }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12">
                    <path d="M11,12 L12,12 L12,11 L12,7 L11,7 L11,11 L7,11 L7,12 L11,12" fill={index === 0 ? '#9999FF' : index === 1 ? '#88CEF7' : '#FF8D85'} />
                  </svg>
                </motion.div>
              </motion.div>
            ))}
          </div>
          
          {/* Animated outro element */}
          <div className="h-24 relative overflow-hidden mt-16">
            <motion.div 
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
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