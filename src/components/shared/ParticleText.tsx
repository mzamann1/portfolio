// src/components/ParticleText.tsx
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ParticleTextProps {
    text: string;
    className?: string;
}

const ParticleText = ({ text, className = '' }: ParticleTextProps) => {
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

    useEffect(() => {
        const newParticles = text.split('').map((_, index) => ({
            id: index,
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
        }));
        setParticles(newParticles);
    }, [text]);

    return (
        <div className={`relative ${className}`}>
            {particles.map((particle) => (
                <motion.span
                    key={particle.id}
                    initial={{ opacity: 0, x: particle.x, y: particle.y }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: particle.id * 0.05,
                        type: "spring",
                        stiffness: 100,
                    }}
                    className="inline-block"
                >
                    {text[particle.id]}
                </motion.span>
            ))}
        </div>
    );
};

export default ParticleText;