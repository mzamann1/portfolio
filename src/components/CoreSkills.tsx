import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useSkillsData } from '../hooks/usePortfolioData';
import Loading from './Loading';
import { 
  SiTypescript, 
  SiJavascript, 
  SiTailwindcss, 
  SiJquery,
  SiSharp,
  SiDotnet,
  SiGithub,
  SiDocker,
  SiPostman,
  SiJest,
  SiExpress,
  SiDjango,
  SiMongodb,
  SiPostgresql,
  SiFirebase
} from 'react-icons/si';
import { 
  FaDatabase as FaSqlServer,
  FaDatabase as FaOracle,
  FaDatabase as FaTsql,
  FaDatabase as FaEntityFramework,
  FaDatabase as FaWebApi,
  FaDatabase as FaBlazor,
  FaDatabase as FaAzureDevOps,
  FaDatabase as FaVsCode,
  FaDatabase as FaVisualStudio,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaPython,
  FaAws,
  FaGitAlt,
  FaFigma,
  FaComments,
  FaUsers,
  FaLightbulb,
  FaRandom,
  FaCrown,
  FaClock
} from 'react-icons/fa';
import { useLanguageFont } from '../hooks/useLanguageFont';

const iconMap: Record<string, React.ReactNode> = {
  // Frontend
  FaReact: <FaReact className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  SiTypescript: <SiTypescript className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  SiJavascript: <SiJavascript className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaHtml5: <FaHtml5 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaCss3Alt: <FaCss3Alt className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  SiTailwindcss: <SiTailwindcss className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  SiJquery: <SiJquery className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  
  // Backend
  SiSharp: <SiSharp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  SiDotnet: <SiDotnet className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaNodeJs: <FaNodeJs className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  SiExpress: <SiExpress className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaPython: <FaPython className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  SiDjango: <SiDjango className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  
  // Database & Cloud
  FaSqlServer: <FaSqlServer className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaOracle: <FaOracle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaTsql: <FaTsql className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  SiMongodb: <SiMongodb className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  SiPostgresql: <SiPostgresql className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaAws: <FaAws className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  SiFirebase: <SiFirebase className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  
  // Tools & DevOps
  FaEntityFramework: <FaEntityFramework className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaWebApi: <FaWebApi className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaBlazor: <FaBlazor className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaAzureDevOps: <FaAzureDevOps className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  SiGithub: <SiGithub className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaGitAlt: <FaGitAlt className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  SiDocker: <SiDocker className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  SiPostman: <SiPostman className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  SiJest: <SiJest className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaVsCode: <FaVsCode className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaVisualStudio: <FaVisualStudio className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  SiVisualstudiocode: <FaVsCode className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaFigma: <FaFigma className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  
  // Soft Skills
  FaComments: <FaComments className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaUsers: <FaUsers className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaLightbulb: <FaLightbulb className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaRandom: <FaRandom className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaCrown: <FaCrown className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaClock: <FaClock className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
};

// Fallback icon component
const FallbackIcon = () => (
  <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-base-content/20 rounded flex items-center justify-center">
    <span className="text-xs font-bold text-base-content/60">?</span>
  </div>
);

// Advanced Skill Level Component with Animated Progress
const SkillLevel = ({ proficiency }: { proficiency: number }) => {
  const progress = useMotionValue(0);
  const animatedProgress = useSpring(progress, { stiffness: 100, damping: 20 });
  
  useEffect(() => {
    progress.set(proficiency);
  }, [proficiency, progress]);

  const getLevelColor = (level: number) => {
    if (level >= 90) return 'from-emerald-400 to-emerald-600';
    if (level >= 80) return 'from-blue-400 to-blue-600';
    if (level >= 70) return 'from-amber-400 to-amber-600';
    if (level >= 60) return 'from-orange-400 to-orange-600';
    return 'from-red-400 to-red-600';
  };

  const getLevelText = (level: number) => {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 70) return 'Intermediate';
    if (level >= 60) return 'Beginner';
    return 'Novice';
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="flex-1">
        <div className="relative h-1.5 sm:h-2 bg-base-300 rounded-full overflow-hidden">
          <motion.div
            className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${getLevelColor(proficiency)}`}
            style={{ width: animatedProgress }}
            initial={{ width: 0 }}
            whileInView={{ width: `${proficiency}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <motion.div
            className="absolute top-0 left-0 h-full w-0.5 sm:w-1 bg-white rounded-full shadow-lg"
            style={{ x: animatedProgress.get() * 0.01 * 100 - 2 }}
            initial={{ x: -2 }}
            whileInView={{ x: `${proficiency}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
      </div>
      <motion.div
        className={`text-xs font-bold bg-gradient-to-r ${getLevelColor(proficiency)} bg-clip-text text-transparent`}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {getLevelText(proficiency)}
      </motion.div>
    </div>
  );
};

// Floating Particles Background
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-primary/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

const CoreSkills = () => {
  const { t } = useTranslation();
  const { data: skillsData, loading, error } = useSkillsData();
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const { fontClass, heading, body } = useLanguageFont();

  if (loading) {
    return (
      <section id="skills" data-section="skills" className={`min-h-screen flex items-center justify-center w-full max-w-7xl mx-auto py-8 sm:py-16 px-4 ${fontClass}`}>
        <Loading />
      </section>
    );
  }

  if (error || !skillsData?.categories || skillsData.categories.length === 0) {
    return (
      <section id="skills" data-section="skills" className={`min-h-screen flex items-center justify-center w-full max-w-7xl mx-auto py-8 sm:py-16 px-4 ${fontClass}`}>
        <div className="text-center">
          <h2 className={`${heading} mb-4 text-2xl sm:text-3xl md:text-4xl`}>
            {t('core_skills', 'Core Skills')}
          </h2>
          <div className={`${body} text-base sm:text-lg text-base-content/60`}>
            {error || t('no_skills_data', 'No skills data available')}
          </div>
        </div>
      </section>
    );
  }

  const currentCategory = skillsData.categories[selectedCategory];
  if (!currentCategory || !currentCategory.skills || currentCategory.skills.length === 0) {
    return (
      <section id="skills" data-section="skills" className={`min-h-screen flex items-center justify-center w-full max-w-7xl mx-auto py-8 sm:py-16 px-4 ${fontClass}`}>
        <div className="text-center">
          <h2 className={`${heading} mb-4 text-2xl sm:text-3xl md:text-4xl`}>
            {t('core_skills', 'Core Skills')}
          </h2>
          <div className={`${body} text-base sm:text-lg text-base-content/60`}>
            {t('no_skills_in_category', 'No skills found in this category')}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" data-section="skills" className={`min-h-screen flex items-center w-full max-w-7xl mx-auto py-8 sm:py-16 px-4 ${fontClass} relative`}>
      <FloatingParticles />
      
      <div className="w-full relative z-10">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block"
          >
            <h2 className={`${heading} text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent`}>
              {t('core_skills', 'Core Skills')}
            </h2>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={`${body} text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-4xl mx-auto text-base-content/70 leading-relaxed px-2`}
          >
            {t('skills_description', 'A comprehensive showcase of my technical expertise and professional competencies')}
          </motion.p>
        </motion.div>

        {/* Animated Category Navigation */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12 md:mb-16 px-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {skillsData.categories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              onClick={() => setSelectedCategory(index)}
              className={`relative px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-xl sm:rounded-2xl font-bold transition-all duration-500 overflow-hidden text-xs sm:text-sm md:text-base ${
                selectedCategory === index
                  ? `bg-gradient-to-r ${category.color} text-white shadow-xl sm:shadow-2xl scale-105`
                  : 'bg-base-200/50 backdrop-blur-sm text-base-content/70 hover:bg-base-300 hover:text-base-content hover:scale-105 border border-base-300/20'
              }`}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">{category.name}</span>
              {selectedCategory === index && (
                <motion.div
                  layoutId="activeCategory"
                  className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-xl sm:rounded-2xl`}
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Animated Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          >
            {currentCategory.skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  y: -5,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                onHoverStart={() => setHoveredSkill(skill.id)}
                onHoverEnd={() => setHoveredSkill(null)}
                onClick={() => setExpandedSkill(expandedSkill === skill.id ? null : skill.id)}
                className="group relative bg-gradient-to-br from-base-100/80 to-base-200/40 backdrop-blur-xl border border-base-300/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
              >
                {/* Animated Background */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${currentCategory.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  animate={{
                    background: hoveredSkill === skill.id ? `linear-gradient(135deg, ${currentCategory.color} 0%, transparent 100%)` : "linear-gradient(135deg, transparent 0%, transparent 100%)"
                  }}
                />
                
                {/* Floating Elements */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    rotate: hoveredSkill === skill.id ? 360 : 0,
                  }}
                  transition={{ duration: 20, ease: "linear" }}
                >
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-1 h-1 sm:w-2 sm:h-2 bg-primary/30 rounded-full" />
                  <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-secondary/40 rounded-full" />
                  <div className="absolute top-1/2 left-2 sm:left-4 w-0.5 h-0.5 sm:w-1 sm:h-1 bg-accent/50 rounded-full" />
                </motion.div>

                {/* Skill Header */}
                <div className="flex items-start justify-between mb-4 sm:mb-6 relative z-10">
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                    <motion.div 
                      className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r ${currentCategory.color} flex items-center justify-center shadow-lg`}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.3 }
                      }}
                      animate={{
                        boxShadow: hoveredSkill === skill.id 
                          ? `0 15px 30px rgba(0,0,0,0.3)` 
                          : `0 8px 16px rgba(0,0,0,0.1)`
                      }}
                    >
                      {iconMap[skill.icon] || <FallbackIcon />}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <motion.h3 
                        className="text-base sm:text-lg md:text-xl font-bold text-base-content group-hover:text-primary transition-colors duration-300 truncate"
                        animate={{
                          color: hoveredSkill === skill.id ? "hsl(var(--p))" : "hsl(var(--bc))"
                        }}
                      >
                        {skill.name}
                      </motion.h3>
                      <SkillLevel proficiency={skill.proficiency} />
                    </div>
                  </div>

                  {/* Animated Expand Icon */}
                  <motion.div
                    animate={{ 
                      rotate: expandedSkill === skill.id ? 180 : 0,
                      scale: hoveredSkill === skill.id ? 1.2 : 1
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-base-content/50 group-hover:text-base-content/70 flex-shrink-0 ml-2"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.div>
                </div>

                {/* Animated Description */}
                <AnimatePresence>
                  {expandedSkill === skill.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <motion.div 
                        className="pt-4 sm:pt-6 border-t border-base-300/30"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <p className={`${body} text-xs sm:text-sm text-base-content/70 leading-relaxed`}>
                          {skill.description}
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Shine Effect */}
                <motion.div 
                  className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none overflow-hidden"
                  animate={{
                    background: hoveredSkill === skill.id 
                      ? `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)`
                      : "transparent"
                  }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CoreSkills; 