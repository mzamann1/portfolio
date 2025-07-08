import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Loading = () => {
  const { i18n } = useTranslation();
  
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-base-100"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          className="w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center shadow-2xl"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="text-3xl font-extrabold text-white tracking-tight">Z</span>
        </motion.div>

        {/* Loading Text */}
        <motion.h2
          className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {i18n.language === 'ar' ? 'جاري تحميل اللغة' : 'Loading Language'}
        </motion.h2>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-base-300 rounded-full mx-auto overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Floating Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-primary rounded-full"
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Loading; 