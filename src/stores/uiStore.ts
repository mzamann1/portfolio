import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  // Theme
  theme: 'light' | 'dark' | 'auto';
  isDarkMode: boolean;
  
  // Navigation
  isMobileMenuOpen: boolean;
  activeSection: string;
  
  // Language loading
  languageLoading: boolean;
  
  // Modals
  isContactModalOpen: boolean;
  isProjectModalOpen: boolean;
  selectedProject: string | null;
  
  // Portfolio filters
  selectedSkillFilter: string | null;
  selectedCategoryFilter: string | null;
  searchQuery: string;
  
  // Actions
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  toggleDarkMode: () => void;
  setMobileMenuOpen: (isOpen: boolean) => void;
  setActiveSection: (section: string) => void;
  setLanguageLoading: (loading: boolean) => void;
  setContactModalOpen: (isOpen: boolean) => void;
  setProjectModalOpen: (isOpen: boolean, projectId?: string) => void;
  setSkillFilter: (skillId: string | null) => void;
  setCategoryFilter: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  clearFilters: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      // Initial state
      theme: 'auto',
      isDarkMode: false,
      isMobileMenuOpen: false,
      activeSection: 'hero',
      languageLoading: false,
      isContactModalOpen: false,
      isProjectModalOpen: false,
      selectedProject: null,
      selectedSkillFilter: null,
      selectedCategoryFilter: null,
      searchQuery: '',
      
      // Theme actions
      setTheme: (newTheme: 'light' | 'dark' | 'auto') => {
        const isDark = newTheme === 'dark' || (newTheme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        // Update localStorage
        localStorage.setItem('theme', newTheme);
        
        // Update document classes
        document.documentElement.classList.toggle('dark', isDark);
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        
        // Update state
        set({ isDarkMode: isDark, theme: newTheme });
      },
      
      toggleDarkMode: () => {
        const { isDarkMode } = get();
        const newTheme = isDarkMode ? 'light' : 'dark';
        get().setTheme(newTheme);
      },
      
      // Navigation actions
      setMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
      setActiveSection: (section) => set({ activeSection: section }),
      setLanguageLoading: (loading) => set({ languageLoading: loading }),
      
      // Modal actions
      setContactModalOpen: (isOpen) => set({ isContactModalOpen: isOpen }),
      setProjectModalOpen: (isOpen, projectId) => set({ 
        isProjectModalOpen: isOpen, 
        selectedProject: isOpen ? projectId || null : null 
      }),
      
      // Filter actions
      setSkillFilter: (skillId) => set({ selectedSkillFilter: skillId }),
      setCategoryFilter: (category) => set({ selectedCategoryFilter: category }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      clearFilters: () => set({ 
        selectedSkillFilter: null, 
        selectedCategoryFilter: null, 
        searchQuery: '' 
      }),
    }),
    {
      name: 'portfolio-ui',
      partialize: (state) => ({
        theme: state.theme,
        activeSection: state.activeSection,
      }),
    }
  )
); 