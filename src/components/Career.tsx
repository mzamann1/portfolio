import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaAward } from 'react-icons/fa';
import Timeline from './shared/Timeline';
import ScrollRevealSection from './shared/ScrollRevealSection';
import SplitText from './shared/SplitText';
import { useCVData } from './CVDataProvider';
import { mapWorkExperienceToTimelineItemProps, mapEducationToTimelineItemProps, mapAchievementsToTimelineItemProps } from '../mappers';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Text3D from './shared/Text3D';
import TextGlitch from './shared/TextGlitch';
import MorphingShape from './shared/MorphingShape';

// Floating element animation
interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

const FloatingElement = ({ children, delay = 0, duration = 5, className = "" }: FloatingElementProps) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -10, 0],
        rotate: [0, 1, 0, -1, 0]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "loop"
      }}
    >
      {children}
    </motion.div>
  );
};

const Career = () => {
  const { t } = useTranslation();
  const { carrierJourney } = useCVData();
  const [activeSection, setActiveSection] = useState<string>("work");

  const sections = [
    { 
      id: "work", 
      label: t('career.work'), 
      icon: FaBriefcase 
    },
    { 
      id: "education", 
      label: t('career.education'), 
      icon: FaGraduationCap 
    },
    { 
      id: "achievements", 
      label: t('career.achievements'), 
      icon: FaAward 
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="career" className="py-24 relative overflow-hidden">
      <MorphingShape className="top-0 left-0 w-full h-full opacity-20" />

      <div className="container relative z-10">
        <ScrollRevealSection>
          <div className="text-center mb-16">
            <Text3D className="text-4xl md:text-5xl font-bold mb-2">
              <TextGlitch text={t('career.title')} glitchInterval={5000} />
            </Text3D>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-light-accent to-blue-500 dark:from-dark-accent dark:to-blue-400 mx-auto mb-8 rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "6rem", opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
            <motion.p
              className="text-light-textSecondary dark:text-dark-textSecondary max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              {t('career.subtitle')}
            </motion.p>
          </div>
        </ScrollRevealSection>

        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-full bg-light-secondary/50 dark:bg-dark-secondary/50 backdrop-blur-sm p-1.5 shadow-lg">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-5 py-2 rounded-full flex items-center space-x-2 transition-all duration-300 ${
                  activeSection === section.id 
                    ? 'bg-light-accent dark:bg-dark-accent text-white shadow-md' 
                    : 'text-light-text dark:text-dark-text hover:bg-light-secondary dark:hover:bg-dark-secondary'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <section.icon className="text-sm" />
                <span>{section.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="relative">
          {activeSection === 'work' && (
            <Timeline items={mapWorkExperienceToTimelineItemProps(carrierJourney!.workExperiences)} />
          )}
          {activeSection === 'education' && (
            <Timeline items={mapEducationToTimelineItemProps(carrierJourney!.education)} />
          )}
          {activeSection === 'achievements' && (
            <Timeline items={mapAchievementsToTimelineItemProps(carrierJourney!.certifications)} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Career; 