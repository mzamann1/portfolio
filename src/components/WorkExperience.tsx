import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useLanguageFont } from '../hooks/useLanguageFont';
import { useWorkExperienceData } from '../hooks/usePortfolioData';
import { 
  FaRegCircle, 
  FaBriefcase, 
  FaStar, 
  FaCircle
} from "react-icons/fa";

// Type definition for achievement items
type AchievementItem = {
  text: string | (string | { bold: string | string[] })[];
  sub?: AchievementItem[];
  icon?: string;
};

const cardVariants = {
  hiddenLeft: { opacity: 0, x: -80, scale: 0.80 },
  hiddenRight: { opacity: 0, x: 80, scale: 0.80 },
  visible: { opacity: 1, x: 0, scale: 0.95, transition: { duration: 0.3, ease: 'easeOut' } },
};


// Helper to render achievement text with selective bolding
function renderAchievementText(textArr: (string | { bold: string | string[] })[]) {
  return textArr.map((part, i) => {
    if (typeof part === "string") return part;
    if (Array.isArray(part.bold)) {
      return part.bold.map((b, j) => (
        <span key={i + '-' + j} className="animate-gravity-bounce inline-block">
          <span className="font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {b}
          </span>
        </span>
      ));
    }
    return (
      <span key={i} className="animate-gravity-bounce inline-block">
        <span className="font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          {part.bold}
        </span>
      </span>
    );
  });
}

// Level-based icon mapping with professional icons
const levelIcons = [
  <FaBriefcase className="w-4 h-4" />,    // Level 1 - Main sections (Professional work)
  <FaStar className="w-4 h-4" />,         // Level 2 - Subsections (Key achievements)
  <FaCircle className="w-4 h-4" />        // Level 3 - Details (Specific points)
];

// Helper to render achievements (supports multi-level lists with level-based icons)
function renderAchievements(achievements: (string | AchievementItem)[], level = 0) {
  // Calculate indentation: 0 for top, 5 for level 1, 8 for level 2+
  const ml = level === 0 ? 'ml-0' : level === 1 ? 'ml-5' : 'ml-8';
  return (
    <ul className={`list-none ${ml} space-y-2 text-base-content/90 leading-relaxed`}>
      {achievements.map((item, idx) => {
        if (typeof item === 'string') {
          return (
            <li key={idx}>
              {level >= 1 && <FaRegCircle className="inline-block mr-2 text-primary align-middle" />}
              {item}
            </li>
          );
        } else {
          // Use level-based icon (level 1 = index 0, level 2 = index 1, level 3 = index 2)
          const iconIndex = Math.min(level - 1, levelIcons.length - 1);
          const IconComponent = level >= 1 ? levelIcons[iconIndex] : null;
          
          return (
            <li key={idx} className={level === 0 ? "mt-4" : ""}>
              {level >= 1 && (
                <span className="inline-block mr-2 text-primary align-middle">
                  {IconComponent || <FaRegCircle size={14} />}
                </span>
              )}
              <span className={
                level === 0
                  ? "font-extrabold not-italic text-base md:text-lg text-primary mb-2 inline-block"
                  : "not-italic text-base-content text-sm"
              }>
                {Array.isArray(item.text)
                  ? renderAchievementText(item.text)
                  : item.text}
              </span>
              {item.sub && item.sub.length > 0 && (
                <div className="mt-2">
                  {renderAchievements(item.sub, level + 1)}
                </div>
              )}
            </li>
          );
        }
      })}
    </ul>
  );
}

const WorkExperience = () => {
  const { t } = useTranslation();
  const { fontClass, heading, body } = useLanguageFont();
  const { data: workExperienceData, loading, error } = useWorkExperienceData();

  if (loading) {
    return (
      <section id="experience" className={`w-full container mx-auto py-16 px-4 md:px-12 ${fontClass}`}>
        <h2 className={heading}>
          {t('work_experience', 'Work Experience')}
        </h2>
        <div className={body + ' text-lg text-base-content/60 py-12'}>{t('loading', 'Loading...')}</div>
      </section>
    );
  }

  if (error || !workExperienceData?.experiences) {
    return (
      <section id="experience" className={`w-full container mx-auto py-16 px-4 md:px-12 ${fontClass}`}>
        <h2 className={heading}>
          {t('work_experience', 'Work Experience')}
        </h2>
        <div className={body + ' text-center text-lg text-base-content/60 py-12'}>
          {error || t('no_work_experience_data', 'No work experience data available')}
        </div>
      </section>
    );
  }

  const experiences = workExperienceData.experiences;

  return (
    <section id="experience" className={`w-full container mx-auto py-16 px-4 md:px-12 ${fontClass}`}>
      <h2 className={heading}>
        {t('work_experience', 'Work Experience')}
      </h2>
      <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
        {experiences && experiences.map((exp, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <li key={exp.title + exp.company}>
              {/* Left-aligned card */}
              {isLeft && (
                <div className="timeline-start">
                  <motion.div
                    className="bg-base-200 dark:bg-base-400 rounded-xl p-6 shadow-lg border border-base-300/60 transition-all duration-500 hover:shadow-2xl hover:border-primary/60"
                    initial="hiddenLeft"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <time className="font-mono italic text-base-content/60 block mb-1">{exp.from} – {exp.to}</time>
                    <div className="text-lg font-black font-inter text-base-content mb-1 text-center w-full">
                      {exp.title}
                    </div>
                    <div className="text-base font-medium text-base-content/70 italic mb-4 text-center w-full">
                      {exp.company}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4 justify-center">
                      {exp.skills.map((skill) => (
                        <span key={skill} className="badge badge-accent badge-md text-md font-sans">{skill}</span>
                      ))}
                    </div>
                    {/* Achievements */}
                    <div className="mt-4">
                      {renderAchievements(exp.achievements)}
                    </div>
                  </motion.div>
                </div>
              )}
              {/* Timeline marker */}
              <div className="timeline-middle z-20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 text-primary">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
              </div>
              {/* Right-aligned card */}
              {!isLeft && (
                <div className="timeline-end">
                  <motion.div
                    className="bg-base-200 dark:bg-base-400 rounded-xl p-6 shadow-lg border border-base-300/60 transition-all duration-500 hover:shadow-2xl hover:border-primary/60"
                    initial="hiddenRight"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <time className="font-mono italic text-base-content/60 block mb-1">{exp.from} – {exp.to}</time>
                    <div className="text-lg font-black font-inter text-base-content mb-1 text-center w-full">
                      {exp.title}
                    </div>
                    <div className="text-base font-medium text-base-content/70 italic mb-4 text-center w-full">
                      {exp.company}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4 justify-center">
                      {exp.skills.map((skill) => (
                        <span key={skill} className="badge badge-accent badge-md text-md font-sans">{skill}</span>
                      ))}
                    </div>
                    {/* Achievements */}
                    <div className="mt-4">
                      {renderAchievements(exp.achievements)}
                    </div>
                  </motion.div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default WorkExperience; 