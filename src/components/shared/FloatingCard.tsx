// src/components/FloatingCard.tsx
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatingCardProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    inView?: boolean;
}

const FloatingCard = ({ children, className = '', delay = 0, inView = true }: FloatingCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -10 }}
            className={`
        relative overflow-hidden rounded-2xl
        bg-white/10 dark:bg-black/10
        backdrop-blur-xl
        border border-white/20 dark:border-white/10
        shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
        hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.47)]
        transition-all duration-300
        ${className}
      `}
        >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-light-accent/10 to-blue-500/10 dark:from-dark-accent/10 dark:to-blue-400/10 animate-gradient" />

            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            {/* Content */}
            <div className="relative p-6">
                {children}
            </div>
        </motion.div>
    );
};

export default FloatingCard;