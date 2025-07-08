# Zustand Implementation Guide

This document explains how Zustand is implemented in the portfolio project for state management.

## Overview

Zustand is used to manage three main areas of state:
1. **Language State** - Centralized language management
2. **UI State** - Theme, navigation, modals, and filters
3. **Portfolio State** - Project selection, portfolio-specific state

## Stores

### 1. Language Store (`src/stores/languageStore.ts`)

Manages language state with persistence.

```typescript
interface LanguageState {
  currentLanguage: string;
  availableLanguages: string[];
  setLanguage: (language: string) => void;
  toggleLanguage: () => void;
}
```

**Features:**
- Persists language preference in localStorage
- Syncs with i18next
- Updates HTML lang attribute
- Provides toggle functionality

**Usage:**
```typescript
import { useLanguageStore } from '../stores/languageStore';

const { currentLanguage, setLanguage, toggleLanguage } = useLanguageStore();
```

### 2. UI Store (`src/stores/uiStore.ts`)

Manages UI-related state including theme, navigation, and filters.

```typescript
interface UIState {
  // Theme
  theme: 'light' | 'dark' | 'auto';
  isDarkMode: boolean;
  
  // Navigation
  isMobileMenuOpen: boolean;
  activeSection: string;
  
  // Modals
  isContactModalOpen: boolean;
  isProjectModalOpen: boolean;
  selectedProject: string | null;
  
  // Portfolio filters
  selectedSkillFilter: string | null;
  selectedCategoryFilter: string | null;
  searchQuery: string;
  
  // Actions...
}
```

**Features:**
- Theme management with system preference detection
- Navigation state
- Modal management
- Search and filter state
- Persists theme preference

**Usage:**
```typescript
import { useUIStore } from '../stores/uiStore';

const { 
  isDarkMode, 
  toggleDarkMode, 
  searchQuery, 
  setSearchQuery 
} = useUIStore();
```

### 3. Portfolio Store (`src/stores/portfolioStore.ts`)

Manages portfolio-specific state like selected items and filters.

```typescript
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
  
  // Actions...
}
```

**Features:**
- Project selection and detail views
- Skill and award selection
- Advanced filtering system
- State reset functionality

**Usage:**
```typescript
import { usePortfolioStore } from '../stores/portfolioStore';

const { 
  projectFilters, 
  updateProjectFilters, 
  clearProjectFilters 
} = usePortfolioStore();
```

## Integration with Existing Code

### Data Service Integration

The data service now checks the Zustand store first for language:

```typescript
function getCurrentLanguage(): string {
  if (typeof window !== 'undefined') {
    // Try to get from Zustand store first
    try {
      const { useLanguageStore } = require('../stores/languageStore');
      const currentLanguage = useLanguageStore.getState().currentLanguage;
      if (currentLanguage) return currentLanguage;
    } catch {
      // Ignore error if store is not available
    }
    // Fallback to other methods...
  }
  return 'en';
}
```

### Hook Integration

Portfolio data hooks now use the Zustand language store:

```typescript
function usePortfolioSection<T>(
  fetchFunction: (lang: string) => Promise<T>,
  langOverride?: string
): UsePortfolioDataReturn<T> {
  const { i18n } = useTranslation();
  const { currentLanguage } = useLanguageStore();
  const lang = (langOverride || currentLanguage || i18n.language || getCurrentLanguage() || 'en').split('-')[0];
  // ...
}
```

### Component Integration

Components can now use Zustand stores directly:

```typescript
// LanguageToggle.tsx
const { currentLanguage, setLanguage } = useLanguageStore();

// ThemeToggle.tsx
const { isDarkMode, toggleDarkMode } = useUIStore();

// ProjectFilters.tsx
const { projectFilters, updateProjectFilters } = usePortfolioStore();
const { searchQuery, setSearchQuery } = useUIStore();
```

## App Initialization

The `useAppInitialization` hook ensures proper setup:

```typescript
export const useAppInitialization = () => {
  const { i18n } = useTranslation();
  const { currentLanguage, setLanguage } = useLanguageStore();
  const { setTheme } = useUIStore();

  useEffect(() => {
    // Initialize language from store or i18n
    // Initialize theme
    // Sync between systems
  }, []);
};
```

## Benefits of This Implementation

1. **Centralized State**: All state is managed in one place
2. **Persistence**: Important preferences are saved
3. **Performance**: Only components that use specific state re-render
4. **Type Safety**: Full TypeScript support
5. **Developer Experience**: Easy debugging with Zustand DevTools
6. **Scalability**: Easy to add new state slices

## Best Practices

1. **Selective Subscriptions**: Only subscribe to the state you need
2. **Action Composition**: Combine multiple actions when needed
3. **Persistence**: Use persist middleware for important state
4. **Type Safety**: Always define interfaces for your state
5. **Error Handling**: Handle cases where stores might not be available

## Migration from Previous State

The implementation maintains backward compatibility:
- Language detection still works without Zustand
- i18n integration is preserved
- Existing components continue to work
- Gradual migration is possible

## Future Enhancements

1. **DevTools Integration**: Add Zustand DevTools for debugging
2. **Middleware**: Add logging, analytics, or other middleware
3. **State Synchronization**: Sync state across tabs/windows
4. **Optimistic Updates**: Add optimistic updates for better UX
5. **State Validation**: Add runtime state validation 