import { create } from 'zustand';
import type { Project, Skill, Award } from '../types/PortfolioData';

interface PortfolioState {
  // Selected items
  selectedProject: Project | null;
  selectedSkill: Skill | null;
  selectedAward: Award | null;
  
  // View states
  isProjectDetailOpen: boolean;
  isSkillDetailOpen: boolean;
  isAwardDetailOpen: boolean;
  
  // Filter states
  projectFilters: {
    skills: string[];
    categories: string[];
    technologies: string[];
  };
  
  // Actions
  setSelectedProject: (project: Project | null) => void;
  setSelectedSkill: (skill: Skill | null) => void;
  setSelectedAward: (award: Award | null) => void;
  setProjectDetailOpen: (isOpen: boolean) => void;
  setSkillDetailOpen: (isOpen: boolean) => void;
  setAwardDetailOpen: (isOpen: boolean) => void;
  updateProjectFilters: (filters: Partial<PortfolioState['projectFilters']>) => void;
  clearProjectFilters: () => void;
  resetPortfolioState: () => void;
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  // Initial state
  selectedProject: null,
  selectedSkill: null,
  selectedAward: null,
  isProjectDetailOpen: false,
  isSkillDetailOpen: false,
  isAwardDetailOpen: false,
  projectFilters: {
    skills: [],
    categories: [],
    technologies: [],
  },
  
  // Actions
  setSelectedProject: (project) => set({ selectedProject: project }),
  setSelectedSkill: (skill) => set({ selectedSkill: skill }),
  setSelectedAward: (award) => set({ selectedAward: award }),
  
  setProjectDetailOpen: (isOpen) => set({ isProjectDetailOpen: isOpen }),
  setSkillDetailOpen: (isOpen) => set({ isSkillDetailOpen: isOpen }),
  setAwardDetailOpen: (isOpen) => set({ isAwardDetailOpen: isOpen }),
  
  updateProjectFilters: (filters) => {
    const currentFilters = get().projectFilters;
    set({
      projectFilters: { ...currentFilters, ...filters }
    });
  },
  
  clearProjectFilters: () => set({
    projectFilters: {
      skills: [],
      categories: [],
      technologies: [],
    }
  }),
  
  resetPortfolioState: () => set({
    selectedProject: null,
    selectedSkill: null,
    selectedAward: null,
    isProjectDetailOpen: false,
    isSkillDetailOpen: false,
    isAwardDetailOpen: false,
    projectFilters: {
      skills: [],
      categories: [],
      technologies: [],
    }
  }),
})); 