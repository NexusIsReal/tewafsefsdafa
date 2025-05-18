'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { FiVideo, FiCamera, FiLayout, FiEdit, FiMusic, FiFilm, FiCheck, FiMonitor, FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import { MdOutlineSpeed, MdOutlineVideoLibrary } from 'react-icons/md';
import { IoVideocamOutline, IoColorPaletteOutline } from 'react-icons/io5';
import { BsLightningCharge } from 'react-icons/bs';
import { TbBrandCinema4D } from 'react-icons/tb';
import { RiCameraLensFill, RiVidiconLine, RiScissorsCutFill } from 'react-icons/ri';

const services = [
  {
    icon: <IoVideocamOutline className="w-6 h-6" />,
    title: 'Premium Video Editing',
    description: 'Elevate your content with precision editing that captures attention and drives engagement. I combine technical expertise with creative vision to produce cinematic results.',
    features: ['Narrative-driven editing', 'Seamless transitions', 'High-end finishing']
  },
  {
    icon: <IoColorPaletteOutline className="w-6 h-6" />,
    title: 'Advanced Color Grading',
    description: 'Transform the visual tone of your content with professional color grading that establishes mood, enhances visual appeal, and creates a consistent, polished look.',
    features: ['Custom color palettes', 'Cinematic look development', 'HDR optimization']
  },
  {
    icon: <MdOutlineSpeed className="w-6 h-6" />,
    title: 'Dynamic Motion Graphics',
    description: 'Bring your ideas to life with custom motion graphics that elevate your brand message. From text animations to complex visual effects that capture audience attention.',
    features: ['Brand-aligned animations', '3D integration', 'Typography design']
  },
  {
    icon: <BsLightningCharge className="w-6 h-6" />,
    title: 'Sound Design & Mixing',
    description: 'Create an immersive audio experience with professional sound design and mixing that complements your visuals. From custom effects to perfect audio balancing.',
    features: ['Spatial audio mixing', 'Custom SFX creation', 'Voice enhancement']
  },
  {
    icon: <TbBrandCinema4D className="w-6 h-6" />,
    title: '3D Visual Effects',
    description: 'Add dimension to your content with cutting-edge 3D visual effects. Create immersive worlds and realistic elements that elevate production value exponentially.',
    features: ['Photo-realistic rendering', 'Animation integration', 'Virtual environments']
  },
  {
    icon: <MdOutlineVideoLibrary className="w-6 h-6" />,
    title: 'Multi-Platform Optimization',
    description: 'Ensure your content performs flawlessly across all platforms with expert optimization. From social media shorts to broadcast-quality deliverables for maximum impact.',
    features: ['Format-specific exports', 'Platform-specific aspect ratios', 'Quality preservation']
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeService, setActiveService] = useState<number | null>(null);
  
  // Animated counters
  const clients = useMotionValue(0);
  const projects = useMotionValue(0);
  const springClients = useSpring(clients, { stiffness: 100, damping: 30 });
  const springProjects = useSpring(projects, { stiffness: 100, damping: 30 });
  
  // Track mouse position for 3D effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Set loaded state and animate counters
    setIsLoaded(true);
    const timeout = setTimeout(() => {
      clients.set(45);
      projects.set(120);
    }, 500);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, [clients, projects]);
  
  // Parallax effect on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
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
  
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-black perspective-1000">
      {/* Background matching Experience Section */}
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
        
        {/* Floating service icons in background */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { Icon: IoVideocamOutline, x: '15%', y: '20%', size: 28, color: 'primary' },
            { Icon: IoColorPaletteOutline, x: '75%', y: '15%', size: 32, color: 'accent' },
            { Icon: MdOutlineSpeed, x: '25%', y: '75%', size: 30, color: 'primary' },
            { Icon: TbBrandCinema4D, x: '80%', y: '65%', size: 26, color: 'primary' },
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
        
        {/* Animated color bands */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-40">
          <motion.div 
            className="h-full w-full bg-white"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-20">
        <motion.div 
          className="max-w-6xl mx-auto"
          style={{ y, opacity }}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Section header with enhanced styling */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <motion.div
              className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4 backdrop-blur-sm overflow-hidden relative"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span 
                className="absolute inset-0 bg-primary/10 -translate-x-full"
                animate={{ translateX: ['100%', '-100%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
              />
              <span className="text-sm font-medium text-primary relative z-10">Expert Services</span>
            </motion.div>
            
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-4 relative"
              variants={itemVariants}
            >
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-accent/5 blur-xl"></span>
                <span className="relative">Premium Visual Services</span>
              </span>
            </motion.h2>
            
            <motion.p
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              <span className="relative px-4 py-2 backdrop-blur-sm bg-black/10 rounded-lg border-l border-primary/20">
              Elevate your content with professional video services designed to captivate and engage your audience
              </span>
            </motion.p>
          </motion.div>
        
          {/* Service cards with enhanced 3D and interaction effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-secondary/30 backdrop-blur-sm border border-primary/10 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group relative overflow-hidden hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/5"
                style={{
                  perspective: '1000px',
                  transformStyle: 'preserve-3d',
                }}
                onMouseEnter={() => setActiveService(index)}
                onMouseLeave={() => setActiveService(null)}
                whileHover={{
                  rotateY: mousePosition.x * 5,
                  rotateX: -mousePosition.y * 5,
                }}
              >
                {/* Service icon with enhanced glow and animation */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all duration-300 relative overflow-hidden">
                  <motion.div 
                    className="text-primary text-2xl"
                    animate={{ 
                      scale: activeService === index ? [1, 1.1, 1] : 1,
                      rotate: activeService === index ? [0, 5, 0, -5, 0] : 0
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: activeService === index ? Infinity : 0,
                      repeatType: "reverse"
                    }}
                  >
                    {service.icon}
                  </motion.div>
                  
                  {/* Animated glow effect */}
                  <motion.div 
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm bg-primary/30"
                    animate={{ 
                      opacity: activeService === index ? [0, 0.6, 0] : 0 
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: activeService === index ? Infinity : 0 
                    }}
                  />
                  
                  {/* Moving line effect */}
                  <motion.div 
                    className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-70"
                    animate={{ 
                      x: activeService === index ? ['-100%', '100%'] : '-100%' 
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: activeService === index ? Infinity : 0,
                      repeatDelay: 0.5
                    }}
                  />
                </div>
                
                {/* Service title with animation */}
                <motion.h3 
                  className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300"
                  animate={{ 
                    x: activeService === index ? [0, 2, 0] : 0 
                  }}
                  transition={{ 
                    duration: 0.5, 
                    repeat: activeService === index ? 1 : 0,
                    repeatType: "reverse" 
                  }}
                >
                  {service.title}
                </motion.h3>
                
                {/* Description with backdrop effect */}
                <p className="text-gray-300 text-sm leading-relaxed mb-4 relative z-10 backdrop-blur-sm bg-black/5 p-2 rounded-md">
                  {service.description}
                </p>
                
                {/* Features list with animated checkmarks */}
                <ul className="space-y-2 mt-auto">
                  {service.features.map((feature, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start text-xs text-gray-200"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 + (index * 0.05) }}
                    >
                      <motion.div 
                        className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0"
                        whileHover={{ scale: 1.2, backgroundColor: 'rgba(var(--primary-rgb), 0.2)' }}
                      >
                        <FiCheck className="text-primary w-2.5 h-2.5" />
                      </motion.div>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                
                {/* Bottom line with enhanced "Learn more" animation */}
                <div className="mt-5 pt-3 border-t border-primary/10 flex justify-end">
                  <motion.span 
                    className="text-primary/70 text-xs font-medium inline-flex items-center group-hover:text-primary transition-colors"
                    whileHover={{ x: 3 }}
                  >
                    Learn more 
                    <motion.div
                      animate={{ 
                        x: activeService === index ? [0, 5, 0] : 0 
                      }}
                      transition={{ 
                        duration: 1, 
                        repeat: activeService === index ? Infinity : 0,
                        repeatType: "reverse",
                        repeatDelay: 0.5
                      }}
                    >
                      <FiArrowRight className="ml-1.5 w-3 h-3" />
                    </motion.div>
                  </motion.span>
                </div>
                
                {/* Decorative element in the background */}
                <motion.div 
                  className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-primary/5 blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700"
                  animate={{ 
                    scale: activeService === index ? [1, 1.2, 1] : 1 
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: activeService === index ? Infinity : 0,
                    repeatType: "reverse" 
                  }}
                />
              </motion.div>
            ))}
          </div>
          
          {/* Enhanced Call to action with 3D effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-16"
          >
            <motion.div
              className="inline-block relative perspective-1000 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              style={{
                rotateY: mousePosition.x * 10,
                rotateX: -mousePosition.y * 10,
              }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-accent/20 rounded-lg blur-lg opacity-70 group-hover:opacity-100 transition duration-200"></div>
              <button 
                onClick={scrollToContact}
                className="relative inline-flex items-center px-8 py-3.5 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
            >
              <FiMonitor className="mr-3 text-lg" /> 
              <span className="text-sm">Request Custom Service</span>
              <span className="ml-2 relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
            </button>
            </motion.div>
            
            {/* Enhanced stats display */}
            <motion.div 
              className="mt-8 flex flex-wrap justify-center gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex items-center space-x-4 px-5 py-2 bg-black/30 backdrop-blur-sm rounded-lg border border-primary/10">
                <div className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                  <motion.div 
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <FiFilm className="text-xl" />
                  </motion.div>
                </div>
                <div className="flex flex-col">
                  <div className="text-2xl font-bold text-white">
                    {Math.round(springProjects.get())}+
                  </div>
                  <div className="text-xs text-gray-400">Completed Projects</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 px-5 py-2 bg-black/30 backdrop-blur-sm rounded-lg border border-accent/10">
                <div className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  >
                    <FiVideo className="text-xl" />
                  </motion.div>
                </div>
                <div className="flex flex-col">
                  <div className="text-2xl font-bold text-white">
                    {Math.round(springClients.get())}+
                  </div>
                  <div className="text-xs text-gray-400">Satisfied Clients</div>
                </div>
              </div>
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
        </motion.div>
      </div>
    </section>
  );
} 