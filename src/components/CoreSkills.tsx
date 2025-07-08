import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SiReact, 
  SiTypescript, 
  SiJavascript, 
  SiTailwindcss, 
  SiHtml5, 
  SiCss3, 
  SiJquery,
  SiSharp,
  SiDotnet,
  SiGithub,
  SiGit,
  SiDocker,
  SiPostman,
  SiJest
} from 'react-icons/si';
import { 
  FaDatabase as FaSqlServer,
  FaDatabase as FaOracle,
  FaDatabase as FaTsql,
  FaDatabase as FaEntityFramework,
  FaDatabase as FaWebApi,
  FaDatabase as FaBlazor,
  FaDatabase as FaAzureDevOps,
  FaDatabase as FaVsCode,
  FaDatabase as FaVisualStudio
} from 'react-icons/fa';

type SkillCategory = {
  name: string;
  color: string;
  skills: Skill[];
};

type Skill = {
  name: string;
  icon: React.ReactNode;
  proficiency: number; // 0-100
  description: string;
};

const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend Development',
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'React', icon: <SiReact className="w-8 h-8" />, proficiency: 95, description: 'Modern UI development with hooks and context' },
      { name: 'TypeScript', icon: <SiTypescript className="w-8 h-8" />, proficiency: 90, description: 'Type-safe JavaScript development' },
      { name: 'JavaScript', icon: <SiJavascript className="w-8 h-8" />, proficiency: 92, description: 'ES6+ features and modern patterns' },
      { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-8 h-8" />, proficiency: 88, description: 'Utility-first CSS framework' },
      { name: 'HTML/CSS', icon: <div className="flex gap-1"><SiHtml5 className="w-8 h-8" /><SiCss3 className="w-8 h-8" /></div>, proficiency: 95, description: 'Semantic markup and responsive design' },
      { name: 'jQuery', icon: <SiJquery className="w-8 h-8" />, proficiency: 85, description: 'DOM manipulation and AJAX' },
    ]
  },
  {
    name: 'Backend Development',
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'C#', icon: <SiSharp className="w-8 h-8" />, proficiency: 95, description: 'Object-oriented programming and LINQ' },
      { name: 'ASP.NET Core', icon: <SiDotnet className="w-8 h-8" />, proficiency: 92, description: 'Web APIs and MVC architecture' },
      { name: 'Blazor', icon: <FaBlazor className="w-8 h-8" />, proficiency: 88, description: 'WebAssembly and server-side rendering' },
      { name: 'Web API', icon: <FaWebApi className="w-8 h-8" />, proficiency: 90, description: 'RESTful services and authentication' },
      { name: 'Entity Framework', icon: <FaEntityFramework className="w-8 h-8" />, proficiency: 85, description: 'ORM and database operations' },
    ]
  },
  {
    name: 'Database & DevOps',
    color: 'from-green-500 to-emerald-500',
    skills: [
      { name: 'SQL Server', icon: <FaSqlServer className="w-8 h-8" />, proficiency: 88, description: 'Database design and optimization' },
      { name: 'Oracle DB', icon: <FaOracle className="w-8 h-8" />, proficiency: 82, description: 'Enterprise database management' },
      { name: 'T-SQL', icon: <FaTsql className="w-8 h-8" />, proficiency: 85, description: 'Stored procedures and queries' },
      { name: 'Azure DevOps', icon: <FaAzureDevOps className="w-8 h-8" />, proficiency: 80, description: 'CI/CD pipelines and deployment' },
      { name: 'Git', icon: <SiGit className="w-8 h-8" />, proficiency: 90, description: 'Version control and collaboration' },
      { name: 'Docker', icon: <SiDocker className="w-8 h-8" />, proficiency: 75, description: 'Containerization and orchestration' },
    ]
  },
  {
    name: 'Tools & Testing',
    color: 'from-orange-500 to-red-500',
    skills: [
      { name: 'VS Code', icon: <FaVsCode className="w-8 h-8" />, proficiency: 95, description: 'Code editing and extensions' },
      { name: 'Visual Studio', icon: <FaVisualStudio className="w-8 h-8" />, proficiency: 90, description: 'IDE and debugging tools' },
      { name: 'Postman', icon: <SiPostman className="w-8 h-8" />, proficiency: 85, description: 'API testing and documentation' },
      { name: 'Jest', icon: <SiJest className="w-8 h-8" />, proficiency: 80, description: 'Unit testing and mocking' },
      { name: 'GitHub', icon: <SiGithub className="w-8 h-8" />, proficiency: 88, description: 'Repository management and collaboration' },
    ]
  }
];

const CoreSkills = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: { duration: 0.2 }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (proficiency: number) => ({
      width: `${proficiency}%`,
      transition: { 
        duration: 1.5,
        ease: "easeOut",
        delay: 0.3
      }
    })
  };

  return (
    <section id="skills" className="w-full max-w-7xl mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="font-inter font-extrabold text-3xl md:text-4xl mb-4 text-primary">
          Core Skills
        </h2>
        <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
          A comprehensive toolkit of technologies and frameworks I've mastered through years of professional development
        </p>
      </motion.div>

      {/* Category Navigation */}
      <motion.div 
        className="flex flex-wrap justify-center gap-3 mb-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {skillCategories.map((category, index) => (
          <motion.button
            key={category.name}
            variants={categoryVariants}
            onClick={() => setSelectedCategory(index)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === index
                ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                : 'bg-base-200 text-base-content/70 hover:bg-base-300 hover:text-base-content'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category.name}
          </motion.button>
        ))}
      </motion.div>

      {/* Skills Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories[selectedCategory].skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={skillVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onHoverStart={() => setHoveredSkill(skill.name)}
              onHoverEnd={() => setHoveredSkill(null)}
              className="group relative bg-base-200 rounded-2xl p-6 shadow-lg border border-base-300 hover:border-primary/30 transition-all duration-300"
            >
              {/* Skill Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </div>
                <div>
                  <h3 className="font-inter font-bold text-lg text-base-content">
                    {skill.name}
                  </h3>
                  <div className="text-sm text-base-content/60">
                    {skill.proficiency}% proficiency
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-base-300 rounded-full h-2 overflow-hidden">
                  <motion.div
                    custom={skill.proficiency}
                    variants={progressVariants}
                    initial="hidden"
                    animate="visible"
                    className={`h-full bg-gradient-to-r ${skillCategories[selectedCategory].color} rounded-full`}
                  />
                </div>
              </div>

              {/* Description */}
              <AnimatePresence>
                {hoveredSkill === skill.name && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-sm text-base-content/70 leading-relaxed"
                  >
                    {skill.description}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hover Indicator */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Skills Summary */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-16 text-center"
      >
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20">
          <h3 className="font-inter font-bold text-xl mb-4 text-primary">
            Technical Expertise Summary
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div>
              <div className="font-bold text-2xl text-primary">4+</div>
              <div className="text-base-content/70">Years Experience</div>
            </div>
            <div>
              <div className="font-bold text-2xl text-primary">25+</div>
              <div className="text-base-content/70">Technologies</div>
            </div>
            <div>
              <div className="font-bold text-2xl text-primary">15+</div>
              <div className="text-base-content/70">Projects Completed</div>
            </div>
            <div>
              <div className="font-bold text-2xl text-primary">4</div>
              <div className="text-base-content/70">Specializations</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CoreSkills; 