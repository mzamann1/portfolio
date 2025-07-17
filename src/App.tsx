import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { useAppInitialization } from '@hooks/useAppInitialization';
import { useKeyboardShortcuts } from '@hooks/useKeyboardShortcuts';
import { useLanguageFont } from '@hooks/useLanguageFont';
import { useThemeInitialization } from '@hooks/useThemeInitialization';
import { useLanguageStore } from '@stores/languageStore';
import { useAllPortfolioData } from '@hooks/usePortfolioData';
import { useScrollTracking } from '@hooks/useScrollTracking';
import { analyticsService, performanceMonitor } from '@services/analyticsService';
import ErrorBoundary from '@components/ErrorBoundary';
import SEOHead from '@components/SEOHead';
import AppLoading from '@components/AppLoading';
import Navigation from '@components/Navigation';
import Hero from '@components/Hero';
import About from '@components/About';
import Skills from '@components/CoreSkills';
import WorkExperience from '@components/WorkExperience';
import Education from '@components/Education';
import Projects from '@components/Projects';
import AwardsCertifications from '@components/AwardsCertifications';
import Contact from '@components/Contact';
import Footer from '@components/Footer';
import BackToTop from '@components/BackToTop';
import CustomCursor from '@components/CustomCursor';
import SocialSharing from '@components/SocialSharing';
import Loading from '@components/Loading';
import './App.css';
import FloatingThemeToggle from './components/FloatingThemeToggle';

const App = () => {
  const { t } = useTranslation();
  const { fontClass } = useLanguageFont();
  const { currentLanguage } = useLanguageStore();
  const { loading: dataLoading, error } = useAllPortfolioData();

  // Initialize app
  useAppInitialization();
  
  // Setup keyboard shortcuts
  useKeyboardShortcuts();
  
  // Initialize theme
  useThemeInitialization();

  // Initialize analytics and performance monitoring
  useEffect(() => {
    analyticsService.initialize();
    performanceMonitor.startMonitoring();
  }, []);

  // Setup scroll tracking
  useScrollTracking({
    trackDepth: true,
    trackDirection: false,
    trackSpeed: false,
    throttleMs: 100
  });

  // Set document title and meta
  useEffect(() => {
    document.title = t('site_title', 'Portfolio - Full Stack Developer');
    document.documentElement.lang = currentLanguage;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('site_description', 'Professional portfolio showcasing web development projects and skills'));
    }
  }, [t, currentLanguage]);

  // Show loading screen
  if (dataLoading) {
    return <AppLoading />;
  }

  // Show error screen
  if (error) {
    return (
      <ErrorBoundary>
        <div className="min-h-screen flex items-center justify-center bg-base-100">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-error mb-4">
              {t('error_title', 'Something went wrong')}
            </h1>
            <p className="text-base-content/70 mb-6">
              {t('error_message', 'We encountered an error loading the application. Please refresh the page.')}
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              {t('refresh_page', 'Refresh Page')}
            </button>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <div className={`min-h-screen ${fontClass} bg-base-100 transition-colors duration-300`}>
          {/* SEO Head */}
          <SEOHead 
            title={t('site_title', 'Portfolio - Full Stack Developer')}
            description={t('site_description', 'Professional portfolio showcasing web development projects and skills')}
            keywords={['portfolio', 'web development', 'react', 'typescript', 'frontend', 'full stack']}
          />
          
          {/* Custom Cursor */}
          <CustomCursor />
          
          {/* Navigation */}
          <Navigation />
          
          {/* Main Content */}
          <main className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentLanguage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Hero Section */}
                <Hero />
                
                {/* About Section */}
                <About />
                
                {/* Skills Section */}
                <Skills />
                
                {/* Work Experience Section */}
                <WorkExperience />
                
                {/* Education Section */}
                <Education />
                
                {/* Projects Section */}
                <Projects />
                
                {/* Awards & Certifications Section */}
                <AwardsCertifications />
                
                {/* Contact Section */}
                <Contact />
              </motion.div>
            </AnimatePresence>
          </main>
          
          {/* Footer */}
          <Footer />
          
          {/* Back to Top Button */}
          <BackToTop />
          
          {/* Social Sharing */}
          <SocialSharing />
          
          {/* Theme Toggle */}
          <FloatingThemeToggle />
          
          {/* Loading Overlay */}
          <AnimatePresence>
            {dataLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-base-100/80 backdrop-blur-sm z-50 flex items-center justify-center"
              >
                <Loading />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ErrorBoundary>
    </HelmetProvider>
  );
};

export default App;
