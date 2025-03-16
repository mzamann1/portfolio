/**
 * ParallaxCard Component
 * 
 * A card component with a parallax effect that responds to mouse movement.
 * Can display content with an optional background image and 3D depth effect.
 */
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ReactNode, useCallback } from 'react';

export interface ParallaxCardProps {
  /** Content to be displayed inside the card */
  children: ReactNode;
  /** Additional CSS classes to apply to the card */
  className?: string;
  /** Optional background image URL */
  bgImage?: string;
  /** Depth of the parallax effect (higher values create more pronounced effect) */
  depth?: number;
  /** Whether to apply a shine effect on hover */
  shineEffect?: boolean;
}

/**
 * ParallaxCard component with 3D parallax effect on mouse movement
 */
export const ParallaxCard = ({
  children,
  className = '',
  bgImage,
  depth = 30,
  shineEffect = true
}: ParallaxCardProps) => {
  // Motion values for tracking mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transform mouse position to rotation values
  const rotateX = useTransform(y, [-100, 100], [depth, -depth]);
  const rotateY = useTransform(x, [-100, 100], [-depth, depth]);

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

  // Apply background image if provided
  const cardStyle = bgImage ? {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : {};

  return (
    <motion.div
      className={`relative perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="w-full h-full transform-style-3d rounded-2xl overflow-hidden glass-morphism group"
        style={{
          rotateX,
          rotateY,
          transition: 'transform 0.1s ease',
          ...cardStyle
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-light-accent/10 to-blue-500/10 dark:from-dark-accent/10 dark:to-blue-400/10" />

        {/* Content layer */}
        <div className="relative z-10 p-6">
          {children}
        </div>

        {/* Shine effect */}
        {shineEffect && (
          <motion.div
            className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)',
              backgroundSize: '200% 200%',
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default ParallaxCard; 