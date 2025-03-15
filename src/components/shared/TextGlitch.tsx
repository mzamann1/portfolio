// src/components/TextGlitch.tsx
import { useState, useEffect } from 'react';
import '../../styles/TextGlitch.css'; // We'll create this file later

interface TextGlitchProps {
    text: string;
    className?: string;
    glitchInterval?: number;
    duration?: number;
}

const TextGlitch = ({
    text,
    className = '',
    glitchInterval = 3000,
    duration = 1000
}: TextGlitchProps) => {
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), duration);
        }, glitchInterval);

        return () => clearInterval(intervalId);
    }, [glitchInterval, duration]);

    return (
        <div className={`relative inline-block ${className}`}>
            <span className={`${isGlitching ? 'glitch' : ''}`} data-text={text}>
                {text}
            </span>
        </div>
    );
};

export default TextGlitch;