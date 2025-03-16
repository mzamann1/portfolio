/**
 * SkillItem Component
 * 
 * A circular skill icon with text label outside the circle.
 * Designed to display technology skills with their respective icons.
 */
import { motion } from 'framer-motion';
import { JSX } from 'react';

export interface SkillItemProps {
  /** Icon to display inside the circle */
  icon?: JSX.Element;
  /** Name of the skill to display below the circle */
  title: string;
  /** Color for the icon (CSS color value) */
  color?: string;
  /** Size of the circle in pixels */
  size?: number;
  /** Additional CSS classes to apply */
  className?: string;
  /** Whether to apply a hover animation effect */
  animated?: boolean;
  /** Optional click handler */
  onClick?: () => void;
}

/**
 * SkillItem component with circular icon and text label
 */
export const SkillItem = ({
  icon,
  title,
  color = 'currentColor',
  size = 64,
  className = '',
  animated = true,
  onClick
}: SkillItemProps) => {
  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 15 
      }
    },
    hover: animated ? {
      y: -5,
      scale: 1.05,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    } : {}
  };

  return (
    <motion.div
      className={`flex flex-col items-center ${className}`}
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true }}
      onClick={onClick}
    >
      {/* Circular icon container */}
      <motion.div
        className="rounded-full flex items-center justify-center mb-3 overflow-hidden bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-lg"
        style={{ 
          width: size, 
          height: size,
          color
        }}
      >
        {/* Icon with subtle floating animation */}
        <motion.div
          animate={animated ? {
            y: [0, -3, 0],
            scale: [1, 1.05, 1],
          } : undefined}
          transition={animated ? {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          } : undefined}
          className="text-3xl"
        >
          {icon}
        </motion.div>
      </motion.div>

      {/* Skill name */}
      <span className="text-sm text-center text-light-text dark:text-dark-text font-medium">
        {title}
      </span>
    </motion.div>
  );
};

export default SkillItem; 