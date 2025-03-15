import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import ScrollRevealSection from './shared/ScrollRevealSection';
import Text3D from './shared/Text3D';
import TextGlitch from './shared/TextGlitch';
import GlassCard from './shared/GlassCard';
import { selectProjects, selectProjectsByTitle, selectSkills } from '../store/selectors/cvSelectors';
import { useAppSelector } from '../store/hooks';
import { groupSkillsByType } from '../uttilities';

const Skills = () => {
    const [activeCategory, setActiveCategory] = useState('frontend');
    const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });



    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    const skillCategories = groupSkillsByType(useAppSelector(selectSkills))


    const levelBadges = {
        beginner: { color: "bg-yellow-500", label: "Beginner" },
        intermediate: { color: "bg-blue-500", label: "Intermediate" },
        advanced: { color: "bg-green-500", label: "Advanced" },
        expert: { color: "bg-purple-500", label: "Expert" }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03
            }
        }
    };

    const itemVariants = {
        hidden: { y: 10, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.3 }
        }
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

                {/* Modern Skill Grid with Interactive Elements */}
                <div className="mb-16">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                            ref={ref}
                            variants={containerVariants}
                        >
                            {skillCategories[activeCategory as keyof typeof skillCategories].map((skill) => (
                                <motion.div
                                    key={skill.title}
                                    variants={itemVariants}
                                    onClick={() => setSelectedSkill(skill.title === selectedSkill ? null : skill.title)}
                                    className={`cursor-pointer ${selectedSkill === skill.title ? 'ring-2 ring-light-accent dark:ring-dark-accent' : ''}`}
                                >
                                    <GlassCard className="p-4 h-full flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-glass-hover">
                                        <div className="relative mb-3">
                                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-light-accent/10 to-blue-500/10 dark:from-dark-accent/10 dark:to-blue-400/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            {skill.icon && <span className="text-3xl" style={{ color: skill.color }} >
                                                {skill.icon}
                                            </span>}
                                        </div>
                                        <h3 className="text-sm font-bold mb-1">{skill.title}</h3>
                                        <span className={`px-2 py-0.5 rounded-full text-xs text-white ${levelBadges[skill.level as keyof typeof levelBadges]?.color}`}>
                                            {levelBadges[skill.level as keyof typeof levelBadges]?.label}
                                        </span>
                                    </GlassCard>
                                </motion.div>
                            ))}
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