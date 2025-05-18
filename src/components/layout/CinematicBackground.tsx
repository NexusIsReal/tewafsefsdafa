'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { 
  RiMovie2Line, 
  RiFilmLine, 
  RiCameraLensFill, 
  RiVideoUploadLine,
  RiSoundModuleLine
} from 'react-icons/ri';
import { 
  IoVideocamOutline, 
  IoColorPaletteOutline 
} from 'react-icons/io5';
import { 
  MdOutlineVideoLibrary, 
  MdOutlineSpeed 
} from 'react-icons/md';
import { TbBrandCinema4D } from 'react-icons/tb';

export default function CinematicBackground() {
  const { scrollY } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMounted, setIsMounted] = useState(false);
  
  // Smooth mouse movement
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 300 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 300 });
  
  // Parallax effects based on scroll
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -50]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -200]);
  const opacity1 = useTransform(scrollY, [0, 300, 600], [1, 0.8, 0.6]);
  const opacity2 = useTransform(scrollY, [0, 300, 600], [0.6, 0.7, 0.5]);
  const scale1 = useTransform(scrollY, [0, 500], [1, 1.2]);
  
  // Track mouse movement
  useEffect(() => {
    setIsMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  
  if (!isMounted) return null;
  
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Base background */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Cinematic overlay and grain effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black mix-blend-color-burn"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
      
      {/* 3D grid effect */}
      <motion.div 
        className="absolute inset-0" 
        style={{ y: y2, opacity: opacity1 }}
      >
        <motion.div
          className="h-full w-full opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,62,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,62,0,0.3) 1px, transparent 1px)`,
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
      </motion.div>
      
      {/* 3D Film Frames */}
      <div className="absolute inset-0 perspective-[1000px]">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`frame-${i}`}
            className="absolute border-2 rounded-md"
            style={{
              width: `${200 + i * 40}px`,
              height: `${120 + i * 20}px`,
              left: `${30 + i * 5}%`,
              top: `${20 + i * 10}%`,
              borderColor: i % 2 === 0 ? 'rgba(255,62,0,0.3)' : 'rgba(61,154,252,0.2)',
              transformStyle: "preserve-3d",
              opacity: 0.15,
              y: y1,
              scale: scale1
            }}
            animate={{
              rotateX: [i * 3, -i * 3, i * 3],
              rotateY: [i * 4, -i * 4, i * 4],
              rotateZ: [i, -i, i],
              z: [-50 + (i * 30), -20 + (i * 30), -50 + (i * 30)]
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Rotating Film Strips */}
      <div className="absolute inset-0 perspective-[800px]">
        {[...Array(2)].map((_, i) => (
          <motion.div 
            key={`strip-${i}`} 
            className="absolute"
            style={{
              width: '300px',
              height: '60px',
              left: i === 0 ? '15%' : '60%',
              top: i === 0 ? '30%' : '70%',
              opacity: 0.15,
              y: i === 0 ? y2 : y3
            }}
            animate={{
              rotateY: [0, 360],
              z: [-100, -150, -100]
            }}
            transition={{
              duration: 25 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="absolute inset-0 border-y-4 border-y-primary/40 flex">
              {[...Array(15)].map((_, j) => (
                <div key={j} className="h-full w-[20px] border-x border-x-primary/40 flex-shrink-0"></div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Floating video editing UI elements */}
      <motion.div 
        className="absolute left-[10%] right-[10%] h-[80px] top-[80%]"
        style={{ y: y3, opacity: opacity2 }}
      >
        {/* Video timeline */}
        <div className="absolute inset-0 rounded-md border border-white/10 bg-black/20 backdrop-blur-sm overflow-hidden">
          {/* Waveform */}
          <div className="absolute inset-y-[30%] left-0 right-0 h-[20px]">
            <svg viewBox="0 0 1200 100" className="w-full h-full opacity-20">
              <path 
                d="M0,50 Q50,10 100,50 Q150,90 200,50 Q250,10 300,50 Q350,90 400,50 Q450,10 500,50 Q550,90 600,50 Q650,10 700,50 Q750,90 800,50 Q850,10 900,50 Q950,90 1000,50 Q1050,10 1100,50 Q1150,90 1200,50" 
                stroke="rgba(255,255,255,0.7)" 
                fill="none"
                strokeWidth="2"
              />
            </svg>
          </div>
          
          {/* Timeline clips */}
          <div className="absolute top-[60%] left-0 right-0 h-[20px] flex">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`clipbg-${i}`}
                className="h-full rounded ml-1"
                style={{
                  width: `${10 + Math.random() * 15}%`,
                  background: i % 2 === 0 
                    ? 'linear-gradient(to right, rgba(255,62,0,0.3), rgba(255,62,0,0.1))' 
                    : 'linear-gradient(to right, rgba(61,154,252,0.3), rgba(61,154,252,0.1))'
                }}
                animate={{
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
              />
            ))}
          </div>
          
          {/* Playhead */}
          <motion.div
            className="absolute top-[15%] bottom-[15%] w-[2px] bg-primary/80 z-10"
            style={{ left: '40%' }}
            animate={{
              left: ['20%', '80%', '20%']
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-4 h-4 rounded-full bg-primary -mt-2 -ml-[7px]"></div>
          </motion.div>
          
          {/* Time markers */}
          <div className="absolute top-[10%] left-0 right-0 h-[10px] flex justify-between px-4">
            {[...Array(10)].map((_, i) => (
              <div key={`time-${i}`} className="text-[7px] text-white/40 font-mono">
                {`00:${i < 10 ? '0' : ''}${i}:00`}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Color wheels and grading elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-[20%] right-[15%] w-[120px] h-[120px] rounded-full border border-white/10"
          style={{ 
            background: 'conic-gradient(from 0deg, rgba(255,0,0,0.2), rgba(0,255,0,0.2), rgba(0,0,255,0.2), rgba(255,0,0,0.2))',
            y: y1,
            opacity: opacity2
          }}
          animate={{
            rotateZ: [0, 360],
            rotateY: [10, 40, 10],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="absolute inset-[30%] rounded-full border border-white/30 bg-white/5"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white/40 border-r-white/10"></div>
        </motion.div>
        
        <motion.div
          className="absolute bottom-[30%] left-[15%] w-[100px] h-[100px] rounded-full border border-white/10"
          style={{ 
            background: 'conic-gradient(from 45deg, rgba(255,62,0,0.2), rgba(61,154,252,0.2), rgba(255,62,0,0.2))',
            y: y2,
            opacity: opacity1
          }}
          animate={{
            rotateZ: [0, -360],
            rotateX: [10, 30, 10],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="absolute inset-[30%] rounded-full border border-white/30 bg-white/5"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary/40 border-r-primary/10"></div>
        </motion.div>
      </div>
      
      {/* 3D Floating video editing icons */}
      <div className="absolute inset-0">
        {[
          { Icon: RiCameraLensFill, x: '18%', y: '35%', size: 32, color: 'primary' },
          { Icon: IoVideocamOutline, x: '75%', y: '25%', size: 36, color: 'accent' },
          { Icon: MdOutlineVideoLibrary, x: '25%', y: '65%', size: 34, color: 'primary' },
          { Icon: RiMovie2Line, x: '80%', y: '60%', size: 30, color: 'primary' },
          { Icon: IoColorPaletteOutline, x: '65%', y: '40%', size: 28, color: 'accent' },
          { Icon: RiSoundModuleLine, x: '40%', y: '70%', size: 32, color: 'accent' },
          { Icon: TbBrandCinema4D, x: '55%', y: '30%', size: 38, color: 'primary' },
        ].map((item, i) => (
          <motion.div
            key={`icon-${i}`}
            className={`absolute text-${item.color}/20`}
            style={{
              left: item.x,
              top: item.y,
              fontSize: `${item.size}px`,
              filter: `drop-shadow(0 0 10px rgba(${item.color === 'primary' ? '255,62,0' : '61,154,252'},0.2))`,
              y: i % 2 === 0 ? y1 : y2
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.1, 0.25, 0.1],
              rotateY: [0, 180, 360],
              scale: [1, 1.1, 1],
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
      
      {/* Lens flares that follow mouse */}
      <motion.div 
        className="absolute w-[300px] h-[300px] rounded-full bg-gradient-radial from-primary/10 via-primary/5 to-transparent pointer-events-none"
        style={{
          left: smoothMouseX,
          top: smoothMouseY,
          translateX: '-50%',
          translateY: '-50%',
          filter: 'blur(30px)',
          opacity: 0.4,
          mixBlendMode: 'screen'
        }}
      />
      
      <motion.div 
        className="absolute w-[200px] h-[200px] rounded-full bg-gradient-radial from-accent/10 via-accent/5 to-transparent pointer-events-none"
        style={{
          left: smoothMouseX,
          top: smoothMouseY,
          translateX: '-40%',
          translateY: '-60%',
          filter: 'blur(20px)',
          opacity: 0.3,
          mixBlendMode: 'screen'
        }}
      />
      
      {/* 3D Animated particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => {
          const size = Math.random() * 3 + 1;
          const isOrange = i % 3 === 0;
          return (
            <motion.div
              key={`particle-${i}`}
              className={`absolute rounded-full ${isOrange ? 'bg-primary' : 'bg-accent'}`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.1 + (Math.random() * 0.2),
                boxShadow: isOrange ? '0 0 8px rgba(255,62,0,0.8)' : '0 0 8px rgba(61,154,252,0.6)',
                transformStyle: "preserve-3d"
              }}
              animate={{
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
                z: [0, Math.random() * 50, 0],
                scale: [0, 1, 0],
                opacity: [0, 0.1 + (Math.random() * 0.3), 0]
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5
              }}
            />
          );
        })}
      </div>
    </div>
  );
} 