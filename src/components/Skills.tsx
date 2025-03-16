import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ScrollRevealSection from './shared/ScrollRevealSection';
import Text3D from './shared/Text3D';
import TextGlitch from './shared/TextGlitch';
import GlassCard from './shared/GlassCard';
import { selectSkills } from '../store/selectors/cvSelectors';
import { useAppSelector } from '../store/hooks';
import { groupSkillsByType } from '../uttilities';
import { SkillGrid } from './data-viz';
import { ISkill } from '../types';

const Skills = () => {
    const [activeCategory, setActiveCategory] = useState('frontend');
    const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    const skillCategories = groupSkillsByType(useAppSelector(selectSkills));

    const levelBadges = {
        beginner: { color: "bg-yellow-500", label: "Beginner" },
        intermediate: { color: "bg-blue-500", label: "Intermediate" },
        advanced: { color: "bg-green-500", label: "Advanced" },
        expert: { color: "bg-purple-500", label: "Expert" }
    };

    // Get the selected skill details
    const getSelectedSkillDetails = () => {
        if (!selectedSkill) return null;

        for (const category in skillCategories) {
            const found = skillCategories[category as keyof typeof skillCategories].find(
                skill => skill.title === selectedSkill
            );
            if (found) return found;
        }
        return null;
    };

    const selectedSkillDetails = getSelectedSkillDetails();

    // Convert skills to the format expected by SkillGrid
    const formatSkillsForGrid = (category: string): ISkill[] => {
        return skillCategories[category as keyof typeof skillCategories].map(skill => ({
            title: skill.title,
            icon: skill.icon,
            color: skill.color,
            level: skill.level as 'beginner' | 'intermediate' | 'advanced' | 'expert',
            description: skill.description,
            type: skill.type,
            isMainSkill: skill.isMainSkill,
            projects: skill.projects
        }));
    };

    // Handle skill click
    const handleSkillClick = (skill: ISkill) => {
        setSelectedSkill(skill.title === selectedSkill ? null : skill.title);
    };

    return (
        <section id="skills" className="py-20 relative overflow-hidden">
            <div className="container relative">
                <ScrollRevealSection>
                    <Text3D className="text-3xl font-bold text-center mb-6">
                        <TextGlitch text="Skills & Expertise" glitchInterval={6000} />
                    </Text3D>
                    <p className="text-light-textSecondary dark:text-dark-textSecondary text-center max-w-2xl mx-auto mb-12">
                        My technical skills and areas of expertise, developed through years of hands-on experience.
                    </p>
                </ScrollRevealSection>

                {/* Interactive Skill Categories */}
                <div className="flex justify-center mb-8">
                    <div className="glass-morphism p-2 rounded-full flex space-x-2">
                        {Object.keys(skillCategories).map((category) => (
                            <button
                                key={category}
                                onClick={() => {
                                    setActiveCategory(category);
                                    setSelectedSkill(null);
                                }}
                                className={`px-6 py-2 rounded-full transition-all duration-300 ${activeCategory === category
                                    ? 'bg-light-accent dark:bg-dark-accent text-white'
                                    : 'text-light-text dark:text-dark-text hover:bg-light-secondary dark:hover:bg-dark-secondary'
                                    }`}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Modern Skill Grid with Circular Icons */}
                <div className="mb-16">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            ref={ref}
                        >
                            <SkillGrid 
                                skills={formatSkillsForGrid(activeCategory)}
                                columns={{ sm: 3, md: 4, lg: 5, xl: 6 }}
                                iconSize={80}
                                className="py-1"
                                onSkillClick={handleSkillClick}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Selected Skill Details */}
                <AnimatePresence>
                    {selectedSkillDetails && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mb-16 overflow-hidden"
                        >
                            <GlassCard className="p-6">
                                <div className="flex items-center mb-4">
                                    {selectedSkillDetails.icon && <span className="text-4xl mr-4" style={{ color: selectedSkillDetails.color }} >
                                        {selectedSkillDetails.icon}
                                    </span>}
                                    <div>
                                        <h3 className="text-xl font-bold">{selectedSkillDetails.title}</h3>
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs text-white ${levelBadges[selectedSkillDetails.level as keyof typeof levelBadges]?.color} mt-1`}>
                                            {levelBadges[selectedSkillDetails.level as keyof typeof levelBadges].label}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4">
                                    {selectedSkillDetails.description}
                                </p>
                                <div>
                                    <h4 className="font-medium mb-2">Related Projects:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedSkillDetails?.projects?.map((project) => (
                                            <span key={project.title} className="px-3 py-1 bg-light-secondary/50 dark:bg-dark-secondary/50 rounded-full text-sm">
                                                {project.title}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Skills;