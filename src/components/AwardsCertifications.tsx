import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAwardsData } from '../hooks/usePortfolioData';
import Loading from './Loading';
import { 
  FaTrophy, 
  FaMedal, 
  FaCertificate, 
  FaStar, 
  FaAward,
  FaCode,
  FaUsers,
  FaRocket,
  FaLightbulb,
  FaGithub,
  FaPalette,
  FaTachometerAlt,
  FaShieldAlt,
  FaAws,
  FaReact
} from 'react-icons/fa';
import { SiTypescript } from 'react-icons/si';
import { useLanguageFont } from '../hooks/useLanguageFont';

const iconMap: Record<string, React.ReactNode> = {
  FaTrophy: <FaTrophy className="w-6 h-6" />,
  FaMedal: <FaMedal className="w-6 h-6" />,
  FaCertificate: <FaCertificate className="w-6 h-6" />,
  FaStar: <FaStar className="w-6 h-6" />,
  FaCode: <FaCode className="w-6 h-6" />,
  FaUsers: <FaUsers className="w-6 h-6" />,
  FaRocket: <FaRocket className="w-6 h-6" />,
  FaLightbulb: <FaLightbulb className="w-6 h-6" />,
  FaGithub: <FaGithub className="w-6 h-6" />,
  FaPalette: <FaPalette className="w-6 h-6" />,
  FaTachometerAlt: <FaTachometerAlt className="w-6 h-6" />,
  FaShieldAlt: <FaShieldAlt className="w-6 h-6" />,
  FaAws: <FaAws className="w-6 h-6" />,
  FaReact: <FaReact className="w-6 h-6" />,
  SiTypescript: <SiTypescript className="w-6 h-6" />,
};

const AwardsCertifications = () => {
  const { t } = useTranslation();
  const { data: awardsData, loading, error } = useAwardsData();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'award' | 'achievement' | 'certification'>('all');
  const { fontClass, heading, body } = useLanguageFont();

  if (loading) {
    return (
      <section id="awards" className={`w-full max-w-7xl mx-auto py-16 px-4 ${fontClass}`}>
        <h2 className={heading}>
          {t('awards_certifications', 'Awards & Certifications')}
        </h2>
        <Loading />
      </section>
    );
  }

  if (error || !awardsData?.awards) {
    return (
      <section id="awards" className={`w-full max-w-7xl mx-auto py-16 px-4 ${fontClass}`}>
        <h2 className={heading}>
          {t('awards_certifications', 'Awards & Certifications')}
        </h2>
        <div className={body + ' text-center text-lg text-base-content/60 py-12'}>
          {error || t('no_awards_data', 'No awards data available')}
        </div>
      </section>
    );
  }

  const filteredAwards = selectedCategory === 'all' 
    ? awardsData.awards 
    : awardsData.awards.filter(award => award.category === selectedCategory);

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
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
      y: -5,
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  const categoryButtons = [
    { key: 'all', label: t('all_awards', 'All'), icon: <FaAward className="w-4 h-4" /> },
    { key: 'award', label: t('awards', 'Awards'), icon: <FaTrophy className="w-4 h-4" /> },
    { key: 'achievement', label: t('achievements', 'Achievements'), icon: <FaMedal className="w-4 h-4" /> },
    { key: 'certification', label: t('certifications', 'Certifications'), icon: <FaCertificate className="w-4 h-4" /> }
  ];

  return (
    <section id="awards" className={`w-full max-w-7xl mx-auto py-16 px-4 md:px-12 ${fontClass}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className={heading}>
          {t('awards_certifications', 'Awards & Certifications')}
        </h2>
        <p className={body + ' text-lg max-w-2xl mx-auto'}>
          {t('awards_description', 'Recognition of my professional achievements, certifications, and contributions to the tech industry.')}
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div 
        className="flex flex-wrap justify-center gap-3 mb-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {categoryButtons.map((button) => (
          <motion.button
            key={button.key}
            variants={itemVariants}
            onClick={() => setSelectedCategory(button.key as 'all' | 'award' | 'achievement' | 'certification')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === button.key
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                : 'bg-base-200 text-base-content/70 hover:bg-base-300 hover:text-base-content'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {button.icon}
            {button.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Awards Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredAwards.map((award) => (
            <motion.div
              key={award.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="group relative bg-gradient-to-br from-base-100 to-base-200/50 backdrop-blur-sm border border-base-300/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Background Pattern */}
              <div className={`absolute inset-0 bg-gradient-to-br ${award.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Badge */}
              {award.badge && (
                <div className="absolute top-4 right-4 text-2xl animate-bounce">
                  {award.badge}
                </div>
              )}

              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${award.color} flex items-center justify-center mb-4 shadow-lg`}>
                {iconMap[award.icon] || <FaAward className="w-8 h-8 text-white" />}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-base-content mb-2 group-hover:text-primary transition-colors duration-300">
                {award.title}
              </h3>
              <p className="text-base-content/70 text-sm mb-3">
                {award.issuer}
              </p>
              <p className="text-base-content/80 text-sm mb-4 leading-relaxed">
                {award.description}
              </p>
              
              {/* Date */}
              <div className="text-xs text-base-content/60 mb-4">
                {new Date(award.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long' 
                })}
              </div>

              {/* Skills */}
              {award.skills && award.skills.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {award.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-base-300 text-xs rounded-full text-base-content/70"
                    >
                      {skill}
                    </span>
                  ))}
                  {award.skills.length > 3 && (
                    <span className="px-2 py-1 bg-base-300 text-xs rounded-full text-base-content/70">
                      +{award.skills.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Shine effect */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
                <div className={`absolute left-1/2 top-0 w-2/3 h-1/3 bg-gradient-to-r ${award.color} opacity-0 group-hover:opacity-20 blur-lg rotate-12 -translate-x-1/2 transition-all duration-500`} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredAwards.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">🎖️</div>
          <p className="text-base-content/60 text-lg">
            {t('no_awards_in_category', 'No awards found in this category.')}
          </p>
        </motion.div>
      )}
    </section>
  );
};

export default AwardsCertifications; 