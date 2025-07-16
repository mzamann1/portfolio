// Google Analytics service
class AnalyticsService {
  private isInitialized = false;
  private queue: Array<() => void> = [];
  private gtag: any = null;

  constructor() {
    this.initialize();
  }

  private initialize() {
    // Check if Google Analytics is available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      this.gtag = (window as any).gtag;
      this.isInitialized = true;
      this.processQueue();
    } else {
      // Queue events until GA is loaded
      this.queue.push(() => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
          this.gtag = (window as any).gtag;
          this.isInitialized = true;
          this.processQueue();
        }
      });
    }
  }

  private processQueue() {
    while (this.queue.length > 0) {
      const event = this.queue.shift();
      if (event) event();
    }
  }

  // Track page views
  trackPageView(page: string) {
    if (this.isInitialized && this.gtag) {
      this.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
        page_path: page,
      });
    } else {
      this.queue.push(() => this.trackPageView(page));
    }
  }

  // Track custom events
  trackEvent(action: string, category: string, label?: string, value?: number) {
    if (this.isInitialized && this.gtag) {
      this.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    } else {
      this.queue.push(() => this.trackEvent(action, category, label, value));
    }
  }

  // Track form submissions
  trackFormSubmission(formName: string, success: boolean, errorMessage?: string) {
    this.trackEvent('form_submit', 'engagement', formName, success ? 1 : 0);
    
    if (!success && errorMessage) {
      this.trackEvent('form_error', 'engagement', `${formName}_${errorMessage}`, 1);
    }
  }

  // Track user interactions
  trackInteraction(action: string, category: string, label?: string) {
    this.trackEvent(action, 'interaction', label || category);
  }

  // Track errors
  trackError(error: Error, context?: string) {
    this.trackEvent('exception', 'error', `${context || 'app'}_${error.message}`, 1);
  }

  // Track performance metrics
  trackPerformance(metric: string, value: number) {
    this.trackEvent('timing_complete', 'performance', metric, Math.round(value));
  }

  // Track social media clicks
  trackSocialClick(platform: string) {
    this.trackEvent('click', 'social', platform);
  }

  // Track project views
  trackProjectView(projectName: string) {
    this.trackEvent('view', 'project', projectName);
  }

  // Track skill interactions
  trackSkillInteraction(skillName: string, action: string) {
    this.trackEvent(action, 'skill', skillName);
  }
}

// Create singleton instance
const analytics = new AnalyticsService();

export default analytics; 