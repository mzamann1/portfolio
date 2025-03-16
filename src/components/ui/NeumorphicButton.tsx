/**
 * NeumorphicButton Component
 * 
 * A button component with a neumorphic design style, featuring soft shadows
 * that create a subtle 3D effect. Includes hover and active states.
 */
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export interface NeumorphicButtonProps {
  /** Content to be displayed inside the button */
  children: ReactNode;
  /** Function to call when the button is clicked */
  onClick?: () => void;
  /** Additional CSS classes to apply to the button */
  className?: string;
  /** Button style variant */
  variant?: 'primary' | 'secondary' | 'accent';
  /** Whether the button is disabled */
  disabled?: boolean;
  /** HTML button type attribute */
  type?: 'button' | 'submit' | 'reset';
}

/**
 * NeumorphicButton component with soft shadow 3D effect
 */
export const NeumorphicButton = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  disabled = false,
  type = 'button'
}: NeumorphicButtonProps) => {
  // Base classes for all button variants
  const baseClasses = "relative px-6 py-3 rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

  // Classes specific to each variant
  const variantClasses = {
    primary: "bg-light-primary dark:bg-dark-primary text-light-accent dark:text-dark-accent focus:ring-light-accent dark:focus:ring-dark-accent",
    secondary: "bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-dark-text focus:ring-light-secondary dark:focus:ring-dark-secondary",
    accent: "bg-light-accent dark:bg-dark-accent text-white focus:ring-light-accent dark:focus:ring-dark-accent"
  };

  // Shadow classes for the neumorphic effect
  const shadowClasses = {
    primary: "shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.1)] dark:shadow-[6px_6px_12px_rgba(0,0,0,0.2),-6px_-6px_12px_rgba(255,255,255,0.05)]",
    secondary: "shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.1)] dark:shadow-[6px_6px_12px_rgba(0,0,0,0.2),-6px_-6px_12px_rgba(255,255,255,0.05)]",
    accent: "shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.1)] dark:shadow-[6px_6px_12px_rgba(0,0,0,0.2),-6px_-6px_12px_rgba(255,255,255,0.05)]"
  };

  // Active state shadow classes (pressed effect)
  const activeClasses = {
    primary: "active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.1)] dark:active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.05)]",
    secondary: "active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.1)] dark:active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.05)]",
    accent: "active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.1)] dark:active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.05)]"
  };

  // Disabled state classes
  const disabledClasses = "opacity-50 cursor-not-allowed";

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      type={type}
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${shadowClasses[variant]} 
        ${activeClasses[variant]} 
        ${disabled ? disabledClasses : ''}
        ${className}
      `}
      aria-disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default NeumorphicButton; 