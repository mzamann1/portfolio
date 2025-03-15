// src/components/TiltCard.tsx
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ReactNode } from 'react';

interface TiltCardProps {
    children: ReactNode;
    className?: string;
}

const TiltCard = ({ children, className = '' }: TiltCardProps) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [30, -30]);
    const rotateY = useTransform(x, [-100, 100], [-30, 30]);

    const springConfig = { damping: 15, stiffness: 300 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
        <motion.div
            style={{
                rotateX: springRotateX,
                rotateY: springRotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`
        relative overflow-hidden rounded-2xl
        bg-white/10 dark:bg-black/10
        backdrop-blur-xl
        border border-white/20 dark:border-white/10
        shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
        hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.47)]
        transition-all duration-300
        perspective-1000
        ${className}
      `}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-light-accent/10 to-blue-500/10 dark:from-dark-accent/10 dark:to-blue-400/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="relative p-6 transform-gpu">
                {children}
            </div>
        </motion.div>
    );
};

export default TiltCard;