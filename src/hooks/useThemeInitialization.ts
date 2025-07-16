import { useEffect } from 'react';
import { useUIStore } from '../stores/uiStore';

export const useThemeInitialization = () => {
  const { theme, isDarkMode, setTheme } = useUIStore();

  useEffect(() => {
    // Initialize theme on mount
    const initializeTheme = () => {
      // Check if we're in a browser environment
      if (typeof window === 'undefined') return;

      // Get saved theme from localStorage
      let savedTheme: 'light' | 'dark' | 'auto' = 'auto';
      try {
        const saved = localStorage.getItem('portfolio-ui');
        if (saved) {
          const parsed = JSON.parse(saved);
          const themeValue = parsed.state?.theme;
          if (themeValue === 'light' || themeValue === 'dark' || themeValue === 'auto') {
            savedTheme = themeValue;
          }
        }
      } catch (error) {
        console.error('Error reading theme from localStorage:', error);
      }

      // Apply the theme
      setTheme(savedTheme);
    };

    // Set up media query listener for auto theme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (theme === 'auto') {
        const isDark = e.matches;
        // Update the store without changing the theme setting
        useUIStore.setState({ isDarkMode: isDark });
        
        // Update document classes and data-theme
        document.documentElement.classList.toggle('dark', isDark);
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
      }
    };

    // Initialize theme
    initializeTheme();

    // Add media query listener
    mediaQuery.addEventListener('change', handleMediaChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []); // Only run once on mount

  // Update document classes when theme changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Remove data-theme from body if present
      document.body.removeAttribute('data-theme');
      // Set on html only
      document.documentElement.classList.toggle('dark', isDarkMode);
      document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }
  }, [isDarkMode]);

  // Update theme when system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'auto') {
        const isDark = mediaQuery.matches;
        setTheme(isDark ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, setTheme]);

  return { theme, isDarkMode };
}; 