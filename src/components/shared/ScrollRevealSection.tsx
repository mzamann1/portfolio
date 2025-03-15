// src/components/ScrollRevealSection.tsx
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    distance?: number;
    duration?: number;
    once?: boolean;
}

const ScrollRevealSection = ({
    children,
    className = '',
    delay = 0,
    direction = 'up',
    distance = 50,
    duration = 0.5,
    once = true
}: ScrollRevealSectionProps) => {
    // Set initial animation values based on direction
    const getInitialValues = () => {
        switch (direction) {
            case 'up':
                return { opacity: 0, y: distance };
            case 'down':
                return { opacity: 0, y: -distance };
            case 'left':
                return { opacity: 0, x: distance };
            case 'right':
                return { opacity: 0, x: -distance };
            case 'none':
                return { opacity: 0 };
            default:
                return { opacity: 0, y: distance };
        }
    };

    // Animation variants
    const variants = {
        hidden: getInitialValues(),
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1.0] // Cubic bezier easing
            }
        }
    };

    return (
        <motion.div
            className={className}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollRevealSection;