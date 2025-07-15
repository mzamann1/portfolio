import { useEffect, useState, Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from './stores/languageStore';
import { useUIStore } from './stores/uiStore';
import { useAppInitialization } from './hooks/useAppInitialization';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import AppLoading from './components/AppLoading';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import BackToTop from './components/BackToTop';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

// Lazy load components for better performance
const About = lazy(() => import('./components/About'));
const CoreSkills = lazy(() => import('./components/CoreSkills'));
const SoftSkills = lazy(() => import('./components/SoftSkills'));
const WorkExperience = lazy(() => import('./components/WorkExperience'));
const Education = lazy(() => import('./components/Education'));
const Projects = lazy(() => import('./components/Projects'));
const AwardsCertifications = lazy(() => import('./components/AwardsCertifications'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));
const SocialSharing = lazy(() => import('./components/SocialSharing'));

// Loading component for lazy-loaded sections
const SectionLoading = () => (
  <div className="py-16 flex items-center justify-center">
    <div className="loading loading-spinner loading-lg text-primary"></div>
  </div>
);

function App() {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguageStore();
  const { theme } = useUIStore();
  const { isInitialized, loading } = useAppInitialization();
  const { showShortcutsHelp } = useKeyboardShortcuts();
  const [showSocialSharing, setShowSocialSharing] = useState(false);

  // Set theme on mount and theme change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Set language direction
  useEffect(() => {
    document.documentElement.setAttribute('dir', currentLanguage === 'ar' ? 'rtl' : 'ltr');
  }, [currentLanguage]);

  if (!isInitialized || loading) {
    return <AppLoading />;
  }

  return (
    <ErrorBoundary>
      <CustomCursor />
      <div className="min-h-screen bg-base-100 text-base-content relative">
        <Navigation />
        
        <main>
          <Hero />
          <Suspense fallback={<SectionLoading />}>
            <About />
          </Suspense>
          <Suspense fallback={<SectionLoading />}>
            <CoreSkills />
          </Suspense>
          <Suspense fallback={<SectionLoading />}>
            <SoftSkills />
          </Suspense>
          <Suspense fallback={<SectionLoading />}>
            <WorkExperience />
          </Suspense>
          <Suspense fallback={<SectionLoading />}>
            <Education />
          </Suspense>
          <Suspense fallback={<SectionLoading />}>
            <Projects />
          </Suspense>
          <Suspense fallback={<SectionLoading />}>
            <AwardsCertifications />
          </Suspense>
          <Suspense fallback={<SectionLoading />}>
            <Contact />
          </Suspense>
        </main>

        <Suspense fallback={<div className="h-32 bg-base-200"></div>}>
          <Footer />
        </Suspense>

        {/* Back to Top Button */}
        <BackToTop />

        {/* Social Sharing Button */}
        <motion.button
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-content rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowSocialSharing(true)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
        </motion.button>

        {/* Social Sharing Modal */}
        <AnimatePresence>
          {showSocialSharing && (
            <motion.div
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSocialSharing(false)}
            >
              <motion.div
                className="bg-base-100 rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">{t('share_portfolio', 'Share Portfolio')}</h3>
                  <button
                    className="text-base-content/60 hover:text-primary text-xl"
                    onClick={() => setShowSocialSharing(false)}
                  >
                    ×
                  </button>
                </div>
                <Suspense fallback={<div className="h-32 bg-base-200 rounded"></div>}>
                  <SocialSharing />
                </Suspense>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Keyboard Shortcuts Help Button */}
        <motion.button
          className="fixed bottom-6 left-6 w-14 h-14 bg-secondary text-secondary-content rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={showShortcutsHelp}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </motion.button>
      </div>
    </ErrorBoundary>
  );
}

export default App;
