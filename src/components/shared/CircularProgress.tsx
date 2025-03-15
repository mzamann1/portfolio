// src/components/CircularProgress.tsx
import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';

const CircularProgress = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const circumference = 2 * Math.PI * 45; // 45 is the radius
    const strokeDashoffset = circumference * (1 - scrollYProgress.get());

    return (
        <motion.div
            ref={containerRef}
            className="fixed bottom-8 right-8 z-50"
        >
            <svg width="100" height="100" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="4"
                    fill="none"
                />
                {/* Progress circle */}
                <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="var(--accent-color)"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                />
            </svg>
        </motion.div>
    );
};

export default CircularProgress;