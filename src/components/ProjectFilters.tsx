import { motion } from 'framer-motion';
import { usePortfolioStore } from '../stores/portfolioStore';
import { useUIStore } from '../stores/uiStore';
import { useTranslation } from 'react-i18next';

const ProjectFilters = () => {
  const { t } = useTranslation();
  const { projectFilters, updateProjectFilters, clearProjectFilters } = usePortfolioStore();
  const { searchQuery, setSearchQuery } = useUIStore();

  const skillOptions = [
    { id: 'react', name: 'React' },
    { id: 'typescript', name: 'TypeScript' },
    { id: 'nodejs', name: 'Node.js' },
    { id: 'mongodb', name: 'MongoDB' },
    { id: 'firebase', name: 'Firebase' },
  ];

  const categoryOptions = [
    { id: 'web-app', name: 'Web Application' },
    { id: 'mobile-app', name: 'Mobile App' },
    { id: 'ecommerce', name: 'E-commerce' },
    { id: 'dashboard', name: 'Dashboard' },
  ];

  const handleSkillToggle = (skillId: string) => {
    const currentSkills = projectFilters.skills;
    const newSkills = currentSkills.includes(skillId)
      ? currentSkills.filter(id => id !== skillId)
      : [...currentSkills, skillId];
    
    updateProjectFilters({ skills: newSkills });
  };

  const handleCategoryToggle = (categoryId: string) => {
    const currentCategories = projectFilters.categories;
    const newCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter(id => id !== categoryId)
      : [...currentCategories, categoryId];
    
    updateProjectFilters({ categories: newCategories });
  };

  const hasActiveFilters = projectFilters.skills.length > 0 || 
                          projectFilters.categories.length > 0 || 
                          searchQuery.length > 0;

  return (
    <div className="bg-gradient-to-r from-base-100/80 to-base-200/80 backdrop-blur-sm border border-base-300/20 rounded-3xl p-8 mb-12 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              {t('filter_projects', 'Filter Projects')}
            </h3>
            <p className="text-base-content/60 text-sm">
              {t('filter_description', 'Find exactly what you\'re looking for')}
            </p>
          </div>
          {hasActiveFilters && (
            <motion.button
              onClick={() => {
                clearProjectFilters();
                setSearchQuery('');
              }}
              className="btn btn-outline btn-sm rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('clear_filters', 'Clear Filters')}
            </motion.button>
          )}
        </div>

      {/* Search */}
      <div className="mb-6">
        <label className="label">
          <span className="label-text font-medium">{t('search_projects', 'Search Projects')}</span>
        </label>
        <input
          type="text"
          placeholder={t('search_placeholder', 'Search by project name or description...')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      {/* Skills Filter */}
      <div className="mb-6">
        <label className="label">
          <span className="label-text font-medium">{t('filter_by_skills', 'Filter by Skills')}</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {skillOptions.map((skill) => (
            <button
              key={skill.id}
              onClick={() => handleSkillToggle(skill.id)}
              className={`badge badge-lg cursor-pointer transition-all ${
                projectFilters.skills.includes(skill.id)
                  ? 'badge-primary'
                  : 'badge-outline hover:badge-primary'
              }`}
            >
              {skill.name}
            </button>
          ))}
        </div>
      </div>

      {/* Categories Filter */}
      <div className="mb-4">
        <label className="label">
          <span className="label-text font-medium">{t('filter_by_category', 'Filter by Category')}</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {categoryOptions.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryToggle(category.id)}
              className={`badge badge-lg cursor-pointer transition-all ${
                projectFilters.categories.includes(category.id)
                  ? 'badge-secondary'
                  : 'badge-outline hover:badge-secondary'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-4 p-3 bg-base-200/50 rounded-lg">
          <p className="text-sm text-base-content/70">
            {t('active_filters', 'Active Filters')}: 
            {projectFilters.skills.length > 0 && (
              <span className="ml-2">
                {t('skills', 'Skills')}: {projectFilters.skills.length}
              </span>
            )}
            {projectFilters.categories.length > 0 && (
              <span className="ml-2">
                {t('categories', 'Categories')}: {projectFilters.categories.length}
              </span>
            )}
            {searchQuery.length > 0 && (
              <span className="ml-2">
                {t('search', 'Search')}: "{searchQuery}"
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectFilters; 