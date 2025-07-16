// Security utilities for form validation and protection

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

interface FormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  subject?: string;
  message?: string;
  [key: string]: any;
}

// Rate limiter for contact forms
class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map();
  private readonly MAX_ATTEMPTS = 5;
  private readonly WINDOW_MS = 15 * 60 * 1000; // 15 minutes

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const record = this.attempts.get(identifier);

    if (!record) {
      return true;
    }

    // Reset if window has passed
    if (now > record.resetTime) {
      this.attempts.delete(identifier);
      return true;
    }

    return record.count < this.MAX_ATTEMPTS;
  }

  recordAttempt(identifier: string): void {
    const now = Date.now();
    const record = this.attempts.get(identifier);

    if (!record) {
      this.attempts.set(identifier, {
        count: 1,
        resetTime: now + this.WINDOW_MS,
      });
    } else {
      record.count++;
    }
  }

  getRemainingAttempts(identifier: string): number {
    const record = this.attempts.get(identifier);
    if (!record) return this.MAX_ATTEMPTS;
    return Math.max(0, this.MAX_ATTEMPTS - record.count);
  }

  getResetTime(identifier: string): number {
    const record = this.attempts.get(identifier);
    return record?.resetTime || Date.now();
  }

  clear(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

// Create rate limiter instance
export const contactFormRateLimiter = new RateLimiter();

// Validate form data
export function validateFormData(data: FormData): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate first name
  if (!data.firstName || data.firstName.trim().length === 0) {
    errors.firstName = 'First name is required';
  } else if (data.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  } else if (data.firstName.trim().length > 50) {
    errors.firstName = 'First name must be less than 50 characters';
  }

  // Validate last name
  if (!data.lastName || data.lastName.trim().length === 0) {
    errors.lastName = 'Last name is required';
  } else if (data.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  } else if (data.lastName.trim().length > 50) {
    errors.lastName = 'Last name must be less than 50 characters';
  }

  // Validate email
  if (!data.email || data.email.trim().length === 0) {
    errors.email = 'Email is required';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
  }

  // Validate subject
  if (!data.subject || data.subject.trim().length === 0) {
    errors.subject = 'Subject is required';
  } else if (data.subject.trim().length < 5) {
    errors.subject = 'Subject must be at least 5 characters';
  } else if (data.subject.trim().length > 100) {
    errors.subject = 'Subject must be less than 100 characters';
  }

  // Validate message
  if (!data.message || data.message.trim().length === 0) {
    errors.message = 'Message is required';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  } else if (data.message.trim().length > 1000) {
    errors.message = 'Message must be less than 1000 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// Sanitize form data
export function sanitizeFormData(data: FormData): FormData {
  const sanitized: FormData = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      // Remove HTML tags and dangerous characters
      let sanitizedValue = value
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/[<>]/g, '') // Remove angle brackets
        .trim();

      // Limit length for security
      if (sanitizedValue.length > 1000) {
        sanitizedValue = sanitizedValue.substring(0, 1000);
      }

      sanitized[key] = sanitizedValue;
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

// Generate CSRF token
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Validate CSRF token
export function validateCSRFToken(token: string, expectedToken: string): boolean {
  if (!token || !expectedToken) {
    return false;
  }
  return token === expectedToken;
}

// Check if connection is secure
export function isSecureConnection(): boolean {
  if (typeof window === 'undefined') {
    return true; // Server-side, assume secure
  }
  
  return window.location.protocol === 'https:' || 
         window.location.hostname === 'localhost' ||
         window.location.hostname === '127.0.0.1';
}

// Validate file upload
export function validateFileUpload(file: File): { isValid: boolean; error?: string } {
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];

  if (file.size > MAX_SIZE) {
    return { isValid: false, error: 'File size must be less than 5MB' };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { isValid: false, error: 'File type not allowed' };
  }

  return { isValid: true };
}

// Sanitize HTML content
export function sanitizeHTML(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
}

// Validate URL
export function validateURL(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
}

// Rate limiting for API calls
export function createAPIRateLimiter(maxCalls: number, windowMs: number) {
  const calls = new Map<string, { count: number; resetTime: number }>();

  return function isAllowed(identifier: string): boolean {
    const now = Date.now();
    const record = calls.get(identifier);

    if (!record) {
      calls.set(identifier, { count: 1, resetTime: now + windowMs });
      return true;
    }

    if (now > record.resetTime) {
      calls.set(identifier, { count: 1, resetTime: now + windowMs });
      return true;
    }

    if (record.count >= maxCalls) {
      return false;
    }

    record.count++;
    return true;
  };
} 