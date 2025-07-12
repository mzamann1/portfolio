import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useSkillsData } from '../hooks/usePortfolioData';
import Loading from './Loading';
import { 
  FaComments,
  FaUsers,
  FaLightbulb,
  FaRandom,
  FaCrown,
  FaClock
} from 'react-icons/fa';
import { useLanguageFont } from '../hooks/useLanguageFont';

const iconMap: Record<string, React.ReactNode> = {
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

const SoftSkills = () => {
  const { t } = useTranslation();
  const { data: skillsData, loading, error } = useSkillsData();
  const { fontClass, heading, body } = useLanguageFont();

  if (loading) {
    return (
      <section id="soft-skills" className={`w-full max-w-7xl mx-auto py-16 px-4 md:px-12 ${fontClass}`}>
        <h2 className={heading}>
          {t('soft_skills', 'Soft Skills')}
        </h2>
        <Loading />
      </section>
    );
  }

  if (error || !skillsData?.softSkills || skillsData.softSkills.length === 0) {
    return (
      <section id="soft-skills" className={`w-full max-w-7xl mx-auto py-16 px-4 md:px-12 ${fontClass}`}>
        <h2 className={heading}>
          {t('soft_skills', 'Soft Skills')}
        </h2>
        <div className={body + ' text-center text-lg text-base-content/60 py-12'}>
          {error || t('no_soft_skills_data', 'No soft skills data available')}
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
    <section id="soft-skills" className={`w-full max-w-7xl mx-auto py-16 px-4 ${fontClass}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className={`${heading} mb-4`}>
          {t('soft_skills', 'Soft Skills')}
        </h2>
        <p className={`${body} text-lg max-w-3xl mx-auto text-base-content/70`}>
          {t('soft_skills_description', 'Professional competencies that complement technical expertise')}
        </p>
      </motion.div>

      {/* Soft Skills Grid */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {skillsData.softSkills.map((skill) => (
          <motion.div
            key={skill.id}
            variants={skillVariants}
            whileHover="hover"
            className="group relative bg-gradient-to-br from-base-100 to-base-200/50 backdrop-blur-sm border border-base-300/20 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-500 overflow-hidden cursor-pointer"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-5 group-hover:opacity-10 transition-opacity duration-500" />
            
            {/* Icon */}
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
              {iconMap[skill.icon] || <FallbackIcon />}
            </div>
            
            {/* Skill Name */}
            <h4 className="font-semibold text-base-content group-hover:text-primary transition-colors duration-300">
              {skill.name}
            </h4>

            {/* Shine effect */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
              <div className="absolute left-1/2 top-0 w-2/3 h-1/3 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 blur-lg rotate-12 -translate-x-1/2 transition-all duration-500" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SoftSkills; 