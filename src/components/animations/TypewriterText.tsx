/**
 * TypewriterText Component
 * 
 * A component that creates a typewriter effect, cycling through an array of texts.
 * Features typing, pausing, and deleting animations with configurable speeds.
 */
import { useState, useEffect, useCallback } from 'react';

export interface TypewriterTextProps {
  /** Array of strings to cycle through with the typewriter effect */
  texts: string[];
  /** Additional CSS classes to apply */
  className?: string;
  /** Speed of typing in milliseconds per character */
  typingSpeed?: number;
  /** Speed of deleting in milliseconds per character */
  deletingSpeed?: number;
  /** Delay in milliseconds between finishing typing and starting to delete */
  delayBetweenTexts?: number;
  /** Whether to loop through the texts indefinitely */
  loop?: boolean;
  /** Custom cursor character (default is '|') */
  cursor?: string;
  /** Whether to show the cursor */
  showCursor?: boolean;
}

/**
 * TypewriterText component with typing and deleting animations
 */
export const TypewriterText = ({
  texts,
  className = '',
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenTexts = 1500,
  loop = true,
  cursor = '|',
  showCursor = true
}: TypewriterTextProps) => {
  // State for tracking the current text and animation state
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Handle the typewriter animation logic
  const typewriterEffect = useCallback(() => {
    // If no texts are provided, return early
    if (!texts.length) return;

    // If paused, wait before starting to delete
    if (isPaused) {
      setIsPaused(false);
      setIsDeleting(true);
      return;
    }

    // Handle typing and deleting
    if (!isDeleting) {
      // Typing
      const fullText = texts[currentTextIndex];
      if (currentText.length < fullText.length) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      } else {
        // Finished typing, pause before deleting
        setIsPaused(true);
      }
    } else {
      // Deleting
      if (currentText.length > 0) {
        setCurrentText(currentText.substring(0, currentText.length - 1));
      } else {
        // Finished deleting, move to next text
        setIsDeleting(false);
        
        // If looping is enabled or we haven't reached the end yet
        if (loop || currentTextIndex < texts.length - 1) {
          setCurrentTextIndex((currentTextIndex + 1) % texts.length);
        }
      }
    }
  }, [currentText, currentTextIndex, isDeleting, isPaused, texts, loop]);

  // Set up the animation interval
  useEffect(() => {
    const timeout = setTimeout(
      typewriterEffect,
      isPaused ? delayBetweenTexts : isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    currentText, 
    currentTextIndex, 
    isDeleting, 
    isPaused, 
    typingSpeed, 
    deletingSpeed, 
    delayBetweenTexts, 
    typewriterEffect
  ]);

  return (
    <span className={className}>
      {currentText}
      {showCursor && <span className="animate-blink">{cursor}</span>}
    </span>
  );
};

export default TypewriterText; 