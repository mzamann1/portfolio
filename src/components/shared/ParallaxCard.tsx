// src/components/shared/ParallaxCard.tsx
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ReactNode } from 'react';

interface ParallaxCardProps {
    children: ReactNode;
    className?: string;
    bgImage?: string;
    depth?: number;
}

const ParallaxCard = ({
    children,
    className = '',
    bgImage,
    depth = 30
}: ParallaxCardProps) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [depth, -depth]);
    const rotateY = useTransform(x, [-100, 100], [-depth, depth]);

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

    const cardStyle = bgImage ? {
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    } : {};

    return (
        <motion.div
            className={`relative perspective-1000 ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="w-full h-full transform-style-3d rounded-2xl overflow-hidden glass-morphism"
                style={{
                    rotateX,
                    rotateY,
                    transition: 'transform 0.1s ease',
                    ...cardStyle
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-light-accent/10 to-blue-500/10 dark:from-dark-accent/10 dark:to-blue-400/10" />

                {/* Content layers */}
                <div className="relative z-10 p-6">
                    {children}
                </div>

                {/* Shine effect */}
                <motion.div
                    className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                        background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.3) 50%, transparent 70%)',
                        backgroundSize: '200% 200%',
                    }}
                />
            </motion.div>
        </motion.div>
    );
};

export default ParallaxCard;