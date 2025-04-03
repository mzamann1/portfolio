import { motion, useScroll, useTransform, animate,  } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FaLaptopCode, FaUserGraduate, FaAward, FaProjectDiagram, FaServer, FaTools } from 'react-icons/fa';
import { SiGithub, SiDocker, SiAmazon, SiFigma } from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';
import ScrollRevealSection from './shared/ScrollRevealSection';
import ParallaxSection from './shared/ParallexSection';
import MorphingShape from './shared/MorphingShape';
import Text3D from './shared/Text3D';
import TextGlitch from './shared/TextGlitch';
import TextReveal from './shared/TextReveal';
import { useAppSelector } from '../store/hooks';
import { selectPersonalInfo, selectYearsOfExperience } from '../store/selectors/cvSelectors';
import { useTranslation } from 'react-i18next';

// Counter component for animated numbers
interface CounterProps {
  from?: number;
  to: string | number;
  duration?: number;
  className?: string;
}

const Counter = ({ from = 0, to, duration = 1.5, className = "" }: CounterProps) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!isInView || !nodeRef.current) return;

    const node = nodeRef.current;

    // Handle non-numeric values like "5+"
    const isNumeric = !isNaN(Number(to));
    const targetValue = isNumeric ? Number(to) : Number(to.toString().replace(/\D/g, ''));

    const controls = animate(from, targetValue, {
      duration,
      onUpdate(value) {
        if (isNumeric) {
          node.textContent = Math.round(value).toString();
        } else {
          node.textContent = `${Math.round(value)}+`;
        }
      },
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [from, to, duration, isInView]);

  return (
    <motion.span
      ref={nodeRef}
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      onViewportEnter={() => setIsInView(true)}
    >
      {from}
    </motion.span>
  );
};

// Animated background component
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-light-accent/5 to-blue-500/5 dark:from-dark-accent/5 dark:to-blue-400/5"
          style={{
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: 'blur(20px)'
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Floating element animation
interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

const FloatingElement = ({ children, delay = 0, duration = 5, className = "" }: FloatingElementProps) => {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -10, 0],
        rotate: [0, 1, 0, -1, 0]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};

const About = () => {
  const { t } = useTranslation();
  const personalInfo = useAppSelector(selectPersonalInfo);
  const yearsOfExperience = useAppSelector(selectYearsOfExperience);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0, -1]);

  // Hover states for cards
  const [, setHoveredCard] = useState<number | null>(null);

  const skills = [
    {
      icon: <FaLaptopCode size={24} />,
      title: "Frontend Development",
      description: "Building responsive and interactive user interfaces with modern frameworks and libraries.",
      items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"]
    },
    {
      icon: <FaServer size={24} />,
      title: "Backend Development",
      description: "Creating robust server-side applications and APIs to power web applications.",
      items: [".NET Core", "ASP.NET", "Entity Framework", "SQL Server", "RESTful APIs"]
    },
    {
      icon: <FaTools size={24} />,
      title: "Tools & Technologies",
      description: "Leveraging modern tools and technologies to streamline development workflows.",
      items: ["Git", "Docker", "Azure DevOps", "VS Code", "Rider"]
    }
  ];

  const stats = [
    {
      value: yearsOfExperience.toString(),
      label: "Years Experience",
      icon: <FaUserGraduate size={36} />,
      color: "from-light-accent to-blue-500 dark:from-dark-accent dark:to-blue-400",
      description: "Professional development experience"
    },
    {
      value: "10+",
      label: "Projects Completed",
      icon: <FaProjectDiagram size={36} />,
      color: "from-light-accent to-blue-500 dark:from-dark-accent dark:to-blue-400",
      description: "Successful projects delivered"
    },
    {
      value: "5+",
      label: "Happy Clients",
      icon: <FaAward size={36} />,
      color: "from-light-accent to-blue-500 dark:from-dark-accent dark:to-blue-400",
      description: "Satisfied clients and companies"
    }
  ];

  const toolIcons = [
    { icon: <VscCode size={28} />, name: "VS Code", color: "text-blue-500" },
    { icon: <SiGithub size={28} />, name: "GitHub", color: "text-gray-700 dark:text-gray-300" },
    { icon: <SiDocker size={28} />, name: "Docker", color: "text-blue-600" },
    { icon: <SiAmazon size={28} />, name: "AWS", color: "text-yellow-500" },
    { icon: <SiFigma size={28} />, name: "Figma", color: "text-purple-500" }
  ];

  // Enhanced card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        type: "spring",
        stiffness: 50,
        damping: 15
      }
    }),
    hover: {
      y: -15,
      scale: 1.03,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300
      }
    }
  };

  // Enhanced skill card variants
  const skillCardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        type: "spring",
        stiffness: 50,
        damping: 15
      }
    }),
    hover: {
      x: 10,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300
      }
    }
  };

  // Enhanced skill item variants
  const skillItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 200
      }
    }),
    hover: {
      scale: 1.1,
      backgroundColor: "rgba(var(--light-accent-rgb), 0.1)",
      borderColor: "rgba(var(--light-accent-rgb), 0.3)",
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden" ref={containerRef}>
      {/* Animated background elements */}
      <AnimatedBackground />

      {/* Morphing shape background with enhanced opacity */}
      <MorphingShape className="top-0 left-0 w-full h-full opacity-20" color="var(--light-accent)" duration={12} />

      <motion.div
        className="container relative z-10"
        style={{ scale, rotate }}
      >
        <ScrollRevealSection>
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
            className="text-center mb-16"
          >
            <Text3D className="text-4xl md:text-5xl font-bold mb-2">
              <TextGlitch text={t('about.title')} glitchInterval={5000} />
            </Text3D>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-light-accent to-blue-500 dark:from-dark-accent dark:to-blue-400 mx-auto mb-8 rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "6rem", opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            ></motion.div>
            <motion.p
              className="text-light-textSecondary dark:text-dark-textSecondary max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              {t('about.tagline')}
            </motion.p>
          </motion.div>
        </ScrollRevealSection>

        {/* Stats Section - Enhanced with Glassmorphism */}
        <ScrollRevealSection>
          <div className="mb-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  viewport={{ once: true }}
                  className="relative group"
                >
                  {/* Enhanced glassmorphism card */}
                  <motion.div
                    className="relative rounded-xl overflow-hidden backdrop-blur-md bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 shadow-lg transition-all duration-500 h-full"
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 5 + index,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3
                    }}
                  >
                    {/* Enhanced gradient background */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700"
                      style={{
                        background: `linear-gradient(120deg, var(--light-accent-transparent), var(--blue-transparent))`,
                        backgroundSize: '200% 200%',
                      }}
                      animate={{
                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />

                    {/* Content container with enhanced spacing */}
                    <div className="relative p-8 z-10 h-full flex flex-col">
                      <motion.div
                        className="mb-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + index * 0.2, duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <div className={`${stat.color} p-3 rounded-lg inline-block`}>
                          {stat.icon}
                        </div>
                      </motion.div>

                      <div className="flex-1 flex flex-col">
                        <motion.div
                          className="text-5xl font-bold mb-2 text-light-text dark:text-dark-text"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.2, duration: 0.5 }}
                          viewport={{ once: true }}
                        >
                          <Counter
                            from={0}
                            to={stat.value}
                            className="bg-clip-text text-transparent bg-gradient-to-r from-light-accent to-blue-500 dark:from-dark-accent dark:to-blue-400 leading-none"
                            duration={2}
                          />
                        </motion.div>

                        <motion.div
                          className="text-lg font-medium mb-2 text-light-text dark:text-dark-text tracking-wide uppercase"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                          viewport={{ once: true }}
                        >
                          {stat.label}
                        </motion.div>

                        <motion.div
                          className="text-sm text-light-textSecondary dark:text-dark-textSecondary font-light"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 + index * 0.2, duration: 0.5 }}
                          viewport={{ once: true }}
                        >
                          {stat.description}
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollRevealSection>

        <div className="grid md:grid-cols-12 gap-12 items-start">
          {/* Left column - Bio with enhanced animations */}
          <div className="md:col-span-7">
            <ParallaxSection>
              <motion.div
                className="space-y-6"
                style={{ y, opacity }}
              >
                <TextReveal delay={0.1}>
                  <FloatingElement delay={0.2} duration={7} className="inline-block">
                    <h3 className="text-2xl font-bold mb-4 text-light-accent dark:text-dark-accent">
                      {t('about.greeting')}
                    </h3>
                  </FloatingElement>
                </TextReveal>

                <TextReveal delay={0.2}>
                  <p className="text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                    {t('about.bio')}
                  </p>
                </TextReveal>

                <TextReveal delay={0.3}>
                  <p className="text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                    {t('about.experience')}
                  </p>
                </TextReveal>

                <TextReveal delay={0.4}>
                  <p className="text-light-textSecondary dark:text-dark-textSecondary leading-relaxed">
                    I'm passionate about staying at the forefront of technology trends and continuously expanding my skill set. When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through technical articles and mentoring.
                  </p>
                </TextReveal>

                <div className="pt-4">
                  <TextReveal delay={0.5}>
                    <FloatingElement delay={0.3} duration={6} className="inline-block">
                      <h4 className="text-xl font-semibold mb-4 text-light-text dark:text-dark-text">
                        {t('about.toolbox')}
                      </h4>
                    </FloatingElement>
                  </TextReveal>

                  <div className="flex flex-wrap gap-6 mt-4">
                    {toolIcons.map((tool, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center group"
                      >
                        <FloatingElement delay={index * 0.3} duration={3 + index * 0.5}>
                          <motion.div
                            whileHover={{
                              y: -5,
                              scale: 1.1,
                              filter: "drop-shadow(0 0 8px rgba(var(--light-accent-rgb), 0.4))"
                            }}
                            className={`${tool.color} mb-2 transition-colors duration-300 group-hover:text-light-accent dark:group-hover:text-dark-accent`}
                          >
                            {tool.icon}
                          </motion.div>
                        </FloatingElement>
                        <span className="text-xs text-light-textSecondary dark:text-dark-textSecondary">
                          {tool.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </ParallaxSection>
          </div>

          {/* Right column - Skills with enhanced design */}
          <div className="md:col-span-5">
            <ScrollRevealSection direction="right" delay={0.2}>
              <div className="space-y-8">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={skillCardVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: true }}
                    className="relative group"
                  >
                    {/* Enhanced skill card with glassmorphism */}
                    <motion.div
                      className="relative overflow-hidden rounded-xl backdrop-blur-md bg-white/5 dark:bg-black/5 border border-white/10 dark:border-white/5 transition-all duration-500 p-6"
                      animate={{
                        y: [0, -3, 0],
                      }}
                      transition={{
                        duration: 4 + index,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                    >
                      <div className="relative z-10">
                        {/* Header with enhanced icon animation */}
                        <div className="flex items-center mb-3">
                          <motion.div
                            className="mr-3 text-light-accent dark:text-dark-accent"
                            animate={{
                              rotate: [0, 5, 0, -5, 0],
                              scale: [1, 1.1, 1]
                            }}
                            transition={{
                              duration: 6,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: index * 0.5
                            }}
                          >
                            {skill.icon}
                          </motion.div>

                          <motion.h3
                            className="text-lg font-medium text-light-text dark:text-dark-text"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                          >
                            {skill.title}
                          </motion.h3>
                        </div>

                        {/* Description with enhanced typography */}
                        <motion.p
                          className="text-sm text-light-textSecondary dark:text-dark-textSecondary mb-3 font-light pl-8"
                          initial={{ opacity: 0, y: 5 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                          viewport={{ once: true }}
                        >
                          {skill.description}
                        </motion.p>

                        {/* Skills tags with enhanced design */}
                        <div className="flex flex-wrap gap-2 pl-8">
                          {skill.items.map((item, itemIndex) => (
                            <motion.span
                              key={itemIndex}
                              custom={itemIndex}
                              variants={skillItemVariants}
                              initial="hidden"
                              whileInView="visible"
                              whileHover="hover"
                              viewport={{ once: true }}
                              className="px-2 py-0.5 bg-white/5 dark:bg-black/5 border border-white/10 dark:border-white/5 rounded-full text-xs text-light-textSecondary dark:text-dark-textSecondary transition-all duration-300 hover:bg-light-accent/10 dark:hover:bg-dark-accent/10"
                            >
                              {item}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </ScrollRevealSection>
          </div>
        </div>
      </motion.div>

      {/* Enhanced CSS animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes gradientAnimation {
            0% { background-position: 0% 50% }
            50% { background-position: 100% 50% }
            100% { background-position: 0% 50% }
          }
          
          :root {
            --light-accent-transparent: rgba(var(--light-accent-rgb), 0.7);
            --blue-transparent: rgba(59, 130, 246, 0.7);
          }

          .text-gradient-animated {
            background: linear-gradient(120deg, var(--light-accent), #3b82f6, var(--light-accent));
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradientAnimation 3s ease infinite;
          }
        `
      }} />
    </section>
  );
};

export default About;