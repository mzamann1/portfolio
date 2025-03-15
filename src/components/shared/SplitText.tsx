// src/components/SplitText.tsx
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SplitTextProps {
    children: string;
    className?: string;
}

const SplitText = ({
    children,
    className = '',
}: SplitTextProps) => {
    const words = children.split(' ');

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
        }),
    };

    const child = {
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
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
        >
            {words.map((word, wordIndex) => (
                <motion.span key={wordIndex} className="inline-block mr-1">
                    {Array.from(word).map((char, charIndex) => (
                        <motion.span
                            key={`${char}-${wordIndex}-${charIndex}`}
                            className="inline-block"
                            variants={child}
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.span>
            ))}
        </motion.div>
    );
};

export default SplitText;