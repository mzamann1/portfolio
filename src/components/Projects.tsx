// src/components/Projects.tsx
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaReact, FaNodeJs, FaDatabase, FaFigma, FaDocker, FaAws } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiNextdotjs, SiMongodb, SiPostgresql, SiExpress, SiPython, SiJavascript } from 'react-icons/si';
import HorizontalSkillsScroll from './shared/HorizontalSkillsScroll';
import { useAppSelector } from '../store/hooks';
import { selectProjects, selectSkills } from '../store/selectors/cvSelectors';
import { IProject } from '../types';
import { groupSkillsByType } from '../uttilities';

const Projects = () => {
    const projects = useAppSelector(selectProjects);
    const groupedSkills = groupSkillsByType(useAppSelector(selectSkills));

    // Define frontend skills
    const frontendSkills = [
        { name: "React", icon: <FaReact />, color: "#61DAFB" },
        { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
        { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E" },
        { name: "Next.js", icon: <SiNextdotjs />, color: "#000000" },
        { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#06B6D4" },
        { name: "Framer Motion", icon: <FaReact />, color: "#0055FF" },
    ];

    // Define backend skills
    const backendSkills = [
        { name: "Node.js", icon: <FaNodeJs />, color: "#339933" },
        { name: "Express", icon: <SiExpress />, color: "#000000" },
        { name: "Python", icon: <SiPython />, color: "#3776AB" },
        { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
        { name: "PostgreSQL", icon: <SiPostgresql />, color: "#4169E1" },
        { name: "RESTful APIs", icon: <FaDatabase />, color: "#FF6B6B" },
    ];

    // Define tools and technologies
    const toolsSkills = [
        { name: "Git", icon: <FaGithub />, color: "#F05032" },
        { name: "Docker", icon: <FaDocker />, color: "#2496ED" },
        { name: "AWS", icon: <FaAws />, color: "#FF9900" },
        { name: "Figma", icon: <FaFigma />, color: "#F24E1E" },
        { name: "CI/CD", icon: <FaDocker />, color: "#4285F4" },
        { name: "Agile", icon: <FaDatabase />, color: "#6D28D9" },
    ];

    return (
        <section id="projects" className="py-20 bg-light-primary dark:bg-dark-primary">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-light-text dark:text-dark-text">
                        My <span className="text-light-accent dark:text-dark-accent">Projects</span>
                    </h2>
                    <p className="text-light-textSecondary dark:text-dark-textSecondary max-w-2xl mx-auto">
                        Here are some of my recent projects. Each project is built with a focus on performance,
                        user experience, and clean code.
                    </p>
                </motion.div>

                {/* Technologies I work with - Horizontal Skills Animation */}
                <div className="mb-16">
                    <h3 className="text-xl font-semibold text-center mb-6 text-light-text dark:text-dark-text">
                        Technologies I Work With
                    </h3>

                    <div className="space-y-8">
                        {Object.entries(groupedSkills).map(([category, skills], index) => (
                            <div key={category}>
                                <p className="text-sm uppercase tracking-wider text-light-textSecondary dark:text-dark-textSecondary mb-2 text-center">
                                    {category.charAt(0).toUpperCase() + category.slice(1)} {/* Capitalizing category name */}
                                </p>
                                <HorizontalSkillsScroll
                                    skills={[...skills, ...skills]}
                                    className="h-14"
                                    speed={60 + index * 10} // Varying speed slightly
                                    direction={index % 2 === 0 ? "left" : "right"} // Alternating direction
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-light-secondary dark:bg-dark-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <div className="h-48 bg-gray-300 dark:bg-gray-700 relative">
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-light-textSecondary dark:text-dark-textSecondary">
                                        Project Image
                                    </div>
                                )}
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 text-light-text dark:text-dark-text">
                                    {project.title}
                                </h3>
                                <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-light-accent/10 dark:bg-dark-accent/20 rounded-full text-xs text-light-accent dark:text-dark-accent"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex space-x-4">
                                    <a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-light-textSecondary dark:text-dark-textSecondary hover:text-light-accent dark:hover:text-dark-accent transition-colors"
                                        aria-label="View GitHub Repository"
                                    >
                                        <FaGithub className="text-xl" />
                                    </a>
                                    <a
                                        href={project.links.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-light-textSecondary dark:text-dark-textSecondary hover:text-light-accent dark:hover:text-dark-accent transition-colors"
                                        aria-label="View Live Demo"
                                    >
                                        <FaExternalLinkAlt className="text-xl" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;