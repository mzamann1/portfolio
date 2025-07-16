import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  SiReact, 
  SiTypescript, 
  SiTailwindcss, 
  SiNodedotjs, 
  SiNextdotjs, 
  SiDocker 
} from 'react-icons/si';
import { useLanguageFont } from '../hooks/useLanguageFont';

const About = () => {
  const { t } = useTranslation();
  const { heading, body } = useLanguageFont();

  const skills = [
    { name: 'React', level: 90, color: 'from-blue-500 to-cyan-500', icon: <SiReact className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { name: 'TypeScript', level: 85, color: 'from-blue-600 to-blue-800', icon: <SiTypescript className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { name: 'Tailwind CSS', level: 95, color: 'from-cyan-500 to-blue-500', icon: <SiTailwindcss className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { name: 'Node.js', level: 80, color: 'from-green-500 to-green-700', icon: <SiNodedotjs className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { name: 'Next.js', level: 85, color: 'from-gray-800 to-black', icon: <SiNextdotjs className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { name: 'Docker', level: 75, color: 'from-blue-500 to-blue-700', icon: <SiDocker className="w-4 h-4 sm:w-5 sm:h-5" /> },
  ];

  // Define unique gradients for each skill
  const skillGradients = [
    'linear-gradient(90deg, #06b6d4 0%, #3b82f6 100%)', // React
    'linear-gradient(90deg, #3178c6 0%, #38bdf8 100%)', // TypeScript
    'linear-gradient(90deg, #06b6d4 0%, #818cf8 100%)', // Tailwind
    'linear-gradient(90deg, #22c55e 0%, #16a34a 100%)', // Node.js
    'linear-gradient(90deg, #f59e42 0%, #a21caf 100%)', // Next.js
    'linear-gradient(90deg, #2563eb 0%, #0ea5e9 100%)', // Docker
  ];

  return (
    <section id="about" data-section="about" className="min-h-screen flex items-center py-12 sm:py-16 md:py-20 bg-base-100/90">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-16 items-center">
        {/* Left: About & Stats */}
        <div>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ${heading}`}>
            {t('about')}
          </h2>
          <p className={`text-sm sm:text-base md:text-lg text-base-content/80 mb-4 sm:mb-5 md:mb-6 ${body} leading-relaxed`}>
            {t('about_description', 'I am a passionate frontend developer with expertise in creating stunning, responsive, and user-friendly web applications. With a strong foundation in modern web technologies, I bring ideas to life through clean code and beautiful design.')}
          </p>
          <div className="flex flex-row justify-between gap-2 sm:gap-4 md:gap-8 mb-4 sm:mb-6 md:mb-8 w-full max-w-xl">
            {[{ label: t('years_experience', 'Years Experience'), value: 5, suffix: '+' }, { label: t('projects_completed', 'Projects'), value: 50, suffix: '+' }, { label: t('client_satisfaction', 'Satisfaction'), value: 100, suffix: '%' }].map(stat => (
              <div key={stat.label} className="text-center flex-1 min-w-0">
                <div className={`text-2xl sm:text-3xl md:text-4xl font-bold text-primary ${heading}`}>{stat.value}{stat.suffix}</div>
                <div className={`text-xs sm:text-sm text-base-content/60 ${body}`}>{stat.label}</div>
              </div>
            ))}
          </div>
          <button className={`btn btn-primary btn-sm sm:btn-md lg:btn-lg px-6 sm:px-8 md:px-10 rounded-full mx-auto shadow-md font-bold flex items-center justify-center gap-2 hover:scale-105 transition text-sm sm:text-base ${body}`}>
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {t('download_cv', 'Download CV')}
          </button>
        </div>
        {/* Right: Skills */}
        <div className="space-y-4 sm:space-y-6 w-full max-w-xl mx-auto">
          <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-2 md:mb-4 ${heading}`}>{t('skills', 'Skills')}</h3>
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            {skills.map((skill, idx) => (
              <div key={skill.name}>
                <div className="flex items-center gap-2 md:gap-3 mb-1">
                  <span className="text-base sm:text-lg md:text-xl">{skill.icon}</span>
                  <span className={`font-medium text-xs sm:text-sm md:text-base ${body}`}>{skill.name}</span>
                </div>
                <div className="relative w-full h-2 sm:h-2.5 md:h-3 bg-base-300 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-2 sm:h-2.5 md:h-3 rounded-full shadow-lg"
                    style={{
                      background: skillGradients[idx % skillGradients.length],
                    }}
                    initial={{ width: 0, boxShadow: '0 0 0px 0px #fff0' }}
                    whileInView={{ width: `${skill.level}%`, boxShadow: '0 0 16px 2px #fff3' }}
                    transition={{ width: { duration: 1.2, ease: 'easeOut' }, boxShadow: { duration: 1.2, ease: 'easeOut' } }}
                  />
                  <span className="absolute right-1 sm:right-2 md:right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-base-content/70">
                    {skill.level}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 