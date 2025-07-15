import { motion } from 'framer-motion';

// Skeleton component for cards
export const CardSkeleton = () => (
  <motion.div
    className="bg-base-200 dark:bg-base-400 rounded-xl p-6 animate-pulse"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center space-x-4 mb-4">
      <div className="w-12 h-12 bg-base-300 rounded-full"></div>
      <div className="flex-1">
        <div className="h-4 bg-base-300 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-base-300 rounded w-1/2"></div>
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-3 bg-base-300 rounded"></div>
      <div className="h-3 bg-base-300 rounded w-5/6"></div>
      <div className="h-3 bg-base-300 rounded w-4/6"></div>
    </div>
  </motion.div>
);

// Skeleton for timeline cards
export const TimelineCardSkeleton = () => (
  <motion.div
    className="bg-base-200 dark:bg-base-400 rounded-2xl p-6 animate-pulse"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center justify-between mb-4">
      <div className="h-3 bg-base-300 rounded w-24"></div>
      <div className="w-4 h-4 bg-base-300 rounded"></div>
    </div>
    <div className="h-6 bg-base-300 rounded mb-3"></div>
    <div className="flex items-center space-x-2 mb-4">
      <div className="w-4 h-4 bg-base-300 rounded"></div>
      <div className="h-4 bg-base-300 rounded w-32"></div>
    </div>
    <div className="flex flex-wrap gap-2 mb-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-6 bg-base-300 rounded-full w-16"></div>
      ))}
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-base-300 rounded"></div>
      <div className="h-3 bg-base-300 rounded w-5/6"></div>
      <div className="h-3 bg-base-300 rounded w-4/6"></div>
    </div>
  </motion.div>
);

// Skeleton for project cards
export const ProjectCardSkeleton = () => (
  <motion.div
    className="bg-base-200 dark:bg-base-400 rounded-xl overflow-hidden animate-pulse"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="h-48 bg-base-300"></div>
    <div className="p-6">
      <div className="h-5 bg-base-300 rounded mb-3"></div>
      <div className="h-4 bg-base-300 rounded w-3/4 mb-4"></div>
      <div className="flex flex-wrap gap-2 mb-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-6 bg-base-300 rounded-full w-20"></div>
        ))}
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-base-300 rounded"></div>
        <div className="h-3 bg-base-300 rounded w-5/6"></div>
      </div>
    </div>
  </motion.div>
);

// Skeleton for skills
export const SkillsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <motion.div
        key={i}
        className="bg-base-200 dark:bg-base-400 rounded-xl p-6 animate-pulse"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-base-300 rounded"></div>
          <div className="flex-1">
            <div className="h-4 bg-base-300 rounded mb-2"></div>
            <div className="h-2 bg-base-300 rounded w-3/4"></div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-base-300 rounded"></div>
          <div className="h-3 bg-base-300 rounded w-5/6"></div>
        </div>
      </motion.div>
    ))}
  </div>
);

// Main skeleton loader
export const SkeletonLoader = ({ type = 'card' }: { type?: 'card' | 'timeline' | 'project' | 'skills' }) => {
  switch (type) {
    case 'timeline':
      return <TimelineCardSkeleton />;
    case 'project':
      return <ProjectCardSkeleton />;
    case 'skills':
      return <SkillsSkeleton />;
    default:
      return <CardSkeleton />;
  }
};

export default SkeletonLoader; 