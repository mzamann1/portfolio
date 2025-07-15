import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../stores/languageStore';
import { useUIStore } from '../stores/uiStore';

export const useAppInitialization = () => {
  const { i18n } = useTranslation();
  const { currentLanguage, setLanguage } = useLanguageStore();
  const { setTheme } = useUIStore();
  const [isInitialized, setIsInitialized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize language from store or i18n
    const initLanguage = () => {
      const storeLanguage = currentLanguage;
      const i18nLanguage = i18n.language?.split('-')[0];
      
      // Use store language if available, otherwise use i18n language
      const targetLanguage = storeLanguage || i18nLanguage || 'en';
      
      // Sync both systems
      if (targetLanguage !== i18n.language) {
        i18n.changeLanguage(targetLanguage);
      }
      if (targetLanguage !== storeLanguage) {
        setLanguage(targetLanguage);
      }
      
      // Set document attributes
      document.documentElement.lang = targetLanguage;
      document.documentElement.dir = targetLanguage === 'ar' ? 'rtl' : 'ltr';
    };

    // Initialize theme
    const initTheme = () => {
      // Check for saved theme preference or default to 'auto'
      const savedTheme = localStorage.getItem('portfolio-ui') 
        ? JSON.parse(localStorage.getItem('portfolio-ui') || '{}').state?.theme 
        : 'auto';
      
      setTheme(savedTheme || 'auto');
    };

    const initializeApp = async () => {
      try {
        setLoading(true);
        initLanguage();
        initTheme();
        
        // Simulate loading time for better UX
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsInitialized(true);
      } catch (error) {
        console.error('App initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []); // Only run once on mount

  // Sync language changes between i18n and store
  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      const langCode = lng.split('-')[0];
      if (langCode !== currentLanguage) {
        setLanguage(langCode);
      }
    };

    i18n.on('languageChanged', handleLanguageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n, currentLanguage, setLanguage]);

  return { isInitialized, loading };
}; 