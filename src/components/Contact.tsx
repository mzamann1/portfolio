import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useContactData } from '../hooks/usePortfolioData';
import { useLanguageFont } from '../hooks/useLanguageFont';

const Contact = () => {
  const { t } = useTranslation();
  const { data: contactData, loading } = useContactData();
  const { fontClass, heading, body } = useLanguageFont();

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
    <div id="contact" className={`py-20 bg-base-100/80 backdrop-blur ${fontClass}`}>
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
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">{t('first_name', 'First Name')}</span>
                    </label>
                    <input 
                      type="text" 
                      className="input input-bordered focus:input-primary transition-colors duration-300 rounded-lg" 
                      placeholder={t('first_name_placeholder', 'John')}
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">{t('last_name', 'Last Name')}</span>
                    </label>
                    <input 
                      type="text" 
                      className="input input-bordered focus:input-primary transition-colors duration-300 rounded-lg" 
                      placeholder={t('last_name_placeholder', 'Doe')}
                    />
                  </div>
                </div>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">{t('email', 'Email')}</span>
                  </label>
                  <input 
                    type="email" 
                    className="input input-bordered focus:input-primary transition-colors duration-300 rounded-lg" 
                    placeholder={t('email_placeholder', 'john@example.com')}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">{t('subject', 'Subject')}</span>
                  </label>
                  <input 
                    type="text" 
                    className="input input-bordered focus:input-primary transition-colors duration-300 rounded-lg" 
                    placeholder={t('subject_placeholder', 'Project Inquiry')}
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">{t('message', 'Message')}</span>
                  </label>
                  <textarea 
                    className="textarea textarea-bordered focus:textarea-primary transition-colors duration-300 h-32 rounded-lg" 
                    placeholder={t('message_placeholder', 'Tell me about your project...')}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-wide rounded-xl shadow-md">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  {t('send_message', 'Send Message')}
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
                    <div className="w-6 h-6 bg-primary rounded"></div>
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
                    <div className="w-6 h-6 bg-current rounded"></div>
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
    </div>
  );
};

export default Contact; 