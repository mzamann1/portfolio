/**
 * SplitText Component
 * 
 * A component that splits text into individual characters and animates them
 * with a staggered reveal effect. Great for headings and important text.
 */
import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

export interface SplitTextProps {
  /** Text content to be split and animated */
  children: string;
  /** Additional CSS classes to apply */
  className?: string;
  /** Whether to split by character (true) or word (false) */
  splitByCharacter?: boolean;
  /** Animation delay multiplier */
  delayMultiplier?: number;
  /** Stagger time between animations in seconds */
  staggerTime?: number;
  /** Whether to trigger the animation only once */
  once?: boolean;
  /** Custom animation variants */
  customVariants?: {
    container?: Variants;
    child?: Variants;
  };
}

/**
 * SplitText component with staggered animation for text elements
 */
export const SplitText = ({
  children,
  className = '',
  splitByCharacter = true,
  delayMultiplier = 1,
  staggerTime = 0.12,
  once = true,
  customVariants
}: SplitTextProps) => {
  // Split the text into words
  const words = children.split(' ');

  // Default container animation variants
  const containerVariants: Variants = customVariants?.container || {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: staggerTime, 
        delayChildren: 0.04 * i * delayMultiplier 
      },
    }),
  };

  // Default child animation variants
  const childVariants: Variants = customVariants?.child || {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {words.map((word, wordIndex) => (
        <motion.span 
          key={`word-${wordIndex}`} 
          className="inline-block mr-1"
          // If not splitting by character, apply animation to whole words
          {...(!splitByCharacter && { variants: childVariants })}
        >
          {splitByCharacter ? (
            // Split by character
            Array.from(word).map((char, charIndex) => (
              <motion.span
                key={`char-${wordIndex}-${charIndex}`}
                className="inline-block"
                variants={childVariants}
              >
                {char}
              </motion.span>
            ))
          ) : (
            // Keep words intact
            word
          )}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default SplitText; 