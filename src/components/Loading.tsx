import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

const Loading = () => {
  const { i18n } = useTranslation();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    i18n.language === 'ar' ? 'جاري تحميل البيانات' : 'Loading Data',
    i18n.language === 'ar' ? 'جاري تحميل المكونات' : 'Loading Components',
    i18n.language === 'ar' ? 'جاري تحميل المحتوى' : 'Loading Content',
    i18n.language === 'ar' ? 'جاري التحضير' : 'Preparing'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 120);

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length);
    }, 1200);

    return () => {
      clearInterval(interval);
      clearInterval(stepInterval);
    };
  }, [steps.length]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-base-100"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        {/* Original Loader */}
        <div className="relative w-32 h-24 mx-auto mb-8">
          {/* Bouncing Ball (before pseudo-element) */}
          <motion.div
            className="absolute bottom-8 left-12 w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg"
            animate={{
              y: [0, -40, 0],
              scale: [1, 0.8, 1],
              scaleY: [1, 1.2, 1]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Stepping Animation (after pseudo-element) */}
          <motion.div
            className="absolute right-0 top-0 w-12 h-2 bg-base-300 rounded"
            animate={{
              boxShadow: [
                "0 0 0 rgba(0,0,0,0), 0 0 0 #d1d5db, -35px 50px 0 #d1d5db, -70px 95px 0 #d1d5db",
                "0 0 0 #d1d5db, -35px 50px 0 #d1d5db, -70px 95px 0 #d1d5db, -70px 95px 0 rgba(0,0,0,0)"
              ]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Loading Text */}
        <motion.h2
          className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
          animate={{ 
            opacity: [0.8, 1, 0.8],
            scale: [1, 1.02, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {i18n.language === 'ar' ? 'زمان' : 'ZAMAN'}
        </motion.h2>
        
        <motion.p
          className="text-lg text-base-content/70 font-medium mb-6"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {steps[currentStep]}
        </motion.p>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-base-300 rounded-full mx-auto overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Loading; 