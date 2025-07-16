import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useUIStore } from '../stores/uiStore';

const FloatingThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useUIStore();
  const { t } = useTranslation();
  const [showTooltip, setShowTooltip] = useState(false);

  const currentIcon = isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />;
  const tooltipText = isDarkMode 
    ? t('switch_to_light_mode', 'Switch to Light Mode') 
    : t('switch_to_dark_mode', 'Switch to Dark Mode');

  return (
    <>
      {/* Floating Theme Toggle Button */}
      <div className="relative">
        <button
          onClick={toggleDarkMode}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          className="fixed bottom-6 left-6 w-12 h-12 bg-primary text-primary-content rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/60 z-50 flex items-center justify-center"
          aria-label={tooltipText}
        >
          <motion.div
            key={isDarkMode ? 'dark' : 'light'}
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {currentIcon}
          </motion.div>
        </button>

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 left-0 bg-base-300 text-base-content px-3 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap z-50"
            >
              {tooltipText}
              {/* Tooltip arrow */}
              <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-base-300"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default FloatingThemeToggle; 