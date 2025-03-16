/**
 * TiltCard Component
 * 
 * A card component that tilts in response to mouse movement, creating a 3D effect.
 * Uses Framer Motion for smooth animations and spring physics.
 */
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ReactNode, useCallback } from 'react';

export interface TiltCardProps {
  /** Content to be displayed inside the card */
  children: ReactNode;
  /** Additional CSS classes to apply to the card */
  className?: string;
  /** Maximum rotation angle in degrees */
  maxRotation?: number;
  /** Spring configuration for the tilt animation */
  springConfig?: {
    damping: number;
    stiffness: number;
  };
}

/**
 * TiltCard component with 3D tilt effect on mouse movement
 */
export const TiltCard = ({ 
  children, 
  className = '',
  maxRotation = 30,
  springConfig = { damping: 15, stiffness: 300 }
}: TiltCardProps) => {
  // Motion values for tracking mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transform mouse position to rotation values
  const rotateX = useTransform(y, [-100, 100], [maxRotation, -maxRotation]);
  const rotateY = useTransform(x, [-100, 100], [-maxRotation, maxRotation]);

  // Apply spring physics to the rotation for smoother animation
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  // Handle mouse movement over the card
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }, [x, y]);

  // Reset rotation when mouse leaves the card
  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        group
        relative overflow-hidden rounded-2xl
        bg-white/10 dark:bg-black/10
        backdrop-blur-xl
        border border-white/20 dark:border-white/10
        shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
        hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.47)]
        transition-all duration-300
        perspective-1000
        ${className}
      `}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-light-accent/10 to-blue-500/10 dark:from-dark-accent/10 dark:to-blue-400/10" />
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      
      {/* Content container with GPU acceleration */}
      <div className="relative p-6 transform-gpu">
        {children}
      </div>
    </motion.div>
  );
};

export default TiltCard; 