/**
 * FloatingCard Component
 * 
 * A card component with floating animation on hover and initial reveal animation.
 * Features a gradient background and shimmer effect.
 */
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export interface FloatingCardProps {
  /** Content to be displayed inside the card */
  children: ReactNode;
  /** Additional CSS classes to apply to the card */
  className?: string;
  /** Delay in seconds before the initial animation starts */
  delay?: number;
  /** Whether the card should be animated into view */
  inView?: boolean;
}

/**
 * FloatingCard component with hover and reveal animations
 */
export const FloatingCard = ({ 
  children, 
  className = '', 
  delay = 0, 
  inView = true 
}: FloatingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -10 }}
      className={`
        group
        relative overflow-hidden rounded-2xl
        bg-white/10 dark:bg-black/10
        backdrop-blur-xl
        border border-white/20 dark:border-white/10
        shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
        hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.47)]
        transition-all duration-300
        ${className}
      `}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-light-accent/10 to-blue-500/10 dark:from-dark-accent/10 dark:to-blue-400/10 animate-gradient" />

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

      {/* Content */}
      <div className="relative p-6">
        {children}
      </div>
    </motion.div>
  );
};

export default FloatingCard; 