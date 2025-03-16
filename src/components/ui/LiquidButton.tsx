/**
 * LiquidButton Component
 * 
 * A button component with a liquid effect that follows the mouse cursor.
 * Features an expanding circle that fills the button on hover.
 */
import { motion } from 'framer-motion';
import { useState, useRef, ReactNode, useCallback } from 'react';

export interface LiquidButtonProps {
  /** Content to be displayed inside the button */
  children: ReactNode;
  /** Function to call when the button is clicked */
  onClick?: () => void;
  /** Additional CSS classes to apply to the button */
  className?: string;
  /** Color of the liquid effect (CSS color value) */
  color?: string;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** HTML button type attribute */
  type?: 'button' | 'submit' | 'reset';
  /** Size of the liquid effect when fully expanded */
  expandSize?: number;
}

/**
 * LiquidButton component with mouse-following liquid effect
 */
export const LiquidButton = ({
  children,
  onClick,
  className = '',
  color = 'rgba(100, 255, 218, 0.5)',
  disabled = false,
  type = 'button',
  expandSize = 100
}: LiquidButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const liquidRef = useRef<SVGSVGElement>(null);

  // Handle mouse movement to update the liquid effect position
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || !liquidRef.current || disabled) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    liquidRef.current.style.setProperty('--x', `${x}px`);
    liquidRef.current.style.setProperty('--y', `${y}px`);
  }, [disabled]);

  // Handle mouse enter event
  const handleMouseEnter = useCallback(() => {
    if (!disabled) setIsHovered(true);
  }, [disabled]);

  // Handle mouse leave event
  const handleMouseLeave = useCallback(() => {
    if (!disabled) setIsHovered(false);
  }, [disabled]);

  return (
    <motion.button
      ref={buttonRef}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      whileTap={disabled ? {} : { scale: 0.95 }}
      disabled={disabled}
      type={type}
      className={`
        relative px-8 py-3 rounded-full 
        overflow-hidden 
        text-light-text dark:text-dark-text 
        font-medium 
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-accent dark:focus:ring-dark-accent
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      style={{ background: 'transparent' }}
      aria-disabled={disabled}
    >
      {/* SVG for the liquid effect */}
      <svg
        ref={liquidRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          '--x': '50%',
          '--y': '50%',
        } as React.CSSProperties}
        aria-hidden="true"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
          </filter>
        </defs>
        <g filter="url(#goo)">
          <circle
            cx="var(--x)"
            cy="var(--y)"
            r={isHovered ? expandSize : 0}
            fill={color}
            style={{ transition: 'r 0.5s ease' }}
          />
        </g>
      </svg>
      
      {/* Button content */}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default LiquidButton; 