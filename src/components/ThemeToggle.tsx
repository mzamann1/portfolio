import { useUIStore } from '../stores/uiStore';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useUIStore();

  // Container: w-14 h-8 px-1 (56px x 32px, padding-x: 4px)
  // Thumb: w-7 h-7 (28px x 28px)
  // Border: border-2 (2px)
  // So: left: 2px (start), left: calc(100% - 2px - 28px) (end)

  return (
    <button
      onClick={toggleDarkMode}
      aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={
        `relative w-14 h-8 rounded-full flex items-center px-1 border-2 border-primary/60 bg-base-100 dark:bg-base-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/60 shadow-lg`
      }
      tabIndex={0}
    >
      {/* Track gradient */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 pointer-events-none transition-colors duration-300" />
      {/* Animated Thumb */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center shadow-xl border-2 border-base-200`}
        style={{
          left: isDarkMode ? 'calc(100% - 2px - 28px)' : '2px',
          top: '50%',
          transform: 'translateY(-50%)',
          position: 'absolute',
          background: isDarkMode
            ? 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)'
            : 'linear-gradient(135deg, #facc15 0%, #f59e42 100%)',
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
              <FaSun className="w-4 h-4 text-yellow-200 drop-shadow" />
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
              <FaMoon className="w-4 h-4 text-primary drop-shadow" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
};

export default ThemeToggle; 