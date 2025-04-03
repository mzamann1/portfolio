// src/App.tsx
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CVDataProvider } from './components/CVDataProvider';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Career from './components/Career';
import Contact from './components/Contact';
import ThemeToggle from './components/ThemeToggle';
import { useTranslation } from 'react-i18next';
import './i18n/config';

// Import refactored components from their new locations
import { CustomCursor } from './components/interactive';
import ScrollProgress from './components/shared/ScrollProgress';
import BackgroundGradientCanvas from './components/shared/BackgroundGradientCanvas';
import LoadingScreen from './components/shared/LoadingScreen';
import MouseTrailEffect from './components/shared/MouseTrailEffect';

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set initial document direction based on language
    document.dir = i18n.language === 'ur' || i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <AnimatePresence mode="wait">
      <LoadingScreen />
      <CVDataProvider>
        <div className="min-h-screen bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text">
          <CustomCursor />
          <ScrollProgress />
          <BackgroundGradientCanvas />
          <MouseTrailEffect />
          <ThemeToggle />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Career />
            <Contact />
          </main>
        </div>
      </CVDataProvider>
    </AnimatePresence>
  );
};

export default App;