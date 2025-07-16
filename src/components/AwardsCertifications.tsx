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
import { SiTypescript, SiDatacamp, SiUdemy, SiHackerrank, SiLinkedin, SiCoursera } from 'react-icons/si';
import { useLanguageFont } from '../hooks/useLanguageFont';

const iconMap: Record<string, React.ReactNode> = {
  FaTrophy: <FaTrophy className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaMedal: <FaMedal className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaCertificate: <FaCertificate className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaStar: <FaStar className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaCode: <FaCode className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaUsers: <FaUsers className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaRocket: <FaRocket className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaLightbulb: <FaLightbulb className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaGithub: <FaGithub className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaPalette: <FaPalette className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaTachometerAlt: <FaTachometerAlt className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaShieldAlt: <FaShieldAlt className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaAws: <FaAws className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  FaReact: <FaReact className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  SiTypescript: <SiTypescript className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  SiDatacamp: <SiDatacamp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600" />,
  SiUdemy: <SiUdemy className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#A435F0]" />,
  SiHackerrank: <SiHackerrank className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#2EC866]" />,
  SiLinkedin: <SiLinkedin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#0077B5]" />,
  SiCoursera: <SiCoursera className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#0056D2]" />,
};

const AwardsCertifications = () => {
  const { t, i18n } = useTranslation();
  const { data: awardsData, loading, error } = useAwardsData();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'award' | 'achievement' | 'certification'>('all');
  const { fontClass, heading, body } = useLanguageFont();
  const isRTL = i18n.dir() === 'rtl';
  const isArabic = i18n.language.startsWith('ar');

  if (loading) {
    return (
      <section id="awards" className={`w-full max-w-7xl mx-auto py-8 sm:py-16 px-4 ${fontClass}`}>
        <h2 className={`${heading} text-2xl sm:text-3xl md:text-4xl mb-4`}>
          {t('awards_certifications', 'Awards & Certifications')}
        </h2>
        <Loading />
      </section>
    );
  }

  if (error || !awardsData?.awards) {
    return (
      <section id="awards" className={`w-full max-w-7xl mx-auto py-8 sm:py-16 px-4 ${fontClass}`}>
        <h2 className={`${heading} text-2xl sm:text-3xl md:text-4xl mb-4`}>
          {t('awards_certifications', 'Awards & Certifications')}
        </h2>
        <div className={`${body} text-center text-base sm:text-lg text-base-content/60 py-8 sm:py-12`}>
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
      y: -3,
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  const categoryButtons = [
    { key: 'all', label: t('all_awards', 'All'), icon: <FaAward className="w-3 h-3 sm:w-4 sm:h-4" /> },
    { key: 'award', label: t('awards', 'Awards'), icon: <FaTrophy className="w-3 h-3 sm:w-4 sm:h-4" /> },
    { key: 'achievement', label: t('achievements', 'Achievements'), icon: <FaMedal className="w-3 h-3 sm:w-4 sm:h-4" /> },
    { key: 'certification', label: t('certifications', 'Certifications'), icon: <FaCertificate className="w-3 h-3 sm:w-4 sm:h-4" /> }
  ];

  return (
    <section id="awards" className={`w-full max-w-7xl mx-auto py-8 sm:py-16 px-4 md:px-12 ${fontClass}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 sm:mb-12"
      >
        <h2 className={`${heading} text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6`}>
          {t('awards_certifications', 'Awards & Certifications')}
        </h2>
        <p className={`${body} text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2`}>
          {t('awards_description', 'Recognition of my professional achievements, certifications, and contributions to the tech industry.')}
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div 
        className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2"
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
            className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm md:text-base ${
              selectedCategory === button.key
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
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
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {filteredAwards.map((award) => (
            <motion.div
              key={award.id}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="group relative bg-gradient-to-br from-base-100 to-base-200/50 backdrop-blur-sm border-2 border-base-300/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg sm:shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:border-primary/50"
            >
              {/* Background Pattern */}
              <div className={`absolute inset-0 bg-gradient-to-br ${award.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Badge */}
              {award.badge && (
                <div className={`absolute top-2 sm:top-4 ${isRTL ? 'left-2 sm:left-4' : 'right-2 sm:right-4'} text-lg sm:text-2xl animate-bounce`}>
                  {award.badge}
                </div>
              )}

              {/* Icon */}
              <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg ${award.icon === 'SiDatacamp' ? 'bg-emerald-500' : award.icon === 'SiUdemy' ? 'bg-white' : award.icon === 'SiHackerrank' ? 'bg-white' : award.icon === 'SiLinkedin' ? 'bg-white' : award.icon === 'SiCoursera' ? 'bg-white' : 'bg-gradient-to-r ' + award.color}`}> 
                {award.icon === 'SiDatacamp'
                  ? <SiDatacamp className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-black" />
                  : award.icon === 'SiUdemy'
                    ? <SiUdemy className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#A435F0]" />
                    : award.icon === 'SiHackerrank'
                      ? <SiHackerrank className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#2EC866]" />
                      : award.icon === 'SiLinkedin'
                        ? <SiLinkedin className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#0077B5]" />
                        : award.icon === 'SiCoursera'
                          ? <SiCoursera className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#0056D2]" />
                          : (iconMap[award.icon] || <FaAward className="w-6 h-6 sm:w-8 sm:h-8 text-white" />)
                }
              </div>

              {/* Content */}
              <h3 className={`text-base sm:text-lg md:text-xl font-bold text-base-content mb-2 group-hover:text-primary transition-colors duration-300 ${isArabic ? 'text-lg sm:text-xl md:text-2xl' : ''}`}>
                {award.title}
              </h3>
              <p className={`text-base-content/70 text-xs sm:text-sm ${isArabic ? 'text-sm sm:text-base' : ''} mb-2 sm:mb-3`}>
                {award.issuer}
              </p>
              <p className={`text-base-content/80 text-xs sm:text-sm ${isArabic ? 'text-sm sm:text-lg' : ''} mb-3 sm:mb-4 leading-relaxed`}>
                {award.description}
              </p>
              {/* Verification Link */}
              {award.url && (
                <a
                  href={award.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 mb-2 sm:mb-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-200 text-xs font-semibold shadow-sm z-20 relative ${isArabic ? 'text-sm sm:text-base' : ''}`}
                  style={{ position: 'relative', zIndex: 20 }}
                >
                  {t('show_credential', 'Show credential')}
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7m0 0v7m0-7L10 14m-7 7h7a2 2 0 002-2v-7" /></svg>
                </a>
              )}
              
              {/* Date */}
              <div className={`mb-3 sm:mb-4 text-base-content/60 text-xs sm:text-sm ${isArabic ? 'text-sm sm:text-base' : ''}`}>
                {isArabic
                  ? new Date(award.date).toLocaleDateString('ar', { year: 'numeric', month: 'long', numberingSystem: 'arab' })
                  : new Date(award.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
              </div>

              {/* Skills */}
              {award.skills && award.skills.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {award.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-base-300 text-xs rounded-full text-base-content/70"
                    >
                      {skill}
                    </span>
                  ))}
                  {award.skills.length > 3 && (
                    <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-base-300 text-xs rounded-full text-base-content/70">
                      +{award.skills.length - 3}
                    </span>
                  )}
                </div>
              )}

              {/* Shine effect */}
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl pointer-events-none overflow-hidden">
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
          className="text-center py-8 sm:py-12"
        >
          <div className="text-4xl sm:text-6xl mb-4">🎖️</div>
          <p className="text-base-content/60 text-sm sm:text-base md:text-lg">
            {t('no_awards_in_category', 'No awards found in this category.')}
          </p>
        </motion.div>
      )}
    </section>
  );
};

export default AwardsCertifications; 