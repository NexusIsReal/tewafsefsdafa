import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import TechStackSection from '@/components/home/TechStackSection';
import ContactSection from '@/components/home/ContactSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import ProjectsSection from '@/components/home/ProjectsSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <div id="services">
        <ServicesSection />
      </div>
      <div id="experience">
        <ExperienceSection />
      </div>
      <div id="projects">
        <ProjectsSection />
      </div>
      <div id="tech-stack">
        <TechStackSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
    </>
  );
}
