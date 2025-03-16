import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaAward } from 'react-icons/fa';
import Timeline from './shared/Timeline';
import ScrollRevealSection from './shared/ScrollRevealSection';
import SplitText from './shared/SplitText';
import { useCVData } from './CVDataProvider';
import { mapWorkExperienceToTimelineItemProps, mapEducationToTimelineItemProps, mapAchievementsToTimelineItemProps } from '../mappers';
import { useState } from 'react';

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
  // Get CV data from Redux via context
  const { carrierJourney } = useCVData();

  // State for active section
  const [activeSection, setActiveSection] = useState<string>("work");

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
    <section id="career" className="py-20 bg-light-primary dark:bg-dark-primary relative overflow-hidden">
      {/* Background gradient circles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-light-accent/5 dark:bg-dark-accent/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-500/5 dark:bg-blue-400/5 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollRevealSection>
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              My <span className="text-light-accent dark:text-dark-accent">Career</span> Journey
            </h2>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-light-accent to-blue-500 dark:from-dark-accent dark:to-blue-400 mx-auto mb-6 rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "6rem", opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            ></motion.div>
            <p className="text-light-textSecondary dark:text-dark-textSecondary max-w-2xl mx-auto">
              A timeline of my professional experience, education, and achievements.
            </p>
          </motion.div>
        </ScrollRevealSection>

        {/* Section Navigation - Enhanced with horizontal tab design */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-full bg-light-secondary/50 dark:bg-dark-secondary/50 backdrop-blur-sm p-1.5 shadow-lg">
            {[
              { id: "work", label: "Work", icon: FaBriefcase },
              { id: "education", label: "Education", icon: FaGraduationCap },
              { id: "achievements", label: "Achievements", icon: FaAward }
            ].map((section) => (
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

        {/* Timeline Sections - Using relative positioning to ensure all content is visible */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {activeSection === "work" && (
              <motion.div
                key="work"
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                variants={containerVariants}
              >
                <div className="flex items-center mb-8">
                  <FloatingElement delay={0.2} duration={6}>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent">
                      <FaBriefcase className="text-xl" />
                    </div>
                  </FloatingElement>
                  <motion.h3
                    className="text-2xl font-bold ml-4"
                    variants={itemVariants}
                  >
                    <SplitText>Work Experience</SplitText>
                  </motion.h3>
                </div>
                <Timeline items={mapWorkExperienceToTimelineItemProps(carrierJourney!.workExperiences)} />
              </motion.div>
            )}

            {/* Education */}
            {activeSection === "education" && (
              <motion.div
                key="education"
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                variants={containerVariants}
              >
                <div className="flex items-center mb-8">
                  <FloatingElement delay={0.3} duration={5}>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent">
                      <FaGraduationCap className="text-xl" />
                    </div>
                  </FloatingElement>
                  <motion.h3
                    className="text-2xl font-bold ml-4"
                    variants={itemVariants}
                  >
                    <SplitText>Education</SplitText>
                  </motion.h3>
                </div>
                <Timeline items={mapEducationToTimelineItemProps(carrierJourney!.education)} />
              </motion.div>
            )}

            {/* Achievements */}
            {activeSection === "achievements" && (
              <motion.div
                key="achievements"
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                variants={containerVariants}
              >
                <div className="flex items-center mb-8">
                  <FloatingElement delay={0.4} duration={7}>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent">
                      <FaAward className="text-xl" />
                    </div>
                  </FloatingElement>
                  <motion.h3
                    className="text-2xl font-bold ml-4"
                    variants={itemVariants}
                  >
                    <SplitText>Achievements</SplitText>
                  </motion.h3>
                </div>
                <Timeline items={mapAchievementsToTimelineItemProps(carrierJourney!.certifications)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Career; 