import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguageFont } from '../hooks/useLanguageFont';
import LanguageToggle from './LanguageToggle';
import { FaBars, FaTimes, FaHome, FaUser, FaBriefcase, FaCode, FaGraduationCap, FaFolder, FaTrophy, FaEnvelope } from 'react-icons/fa';

const Navigation = () => {
  const { t } = useTranslation();
  const { heading } = useLanguageFont();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: t('home'), icon: FaHome, href: '#home' },
    { id: 'about', label: t('about'), icon: FaUser, href: '#about' },
    { id: 'experience', label: t('experience'), icon: FaBriefcase, href: '#experience' },
    { id: 'skills', label: t('skills'), icon: FaCode, href: '#skills' },
    { id: 'education', label: t('education'), icon: FaGraduationCap, href: '#education' },
    { id: 'projects', label: t('projects'), icon: FaFolder, href: '#projects' },
    { id: 'awards', label: t('awards_nav'), icon: FaTrophy, href: '#awards' },
    { id: 'contact', label: t('contact'), icon: FaEnvelope, href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = !isOpen ? 'hidden' : 'auto';
  };

  useEffect(() => {
    // Reset body overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-base-100/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            {/* Logo */}
            <motion.div
              className={`text-xl sm:text-2xl md:text-3xl font-bold ${heading}`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ZAMAN
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.href)}
                  className={`text-sm font-medium transition-colors duration-300 hover:text-primary ${
                    isScrolled ? 'text-base-content' : 'text-base-content/90'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Desktop Controls */}
            <div className="hidden lg:flex items-center space-x-4">
              <LanguageToggle />
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-1.5 sm:p-2 rounded-lg bg-base-200/50 backdrop-blur-sm border border-base-300"
              onClick={toggleMenu}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaBars className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Slide-out Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed top-0 right-0 h-full w-72 sm:w-80 max-w-[90vw] sm:max-w-[85vw] bg-base-100 shadow-2xl z-50 lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-base-300">
                  <h2 className={`text-lg sm:text-xl font-bold ${heading}`}>
                    <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      ZAMAN
                    </span>
                  </h2>
                  <button
                    onClick={toggleMenu}
                    className="p-1.5 sm:p-2 rounded-lg hover:bg-base-200 transition-colors"
                  >
                    <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 overflow-y-auto py-4 sm:py-6">
                  <div className="space-y-1 sm:space-y-2 px-4 sm:px-6">
                    {navItems.map((item, index) => (
                      <motion.button
                        key={item.id}
                        onClick={() => scrollToSection(item.href)}
                        className="flex items-center space-x-3 sm:space-x-4 w-full p-3 sm:p-4 rounded-xl hover:bg-base-200 transition-all duration-300 text-left"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 8 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                        <span className="font-medium text-sm sm:text-base">{item.label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Mobile Controls */}
                <div className="p-4 sm:p-6 border-t border-base-300">
                  <div className="flex items-center justify-between">
                    <LanguageToggle />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation; 