import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: (() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  })()
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
      
      // Update document class and styles
      const root = document.documentElement;
      if (state.theme === 'dark') {
        root.classList.add('dark');
        root.style.colorScheme = 'dark';
        document.body.style.backgroundColor = '#0a192f';
      } else {
        root.classList.remove('dark');
        root.style.colorScheme = 'light';
        document.body.style.backgroundColor = '#ffffff';
      }
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
      
      // Update document class and styles
      const root = document.documentElement;
      if (action.payload === 'dark') {
        root.classList.add('dark');
        root.style.colorScheme = 'dark';
        document.body.style.backgroundColor = '#0a192f';
      } else {
        root.classList.remove('dark');
        root.style.colorScheme = 'light';
        document.body.style.backgroundColor = '#ffffff';
      }
    }
  }
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer; 