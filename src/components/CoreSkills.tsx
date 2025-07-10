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
  FaCrown
} from 'react-icons/fa';
import { useLanguageFont } from '../hooks/useLanguageFont';

const iconMap: Record<string, React.ReactNode> = {
  // Frontend
  FaReact: <FaReact className="w-8 h-8" />,
  SiTypescript: <SiTypescript className="w-8 h-8" />,
  SiJavascript: <SiJavascript className="w-8 h-8" />,
  FaHtml5: <FaHtml5 className="w-8 h-8" />,
  FaCss3Alt: <FaCss3Alt className="w-8 h-8" />,
  SiTailwindcss: <SiTailwindcss className="w-8 h-8" />,
  SiJquery: <SiJquery className="w-8 h-8" />,
  
  // Backend
  SiSharp: <SiSharp className="w-8 h-8" />,
  SiDotnet: <SiDotnet className="w-8 h-8" />,
  FaNodeJs: <FaNodeJs className="w-8 h-8" />,
  SiExpress: <SiExpress className="w-8 h-8" />,
  FaPython: <FaPython className="w-8 h-8" />,
  SiDjango: <SiDjango className="w-8 h-8" />,
  
  // Database & Cloud
  FaSqlServer: <FaSqlServer className="w-8 h-8" />,
  FaOracle: <FaOracle className="w-8 h-8" />,
  FaTsql: <FaTsql className="w-8 h-8" />,
  SiMongodb: <SiMongodb className="w-8 h-8" />,
  SiPostgresql: <SiPostgresql className="w-8 h-8" />,
  FaAws: <FaAws className="w-8 h-8" />,
  SiFirebase: <SiFirebase className="w-8 h-8" />,
  
  // Tools & DevOps
  FaEntityFramework: <FaEntityFramework className="w-8 h-8" />,
  FaWebApi: <FaWebApi className="w-8 h-8" />,
  FaBlazor: <FaBlazor className="w-8 h-8" />,
  FaAzureDevOps: <FaAzureDevOps className="w-8 h-8" />,
  SiGithub: <SiGithub className="w-8 h-8" />,
  FaGitAlt: <FaGitAlt className="w-8 h-8" />,
  SiDocker: <SiDocker className="w-8 h-8" />,
  SiPostman: <SiPostman className="w-8 h-8" />,
  SiJest: <SiJest className="w-8 h-8" />,
  FaVsCode: <FaVsCode className="w-8 h-8" />,
  FaVisualStudio: <FaVisualStudio className="w-8 h-8" />,
  FaFigma: <FaFigma className="w-8 h-8" />,
  
  // Soft Skills
  FaComments: <FaComments className="w-8 h-8" />,
  FaUsers: <FaUsers className="w-8 h-8" />,
  FaLightbulb: <FaLightbulb className="w-8 h-8" />,
  FaRandom: <FaRandom className="w-8 h-8" />,
  FaCrown: <FaCrown className="w-8 h-8" />
};

// Fallback icon component
const FallbackIcon = () => (
  <div className="w-8 h-8 bg-base-content/20 rounded flex items-center justify-center">
    <span className="text-xs font-bold text-base-content/60">?</span>
  </div>
);

const CoreSkills = () => {
  const { t } = useTranslation();
  const { data: skillsData, loading, error } = useSkillsData();
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const { fontClass, heading, body } = useLanguageFont();

  if (loading) {
    return (
      <section id="skills" className={`w-full max-w-7xl mx-auto py-16 px-4 md:px-12 ${fontClass}`}>
        <h2 className={heading}>
          {t('core_skills', 'Core Skills')}
        </h2>
        <Loading />
      </section>
    );
  }

  if (error || !skillsData?.categories || skillsData.categories.length === 0) {
    return (
      <section id="skills" className={`w-full max-w-7xl mx-auto py-16 px-4 md:px-12 ${fontClass}`}>
        <h2 className={heading}>
          {t('core_skills', 'Core Skills')}
        </h2>
        <div className={body + ' text-center text-lg text-base-content/60 py-12'}>
          {error || t('no_skills_data', 'No skills data available')}
        </div>
      </section>
    );
  }

  // Safety check for selected category
  const currentCategory = skillsData.categories[selectedCategory];
  if (!currentCategory || !currentCategory.skills || currentCategory.skills.length === 0) {
    return (
      <section id="skills" className={`w-full max-w-7xl mx-auto py-16 px-4 md:px-12 ${fontClass}`}>
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

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: { duration: 0.2 }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (proficiency: number) => ({
      width: `${proficiency}%`,
      transition: { 
        duration: 1.5,
        ease: "easeOut",
        delay: 0.3
      }
    })
  };

  return (
    <section id="skills" className={`w-full max-w-7xl mx-auto py-16 px-4 ${fontClass}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className={heading}>
          {t('core_skills', 'Core Skills')}
        </h2>
        <p className={body + ' text-lg max-w-2xl mx-auto'}>
          {/* {skillsData?.description} */}
        </p>
      </motion.div>

      {/* Category Navigation */}
      <motion.div 
        className="flex flex-wrap justify-center gap-3 mb-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {skillsData.categories.map((category, index) => (
          <motion.button
            key={category.id}
            variants={categoryVariants}
            onClick={() => setSelectedCategory(index)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === index
                ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                : 'bg-base-200 text-base-content/70 hover:bg-base-300 hover:text-base-content'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name}
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {currentCategory.skills.map((skill) => (
            <motion.div
              key={skill.id}
              variants={skillVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onHoverStart={() => setHoveredSkill(skill.id)}
              onHoverEnd={() => setHoveredSkill(null)}
              className="group relative bg-gradient-to-br from-base-100 to-base-200/50 backdrop-blur-sm border border-base-300/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Background Pattern */}
              <div className={`absolute inset-0 bg-gradient-to-br ${currentCategory.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Icon */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${currentCategory.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {iconMap[skill.icon] || <FallbackIcon />}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-base-content group-hover:text-primary transition-colors duration-300">
                    {skill.name}
                  </h3>
                  <div className="text-sm text-base-content/60">
                    {skill.proficiency}% {t('proficiency', 'Proficiency')}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-base-300 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${currentCategory.color} rounded-full`}
                    variants={progressVariants}
                    custom={skill.proficiency}
                    initial="hidden"
                    animate="visible"
                  />
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-base-content/70 leading-relaxed">
                {skill.description}
              </p>

              {/* Tooltip */}
              <AnimatePresence>
                {hoveredSkill === skill.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-base-300 text-base-content text-xs px-3 py-1 rounded-full shadow-lg border border-base-300/50 z-10"
                  >
                    {skill.proficiency}% {t('mastery', 'Mastery')}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Shine effect */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
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