import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaUniversity, FaCalendarAlt, FaGraduationCap } from 'react-icons/fa';
import { useEducationData } from '../hooks/usePortfolioData';
import Loading from './Loading';
import { useLanguageFont } from '../hooks/useLanguageFont';

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const Education = () => {
  const { t } = useTranslation();
  const { data: educationData, loading, error } = useEducationData();
  const { fontClass, heading, body, getFontClass } = useLanguageFont();

  if (loading) {
    return (
      <section id="education" className={`w-full max-w-7xl mx-auto py-16 px-4 ${fontClass}`}>
        <h2 className={heading}>
          {t('education', 'Education')}
        </h2>
        <Loading />
      </section>
    );
  }

  if (error || !educationData?.education) {
    return (
      <section id="education" className={`w-full max-w-7xl mx-auto py-16 px-4 ${fontClass}`}>
        <h2 className={heading}>
          {t('education', 'Education')}
        </h2>
        <div className={body + ' text-center text-lg text-base-content/60 py-12'}>
          {error || t('no_education_data', 'No education data available')}
        </div>
      </section>
    );
  }

  return (
    <section id="education" className={`w-full max-w-7xl mx-auto py-16 px-4 ${fontClass}`}>
      <h2 className={heading}>
        {t('education', 'Education')}
      </h2>
      <div className="flex flex-col items-center gap-10">
        {educationData.education.map((edu, index) => (
          <motion.div
            key={edu.id}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(80,0,200,0.18)', y: -6 }}
            transition={{ delay: index * 0.1 }}
            className="relative group bg-gradient-to-br from-base-200 via-base-100 to-base-300 dark:from-base-300 dark:to-base-200 rounded-2xl p-8 shadow-xl border border-base-300/60 hover:border-primary/60 transition-all duration-300 cursor-pointer w-full max-w-2xl overflow-visible"
          >
            {/* Timeline Dot */}
            <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary shadow-lg border-4 border-base-100 flex items-center justify-center">
              <FaGraduationCap className="text-white w-4 h-4" />
            </span>
            {/* Degree Badge */}
            <span className="absolute -top-5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-content text-xs font-bold shadow-md border border-primary/30">
              {edu.degree}
            </span>
            <div className="flex flex-col items-center gap-2 mt-6">
              <div className="flex items-center gap-2 text-lg font-bold text-base-content">
                <FaUniversity className="text-secondary w-5 h-5" />
                {edu.institution}
              </div>
              <div className="flex items-center gap-2 text-base text-base-content/80">
                <FaCalendarAlt className="text-accent w-4 h-4" />
                {edu.from} – {edu.to}
              </div>
              {edu.gpa && (
                <div className="flex items-center gap-2 text-base text-base-content/80">
                  <span className="font-semibold">GPA:</span> {edu.gpa}
                </div>
              )}
              {edu.description && (
                <p className="text-center text-sm text-base-content/70 mt-2 max-w-md">
                  {edu.description}
                </p>
              )}
              {edu.achievements && edu.achievements.length > 0 && (
                <div className="mt-4 w-full">
                  <h4 className="font-semibold text-base-content mb-2 text-center">
                    {t('achievements', 'Achievements')}:
                  </h4>
                  <ul className="list-disc list-inside text-sm text-base-content/80 space-y-1">
                    {edu.achievements.slice(0, 3).map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {/* Shine effect */}
            <span className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
              <span className="absolute left-1/2 top-0 w-2/3 h-1/3 bg-gradient-to-r from-white/40 to-transparent opacity-0 group-hover:opacity-60 blur-lg rotate-12 -translate-x-1/2 transition-all duration-500" />
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Education; 