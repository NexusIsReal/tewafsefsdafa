'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiPlay, FiExternalLink, FiFilm, FiAward, FiClock, FiArrowLeft, FiArrowRight, FiX } from 'react-icons/fi';

// Import project data from centralized file
import { Project, projects, categories, getFilteredProjects } from '@/types/projects';

export default function ProjectsPage() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Play video modal with YouTube embed
  const playVideo = (id: number) => {
    setActiveVideo(id);
  };
  
  // Close video
  const closeVideo = () => {
    setActiveVideo(null);
  };
  
  // Get current project
  const getCurrentProject = () => {
    return projects.find(p => p.id === activeVideo) || null;
  };
  
  // Filter projects using centralized function
  const filteredProjects = getFilteredProjects(activeFilter);

  return (
    <main className="min-h-screen pt-24 pb-20 relative overflow-hidden bg-black">
      {/* Simplified Background elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        {/* Simple gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-zinc-900" />
        
        {/* Subtle primary glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] bg-primary/5 rounded-full filter blur-[150px] opacity-50" />
        
        {/* Simple vignette overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]" />
      </div>
      
      <div className="container mx-auto px-4 md:px-8">
        {/* Back to home link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-white/70 hover:text-primary transition-colors mb-8 group"
        >
          <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>
        
        {/* Page header */}
        <div className="max-w-7xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-4 shadow-glow-sm"
          >
            <span className="text-sm font-medium text-white bg-gradient-to-r from-primary to-gradient-to bg-clip-text text-transparent">My Portfolio</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight"
          >
            Video Projects
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/70 text-lg max-w-3xl"
          >
            Browse through my video editing portfolio showcasing different styles and techniques. Click on a project to view the full video.
          </motion.p>
        </div>
        
        {/* Filters */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === category.id
                    ? 'bg-primary text-black shadow-glow-sm'
                    : 'bg-white/10 backdrop-blur-sm text-white/80 hover:bg-white/20'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Projects grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden group hover:shadow-glow-sm transition-all duration-300 border border-white/10"
            >
              {/* Project thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-black/50">
                <img 
                  src={project.thumbnailUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                {/* View details overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link 
                    href={`/projects/${project.id}`}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-white transform hover:scale-105 transition-transform"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FiExternalLink className="w-5 h-5" />
                  </Link>
                </div>
                
                {/* Tags */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  {project.tags.slice(0, 2).map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-1 text-xs font-medium bg-black/70 backdrop-blur-sm text-white/90 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Project details */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-white/70 mb-4 line-clamp-2">{project.description}</p>
                
                {/* Metadata */}
                <div className="flex flex-wrap gap-4 text-sm text-white/60 mb-4">
                  <div className="flex items-center gap-1.5">
                    <FiClock className="w-4 h-4" />
                    <span>{project.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FiAward className="w-4 h-4" />
                    <span>{project.year}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FiFilm className="w-4 h-4" />
                    <span>{project.services[0]}</span>
                  </div>
                </div>
                
                {/* View details link */}
                <Link 
                  href={`/projects/${project.id}`} 
                  className="inline-flex items-center px-4 py-2 rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  View project <FiArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Video Modal */}
      {activeVideo !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md"
        >
          {/* Close button */}
          <button
            onClick={closeVideo}
            className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
          
          <div className="w-full max-w-6xl mx-auto overflow-hidden rounded-xl shadow-2xl">
            {/* YouTube embed video player */}
            <div className="relative aspect-video bg-black">
              <iframe 
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${getYoutubeId(getCurrentProject()?.youtubeUrl || '')}?autoplay=1&rel=0&modestbranding=1`}
                title={getCurrentProject()?.title || 'YouTube video'}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            {/* Project details */}
            <div className="bg-zinc-900 p-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">{getCurrentProject()?.title}</h2>
                  <p className="text-white/70 mb-6">{getCurrentProject()?.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {getCurrentProject()?.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1.5 text-sm font-medium bg-white/10 text-white/90 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="md:w-64 space-y-4">
                  {/* Project details */}
                  <div>
                    <h3 className="text-sm font-semibold text-white/50 uppercase mb-2">Client</h3>
                    <p className="text-white">{getCurrentProject()?.client}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-white/50 uppercase mb-2">Year</h3>
                    <p className="text-white">{getCurrentProject()?.year}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-white/50 uppercase mb-2">Services</h3>
                    <ul className="text-white space-y-1">
                      {getCurrentProject()?.services.map((service, i) => (
                        <li key={i}>{service}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </main>
  );
}

// Function to extract YouTube video ID from URL
function getYoutubeId(url: string): string {
  // Handle shorts format
  if (url.includes('youtube.com/shorts/')) {
    const shortsId = url.split('youtube.com/shorts/')[1];
    return shortsId.split(/[/?&]/)[0]; // Get everything before any parameters
  }
  
  // Handle regular YouTube URLs
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : '';
}
