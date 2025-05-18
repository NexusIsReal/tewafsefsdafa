'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiPlay, FiExternalLink, FiFilm, FiAward, FiClock, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

// Projects based on actual video files
const projects = [
  {
    id: 1,
    title: 'MAIN JOHAN',
    description: 'A showcase of my primary video work and editing style.',
    duration: '5:25',
    year: '2023',
    tags: ['Showcase', 'Portfolio'],
    thumbnailUrl: '/images/MAIN JOHAN.jpg',
    videoUrl: '/projects/MAIN JOHAN.mp4',
    client: 'Personal Portfolio',
    services: ['Video Editing', 'Color Grading', 'Sound Design']
  },
  {
    id: 2,
    title: 'MrBeast Interview',
    description: 'A short interview edit featuring MrBeast discussing his content and vision.',
    duration: '2:30',
    year: '2023',
    tags: ['Interview', 'Short'],
    thumbnailUrl: '/images/mr beast Interview (Short).jpg',
    videoUrl: '/projects/mr beast Interview (Short).mp4',
    client: 'Content Creator',
    services: ['Interview Editing', 'Short Form Content']
  },
  {
    id: 3,
    title: 'David',
    description: 'A focused project highlighting storytelling through video.',
    duration: '3:15',
    year: '2023',
    tags: ['Story', 'Narrative'],
    thumbnailUrl: '/images/david.jpg',
    videoUrl: '/projects/david.mp4',
    client: 'David',
    services: ['Narrative Editing', 'Visual Storytelling']
  },
  {
    id: 4,
    title: 'Minecraft Cinematic',
    description: 'Creative gameplay footage edit showcasing Minecraft content.',
    duration: '1:45',
    year: '2023',
    tags: ['Gaming', 'Content'],
    thumbnailUrl: '/images/minecraft Cinematic.jpg',
    videoUrl: '/projects/minecraft Cinematic.mp4',
    client: 'Gaming Creator',
    services: ['Gaming Content', 'Pacing', 'Visual Effects']
  },
  {
    id: 5,
    title: 'Minecraft Cinematic 2',
    description: 'Follow-up Minecraft content with enhanced editing techniques.',
    duration: '1:40',
    year: '2023',
    tags: ['Gaming', 'Content'],
    thumbnailUrl: '/images/minecraft Cinematic2.jpg',
    videoUrl: '/projects/minecraft Cinematic2.mp4',
    client: 'Gaming Creator',
    services: ['Gaming Content', 'Pacing', 'Visual Effects']
  },
  {
    id: 6,
    title: 'Minecraft 5K',
    description: 'Special Minecraft project celebrating a 5K milestone.',
    duration: '8:20',
    year: '2023',
    tags: ['Gaming', 'Milestone'],
    thumbnailUrl: '/images/minecraft 5k.jpg',
    videoUrl: '/projects/minecraft 5k.mp4',
    client: 'Gaming Channel',
    services: ['Long-form Content', 'Special Effects', 'Editing']
  },
  {
    id: 7,
    title: 'Minecraft Intro',
    description: 'Captivating introduction sequence for a Minecraft channel.',
    duration: '3:45',
    year: '2023',
    tags: ['Intro', 'Gaming'],
    thumbnailUrl: '/images/minecraft intro.jpg',
    videoUrl: '/projects/minecraft intro.mp4',
    client: 'Gaming Creator',
    services: ['Intro Design', 'Motion Graphics', 'Branding']
  },
  {
    id: 8,
    title: 'Iman Gadzhi',
    description: 'Professional interview edit featuring Iman Gadzhi.',
    duration: '1:20',
    year: '2023',
    tags: ['Interview', 'Business'],
    thumbnailUrl: '/images/iman_gadzhi.jpg',
    videoUrl: '/projects/iman_gadzhi.mp4',
    client: 'Business Channel',
    services: ['Interview Editing', 'Professional Content']
  },
  {
    id: 9,
    title: 'Iman Gadzhi Extended',
    description: 'Extended interview and content featuring Iman Gadzhi.',
    duration: '4:10',
    year: '2023',
    tags: ['Interview', 'Business'],
    thumbnailUrl: '/images/ImanGadzhi.jpg',
    videoUrl: '/projects/ImanGadzhi.mp4',
    client: 'Business Channel',
    services: ['Long-form Interview', 'Content Production']
  },
  {
    id: 10,
    title: 'Ebuka Getting Back',
    description: 'Lifestyle content featuring Ebuka\'s journey and experiences.',
    duration: '18:45',
    year: '2023',
    tags: ['Lifestyle', 'Documentary'],
    thumbnailUrl: '/images/Ebuka Getting back.jpg',
    videoUrl: '/projects/Ebuka Getting back.mp4',
    client: 'Ebuka',
    services: ['Documentary Editing', 'Long-form Content', 'Storytelling']
  },
  {
    id: 11,
    title: 'Ebuka 74 (Short)',
    description: 'A concise short-form video featuring Ebuka.',
    duration: '4:30',
    year: '2023',
    tags: ['Short', 'Lifestyle'],
    thumbnailUrl: '/images/ebuka 74.jpg',
    videoUrl: '/projects/ebuka 74  (Short).mp4',
    client: 'Ebuka',
    services: ['Short Content', 'Quick Edits', 'Social Media']
  },
  {
    id: 12,
    title: 'Self Confidence',
    description: 'Motivational content focusing on building self-confidence.',
    duration: '9:15',
    year: '2023',
    tags: ['Motivational', 'Self-help'],
    thumbnailUrl: '/images/Self Confidence.jpg',
    videoUrl: '/projects/Self Confidence.mp4',
    client: 'Motivational Channel',
    services: ['Motivational Content', 'Inspirational Editing', 'Audio Production']
  }
];

// Filter options
const categories = [
  { id: 'all', name: 'All Projects' },
  { id: 'shorts', name: 'Shorts' },
  { id: 'gaming', name: 'Minecraft' },
  { id: 'interviews', name: 'Interviews' }
];

export default function ProjectsPage() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Play video
  const playVideo = (id: number) => {
    setActiveVideo(id);
    // Reset video state
    setIsPlaying(false);
    setCurrentTime(0);
  };
  
  // Close video
  const closeVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setActiveVideo(null);
    setIsPlaying(false);
  };
  
  // Toggle play/pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.volume = 0.5; // Set volume to 50%
      videoRef.current.play();
    }
  };
  
  // Format time in MM:SS format
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Update video time and state
  useEffect(() => {
    const video = videoRef.current;
    if (!video || activeVideo === null) return;
    
    const updateTime = () => {
      setCurrentTime(video.currentTime);
    };
    
    const updateDuration = () => {
      setDuration(video.duration);
    };
    
    const handlePlayStateChange = () => {
      setIsPlaying(!video.paused);
    };
    
    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('play', handlePlayStateChange);
    video.addEventListener('pause', handlePlayStateChange);
    
    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('play', handlePlayStateChange);
      video.removeEventListener('pause', handlePlayStateChange);
    };
  }, [activeVideo]);
  
  // Get current project
  const getCurrentProject = () => {
    return projects.find(p => p.id === activeVideo) || null;
  };
  
  // Filter projects
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => {
        if (activeFilter === 'shorts') {
          return project.tags.includes('Short');
        }
        if (activeFilter === 'gaming') {
          return project.tags.includes('Gaming');
        }
        if (activeFilter === 'interviews') {
          return project.tags.includes('Interview');
        }
        return false;
      });

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
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div className="w-full max-w-6xl mx-auto overflow-hidden rounded-xl shadow-2xl">
            {/* Video player */}
            <div className="relative aspect-video bg-black">
              <video 
                ref={videoRef}
                src={getCurrentProject()?.videoUrl} 
                className="w-full h-full object-contain"
                playsInline
                controls={false}
                onClick={togglePlay}
              ></video>
              
              {/* Play/pause overlay */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <button
                    onClick={togglePlay}
                    className="w-20 h-20 flex items-center justify-center rounded-full bg-primary text-black transform hover:scale-105 transition-transform"
                  >
                    <FiPlay className="w-8 h-8 ml-1" />
                  </button>
                </div>
              )}
              
              {/* Video controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                {/* Progress bar */}
                <div className="relative w-full h-1 bg-white/20 rounded-full mb-4 cursor-pointer overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-primary rounded-full"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  ></div>
                </div>
                
                {/* Controls row */}
                <div className="flex items-center justify-between">
                  {/* Left side */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={togglePlay}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                    >
                      {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="6" y="4" width="4" height="16"></rect>
                          <rect x="14" y="4" width="4" height="16"></rect>
                        </svg>
                      ) : (
                        <FiPlay className="w-5 h-5 ml-0.5" />
                      )}
                    </button>
                    
                    {/* Time display */}
                    <div className="text-sm text-white/80">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>
                  
                  {/* Right side */}
                  <div>
                    <h3 className="text-lg font-medium text-white">{getCurrentProject()?.title}</h3>
                  </div>
                </div>
              </div>
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
