import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuestion, FaTimes } from 'react-icons/fa';

const HelpButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const shortcuts = [
    { key: 'h', description: t('shortcut_home', 'Go to Home') },
    { key: 'a', description: t('shortcut_about', 'Go to About') },
    { key: 'p', description: t('shortcut_projects', 'Go to Projects') },
    { key: 'e', description: t('shortcut_experience', 'Go to Experience') },
    { key: 's', description: t('shortcut_skills', 'Go to Skills') },
    { key: 'c', description: t('shortcut_contact', 'Go to Contact') },
    { key: 'Ctrl + t', description: t('shortcut_toggle_theme', 'Toggle Theme') },
    { key: 'Ctrl + l', description: t('shortcut_toggle_language', 'Toggle Language') },
    { key: 'Ctrl + f', description: t('shortcut_search', 'Open Search') },
    { key: 'Escape', description: t('shortcut_close', 'Close Modal/Dialog') },
    { key: 'Ctrl + ↑', description: t('shortcut_scroll_top', 'Scroll to Top') },
    { key: 'Ctrl + ↓', description: t('shortcut_scroll_bottom', 'Scroll to Bottom') },
    { key: '?', description: t('shortcut_help', 'Show Help') },
  ];

  return (
    <>
      {/* Help Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-12 h-12 bg-primary text-primary-content rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/60 z-50 flex items-center justify-center"
        aria-label={t('keyboard_shortcuts', 'Keyboard Shortcuts')}
      >
        <FaQuestion className="w-5 h-5" />
      </button>

      {/* Help Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-base-100 rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-base-content">
                  {t('keyboard_shortcuts', 'Keyboard Shortcuts')}
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-base-content/60 hover:text-primary text-xl transition-colors"
                  aria-label="Close"
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="space-y-2 text-sm max-h-96 overflow-y-auto">
                {shortcuts.map((shortcut, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 hover:bg-base-200 rounded-lg transition-colors"
                  >
                    <span className="text-base-content/80">{shortcut.description}</span>
                    <kbd className="px-3 py-1 bg-base-300 rounded-md text-xs font-mono text-base-content">
                      {shortcut.key}
                    </kbd>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-base-300">
                <p className="text-xs text-base-content/60 text-center">
                  {t('shortcuts_tip', 'Press ? anytime to show this help')}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HelpButton; 