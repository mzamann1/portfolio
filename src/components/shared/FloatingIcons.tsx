// src/components/FloatingIcons.tsx
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatingIcon {
    icon: ReactNode;
    x: number; // 0-100 percentage
    y: number; // 0-100 percentage
    size: number;
    delay: number;
}

interface FloatingIconsProps {
    icons: FloatingIcon[];
    className?: string;
}

const FloatingIcons = ({ icons, className = '' }: FloatingIconsProps) => {
    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
            {icons.map((icon, index) => (
                <motion.div
                    key={index}
                    className="absolute text-light-accent/30 dark:text-dark-accent/30"
                    style={{
                        left: `${icon.x}%`,
                        top: `${icon.y}%`,
                        fontSize: `${icon.size}rem`,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: 0.7,
                        y: 0,
                        x: [0, 10, -10, 0],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        opacity: { duration: 0.5, delay: icon.delay },
                        y: { duration: 0.5, delay: icon.delay },
                        x: {
                            repeat: Infinity,
                            duration: 4 + Math.random() * 2,
                            ease: "easeInOut",
                            delay: icon.delay
                        },
                        rotate: {
                            repeat: Infinity,
                            duration: 4 + Math.random() * 2,
                            ease: "easeInOut",
                            delay: icon.delay
                        }
                    }}
                >
                    {icon.icon}
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingIcons;