import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useContactData } from '../hooks/usePortfolioData';
import { useLanguageFont } from '../hooks/useLanguageFont';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter, FaGlobe } from 'react-icons/fa';

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
}

const iconMap: Record<string, JSX.Element> = {
  FaEnvelope: <FaEnvelope className="w-6 h-6" />,
  FaPhone: <FaPhone className="w-6 h-6" />,
  FaMapMarkerAlt: <FaMapMarkerAlt className="w-6 h-6" />,
  FaLinkedin: <FaLinkedin className="w-6 h-6" />,
  FaGithub: <FaGithub className="w-6 h-6" />,
  FaTwitter: <FaTwitter className="w-6 h-6" />,
  FaGlobe: <FaGlobe className="w-6 h-6" />,
};

const Contact = () => {
  const { t } = useTranslation();
  const { data: contactData, loading } = useContactData();
  const { fontClass, heading, body } = useLanguageFont();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t('first_name_required', 'First name is required');
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = t('last_name_required', 'Last name is required');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('email_required', 'Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('email_invalid', 'Please enter a valid email');
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t('subject_required', 'Subject is required');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('message_required', 'Message is required');
    } else if (formData.message.length < 10) {
      newErrors.message = t('message_too_short', 'Message must be at least 10 characters');
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
      // EmailJS configuration - you'll need to replace these with your actual values
      const serviceId = 'YOUR_EMAILJS_SERVICE_ID';
      const templateId = 'YOUR_EMAILJS_TEMPLATE_ID';
      const publicKey = 'YOUR_EMAILJS_PUBLIC_KEY';

      const templateParams = {
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Portfolio Owner' // Your name
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      
      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Email sending failed:', error);
      setSubmitStatus('error');
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
    <section id="contact" className={`w-full max-w-7xl mx-auto py-16 px-4 md:px-12 ${fontClass}`}>
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-16">
          <h2 className={heading}>
            {t('contact')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mb-4"></div>
          <p className={body + ' text-xl max-w-2xl mx-auto'}>
            {contactData.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card bg-base-200/80 backdrop-blur border border-base-300/40 shadow-xl rounded-2xl">
            <div className="card-body">
              <h3 className="card-title text-2xl font-bold mb-6">{t('send_message', 'Send Message')}</h3>
              
              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="alert alert-success mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{t('message_sent_success', 'Message sent successfully! I\'ll get back to you soon.')}</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="alert alert-error mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{t('message_sent_error', 'Failed to send message. Please try again or contact me directly.')}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">{t('first_name', 'First Name')}</span>
                    </label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`input input-bordered focus:input-primary transition-colors duration-300 rounded-lg ${errors.firstName ? 'input-error' : ''}`}
                      placeholder={t('first_name_placeholder', 'John')}
                    />
                    {errors.firstName && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.firstName}</span>
                      </label>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">{t('last_name', 'Last Name')}</span>
                    </label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`input input-bordered focus:input-primary transition-colors duration-300 rounded-lg ${errors.lastName ? 'input-error' : ''}`}
                      placeholder={t('last_name_placeholder', 'Doe')}
                    />
                    {errors.lastName && (
                      <label className="label">
                        <span className="label-text-alt text-error">{errors.lastName}</span>
                      </label>
                    )}
                  </div>
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">{t('email', 'Email')}</span>
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`input input-bordered focus:input-primary transition-colors duration-300 rounded-lg ${errors.email ? 'input-error' : ''}`}
                    placeholder={t('email_placeholder', 'john@example.com')}
                  />
                  {errors.email && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.email}</span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">{t('subject', 'Subject')}</span>
                  </label>
                  <input 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`input input-bordered focus:input-primary transition-colors duration-300 rounded-lg ${errors.subject ? 'input-error' : ''}`}
                    placeholder={t('subject_placeholder', 'Project Inquiry')}
                  />
                  {errors.subject && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.subject}</span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">{t('message', 'Message')}</span>
                  </label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`textarea textarea-bordered focus:textarea-primary transition-colors duration-300 h-32 rounded-lg ${errors.message ? 'textarea-error' : ''}`}
                    placeholder={t('message_placeholder', 'Tell me about your project...')}
                  ></textarea>
                  {errors.message && (
                    <label className="label">
                      <span className="label-text-alt text-error">{errors.message}</span>
                    </label>
                  )}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn btn-primary btn-wide rounded-xl shadow-md"
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      {t('sending', 'Sending...')}
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      {t('send_message', 'Send Message')}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className={`space-y-8 ${fontClass}`}>
            {/* Contact Details */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-6">{t('get_in_touch', 'Get In Touch')}</h3>
              {contactData.contactInfo.map((info) => (
                <div key={info.id} className="flex items-center space-x-4 p-4 bg-base-200/80 backdrop-blur border border-base-300/40 rounded-xl hover:bg-base-300/60 transition-colors duration-300">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    {iconMap[info.icon] || <div className="w-6 h-6 bg-primary rounded"></div>}
                  </div>
                  <div>
                    <h4 className="font-medium">{info.title}</h4>
                    <p className="text-base-content/70">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-2xl font-bold mb-6">{t('follow_me', 'Follow Me')}</h3>
              <div className="flex space-x-4">
                {contactData.socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-base-200/80 backdrop-blur border border-base-300/40 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
                  >
                    {iconMap[social.icon] || <div className="w-6 h-6 bg-current rounded"></div>}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <div className="card bg-base-200/80 backdrop-blur border border-base-300/40 shadow-xl rounded-2xl">
              <div className="card-body">
                <h3 className="card-title text-xl font-bold mb-4">{t('availability', 'Availability')}</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-3 h-3 rounded-full ${contactData.availability.status === 'available' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="font-medium">{contactData.availability.message}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {contactData.availability.availableFor.map((item, index) => (
                    <span key={index} className="badge badge-primary badge-outline">{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact; 