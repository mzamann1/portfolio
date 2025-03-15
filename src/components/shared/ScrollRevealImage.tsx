// src/components/ScrollRevealImage.tsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ScrollRevealImageProps {
    src: string;
    alt: string;
    className?: string;
}

const ScrollRevealImage = ({ src, alt, className = '' }: ScrollRevealImageProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

    return (
        <motion.div
            ref={containerRef}
            className={`relative overflow-hidden ${className}`}
            style={{ opacity, y }}
        >
            <motion.div
                className="w-full h-full"
                style={{ scale }}
            >
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover"
                />
            </motion.div>
        </motion.div>
    );
};

export default ScrollRevealImage;