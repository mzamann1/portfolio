import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import ProfileCard3D from './ProfileCard3D';
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
  
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Background icons data
  const backgroundIcons = [
    { icon: <DiReact className="w-24 h-24" />, delay: 0, duration: 6 },
    { icon: <DiJavascript1 className="w-24 h-24" />, delay: 1, duration: 8 },
    { icon: <SiTypescript className="w-24 h-24" />, delay: 2, duration: 7 },
    { icon: <DiCss3 className="w-24 h-24" />, delay: 0.5, duration: 9 },
    { icon: <DiHtml5 className="w-24 h-24" />, delay: 1.5, duration: 8.5 },
    { icon: <DiNodejs className="w-24 h-24" />, delay: 3, duration: 6.5 },
    { icon: <DiGit className="w-24 h-24" />, delay: 0.8, duration: 7.8 },
    { icon: <DiDocker className="w-24 h-24" />, delay: 2.2, duration: 8.2 },
    { icon: <DiVisualstudio className="w-24 h-24" />, delay: 1.2, duration: 7.2 },
    { icon: <DiGithub className="w-24 h-24" />, delay: 0.3, duration: 9.3 },
    { icon: <DiDotnet className="w-24 h-24" />, delay: 2.8, duration: 6.8 },
    { icon: <DiFsharp className="w-24 h-24" />, delay: 1.8, duration: 8.8 },
    { icon: <DiMysql className="w-24 h-24" />, delay: 0.7, duration: 7.7 },
    { icon: <DiPostgresql className="w-24 h-24" />, delay: 2.5, duration: 8.5 },
    { icon: <DiMongodb className="w-24 h-24" />, delay: 1.1, duration: 7.1 },
    { icon: <DiAngularSimple className="w-24 h-24" />, delay: 3.2, duration: 6.2 },
    { icon: <SiVuedotjs className="w-24 h-24" />, delay: 0.9, duration: 8.9 },
    { icon: <DiPython className="w-24 h-24" />, delay: 2.1, duration: 7.1 },
    { icon: <DiJava className="w-24 h-24" />, delay: 1.4, duration: 8.4 },
    { icon: <DiPhp className="w-24 h-24" />, delay: 0.6, duration: 9.6 }
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
      {/* Animated Floating Programming Icons */}
      <div className="pointer-events-none absolute inset-0 w-full h-full z-0">
        {backgroundIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-base-content/10 hover:text-primary/30 transition-colors duration-300"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 10 - 5, 0],
              rotate: [0, 360],
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
      
      {/* Glassy background elements */}
      <div className="absolute top-16 left-16 w-40 h-40 bg-primary/20 rounded-full blur-2xl opacity-60" />
      <div className="absolute bottom-16 right-16 w-56 h-56 bg-secondary/20 rounded-full blur-2xl opacity-60" />
      
      <motion.div
        className="container mx-auto px-4 z-10 flex-1 flex items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Two-column layout for larger screens, left column is wider */}
        <div className="grid grid-cols-1 lg:grid-cols-[2.5fr,1fr] gap-12 items-stretch w-full">
          {/* Left Column - Hero Content (wider, vertically stretched) */}
          <div className="flex flex-col justify-center text-center lg:text-left">
            <div className="relative mb-10">
              <motion.h1
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="font-inter font-black text-4xl md:text-5xl lg:text-6xl tracking-tight transition-all duration-100 relative overflow-hidden"
              >
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-bold" style={{ WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  <Typewriter
                    words={[t('hero_title')]}
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
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-sans text-lg md:text-2xl text-base-content/80 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              {t('hero_subtitle')}
            </motion.p>
            
            {/* Statistics with Count-Up Animation */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  <CountUpNumber end={4} duration={2} />+
                </div>
                <div className="text-sm text-base-content/70">Years Experience</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">
                  <CountUpNumber end={25} duration={2} />+
                </div>
                <div className="text-sm text-base-content/70">Technologies</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                  <CountUpNumber end={15} duration={2} />+
                </div>
                <div className="text-sm text-base-content/70">Projects</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  <CountUpNumber end={100} duration={2} />%
                </div>
                <div className="text-sm text-base-content/70">Dedication</div>
              </div>
            </motion.div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <motion.button 
                onClick={() => scrollToSection('#projects')}
                className="btn btn-primary btn-lg px-8 rounded-xl shadow-md"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {t('projects')}
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('#contact')}
                className="btn btn-outline btn-lg px-8 rounded-xl shadow-md"
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {t('contact')}
              </motion.button>
            </div>
          </div>
          {/* Right Column - Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-[450px] w-full mx-auto"
          >
            <ProfileCard3D />
          </motion.div>
        </div>
      </motion.div>
      {/* Scroll Down Button - bottom center */}
      <motion.div 
        className="absolute left-1/2 -translate-x-1/2 bottom-8 z-20"
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