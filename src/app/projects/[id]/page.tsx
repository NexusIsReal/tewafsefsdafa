'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiPlay, FiPause, FiArrowLeft, FiClock, FiUser, FiCalendar, FiTag, FiCheck } from 'react-icons/fi';
import Spinner from '@/components/ui/Spinner';

// Project type definition
interface Project {
  id: number;
  title: string;
  description: string;
  duration: string;
  year: string;
  tags: string[];
  thumbnailUrl: string;
  videoUrl: string;
  client: string;
  services: string[];
}

// Import the project data from the projects page
// This is a simplified version - in a real app you'd fetch from an API
const projects: Project[] = [
  {
    id: 1,
    title: 'johan set',
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

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = Number(params.id);
  
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    // Find the project based on ID
    const foundProject = projects.find(p => p.id === projectId);
    
    if (foundProject) {
      setProject(foundProject);
    } else {
      // If project not found, redirect to projects page
      router.push('/projects');
    }
    
    setIsLoading(false);
  }, [projectId, router]);
  
  // Format time in MM:SS format
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  // Video player controls
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
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
  }, []);
  
  // Toggle video play/pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;
      videoRef.current.play();
    }
  };
  
  // Initialize video settings
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;
    }
  }, [project, volume, isMuted]);
  
  if (isLoading) {
    return (
      <main className="min-h-screen pt-24 pb-20 flex items-center justify-center bg-black">
        <Spinner size="lg" />
      </main>
    );
  }
  
  if (!project) {
    return (
      <main className="min-h-screen pt-24 pb-20 flex flex-col items-center justify-center bg-black">
        <p className="text-white/70 mb-4">Project not found</p>
        <Link 
          href="/projects" 
          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md"
        >
          <FiArrowLeft className="mr-2" /> Back to Projects
        </Link>
      </main>
    );
  }
  
  return (
    <main className="min-h-screen pt-24 pb-20 bg-black">
      {/* Simple background gradient */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-zinc-900"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] bg-primary/5 rounded-full filter blur-[150px] opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8">
        {/* Back to projects button */}
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 text-white/70 hover:text-primary transition-colors mb-8 group"
        >
          <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Projects
        </Link>
        
        {/* Project content */}
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {project.title}
          </h1>
          
          <p className="text-lg text-gray-400 mb-8 max-w-4xl">
            {project.description}
          </p>
          
          {/* Video player section */}
          <div className="w-full aspect-video bg-black rounded-xl overflow-hidden mb-10 border border-primary/20">
            <div className="relative w-full h-full">
              {/* Video element */}
              <video
                ref={videoRef}
                className="w-full h-full object-contain"
                poster={project.thumbnailUrl}
                onClick={togglePlay}
                preload="metadata"
              >
                <source src={project.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Video controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-sm px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Play/Pause button */}
                  <button 
                    onClick={togglePlay}
                    className="w-10 h-10 rounded-full bg-primary/90 text-white flex items-center justify-center hover:bg-primary transition-colors"
                  >
                    {isPlaying ? (
                      <FiPause className="w-5 h-5" />
                    ) : (
                      <FiPlay className="w-5 h-5 ml-0.5" />
                    )}
                  </button>
                  
                  {/* Volume control */}
                  <div className="hidden md:flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (videoRef.current) {
                          const newMutedState = !isMuted;
                          videoRef.current.muted = newMutedState;
                          setIsMuted(newMutedState);
                        }
                      }}
                      className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      {isMuted ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                      )}
                    </button>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.1" 
                      value={volume}
                      className="w-20 accent-primary"
                      onChange={(e) => {
                        if (videoRef.current) {
                          const newVolume = parseFloat(e.target.value);
                          videoRef.current.volume = newVolume;
                          const newMutedState = newVolume === 0;
                          videoRef.current.muted = newMutedState;
                          setVolume(newVolume);
                          setIsMuted(newMutedState);
                        }
                      }}
                    />
                  </div>
                  
                  {/* Time display */}
                  <div className="text-white text-sm">
                    {formatTime(currentTime)} / {formatTime(duration || 0)}
                  </div>
                </div>
                
                {/* Full-screen button */}
                <button
                  onClick={() => {
                    if (videoRef.current) {
                      if (document.fullscreenElement) {
                        document.exitFullscreen();
                      } else {
                        videoRef.current.requestFullscreen();
                      }
                    }
                  }}
                  className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"></path><path d="M21 8V5a2 2 0 0 0-2-2h-3"></path><path d="M3 16v3a2 2 0 0 0 2 2h3"></path><path d="M16 21h3a2 2 0 0 0 2-2v-3"></path></svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Project details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              {/* Project description section */}
              <h2 className="text-2xl font-bold text-white mb-4">About this project</h2>
              <p className="text-gray-400 mb-6">
                {project.description}
              </p>
              
              {/* Tags */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-white mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string, index: number) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-white/10 text-white/90 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-xl p-6 border border-white/10 h-fit">
              {/* Project metadata */}
              <h3 className="text-xl font-bold text-white mb-4">Project Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                    <FiUser className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white/50 text-sm">Client</h4>
                    <p className="text-white font-medium">{project.client}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                    <FiCalendar className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white/50 text-sm">Year</h4>
                    <p className="text-white font-medium">{project.year}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                    <FiClock className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white/50 text-sm">Duration</h4>
                    <p className="text-white font-medium">{project.duration}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                    <FiTag className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-white/50 text-sm">Services</h4>
                    <ul className="text-white space-y-1 mt-1">
                      {project.services.map((service: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <FiCheck className="text-primary mr-2 w-4 h-4" /> 
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recommended projects section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">More Projects</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects
                .filter((p: Project) => p.id !== project.id)
                .slice(0, 3)
                .map((relatedProject: Project) => (
                  <Link 
                    key={relatedProject.id} 
                    href={`/projects/${relatedProject.id}`}
                    className="group"
                  >
                    <div className="bg-white/5 rounded-xl overflow-hidden border border-white/10 transition-colors hover:border-primary/30">
                      <div className="aspect-video relative">
                        <img 
                          src={relatedProject.thumbnailUrl} 
                          alt={relatedProject.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute bottom-3 left-3">
                          <span className="px-2 py-1 bg-black/60 text-white/90 rounded-md text-xs">
                            {relatedProject.duration}
                          </span>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-white font-medium group-hover:text-primary transition-colors">
                          {relatedProject.title}
                        </h3>
                        <p className="text-white/60 text-sm mt-1 line-clamp-1">
                          {relatedProject.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 