import { configureStore } from '@reduxjs/toolkit';
import cvReducer from './slices/cvSlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    cv: cvReducer,
    theme: themeReducer,
  },
  // Enable Redux DevTools extension
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 