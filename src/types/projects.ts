// Project type definition
export interface Project {
  id: number;
  title: string;
  description: string;
  duration: string;
  year: string;
  tags: string[];
  thumbnailUrl: string;
  youtubeUrl: string;
  client: string;
  services: string[];
}

// Filter options
export const categories = [
  { id: 'all', name: 'All Projects' },
  { id: 'shorts', name: 'Shorts' },
  { id: 'gaming', name: 'Minecraft' },
  { id: 'interviews', name: 'Interviews' }
];

// Helper functions
export function getProjectById(id: number): Project | undefined {
  return projects.find(p => p.id === id);
}

export function getFilteredProjects(filterCategory: string): Project[] {
  if (filterCategory === 'all') {
    return projects;
  } else if (filterCategory === 'shorts') {
    return projects.filter(project => 
      project.tags.some(tag => tag.toLowerCase().includes('short'))
    );
  } else if (filterCategory === 'gaming') {
    return projects.filter(project => 
      project.tags.some(tag => tag.toLowerCase().includes('gaming')) || 
      project.title.toLowerCase().includes('minecraft')
    );
  } else if (filterCategory === 'interviews') {
    return projects.filter(project => 
      project.tags.some(tag => tag.toLowerCase().includes('interview')) ||
      project.title.toLowerCase().includes('interview')
    );
  }
  return projects;
}

// Project data
export const projects: Project[] = [
    {
        id: 1,
        title: 'MAIN JOHAN',
        description: 'A showcase of my primary video work and editing style.',
        duration: '5:25',
        year: '2023',
        tags: ['Showcase', 'Portfolio'],
        thumbnailUrl: '/images/MAIN JOHAN.jpg',
        youtubeUrl: 'https://youtu.be/DKp1qPC7Y5M',
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
        youtubeUrl: 'https://youtube.com/shorts/uGYyqWq8ip0',
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
        youtubeUrl: 'https://youtube.com/shorts/oc5r7liBMnI',
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
        youtubeUrl: 'https://youtu.be/CYXnGXieMh8',
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
        youtubeUrl: 'https://youtu.be/UBf9qgckIuQ',
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
        youtubeUrl: 'https://youtu.be/LLVP0_SdY_I',
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
        youtubeUrl: 'https://youtu.be/a-gXg_4BY-w',
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
        youtubeUrl: 'https://youtube.com/shorts/I9F_HyJZKlM',
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
        youtubeUrl: 'https://youtube.com/shorts/tRVigMfix4g',
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
        youtubeUrl: 'https://youtube.com/shorts/PIyS2aJXFiY',
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
        youtubeUrl: 'https://youtube.com/shorts/W5_1ACB5kk8',
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
        youtubeUrl: 'https://youtube.com/shorts/fBOVtEOPnH4',
        client: 'Motivational Channel',
        services: ['Motivational Content', 'Inspirational Editing', 'Audio Production']
      }
    ];

// Get a subset of featured projects for the home page
export const featuredProjects = projects.slice(0, 6); 