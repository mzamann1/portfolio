import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaHome, FaRedo, FaBug, FaInfoCircle } from 'react-icons/fa';
import { analyticsService } from '@/services/analyticsService';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  retryCount: number;
  showDetails: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false, 
      retryCount: 0,
      showDetails: false
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });
    // Log error to analytics
    analyticsService.trackError(error, 'ErrorBoundary');
  }

  handleReload = () => {
    this.setState({ retryCount: this.state.retryCount + 1, error: undefined, errorInfo: undefined });
    analyticsService.trackEvent({
      action: 'ErrorReload',
      category: 'error',
      label: `retryCount:${this.state.retryCount}`
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
    analyticsService.trackEvent({
      action: 'ErrorGoHome',
      category: 'error',
      label: `retryCount:${this.state.retryCount}`
    });
  };

  handleRetry = () => {
    const newRetryCount = this.state.retryCount + 1;
    this.setState({ retryCount: newRetryCount, error: undefined, errorInfo: undefined });
    analyticsService.trackEvent({
      action: 'ErrorRetry',
      category: 'error',
      label: `retryCount:${newRetryCount}`
    });
  };

  toggleDetails = () => {
    this.setState(prev => ({ showDetails: !prev.showDetails }));
  };

  render() {
    const { error, errorInfo, retryCount } = this.state;
    const isDevelopment = import.meta.env.DEV;

    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
          <motion.div
            className="max-w-2xl w-full bg-base-200 rounded-xl p-8 shadow-2xl border border-base-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              {/* Error Icon */}
              <motion.div
                className="w-20 h-20 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-6"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FaExclamationTriangle className="w-10 h-10 text-error" />
              </motion.div>

              {/* Error Message */}
              <h1 className="text-2xl font-bold text-base-content mb-4">
                Oops! Something went wrong
              </h1>
              
              <p className="text-base-content/70 mb-6">
                We encountered an unexpected error. Don't worry, this is not your fault!
                {retryCount > 0 && (
                  <span className="block mt-2 text-sm text-warning">
                    Retry attempt: {retryCount}
                  </span>
                )}
              </p>

              {/* Error Details (Development Only) */}
              {isDevelopment && (
                <details className="mb-6 text-left">
                  <summary 
                    className="cursor-pointer text-sm text-base-content/60 hover:text-primary flex items-center gap-2"
                    onClick={this.toggleDetails}
                  >
                    <FaInfoCircle className="w-4 h-4" />
                    Error Details (Development)
                  </summary>
                  <div className="mt-2 p-3 bg-base-300 rounded text-xs font-mono text-error overflow-auto max-h-32">
                    <div className="mb-2">
                      <strong>Error:</strong> {error?.toString()}
                    </div>
                    {errorInfo && (
                      <div>
                        <strong>Stack:</strong>
                        <pre className="whitespace-pre-wrap mt-1">
                          {errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <motion.button
                  className="btn btn-primary flex-1"
                  onClick={this.handleRetry}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={retryCount >= 3}
                >
                  <FaRedo className="w-4 h-4 mr-2" />
                  {retryCount >= 3 ? 'Max Retries Reached' : 'Try Again'}
                </motion.button>
                
                <motion.button
                  className="btn btn-outline flex-1"
                  onClick={this.handleReload}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaRedo className="w-4 h-4 mr-2" />
                  Reload Page
                </motion.button>
                
                <motion.button
                  className="btn btn-outline flex-1"
                  onClick={this.handleGoHome}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaHome className="w-4 h-4 mr-2" />
                  Go Home
                </motion.button>
              </div>

              {/* Additional Help */}
              <div className="text-sm text-base-content/60 space-y-2">
                <p>
                  If this problem persists, please contact me at{' '}
                  <a 
                    href="mailto:contact@example.com" 
                    className="text-primary hover:underline"
                  >
                    contact@example.com
                  </a>
                </p>
                
                {isDevelopment && (
                  <div className="flex items-center justify-center gap-2 text-xs">
                    <FaBug className="w-3 h-3" />
                    <span>Development Mode - Error tracking enabled</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 