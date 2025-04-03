// src/components/Projects.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState, useEffect, useRef, useCallback } from 'react';
import HorizontalSkillsScroll from './shared/HorizontalSkillsScroll';
import { useAppSelector } from '../store/hooks';
import { selectProjects, selectSkills } from '../store/selectors/cvSelectors';
import { groupSkillsByType } from '../uttilities';
import { useTranslation } from 'react-i18next';
import ScrollRevealSection from './shared/ScrollRevealSection';
import Text3D from './shared/Text3D';
import TextGlitch from './shared/TextGlitch';
import MorphingShape from './shared/MorphingShape';
import HoverVideoCard from './shared/HoverVideoCard';

// Floating element animation
interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

const FloatingElement = ({ children, delay = 0, duration = 5, className = "" }: FloatingElementProps) => {
  return (
    <motion.div
      className={className}
      animate={{ 
        y: [0, -10, 0],
        rotate: [0, 1, 0, -1, 0]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "loop"
      }}
    >
      {children}
    </motion.div>
  );
};

const Projects = () => {
    const projects = useAppSelector(selectProjects);
    const groupedSkills = groupSkillsByType(useAppSelector(selectSkills));
    const { t } = useTranslation();
    
    // State for carousel
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right
    const [isAnimating, setIsAnimating] = useState(false);
    const carouselRef = useRef<HTMLDivElement>(null);
    const autoplayRef = useRef<number | null>(null);
    
    // Number of cards to show based on screen size
    const [cardsToShow, setCardsToShow] = useState(3);
    
    // Check screen size on mount and resize
    useEffect(() => {
        const checkScreenSize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setCardsToShow(1);
            } else if (width < 1024) {
                setCardsToShow(2);
            } else {
                setCardsToShow(3);
            }
        };
        
        checkScreenSize();
        
        // Debounce resize event for better performance
        let resizeTimer: number;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(checkScreenSize, 100);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    // Handle navigation with debounce to prevent rapid clicks
    const changeProject = useCallback((newDirection: number) => {
        if (isAnimating) return;
        
        setIsAnimating(true);
        setDirection(newDirection);
        
        if (newDirection === 1) {
            // Move one project to the left (next)
            setCurrentIndex(prev => (prev + 1) % projects.length);
        } else {
            // Move one project to the right (previous)
            setCurrentIndex(prev => (prev - 1 + projects.length) % projects.length);
        }
        
        // Reset autoplay timer when manually changing projects
        if (autoplayRef.current) {
            clearInterval(autoplayRef.current);
        }
        
        // Reset animation lock after animation completes
        setTimeout(() => {
            setIsAnimating(false);
            startAutoplay();
        }, 400);
    }, [isAnimating, projects.length]);
    
    const nextProject = useCallback(() => {
        changeProject(1);
    }, [changeProject]);
    
    const prevProject = useCallback(() => {
        changeProject(-1);
    }, [changeProject]);
    
    // Start autoplay function
    const startAutoplay = useCallback(() => {
        autoplayRef.current = setInterval(() => {
            if (!carouselRef.current || carouselRef.current.matches(':hover') || isAnimating) {
                return;
            }
            changeProject(1);
        }, 5000);
    }, [changeProject, isAnimating]);
    
    // Auto-advance carousel (optional)
    useEffect(() => {
        startAutoplay();
        
        return () => {
            if (autoplayRef.current) {
                clearInterval(autoplayRef.current);
            }
        };
    }, [startAutoplay]);
    
    // Get visible projects for current view - true circular list
    const getVisibleProjects = useCallback(() => {
        const result = [];
        
        // Add projects in order starting from currentIndex
        for (let i = 0; i < cardsToShow; i++) {
            const index = (currentIndex + i) % projects.length;
            result.push({
                project: projects[index],
                originalIndex: index
            });
        }
        
        return result;
    }, [currentIndex, cardsToShow, projects]);

    // Simple slide animation variants
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            transition: {
                duration: 0.3,
                ease: "easeIn"
            }
        })
    };

    // Preload images for smoother transitions
    useEffect(() => {
        projects.forEach(project => {
            if ((project as any).image) {
                const img = new Image();
                img.src = (project as any).image;
            }
        });
    }, [projects]);

    return (
        <section id="projects" className="py-24 relative overflow-hidden">
            <MorphingShape className="top-0 left-0 w-full h-full opacity-20" />

            <div className="container relative z-10">
                <ScrollRevealSection>
                    <div className="text-center mb-16">
                        <Text3D className="text-4xl md:text-5xl font-bold mb-2">
                            <TextGlitch text={t('projects.title')} glitchInterval={5000} />
                        </Text3D>
                        <motion.div
                            className="w-24 h-1 bg-gradient-to-r from-light-accent to-blue-500 dark:from-dark-accent dark:to-blue-400 mx-auto mb-8 rounded-full"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "6rem", opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        />
                        <motion.p
                            className="text-light-textSecondary dark:text-dark-textSecondary max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                        >
                            {t('projects.subtitle')}
                        </motion.p>
                    </div>
                </ScrollRevealSection>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ScrollRevealSection key={index} delay={index * 0.1}>
                            <HoverVideoCard
                                title={project.title}
                                description={project.description}
                                videoSrc={project.videoSrc}
                                posterSrc={project.posterSrc}
                                tags={project.tags}
                                links={{
                                    github: project.github,
                                    live: project.liveUrl
                                }}
                            />
                        </ScrollRevealSection>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <motion.a
                        href="#"
                        className="inline-flex items-center px-6 py-3 rounded-full bg-light-accent dark:bg-dark-accent text-white font-medium hover:bg-opacity-90 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {t('projects.viewAll')}
                    </motion.a>
                </div>
            </div>
        </section>
    );
};

export default Projects;