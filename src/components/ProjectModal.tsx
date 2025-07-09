import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGithub, FaExternalLinkAlt, FaCalendarAlt, FaCode, FaEye } from 'react-icons/fa';
import { useLanguageFont } from '../hooks/useLanguageFont';
import type { Project } from '../types/PortfolioData';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  const { fontClass, heading, body } = useLanguageFont();

  // Backdrop animation
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  // Modal animation
  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.3
      }
    }
  };

  // Content animation
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.5
      }
    }
  };

  // Technology badge animation
  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3 + i * 0.05,
        duration: 0.3
      }
    })
  };

  // Feature list animation
  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.4 + i * 0.1,
        duration: 0.4
      }
    })
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          
          {/* Modal */}
          <motion.div
            className={`relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-gradient-to-br from-base-100 to-base-200/50 backdrop-blur-sm border border-base-300/20 shadow-2xl ${fontClass}`}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-base-200/80 hover:bg-base-300/80 text-base-content rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <FaTimes className="w-4 h-4" />
            </motion.button>

            {/* Project Image */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              <motion.img
                src={project.image || 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=400&fit=crop'}
                alt={project.name}
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent" />
              
              {/* Featured Badge */}
              {project.featured && (
                <motion.div
                  className="absolute top-4 left-4 bg-gradient-to-r from-primary to-secondary text-primary-content px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.4, type: "spring" }}
                >
                  ⭐ Featured Project
                </motion.div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-16rem)]">
              <motion.div variants={contentVariants} initial="hidden" animate="visible">
                                 {/* Header */}
                 <div className="mb-6">
                   <motion.h2 
                     className={`${heading} text-3xl md:text-4xl mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent`}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.5 }}
                   >
                     {project.name}
                   </motion.h2>
                   
                   <motion.p 
                     className={`${body} text-lg text-base-content/70 leading-relaxed`}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.6 }}
                   >
                     {project.modalDetails?.longDescription || 'No description available'}
                   </motion.p>
                 </div>

                {/* Project Info */}
                <motion.div 
                  className="flex flex-wrap items-center gap-4 mb-6 text-sm text-base-content/60"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="w-4 h-4 text-primary" />
                    <span>{project.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCode className="w-4 h-4 text-secondary" />
                    <span>{project.technologies.length} technologies</span>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                  className="flex flex-wrap gap-3 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-lg rounded-full shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaExternalLinkAlt className="w-4 h-4 mr-2" />
                      View Live
                    </motion.a>
                  )}
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-lg rounded-full shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGithub className="w-5 h-5 mr-2" />
                      View Code
                    </motion.a>
                  )}
                </motion.div>

                {/* Technologies */}
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <h3 className={`${heading} text-xl mb-4 flex items-center gap-2`}>
                    <FaCode className="w-5 h-5 text-primary" />
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech, index) => (
                      <motion.span
                        key={tech}
                        custom={index}
                        variants={badgeVariants}
                        initial="hidden"
                        animate="visible"
                        className="px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary text-sm font-medium rounded-full border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:scale-105"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                                 {/* Project Details */}
                 {project.details && project.details.length > 0 && (
                   <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 1.0 }}
                   >
                     <h3 className={`${heading} text-xl mb-4 flex items-center gap-2`}>
                       <FaEye className="w-5 h-5 text-secondary" />
                       Key Features
                     </h3>
                     <ul className="space-y-3">
                       {project.details.map((detail, index) => (
                         <motion.li
                           key={index}
                           custom={index}
                           variants={featureVariants}
                           initial="hidden"
                           animate="visible"
                           className="flex items-start gap-3 text-base-content/80"
                         >
                           <span className="w-2 h-2 bg-gradient-to-r from-primary to-secondary rounded-full mt-2 flex-shrink-0" />
                           <span className="leading-relaxed">{detail}</span>
                         </motion.li>
                       ))}
                     </ul>
                   </motion.div>
                 )}

                 {/* Project Role & Duration */}
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 1.1 }}
                   className="grid md:grid-cols-2 gap-6 mb-8"
                 >
                   <div className="bg-base-200/50 rounded-xl p-4">
                     <h4 className="font-semibold text-primary mb-2">My Role</h4>
                     <p className="text-base-content/80">{project.modalDetails.role}</p>
                   </div>
                   <div className="bg-base-200/50 rounded-xl p-4">
                     <h4 className="font-semibold text-secondary mb-2">Duration</h4>
                     <p className="text-base-content/80">{project.modalDetails.duration}</p>
                   </div>
                 </motion.div>

                 {/* Challenges & Solutions */}
                 <motion.div
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 1.2 }}
                   className="grid md:grid-cols-2 gap-6 mb-8"
                 >
                   <div>
                     <h3 className={`${heading} text-xl mb-4 flex items-center gap-2`}>
                       <span className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">!</span>
                       Challenges
                     </h3>
                     <ul className="space-y-2">
                       {project.modalDetails.challenges.map((challenge, index) => (
                         <motion.li
                           key={index}
                           custom={index}
                           variants={featureVariants}
                           initial="hidden"
                           animate="visible"
                           className="flex items-start gap-3 text-base-content/80"
                         >
                           <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                           <span className="leading-relaxed">{challenge}</span>
                         </motion.li>
                       ))}
                     </ul>
                   </div>
                   <div>
                     <h3 className={`${heading} text-xl mb-4 flex items-center gap-2`}>
                       <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>
                       Solutions
                     </h3>
                     <ul className="space-y-2">
                       {project.modalDetails.solutions.map((solution, index) => (
                         <motion.li
                           key={index}
                           custom={index}
                           variants={featureVariants}
                           initial="hidden"
                           animate="visible"
                           className="flex items-start gap-3 text-base-content/80"
                         >
                           <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                           <span className="leading-relaxed">{solution}</span>
                         </motion.li>
                       ))}
                     </ul>
                   </div>
                 </motion.div>

                 {/* Impact */}
                 {project.modalDetails.impact && project.modalDetails.impact.length > 0 && (
                   <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 1.3 }}
                     className="mb-8"
                   >
                     <h3 className={`${heading} text-xl mb-4 flex items-center gap-2`}>
                       <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">📈</span>
                       Impact & Results
                     </h3>
                     <ul className="space-y-3">
                       {project.modalDetails.impact.map((impact, index) => (
                         <motion.li
                           key={index}
                           custom={index}
                           variants={featureVariants}
                           initial="hidden"
                           animate="visible"
                           className="flex items-start gap-3 text-base-content/80"
                         >
                           <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                           <span className="leading-relaxed">{impact}</span>
                         </motion.li>
                       ))}
                     </ul>
                   </motion.div>
                 )}

                 {/* Lessons Learned */}
                 {project.modalDetails.lessonsLearned && project.modalDetails.lessonsLearned.length > 0 && (
                   <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 1.4 }}
                     className="mb-8"
                   >
                     <h3 className={`${heading} text-xl mb-4 flex items-center gap-2`}>
                       <span className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs">🎓</span>
                       Lessons Learned
                     </h3>
                     <ul className="space-y-3">
                       {project.modalDetails.lessonsLearned.map((lesson, index) => (
                         <motion.li
                           key={index}
                           custom={index}
                           variants={featureVariants}
                           initial="hidden"
                           animate="visible"
                           className="flex items-start gap-3 text-base-content/80"
                         >
                           <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                           <span className="leading-relaxed">{lesson}</span>
                         </motion.li>
                       ))}
                     </ul>
                   </motion.div>
                 )}

                 {/* Technical Details */}
                 {(project.modalDetails.architecture || project.modalDetails.performance || project.modalDetails.security || project.modalDetails.testing || project.modalDetails.deployment) && (
                   <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 1.5 }}
                     className="mb-8"
                   >
                     <h3 className={`${heading} text-xl mb-4 flex items-center gap-2`}>
                       <FaCode className="w-5 h-5 text-accent" />
                       Technical Details
                     </h3>
                     <div className="grid md:grid-cols-2 gap-6">
                       {project.modalDetails.architecture && (
                         <div className="bg-base-200/50 rounded-xl p-4">
                           <h4 className="font-semibold text-primary mb-2">Architecture</h4>
                           <p className="text-base-content/80">{project.modalDetails.architecture}</p>
                         </div>
                       )}
                       {project.modalDetails.deployment && (
                         <div className="bg-base-200/50 rounded-xl p-4">
                           <h4 className="font-semibold text-secondary mb-2">Deployment</h4>
                           <p className="text-base-content/80">{project.modalDetails.deployment}</p>
                         </div>
                       )}
                       {project.modalDetails.performance && project.modalDetails.performance.length > 0 && (
                         <div className="bg-base-200/50 rounded-xl p-4">
                           <h4 className="font-semibold text-accent mb-2">Performance</h4>
                           <ul className="space-y-1">
                             {project.modalDetails.performance.map((perf, index) => (
                               <li key={index} className="text-base-content/80 text-sm">• {perf}</li>
                             ))}
                           </ul>
                         </div>
                       )}
                       {project.modalDetails.security && project.modalDetails.security.length > 0 && (
                         <div className="bg-base-200/50 rounded-xl p-4">
                           <h4 className="font-semibold text-error mb-2">Security</h4>
                           <ul className="space-y-1">
                             {project.modalDetails.security.map((sec, index) => (
                               <li key={index} className="text-base-content/80 text-sm">• {sec}</li>
                             ))}
                           </ul>
                         </div>
                       )}
                       {project.modalDetails.testing && project.modalDetails.testing.length > 0 && (
                         <div className="bg-base-200/50 rounded-xl p-4">
                           <h4 className="font-semibold text-success mb-2">Testing</h4>
                           <ul className="space-y-1">
                             {project.modalDetails.testing.map((test, index) => (
                               <li key={index} className="text-base-content/80 text-sm">• {test}</li>
                             ))}
                           </ul>
                         </div>
                       )}
                     </div>
                   </motion.div>
                 )}

                 {/* Screenshots */}
                 {project.modalDetails.screenshots && project.modalDetails.screenshots.length > 0 && (
                   <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 1.6 }}
                     className="mb-8"
                   >
                     <h3 className={`${heading} text-xl mb-4 flex items-center gap-2`}>
                       <span className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs">📸</span>
                       Screenshots
                     </h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {project.modalDetails.screenshots.map((screenshot, index) => (
                         <motion.img
                           key={index}
                           src={screenshot}
                           alt={`${project.name} screenshot ${index + 1}`}
                           className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                           initial={{ opacity: 0, scale: 0.9 }}
                           animate={{ opacity: 1, scale: 1 }}
                           transition={{ delay: 1.7 + index * 0.1 }}
                           whileHover={{ scale: 1.05 }}
                         />
                       ))}
                     </div>
                   </motion.div>
                 )}
              </motion.div>
            </div>

            {/* Bottom Border Animation */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              style={{ transformOrigin: 'left' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal; 