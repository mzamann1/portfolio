import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import './i18n';
import { useAppInitialization } from './hooks/useAppInitialization';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import WorkExperience from './components/WorkExperience';
import CoreSkills from './components/CoreSkills';
import SoftSkills from './components/SoftSkills';
import Education from './components/Education';
import AwardsCertifications from './components/AwardsCertifications';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loading from './components/Loading';
import { useUIStore } from './stores/uiStore';

function App() {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const languageLoading = useUIStore((state) => state.languageLoading);
  const isDarkMode = useUIStore((state) => state.isDarkMode);

  // Initialize Zustand stores and sync with i18n
  useAppInitialization();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'sunset' : 'emerald');
  }, [isDarkMode]);

  useEffect(() => {
    // Set RTL/LTR and language based on language
    const lang = i18n.language.split('-')[0];
    if (lang === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    }
  }, [i18n.language]);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <AnimatePresence mode="wait">
        {(isLoading || languageLoading) ? (
          <Loading key="loading" />
        ) : (
          <div key="content">
            <Navigation />
            <main>
              <Hero />
              <About />
              <WorkExperience />
              <CoreSkills />
              <SoftSkills />
              <Education />
              <AwardsCertifications />
              <Projects />
              <Contact />
            </main>
            <Footer />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
