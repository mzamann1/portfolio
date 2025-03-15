// src/components/MagneticButton.tsx
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ReactNode } from 'react';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

const MagneticButton = ({ children, className = '', onClick }: MagneticButtonProps) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 300 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            style={{
                x: springX,
                y: springY,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={`
        relative px-6 py-3 rounded-full
        bg-light-accent dark:bg-dark-accent
        text-white font-medium
        shadow-lg hover:shadow-xl
        transition-all duration-300
        ${className}
      `}
        >
            <span className="relative z-10">{children}</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-light-accent to-blue-500 dark:from-dark-accent dark:to-blue-400 opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
    );
};

export default MagneticButton;