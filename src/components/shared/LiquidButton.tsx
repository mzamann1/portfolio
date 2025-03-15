// src/components/LiquidButton.tsx
import { motion } from 'framer-motion';
import { useState, useRef, ReactNode } from 'react';

interface LiquidButtonProps {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    color?: string;
}

const LiquidButton = ({
    children,
    onClick,
    className = '',
    color = 'rgba(100, 255, 218, 0.5)'
}: LiquidButtonProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const liquidRef = useRef<SVGSVGElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!buttonRef.current || !liquidRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        liquidRef.current.style.setProperty('--x', `${x}px`);
        liquidRef.current.style.setProperty('--y', `${y}px`);
    };

    return (
        <motion.button
            ref={buttonRef}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            whileTap={{ scale: 0.95 }}
            className={`relative px-8 py-3 rounded-full overflow-hidden text-light-text dark:text-dark-text font-medium ${className}`}
            style={{ background: 'transparent' }}
        >
            <svg
                ref={liquidRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                    '--x': '50%',
                    '--y': '50%',
                } as React.CSSProperties}
            >
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                    </filter>
                </defs>
                <g filter="url(#goo)">
                    <circle
                        cx="var(--x)"
                        cy="var(--y)"
                        r={isHovered ? 100 : 0}
                        fill={color}
                        style={{ transition: 'r 0.5s ease' }}
                    />
                </g>
            </svg>
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
};

export default LiquidButton;