import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { useContactData } from '@hooks/usePortfolioData';
import { useLanguageFont } from '@hooks/useLanguageFont';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter, FaGlobe, FaShieldAlt, FaExclamationTriangle } from 'react-icons/fa';
import { analyticsService } from '@services/analyticsService';
import { 
  validateFormInput,
  sanitizeText,
  containsDangerousContent,
  RateLimiter
} from '@utils/securityUtils';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  subject?: string;
  message?: string;
  general?: string;
}

const iconMap: Record<string, JSX.Element> = {
  FaEnvelope: <FaEnvelope className="w-5 h-5 sm:w-6 sm:h-6" />,
  FaPhone: <FaPhone className="w-5 h-5 sm:w-6 sm:h-6" />,
  FaMapMarkerAlt: <FaMapMarkerAlt className="w-5 h-5 sm:w-6 sm:h-6" />,
  FaLinkedin: <FaLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />,
  FaGithub: <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />,
  FaTwitter: <FaTwitter className="w-5 h-5 sm:w-6 sm:h-6" />,
  FaGlobe: <FaGlobe className="w-5 h-5 sm:w-6 sm:h-6" />,
};

// Create rate limiter instance
const contactRateLimiter = new RateLimiter(5, 15 * 60 * 1000); // 5 attempts per 15 minutes

const Contact = () => {
  const { t } = useTranslation();
  const { data: contactData, loading } = useContactData();
  const { fontClass, heading, body } = useLanguageFont();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [rateLimitInfo, setRateLimitInfo] = useState<{
    remaining: number;
    resetTime: number;
  } | null>(null);

  // Check rate limiting on component mount
  useEffect(() => {
    const identifier = 'contact-form';
    const isAllowed = contactRateLimiter.isAllowed(identifier);
    
    if (!isAllowed) {
      const remaining = contactRateLimiter.getRemainingAttempts(identifier);
      setRateLimitInfo({ remaining, resetTime: Date.now() + 15 * 60 * 1000 });
    }
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Validate each field
    const firstNameValidation = validateFormInput(formData.firstName, 'text', { required: true, minLength: 2, maxLength: 50 });
    if (!firstNameValidation.isValid) {
      newErrors.firstName = firstNameValidation.errors[0];
    }

    const lastNameValidation = validateFormInput(formData.lastName, 'text', { required: true, minLength: 2, maxLength: 50 });
    if (!lastNameValidation.isValid) {
      newErrors.lastName = lastNameValidation.errors[0];
    }

    const emailValidation = validateFormInput(formData.email, 'email', { required: true });
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.errors[0];
    }

    const subjectValidation = validateFormInput(formData.subject, 'text', { required: true, minLength: 5, maxLength: 100 });
    if (!subjectValidation.isValid) {
      newErrors.subject = subjectValidation.errors[0];
    }

    const messageValidation = validateFormInput(formData.message, 'textarea', { required: true, minLength: 10, maxLength: 1000 });
    if (!messageValidation.isValid) {
      newErrors.message = messageValidation.errors[0];
    }

    // Check for dangerous content
    if (containsDangerousContent(formData.message)) {
      newErrors.message = 'Message contains potentially dangerous content';
    }

    // Check rate limiting
    const identifier = 'contact-form';
    if (!contactRateLimiter.isAllowed(identifier)) {
      const remaining = contactRateLimiter.getRemainingAttempts(identifier);
      setRateLimitInfo({ remaining, resetTime: Date.now() + 15 * 60 * 1000 });
      newErrors.general = `Too many attempts. Please try again in 15 minutes.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Track form submission attempt
      analyticsService.trackContactFormSubmission();

      // EmailJS configuration
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_EMAILJS_SERVICE_ID';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_EMAILJS_TEMPLATE_ID';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_EMAILJS_PUBLIC_KEY';

      // Sanitize form data
      const sanitizedData = {
        firstName: sanitizeText(formData.firstName),
        lastName: sanitizeText(formData.lastName),
        email: formData.email.trim(),
        subject: sanitizeText(formData.subject),
        message: sanitizeText(formData.message),
      };

      const templateParams = {
        from_name: `${sanitizedData.firstName} ${sanitizedData.lastName}`,
        from_email: sanitizedData.email,
        subject: sanitizedData.subject,
        message: sanitizedData.message,
        to_name: 'Portfolio Owner',
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        referrer: document.referrer,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setSubmitStatus('success');
      
      // Track successful submission
      analyticsService.trackEvent({
        action: 'contact_form_success',
        category: 'engagement',
        label: 'contact_form'
      });
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
      });

      // Clear rate limit info
      setRateLimitInfo(null);
      
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
      
      // Track failed submission
      analyticsService.trackEvent({
        action: 'contact_form_error',
        category: 'error',
        label: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || !contactData) {
    return (
      <div id="contact" className={`py-20 bg-base-100/80 backdrop-blur ${fontClass}`}>
        <div className="container mx-auto px-4 flex justify-center">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <section id="contact" className={`py-12 sm:py-16 md:py-20 bg-base-100/80 backdrop-blur ${fontClass}`}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className={`${heading} text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-base-content mb-4 sm:mb-6`}>
            {t('contact.title', 'Get In Touch')}
          </h2>
          <p className={`${body} text-sm sm:text-base md:text-lg text-base-content/70 max-w-2xl mx-auto px-2 sm:px-4`}>
            {t('contact.description', 'Ready to start a project or have a question? I\'d love to hear from you.')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className={`${heading} text-xl sm:text-2xl font-bold text-base-content mb-6 sm:mb-8`}>
              {t('contact.info.title', 'Contact Information')}
            </h3>
            
            <div className="space-y-4 sm:space-y-6">
              {contactData.contactInfo.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="flex items-start space-x-3 sm:space-x-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    {iconMap[item.icon] || <FaEnvelope className="w-5 h-5 sm:w-6 sm:h-6" />}
                  </div>
                  <div>
                    <h4 className={`${heading} font-semibold text-base-content mb-1 text-sm sm:text-base`}>
                      {item.title}
                    </h4>
                    <p className={`${body} text-base-content/70 text-sm sm:text-base`}>
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            {contactData.socialLinks && contactData.socialLinks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8"
              >
                <h4 className={`${heading} text-base sm:text-lg font-semibold text-base-content mb-3 sm:mb-4`}>
                  {t('contact.social.title', 'Follow Me')}
                </h4>
                <div className="flex space-x-3 sm:space-x-4">
                  {contactData.socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors"
                    >
                      {iconMap[social.icon] || <FaGlobe className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-base-200/50 backdrop-blur rounded-2xl p-4 sm:p-6 md:p-8 border border-base-300"
          >
            <div className="flex items-center mb-4 sm:mb-6">
              <FaShieldAlt className="w-4 h-4 sm:w-5 sm:h-5 text-success mr-2" />
              <span className="text-xs sm:text-sm text-success">
                {t('contact.form.secure', 'Secure Form')}
              </span>
            </div>

            {rateLimitInfo && (
              <div className="mb-4 p-3 bg-warning/20 border border-warning/30 rounded-lg">
                <div className="flex items-center">
                  <FaExclamationTriangle className="w-4 h-4 text-warning mr-2" />
                  <span className="text-sm text-warning">
                    Rate limit exceeded. Please try again later.
                  </span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label htmlFor="firstName" className={`${body} block text-xs sm:text-sm font-medium text-base-content mb-1 sm:mb-2`}>
                    {t('contact.form.firstName', 'First Name')} *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border text-sm sm:text-base ${
                      errors.firstName ? 'border-error' : 'border-base-300'
                    } bg-base-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors`}
                    placeholder={t('contact.form.firstNamePlaceholder', 'Your first name')}
                  />
                  {errors.firstName && (
                    <p className="text-error text-xs sm:text-sm mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className={`${body} block text-xs sm:text-sm font-medium text-base-content mb-1 sm:mb-2`}>
                    {t('contact.form.lastName', 'Last Name')} *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border text-sm sm:text-base ${
                      errors.lastName ? 'border-error' : 'border-base-300'
                    } bg-base-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors`}
                    placeholder={t('contact.form.lastNamePlaceholder', 'Your last name')}
                  />
                  {errors.lastName && (
                    <p className="text-error text-xs sm:text-sm mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className={`${body} block text-xs sm:text-sm font-medium text-base-content mb-1 sm:mb-2`}>
                  {t('contact.form.email', 'Email')} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border text-sm sm:text-base ${
                    errors.email ? 'border-error' : 'border-base-300'
                  } bg-base-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors`}
                  placeholder={t('contact.form.emailPlaceholder', 'your.email@example.com')}
                />
                {errors.email && (
                  <p className="text-error text-xs sm:text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className={`${body} block text-xs sm:text-sm font-medium text-base-content mb-1 sm:mb-2`}>
                  {t('contact.form.subject', 'Subject')} *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border text-sm sm:text-base ${
                    errors.subject ? 'border-error' : 'border-base-300'
                  } bg-base-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors`}
                  placeholder={t('contact.form.subjectPlaceholder', 'What is this about?')}
                />
                {errors.subject && (
                  <p className="text-error text-xs sm:text-sm mt-1">{errors.subject}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className={`${body} block text-xs sm:text-sm font-medium text-base-content mb-1 sm:mb-2`}>
                  {t('contact.form.message', 'Message')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border text-sm sm:text-base ${
                    errors.message ? 'border-error' : 'border-base-300'
                  } bg-base-100 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors resize-none`}
                  placeholder={t('contact.form.messagePlaceholder', 'Tell me about your project or question...')}
                />
                {errors.message && (
                  <p className="text-error text-xs sm:text-sm mt-1">{errors.message}</p>
                )}
              </div>

              {errors.general && (
                <div className="p-3 bg-error/10 border border-error/30 rounded-lg">
                  <p className="text-error text-sm">{errors.general}</p>
                </div>
              )}

              {submitStatus === 'success' && (
                <div className="p-3 bg-success/10 border border-success/30 rounded-lg">
                  <p className="text-success text-sm">
                    {t('contact.form.success', 'Thank you! Your message has been sent successfully.')}
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-3 bg-error/10 border border-error/30 rounded-lg">
                  <p className="text-error text-sm">
                    {t('contact.form.error', 'Sorry, there was an error sending your message. Please try again.')}
                  </p>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting || !!rateLimitInfo}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-sm sm:text-base transition-all ${
                  isSubmitting || rateLimitInfo
                    ? 'bg-base-300 text-base-content/50 cursor-not-allowed'
                    : 'bg-primary text-primary-content hover:bg-primary-focus'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="loading loading-spinner loading-sm mr-2"></div>
                    {t('contact.form.sending', 'Sending...')}
                  </span>
                ) : (
                  t('contact.form.send', 'Send Message')
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 