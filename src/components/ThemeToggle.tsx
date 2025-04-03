// src/components/ThemeToggle.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { toggleTheme } from '../store/slices/themeSlice';
import { useTranslation } from 'react-i18next';

const ThemeToggle = () => {
    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.theme.theme);
    const { t } = useTranslation();

    const handleClick = () => {
        console.log('ThemeToggle clicked, current theme:', theme);
        dispatch(toggleTheme());
    };

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClick}
            className="fixed bottom-4 right-4 z-[9999] p-3 rounded-full bg-light-secondary dark:bg-dark-secondary shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl border border-light-accent/20 dark:border-dark-accent/20"
            aria-label={t(`common.theme.${theme === 'dark' ? 'light' : 'dark'}`)}
        >
            <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                    <motion.div
                        key="sun"
                        initial={{ rotate: -180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 180, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <FaSun className="text-blue-500 text-2xl" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="moon"
                        initial={{ rotate: 180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -180, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <FaMoon className="text-slate-600 text-2xl" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
};

export default ThemeToggle;