import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../stores/languageStore';
import { useUIStore } from '../stores/uiStore';
import { useRef } from 'react';
import { motion } from 'framer-motion';

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

  // Always EN left, عربى right visually
  const langs = [
    { code: 'en', label: 'EN' },
    { code: 'ar', label: 'عربى' },
  ];

  // For RTL, flex-row-reverse, so EN is visually right, عربى is left
  // Highlight: LTR: left if EN, right if عربى; RTL: right if EN, left if عربى
  let highlightIndex = 0;
  if ((isRTL && currentLanguage === 'ar') || (!isRTL && currentLanguage === 'ar')) {
    highlightIndex = 1;
  }

  const highlightTransform = highlightIndex === 0 ? 'translateX(0)' : 'translateX(100%)';
  const highlightGradient = highlightIndex === 0
    ? 'linear-gradient(to right, var(--tw-gradient-from, #a855f7), var(--tw-gradient-to, #06b6d4))'
    : 'linear-gradient(to left, var(--tw-gradient-from, #a855f7), var(--tw-gradient-to, #06b6d4))';

  return (
    <div className="relative flex items-center w-28 h-10 bg-base-100 border-2 border-primary/40 rounded-full shadow-md px-1">
      {/* Animated background for active language */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-1 left-1 w-1/2 h-8 rounded-full z-0"
        style={{
          background: 'linear-gradient(90deg, var(--tw-gradient-stops))',
          backgroundImage: highlightGradient,
          transform: highlightTransform,
        }}
      />
      <div className={`relative flex w-full z-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
        {langs.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`flex-1 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-200 focus:outline-none ${
              currentLanguage === lang.code
                ? 'text-white scale-110' : 'text-base-content/70 hover:text-primary'
            }`}
            aria-pressed={currentLanguage === lang.code}
            aria-label={`Switch to ${lang.label}`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageToggle; 