/* eslint-disable @typescript-eslint/no-unused-vars */
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

// Performance metrics interface
interface PerformanceMetrics {
  cls: number
  fid: number
  fcp: number
  lcp: number
  ttfb: number
  loadTime: number
  domContentLoaded: number
  firstPaint: number
  firstContentfulPaint: number
}

// Performance thresholds
const PERFORMANCE_THRESHOLDS = {
  CLS: { good: 0.1, needsImprovement: 0.25 },
  FID: { good: 100, needsImprovement: 300 },
  FCP: { good: 1800, needsImprovement: 3000 },
  LCP: { good: 2500, needsImprovement: 4000 },
  TTFB: { good: 800, needsImprovement: 1800 },
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {}
  private observers: Map<string, PerformanceObserver> = new Map()

  constructor() {
    this.initWebVitals()
    this.initPerformanceObservers()
  }

  // Initialize Web Vitals tracking
  private initWebVitals() {
    getCLS((metric) => this.handleWebVital('cls', metric))
    getFID((metric) => this.handleWebVital('fid', metric))
    getFCP((metric) => this.handleWebVital('fcp', metric))
    getLCP((metric) => this.handleWebVital('lcp', metric))
    getTTFB((metric) => this.handleWebVital('ttfb', metric))
  }

  // Handle Web Vitals metrics
  private handleWebVital(name: keyof PerformanceMetrics, metric: any) {
    this.metrics[name] = metric.value

    // Log performance data
    this.logPerformanceMetric(name, metric.value)

    // Send to analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', name, {
        event_category: 'Web Vitals',
        value: Math.round(name === 'cls' ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        non_interaction: true,
      })
    }
  }

  // Initialize performance observers
  private initPerformanceObservers() {
    // Navigation timing
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          this.captureNavigationTiming()
        }, 0)
      })
    }

    // Long tasks observer
    if ('PerformanceObserver' in window) {
      const longTaskObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          this.handleLongTask(entry as PerformanceEntry)
        })
      })
      longTaskObserver.observe({ entryTypes: ['longtask'] })
      this.observers.set('longtask', longTaskObserver)
    }

    // Layout shifts observer
    if ('PerformanceObserver' in window) {
      const layoutShiftObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          this.handleLayoutShift(entry as PerformanceEntry)
        })
      })
      layoutShiftObserver.observe({ entryTypes: ['layout-shift'] })
      this.observers.set('layout-shift', layoutShiftObserver)
    }
  }

  // Capture navigation timing
  private captureNavigationTiming() {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navigation) {
      this.metrics.loadTime = navigation.loadEventEnd - navigation.loadEventStart
      this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart
    }

    // Capture paint timing
    const paintEntries = performance.getEntriesByType('paint')
    paintEntries.forEach((entry) => {
      if (entry.name === 'first-paint') {
        this.metrics.firstPaint = entry.startTime
      }
      if (entry.name === 'first-contentful-paint') {
        this.metrics.firstContentfulPaint = entry.startTime
      }
    })

    this.logPerformanceSummary()
  }

  // Handle long tasks
  private handleLongTask(entry: PerformanceEntry) {
    console.warn('Long task detected:', {
      duration: entry.duration,
      startTime: entry.startTime,
      name: entry.name,
    })

    // Track in analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'long_task', {
        event_category: 'Performance',
        value: Math.round(entry.duration),
        event_label: entry.name,
      })
    }
  }

  // Handle layout shifts
  private handleLayoutShift(entry: PerformanceEntry) {
    const layoutShiftEntry = entry as any
    if (layoutShiftEntry.value > 0.1) {
      console.warn('Significant layout shift detected:', {
        value: layoutShiftEntry.value,
        sources: layoutShiftEntry.sources,
      })
    }
  }

  // Log performance metric
  private logPerformanceMetric(name: string, value: number) {
    const threshold = PERFORMANCE_THRESHOLDS[name.toUpperCase() as keyof typeof PERFORMANCE_THRESHOLDS]
    let status = 'good'
    
    if (threshold) {
      if (value > threshold.needsImprovement) {
        status = 'poor'
      } else if (value > threshold.good) {
        status = 'needs-improvement'
      }
    }
    console.log(name, value, status)
  }

  // Log performance summary
  private logPerformanceSummary() {
    // Performance summary logging removed for production
  }

  // Get current metrics
  getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics }
  }

  // Check if performance is good
  isPerformanceGood(): boolean {
    const { cls, fid, fcp, lcp, ttfb } = this.metrics
    
    return (
      (cls === undefined || cls <= PERFORMANCE_THRESHOLDS.CLS.good) &&
      (fid === undefined || fid <= PERFORMANCE_THRESHOLDS.FID.good) &&
      (fcp === undefined || fcp <= PERFORMANCE_THRESHOLDS.FCP.good) &&
      (lcp === undefined || lcp <= PERFORMANCE_THRESHOLDS.LCP.good) &&
      (ttfb === undefined || ttfb <= PERFORMANCE_THRESHOLDS.TTFB.good)
    )
  }

  // Get performance score (0-100)
  getPerformanceScore(): number {
    let score = 100
    const { cls, fid, fcp, lcp, ttfb } = this.metrics

    // Deduct points for poor performance
    if (cls && cls > PERFORMANCE_THRESHOLDS.CLS.needsImprovement) score -= 20
    if (fid && fid > PERFORMANCE_THRESHOLDS.FID.needsImprovement) score -= 20
    if (fcp && fcp > PERFORMANCE_THRESHOLDS.FCP.needsImprovement) score -= 20
    if (lcp && lcp > PERFORMANCE_THRESHOLDS.LCP.needsImprovement) score -= 20
    if (ttfb && ttfb > PERFORMANCE_THRESHOLDS.TTFB.needsImprovement) score -= 20

    return Math.max(0, score)
  }

  // Measure function execution time
  measureFunction<T>(name: string, fn: () => T): T {
    const start = performance.now()
    const result = fn()
    const end = performance.now()
    const duration = end - start

    // Track slow functions
    if (duration > 100) {
      console.warn(`Slow function detected: ${name} (${duration.toFixed(2)}ms)`)
    }

    return result
  }

  // Measure async function execution time
  async measureAsyncFunction<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now()
    const result = await fn()
    const end = performance.now()
    const duration = end - start

    // Track slow async functions
    if (duration > 1000) {
      console.warn(`Slow async function detected: ${name} (${duration.toFixed(2)}ms)`)
    }

    return result
  }

  // Cleanup observers
  destroy() {
    this.observers.forEach((observer) => {
      observer.disconnect()
    })
    this.observers.clear()
  }
}

// Create and export performance monitor instance
export const performanceMonitor = new PerformanceMonitor()

// Export utility functions
export const measureFunction = <T>(name: string, fn: () => T): T => {
  return performanceMonitor.measureFunction(name, fn)
}

export const measureAsyncFunction = <T>(name: string, fn: () => Promise<T>): Promise<T> => {
  return performanceMonitor.measureAsyncFunction(name, fn)
}

export default performanceMonitor 