// src/components/TypewriterText.tsx
import { useState, useEffect } from 'react';

interface TypewriterTextProps {
    texts: string[];
    className?: string;
    typingSpeed?: number;
    deletingSpeed?: number;
    delayBetweenTexts?: number;
}

const TypewriterText = ({
    texts,
    className = '',
    typingSpeed = 100,
    deletingSpeed = 50,
    delayBetweenTexts = 1500
}: TypewriterTextProps) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
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
                    setCurrentTextIndex((currentTextIndex + 1) % texts.length);
                }
            }
        }, isPaused ? delayBetweenTexts : isDeleting ? deletingSpeed : typingSpeed);

        return () => clearTimeout(timeout);
    }, [currentText, currentTextIndex, isDeleting, isPaused, texts, typingSpeed, deletingSpeed, delayBetweenTexts]);

    return (
        <span className={className}>
            {currentText}
            <span className="animate-blink">|</span>
        </span>
    );
};

export default TypewriterText;