// src/components/NeumorphicButton.tsx
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface NeumorphicButtonProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    variant?: 'primary' | 'secondary';
}

const NeumorphicButton = ({
    children,
    onClick,
    className = '',
    variant = 'primary'
}: NeumorphicButtonProps) => {
    const baseClasses = "relative px-6 py-3 rounded-xl font-medium transition-all duration-300";

    const variantClasses = {
        primary: "bg-light-primary dark:bg-dark-primary text-light-accent dark:text-dark-accent",
        secondary: "bg-light-accent dark:bg-dark-accent text-white"
    };

    const shadowClasses = {
        primary: "shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.1)] dark:shadow-[6px_6px_12px_rgba(0,0,0,0.2),-6px_-6px_12px_rgba(255,255,255,0.05)]",
        secondary: "shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.1)] dark:shadow-[6px_6px_12px_rgba(0,0,0,0.2),-6px_-6px_12px_rgba(255,255,255,0.05)]"
    };

    const activeClasses = {
        primary: "active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.1)] dark:active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.05)]",
        secondary: "active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.1)] dark:active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.05)]"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className={`${baseClasses} ${variantClasses[variant]} ${shadowClasses[variant]} ${activeClasses[variant]} ${className}`}
        >
            {children}
        </motion.button>
    );
};

export default NeumorphicButton;