'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiClock, FiUser, FiCalendar, FiTag, FiCheck } from 'react-icons/fi';
import Spinner from '@/components/ui/Spinner';
import { Project, getProjectById } from '@/types/projects';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = Number(params.id);
  
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Find the project based on ID
    const foundProject = getProjectById(projectId);
    
    if (foundProject) {
      setProject(foundProject);
    } else {
      // If project not found, redirect to projects page
      router.push('/projects');
    }
    
    setIsLoading(false);
  }, [projectId, router]);
  
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
              {/* YouTube embed */}
              <iframe
                className="w-full h-full object-contain"
                src={`https://www.youtube.com/embed/${getYoutubeId(project.youtubeUrl)}?autoplay=0&rel=0&modestbranding=1`}
                title={project.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              
              {/* Removed video controls as YouTube provides its own */}
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
              {project && getProjectById ?
                Array.from({ length: 3 }).map((_, i) => {
                  // Find related projects excluding current one
                  const relatedProjects = Array.from({ length: 12 })
                    .map((_, i) => getProjectById(i + 1))
                    .filter(p => p && p.id !== project.id);
                  
                  // Get a project at this index if it exists
                  const relatedProject = relatedProjects[i];
                  
                  if (!relatedProject) return null;
                  
                  return (
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
                  );
                })
              : null}
            </div>
          </div>
        </div>
      </div>
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