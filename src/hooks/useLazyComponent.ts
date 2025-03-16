/**
 * useLazyComponent Hook
 * 
 * A utility for lazy loading components with suspense.
 * This helps with code splitting by providing a consistent way to
 * lazy load components and handle loading states.
 */
import { lazy, Suspense, ComponentType } from 'react';

/**
 * Creates a lazy-loaded component with suspense
 * 
 * @param importFunc Function that imports the component
 * @returns A component wrapped in Suspense
 */
export function createLazyComponent<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) {
  const LazyComponent = lazy(importFunc);
  
  return function LazyLoadedComponent(props: any) {
    return (
      <Suspense fallback={
        <div className="animate-pulse h-32 w-full bg-gray-200 dark:bg-gray-700 rounded-md" />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

export default createLazyComponent; 