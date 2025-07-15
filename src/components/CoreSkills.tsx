import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  FaReact: <FaReact className="w-6 h-6" />,
  SiTypescript: <SiTypescript className="w-6 h-6" />,
  SiJavascript: <SiJavascript className="w-6 h-6" />,
  FaHtml5: <FaHtml5 className="w-6 h-6" />,
  FaCss3Alt: <FaCss3Alt className="w-6 h-6" />,
  SiTailwindcss: <SiTailwindcss className="w-6 h-6" />,
  SiJquery: <SiJquery className="w-6 h-6" />,
  
  // Backend
  SiSharp: <SiSharp className="w-6 h-6" />,
  SiDotnet: <SiDotnet className="w-6 h-6" />,
  FaNodeJs: <FaNodeJs className="w-6 h-6" />,
  SiExpress: <SiExpress className="w-6 h-6" />,
  FaPython: <FaPython className="w-6 h-6" />,
  SiDjango: <SiDjango className="w-6 h-6" />,
  
  // Database & Cloud
  FaSqlServer: <FaSqlServer className="w-6 h-6" />,
  FaOracle: <FaOracle className="w-6 h-6" />,
  FaTsql: <FaTsql className="w-6 h-6" />,
  SiMongodb: <SiMongodb className="w-6 h-6" />,
  SiPostgresql: <SiPostgresql className="w-6 h-6" />,
  FaAws: <FaAws className="w-6 h-6" />,
  SiFirebase: <SiFirebase className="w-6 h-6" />,
  
  // Tools & DevOps
  FaEntityFramework: <FaEntityFramework className="w-6 h-6" />,
  FaWebApi: <FaWebApi className="w-6 h-6" />,
  FaBlazor: <FaBlazor className="w-6 h-6" />,
  FaAzureDevOps: <FaAzureDevOps className="w-6 h-6" />,
  SiGithub: <SiGithub className="w-6 h-6" />,
  FaGitAlt: <FaGitAlt className="w-6 h-6" />,
  SiDocker: <SiDocker className="w-6 h-6" />,
  SiPostman: <SiPostman className="w-6 h-6" />,
  SiJest: <SiJest className="w-6 h-6" />,
  FaVsCode: <FaVsCode className="w-6 h-6" />,
  FaVisualStudio: <FaVisualStudio className="w-6 h-6" />,
  SiVisualstudiocode: <FaVsCode className="w-6 h-6" />,
  FaFigma: <FaFigma className="w-6 h-6" />,
  
  // Soft Skills
  FaComments: <FaComments className="w-6 h-6" />,
  FaUsers: <FaUsers className="w-6 h-6" />,
  FaLightbulb: <FaLightbulb className="w-6 h-6" />,
  FaRandom: <FaRandom className="w-6 h-6" />,
  FaCrown: <FaCrown className="w-6 h-6" />,
  FaClock: <FaClock className="w-6 h-6" />
};

// Fallback icon component
const FallbackIcon = () => (
  <div className="w-6 h-6 bg-base-content/20 rounded flex items-center justify-center">
    <span className="text-xs font-bold text-base-content/60">?</span>
  </div>
);

// Skill level indicator component
const SkillLevel = ({ proficiency }: { proficiency: number }) => {
  const getLevelColor = (level: number) => {
    if (level >= 90) return 'text-green-500';
    if (level >= 80) return 'text-blue-500';
    if (level >= 70) return 'text-yellow-500';
    if (level >= 60) return 'text-orange-500';
    return 'text-red-500';
  };

  const getLevelText = (level: number) => {
    if (level >= 90) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 70) return 'Intermediate';
    if (level >= 60) return 'Beginner';
    return 'Novice';
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`text-sm font-semibold ${getLevelColor(proficiency)}`}>
        {getLevelText(proficiency)}
      </div>
      <div className="flex gap-1">
        {[20, 40, 60, 80, 100].map((level) => (
          <div
            key={level}
            className={`w-2 h-2 rounded-full ${
              proficiency >= level ? getLevelColor(proficiency).replace('text-', 'bg-') : 'bg-base-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const CoreSkills = () => {
  const { t } = useTranslation();
  const { data: skillsData, loading, error } = useSkillsData();
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);
  const { fontClass, heading, body } = useLanguageFont();

  if (loading) {
    return (
      <section id="skills" data-section="skills" className={`w-full max-w-7xl mx-auto py-16 px-4 md:px-12 ${fontClass}`}>
        <h2 className={heading}>
          {t('core_skills', 'Core Skills')}
        </h2>
        <Loading />
      </section>
    );
  }

  if (error || !skillsData?.categories || skillsData.categories.length === 0) {
    return (
      <section id="skills" data-section="skills" className={`w-full max-w-7xl mx-auto py-16 px-4 md:px-12 ${fontClass}`}>
        <h2 className={heading}>
          {t('core_skills', 'Core Skills')}
        </h2>
        <div className={body + ' text-center text-lg text-base-content/60 py-12'}>
          {error || t('no_skills_data', 'No skills data available')}
        </div>
      </section>
    );
  }

  const currentCategory = skillsData.categories[selectedCategory];
  if (!currentCategory || !currentCategory.skills || currentCategory.skills.length === 0) {
    return (
      <section id="skills" data-section="skills" className={`w-full max-w-7xl mx-auto py-16 px-4 md:px-12 ${fontClass}`}>
        <h2 className={heading}>
          {t('core_skills', 'Core Skills')}
        </h2>
        <div className={body + ' text-center text-lg text-base-content/60 py-12'}>
          {t('no_skills_in_category', 'No skills found in this category')}
        </div>
      </section>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { duration: 0.3 }
    }
  };



  return (
    <section id="skills" data-section="skills" className={`w-full max-w-7xl mx-auto py-16 px-4 ${fontClass}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className={`${heading} mb-4`}>
          {t('core_skills', 'Core Skills')}
        </h2>
        <p className={`${body} text-lg max-w-3xl mx-auto text-base-content/70`}>
          {t('skills_description', 'A comprehensive showcase of my technical expertise and professional competencies')}
        </p>
      </motion.div>

      {/* Category Navigation */}
      <motion.div 
        className="flex flex-wrap justify-center gap-4 mb-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {skillsData.categories.map((category, index) => (
          <motion.button
            key={category.id}
            variants={skillVariants}
            onClick={() => setSelectedCategory(index)}
            className={`relative px-8 py-4 rounded-2xl font-semibold transition-all duration-300 overflow-hidden ${
              selectedCategory === index
                ? `bg-gradient-to-r ${category.color} text-white shadow-xl scale-105`
                : 'bg-base-200 text-base-content/70 hover:bg-base-300 hover:text-base-content hover:scale-105'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">{category.name}</span>
            {selectedCategory === index && (
              <motion.div
                layoutId="activeTab"
                className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-2xl`}
                initial={false}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Skills Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {currentCategory.skills.map((skill) => (
            <motion.div
              key={skill.id}
              variants={skillVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onClick={() => setExpandedSkill(expandedSkill === skill.id ? null : skill.id)}
              className="group relative bg-gradient-to-br from-base-100 to-base-200/50 backdrop-blur-sm border border-base-300/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
            >
              {/* Background Pattern */}
              <div className={`absolute inset-0 bg-gradient-to-br ${currentCategory.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Skill Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${currentCategory.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {iconMap[skill.icon] || <FallbackIcon />}
                </div>
                  <div>
                  <h3 className="text-xl font-bold text-base-content group-hover:text-primary transition-colors duration-300">
                    {skill.name}
                  </h3>
                    <SkillLevel proficiency={skill.proficiency} />
                </div>
              </div>

                {/* Expand/Collapse Icon */}
                  <motion.div
                  animate={{ rotate: expandedSkill === skill.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-base-content/50 group-hover:text-base-content/70"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </div>



              {/* Description */}
              <AnimatePresence>
                {expandedSkill === skill.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-base-300/30">
                      <p className={`${body} text-sm text-base-content/70 leading-relaxed`}>
                        {skill.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Shine effect */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
                <div className={`absolute left-1/2 top-0 w-2/3 h-1/3 bg-gradient-to-r ${currentCategory.color} opacity-0 group-hover:opacity-20 blur-lg rotate-12 -translate-x-1/2 transition-all duration-500`} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>


    </section>
  );
};

export default CoreSkills; 