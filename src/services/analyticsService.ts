interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
}

class AnalyticsService {
  private isInitialized = false;
  private isProduction = process.env.NODE_ENV === 'production';

  initialize(): void {
    if (this.isInitialized || !this.isProduction) return;

    // Google Analytics 4 initialization
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      this.isInitialized = true;
      this.trackPageView(window.location.pathname);
    }
  }

  trackPageView(path: string): void {
    if (!this.isInitialized || !this.isProduction) return;

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: path,
        page_title: document.title
      });
    }
  }

  trackEvent(event: AnalyticsEvent): void {
    if (!this.isInitialized || !this.isProduction) return;

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value
      });
    }
  }

  trackProjectView(projectId: string, projectName: string): void {
    this.trackEvent({
      action: 'project_view',
      category: 'engagement',
      label: `${projectName} (${projectId})`,
      value: 1
    });
  }

  trackContactFormSubmission(): void {
    this.trackEvent({
      action: 'contact_form_submit',
      category: 'engagement',
      label: 'contact_form'
    });
  }

  trackDownloadResume(): void {
    this.trackEvent({
      action: 'resume_download',
      category: 'engagement',
      label: 'resume'
    });
  }

  trackLanguageChange(language: string): void {
    this.trackEvent({
      action: 'language_change',
      category: 'preferences',
      label: language
    });
  }

  trackThemeToggle(theme: string): void {
    this.trackEvent({
      action: 'theme_toggle',
      category: 'preferences',
      label: theme
    });
  }

  trackScrollDepth(depth: number): void {
    this.trackEvent({
      action: 'scroll_depth',
      category: 'engagement',
      label: `${depth}%`,
      value: depth
    });
  }

  trackTimeOnPage(duration: number): void {
    this.trackEvent({
      action: 'time_on_page',
      category: 'engagement',
      label: 'page_duration',
      value: Math.round(duration / 1000) // Convert to seconds
    });
  }

  trackPerformanceMetric(metric: PerformanceMetric): void {
    this.trackEvent({
      action: 'performance_metric',
      category: 'performance',
      label: metric.name,
      value: metric.value
    });
  }

  trackError(error: Error, context?: string): void {
    this.trackEvent({
      action: 'error',
      category: 'error',
      label: `${error.name}: ${error.message}`,
      value: 1
    });

    // Also log to console in development
    if (!this.isProduction) {
      console.error('Analytics Error:', { error, context });
    }
  }
}

// Performance monitoring
class PerformanceMonitor {
  private observer: PerformanceObserver | null = null;
  private analyticsService: AnalyticsService;

  constructor(analyticsService: AnalyticsService) {
    this.analyticsService = analyticsService;
  }

  startMonitoring(): void {
    if (typeof window === 'undefined') return;

    // Monitor Core Web Vitals
    this.observeCoreWebVitals();
    
    // Monitor resource loading
    this.observeResourceTiming();
    
    // Monitor long tasks
    this.observeLongTasks();
  }

  private observeCoreWebVitals(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const metric = {
            name: entry.name,
            value: Math.round(entry.startTime),
            unit: 'ms'
          };
          this.analyticsService.trackPerformanceMetric(metric);
        }
      });

      this.observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (error) {
      console.warn('Performance monitoring not supported:', error);
    }
  }

  private observeResourceTiming(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const resourceEntry = entry as PerformanceResourceTiming;
          if (resourceEntry.initiatorType === 'img' || resourceEntry.initiatorType === 'script') {
            const metric = {
              name: `resource_${resourceEntry.initiatorType}`,
              value: Math.round(resourceEntry.duration),
              unit: 'ms'
            };
            this.analyticsService.trackPerformanceMetric(metric);
          }
        }
      });

      resourceObserver.observe({ entryTypes: ['resource'] });
    } catch (error) {
      console.warn('Resource timing monitoring not supported:', error);
    }
  }

  private observeLongTasks(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const metric = {
            name: 'long_task',
            value: Math.round(entry.duration),
            unit: 'ms'
          };
          this.analyticsService.trackPerformanceMetric(metric);
        }
      });

      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (error) {
      console.warn('Long task monitoring not supported:', error);
    }
  }

  stopMonitoring(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

// Global instance
export const analyticsService = new AnalyticsService();
export const performanceMonitor = new PerformanceMonitor(analyticsService);

// Type declarations for global gtag
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

export default analyticsService; 