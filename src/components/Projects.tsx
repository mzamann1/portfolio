// src/components/Projects.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState, useEffect, useRef, useCallback } from 'react';
import HorizontalSkillsScroll from './shared/HorizontalSkillsScroll';
import { useAppSelector } from '../store/hooks';
import { selectProjects, selectSkills } from '../store/selectors/cvSelectors';
import { groupSkillsByType } from '../uttilities';

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
        <section id="projects" className="py-20 bg-light-primary dark:bg-dark-primary">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-light-text dark:text-dark-text">
                        My <span className="text-light-accent dark:text-dark-accent">Projects</span>
                    </h2>
                    <motion.div 
                        className="w-24 h-1 bg-gradient-to-r from-light-accent to-blue-500 dark:from-dark-accent dark:to-blue-400 mx-auto mb-6 rounded-full"
                        initial={{ width: 0, opacity: 0 }}
                        whileInView={{ width: "6rem", opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    ></motion.div>
                    <p className="text-light-textSecondary dark:text-dark-textSecondary max-w-2xl mx-auto">
                        Here are some of my recent projects. Each project is built with a focus on performance,
                        user experience, and clean code.
                    </p>
                </motion.div>

                {/* Technologies I work with - Horizontal Skills Animation */}
                <div className="mb-16">
                    <h3 className="text-xl font-semibold text-center mb-6 text-light-text dark:text-dark-text">
                        Technologies I Work With
                    </h3>

                    <div className="space-y-8">
                        {Object.entries(groupedSkills).map(([category, skills], index) => (
                            <div key={category}>
                                <p className="text-sm uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary mb-3 text-center">
                                    {category.charAt(0).toUpperCase() + category.slice(1)} {/* Capitalizing category name */}
                                </p>
                                <HorizontalSkillsScroll
                                    skills={[...skills]}
                                    className="h-14"
                                    speed={40 + index * 10} // Varying speed slightly
                                    direction={index % 2 === 0 ? "left" : "right"} // Alternating direction
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Projects Carousel */}
                <div className="relative mb-16" ref={carouselRef}>
                    {/* Project counter */}
                    <div className="absolute top-0 right-0 bg-light-secondary/80 dark:bg-dark-secondary/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium z-10">
                        {currentIndex + 1} / {projects.length}
                    </div>
                    
                    {/* Carousel Navigation Buttons */}
                    <div className="absolute inset-y-0 left-0 z-10 flex items-center">
                        <FloatingElement duration={4} delay={0.2}>
                            <motion.button
                                onClick={prevProject}
                                disabled={isAnimating}
                                className={`bg-light-secondary/80 dark:bg-dark-secondary/80 backdrop-blur-sm text-light-text dark:text-dark-text p-3 rounded-full -ml-4 shadow-lg hover:bg-light-accent hover:text-white dark:hover:bg-dark-accent transition-all duration-300 ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
                                whileHover={{ scale: 1.1, x: 5 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Previous project"
                            >
                                <FaChevronLeft className="text-xl" />
                            </motion.button>
                        </FloatingElement>
                    </div>
                    
                    <div className="absolute inset-y-0 right-0 z-10 flex items-center">
                        <FloatingElement duration={4} delay={0.4}>
                            <motion.button
                                onClick={nextProject}
                                disabled={isAnimating}
                                className={`bg-light-secondary/80 dark:bg-dark-secondary/80 backdrop-blur-sm text-light-text dark:text-dark-text p-3 rounded-full -mr-4 shadow-lg hover:bg-light-accent hover:text-white dark:hover:bg-dark-accent transition-all duration-300 ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
                                whileHover={{ scale: 1.1, x: -5 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label="Next project"
                            >
                                <FaChevronRight className="text-xl" />
                            </motion.button>
                        </FloatingElement>
                    </div>
                    
                    {/* Carousel Content */}
                    <div className="overflow-hidden px-10 min-h-[500px]">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div 
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className={`grid ${
                                    cardsToShow === 1 ? 'grid-cols-1' : 
                                    cardsToShow === 2 ? 'grid-cols-2' : 
                                    'grid-cols-3'
                                } gap-8`}
                            >
                                {getVisibleProjects().map(({ project, originalIndex }, index) => (
                                    <div
                                        key={`${originalIndex}-${project.title}`}
                                        className="bg-light-secondary dark:bg-dark-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                                    >
                                        <div className="h-48 bg-gray-300 dark:bg-gray-700 relative overflow-hidden">
                                            {(project as any).image ? (
                                                <img
                                                    src={(project as any).image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                                    loading="eager"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-light-textSecondary dark:text-dark-textSecondary bg-gradient-to-br from-light-secondary to-light-accent/10 dark:from-dark-secondary dark:to-dark-accent/10">
                                                    <div className="text-5xl font-bold animate-pulse">
                                                        {project.title.charAt(0)}
                                                    </div>
                                                </div>
                                            )}
                                            
                                            {/* Project number badge */}
                                            <div className="absolute top-2 right-2 bg-light-accent/80 dark:bg-dark-accent/80 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                {originalIndex + 1}
                                            </div>
                                            
                                            {/* Overlay gradient on hover */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                                        </div>

                                        <div className="p-6">
                                            <h3 className="text-xl font-bold mb-2 text-light-text dark:text-dark-text">
                                                {project.title}
                                            </h3>
                                            <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4 line-clamp-3">
                                                {project.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {project.tags.slice(0, 3).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-3 py-1 bg-light-accent/10 dark:bg-dark-accent/20 rounded-full text-xs text-light-accent dark:text-dark-accent hover:bg-light-accent/20 dark:hover:bg-dark-accent/30 transition-colors duration-300"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                                {project.tags.length > 3 && (
                                                    <span 
                                                        className="px-3 py-1 bg-light-secondary dark:bg-dark-secondary rounded-full text-xs text-light-textSecondary dark:text-dark-textSecondary border border-light-border dark:border-dark-border hover:bg-light-secondary/80 dark:hover:bg-dark-secondary/80 transition-colors duration-300"
                                                    >
                                                        +{project.tags.length - 3} more
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex space-x-4">
                                                {project.links.github && (
                                                    <a
                                                        href={project.links.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-light-textSecondary dark:text-dark-textSecondary hover:text-light-accent dark:hover:text-dark-accent transition-colors duration-300 transform hover:scale-110 hover:-translate-y-1 inline-block"
                                                        aria-label="View GitHub Repository"
                                                    >
                                                        <FaGithub className="text-xl" />
                                                    </a>
                                                )}
                                                {project.links.live && (
                                                    <a
                                                        href={project.links.live}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-light-textSecondary dark:text-dark-textSecondary hover:text-light-accent dark:hover:text-dark-accent transition-colors duration-300 transform hover:scale-110 hover:-translate-y-1 inline-block"
                                                        aria-label="View Live Demo"
                                                    >
                                                        <FaExternalLinkAlt className="text-xl" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    
                    {/* Carousel Indicators */}
                    <div className="flex justify-center mt-8 space-x-2 flex-wrap max-w-md mx-auto">
                        {projects.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => !isAnimating && setCurrentIndex(index)}
                                disabled={isAnimating}
                                className={`h-2 rounded-full transition-all duration-300 my-1 ${
                                    index === currentIndex 
                                        ? 'bg-light-accent dark:bg-dark-accent w-8' 
                                        : 'bg-light-secondary dark:bg-dark-secondary w-2 hover:bg-light-accent/30 dark:hover:bg-dark-accent/30'
                                } ${isAnimating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                aria-label={`Go to project ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;