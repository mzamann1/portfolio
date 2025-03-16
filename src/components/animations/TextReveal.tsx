/**
 * TextReveal Component
 * 
 * A component that reveals text with a bottom-to-top animation when it enters the viewport.
 * Uses Framer Motion for smooth animations.
 */
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export interface TextRevealProps {
  /** Content to be revealed */
  children: ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
  /** Delay in seconds before the animation starts */
  delay?: number;
  /** Whether to trigger the animation only once */
  once?: boolean;
}

/**
 * TextReveal component with bottom-to-top reveal animation
 */
export const TextReveal = ({ 
  children, 
  className = '', 
  delay = 0,
  once = true 
}: TextRevealProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once }}
      className={className}
    >
      <motion.div
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        whileInView={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{ 
          duration: 0.5, 
          delay: delay + 0.1,
          ease: "easeOut" 
        }}
        viewport={{ once }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default TextReveal; 