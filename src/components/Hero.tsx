import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaReact, FaNodeJs, FaCode, FaDatabase } from 'react-icons/fa';
import { DiJqueryLogo } from "react-icons/di";
import { useTranslation } from 'react-i18next';
import TypewriterText from './shared/TypewriterText';
import ScrollRevealSection from './shared/ScrollRevealSection';
import LiquidButton from './shared/LiquidButton';
import TextGlitch from './shared/TextGlitch';
import Text3D from './shared/Text3D';
import MorphingShape from './shared/MorphingShape';
import FloatingIcons from './shared/FloatingIcons';
import { Link } from 'react-scroll';
import { SiDotnet } from 'react-icons/si';

const Hero = () => {
  const { t } = useTranslation();

  const floatingIcons = [
    { icon: <FaReact />, x: 10, y: 20, size: 3, delay: 0 },
    { icon: <SiDotnet  />, x: 85, y: 15, size: 4, delay: 0.2 },
    { icon: <FaCode />, x: 70, y: 70, size: 4, delay: 0.4 },
    { icon: <FaDatabase />, x: 20, y: 80, size: 2.2, delay: 0.6 },
    { icon: <DiJqueryLogo />, x: 30, y: 15, size: 4, delay: 0.6 },
    { icon: <FaNodeJs />, x: 40, y: 10, size: 3, delay: 0.6 },
  ];

  const info = {
    name: "Muhammad Zaman",
    contactDetails: {
      email: "zaman@gmail.com",
      phone: "+923001234567",
      linkedin: "https://www.linkedin.com/in/muhammad-zaman-1234567890/",
      github: "https://github.com/muhammadzaman",
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
      <MorphingShape className="top-0 left-0 w-full h-full" />
      <FloatingIcons icons={floatingIcons} />

      <div className="container relative">
        <div className="grid grid-cols-1 items-center">
          <ScrollRevealSection direction="left">
            <Text3D className="text-5xl md:text-9xl font-bold mt-2">
              <TextGlitch text={info.name} glitchInterval={5000} />
            </Text3D>
            <motion.h2
              className="text-3xl md:text-6xl font-bold text-light-textSecondary dark:text-dark-textSecondary mt-4"
            >
              {t('hero.greeting')} <TypewriterText
                texts={[
                  t('hero.title'),
                  t('hero.subtitle')
                ]}
                className="text-gradient-animated"
              />
            </motion.h2>
            <motion.p
              className="text-light-textSecondary dark:text-dark-textSecondary max-w-xl mt-6"
            >
              {t('about.bio')}
            </motion.p>
            <div className="mt-8">
              <Link to="projects" smooth={true} duration={500}>
                <LiquidButton>
                  {t('hero.cta')}
                </LiquidButton>
              </Link>
            </div>
            <motion.div
              className="flex space-x-4 mt-8"
            >
              {[
                { icon: FaGithub, href: info.contactDetails.github },
                { icon: FaLinkedin, href: info.contactDetails.linkedin },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-2xl text-light-text dark:text-dark-text hover:text-light-accent dark:hover:text-dark-accent transition-colors"
                >
                  <social.icon />
                </motion.a>
              ))}
            </motion.div>
          </ScrollRevealSection>
        </div>
      </div>
    </section>
  );
};

export default Hero;