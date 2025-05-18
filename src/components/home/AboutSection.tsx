'use client';

import { motion } from 'framer-motion';
import { FiVideo, FiEdit, FiAward } from 'react-icons/fi';

export default function AboutSection() {
  const features = [
    {
      icon: <FiVideo className="w-6 h-6 text-primary" />,
      title: 'Professional Editing',
      description: 'High-quality video editing with attention to detail and creative storytelling.'
    },
    {
      icon: <FiEdit className="w-6 h-6 text-primary" />,
      title: 'Creative Direction',
      description: 'Artistic vision and storytelling expertise to elevate your video content.'
    },
    {
      icon: <FiAward className="w-6 h-6 text-primary" />,
      title: 'Award Winning',
      description: 'Recognized for excellence in video editing and post-production.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-black">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About <span className="text-primary">JohanMedia</span></h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden">
              {/* Gradient background instead of image */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-primary/20 z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <h3 className="text-3xl font-bold text-white">JohanMedia</h3>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-semibold">Turning Ideas Into Compelling Visual Stories</h3>
            <p className="text-gray-300">
              JohanMedia is a professional video editing service dedicated to transforming raw footage into 
              captivating visual narratives. With years of experience in the industry, we've worked with brands, 
              content creators, and production companies to deliver high-quality video content.
            </p>
            <p className="text-gray-300">
              Our approach combines technical expertise with creative storytelling to ensure your message 
              resonates with your audience. From color grading to sound design, we pay attention to every detail.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-4 bg-secondary rounded-lg"
                >
                  <div className="mb-3">{feature.icon}</div>
                  <h4 className="text-lg font-medium mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 