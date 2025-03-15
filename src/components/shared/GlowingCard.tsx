// src/components/GlowingCard.tsx
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowingCardProps {
    children: ReactNode;
    className?: string;
    glowColor?: string;
}

const GlowingCard = ({
    children,
    className = '',
    glowColor = 'rgba(59, 130, 246, 0.5)'
}: GlowingCardProps) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={`
        relative overflow-hidden rounded-2xl
        bg-white/10 dark:bg-black/10
        backdrop-blur-xl
        border border-white/20 dark:border-white/10
        shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
        transition-all duration-300
        ${className}
      `}
        >
            {/* Glow effect */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
                }}
            />

            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            {/* Content */}
            <div className="relative p-6">
                {children}
            </div>
        </motion.div>
    );
};

export default GlowingCard;