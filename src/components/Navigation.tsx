import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageToggle from './LanguageToggle.tsx';
import ThemeToggle from './ThemeToggle.tsx';
import { FaHome, FaUser, FaBriefcase, FaAward, FaProjectDiagram, FaEnvelope, FaGraduationCap, FaStar, FaLightbulb } from 'react-icons/fa';
import { useLanguageFont } from '../hooks/useLanguageFont';

const Navigation = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const [activeSection, setActiveSection] = useState('hero');
  const { fontClass } = useLanguageFont();

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
      {/* Vertical Navigation Sidebar - Hidden on mobile */}
      <nav className={`fixed top-1/2 -translate-y-1/2 z-50 ${isRTL ? 'left-3' : 'right-3'} ${fontClass} hidden lg:block`}>
        <div className="bg-base-200/80 backdrop-blur-md rounded-full p-3 pt-5 pb-5 shadow-2xl border border-base-300/20 custom-scrollbar flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center space-y-4 max-h-[calc(85vh-16px)] custom-scrollbar">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.href, item.id)}
                className={`w-10 h-10 p-2.5 rounded-full flex items-center justify-center transition-all duration-300 relative group text-lg ${
                  activeSection === item.id 
                    ? 'bg-primary text-primary-content shadow-lg' 
                    : 'text-base-content/60 hover:text-primary hover:bg-primary/10 hover:scale-105'
                }`}
                title={item.name}
                style={{ margin: 0, overflow: 'visible' }}
              >
                {React.cloneElement(item.icon, { className: 'w-5 h-5 m-0.5' })}
                {/* Tooltip */}
                <div className="absolute left-full ml-2 px-2 py-1 bg-base-100 text-base-content text-xs rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-base-300/20">
                  {item.name}
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-base-100 rotate-45 border-l border-b border-base-300/20"></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Language and Theme Toggles - Responsive positioning and sizing */}
      <div className={`fixed z-50 flex gap-2 md:gap-3 ${
        isRTL 
          ? 'bottom-4 md:bottom-6 left-4 md:left-6' 
          : 'bottom-4 md:bottom-6 right-4 md:right-6'
      }`}>
        {/* Theme Toggle */}
        <div className="bg-base-200/80 backdrop-blur-md rounded-full p-2 md:p-3 shadow-xl border border-base-300/20">
          <ThemeToggle />
        </div>
        {/* Language Toggle */}
        <div className="bg-base-200/80 backdrop-blur-md rounded-full p-2 md:p-3 shadow-xl border border-base-300/20">
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