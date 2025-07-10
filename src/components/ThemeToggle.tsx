import { useUIStore } from '../stores/uiStore';
import { useTranslation } from 'react-i18next';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useUIStore();
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  return (
    <button
      onClick={toggleDarkMode}
      className={`relative w-12 h-7 md:w-16 md:h-9 rounded-full flex items-center px-1 transition-colors duration-300 focus:outline-none border-2 border-primary/40 shadow-md bg-base-100 dark:bg-base-200`}
      aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      tabIndex={0}
    >
      {/* Track */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 pointer-events-none transition-colors duration-300" />
      {/* Thumb */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={`relative z-10 w-5 h-5 md:w-7 md:h-7 rounded-full flex items-center justify-center shadow-lg ${isDarkMode ? 'bg-primary/90' : 'bg-yellow-400/90'} border-2 border-base-200`}
        style={{
          boxShadow: isDarkMode
            ? '0 0 12px 2px var(--tw-shadow-color, theme(colors.primary.DEFAULT))'
            : '0 0 12px 2px #facc15',
          left: isRTL 
            ? (isDarkMode ? '0' : 'calc(100% - 1.25rem)')
            : (isDarkMode ? 'calc(100% - 1.25rem)' : '0'),
          position: 'absolute',
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDarkMode ? (
            <motion.span
              key="sun"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-white"
            >
              <FaSun className="w-3 h-3 md:w-4 md:h-4 text-yellow-200 drop-shadow" />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-primary"
            >
              <FaMoon className="w-3 h-3 md:w-4 md:h-4 text-primary drop-shadow" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      {/* Accessible label (visually hidden) */}
      <span className="sr-only">{isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
    </button>
  );
};

export default ThemeToggle; 