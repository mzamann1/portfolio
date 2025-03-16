/**
 * MagneticButton Component
 * 
 * A button component with a magnetic effect that attracts the button toward the mouse cursor.
 * Features a gradient background on hover and spring physics for smooth animations.
 */
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ReactNode, useCallback } from 'react';

export interface MagneticButtonProps {
  /** Content to be displayed inside the button */
  children: ReactNode;
  /** Additional CSS classes to apply to the button */
  className?: string;
  /** Function to call when the button is clicked */
  onClick?: () => void;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** HTML button type attribute */
  type?: 'button' | 'submit' | 'reset';
  /** Strength of the magnetic effect (higher values create stronger pull) */
  strength?: number;
  /** Spring configuration for the magnetic animation */
  springConfig?: {
    damping: number;
    stiffness: number;
  };
}

/**
 * MagneticButton component with mouse attraction effect
 */
export const MagneticButton = ({ 
  children, 
  className = '', 
  onClick,
  disabled = false,
  type = 'button',
  strength = 1,
  springConfig = { damping: 15, stiffness: 300 }
}: MagneticButtonProps) => {
  // Motion values for tracking mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Apply spring physics for smoother animation
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  // Handle mouse movement over the button
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Apply strength factor to control the magnetic pull
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  }, [x, y, disabled, strength]);

  // Reset position when mouse leaves the button
  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.button
      style={{
        x: springX,
        y: springY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      type={type}
      className={`
        group
        relative px-6 py-3 rounded-full
        bg-light-accent dark:bg-dark-accent
        text-white font-medium
        shadow-lg hover:shadow-xl
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-accent dark:focus:ring-dark-accent
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      aria-disabled={disabled}
    >
      {/* Button content */}
      <span className="relative z-10">{children}</span>
      
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-light-accent to-blue-500 dark:from-dark-accent dark:to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.button>
  );
};

export default MagneticButton; 