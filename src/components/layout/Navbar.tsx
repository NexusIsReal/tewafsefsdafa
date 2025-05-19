'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX, FiVideo, FiFilm } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';

// Custom styles
const styles = {
  buttonGradient: "bg-gradient-to-r from-primary to-primary-dark hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
};

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Only update active section on home page
      if (!isHomePage) return;
      
      // Update active section based on scroll position
      const sections = ['contact', 'tech-stack', 'projects', 'experience', 'services', 'home'];
      
      // Find which section is currently in view
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const navbarHeight = document.querySelector('header')?.offsetHeight || 0;
          
          // Check if the section is in viewport (accounting for navbar height)
          // The section is considered in view if its top is near the viewport top
          // or if it takes up most of the viewport
          if (
            (rect.top <= navbarHeight + 100 && rect.bottom >= navbarHeight) || 
            (rect.top <= navbarHeight + 100 && rect.bottom > window.innerHeight / 2)
          ) {
            if (activeSection !== section) {
              console.log('Active section changed to:', section);
              setActiveSection(section);
            }
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, isHomePage]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Smooth scroll function for home page or navigate to home page + anchor for other pages
  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    
    // If not on home page, navigate to home page with hash
    if (!isHomePage) {
      router.push(`/${href}`);
      return;
    }
    
    // Handle home link
    if (href === '#') {
      const homeElement = document.getElementById('home');
      if (homeElement) {
        const navbarHeight = document.querySelector('header')?.offsetHeight || 0;
        const targetPosition = homeElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      } else {
        // Fallback to top of page if home element not found
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      
      setActiveSection('home');
      return;
    }
    
    // Get the target element
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Get the navbar height to offset the scroll position
      const navbarHeight = document.querySelector('header')?.offsetHeight || 0;
      
      // Calculate the target position with offset
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
      
      // Smooth scroll to the target
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Update active section
      setActiveSection(targetId === '' ? 'home' : targetId);
    }
  }, [isMenuOpen, isHomePage, router]);

  const navLinks = [
    { name: 'Home', href: '#', icon: <FiFilm className="mr-2" /> },
    { name: 'Services', href: '#services', icon: <FiFilm className="mr-2" /> },
    { name: 'Experience', href: '#experience', icon: <FiVideo className="mr-2" /> },
    { name: 'Projects', href: '#projects', icon: <FiVideo className="mr-2" /> },
    { name: 'Tech Stack', href: '#tech-stack', icon: <FiFilm className="mr-2" /> },
    { name: 'Contact', href: '#contact', icon: <FiVideo className="mr-2" /> },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/90 backdrop-blur-md py-3 border-b border-primary/10 shadow-[0_4px_20px_-10px_rgba(var(--primary),0.3)]' 
          : 'bg-background/50 backdrop-blur-sm py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center group"
          onClick={(e) => isHomePage ? scrollToSection(e, '#') : undefined}
        >
          {/* Logo Icon */}
          <div className="relative w-10 h-10 mr-3 overflow-hidden rounded-full border border-white/20 shadow-lg shadow-black/10 group-hover:shadow-primary/20 transition-all duration-300">
            <Image 
              src="/icons/navbar-image.jpg" 
              alt="Johan Logo" 
              fill
              sizes="40px"
              className="object-cover" 
              style={{ objectPosition: "center center" }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <div className="relative overflow-hidden flex flex-col justify-center">
            <span className="text-xl md:text-2xl font-bold tracking-tight flex items-center text-white">
              Johan
            </span>
            <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-accent to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => {
            const isActive = isHomePage && (
              activeSection === link.href.replace('#', '') || 
              (activeSection === 'home' && link.href === '#')
            );
            return (
              <Link 
                key={link.name} 
                href={link.href}
                className={`px-4 py-2 rounded-md transition-all duration-300 flex items-center text-sm relative overflow-hidden ${isActive 
                  ? 'text-primary bg-primary/10 shadow-[0_0_10px_rgba(var(--primary),0.1)]' 
                  : 'text-gray-light hover:text-primary hover:bg-primary/5'}`}
                onClick={(e) => scrollToSection(e, link.href)}
              >
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-transparent" />
                )}
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={`md:hidden fixed inset-0 z-40 bg-gradient-to-b from-background/98 to-background/95 backdrop-blur-md transition-all duration-500 flex flex-col justify-center items-center ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full filter blur-[80px]"></div>
          <div className="absolute bottom-1/3 right-1/4 w-1/3 h-1/3 bg-accent/5 rounded-full filter blur-[60px]"></div>
        </div>
        
        <div className="flex flex-col items-center justify-center space-y-4 w-full max-w-sm px-6">
          {/* Mobile logo */}
          <div className="mb-6 flex items-center">
            <Link 
              href="/" 
              className="flex items-center"
              onClick={(e) => isHomePage ? scrollToSection(e, '#') : undefined}
            >
              <div className="relative w-11 h-11 mr-3 overflow-hidden rounded-full border border-white/20 shadow-lg shadow-black/10">
                <Image 
                  src="/icons/navbar-image.jpg" 
                  alt="Johan Logo" 
                  fill
                  sizes="44px"
                  className="object-cover" 
                  style={{ objectPosition: "center center" }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Johan
              </span>
            </Link>
          </div>
          
          {navLinks.map((link, index) => {
            const isActive = isHomePage && (
              activeSection === link.href.replace('#', '') || 
              (activeSection === 'home' && link.href === '#')
            );
            return (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full"
              >
                <Link 
                  href={link.href}
                  className={`text-base flex items-center justify-center w-full py-3 px-8 rounded-lg transition-all duration-300 relative ${isActive 
                    ? 'text-primary bg-primary/10 shadow-[0_0_15px_rgba(var(--primary),0.15)] font-medium' 
                    : 'text-gray-light hover:text-primary hover:bg-primary/5'}`}
                  onClick={(e) => scrollToSection(e, link.href)}
                >
                  {link.icon}
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-transparent" />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </header>
  );
}
