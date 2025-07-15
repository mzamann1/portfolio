import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguageFont } from '../hooks/useLanguageFont';
import { useWorkExperienceData } from '../hooks/usePortfolioData';
import { 
  FaRegCircle, 
  FaBriefcase, 
  FaStar, 
  FaCircle,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaChevronRight,
  FaChevronLeft,
  FaFilter,
  FaSearch,
  FaTimes,
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaExpand,
  FaCompress,
  FaTrophy,
  FaChartLine,
  FaUsers,
  FaShieldAlt,
  FaRocket
} from "react-icons/fa";
import { useState, useRef, useEffect, useMemo } from 'react';

// Type definition for achievement items
type AchievementItem = {
  text: string | (string | { bold: string | string[] })[];
  sub?: AchievementItem[];
  icon?: string;
};

// Timeline card variants
const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50, 
    scale: 0.9,
    rotateX: -15
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    rotateX: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.1
    } 
  },
  hover: {
    y: -8,
    scale: 1.02,
    rotateX: 2,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

const timelineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const lineVariants = {
  hidden: { scaleY: 0 },
  visible: { 
    scaleY: 1,
    transition: { duration: 1.2, ease: "easeInOut" }
  }
};

const controlVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Helper to render achievement text with selective bolding
function renderAchievementText(textArr: (string | { bold: string | string[] })[]) {
  return textArr.map((part, i) => {
    if (typeof part === "string") return part;
    if (Array.isArray(part.bold)) {
      return part.bold.map((b, j) => (
        <span key={i + '-' + j} className="animate-gravity-bounce inline-block">
          <span className="font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {b}
          </span>
        </span>
      ));
    }
    return (
      <span key={i} className="animate-gravity-bounce inline-block">
        <span className="font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          {part.bold}
        </span>
      </span>
    );
  });
}

// Level-based icon mapping with professional icons
const levelIcons = [
  <FaBriefcase className="w-4 h-4" />,    // Level 1 - Main sections (Professional work)
  <FaStar className="w-4 h-4" />,         // Level 2 - Subsections (Key achievements)
  <FaCircle className="w-4 h-4" />        // Level 3 - Details (Specific points)
];

// Helper to extract percentage from text
function extractPercentage(text: string): number | null {
  const match = text.match(/(\d+)%/);
  return match ? parseInt(match[1]) : null;
}

// Helper to detect achievement type
function getAchievementType(text: string): 'performance' | 'leadership' | 'security' | 'architecture' | 'recognition' | 'general' {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('%') || lowerText.includes('performance') || lowerText.includes('improved')) {
    return 'performance';
  }
  if (lowerText.includes('team') || lowerText.includes('led') || lowerText.includes('headed')) {
    return 'leadership';
  }
  if (lowerText.includes('security') || lowerText.includes('authentication') || lowerText.includes('oauth') || lowerText.includes('mfa')) {
    return 'security';
  }
  if (lowerText.includes('architecture') || lowerText.includes('clean') || lowerText.includes('cqrs') || lowerText.includes('micro')) {
    return 'architecture';
  }
  if (lowerText.includes('achiever') || lowerText.includes('award') || lowerText.includes('recognition')) {
    return 'recognition';
  }
  return 'general';
}

// Helper to get achievement icon
function getAchievementIcon(type: string) {
  switch (type) {
    case 'performance':
      return <FaChartLine className="w-4 h-4 text-green-500" />;
    case 'leadership':
      return <FaUsers className="w-4 h-4 text-blue-500" />;
    case 'security':
      return <FaShieldAlt className="w-4 h-4 text-purple-500" />;
    case 'architecture':
      return <FaRocket className="w-4 h-4 text-orange-500" />;
    case 'recognition':
      return <FaTrophy className="w-4 h-4 text-yellow-500" />;
    default:
      return <FaStar className="w-4 h-4 text-primary" />;
  }
}

// Achievement visualization component
function AchievementVisualization({ text }: { text: string }) {
  const percentage = extractPercentage(text);
  const achievementType = getAchievementType(text);
  
  return (
    <div className="flex items-center gap-2 mb-2">
      {getAchievementIcon(achievementType)}
      <div className="flex-1">
        {percentage ? (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-base-content/80">
              {text.replace(/(\d+)%/, '')}
            </span>
            <div className="flex items-center gap-1">
              <motion.div
                className="text-lg font-bold text-green-500"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {percentage}%
              </motion.div>
              <div className="w-16 h-2 bg-base-300 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          </div>
        ) : (
          <span className="text-sm text-base-content/80">{text}</span>
        )}
      </div>
    </div>
  );
}

// Enhanced achievement rendering with visualizations
function renderAchievementsWithVisualizations(achievements: (string | AchievementItem)[], level = 0) {
  const ml = level === 0 ? 'ml-0' : level === 1 ? 'ml-5' : 'ml-8';
  return (
    <ul className={`list-none ${ml} space-y-3 text-base-content/90 leading-relaxed`}>
      {achievements.map((item, idx) => {
        if (typeof item === 'string') {
          return (
            <li key={idx} className="flex items-start">
              {level >= 1 && <FaRegCircle className="inline-block mr-2 text-primary align-middle mt-1" />}
                             <AchievementVisualization text={item} />
            </li>
          );
        } else {
          const iconIndex = Math.min(level - 1, levelIcons.length - 1);
          const IconComponent = level >= 1 ? levelIcons[iconIndex] : null;
          
          
          return (
            <li key={idx} className={level === 0 ? "mt-4" : ""}>
              {level >= 1 && (
                <span className="inline-block mr-2 text-primary align-middle mt-1">
                  {IconComponent || <FaRegCircle size={14} />}
                </span>
              )}
              <div className={
                level === 0
                  ? "font-extrabold not-italic text-base md:text-lg text-primary mb-3 inline-block"
                  : "not-italic text-base-content text-sm"
              }>
                {Array.isArray(item.text)
                  ? renderAchievementText(item.text)
                  : item.text}
              </div>
              {item.sub && item.sub.length > 0 && (
                <div className="mt-3 space-y-2">
                  {item.sub.map((subItem, subIdx) => {
                    if (typeof subItem === 'string') {
                                             return (
                         <div key={subIdx} className="flex items-start">
                           <FaRegCircle className="inline-block mr-2 text-primary align-middle mt-1" />
                           <AchievementVisualization text={subItem} />
                         </div>
                       );
                     } else {
                       const subText = Array.isArray(subItem.text) ? subItem.text.join('') : subItem.text;
                       return (
                         <div key={subIdx} className="flex items-start">
                           <FaRegCircle className="inline-block mr-2 text-primary align-middle mt-1" />
                           <AchievementVisualization text={subText} />
                         </div>
                       );
                    }
                  })}
                </div>
              )}
            </li>
          );
        }
      })}
    </ul>
  );
}

// Helper to get initials from company name
function getInitials(name: string) {
  return name
    .split(' ')
    .map((word) => word[0]?.toUpperCase() || '')
    .join('')
    .slice(0, 2);
}

// Helper to generate a color from a string
function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 70%, 60%)`;
  return color;
}

const WorkExperience = () => {
  const { t } = useTranslation();
  const { fontClass, heading, body } = useLanguageFont();
  const { data: workExperienceData, loading, error } = useWorkExperienceData();
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null);
  const [isRTL, setIsRTL] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSkills, setFilterSkills] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'timeline' | 'compact'>('timeline');
  const timelineRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

  // Detect RTL language
  useEffect(() => {
    const currentLang = localStorage.getItem('i18nextLng') || 'en';
    setIsRTL(currentLang === 'ar');
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && workExperienceData?.experiences) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const next = (prev + 1) % workExperienceData.experiences.length;
          setSelectedExperience(workExperienceData.experiences[next].id);
          return next;
        });
      }, 3000);
    } else if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, workExperienceData]);

  // Filter and search logic
  const filteredExperiences = useMemo(() => {
    if (!workExperienceData?.experiences) return [];
    
    let filtered = workExperienceData.experiences;
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(exp => 
        exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Skills filter
    if (filterSkills.length > 0) {
      filtered = filtered.filter(exp =>
        filterSkills.every(skill => exp.skills.includes(skill))
      );
    }
    
    return filtered;
  }, [workExperienceData, searchTerm, filterSkills]);

  // Get all unique skills for filter
  const allSkills = useMemo(() => {
    if (!workExperienceData?.experiences) return [];
    const skills = new Set<string>();
    workExperienceData.experiences.forEach(exp => {
      exp.skills.forEach(skill => skills.add(skill));
    });
    return Array.from(skills).sort();
  }, [workExperienceData]);

  // Navigation functions
  const goToNext = () => {
    if (filteredExperiences.length > 0) {
      const nextIndex = (currentIndex + 1) % filteredExperiences.length;
      setCurrentIndex(nextIndex);
      setSelectedExperience(filteredExperiences[nextIndex].id);
    }
  };

  const goToPrevious = () => {
    if (filteredExperiences.length > 0) {
      const prevIndex = currentIndex === 0 ? filteredExperiences.length - 1 : currentIndex - 1;
      setCurrentIndex(prevIndex);
      setSelectedExperience(filteredExperiences[prevIndex].id);
    }
  };

  const goToIndex = (index: number) => {
    if (filteredExperiences[index]) {
      setCurrentIndex(index);
      setSelectedExperience(filteredExperiences[index].id);
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilterSkills([]);
    setCurrentIndex(0);
    setSelectedExperience(filteredExperiences[0]?.id || null);
  };

  if (loading) {
    return (
      <section id="experience" data-section="experience" className={`w-full container mx-auto py-16 px-4 md:px-12 ${fontClass}`}>
        <h2 className={heading}>
          {t('work_experience', 'Work Experience')}
        </h2>
        <div className={body + ' text-lg text-base-content/60 py-12'}>{t('loading', 'Loading...')}</div>
      </section>
    );
  }

  if (error || !workExperienceData?.experiences) {
    return (
      <section id="experience" data-section="experience" className={`w-full container mx-auto py-16 px-4 md:px-12 ${fontClass}`}>
        <h2 className={heading}>
          {t('work_experience', 'Work Experience')}
        </h2>
        <div className={body + ' text-center text-lg text-base-content/60 py-12'}>
          {error || t('no_work_experience_data', 'No work experience data available')}
        </div>
      </section>
    );
  }

  const experiences = filteredExperiences;

  return (
    <section id="experience" data-section="experience" className={`w-full container mx-auto py-16 px-4 md:px-12 ${fontClass}`}>
      <motion.h2 
        className={heading}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {t('work_experience', 'Work Experience')}
      </motion.h2>

      {/* Enhanced Controls */}
      <motion.div 
        className="flex flex-wrap items-center justify-between gap-4 mt-8 mb-12"
        variants={controlVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Search and Filter Controls */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40 w-4 h-4" />
            <input
              type="text"
              placeholder={t('search_experience', 'Search experience...')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-base-200 dark:bg-base-400 rounded-lg border border-base-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
              showFilters 
                ? 'bg-primary text-primary-content border-primary' 
                : 'bg-base-200 dark:bg-base-400 border-base-300 hover:border-primary'
            }`}
          >
            <FaFilter className="w-4 h-4" />
            <span className="text-sm font-medium">{t('filter', 'Filter')}</span>
          </button>

          {/* View Mode Toggle */}
          <button
            onClick={() => setViewMode(viewMode === 'timeline' ? 'compact' : 'timeline')}
            className="flex items-center gap-2 px-4 py-2 bg-base-200 dark:bg-base-400 rounded-lg border border-base-300 hover:border-primary transition-all duration-300"
          >
            {viewMode === 'timeline' ? <FaCompress className="w-4 h-4" /> : <FaExpand className="w-4 h-4" />}
            <span className="text-sm font-medium">
              {viewMode === 'timeline' ? t('compact_view', 'Compact') : t('timeline_view', 'Timeline')}
            </span>
          </button>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrevious}
            disabled={experiences.length <= 1}
            className="p-2 rounded-lg bg-base-200 dark:bg-base-400 border border-base-300 hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <FaStepBackward className="w-4 h-4" />
          </button>
          
          <button
            onClick={toggleAutoPlay}
            className={`p-2 rounded-lg border transition-all duration-300 ${
              isAutoPlaying 
                ? 'bg-secondary text-secondary-content border-secondary' 
                : 'bg-base-200 dark:bg-base-400 border-base-300 hover:border-secondary'
            }`}
          >
            {isAutoPlaying ? <FaPause className="w-4 h-4" /> : <FaPlay className="w-4 h-4" />}
          </button>
          
          <button
            onClick={goToNext}
            disabled={experiences.length <= 1}
            className="p-2 rounded-lg bg-base-200 dark:bg-base-400 border border-base-300 hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <FaStepForward className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 overflow-hidden"
          >
            <div className="bg-base-200 dark:bg-base-400 rounded-xl p-6 border border-base-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-base-content">{t('filter_by_skills', 'Filter by Skills')}</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary hover:text-primary-focus transition-colors"
                >
                  {t('clear_all', 'Clear All')}
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {allSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => {
                      setFilterSkills(prev => 
                        prev.includes(skill) 
                          ? prev.filter(s => s !== skill)
                          : [...prev, skill]
                      );
                    }}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                      filterSkills.includes(skill)
                        ? 'bg-primary text-primary-content'
                        : 'bg-base-300 dark:bg-base-500 text-base-content hover:bg-base-400'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
              
              {filterSkills.length > 0 && (
                <div className="mt-4 text-sm text-base-content/70">
                  {t('showing_experiences_with', 'Showing experiences with')}: {filterSkills.join(', ')}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Indicator */}
      {experiences.length > 0 && (
        <motion.div 
          className="flex justify-center mb-8"
          variants={controlVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 bg-base-200 dark:bg-base-400 rounded-full p-2">
            {experiences.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-base-300 hover:bg-base-400'
                }`}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Results Count */}
      {experiences.length !== workExperienceData.experiences.length && (
        <motion.div 
          className="text-center mb-8 text-base-content/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {t('showing_results', 'Showing')} {experiences.length} {t('of', 'of')} {workExperienceData.experiences.length} {t('experiences', 'experiences')}
        </motion.div>
      )}

      {/* Interactive Timeline */}
      <div className="relative mt-8">
        {/* Timeline Line */}
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-primary via-secondary to-accent h-full rounded-full"
          variants={lineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />

        {/* Timeline Content */}
        <motion.div
          ref={timelineRef}
          className="relative"
          variants={timelineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {experiences.map((exp, idx) => {
            const isLeft = idx % 2 === 0;
            const isSelected = selectedExperience === exp.id;
            const isCurrent = idx === currentIndex;
            
            return (
              <motion.div
                key={exp.id}
                className={`relative mb-16 ${isLeft ? 'left-timeline' : 'right-timeline'}`}
                variants={cardVariants}
              >
                {/* Timeline Node */}
                <motion.div
                  className={`absolute top-8 ${isLeft ? 'right-0' : 'left-0'} transform ${isLeft ? 'translate-x-1/2' : '-translate-x-1/2'} z-30`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="relative">
                    <div className={`w-6 h-6 rounded-full border-4 border-base-100 shadow-lg transition-all duration-300 ${
                      isCurrent 
                        ? 'bg-gradient-to-r from-primary to-secondary scale-125' 
                        : 'bg-gradient-to-r from-base-300 to-base-400'
                    }`}></div>
                    <motion.div
                      className="absolute inset-0 w-6 h-6 bg-primary rounded-full opacity-0"
                      animate={isSelected ? { opacity: [0, 0.3, 0], scale: [1, 1.5, 1] } : {}}
                      transition={{ duration: 1.5, repeat: isSelected ? Infinity : 0 }}
                    />
                  </div>
                </motion.div>

                {/* Experience Card */}
                <motion.div
                  className={`w-full max-w-lg ${isLeft ? 'mr-auto pr-8' : 'ml-auto pl-8'} ${isRTL ? (isLeft ? 'ml-auto pl-8' : 'mr-auto pr-8') : ''}`}
                  variants={cardVariants}
                  whileHover="hover"
                  onClick={() => setSelectedExperience(isSelected ? null : exp.id)}
                >
                  <motion.div
                    className={`relative bg-base-200 dark:bg-base-400 rounded-2xl p-6 shadow-xl border transition-all duration-500 cursor-pointer group ${
                      isSelected 
                        ? 'shadow-2xl border-primary/60 bg-gradient-to-br from-base-200 to-base-300 dark:from-base-400 dark:to-base-500' 
                        : isCurrent
                        ? 'border-secondary/60 shadow-lg'
                        : 'border-base-300/60 hover:shadow-2xl hover:border-primary/60'
                    }`}
                    layout
                  >
                    {/* Card Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Current Indicator */}
                    {isCurrent && (
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-secondary rounded-full border-2 border-base-100 animate-pulse" />
                    )}
                    
                    {/* Header */}
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2 text-base-content/60">
                          <FaCalendarAlt className="w-4 h-4" />
                          <time className="font-mono text-sm">
                            {exp.from} – {exp.to}
                          </time>
                        </div>
                        <motion.div
                          className="text-primary"
                          animate={isSelected ? { rotate: 180 } : { rotate: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {isRTL ? <FaChevronLeft /> : <FaChevronRight />}
                        </motion.div>
                      </div>

                      <h3 className="text-xl font-bold text-base-content mb-2 group-hover:text-primary transition-colors duration-300">
                        {exp.title}
                      </h3>
                      
                      <div className="flex items-center space-x-2 mb-4">
                        <FaMapMarkerAlt className="w-4 h-4 text-secondary" />
                        {exp.logo ? (
                          <img
                            src={exp.logo}
                            alt={exp.company + ' logo'}
                            className="w-8 h-8 rounded-full object-cover border-2 border-base-300 bg-base-100 shadow-sm"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = '';
                              target.style.display = 'none';
                              // fallback will show below
                            }}
                          />
                        ) : null}
                                                 {/* Fallback avatar if logo missing or failed */}
                         {(!exp.logo || (typeof window !== 'undefined' && document.querySelector(`img[src='${exp.logo}']`)?.getAttribute('style')?.includes('display: none'))) && (
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-base-content border-2 border-base-300 shadow-sm"
                            style={{ background: stringToColor(exp.company) }}
                          >
                            {getInitials(exp.company)}
                          </div>
                        )}
                        <span className="text-base-content/70 font-medium">{exp.company}</span>
                      </div>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {exp.skills.slice(0, 6).map((skill) => (
                          <span 
                            key={skill} 
                            className={`badge badge-sm text-xs font-medium px-2 py-1 transition-all duration-300 ${
                              filterSkills.includes(skill) 
                                ? 'badge-primary' 
                                : 'badge-accent'
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                        {exp.skills.length > 6 && (
                          <span className="badge badge-outline badge-sm text-xs">
                            +{exp.skills.length - 6}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Expandable Content */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-base-300/60 pt-4 mt-4">
                            {renderAchievementsWithVisualizations(exp.achievements)}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Demo & Screenshot Section */}
                    {(exp.demo || (exp.screenshots && exp.screenshots.length > 0)) && (
                      <div className="flex items-center gap-4 mb-4">
                        {exp.demo && (
                          <a
                            href={exp.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm btn-primary font-semibold shadow-md"
                            onClick={e => e.stopPropagation()}
                          >
                            {t('view_demo', 'View Demo')}
                          </a>
                        )}
                        {exp.screenshots && exp.screenshots.length > 0 && (
                          <button
                            className="rounded-lg overflow-hidden border-2 border-base-300 hover:border-primary transition-all w-16 h-12 flex items-center justify-center bg-base-100 shadow-sm"
                            onClick={e => {
                              e.stopPropagation();
                              setModalImage(exp.screenshots![0]);
                              setModalOpen(true);
                            }}
                          >
                            <img
                              src={exp.screenshots[0]}
                              alt={exp.company + ' screenshot'}
                              className="object-cover w-full h-full"
                            />
                          </button>
                        )}
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      {/* Modal for screenshot */}
      <AnimatePresence>
        {modalOpen && modalImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              className="bg-base-100 rounded-xl shadow-2xl p-4 max-w-lg w-full relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-base-content/60 hover:text-primary text-xl font-bold"
                onClick={() => setModalOpen(false)}
              >
                ×
              </button>
              <img
                src={modalImage}
                alt="Project Screenshot"
                className="rounded-lg w-full h-auto object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Enhanced Timeline Navigation */}
      <motion.div 
        className="flex justify-center mt-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="flex items-center space-x-4 bg-base-200 dark:bg-base-400 rounded-full p-2 shadow-lg">
          <span className="text-sm text-base-content/70 px-4">
            {t('click_to_expand', 'Click to expand')} • {t('use_navigation', 'Use navigation controls')}
          </span>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default WorkExperience; 