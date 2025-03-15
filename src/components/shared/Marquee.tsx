// src/components/Marquee.tsx
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MarqueeProps {
    children: ReactNode;
    direction?: 'left' | 'right';
    speed?: number;
    pauseOnHover?: boolean;
    className?: string;
}

const Marquee = ({
    children,
    direction = 'left',
    speed = 20,
    pauseOnHover = true,
    className = ''
}: MarqueeProps) => {
    const marqueeVariants = {
        animate: {
            x: direction === 'left' ? [0, -1000] : [-1000, 0],
            transition: {
                x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 1000 / speed,
                    ease: "linear",
                },
            },
        },
    };

    return (
        <div
            className={`overflow-hidden whitespace-nowrap ${className}`}
            style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' }}
        >
            <motion.div
                className="inline-block"
                variants={marqueeVariants}
                animate="animate"
                whileHover={pauseOnHover ? { animationPlayState: 'paused' } : undefined}
            >
                {children}
                {children}
            </motion.div>
        </div>
    );
};

export default Marquee;