// src/components/Text3D.tsx
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Text3DProps {
    children: ReactNode;
    className?: string;
    color?: string;
    shadowColor?: string;
    depth?: number;
}

const Text3D = ({
    children,
    className = '',
    color = 'var(--light-accent)',
    shadowColor = 'rgba(0, 0, 0, 0.4)',
    depth = 5
}: Text3DProps) => {
    const textShadow = Array.from({ length: depth }).map((_, i) =>
        `${i + 1}px ${i + 1}px 0 ${shadowColor}`
    ).join(', ');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={className}
            style={{
                color,
                textShadow,
                transform: 'translateZ(0)'
            }}
        >
            {children}
        </motion.div>
    );
};

export default Text3D;