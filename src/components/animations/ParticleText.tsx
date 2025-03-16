/**
 * ParticleText Component
 * 
 * A component that animates text by scattering characters as particles
 * and then bringing them together to form the complete text.
 */
import { motion } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';

export interface Particle {
  /** Unique identifier for the particle */
  id: number;
  /** Initial X position offset */
  x: number;
  /** Initial Y position offset */
  y: number;
}

export interface ParticleTextProps {
  /** Text to be displayed with particle effect */
  text: string;
  /** Additional CSS classes to apply */
  className?: string;
  /** Maximum initial scatter distance in pixels */
  scatterDistance?: number;
  /** Duration of the animation in seconds */
  duration?: number;
  /** Delay between each character's animation in seconds */
  staggerDelay?: number;
  /** Spring stiffness for the animation */
  stiffness?: number;
  /** Whether to trigger the animation on mount */
  animateOnMount?: boolean;
  /** Whether to trigger the animation when text changes */
  animateOnTextChange?: boolean;
}

/**
 * ParticleText component with particle scatter and gather animation
 */
export const ParticleText = ({ 
  text, 
  className = '',
  scatterDistance = 50,
  duration = 0.5,
  staggerDelay = 0.05,
  stiffness = 100,
  animateOnMount = true,
  animateOnTextChange = true
}: ParticleTextProps) => {
  // State to store particle information
  const [particles, setParticles] = useState<Particle[]>([]);
  
  // Generate random particles for each character
  const generateParticles = useCallback(() => {
    return text.split('').map((_, index) => ({
      id: index,
      x: (Math.random() * 2 - 1) * scatterDistance, // Random value between -scatterDistance and scatterDistance
      y: (Math.random() * 2 - 1) * scatterDistance, // Random value between -scatterDistance and scatterDistance
    }));
  }, [text, scatterDistance]);

  // Initialize particles on mount or when text changes
  useEffect(() => {
    if (animateOnMount || (animateOnTextChange && particles.length > 0)) {
      setParticles(generateParticles());
    } else if (particles.length === 0) {
      // Initialize with particles already in place (no animation)
      setParticles(text.split('').map((_, index) => ({
        id: index,
        x: 0,
        y: 0,
      })));
    }
  }, [text, animateOnMount, animateOnTextChange, generateParticles, particles.length]);

  return (
    <div className={`relative inline-block ${className}`}>
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          initial={{ opacity: 0, x: particle.x, y: particle.y }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{
            duration,
            delay: particle.id * staggerDelay,
            type: "spring",
            stiffness,
          }}
          className="inline-block"
        >
          {text[particle.id] || ''}
        </motion.span>
      ))}
    </div>
  );
};

export default ParticleText; 