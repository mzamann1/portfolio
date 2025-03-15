// src/components/ThemeToggle.tsx
import { motion } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const ThemeToggle = () => {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsDark(!isDark)}
            className="fixed top-4 right-4 z-50 p-2 rounded-full bg-light-secondary dark:bg-dark-secondary shadow-lg"
        >
            {isDark ? (
                <FaSun className="text-yellow-500 text-xl" />
            ) : (
                <FaMoon className="text-gray-700 text-xl" />
            )}
        </motion.button>
    );
};

export default ThemeToggle;