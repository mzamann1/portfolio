import { useEffect, useRef, useCallback } from 'react';
import { analyticsService } from '@/services/analyticsService';

interface ScrollTrackingOptions {
  trackDepth?: boolean;
  trackDirection?: boolean;
  trackSpeed?: boolean;
  throttleMs?: number;
  depthThresholds?: number[];
}

export const useScrollTracking = (options: ScrollTrackingOptions = {}) => {
  const {
    trackDepth = true,
    trackDirection = false,
    trackSpeed = false,
    throttleMs = 100,
    depthThresholds = [25, 50, 75, 90, 100]
  } = options;

  const lastScrollTop = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const trackedDepths = useRef<Set<number>>(new Set());
  const scrollDirection = useRef<'up' | 'down'>('down');
  const scrollSpeed = useRef(0);

  const throttle = useCallback((func: (...args: unknown[]) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: unknown[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }, []);

  const calculateScrollDepth = useCallback((scrollTop: number, documentHeight: number, windowHeight: number) => {
    const scrollableHeight = documentHeight - windowHeight;
    if (scrollableHeight <= 0) return 100;
    
    const depth = Math.round((scrollTop / scrollableHeight) * 100);
    return Math.min(depth, 100);
  }, []);

  const calculateScrollSpeed = useCallback((currentScrollTop: number, currentTime: number) => {
    const timeDiff = currentTime - lastScrollTime.current;
    const scrollDiff = Math.abs(currentScrollTop - lastScrollTop.current);
    
    if (timeDiff > 0) {
      scrollSpeed.current = Math.round(scrollDiff / timeDiff * 1000); // pixels per second
    }
    
    lastScrollTop.current = currentScrollTop;
    lastScrollTime.current = currentTime;
  }, []);

  const determineScrollDirection = useCallback((currentScrollTop: number) => {
    const direction = currentScrollTop > lastScrollTop.current ? 'down' : 'up';
    scrollDirection.current = direction;
    return direction;
  }, []);

  const trackScrollMetrics = useCallback(
    throttle(() => {
      if (typeof window === 'undefined') return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const currentTime = Date.now();

      // Calculate scroll depth
      if (trackDepth) {
        const depth = calculateScrollDepth(scrollTop, documentHeight, windowHeight);
        
        // Track depth thresholds
        depthThresholds.forEach(threshold => {
          if (depth >= threshold && !trackedDepths.current.has(threshold)) {
            trackedDepths.current.add(threshold);
            analyticsService.trackScrollDepth(threshold);
          }
        });
      }

      // Calculate scroll direction
      if (trackDirection) {
        const direction = determineScrollDirection(scrollTop);
        // Only track direction changes to avoid spam
        if (direction !== scrollDirection.current) {
          analyticsService.trackEvent({
            action: 'scroll_direction_change',
            category: 'engagement',
            label: direction
          });
        }
      }

      // Calculate scroll speed
      if (trackSpeed) {
        calculateScrollSpeed(scrollTop, currentTime);
        
        // Track high-speed scrolling (potential issues)
        if (scrollSpeed.current > 1000) {
          analyticsService.trackEvent({
            action: 'high_speed_scroll',
            category: 'performance',
            label: `${scrollSpeed.current}px/s`,
            value: scrollSpeed.current
          });
        }
      }
    }, throttleMs),
    [trackDepth, trackDirection, trackSpeed, throttleMs, depthThresholds, calculateScrollDepth, determineScrollDirection, calculateScrollSpeed]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      trackScrollMetrics();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [trackScrollMetrics]);

  // Reset tracked depths on component unmount or page change
  useEffect(() => {
    return () => {
      trackedDepths.current.clear();
    };
  }, []);

  return {
    scrollDirection: scrollDirection.current,
    scrollSpeed: scrollSpeed.current,
    trackedDepths: Array.from(trackedDepths.current)
  };
}; 