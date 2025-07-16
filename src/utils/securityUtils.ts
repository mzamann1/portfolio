/**
 * Security utilities for input sanitization, XSS prevention, and secure data handling
 */

// HTML entity mapping for XSS prevention
const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export const sanitizeHtml = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  return input.replace(/[&<>"'`=/]/g, (char) => HTML_ENTITIES[char] || char);
};

/**
 * Sanitize text content (removes HTML tags)
 */
export const sanitizeText = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  // Remove HTML tags
  const withoutTags = input.replace(/<[^>]*>/g, '');
  
  // Decode HTML entities
  const textarea = document.createElement('textarea');
  textarea.innerHTML = withoutTags;
  return textarea.value;
};

/**
 * Validate email format
 */
export const validateEmail = (email: string): boolean => {
  if (typeof email !== 'string') return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Validate URL format
 */
export const validateUrl = (url: string): boolean => {
  if (typeof url !== 'string') return false;
  
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate phone number format
 */
export const validatePhone = (phone: string): boolean => {
  if (typeof phone !== 'string') return false;
  
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Check if it's a valid phone number (7-15 digits)
  return digitsOnly.length >= 7 && digitsOnly.length <= 15;
};

/**
 * Sanitize and validate form input
 */
export interface FormValidationResult {
  isValid: boolean;
  sanitizedValue: string;
  errors: string[];
}

export const validateFormInput = (
  value: string,
  type: 'text' | 'email' | 'url' | 'phone' | 'textarea',
  options: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    allowHtml?: boolean;
  } = {}
): FormValidationResult => {
  const { required = false, minLength = 0, maxLength = 1000, allowHtml = false } = options;
  const errors: string[] = [];
  
  // Check if required
  if (required && (!value || value.trim().length === 0)) {
    errors.push('This field is required');
    return { isValid: false, sanitizedValue: '', errors };
  }
  
  // Skip validation if empty and not required
  if (!value || value.trim().length === 0) {
    return { isValid: true, sanitizedValue: '', errors };
  }
  
  let sanitizedValue = value.trim();
  
  // Sanitize based on type
  switch (type) {
    case 'email':
      if (!validateEmail(sanitizedValue)) {
        errors.push('Please enter a valid email address');
      }
      break;
      
    case 'url':
      if (!validateUrl(sanitizedValue)) {
        errors.push('Please enter a valid URL');
      }
      break;
      
    case 'phone':
      if (!validatePhone(sanitizedValue)) {
        errors.push('Please enter a valid phone number');
      }
      break;
      
    case 'textarea':
      // For textarea, we might allow some basic formatting
      if (!allowHtml) {
        sanitizedValue = sanitizeText(sanitizedValue);
      }
      break;
      
    default:
      // For text inputs, sanitize HTML unless explicitly allowed
      if (!allowHtml) {
        sanitizedValue = sanitizeText(sanitizedValue);
      }
  }
  
  // Check length constraints
  if (sanitizedValue.length < minLength) {
    errors.push(`Minimum length is ${minLength} characters`);
  }
  
  if (sanitizedValue.length > maxLength) {
    errors.push(`Maximum length is ${maxLength} characters`);
  }
  
  return {
    isValid: errors.length === 0,
    sanitizedValue,
    errors
  };
};

/**
 * Generate a secure random string
 */
export const generateSecureToken = (length: number = 32): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  if (typeof window !== 'undefined' && window.crypto) {
    // Use crypto API if available
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    
    for (let i = 0; i < length; i++) {
      result += chars.charAt(array[i] % chars.length);
    }
  } else {
    // Fallback to Math.random (less secure)
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  }
  
  return result;
};

/**
 * Hash a string using a simple algorithm (for non-sensitive data)
 */
export const simpleHash = (str: string): string => {
  let hash = 0;
  if (str.length === 0) return hash.toString();
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(36);
};

/**
 * Check if a string contains potentially dangerous content
 */
export const containsDangerousContent = (input: string): boolean => {
  if (typeof input !== 'string') return false;
  
  const dangerousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /data:text\/html/gi,
    /vbscript:/gi,
    /expression\s*\(/gi
  ];
  
  return dangerousPatterns.some(pattern => pattern.test(input));
};

/**
 * Sanitize object properties recursively
 */
export const sanitizeObject = <T extends Record<string, unknown>>(obj: T): T => {
  const sanitized: Record<string, unknown> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeText(value);
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      sanitized[key] = sanitizeObject(value as Record<string, unknown>);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map(item => 
        typeof item === 'string' ? sanitizeText(item) : item
      );
    } else {
      sanitized[key] = value;
    }
  }
  
  return sanitized as T;
};

/**
 * Rate limiting utility
 */
export class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map();
  
  constructor(
    private maxAttempts: number = 5,
    private windowMs: number = 15 * 60 * 1000 // 15 minutes
  ) {}
  
  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const attempt = this.attempts.get(identifier);
    
    if (!attempt || now > attempt.resetTime) {
      // Reset or create new attempt record
      this.attempts.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs
      });
      return true;
    }
    
    if (attempt.count >= this.maxAttempts) {
      return false;
    }
    
    attempt.count++;
    return true;
  }
  
  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
  
  getRemainingAttempts(identifier: string): number {
    const attempt = this.attempts.get(identifier);
    if (!attempt) return this.maxAttempts;
    
    const now = Date.now();
    if (now > attempt.resetTime) {
      return this.maxAttempts;
    }
    
    return Math.max(0, this.maxAttempts - attempt.count);
  }
} 