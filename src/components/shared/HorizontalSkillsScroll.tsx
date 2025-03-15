import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useAnimationFrame } from 'framer-motion';
import { ISkill } from '../../types';



interface HorizontalSkillsScrollProps {
  skills: ISkill[];
  className?: string;
  speed?: number;
  direction?: 'left' | 'right';
  gap?: number;
}

const HorizontalSkillsScroll = ({
  skills,
  className = '',
  speed = 25,
  direction = 'left',
  gap = 20,
}: HorizontalSkillsScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const xPos = useRef(0);
  
  // Duplicate the skills array to create a seamless loop
  const duplicatedSkills = [...skills, ...skills];
  
  useAnimationFrame(() => {
    if (!scrollerRef.current || !containerRef.current) return;
    
    const scrollerWidth = scrollerRef.current.offsetWidth;
    
    // Move the scroller based on direction and speed
    if (direction === 'left') {
      xPos.current -= speed / 60;
    } else {
      xPos.current += speed / 60;
    }
    
    // Reset position when we've scrolled the width of the original skills set
    if (direction === 'left' && xPos.current <= -scrollerWidth / 2) {
      xPos.current = 0;
    } else if (direction === 'right' && xPos.current >= 0) {
      xPos.current = -scrollerWidth / 2;
    }
    
    // Apply the transform
    scrollerRef.current.style.transform = `translateX(${xPos.current}px)`;
  });

  return (
    <div 
      ref={containerRef}
      className={`overflow-hidden relative ${className}`}
    >
      <div 
        ref={scrollerRef}
        className="flex whitespace-nowrap"
        style={{ gap: `${gap}px` }}
      >
        {duplicatedSkills.map((skill, index) => (
          <motion.div
            key={`${skill.title}-${index}`}
            className="flex items-center justify-center px-6 py-3 rounded-full bg-light-secondary dark:bg-dark-secondary"
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: skill.color || 'var(--light-accent)',
              color: 'white'
            }}
            transition={{ duration: 0.2 }}
          >
            {skill.icon && <span className="mr-2">{skill.icon}</span>}
              <span className="font-medium">{skill.title}</span>
          </motion.div>
        ))}
      </div>
      
      {/* Gradient overlays for smooth fade effect */}
      <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-light-primary dark:from-dark-primary to-transparent z-10"></div>
      <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-light-primary dark:from-dark-primary to-transparent z-10"></div>
    </div>
  );
};

export default HorizontalSkillsScroll; 