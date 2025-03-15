// src/components/SkillRadar.tsx
import { motion } from 'framer-motion';

interface Skill {
    name: string;
    level: number; // 0-100
}

interface SkillRadarProps {
    skills: Skill[];
    className?: string;
}

const SkillRadar = ({ skills, className = '' }: SkillRadarProps) => {
    const size = 300;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.4;

    // Calculate points for each skill
    const skillPoints = skills.map((skill, index) => {
        const angle = (Math.PI * 2 * index) / skills.length - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle) * (skill.level / 100);
        const y = centerY + radius * Math.sin(angle) * (skill.level / 100);
        return { x, y, skill };
    });

    // Create polygon points string
    const polygonPoints = skillPoints
        .map(point => `${point.x},${point.y}`)
        .join(' ');

    return (
        <div className={`relative ${className}`}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                {/* Background circles */}
                {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
                    <circle
                        key={i}
                        cx={centerX}
                        cy={centerY}
                        r={radius * scale}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth="1"
                        className="dark:stroke-white/10"
                    />
                ))}

                {/* Skill axes */}
                {skills.map((skill, i) => {
                    const angle = (Math.PI * 2 * i) / skills.length - Math.PI / 2;
                    const x = centerX + radius * Math.cos(angle);
                    const y = centerY + radius * Math.sin(angle);
                    return (
                        <line
                            key={i}
                            x1={centerX}
                            y1={centerY}
                            x2={x}
                            y2={y}
                            stroke="rgba(255, 255, 255, 0.1)"
                            strokeWidth="1"
                            className="dark:stroke-white/10"
                        />
                    );
                })}

                {/* Skill polygon */}
                <motion.polygon
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 0.5, scale: 1 }}
                    transition={{ duration: 1 }}
                    points={polygonPoints}
                    fill="rgba(59, 130, 246, 0.2)"
                    stroke="rgba(59, 130, 246, 0.8)"
                    strokeWidth="2"
                    className="dark:fill-dark-accent/20 dark:stroke-dark-accent/80"
                />

                {/* Skill points */}
                {skillPoints.map((point, i) => (
                    <motion.circle
                        key={i}
                        initial={{ opacity: 0, r: 0 }}
                        animate={{ opacity: 1, r: 4 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        cx={point.x}
                        cy={point.y}
                        fill="rgba(59, 130, 246, 1)"
                        className="dark:fill-dark-accent"
                    />
                ))}
            </svg>

            {/* Skill labels */}
            {skillPoints.map((point, i) => {
                const angle = (Math.PI * 2 * i) / skills.length - Math.PI / 2;
                const labelRadius = radius + 20;
                const x = centerX + labelRadius * Math.cos(angle);
                const y = centerY + labelRadius * Math.sin(angle);

                // Adjust text-anchor based on position
                const textAnchor =
                    angle > Math.PI / 2 && angle < Math.PI * 3 / 2 ? 'end' :
                        angle === Math.PI / 2 || angle === Math.PI * 3 / 2 ? 'middle' : 'start';

                return (
                    <motion.text
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        x={x}
                        y={y}
                        textAnchor={textAnchor}
                        dominantBaseline="middle"
                        className="fill-light-text dark:fill-dark-text text-xs font-medium"
                    >
                        {point.skill.name}
                    </motion.text>
                );
            })}
        </div>
    );
};

export default SkillRadar;