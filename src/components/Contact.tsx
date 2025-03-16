// src/components/Contact.tsx
import { useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ScrollRevealSection from './shared/ScrollRevealSection';
import GlassCard from './shared/GlassCard';
import MorphingShape from './shared/MorphingShape';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitStatus('success');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const socialLinks = [
    { icon: FaGithub, href: '#', label: 'GitHub' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
    { icon: FaEnvelope, href: 'mailto:your.email@example.com', label: 'Email' }
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Morphing shape background */}
      <MorphingShape className="top-0 left-0 w-full h-full" color="var(--light-accent)" duration={15} />
      
      <div className="container relative z-10">
        <ScrollRevealSection>
          <h2 className="text-3xl font-bold gradient-text text-center mb-4">
            Get In Touch
          </h2>
          <p className="text-light-textSecondary dark:text-dark-textSecondary text-center max-w-2xl mx-auto mb-12">
            I'm currently looking for new opportunities. Whether you have a question
            or just want to say hi, I'll try my best to get back to you!
          </p>
        </ScrollRevealSection>

        <ScrollRevealSection>
          <GlassCard className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-light-secondary dark:bg-dark-secondary border border-transparent focus:border-light-accent dark:focus:border-dark-accent focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-light-secondary dark:bg-dark-secondary border border-transparent focus:border-light-accent dark:focus:border-dark-accent focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-light-secondary dark:bg-dark-secondary border border-transparent focus:border-light-accent dark:focus:border-dark-accent focus:outline-none transition-colors h-32"
                  required
                />
              </div>

              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-light-accent dark:bg-dark-accent text-white rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </div>
            </form>

            {submitStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-green-500 text-center"
              >
                Message sent successfully!
              </motion.div>
            )}
          </GlassCard>
        </ScrollRevealSection>

        <ScrollRevealSection>
          <div className="mt-12 flex justify-center space-x-6">
            {socialLinks.map((social, _index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="text-2xl text-light-text dark:text-dark-text hover:text-light-accent dark:hover:text-dark-accent transition-colors"
                aria-label={social.label}
              >
                <social.icon />
              </motion.a>
            ))}
          </div>
        </ScrollRevealSection>
      </div>
    </section>
  );
};

export default Contact;