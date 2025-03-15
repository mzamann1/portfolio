// src/components/TextReveal.tsx
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TextRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

const TextReveal = ({ children, className = '', delay = 0 }: TextRevealProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            viewport={{ once: true }}
            className={className}
        >
            <motion.div
                initial={{ clipPath: "inset(0 0 100% 0)" }}
                whileInView={{ clipPath: "inset(0 0 0% 0)" }}
                transition={{ duration: 0.5, delay }}
                viewport={{ once: true }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

export default TextReveal;