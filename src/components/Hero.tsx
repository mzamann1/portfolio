import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useHeroData } from '../hooks/usePortfolioData';
import { useLanguageFont } from '../hooks/useLanguageFont';
import { 
  DiReact, 
  DiJavascript1, 
  DiCss3, 
  DiHtml5, 
  DiNodejs, 
  DiGit, 
  DiDocker, 
  DiVisualstudio, 
  DiGithub,
  DiDotnet,
  DiFsharp,
  DiMysql,
  DiPostgresql,
  DiMongodb,
  DiAngularSimple,
  DiPython,
  DiJava,
  DiPhp
} from 'react-icons/di';
import { SiTypescript, SiVuedotjs } from 'react-icons/si';
import { Typewriter } from 'react-simple-typewriter';

// Add this at the top of the file (or move to a CSS/SCSS file if preferred)
const shineStyle = `
.shine-anim {
  background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%);
  mix-blend-mode: lighten;
  animation: shine-move 2.5s linear infinite;
  opacity: 0.7;
}
@keyframes shine-move {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.shine-effect {
  position: relative;
  z-index: 1;
}
`;

if (typeof window !== 'undefined' && !document.getElementById('hero-shine-style')) {
  const style = document.createElement('style');
  style.id = 'hero-shine-style';
  style.innerHTML = shineStyle;
  document.head.appendChild(style);
}

// Add this at the top of the file (or move to a CSS/SCSS file if preferred)
const typewriterCursorStyle = `
.react-simple-typewriter-cursor {
  color: #fff !important;
  background: #fff;
  border-radius: 2px;
  font-weight: bold;
  font-size: 1.2em;
  margin-left: 2px;
  width: 0.6em;
  display: inline-block;
  height: 1.1em;
  vertical-align: middle;
  animation: blink-cursor 1s steps(1) infinite;
}
@keyframes blink-cursor {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
`;

if (typeof window !== 'undefined' && !document.getElementById('typewriter-cursor-style')) {
  const style = document.createElement('style');
  style.id = 'typewriter-cursor-style';
  style.innerHTML = typewriterCursorStyle;
  document.head.appendChild(style);
}

const Hero = () => {
  const { t } = useTranslation();
  const { data: heroData, loading } = useHeroData();
  const { fontClass, body, getFontClass } = useLanguageFont();
  
  // Helper to replace the space between first and last name with a non-breaking space
  function getHeroTitleWithNoBreak(title: string) {
    // This regex replaces the last space in the string with a non-breaking space
    return title.replace(/ (\S+)$/, '\u00A0$1');
  }

  const heroTitle = getHeroTitleWithNoBreak(t('hero_title'));

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Background icons data with responsive sizing
  const backgroundIcons = [
    { icon: <DiReact className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24" />, delay: 0, duration: 6 },
    { icon: <DiJavascript1 className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24" />, delay: 1, duration: 8 },
    { icon: <SiTypescript className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24" />, delay: 2, duration: 7 },
    { icon: <DiCss3 className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24" />, delay: 0.5, duration: 9 },
    { icon: <DiHtml5 className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24" />, delay: 1.5, duration: 8.5 },
    { icon: <DiNodejs className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24" />, delay: 3, duration: 6.5 },
    { icon: <DiGit className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24" />, delay: 0.8, duration: 7.8 },
    { icon: <DiDocker className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24" />, delay: 2.2, duration: 8.2 },
    { icon: <DiVisualstudio className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24" />, delay: 1.2, duration: 7.2 },
    { icon: <DiGithub className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24" />, delay: 0.3, duration: 9.3 },
    { icon: <DiDotnet className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24" />, delay: 2.8, duration: 6.8 },
    { icon: <DiFsharp className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24" />, delay: 1.8, duration: 8.8 },
    { icon: <DiMysql className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24" />, delay: 0.7, duration: 7.7 },
    { icon: <DiPostgresql className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24" />, delay: 2.5, duration: 8.5 },
    { icon: <DiMongodb className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24" />, delay: 1.1, duration: 7.1 },
    { icon: <DiAngularSimple className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24" />, delay: 3.2, duration: 6.2 },
    { icon: <SiVuedotjs className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24" />, delay: 0.9, duration: 8.9 },
    { icon: <DiPython className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24" />, delay: 2.1, duration: 7.1 },
    { icon: <DiJava className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24" />, delay: 1.4, duration: 8.4 },
    { icon: <DiPhp className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24" />, delay: 0.6, duration: 9.6 }
  ];

  if (loading || !heroData) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </section>
    );
  }

  return (
    <section id="home" className={`min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 ${fontClass}`}>
      {/* Animated Floating Programming Icons */}
      <div className="pointer-events-none absolute inset-0 w-full h-full z-0">
        {backgroundIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-base-content/10 hover:text-primary/30 transition-colors duration-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: 'rotate(0deg)',
            }}
            animate={{
              y: [0, -30, 0],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.3 }
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>
      
      {/* Glassy background elements - responsive positioning */}
      <div className="absolute top-8 left-8 md:top-16 md:left-16 w-20 h-20 md:w-40 md:h-40 bg-primary/20 rounded-full blur-2xl opacity-60" />
      <div className="absolute bottom-8 right-8 md:bottom-16 md:right-16 w-28 h-28 md:w-56 md:h-56 bg-secondary/20 rounded-full blur-2xl opacity-60" />
      
      <motion.div
        className="container mx-auto px-4 md:px-12 z-10 flex-1 flex items-center justify-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Centered Hero Content */}
        <div className="text-center max-w-6xl mx-auto w-full">
          <div className="relative mb-6 md:mb-10">
            <motion.h1
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={
                getFontClass({ weight: 'bold', size: '4xl' }) + ' md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl ' +
                'tracking-tight transition-all duration-100 relative overflow-hidden text-center'
              }
            >
              <span
                className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-bold"
                style={{ WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                <Typewriter
                  words={[heroTitle]}
                  loop={1}
                  cursor={true}
                  cursorStyle="|"
                  typeSpeed={80}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </motion.h1>
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={
              body +
              ' text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-base-content/80 mb-6 md:mb-8 max-w-5xl mx-auto font-light text-center'
            }
          >
            {t('hero_subtitle')}
          </motion.p>
          
          {/* Statistics with Count-Up Animation - centered grid */}
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12 mb-8 md:mb-12 max-w-6xl mx-auto justify-items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {heroData.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`${fontClass} text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary mb-1 md:mb-2`}>
                  <CountUpNumber end={stat.value} duration={2} />
                  {stat.suffix || '+'}
                </div>
                <div className={`${fontClass} text-xs md:text-sm lg:text-base text-base-content/70`}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
          
          {/* Centered button layout */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center">
            <motion.button 
              onClick={() => scrollToSection('#contact')}
              className="relative btn btn-primary btn-lg lg:btn-xl px-10 md:px-12 rounded-full shadow-md overflow-visible border-0 w-full sm:w-auto"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              whileTap={{ scale: 0.95 }}
            >
              {t('contact')}
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection('#projects')}
              className="btn btn-outline btn-lg lg:btn-xl px-10 md:px-12 rounded-full shadow-md w-full sm:w-auto"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {t('projects')}
            </motion.button>
          </div>
        </div>
      </motion.div>
      
      {/* Scroll Down Button - responsive positioning */}
      <motion.div 
        className="absolute left-1/2 -translate-x-1/2 bottom-4 md:bottom-8 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <button 
          onClick={() => scrollToSection('#about')}
          className="w-6 h-10 border-2 border-base-content/30 rounded-full mx-auto relative hover:scale-110 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
          title={t('scroll_down', 'Scroll down')}
        >
          <div className="w-1 h-3 bg-base-content/60 rounded-full mx-auto mt-2 animate-pulse" />
        </button>
      </motion.div>
    </section>
  );
};

// Custom CountUp Component
const CountUpNumber = ({ end, duration = 2 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const currentCount = Math.floor(progress * end);
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setHasAnimated(true);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 500);

    return () => clearTimeout(timer);
  }, [end, duration, hasAnimated]);

  return <span>{count}</span>;
};

export default Hero; 