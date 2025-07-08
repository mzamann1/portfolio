import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  FaTrophy, 
  FaMedal, 
  FaCertificate, 
  FaStar, 
  FaAward,
  FaCode,
  FaUsers,
  FaRocket,
  FaLightbulb
} from 'react-icons/fa';

type Award = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  category: 'award' | 'achievement' | 'certification';
  icon: React.ReactNode;
  color: string;
  badge?: string;
  verificationUrl?: string;
};

const AwardsCertifications = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'award' | 'achievement' | 'certification'>('all');

  const awards: Award[] = [
    {
      id: '1',
      title: 'Microsoft Certified: Azure Developer Associate',
      issuer: 'Microsoft',
      date: 'Dec 2023',
      description: 'Certified in developing Azure solutions using cloud-native technologies and services.',
      category: 'certification',
      icon: <FaCertificate className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      verificationUrl: 'https://learn.microsoft.com/en-us/certifications/azure-developer/'
    },
    {
      id: '2',
      title: 'Best Performance Award',
      issuer: 'Astera Software',
      date: 'Jan 2024',
      description: 'Recognized for exceptional performance and contribution to the HRMS project development.',
      category: 'award',
      icon: <FaTrophy className="w-6 h-6" />,
      color: 'from-yellow-500 to-yellow-600',
      badge: '🏆'
    },
    {
      id: '3',
      title: 'React Developer Certification',
      issuer: 'Meta',
      date: 'Nov 2023',
      description: 'Advanced React development certification covering hooks, context, and modern patterns.',
      category: 'certification',
      icon: <FaCode className="w-6 h-6" />,
      color: 'from-cyan-500 to-blue-500',
      verificationUrl: 'https://www.coursera.org/account/accomplishments/certificate/EXAMPLE'
    },
    {
      id: '4',
      title: 'Team Leadership Excellence',
      issuer: 'Techlogix Pakistan',
      date: 'Mar 2022',
      description: 'Awarded for successfully leading a team of 5 developers in microservices architecture implementation.',
      category: 'achievement',
      icon: <FaUsers className="w-6 h-6" />,
      color: 'from-green-500 to-green-600'
    },
    {
      id: '5',
      title: 'Innovation Award',
      issuer: 'ZEPCOM',
      date: 'Sep 2022',
      description: 'Recognized for innovative approach in implementing Blazor Web Assembly solutions.',
      category: 'achievement',
      icon: <FaLightbulb className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: '6',
      title: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      date: 'Jun 2023',
      description: 'Certified in developing and maintaining applications on the AWS platform.',
      category: 'certification',
      icon: <FaCertificate className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-600',
      verificationUrl: 'https://aws.amazon.com/certification/certified-developer-associate/'
    },
    {
      id: '7',
      title: 'Employee of the Month',
      issuer: 'Leaptech Solutions',
      date: 'Feb 2020',
      description: 'Recognized for outstanding contribution to the accounting system development project.',
      category: 'award',
      icon: <FaStar className="w-6 h-6" />,
      color: 'from-pink-500 to-pink-600',
      badge: '⭐'
    },
    {
      id: '8',
      title: 'Fastest Project Delivery',
      issuer: 'Techlogix Pakistan',
      date: 'Dec 2021',
      description: 'Achieved 30% faster project delivery through optimized development processes.',
      category: 'achievement',
      icon: <FaRocket className="w-6 h-6" />,
      color: 'from-red-500 to-red-600'
    }
  ];

  const filteredAwards = selectedCategory === 'all' 
    ? awards 
    : awards.filter(award => award.category === selectedCategory);

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
    <section id="awards" className="w-full max-w-7xl mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="font-inter font-extrabold text-3xl md:text-4xl mb-4 text-primary">
          {t('awards_certifications', 'Awards & Certifications')}
        </h2>
        <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
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
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredAwards.map((award) => (
            <motion.div
              key={award.id}
              variants={itemVariants}
              whileHover="hover"
              className="group relative bg-base-200 rounded-2xl p-6 shadow-lg border border-base-300 hover:border-primary/30 transition-all duration-300 flex flex-col min-h-[340px]"
            >
              {/* Badge */}
              {award.badge && (
                <div className="absolute -top-2 -right-2 text-2xl animate-bounce">
                  {award.badge}
                </div>
              )}

              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-r ${award.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {award.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-inter font-bold text-lg text-base-content mb-1 line-clamp-2">
                    {award.title}
                  </h3>
                  <p className="text-sm text-primary font-medium">
                    {award.issuer}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="mb-3">
                <span className="text-xs text-base-content/60 bg-base-300 px-2 py-1 rounded-full">
                  {award.date}
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-base-content/70 leading-relaxed mb-4">
                {award.description}
              </p>

              {/* Category Badge */}
              <div className="flex justify-between items-center">
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  award.category === 'award' ? 'bg-yellow-100 text-yellow-800' :
                  award.category === 'achievement' ? 'bg-green-100 text-green-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {award.category === 'award' ? t('award', 'Award') :
                   award.category === 'achievement' ? t('achievement', 'Achievement') :
                   t('certification', 'Certification')}
                </span>
                {/* Hover Effect */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                </div>
              </div>

              {/* Verification Button for Certifications */}
              {award.category === 'certification' && award.verificationUrl && (
                <div className="mt-auto pt-4">
                  <a
                    href={award.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full text-center px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow hover:from-secondary hover:to-primary transition-all duration-300 border border-primary/30"
                  >
                    {t('verify_certificate', 'Verify Certificate')}
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-16 text-center"
      >
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20">
          <h3 className="font-inter font-bold text-xl mb-6 text-primary">
            {t('achievements_summary', 'Achievements Summary')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div>
              <div className="font-bold text-2xl text-primary">
                {awards.filter(a => a.category === 'award').length}
              </div>
              <div className="text-base-content/70">{t('awards_count', 'Awards')}</div>
            </div>
            <div>
              <div className="font-bold text-2xl text-primary">
                {awards.filter(a => a.category === 'achievement').length}
              </div>
              <div className="text-base-content/70">{t('achievements_count', 'Achievements')}</div>
            </div>
            <div>
              <div className="font-bold text-2xl text-primary">
                {awards.filter(a => a.category === 'certification').length}
              </div>
              <div className="text-base-content/70">{t('certifications_count', 'Certifications')}</div>
            </div>
            <div>
              <div className="font-bold text-2xl text-primary">
                {awards.length}
              </div>
              <div className="text-base-content/70">{t('total_recognition', 'Total Recognition')}</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AwardsCertifications; 