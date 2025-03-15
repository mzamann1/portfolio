// src/components/BackgroundGradientCanvas.tsx
import { useEffect, useRef } from 'react';

const BackgroundGradientCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const colors = [
            { r: 59, g: 130, b: 246, a: 0.1 },  // Blue
            { r: 100, g: 255, b: 218, a: 0.1 }, // Teal
            { r: 139, g: 92, b: 246, a: 0.1 },  // Purple
        ];

        const circles: Circle[] = [];
        const circleCount = 5;

        class Circle {
            x: number;
            y: number;
            radius: number;
            color: { r: number; g: number; b: number; a: number };
            speedX: number;
            speedY: number;

            constructor() {
                this.x = Math.random() * (canvas?.width || 0);
                this.y = Math.random() * (canvas?.height || 0);
                this.radius = Math.random() * 300 + 100;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.speedX = Math.random() * 0.2 - 0.1;
                this.speedY = Math.random() * 0.2 - 0.1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < -this.radius) this.x = (canvas?.width || 0) + this.radius;
                if (this.x > (canvas?.width || 0) + this.radius) this.x = -this.radius;
                if (this.y < -this.radius) this.y = (canvas?.height || 0) + this.radius;
                if (this.y > (canvas?.height || 0) + this.radius) this.y = -this.radius;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.radius
                );
                gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a})`);
                gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);
                ctx.fillStyle = gradient;
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < circleCount; i++) {
            circles.push(new Circle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            circles.forEach(circle => {
                circle.update();
                circle.draw();
            });
            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        />
    );
};

export default BackgroundGradientCanvas;