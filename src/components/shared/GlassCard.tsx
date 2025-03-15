// src/components/GlassCard.tsx
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

const GlassCard = ({ children, className = '', hoverEffect = true }: GlassCardProps) => {
    return (
        <motion.div
            className={`
        relative p-6 rounded-xl 
        bg-light-secondary/80 dark:bg-dark-secondary/80 
        backdrop-blur-md border border-white/10
        shadow-lg ${className}
      `}
            whileHover={hoverEffect ? { 
                y: -10, 
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            } : {}}
            transition={{ duration: 0.2 }}
        >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-light-accent/5 to-blue-500/5 dark:from-dark-accent/5 dark:to-blue-400/5" />

           
            {/* Content */}
            <div className="relative p-6">
                {children}
            </div>
        </motion.div>
    );
};

export default GlassCard;