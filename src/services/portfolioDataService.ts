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

// Helper to get current language (default to 'en')
function getCurrentLanguage(): string {
  if (typeof window !== 'undefined') {
    // Try to get from Zustand store first
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
      const { useLanguageStore } = require('../stores/languageStore');
      const currentLanguage = useLanguageStore.getState().currentLanguage;
      if (currentLanguage) return currentLanguage;
    } catch {
      // Ignore error if store is not available
    }
    
    // Try to get from i18next if available
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
      const i18next = ((window as unknown) as Record<string, unknown>).i18next || require('i18next');
      if (i18next && (i18next as { language?: string }).language) return (i18next as { language: string }).language.split('-')[0];
    } catch {
      // Ignore error if i18next is not available
    }
    
    // Try to get from <html lang="...">
    const htmlLang = document.documentElement.lang;
    if (htmlLang) return htmlLang.split('-')[0];
  }
  return 'en';
}

class PortfolioDataService {
  private cache: Map<string, unknown> = new Map();
  private lastFetch: Map<string, number> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  private readonly BASE_URL = '/data';

  // Fetch individual section data
  async getHeroData(lang?: string): Promise<HeroData> {
    return this.fetchSectionData<HeroData>('hero.json', lang);
  }

  async getAboutData(lang?: string): Promise<AboutData> {
    return this.fetchSectionData<AboutData>('about.json', lang);
  }

  async getSkillsData(lang?: string): Promise<SkillsData> {
    return this.fetchSectionData<SkillsData>('skills.json', lang);
  }

  async getProjectsData(lang?: string): Promise<ProjectsData> {
    return this.fetchSectionData<ProjectsData>('projects.json', lang);
  }

  async getWorkExperienceData(lang?: string): Promise<WorkExperienceData> {
    return this.fetchSectionData<WorkExperienceData>('work-experience.json', lang);
  }

  async getEducationData(lang?: string): Promise<EducationData> {
    return this.fetchSectionData<EducationData>('education.json', lang);
  }

  async getAwardsData(lang?: string): Promise<AwardsData> {
    return this.fetchSectionData<AwardsData>('awards.json', lang);
  }

  async getContactData(lang?: string): Promise<ContactData> {
    return this.fetchSectionData<ContactData>('contact.json', lang);
  }

  async getFooterData(lang?: string): Promise<FooterData> {
    return this.fetchSectionData<FooterData>('footer.json', lang);
  }

  async getNavigationData(lang?: string): Promise<NavigationData> {
    return this.fetchSectionData<NavigationData>('navigation.json', lang);
  }

  // Fetch all data at once
  async getAllData(lang?: string): Promise<PortfolioData> {
    const language = lang || getCurrentLanguage();
    try {
      const [
        hero,
        about,
        skills,
        projects,
        workExperience,
        education,
        awards,
        contact,
        footer,
        navigation
      ] = await Promise.all([
        this.getHeroData(language),
        this.getAboutData(language),
        this.getSkillsData(language),
        this.getProjectsData(language),
        this.getWorkExperienceData(language),
        this.getEducationData(language),
        this.getAwardsData(language),
        this.getContactData(language),
        this.getFooterData(language),
        this.getNavigationData(language)
      ]);

      return {
        hero,
        about,
        skills,
        projects,
        workExperience,
        education,
        awards,
        contact,
        footer,
        navigation,
        metadata: {
          lastUpdated: new Date().toISOString(),
          version: '1.0.0',
          author: 'Muhammad Zaman',
          languages: ['en', 'ar']
        }
      };
    } catch (error) {
      console.error('Failed to fetch all portfolio data:', error);
      throw error;
    }
  }

  // Generic method to fetch section data with caching and language support
  private async fetchSectionData<T>(filename: string, lang?: string): Promise<T> {
    const language = (lang || getCurrentLanguage() || 'en').toLowerCase();
    const cacheKey = `${language}/${filename}`;
    const now = Date.now();
    const lastFetchTime = this.lastFetch.get(cacheKey) || 0;

    // Check if we have valid cached data
    if (this.cache.has(cacheKey) && (now - lastFetchTime) < this.CACHE_DURATION) {
      return this.cache.get(cacheKey) as T;
    }

    // Try to fetch the language-specific file, fallback to English if not found
    let data: T | undefined;
    let triedFallback = false;
    try {
      data = await this.fetchJson<T>(`${this.BASE_URL}/${language}/${filename}`);
    } catch {
      if (language !== 'en') {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        triedFallback = true;
        try {
          data = await this.fetchJson<T>(`${this.BASE_URL}/en/${filename}`);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch {
          // fallback failed
        }
      }
    }
    if (!data) {
      // fallback to default fallbackData
      const fallbackData = this.getFallbackData(filename);
      if (fallbackData) {
        data = fallbackData as T;
      } else {
        throw new Error(`Failed to fetch ${filename} for language ${language}`);
      }
    }
    // Cache the data
    this.cache.set(cacheKey, data);
    this.lastFetch.set(cacheKey, now);
    return data;
  }

  // Helper to fetch JSON
  private async fetchJson<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  // Clear cache
  clearCache(): void {
    this.cache.clear();
    this.lastFetch.clear();
  }

  // Get cache status
  getCacheStatus(): { cached: string[], lastFetch: Record<string, number> } {
    return {
      cached: Array.from(this.cache.keys()),
      lastFetch: Object.fromEntries(this.lastFetch.entries())
    };
  }

  // Fallback data for offline/error scenarios
  private getFallbackData(filename: string): unknown {
    const fallbackData: Record<string, unknown> = {
      'hero.json': {
        title: "Hi, I am Muhammad Zaman",
        subtitle: "Full-Stack Developer with expertise in modern web technologies",
        stats: [
          { value: 4, label: "Years Experience" },
          { value: 25, label: "Technologies" },
          { value: 15, label: "Projects" },
          { value: 100, label: "Dedication", suffix: "%" }
        ],
        profileCard: {
          name: "Zaman",
          title: "Full-Stack Developer",
          avatar: "Z",
          location: "Karachi, Pakistan",
          email: "zaman@example.com",
          phone: "+92 300 1234567",
          socialLinks: []
        }
      },
      'skills.json': {
        categories: [],
        softSkills: []
      },
      'projects.json': {
        featured: [],
        all: []
      },
      'work-experience.json': {
        experiences: []
      },
      'education.json': {
        education: []
      },
      'awards.json': {
        awards: []
      },
      'contact.json': {
        description: "Let's work together!",
        contactInfo: [],
        socialLinks: [],
        availability: {
          status: 'available',
          message: "I'm currently available for opportunities",
          availableFor: ['freelance', 'full-time']
        }
      },
      'footer.json': {
        description: "Creating beautiful web experiences",
        quickLinks: [],
        services: [],
        contactInfo: [],
        socialLinks: []
      },
      'navigation.json': {
        navItems: [],
        drawerItems: []
      }
    };

    return fallbackData[filename];
  }

  // Utility method to get skills by IDs
  async getSkillsByIds(skillIds: string[], lang?: string): Promise<import('../types/PortfolioData').Skill[]> {
    const skillsData = await this.getSkillsData(lang);
    const allSkills = skillsData.categories.flatMap(cat => cat.skills);
    return allSkills.filter(skill => skillIds.includes(skill.id));
  }

  // Utility method to get projects by skill
  async getProjectsBySkill(skillId: string, lang?: string): Promise<import('../types/PortfolioData').Project[]> {
    const projectsData = await this.getProjectsData(lang);
    return projectsData.all.filter(project => 
      project.technologies.includes(skillId)
    );
  }
}

// Export singleton instance
export const portfolioDataService = new PortfolioDataService();

// Export the class for testing purposes
export { PortfolioDataService, getCurrentLanguage }; 