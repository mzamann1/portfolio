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
  const { fontClass, heading, body, getFontClass } = useLanguageFont();

  const skills = [
    { name: 'React', level: 90, color: 'from-blue-500 to-cyan-500', icon: <SiReact className="w-5 h-5" /> },
    { name: 'TypeScript', level: 85, color: 'from-blue-600 to-blue-800', icon: <SiTypescript className="w-5 h-5" /> },
    { name: 'Tailwind CSS', level: 95, color: 'from-cyan-500 to-blue-500', icon: <SiTailwindcss className="w-5 h-5" /> },
    { name: 'Node.js', level: 80, color: 'from-green-500 to-green-700', icon: <SiNodedotjs className="w-5 h-5" /> },
    { name: 'Next.js', level: 85, color: 'from-gray-800 to-black', icon: <SiNextdotjs className="w-5 h-5" /> },
    { name: 'Docker', level: 75, color: 'from-blue-500 to-blue-700', icon: <SiDocker className="w-5 h-5" /> },
  ];

  return (
    <section id="about" className={`py-20 bg-base-100/80 backdrop-blur ${fontClass}`}>
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-16">
          <h2 className={heading}>
            {t('about')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <div className="space-y-6">
            <div className="card bg-base-200/80 backdrop-blur border border-base-300/40 shadow-xl rounded-2xl hover:shadow-2xl transition-shadow duration-300">
              <div className="card-body">
                <h3 className={getFontClass({ weight: 'bold', size: '2xl' }) + ' mb-4'}>
                  {t('about_title', 'Frontend Developer & UI/UX Enthusiast')}
                </h3>
                <p className={body}>
                  {t('about_description', 'I am a passionate frontend developer with expertise in creating stunning, responsive, and user-friendly web applications. With a strong foundation in modern web technologies, I bring ideas to life through clean code and beautiful design.')}
                </p>
                <p className={body}>
                  {t('about_experience', 'With years of experience in React, TypeScript, and modern CSS frameworks, I specialize in building scalable applications that deliver exceptional user experiences.')}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="card bg-gradient-to-br from-primary/10 to-primary/5 text-center p-4 rounded-xl border border-primary/20 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-primary">3+</div>
                <div className="text-sm text-base-content/70">{t('years_experience', 'Years Experience')}</div>
              </div>
              <div className="card bg-gradient-to-br from-secondary/10 to-secondary/5 text-center p-4 rounded-xl border border-secondary/20 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-secondary">50+</div>
                <div className="text-sm text-base-content/70">{t('projects_completed', 'Projects')}</div>
              </div>
              <div className="card bg-gradient-to-br from-accent/10 to-accent/5 text-center p-4 rounded-xl border border-accent/20 hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-accent">100%</div>
                <div className="text-sm text-base-content/70">{t('client_satisfaction', 'Satisfaction')}</div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6">{t('skills', 'Skills & Technologies')}</h3>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-primary">{skill.icon}</span>
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <span className="text-sm text-base-content/70">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-base-300 rounded-full h-2">
                    <div 
                      className={`h-2 bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Download CV Button */}
            <div className="pt-6">
              <button className="btn btn-primary btn-wide rounded-xl shadow-md">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {t('download_cv', 'Download CV')}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About; 