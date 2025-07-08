import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageToggle from './LanguageToggle.tsx';
import ThemeToggle from './ThemeToggle.tsx';
import { FaHome, FaUser, FaBriefcase, FaAward, FaProjectDiagram, FaEnvelope, FaGraduationCap, FaStar, FaLightbulb } from 'react-icons/fa';

const Navigation = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const [activeSection, setActiveSection] = useState('hero');

  // All main sections
  const navItems = [
    {
      name: t('hero', 'Home'),
      href: '#hero',
      id: 'hero',
      icon: <FaHome className="w-5 h-5" />,
    },
    {
      name: t('about', 'About'),
      href: '#about',
      id: 'about',
      icon: <FaUser className="w-5 h-5" />,
    },
    {
      name: t('experience', 'Work Experience'),
      href: '#experience',
      id: 'experience',
      icon: <FaBriefcase className="w-5 h-5" />,
    },
    {
      name: t('core_skills', 'Core Skills'),
      href: '#core-skills',
      id: 'core-skills',
      icon: <FaStar className="w-5 h-5" />,
    },
    {
      name: t('soft_skills', 'Soft Skills'),
      href: '#soft-skills',
      id: 'soft-skills',
      icon: <FaLightbulb className="w-5 h-5" />,
    },
    {
      name: t('education', 'Education'),
      href: '#education',
      id: 'education',
      icon: <FaGraduationCap className="w-5 h-5" />,
    },
    {
      name: t('awards_certifications', 'Awards & Certifications'),
      href: '#awards',
      id: 'awards',
      icon: <FaAward className="w-5 h-5" />,
    },
    {
      name: t('projects', 'Projects'),
      href: '#projects',
      id: 'projects',
      icon: <FaProjectDiagram className="w-5 h-5" />,
    },
    {
      name: t('contact', 'Contact'),
      href: '#contact',
      id: 'contact',
      icon: <FaEnvelope className="w-5 h-5" />,
    },
  ];

  // Scrollspy effect
  useEffect(() => {
    const handleScroll = () => {
      const offsets = navItems.map(item => {
        const el = document.getElementById(item.id);
        if (!el) return { id: item.id, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { id: item.id, top: Math.abs(rect.top) };
      });
      const visible = offsets.reduce((prev, curr) => (curr.top < prev.top ? curr : prev), { id: '', top: Infinity });
      if (visible.id && visible.id !== activeSection) setActiveSection(visible.id);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems, activeSection]);

  const scrollToSection = (href: string, id: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <>
      {/* Vertical Navigation Sidebar */}
      <nav className={`fixed top-1/2 -translate-y-1/2 z-50 ${isRTL ? 'left-6' : 'right-6'}`}>
        <div className="bg-base-200/80 backdrop-blur-md rounded-full p-3 shadow-2xl border border-base-300/20 custom-scrollbar">
          <div className="flex flex-col space-y-6 max-h-[85vh] overflow-y-auto custom-scrollbar">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.href, item.id)}
                className={`w-12 h-12 p-1 rounded-full flex items-center justify-center transition-all duration-300 relative group text-lg ${
                  activeSection === item.id 
                    ? 'bg-primary text-primary-content shadow-xl scale-110' 
                    : 'text-base-content/60 hover:text-primary hover:bg-primary/10 hover:scale-105'
                }`}
                title={item.name}
              >
                {React.cloneElement(item.icon, { className: 'w-4 h-4' })}
                {/* Tooltip */}
                <div className="absolute left-full ml-4 px-3 py-2 bg-base-100 text-base-content text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-base-300/20">
                  {item.name}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-base-100 rotate-45 border-l border-b border-base-300/20"></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Language and Theme Toggles - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <div className="bg-base-200/80 backdrop-blur-md rounded-full p-3 shadow-xl border border-base-300/20">
          <ThemeToggle />
        </div>
        <div className="bg-base-200/80 backdrop-blur-md rounded-full p-3 shadow-xl border border-base-300/20">
          <LanguageToggle />
        </div>
      </div>
    </>
  );
};

export default Navigation;
// Add this to your global CSS (e.g., index.css or App.css):
// .custom-scrollbar::-webkit-scrollbar {
//   width: 8px;
//   background: transparent;
// }
// .custom-scrollbar::-webkit-scrollbar-thumb {
//   background: linear-gradient(135deg, var(--tw-gradient-from, #a855f7), var(--tw-gradient-to, #06b6d4));
//   border-radius: 8px;
// }
// .custom-scrollbar {
//   scrollbar-width: thin;
//   scrollbar-color: #a855f7 #18181b;
// } 