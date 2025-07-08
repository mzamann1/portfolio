import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import type { WorkExperienceItem } from '../types/WorkExperienceItem';

const cardVariants = {
  hiddenLeft: { opacity: 0, x: -80, scale: 0.95 },
  hiddenRight: { opacity: 0, x: 80, scale: 0.95 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8, ease: 'easeOut' } },
};

const markerVariants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 400, damping: 20 } },
};

const WorkExperience = () => {
  const { i18n, t } = useTranslation();
  const [experiences, setExperiences] = useState<WorkExperienceItem[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const lang = i18n.language.split('-')[0];
    const url = `/data/${lang}/work-experience.json`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setExperiences(data.experiences);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [i18n.language]);

  return (
    <section id="experience" className="w-full max-w-7xl mx-auto py-16 px-4">
      <h2 className="font-inter font-extrabold text-3xl md:text-4xl mb-16 text-primary text-center">
        {t('work_experience', 'Work Experience')}
      </h2>
      {loading ? (
        <div className="text-center text-lg text-base-content/60 py-12">{t('loading', 'Loading...')}</div>
      ) : (
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
          {experiences && experiences.map((exp, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <li key={exp.title + exp.company}>
                {idx !== 0 && <hr />}
                <motion.div
                  className="timeline-middle z-20"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.7 }}
                  variants={markerVariants}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 text-primary">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                </motion.div>
                <motion.div
                  className={
                    (isLeft ? "timeline-start mb-10 md:text-end" : "timeline-end md:mb-10") +
                    " bg-base-200 rounded-xl p-6 shadow-lg border border-base-300 transition-all duration-300 hover:shadow-2xl hover:border-primary/60"
                  }
                  initial={isLeft ? 'hiddenLeft' : 'hiddenRight'}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={cardVariants}
                >
                  <time className="font-mono italic text-base-content/60 block mb-1">{exp.from} – {exp.to}</time>
                  <div className="text-lg font-black font-inter text-base-content mb-2">{exp.title} @ {exp.company}</div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {exp.skills.map((skill) => (
                      <span key={skill} className="badge badge-accent badge-md text-md font-sans">{skill}</span>
                    ))}
                  </div>
                  <ul className="list-disc ml-5 text-base-content/80">
                    {exp.achievements.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                </motion.div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default WorkExperience; 