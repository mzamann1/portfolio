// src/components/shared/SkillMasteryGrid.tsx
import { motion } from 'framer-motion';
import { useState } from 'react';

interface Skill {
    name: string;
    level: number; // 0-100
    category?: string;
    icon?: React.ElementType;
    color?: string;
}

interface SkillMasteryGridProps {
    skills: Skill[];
    className?: string;
}

const SkillMasteryGrid = ({ skills, className = '' }: SkillMasteryGridProps) => {
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

    // Group skills by category if available
    const categories = skills.reduce((acc, skill) => {
        const category = skill.category || 'General';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    // If no categories, use a single group
    const skillGroups = Object.keys(categories).length > 0
        ? categories
        : { 'Skills': skills };

    // Get level label based on percentage
    const getLevelLabel = (level: number) => {
        if (level >= 90) return 'Expert';
        if (level >= 75) return 'Advanced';
        if (level >= 50) return 'Intermediate';
        return 'Beginner';
    };

    // Get color based on level
    const getLevelColor = (level: number) => {
        if (level >= 90) return 'from-purple-500 to-purple-700';
        if (level >= 75) return 'from-green-500 to-green-700';
        if (level >= 50) return 'from-blue-500 to-blue-700';
        return 'from-yellow-500 to-yellow-700';
    };

    // Toggle category expansion
    const toggleCategory = (category: string) => {
        setExpandedCategory(expandedCategory === category ? null : category);
        setExpandedSkill(null); // Close any expanded skill when toggling category
    };

    // Toggle skill expansion
    const toggleSkill = (skillName: string) => {
        setExpandedSkill(expandedSkill === skillName ? null : skillName);
    };

    return (
        <div className={`w-full ${className}`}>
            {Object.entries(skillGroups).map(([category, categorySkills]) => (
                <motion.div
                    key={category}
                    className="mb-6 last:mb-0"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    {/* Category Header - Touch-friendly and collapsible */}
                    <motion.div
                        className={`glass-morphism p-4 rounded-xl mb-4 cursor-pointer flex justify-between items-center ${expandedCategory === category ? 'bg-light-accent/10 dark:bg-dark-accent/10' : ''
                            }`}
                        onClick={() => toggleCategory(category)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                    >
                        <h4 className="text-lg font-bold">{category}</h4>
                        <motion.svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            animate={{ rotate: expandedCategory === category ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-light-accent dark:text-dark-accent"
                        >
                            <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </motion.svg>
                    </motion.div>

                    {/* Skills in this category */}
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                            height: expandedCategory === category ? 'auto' : 0,
                            opacity: expandedCategory === category ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="space-y-4">
                            {categorySkills.map((skill) => (
                                <motion.div
                                    key={skill.name}
                                    className="relative"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    {/* Skill Card - Touch-friendly */}
                                    <div
                                        className="glass-morphism p-4 rounded-xl overflow-hidden cursor-pointer"
                                        onClick={() => toggleSkill(skill.name)}
                                    >
                                        <div className="flex items-center mb-3">
                                            {/* Icon if available */}
                                            {skill.icon && (
                                                <skill.icon className="text-2xl mr-3" style={{ color: skill.color }} />
                                            )}

                                            <div className="flex-1">
                                                <div className="flex justify-between items-center">
                                                    <h5 className="font-medium">{skill.name}</h5>
                                                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs text-white ${getLevelColor(skill.level).split(' ')[0]}`}>
                                                        {getLevelLabel(skill.level)}
                                                    </span>
                                                </div>

                                                {/* Progress bar - Always visible */}
                                                <div className="h-2 bg-light-secondary/50 dark:bg-dark-secondary/50 rounded-full overflow-hidden mt-2">
                                                    <motion.div
                                                        className={`h-full bg-gradient-to-r ${getLevelColor(skill.level)}`}
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${skill.level}%` }}
                                                        transition={{ duration: 1, delay: 0.2 }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Skill details - Expandable */}
                                        <motion.div
                                            className="overflow-hidden"
                                            initial={{ height: 0 }}
                                            animate={{ height: expandedSkill === skill.name ? 'auto' : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="pt-2 text-sm text-light-textSecondary dark:text-dark-textSecondary">
                                                <div className="flex justify-between text-xs">
                                                    <span>Beginner</span>
                                                    <span>Intermediate</span>
                                                    <span>Advanced</span>
                                                    <span>Expert</span>
                                                </div>
                                                <div className="flex justify-between items-center mt-1">
                                                    <div className="w-full bg-light-secondary/30 dark:bg-dark-secondary/30 h-1 rounded-full relative">
                                                        {[25, 50, 75].map((mark) => (
                                                            <div
                                                                key={mark}
                                                                className="absolute h-2 w-0.5 bg-light-textSecondary/30 dark:bg-dark-textSecondary/30"
                                                                style={{ left: `${mark}%`, transform: 'translateY(-25%)' }}
                                                            />
                                                        ))}
                                                        <motion.div
                                                            className="absolute h-3 w-3 bg-light-accent dark:bg-dark-accent rounded-full -translate-y-1/3"
                                                            style={{ left: `${skill.level}%`, transform: 'translateX(-50%)' }}
                                                            animate={{ scale: [1, 1.2, 1] }}
                                                            transition={{ duration: 1, repeat: Infinity }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Additional skill details could go here */}
                                                <div className="mt-3 text-sm">
                                                    <p>Experience level: {Math.floor(skill.level / 10)} years</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
};

export default SkillMasteryGrid;