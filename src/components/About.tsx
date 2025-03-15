// src/components/About.tsx
import { FaCode, FaServer, FaTools } from 'react-icons/fa';
import ScrollRevealSection from './shared/ScrollRevealSection';
import ParallaxSection from './shared/ParallexSection';
import GlassCard from './shared/GlassCard';
import MorphingShape from './shared/MorphingShape';

const About = () => {
  const skills = [
    {
      icon: FaCode,
      title: "Frontend Development",
      items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"]
    },
    {
      icon: FaServer,
      title: "Backend Development",
      items: ["Node.js", "Python", "Express", "MongoDB", "PostgreSQL"]
    },
    {
      icon: FaTools,
      title: "Tools & Technologies",
      items: ["Git", "Docker", "AWS", "VS Code", "Figma"]
    }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Morphing shape background */}
      <MorphingShape className="top-0 left-0 w-full h-full" color="var(--light-accent)" duration={12} />
      
      <div className="container relative z-10">
        <ScrollRevealSection>
          <h2 className="text-3xl font-bold gradient-text text-center mb-12">
            About Me
          </h2>
        </ScrollRevealSection>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <ParallaxSection >
          <ScrollRevealSection direction='up'>
            <div className="space-y-6">
              <p className="text-light-textSecondary dark:text-dark-textSecondary">
                Hello! I'm [Your Name], and I enjoy creating things that live on the internet.
                My interest in web development started back in [Year] when I decided to try
                editing custom Tumblr themes — turns out hacking together a custom reblog
                button taught me a lot about HTML & CSS!
              </p>
              <p className="text-light-textSecondary dark:text-dark-textSecondary">
                Fast-forward to today, and I've had the privilege of working at [Company/Projects].
                My main focus these days is building accessible, inclusive products and digital
                experiences.
              </p>
            </div>
            </ScrollRevealSection>
          </ParallaxSection>
          
          <div className="grid gap-6">
            {skills.map((skill, index) => (
                <ParallaxSection key={skill.title}>
                <GlassCard>
                  <div className="flex items-center space-x-4">
                    <skill.icon className="text-2xl text-light-accent dark:text-dark-accent" />
                    <h3 className="text-xl font-semibold">{skill.title}</h3>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 bg-light-primary dark:bg-dark-primary rounded-full text-sm text-light-textSecondary dark:text-dark-textSecondary"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </ParallaxSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;