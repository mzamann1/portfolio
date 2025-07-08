import { useState, useEffect } from 'react';
import { portfolioDataService, getCurrentLanguage } from '../services/portfolioDataService';
import type { 
  PortfolioData, 
  HeroData, 
  AboutData, 
  SkillsData, 
  ProjectsData, 
  WorkExperienceData, 
  EducationData, 
  AwardsData, 
  ContactData, 
  FooterData, 
  NavigationData 
} from '../types/PortfolioData';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../stores/languageStore';

interface UsePortfolioDataState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UsePortfolioDataReturn<T> extends UsePortfolioDataState<T> {
  refetch: () => Promise<void>;
}

// Generic hook for individual sections
function usePortfolioSection<T>(
  fetchFunction: (lang: string) => Promise<T>,
  langOverride?: string
): UsePortfolioDataReturn<T> {
  const { i18n } = useTranslation();
  const { currentLanguage } = useLanguageStore();
  const lang = (langOverride || currentLanguage || i18n.language || getCurrentLanguage() || 'en').split('-')[0];
  const [state, setState] = useState<UsePortfolioDataState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const data = await fetchFunction(lang);
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return {
    ...state,
    refetch: fetchData,
  };
}

// Hook for all portfolio data
export function useAllPortfolioData(langOverride?: string): UsePortfolioDataReturn<PortfolioData> {
  return usePortfolioSection((lang) => portfolioDataService.getAllData(lang), langOverride);
}

// Individual section hooks
export function useHeroData(langOverride?: string): UsePortfolioDataReturn<HeroData> {
  return usePortfolioSection((lang) => portfolioDataService.getHeroData(lang), langOverride);
}

export function useAboutData(langOverride?: string): UsePortfolioDataReturn<AboutData> {
  return usePortfolioSection((lang) => portfolioDataService.getAboutData(lang), langOverride);
}

export function useSkillsData(langOverride?: string): UsePortfolioDataReturn<SkillsData> {
  return usePortfolioSection((lang) => portfolioDataService.getSkillsData(lang), langOverride);
}

export function useProjectsData(langOverride?: string): UsePortfolioDataReturn<ProjectsData> {
  return usePortfolioSection((lang) => portfolioDataService.getProjectsData(lang), langOverride);
}

export function useWorkExperienceData(langOverride?: string): UsePortfolioDataReturn<WorkExperienceData> {
  return usePortfolioSection((lang) => portfolioDataService.getWorkExperienceData(lang), langOverride);
}

export function useEducationData(langOverride?: string): UsePortfolioDataReturn<EducationData> {
  return usePortfolioSection((lang) => portfolioDataService.getEducationData(lang), langOverride);
}

export function useAwardsData(langOverride?: string): UsePortfolioDataReturn<AwardsData> {
  return usePortfolioSection((lang) => portfolioDataService.getAwardsData(lang), langOverride);
}

export function useContactData(langOverride?: string): UsePortfolioDataReturn<ContactData> {
  return usePortfolioSection((lang) => portfolioDataService.getContactData(lang), langOverride);
}

export function useFooterData(langOverride?: string): UsePortfolioDataReturn<FooterData> {
  return usePortfolioSection((lang) => portfolioDataService.getFooterData(lang), langOverride);
}

export function useNavigationData(langOverride?: string): UsePortfolioDataReturn<NavigationData> {
  return usePortfolioSection((lang) => portfolioDataService.getNavigationData(lang), langOverride);
}

// Utility hook for getting skills by IDs
export function useSkillsByIds(skillIds: string[], langOverride?: string) {
  const { i18n } = useTranslation();
  const { currentLanguage } = useLanguageStore();
  const lang = (langOverride || currentLanguage || i18n.language || getCurrentLanguage() || 'en').split('-')[0];
  const [skills, setSkills] = useState<import('../types/PortfolioData').Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      if (skillIds.length === 0) {
        setSkills([]);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const skillsData = await portfolioDataService.getSkillsByIds(skillIds, lang);
        setSkills(skillsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch skills');
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillIds.join(','), lang]);

  return { skills, loading, error };
}

// Utility hook for getting projects by skill
export function useProjectsBySkill(skillId: string, langOverride?: string) {
  const { i18n } = useTranslation();
  const { currentLanguage } = useLanguageStore();
  const lang = (langOverride || currentLanguage || i18n.language || getCurrentLanguage() || 'en').split('-')[0];
  const [projects, setProjects] = useState<import('../types/PortfolioData').Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!skillId) {
        setProjects([]);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const projectsData = await portfolioDataService.getProjectsBySkill(skillId, lang);
        setProjects(projectsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skillId, lang]);

  return { projects, loading, error };
}

// Hook for cache management
export function usePortfolioCache() {
  const [cacheStatus, setCacheStatus] = useState(portfolioDataService.getCacheStatus());

  const clearCache = () => {
    portfolioDataService.clearCache();
    setCacheStatus(portfolioDataService.getCacheStatus());
  };

  const refreshCacheStatus = () => {
    setCacheStatus(portfolioDataService.getCacheStatus());
  };

  return {
    cacheStatus,
    clearCache,
    refreshCacheStatus,
  };
} 