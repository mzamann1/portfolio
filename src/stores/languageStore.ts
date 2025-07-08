import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LanguageState {
  currentLanguage: string;
  availableLanguages: string[];
  setLanguage: (language: string) => void;
  toggleLanguage: () => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      currentLanguage: 'en',
      availableLanguages: ['en', 'ar'],
      
      setLanguage: (language: string) => {
        const { availableLanguages } = get();
        if (availableLanguages.includes(language)) {
          set({ currentLanguage: language });
          // Update HTML lang attribute
          if (typeof document !== 'undefined') {
            document.documentElement.lang = language;
          }
        }
      },
      
      toggleLanguage: () => {
        const { currentLanguage, availableLanguages } = get();
        const currentIndex = availableLanguages.indexOf(currentLanguage);
        const nextIndex = (currentIndex + 1) % availableLanguages.length;
        const nextLanguage = availableLanguages[nextIndex];
        get().setLanguage(nextLanguage);
      },
    }),
    {
      name: 'portfolio-language',
      partialize: (state) => ({ currentLanguage: state.currentLanguage }),
    }
  )
); 