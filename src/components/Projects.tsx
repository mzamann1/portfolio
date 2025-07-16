import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';
import { useProjectsData } from '../hooks/usePortfolioData';
import { usePortfolioStore } from '../stores/portfolioStore';
import { useUIStore } from '../stores/uiStore';
import ProjectFilters from './ProjectFilters';
import Loading from './Loading';
import ProjectModal from './ProjectModal';
import { FaGithub, FaExternalLinkAlt, FaEye, FaCode } from 'react-icons/fa';
import { useLanguageFont } from '../hooks/useLanguageFont';
import type { Project } from '../types/PortfolioData';

const Projects = () => {
  const { t } = useTranslation();
  const { data: projectsData, loading, error } = useProjectsData();
  const { projectFilters } = usePortfolioStore();
  const { searchQuery } = useUIStore();
  const { fontClass, heading, body } = useLanguageFont();
  
  // Modal state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Filter projects based on search and filters
  const filteredProjects = useMemo(() => {
    if (!projectsData?.all) return [];
    
    let filtered = projectsData.all;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.technologies.some((tech: string) => tech.toLowerCase().includes(query))
      );
    }

    // Filter by skills
    if (projectFilters.skills.length > 0) {
      filtered = filtered.filter(project =>
        projectFilters.skills.some(skillId =>
          project.technologies.includes(skillId)
        )
      );
    }

    // Filter by categories
    if (projectFilters.categories.length > 0) {
      filtered = filtered.filter(project =>
        projectFilters.categories.some(categoryId =>
          project.category === categoryId
        )
      );
    }

    return filtered;
  }, [projectsData, searchQuery, projectFilters]);

  const featuredProjects = useMemo(() => {
    return filteredProjects.filter(project => project.featured);
  }, [filteredProjects]);

  if (loading) return <Loading />;
  if (error) return (
    <div className={`min-h-screen flex items-center justify-center ${fontClass}`}>
      <div className="text-center">
        <div className="text-6xl mb-4">😔</div>
        <h2 className={heading}>Oops! Something went wrong</h2>
        <p className={body}>Error loading projects: {error}</p>
      </div>
    </div>
  );

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

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const ProjectCard = ({ project, isFeatured = false, compact = false }: { project: Project; isFeatured?: boolean; compact?: boolean }) => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className={`group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br from-base-100 to-base-200/50 backdrop-blur-sm border border-base-300/60 hover:border-primary/60 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer ${compact ? 'max-w-2xl mx-auto' : ''}`}
      onClick={() => openModal(project)}
      // Hover effects handled by CSS
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Project Image */}
      <div className={`relative ${compact ? 'h-32 sm:h-40' : 'h-40 sm:h-48 lg:h-64'} overflow-hidden`}>
        <motion.img
          src={project.image || 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&h=300&fit=crop'}
          alt={project.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        
        {/* Featured Badge */}
        {project.featured && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-gradient-to-r from-primary to-secondary text-primary-content px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-bold shadow-lg"
          >
            ⭐ Featured
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex gap-2 sm:gap-3">
            {/* View Details Button */}
            <motion.button
              className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-primary to-secondary text-primary-content rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                openModal(project);
              }}
            >
              <FaEye className="w-3 h-3 sm:w-4 sm:h-4" />
            </motion.button>
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 bg-primary hover:bg-primary-focus text-primary-content rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                <FaExternalLinkAlt className="w-3 h-3 sm:w-4 sm:h-4" />
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 bg-base-100 hover:bg-base-200 text-base-content rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.a>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        <div className="flex items-start justify-between mb-2 sm:mb-3">
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-base-content group-hover:text-primary transition-colors duration-300">
            {project.name}
          </h3>
          <div className="flex gap-1 sm:gap-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-pulse" />
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-secondary rounded-full animate-pulse delay-100" />
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent rounded-full animate-pulse delay-200" />
          </div>
        </div>
        
        <p className="text-base-content/70 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          {project.technologies.slice(0, isFeatured ? 4 : 3).map((tech: string, index: number) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary text-xs font-medium rounded-full border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105"
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies.length > (isFeatured ? 4 : 3) && (
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-base-200 text-base-content/60 text-xs rounded-full">
              +{project.technologies.length - (isFeatured ? 4 : 3)}
            </span>
          )}
        </div>

        {/* Project Details */}
        {project.details && project.details.length > 0 && (
          <div className="space-y-1.5 sm:space-y-2">
            <h4 className="text-xs sm:text-sm font-semibold text-base-content/80 flex items-center gap-1.5 sm:gap-2">
              <FaEye className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              Key Features
            </h4>
            <ul className="space-y-0.5 sm:space-y-1">
              {project.details.slice(0, isFeatured ? 2 : 1).map((detail: string, index: number) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-xs text-base-content/60 flex items-start gap-1.5 sm:gap-2"
                >
                  <span className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-primary rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                  {detail}
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Bottom Border Animation */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      
      {/* Click Indicator */}
      <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-base-200/80 text-base-content/70 text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
          Click to view details
        </div>
      </div>
      
      {/* Shine effect */}
      <span className="absolute inset-0 rounded-xl sm:rounded-2xl pointer-events-none overflow-hidden">
        <span className="absolute left-1/2 top-0 w-2/3 h-1/3 bg-gradient-to-r from-white/40 to-transparent opacity-0 group-hover:opacity-60 blur-lg rotate-12 -translate-x-1/2 transition-all duration-500" />
      </span>
    </motion.div>
  );

  return (
          <section id="projects" data-section="projects" className={`w-full max-w-7xl mx-auto py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-12 ${fontClass}`}>
      <motion.div
        className="container mx-auto px-2 sm:px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`${heading} text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6`}>{t('projects', 'Projects')}</h2>
            <div className="w-24 sm:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4 sm:mb-6" />
           {/* <p className={body + ' text-xl max-w-3xl mx-auto leading-relaxed'}>{projectsData?.description}</p> */}
          </motion.div>
        </div>

        {/* Project Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ProjectFilters />
        </motion.div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <motion.div
            className="mb-16 sm:mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('featured_projects', 'Featured Projects')}
              </h3>
              <p className="text-base-content/60 text-sm sm:text-base">
                {t('featured_description', 'Handpicked projects that showcase my best work')}
              </p>
            </div>
              <motion.div
              className={`grid gap-4 sm:gap-6 md:gap-8 ${featuredProjects.length === 1 ? 'justify-center' : ''}`}
              style={featuredProjects.length === 1 ? { display: 'flex' } : {
                gridTemplateColumns: featuredProjects.length === 2 
                  ? 'repeat(auto-fit, minmax(280px, 1fr))' 
                  : 'repeat(auto-fit, minmax(320px, 1fr))'
              }}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <AnimatePresence>
                {featuredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} isFeatured={true} compact={featuredProjects.length === 1} />
                ))}
              </AnimatePresence>
            </motion.div>
              </motion.div>
        )}

        {/* All Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t('all_projects', 'All Projects')}
            </h3>
            <p className="text-base-content/60 text-sm sm:text-base">
              {t('all_projects_description', 'Complete portfolio of my work')}
            </p>
          </div>

          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 sm:py-20"
            >
              <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">🔍</div>
              <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4">{t('no_projects_found', 'No projects found')}</h3>
              <p className="text-base-content/70 text-sm sm:text-lg max-w-md mx-auto">
                {t('no_projects_message', 'Try adjusting your filters or search terms to find what you\'re looking for.')}
              </p>
            </motion.div>
          ) : (
              <motion.div
              className="grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <AnimatePresence>
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
              </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold mb-4">{t('ready_to_collaborate', 'Ready to collaborate?')}</h3>
            <p className="text-base-content/70 mb-6 max-w-2xl mx-auto">
              {t('collaboration_message', 'Let\'s work together to bring your ideas to life. I\'m always excited to take on new challenges and create amazing digital experiences.')}
            </p>
            <motion.button
              className="btn btn-primary btn-lg rounded-full shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('get_in_touch', 'Get in Touch')}
              <FaCode className="ml-2" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
};

export default Projects; 