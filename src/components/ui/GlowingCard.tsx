/**
 * GlowingCard Component
 * 
 * A card component with a glowing effect on hover.
 * Features a radial gradient glow and a shine animation.
 */
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export interface GlowingCardProps {
  /** Content to be displayed inside the card */
  children: ReactNode;
  /** Additional CSS classes to apply to the card */
  className?: string;
  /** Color of the glow effect (CSS color value) */
  glowColor?: string;
}

/**
 * GlowingCard component with hover animations and glow effects
 */
export const GlowingCard = ({
  children,
  className = '',
  glowColor = 'rgba(59, 130, 246, 0.5)'
}: GlowingCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`
        group
        relative overflow-hidden rounded-2xl
        bg-white/10 dark:bg-black/10
        backdrop-blur-xl
        border border-white/20 dark:border-white/10
        shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
        transition-all duration-300
        ${className}
      `}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
        }}
      />

      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

      {/* Content */}
      <div className="relative p-6">
        {children}
      </div>
    </motion.div>
  );
};

export default GlowingCard; 