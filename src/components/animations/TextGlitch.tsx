/**
 * TextGlitch Component
 * 
 * A component that applies a glitch effect to text at regular intervals.
 * The glitch effect is controlled by CSS animations.
 */
import { useState, useEffect, useCallback } from 'react';
import '../../styles/TextGlitch.css';

export interface TextGlitchProps {
  /** Text to display with glitch effect */
  text: string;
  /** Additional CSS classes to apply */
  className?: string;
  /** Time in milliseconds between glitch animations */
  glitchInterval?: number;
  /** Duration in milliseconds of each glitch animation */
  duration?: number;
  /** Whether the glitch effect should be active */
  active?: boolean;
}

/**
 * TextGlitch component with periodic glitch animation effect
 */
export const TextGlitch = ({
  text,
  className = '',
  glitchInterval = 3000,
  duration = 1000,
  active = true
}: TextGlitchProps) => {
  const [isGlitching, setIsGlitching] = useState(false);

  // Memoize the glitch function to prevent unnecessary re-renders
  const triggerGlitch = useCallback(() => {
    setIsGlitching(true);
    const timeout = setTimeout(() => setIsGlitching(false), duration);
    return () => clearTimeout(timeout);
  }, [duration]);

  useEffect(() => {
    if (!active) return;
    
    // Initial glitch effect
    const initialTimeout = setTimeout(triggerGlitch, 500);
    
    // Set up interval for recurring glitch effect
    const intervalId = setInterval(triggerGlitch, glitchInterval);

    // Clean up on unmount or when dependencies change
    return () => {
      clearTimeout(initialTimeout);
      clearInterval(intervalId);
    };
  }, [glitchInterval, triggerGlitch, active]);

  return (
    <div className={`relative inline-block ${className}`}>
      <span className={`${isGlitching ? 'glitch' : ''}`} data-text={text}>
        {text}
      </span>
    </div>
  );
};

export default TextGlitch; 