/**
 * Text3D Component
 * 
 * A component that creates a 3D text effect using CSS text shadows.
 * The effect is created by stacking multiple shadows to create depth.
 */
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export interface Text3DProps {
  /** Content to display with 3D effect */
  children: ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
  /** Text color (CSS color value) */
  color?: string;
  /** Shadow color (CSS color value) */
  shadowColor?: string;
  /** Number of shadow layers to create depth effect */
  depth?: number;
  /** Whether to animate the text when it enters the viewport */
  animate?: boolean;
}

/**
 * Text3D component with depth effect using CSS text shadows
 */
export const Text3D = ({
  children,
  className = '',
  color = 'var(--light-accent)',
  shadowColor = 'rgba(0, 0, 0, 0.4)',
  depth = 5,
  animate = true
}: Text3DProps) => {
  // Generate text shadow string with multiple layers
  const textShadow = Array.from({ length: depth }).map((_, i) =>
    `${i + 1}px ${i + 1}px 0 ${shadowColor}`
  ).join(', ');

  // Base styles for the 3D text effect
  const textStyles = {
    color,
    textShadow,
    transform: 'translateZ(0)', // Force GPU acceleration
    fontWeight: 'bold' as const
  };

  // If animation is disabled, render without motion
  if (!animate) {
    return (
      <div className={className} style={textStyles}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={className}
      style={textStyles}
    >
      {children}
    </motion.div>
  );
};

export default Text3D; 