import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaGlobe } from 'react-icons/fa';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', dir: 'ltr' },
    { code: 'ur', name: 'اردو', dir: 'rtl' },
    { code: 'ar', name: 'العربية', dir: 'rtl' }
  ];

  const handleLanguageChange = (langCode: string) => {
    const selectedLang = languages.find(lang => lang.code === langCode);
    if (selectedLang) {
      i18n.changeLanguage(langCode);
      document.documentElement.dir = selectedLang.dir;
      document.documentElement.lang = langCode;
    }
  };

  return (
    <div className="relative group">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-2 px-4 py-2 rounded-full bg-light-secondary/50 dark:bg-dark-secondary/50 backdrop-blur-sm text-light-text dark:text-dark-text hover:bg-light-accent/10 dark:hover:bg-dark-accent/10 transition-all duration-300"
      >
        <FaGlobe className="text-lg" />
        <span>{languages.find(lang => lang.code === i18n.language)?.name || 'English'}</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-light-secondary dark:bg-dark-secondary backdrop-blur-sm border border-light-border dark:border-dark-border"
      >
        <div className="py-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                i18n.language === lang.code
                  ? 'text-light-accent dark:text-dark-accent bg-light-accent/10 dark:bg-dark-accent/10'
                  : 'text-light-text dark:text-dark-text hover:bg-light-secondary/50 dark:hover:bg-dark-secondary/50'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LanguageSwitcher; 