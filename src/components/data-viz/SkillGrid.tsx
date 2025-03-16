/**
 * SkillGrid Component
 * 
 * A grid layout for displaying multiple skill items.
 * Organizes skills in a responsive grid with customizable columns.
 */
import { motion } from 'framer-motion';
import { SkillItem } from './SkillItem';
import { ISkill } from '../../types';



export interface SkillGridProps {
  /** Array of skills to display */
  skills: ISkill[];
  /** Number of columns on small screens */
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  /** Size of each skill icon */
  iconSize?: number;
  /** Additional CSS classes to apply */
  className?: string;
  /** Whether to animate the grid items */
  animated?: boolean;
  /** Function to call when a skill is clicked */
  onSkillClick?: (skill: ISkill) => void;
}

/**
 * SkillGrid component for displaying multiple skills in a grid layout
 */
export const SkillGrid = ({
  skills,
  columns = {
    sm: 3,
    md: 4,
    lg: 5,
    xl: 6
  },
  iconSize = 64,
  className = '',
  animated = true,
  onSkillClick
}: SkillGridProps) => {
  // Calculate grid columns based on responsive breakpoints
  const gridCols = `grid-cols-2 sm:grid-cols-${columns.sm} md:grid-cols-${columns.md} lg:grid-cols-${columns.lg} xl:grid-cols-${columns.xl}`;

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      className={`grid ${gridCols} gap-6 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {skills.map((skill, index) => (
        <SkillItem
          key={`${skill.title}-${index}`}
          icon={skill.icon}
          title={skill.title}
          color={skill.color}
          size={iconSize}
          animated={animated}
          onClick={onSkillClick ? () => onSkillClick(skill) : undefined}
        />
      ))}
    </motion.div>
  );
};

export default SkillGrid; 