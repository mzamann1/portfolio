import { useEffect, useRef, useCallback } from 'react';
import { analyticsService } from '@/services/analyticsService';

// Type declarations for performance APIs
interface MemoryInfo {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

interface LayoutShift {
  value: number;
  hadRecentInput: boolean;
}

interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number;
  processingEnd: number;
  target?: EventTarget;
}

interface NetworkInformation {
  effectiveType: string;
  downlink: number;
  rtt: number;
  saveData: boolean;
}

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  ttfb: number | null;
}

interface UsePerformanceMonitoringOptions {
  trackCoreWebVitals?: boolean;
  trackResourceTiming?: boolean;
  trackLongTasks?: boolean;
  trackMemoryUsage?: boolean;
  trackNetworkInfo?: boolean;
}

export const usePerformanceMonitoring = (options: UsePerformanceMonitoringOptions = {}) => {
  const {
    trackCoreWebVitals = true,
    trackResourceTiming = true,
    trackLongTasks = true,
    trackMemoryUsage = false,
    trackNetworkInfo = false
  } = options;

  const metrics = useRef<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null
  });

  const observers = useRef<PerformanceObserver[]>([]);

  const trackMetric = useCallback((name: string, value: number, unit: string = 'ms') => {
    analyticsService.trackPerformanceMetric({
      name,
      value: Math.round(value),
      unit
    });
  }, []);

  const observeCoreWebVitals = useCallback(() => {
    if (!trackCoreWebVitals || typeof window === 'undefined') return;

    try {
      // First Contentful Paint (FCP)
      const fcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fcp = entry.startTime;
          metrics.current.fcp = fcp;
          trackMetric('fcp', fcp);
        }
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
      observers.current.push(fcpObserver);

      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const lcp = entry.startTime;
          metrics.current.lcp = lcp;
          trackMetric('lcp', lcp);
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      observers.current.push(lcpObserver);

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const firstInputEntry = entry as PerformanceEventTiming;
          const fid = firstInputEntry.processingStart - firstInputEntry.startTime;
          metrics.current.fid = fid;
          trackMetric('fid', fid);
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
      observers.current.push(fidObserver);

      // Cumulative Layout Shift (CLS)
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as unknown as LayoutShift;
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value;
          }
        }
        metrics.current.cls = clsValue;
        trackMetric('cls', clsValue, 'score');
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      observers.current.push(clsObserver);

      // Time to First Byte (TTFB)
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        metrics.current.ttfb = ttfb;
        trackMetric('ttfb', ttfb);
      }
    } catch (error) {
      console.warn('Core Web Vitals monitoring not supported:', error);
    }
  }, [trackCoreWebVitals, trackMetric]);

  const observeResourceTiming = useCallback(() => {
    if (!trackResourceTiming || typeof window === 'undefined') return;

    try {
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const resourceEntry = entry as PerformanceResourceTiming;
          const duration = resourceEntry.duration;
          const size = resourceEntry.transferSize || 0;
          
          // Track slow resources
          if (duration > 1000) {
            trackMetric(`slow_resource_${resourceEntry.initiatorType}`, duration);
          }
          
          // Track large resources
          if (size > 100000) { // 100KB
            trackMetric(`large_resource_${resourceEntry.initiatorType}`, size, 'bytes');
          }
        }
      });
      resourceObserver.observe({ entryTypes: ['resource'] });
      observers.current.push(resourceObserver);
    } catch (error) {
      console.warn('Resource timing monitoring not supported:', error);
    }
  }, [trackResourceTiming, trackMetric]);

  const observeLongTasks = useCallback(() => {
    if (!trackLongTasks || typeof window === 'undefined') return;

    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const duration = entry.duration;
          trackMetric('long_task', duration);
          
          // Track very long tasks
          if (duration > 100) {
            trackMetric('very_long_task', duration);
          }
        }
      });
      longTaskObserver.observe({ entryTypes: ['longtask'] });
      observers.current.push(longTaskObserver);
    } catch (error) {
      console.warn('Long task monitoring not supported:', error);
    }
  }, [trackLongTasks, trackMetric]);

  const observeMemoryUsage = useCallback(() => {
    if (!trackMemoryUsage || typeof window === 'undefined') return;

    // Memory API is not widely supported
    if ('memory' in performance) {
      const memory = (performance as Performance & { memory: MemoryInfo }).memory;
      const usedMB = memory.usedJSHeapSize / 1024 / 1024;
      const totalMB = memory.totalJSHeapSize / 1024 / 1024;
      
      trackMetric('memory_used', usedMB, 'MB');
      trackMetric('memory_total', totalMB, 'MB');
      
      // Track high memory usage
      if (usedMB > 100) {
        trackMetric('high_memory_usage', usedMB, 'MB');
      }
    }
  }, [trackMemoryUsage, trackMetric]);

  const observeNetworkInfo = useCallback(() => {
    if (!trackNetworkInfo || typeof window === 'undefined') return;

    // Network Information API
    if ('connection' in navigator) {
      const connection = (navigator as Navigator & { connection: NetworkInformation }).connection;
      if (connection) {
        const effectiveType = connection.effectiveType;
        const downlink = connection.downlink;
        
        analyticsService.trackEvent({
          action: 'network_info',
          category: 'performance',
          label: effectiveType,
          value: Math.round(downlink)
        });
      }
    }
  }, [trackNetworkInfo]);

  useEffect(() => {
    // Start monitoring
    observeCoreWebVitals();
    observeResourceTiming();
    observeLongTasks();
    observeMemoryUsage();
    observeNetworkInfo();

    // Cleanup observers on unmount
    return () => {
      observers.current.forEach(observer => {
        try {
          observer.disconnect();
        } catch (error) {
          console.warn('Error disconnecting observer:', error);
        }
      });
      observers.current = [];
    };
  }, [observeCoreWebVitals, observeResourceTiming, observeLongTasks, observeMemoryUsage, observeNetworkInfo]);

  // Return current metrics
  return {
    metrics: metrics.current,
    trackMetric
  };
}; 