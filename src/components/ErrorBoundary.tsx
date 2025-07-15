import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaHome, FaRedo } from 'react-icons/fa';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
          <motion.div
            className="max-w-md w-full bg-base-200 rounded-xl p-8 shadow-2xl border border-base-300"
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
              </p>

              {/* Error Details (Development Only) */}
              {import.meta.env.DEV && this.state.error && (
                <details className="mb-6 text-left">
                  <summary className="cursor-pointer text-sm text-base-content/60 hover:text-primary">
                    Error Details (Development)
                  </summary>
                  <div className="mt-2 p-3 bg-base-300 rounded text-xs font-mono text-error overflow-auto max-h-32">
                    <div className="mb-2">
                      <strong>Error:</strong> {this.state.error.toString()}
                    </div>
                    {this.state.errorInfo && (
                      <div>
                        <strong>Stack:</strong>
                        <pre className="whitespace-pre-wrap mt-1">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  className="btn btn-primary flex-1"
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

              {/* Contact Info */}
              <div className="mt-6 pt-6 border-t border-base-300">
                <p className="text-sm text-base-content/60">
                  If this problem persists, please contact me at{' '}
                  <a 
                    href="mailto:contact@example.com" 
                    className="text-primary hover:underline"
                  >
                    contact@example.com
                  </a>
                </p>
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