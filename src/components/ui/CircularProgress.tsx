/**
 * CircularProgress Component
 * 
 * A circular progress indicator that can be used to show scroll progress
 * or any other numerical progress value.
 */
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export interface CircularProgressProps {
  /** The progress value (0-1) if not using scroll progress */
  progress?: number;
  /** Whether to use scroll progress instead of a fixed value */
  useScrollProgress?: boolean;
  /** Size of the circle in pixels */
  size?: number;
  /** Width of the progress stroke */
  strokeWidth?: number;
  /** Color of the progress indicator */
  color?: string;
  /** Color of the background circle */
  backgroundColor?: string;
  /** Additional CSS classes to apply */
  className?: string;
  /** Whether to show the progress as a percentage in the center */
  showPercentage?: boolean;
}

/**
 * CircularProgress component for displaying progress in a circular format
 */
export const CircularProgress = ({
  progress = 0,
  useScrollProgress = true,
  size = 100,
  strokeWidth = 4,
  color = 'var(--light-accent)',
  backgroundColor = 'rgba(255, 255, 255, 0.1)',
  className = '',
  showPercentage = false
}: CircularProgressProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use scroll progress if enabled, otherwise use the provided progress value
  const { scrollYProgress } = useScroll({
    target: useScrollProgress ? containerRef : undefined,
    offset: ["start end", "end start"]
  });
  
  // Calculate dimensions
  const radius = (size / 2) - (strokeWidth / 2);
  const circumference = 2 * Math.PI * radius;
  
  // Calculate the stroke dash offset based on progress
  const getStrokeDashoffset = (progressValue: number): number => {
    return circumference * (1 - progressValue);
  };

  // Transform scroll progress to stroke dash offset
  const strokeDashoffset = useScrollProgress 
    ? useTransform(scrollYProgress, (value: number) => getStrokeDashoffset(value))
    : getStrokeDashoffset(progress);

  // Transform scroll progress to percentage text
  const percentageText = useScrollProgress
    ? useTransform(scrollYProgress, (value: number) => `${Math.round(value * 100)}%`)
    : `${Math.round(progress * 100)}%`;

  return (
    <motion.div
      ref={containerRef}
      className={`relative ${className}`}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      
      {/* Percentage text */}
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span className="text-sm font-medium">
            {percentageText}
          </motion.span>
        </div>
      )}
    </motion.div>
  );
};

export default CircularProgress; 