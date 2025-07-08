import React from 'react';
import {
  FaComments,
  FaHandshake,
  FaPuzzlePiece,
  FaCrown,
  FaClock,
  FaSync,
  FaLightbulb,
  FaBalanceScale,
  FaMicrophone,
  FaSearch
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const softSkills = [
  {
    name: 'Communication Skills',
    icon: <FaComments className="w-7 h-7" />,
    desc: 'Clearly express ideas and listen actively.'
  },
  {
    name: 'Team Collaboration',
    icon: <FaHandshake className="w-7 h-7" />,
    desc: 'Work effectively with others to achieve goals.'
  },
  {
    name: 'Problem-Solving',
    icon: <FaPuzzlePiece className="w-7 h-7" />,
    desc: 'Find creative solutions to challenges.'
  },
  {
    name: 'Leadership',
    icon: <FaCrown className="w-7 h-7" />,
    desc: 'Inspire and guide teams to success.'
  },
  {
    name: 'Time Management',
    icon: <FaClock className="w-7 h-7" />,
    desc: 'Prioritize tasks and meet deadlines.'
  },
  {
    name: 'Adaptability',
    icon: <FaSync className="w-7 h-7" />,
    desc: 'Embrace change and stay flexible.'
  },
  {
    name: 'Critical Thinking',
    icon: <FaLightbulb className="w-7 h-7" />,
    desc: 'Analyze situations and make sound decisions.'
  },
  {
    name: 'Conflict Resolution',
    icon: <FaBalanceScale className="w-7 h-7" />,
    desc: 'Handle disagreements with empathy and fairness.'
  },
  {
    name: 'Presentation Skills',
    icon: <FaMicrophone className="w-7 h-7" />,
    desc: 'Engage and inform audiences confidently.'
  },
  {
    name: 'Attention to Detail',
    icon: <FaSearch className="w-7 h-7" />,
    desc: 'Notice and correct small errors for quality work.'
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const SoftSkills = () => (
  <section id="soft-skills" className="w-full max-w-7xl mx-auto py-16 px-4">
    <h2 className="font-inter font-extrabold text-3xl md:text-4xl mb-12 text-primary text-center drop-shadow-lg">
      Soft Skills
    </h2>
    <motion.div
      className="relative overflow-visible grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {softSkills.map((skill) => (
        <motion.div
          key={skill.name}
          variants={cardVariants}
          whileHover={{ scale: 1.08, boxShadow: '0 8px 32px 0 rgba(80,0,200,0.18)', y: -6 }}
          className="relative group bg-gradient-to-br from-base-200 via-base-100 to-base-300 dark:from-base-300 dark:to-base-200 rounded-2xl p-6 shadow-xl border border-base-300/60 hover:border-primary/60 transition-all duration-300 cursor-pointer overflow-visible"
        >
          {/* Animated Icon */}
          <motion.span
            whileHover={{ scale: 1.25, rotate: [0, 8, -8, 0], filter: 'drop-shadow(0 0 8px #a855f7)' }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            className="inline-flex items-center justify-center text-primary mb-3"
          >
            {skill.icon}
          </motion.span>
          <div className="font-bold text-lg text-base-content mb-1 text-center">
            {skill.name}
          </div>
          {/* Tooltip on hover */}
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-max max-w-xs px-4 py-2 rounded-xl bg-base-100 text-base-content text-sm shadow-lg opacity-0 group-hover:opacity-100 pointer-events-auto transition-opacity duration-300 border border-base-300/40 z-[999] text-center">
            {skill.desc}
            <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-3 h-3 bg-base-100 rotate-45 border-l border-t border-base-300/40"></div>
          </div>
          {/* Shine effect */}
          <span className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
            <span className="absolute left-1/2 top-0 w-2/3 h-1/3 bg-gradient-to-r from-white/40 to-transparent opacity-0 group-hover:opacity-60 blur-lg rotate-12 -translate-x-1/2 transition-all duration-500" />
          </span>
        </motion.div>
      ))}
    </motion.div>
  </section>
);

export default SoftSkills; 