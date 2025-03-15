import { configureStore } from '@reduxjs/toolkit';
import cvReducer from './slices/cvSlice';

export const store = configureStore({
  reducer: {
    cv: cvReducer,
  },
  // Enable Redux DevTools extension
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 