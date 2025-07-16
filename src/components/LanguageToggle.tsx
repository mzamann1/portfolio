import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../stores/languageStore';
import { useUIStore } from '../stores/uiStore';
import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const { currentLanguage, setLanguage } = useLanguageStore();
  const { setLanguageLoading } = useUIStore();
  const loadingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isRTL = i18n.dir() === 'rtl';

  const changeLanguage = (lng: string) => {
    if (loadingTimeout.current) {
      clearTimeout(loadingTimeout.current);
    }
    setLanguageLoading(true);
    setLanguage(lng);
    i18n.changeLanguage(lng);
    document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    loadingTimeout.current = setTimeout(() => {
      setLanguageLoading(false);
    }, 1000);
  };

  const langs = [
    { code: 'en', label: 'EN' },
    { code: 'ar', label: 'عربى' },
  ];

  const highlightIndex = currentLanguage === 'ar' ? 1 : 0;

  return (
    <div data-language-toggle className="relative flex items-center w-28 h-8 rounded-full border-2 border-primary/60 bg-base-100 dark:bg-base-200 shadow-lg px-1 focus-within:ring-2 focus-within:ring-primary/60 transition-all duration-300">
      {/* Animated highlight for active language */}
      <AnimatePresence initial={false}>
        <motion.div
          key={highlightIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1, x: highlightIndex === 0 ? 0 : '100%' }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="absolute top-1 left-1 w-[calc(50%-4px)] h-6 rounded-full z-0"
          style={{
            background: 'linear-gradient(90deg, #a855f7 0%, #06b6d4 100%)',
            boxShadow: '0 2px 8px 0 rgba(168,85,247,0.10)',
          }}
        />
      </AnimatePresence>
      <div className={`relative flex w-full z-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {langs.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`flex-1 h-6 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
              currentLanguage === lang.code
                ? 'text-white scale-110' : 'text-base-content/70 hover:text-primary'
            }`}
            aria-pressed={currentLanguage === lang.code}
            aria-label={`Switch to ${lang.label}`}
            style={{ minWidth: 0, zIndex: 2 }}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageToggle; 