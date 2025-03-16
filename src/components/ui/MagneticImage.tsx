/**
 * MagneticImage Component
 * 
 * A component that creates a magnetic effect, attracting the content toward the mouse cursor.
 * Uses Framer Motion for smooth animations and spring physics.
 */
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ReactNode, useCallback } from 'react';

export interface MagneticImageProps {
  /** Content to be displayed with the magnetic effect */
  children: ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
  /** Strength of the magnetic effect (higher values create stronger pull) */
  strength?: number;
  /** Spring configuration for the magnetic animation */
  springConfig?: {
    damping: number;
    stiffness: number;
  };
}

/**
 * MagneticImage component with mouse attraction effect
 */
export const MagneticImage = ({ 
  children, 
  className = '',
  strength = 1,
  springConfig = { damping: 15, stiffness: 300 }
}: MagneticImageProps) => {
  // Motion values for tracking mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Apply spring physics for smoother animation
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Handle mouse movement over the component
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Apply strength factor to control the magnetic pull
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  }, [x, y, strength]);

  // Reset position when mouse leaves the component
  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default MagneticImage; 