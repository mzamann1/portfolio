// src/components/MouseTrailEffect.tsx
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';

interface Point {
    x: number;
    y: number;
    alpha: number;
    size: number;
    angle: number;
    speed: number;
}

const MouseTrailEffect = () => {
    const [points, setPoints] = useState<Point[]>([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMoving, setIsMoving] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const { isDarkMode } = useTheme();

    // Track mouse movement
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            setIsMoving(true);
            
            // Reset the timeout on each mouse move
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            
            // Set a timeout to detect when mouse stops moving
            timeoutRef.current = setTimeout(() => {
                setIsMoving(false);
            }, 100);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    // Generate and update points
    useEffect(() => {
        if (!isMoving) return;
        
        const interval = setInterval(() => {
            setPoints(prevPoints => {
                // Add new points only when mouse is moving
                const newPoints = [
                    ...prevPoints,
                    {
                        x: mousePosition.x,
                        y: mousePosition.y,
                        alpha: 0.7,
                        size: Math.random() * 4 + 2, // Smaller size for minimalism
                        angle: Math.random() * Math.PI * 2,
                        speed: Math.random() * 1 + 0.5
                    }
                ];

                // Update existing points with more elegant movement
                return newPoints
                    .map(point => ({
                        ...point,
                        x: point.x + Math.cos(point.angle) * point.speed * 0.5,
                        y: point.y + Math.sin(point.angle) * point.speed * 0.5,
                        alpha: point.alpha * 0.95,
                        size: point.size * 0.97
                    }))
                    .filter(point => point.alpha > 0.05); // Remove faded points
            });
        }, 40); // Slightly faster for smoother effect

        return () => clearInterval(interval);
    }, [mousePosition, isMoving]);

    // Define colors based on theme
    const getPointColor = (alpha: number) => {
        if (isDarkMode) {
            // Subtle blue/purple gradient in dark mode
            return `rgba(138, 180, 248, ${alpha * 0.6})`;
        } else {
            // Subtle accent color in light mode
            return `rgba(79, 70, 229, ${alpha * 0.4})`;
        }
    };

    return (
        <div className="fixed inset-0 pointer-events-none z-10">
            <svg className="w-full h-full">
                {points.map((point, index) => (
                    <motion.circle
                        key={index}
                        cx={point.x}
                        cy={point.y}
                        r={point.size}
                        fill={getPointColor(point.alpha)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ filter: 'blur(1px)' }} // Subtle blur for elegance
                    />
                ))}
            </svg>
        </div>
    );
};

export default MouseTrailEffect;