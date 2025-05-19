'use client';

import { motion } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiAward, FiTrendingUp } from 'react-icons/fi';

// Sample experience data - replace with your actual video editing experience
const experiences = [
  {
    company: 'Cinematic Visuals International',
    role: 'Senior Video Editor & Colorist',
    period: 'Mar, 2024 - Present',
    description: 'Leading creative video editing projects for international clients with focus on high-end commercial and documentary content. Implementing advanced color grading techniques and managing post-production workflows. Delivered over 25 commercial projects with a 98% client satisfaction rate and reduced delivery timelines by 30% through optimized editing processes.'
  },
  {
    company: 'Wedding Stories Pro',
    role: 'Wedding Videographer & Editor',
    period: 'Mar, 2023 - Dec, 2023',
    description: 'Filmed and edited over 50 wedding videos, creating emotionally engaging highlight reels tailored to each couple\'s unique story. Managed client relationships from initial consultation through final delivery, developing a reputation for capturing authentic moments. Implemented a streamlined post-production workflow that reduced delivery time by 40% while maintaining artistic quality.'
  }
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-black">
      {/* Dramatic background with cinematic elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Cinematic overlay with film grain and color grading */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black mix-blend-color-burn"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
        
        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]">
          <motion.div
            className="h-full w-full"
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
            { Icon: FiBriefcase, x: '15%', y: '20%', size: 28, color: 'primary' },
            { Icon: FiAward, x: '75%', y: '15%', size: 32, color: 'accent' },
            { Icon: FiCalendar, x: '25%', y: '75%', size: 30, color: 'primary' },
            { Icon: FiTrendingUp, x: '80%', y: '65%', size: 26, color: 'primary' },
          ].map((item, i) => (
            <motion.div
              key={`icon-${i}`}
              className={`absolute text-${item.color}/30`}
              style={{
                left: item.x,
                top: item.y,
                fontSize: `${item.size}px`,
                filter: `drop-shadow(0 0 10px rgba(${item.color === 'primary' ? '255,62,0' : '61,154,252'},0.2))`
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
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-4"
            >
              <span className="text-sm font-medium text-primary">My Journey</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Professional Experience
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto"
            >
              My professional journey in cinematic storytelling and video production
            </motion.p>
          </div>
        
          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden md:block"></div>
            
            <div className="space-y-16 relative">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.company}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 relative`}
                >
                  {/* Timeline dot */}
                  <div 
                    className="absolute left-0 md:left-1/2 top-0 w-6 h-6 rounded-full bg-primary transform md:-translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center shadow-glow"
                  >
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  
                  {/* Content */}
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="bg-secondary/50 backdrop-blur-sm border border-primary/10 rounded-xl p-6 hover:border-primary/30 transition-all duration-300 shadow-[0_0_10px_rgba(var(--gradient-from-rgb),0.1)] hover:shadow-[0_0_15px_rgba(var(--gradient-from-rgb),0.2)]">
                      <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'md:justify-end' : 'justify-start'}`}>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gradient-from/10 to-gradient-to/10 flex items-center justify-center">
                          <FiBriefcase className="text-primary" />
                        </div>
                        <h3 className="text-xl font-bold">{experience.company}</h3>
                      </div>
                      
                      <div className={`flex flex-wrap items-center gap-3 mb-4 ${index % 2 === 0 ? 'md:justify-end' : 'justify-start'}`}>
                        <span className="text-primary font-medium flex items-center gap-1">
                          <FiAward className="inline-block" size={14} /> {experience.role}
                        </span>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-400 flex items-center gap-1">
                          <FiCalendar className="inline-block" size={14} /> {experience.period}
                        </span>
                      </div>
                      
                      <p className="text-gray-300 leading-relaxed">{experience.description}</p>
                      
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <span className={`text-xs text-primary flex items-center gap-1 ${index % 2 === 0 ? 'md:justify-end' : 'justify-start'}`}>
                          <FiTrendingUp size={12} /> Key achievement
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
