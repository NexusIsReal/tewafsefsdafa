'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiX } from 'react-icons/fi';

const portfolioItems = [
  {
    id: 1,
    title: 'Commercial Brand Story',
    category: 'Commercial',
    color: 'from-blue-900 to-blue-700',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video URL
    description: 'Cinematic commercial production for a major retail brand.'
  },
  {
    id: 2,
    title: 'Wedding Highlights',
    category: 'Wedding',
    color: 'from-pink-900 to-pink-700',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video URL
    description: 'Emotional wedding highlight reel capturing special moments.'
  },
  {
    id: 3,
    title: 'Travel Documentary',
    category: 'Documentary',
    color: 'from-green-900 to-green-700',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video URL
    description: 'Adventure travel documentary shot across multiple countries.'
  },
  {
    id: 4,
    title: 'Music Video Production',
    category: 'Music Video',
    color: 'from-purple-900 to-purple-700',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video URL
    description: 'Creative direction and editing for an indie artist music video.'
  },
  {
    id: 5,
    title: 'Corporate Training',
    category: 'Corporate',
    color: 'from-gray-800 to-gray-600',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video URL
    description: 'Professional corporate training video with motion graphics.'
  },
  {
    id: 6,
    title: 'Event Highlights',
    category: 'Event',
    color: 'from-amber-900 to-amber-700',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video URL
    description: 'Highlights from a major tech conference with speaker interviews.'
  }
];

const categories = ['All', 'Commercial', 'Wedding', 'Documentary', 'Music Video', 'Corporate', 'Event'];

export default function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const filteredItems = selectedCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  const openVideoModal = (id: number) => {
    setSelectedVideo(id);
    document.body.style.overflow = 'hidden';
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="portfolio" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our <span className="text-primary">Portfolio</span></h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-gray-300">
            Explore our collection of video projects across various industries and styles.
          </p>
        </motion.div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                selectedCategory === category 
                  ? 'bg-primary text-white' 
                  : 'bg-black/30 text-gray-300 hover:bg-black/50'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </motion.button>
          ))}
        </div>
        
        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative rounded-lg overflow-hidden cursor-pointer h-[250px]"
              onClick={() => openVideoModal(item.id)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color}`}></div>
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <FiPlay className="w-12 h-12 mx-auto mb-3" />
                  <h3 className="text-xl font-medium mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.category}</p>
                </div>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h3 className="text-xl font-medium text-white group-hover:opacity-0 transition-opacity duration-300">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Video Modal */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        >
          <div className="relative w-full max-w-4xl mx-auto">
            <button 
              className="absolute -top-10 right-0 text-white focus:outline-none"
              onClick={closeVideoModal}
            >
              <FiX className="w-6 h-6" />
            </button>
            
            <div className="bg-black rounded-lg overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <iframe 
                  src={portfolioItems.find(item => item.id === selectedVideo)?.videoUrl} 
                  title="Video player" 
                  className="w-full h-full"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-medium">
                  {portfolioItems.find(item => item.id === selectedVideo)?.title}
                </h3>
                <p className="text-gray-400 mt-1">
                  {portfolioItems.find(item => item.id === selectedVideo)?.description}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
} 