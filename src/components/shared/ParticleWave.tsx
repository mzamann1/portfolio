// src/components/ParticleWave.tsx
import { useEffect, useRef } from 'react';

interface ParticleWaveProps {
    className?: string;
    color?: string;
    particleCount?: number;
}

const ParticleWave = ({
    className = '',
    color = 'var(--light-accent)',
    particleCount = 100
}: ParticleWaveProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = 400;

        const particles: Particle[] = [];

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            originalY: number;
            waveAmplitude: number;
            waveFrequency: number;
            waveOffset: number;

            constructor() {
                this.x = Math.random() * (canvas?.width || 0);
                this.originalY = Math.random() * (canvas?.height || 0);
                this.y = this.originalY;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = 0;
                this.waveAmplitude = Math.random() * 20 + 10;
                this.waveFrequency = Math.random() * 0.02 + 0.01;
                this.waveOffset = Math.random() * Math.PI * 2;
            }

            update(time: number) {
                this.x += this.speedX;
                this.y = this.originalY + Math.sin(time * this.waveFrequency + this.waveOffset) * this.waveAmplitude;

                if (this.x < 0) this.x = (canvas?.width || 0);
                if (this.x > (canvas?.width || 0)) this.x = 0;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.globalAlpha = 0.5;
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        let time = 0;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 0.05;

            particles.forEach(particle => {
                particle.update(time);
                particle.draw();
            });

            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = 400;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [color, particleCount]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute bottom-0 left-0 w-full pointer-events-none ${className}`}
            style={{ height: '400px' }}
        />
    );
};

export default ParticleWave;