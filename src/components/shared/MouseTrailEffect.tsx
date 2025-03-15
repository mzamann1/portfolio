// src/components/MouseTrailEffect.tsx
import { useEffect, useState } from 'react';

interface Point {
    x: number;
    y: number;
    alpha: number;
    size: number;
}

const MouseTrailEffect = () => {
    const [points, setPoints] = useState<Point[]>([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setPoints(prevPoints => {
                // Add new point
                const newPoints = [
                    ...prevPoints,
                    {
                        x: mousePosition.x,
                        y: mousePosition.y,
                        alpha: 1,
                        size: Math.random() * 10 + 5
                    }
                ];

                // Update existing points
                return newPoints
                    .map(point => ({
                        ...point,
                        alpha: point.alpha * 0.92,
                        size: point.size * 0.96
                    }))
                    .filter(point => point.alpha > 0.03); // Remove faded points
            });
        }, 50);

        return () => clearInterval(interval);
    }, [mousePosition]);

    return (
        <div className="fixed inset-0 pointer-events-none z-10">
            <svg className="w-full h-full">
                {points.map((point, index) => (
                    <circle
                        key={index}
                        cx={point.x}
                        cy={point.y}
                        r={point.size}
                        fill={`rgba(100, 255, 218, ${point.alpha * 0.5})`}
                        className="dark:fill-dark-accent/50"
                    />
                ))}
            </svg>
        </div>
    );
};

export default MouseTrailEffect;