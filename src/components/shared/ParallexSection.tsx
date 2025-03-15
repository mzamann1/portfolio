// src/components/ParallaxSection.tsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ReactNode } from 'react';

interface ParallaxSectionProps {
    children: ReactNode;
    className?: string;
}

const ParallaxSection = ({ children, className = '' }: ParallaxSectionProps) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

    return (
        <motion.div
            ref={ref}
            style={{ y, opacity }}
            className={`relative ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default ParallaxSection;