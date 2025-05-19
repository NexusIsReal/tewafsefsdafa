'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiClock, FiArrowRight, FiMessageCircle, FiCheck, FiPlay, FiPaperclip, FiX, FiFile, FiImage, FiVideo } from 'react-icons/fi';
import { Spinner } from '@/components/ui/Spinner';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ContactSection() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    budget: ''
  });
  
  // Add file attachment state
  const [attachments, setAttachments] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  
  // Track mouse position for 3D effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    setIsLoaded(true);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Parallax effect on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // File handling functions
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };
  
  const handleFiles = (files: FileList) => {
    // Limit to 5 files max
    const newFiles = Array.from(files).slice(0, 5 - attachments.length);
    setAttachments(prev => [...prev, ...newFiles].slice(0, 5));
  };
  
  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };
  
  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  // Get file icon based on type
  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <FiImage className="text-primary" />;
    } else if (file.type.startsWith('video/')) {
      return <FiVideo className="text-primary" />;
    } else {
      return <FiFile className="text-primary" />;
    }
  };
  
  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Discord webhook integration
      // To set up a Discord webhook:
      // 1. In Discord, go to Server Settings > Integrations > Webhooks
      // 2. Click "New Webhook"
      // 3. Name it (e.g. "Portfolio Contact Form")
      // 4. Choose which channel to send messages to
      // 5. Copy the webhook URL and paste it below
      // 6. Make sure to keep your webhook URL private in production environment
      //    by using environment variables (e.g. process.env.DISCORD_WEBHOOK_URL)
      const webhookUrl = 'https://discord.com/api/webhooks/1373199412603387964/sZbg-HVkLBdRetlxDRv45gFRaop9xO52FqykaFg6phpJpfvhjk2EwkYGaEryKl2KFqT5';
      
      // Create payload for Discord message
      const messagePayload = {
        content: '<@&1201515499071213568> <@&1258746906021199923> <@&1166770801094172713> New contact form submission received!',
        embeds: [
          {
            title: '📬 New Contact Form Submission',
            color: 0x4ecdc4, // Primary color in hex
            fields: [
              {
                name: '👤 Name',
                value: formData.name,
                inline: true
              },
              {
                name: '📧 Email',
                value: formData.email,
                inline: true
              },
              {
                name: '🎬 Service Type',
                value: formData.subject || 'Not specified',
                inline: true
              },
              {
                name: '💰 Budget',
                value: formData.budget || 'Not specified',
                inline: true
              },
              {
                name: '📝 Message',
                value: formData.message || 'No message provided'
              },
              {
                name: '📎 Attachments',
                value: attachments.length > 0 
                  ? attachments.map(file => `${file.name} (${formatFileSize(file.size)})`).join('\n') 
                  : 'No attachments'
              }
            ],
            timestamp: new Date().toISOString(),
            footer: {
              text: '🎥 Sent from Johan Media Portfolio'
            }
          }
        ]
      };
      
      try {
        // First send the message to Discord webhook
        const messageResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messagePayload),
        });
        
        if (!messageResponse.ok) {
          console.error('Discord webhook message error:', messageResponse.status, await messageResponse.text());
        } else {
          console.log('Message sent to Discord successfully');
          
          // If there are attachments, send them one by one
          if (attachments.length > 0) {
            for (const file of attachments) {
              const formDataObj = new FormData();
              
              // Add a simple message with the file
              const fileMessage = {
                content: `📎 Attachment from ${formData.name}: ${file.name} (${formatFileSize(file.size)})`
              };
              
              // Append the JSON payload as a string
              formDataObj.append('payload_json', JSON.stringify(fileMessage));
              
              // Append the file with 'file' as the form field name
              formDataObj.append('files[0]', file, file.name);
              
              // Send attachment to Discord
              const fileResponse = await fetch(webhookUrl, {
                method: 'POST',
                body: formDataObj,
              });
              
              if (!fileResponse.ok) {
                console.error(`Error sending attachment ${file.name}:`, fileResponse.status, await fileResponse.text());
              } else {
                console.log(`Attachment ${file.name} sent successfully`);
              }
            }
          }
        }
      } catch (error) {
        console.error('Discord webhook error:', error);
        // Continue with regular form submission even if Discord fails
      }
      
      // Simulate actual form submission (this would be your API endpoint in production)
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '', budget: '' });
      setAttachments([]);
      
      // Redirect to projects page after a short delay
      setTimeout(() => {
        router.push('/projects');
      }, 2000);
    } catch (error) {
      setSubmitError('There was an error submitting your form. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Function to handle video button click - now redirects to project page
  const handleVideoClick = () => {
    router.push('/projects/1');
  };
  
  const contactInfo = [
    {
      icon: <FiMail className="w-6 h-6 text-primary" />,
      label: 'Email Me',
      value: 'contact@johanmedia.com',
      link: 'mailto:contact@johanmedia.com'
    },
    {
      icon: <FiPhone className="w-6 h-6 text-primary" />,
      label: 'Call Me',
      value: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: <FiMapPin className="w-6 h-6 text-primary" />,
      label: 'Visit Me',
      value: 'New York, NY, USA',
      link: 'https://maps.google.com'
    }
  ];
  
  const budgetOptions = [
    { value: "$1,000 - $3,000", label: "$1,000 - $3,000" },
    { value: "$3,000 - $5,000", label: "$3,000 - $5,000" },
    { value: "$5,000 - $10,000", label: "$5,000 - $10,000" },
    { value: "$10,000+", label: "$10,000+" },
    { value: "Not sure yet", label: "Not sure yet" }
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-24 relative overflow-hidden bg-black perspective-1000">
      {/* Cinematic background with film grain and color grading */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Cinematic overlay with film grain and color grading */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black mix-blend-color-burn"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
        
        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-[0.04]">
          <motion.div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(rgba(var(--primary),0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--primary),0.3) 1px, transparent 1px)`,
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
            top: '20%',
            right: '15%',
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
            bottom: '15%',
            left: '25%',
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
        
        {/* Floating icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { Icon: FiMail, x: '12%', y: '25%', size: 30, color: 'primary' },
            { Icon: FiPhone, x: '85%', y: '18%', size: 26, color: 'accent' },
            { Icon: FiMapPin, x: '20%', y: '70%', size: 28, color: 'primary' },
            { Icon: FiSend, x: '80%', y: '60%', size: 32, color: 'accent' },
          ].map((item, i) => (
            <motion.div
              key={`icon-${i}`}
              className={`absolute text-${item.color}/30`}
              style={{
                left: item.x,
                top: item.y,
                fontSize: `${item.size}px`,
                filter: `drop-shadow(0 0 10px rgba(var(--${item.color}),0.2))`
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
        
        {/* Connection lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M0,50 Q25,30 50,50 T100,50"
              stroke="url(#contactGradient)"
              strokeWidth="0.2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
            <motion.path
              d="M0,60 Q40,80 60,50 T100,60"
              stroke="url(#contactGradient)"
              strokeWidth="0.2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ duration: 4, delay: 1, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="contactGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(var(--primary-rgb), 0.5)" />
                <stop offset="50%" stopColor="rgba(var(--accent-rgb), 0.5)" />
                <stop offset="100%" stopColor="rgba(var(--primary-rgb), 0.5)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      
      <div ref={containerRef} className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header - enhanced with animations */}
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            style={{ y, opacity }}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.3
                }
              }
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
                }
              }}
              className="inline-block px-4 py-1 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-4 overflow-hidden relative"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span 
                className="absolute inset-0 bg-primary/10 -translate-x-full"
                animate={{ translateX: ['100%', '-100%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
              />
              <span className="text-sm font-medium text-primary relative z-10">Get In Touch</span>
            </motion.div>
            
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
                }
              }}
              className="text-4xl md:text-5xl font-bold mb-6 text-white relative"
            >
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-accent/5 blur-xl"></span>
                <span className="relative">Let's Collaborate</span>
              </span>
            </motion.h2>
            
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
                }
              }}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              <span className="relative px-4 py-2 backdrop-blur-sm bg-black/10 rounded-lg border-l border-primary/20">
                Ready to bring your vision to life? Let's create something cinematic and impactful together
              </span>
            </motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-secondary/20 backdrop-blur-lg border border-primary/10 rounded-xl p-8 shadow-[0_0_20px_rgba(var(--primary-rgb),0.05)] hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.15)] transition-all duration-500 relative overflow-hidden transform-gpu"
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d',
              }}
              whileHover={{
                rotateY: mousePosition.x * 3,
                rotateX: -mousePosition.y * 3,
              }}
            >
              {/* Animated gradient accent */}
              <div className="absolute -top-24 -right-24 w-40 h-40 bg-gradient-to-br from-primary/10 to-transparent rounded-full filter blur-[30px] opacity-50"></div>
              
              {/* Animated border effects */}
              <motion.div 
                className="absolute inset-0 border border-primary/0 rounded-xl opacity-0 pointer-events-none"
                animate={{
                  boxShadow: [
                    'inset 0 0 0px rgba(var(--primary-rgb), 0)',
                    'inset 0 0 20px rgba(var(--primary-rgb), 0.2)',
                    'inset 0 0 0px rgba(var(--primary-rgb), 0)'
                  ],
                  borderColor: ['rgba(var(--primary-rgb), 0)', 'rgba(var(--primary-rgb), 0.3)', 'rgba(var(--primary-rgb), 0)']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center backdrop-blur-sm border border-primary/20"
                >
                  <FiMessageCircle className="text-primary text-2xl" />
                </motion.div>
                <h3 className="text-2xl font-semibold">Start a Project</h3>
              </div>
              
              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-900/30 backdrop-blur-sm border border-green-700/50 text-green-200 rounded-lg p-6 mb-6 flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-green-900/50 flex items-center justify-center mb-4 text-green-300">
                    <FiCheck className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-medium mb-2">Message Sent Successfully!</h4>
                  <p className="mb-4">Thank you for reaching out! I'll review your project details and get back to you within 24-48 hours.</p>
                  <p className="text-sm text-green-300">Redirecting you to projects page in a moment...</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-primary/20 focus:border-primary/60 focus:shadow-glow-sm rounded-md outline-none transition-all duration-300 placeholder-gray-500 backdrop-blur-sm"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">Your Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className="w-full px-4 py-3 bg-black/50 border border-primary/20 focus:border-primary/60 focus:shadow-glow-sm rounded-md outline-none transition-all duration-300 placeholder-gray-500 backdrop-blur-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-300">Service Type</label>
                      <div className="relative">
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-black/70 text-white border border-primary/30 focus:border-primary/80 focus:shadow-glow-sm rounded-md outline-none transition-all duration-300 appearance-none cursor-pointer backdrop-blur-sm"
                        >
                          <option value="" disabled>Select a service</option>
                          <option value="Premium Video Editing">Premium Video Editing</option>
                          <option value="Advanced Color Grading">Advanced Color Grading</option>
                          <option value="Dynamic Motion Graphics">Dynamic Motion Graphics</option>
                          <option value="Sound Design & Mixing">Sound Design & Mixing</option>
                          <option value="3D Visual Effects">3D Visual Effects</option>
                          <option value="Multi-Platform Optimization">Multi-Platform Optimization</option>
                          <option value="Custom Project">Custom Project</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                          <svg className="w-4 h-4 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="absolute inset-0 rounded-md pointer-events-none border border-transparent group-focus-within:border-primary/50 group-focus-within:shadow-glow-sm"></div>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium mb-2 text-gray-300">Project Budget</label>
                      <div className="relative">
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-black/70 text-white border border-primary/30 focus:border-primary/80 focus:shadow-glow-sm rounded-md outline-none transition-all duration-300 appearance-none cursor-pointer backdrop-blur-sm"
                        >
                          <option value="" disabled>Select a budget range</option>
                          {budgetOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                          <svg className="w-4 h-4 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="absolute inset-0 rounded-md pointer-events-none border border-transparent group-focus-within:border-primary/50 group-focus-within:shadow-glow-sm"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">Project Details</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Describe your project, goals, timeline, and any specific requirements..."
                      className="w-full px-4 py-3 bg-black/50 border border-primary/20 focus:border-primary/60 focus:shadow-glow-sm rounded-md outline-none transition-all duration-300 placeholder-gray-500 backdrop-blur-sm resize-none"
                    />
                  </div>
                  
                  {/* File attachment area */}
                  <div 
                    className={`border-2 border-dashed ${dragActive ? 'border-primary/50 bg-primary/5' : 'border-primary/20'} rounded-md p-6 transition-all duration-300 relative`}
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input 
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                      ref={fileInputRef}
                      accept="image/*,video/*,application/pdf,.doc,.docx"
                    />
                    
                    <div className="flex flex-col items-center justify-center text-center">
                      <FiPaperclip className="w-10 h-10 text-primary/70 mb-3" />
                      <p className="text-gray-300 mb-2">
                        <span className="font-medium">Drag & drop files here</span> or 
                        <button
                          type="button"
                          onClick={handleFileButtonClick}
                          className="text-primary hover:text-primary-light ml-1 focus:outline-none underline"
                        >
                          browse
                        </button>
                      </p>
                      <p className="text-gray-400 text-sm">
                        Support for images, videos, PDFs and docs (Max 5 files, 10MB each)
                      </p>
                    </div>
                    
                    {/* File preview area */}
                    {attachments.length > 0 && (
                      <div className="mt-4 space-y-3">
                        <h4 className="text-sm font-medium text-gray-300 mb-2">Attached Files:</h4>
                        {attachments.map((file, index) => (
                          <motion.div 
                            key={`${file.name}-${index}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center justify-between bg-black/30 backdrop-blur-sm border border-primary/10 rounded-md p-3 group hover:border-primary/30 transition-all duration-300"
                          >
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mr-3">
                                {getFileIcon(file)}
                              </div>
                              <div className="overflow-hidden">
                                <p className="text-white text-sm font-medium truncate max-w-[180px] md:max-w-xs">
                                  {file.name}
                                </p>
                                <p className="text-gray-400 text-xs">
                                  {formatFileSize(file.size)}
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeAttachment(index)}
                              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600/20 transition-colors duration-300"
                              aria-label="Remove file"
                            >
                              <FiX className="w-4 h-4" />
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {submitError && (
                    <div className="bg-red-900/30 backdrop-blur-sm border border-red-800/50 text-red-200 rounded-md p-4">
                      <p>{submitError}</p>
                    </div>
                  )}
                  
                  <motion.button
                    type="submit"
                    className="w-full py-4 px-6 bg-primary text-white font-medium rounded-md hover:shadow-glow-md transition-all duration-300 flex items-center justify-center group relative overflow-hidden"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        Sending <Spinner className="ml-2" />
                      </span>
                    ) : (
                      <>
                        <span className="relative z-10">Send Message</span>
                        <motion.span 
                          className="absolute inset-0 bg-primary-dark opacity-0"
                          whileHover={{ opacity: 1 }}
                        />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-secondary/20 backdrop-blur-lg border border-primary/10 rounded-xl p-8 shadow-[0_0_20px_rgba(var(--primary-rgb),0.05)] hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.15)] transition-all duration-500 relative overflow-hidden transform-gpu"
              style={{
                perspective: '1000px',
                transformStyle: 'preserve-3d',
              }}
              whileHover={{
                rotateY: mousePosition.x * 3,
                rotateX: -mousePosition.y * 3,
              }}
            >
              {/* Animated gradient accent */}
              <div className="absolute -top-24 -left-24 w-40 h-40 bg-gradient-to-br from-accent/10 to-transparent rounded-full filter blur-[30px] opacity-50"></div>
              
              {/* Animated border effects */}
              <motion.div 
                className="absolute inset-0 border border-accent/0 rounded-xl opacity-0 pointer-events-none"
                animate={{
                  boxShadow: [
                    'inset 0 0 0px rgba(var(--accent-rgb), 0)',
                    'inset 0 0 20px rgba(var(--accent-rgb), 0.2)',
                    'inset 0 0 0px rgba(var(--accent-rgb), 0)'
                  ],
                  borderColor: ['rgba(var(--accent-rgb), 0)', 'rgba(var(--accent-rgb), 0.3)', 'rgba(var(--accent-rgb), 0)']
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <div className="flex items-center gap-3 mb-8 relative z-10">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center backdrop-blur-sm border border-primary/20"
                >
                  <FiMail className="text-primary text-2xl" />
                </motion.div>
                <h3 className="text-2xl font-semibold">Contact Details</h3>
              </div>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start p-4 rounded-lg hover:bg-black/30 transition-colors duration-300 group border border-transparent hover:border-primary/20"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center backdrop-blur-sm border border-primary/10 group-hover:border-primary/30 transition-all duration-300">
                      {info.icon}
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-200">{info.label}</h4>
                      <a 
                        href={info.link} 
                        className="text-gray-400 hover:text-primary transition-colors duration-300 group-hover:text-primary/90"
                        target="_blank"
                        rel="noopener noreferrer">
                        {info.value}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center backdrop-blur-sm border border-primary/20 transition-all duration-300">
                    <FiClock className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Working Hours</h3>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex justify-between items-center px-4 py-3 rounded-lg hover:bg-black/30 transition-colors duration-300 border border-transparent hover:border-primary/20">
                    <span className="text-gray-400">Monday - Friday:</span>
                    <span className="text-primary font-medium">9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between items-center px-4 py-3 rounded-lg hover:bg-black/30 transition-colors duration-300 border border-transparent hover:border-primary/20">
                    <span className="text-gray-400">Saturday:</span>
                    <span className="text-primary font-medium">10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between items-center px-4 py-3 rounded-lg hover:bg-black/30 transition-colors duration-300 border border-transparent hover:border-primary/20">
                    <span className="text-gray-400">Sunday:</span>
                    <span className="text-primary font-medium">Closed</span>
                  </li>
                </ul>
              </div>
              
              {/* Response time section */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="px-4 py-4 rounded-lg bg-black/30 backdrop-blur-sm border border-primary/20 flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <FiPlay className="text-primary ml-0.5" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Quick Response Time</h4>
                    <p className="text-gray-400 text-sm">Get a response within 24-48 hours</p>
                  </div>
                </div>
              </div>
              
              {/* Video card - now redirects to featured project */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center backdrop-blur-sm border border-primary/20 transition-all duration-300">
                    <FiPlay className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Featured Project</h3>
                </div>
                
                <div 
                  onClick={handleVideoClick}
                  className="group bg-black/20 rounded-xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all duration-300 cursor-pointer relative"
                >
                  {/* Video thumbnail with play overlay */}
                  <div className="aspect-video bg-gray-900 relative overflow-hidden">
                    <Image
                      src="/images/MAIN JOHAN.jpg"
                      alt="Johan Portfolio Reel"
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover opacity-90 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
                      loading="lazy"
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <span className="w-16 h-16 rounded-full bg-primary/90 text-white flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                        <FiPlay className="w-6 h-6 ml-1" />
                      </span>
                    </div>
                    
                    {/* Title overlay */}
                    <div className="absolute bottom-4 left-4 z-10">
                      <span className="text-white font-medium">View Project</span>
                      <p className="text-white/70 text-sm">Check out my latest work</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Film grain effect overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-5 mix-blend-overlay">
        <div className="absolute inset-0 film-grain"></div>
      </div>
    </section>
  );
}
