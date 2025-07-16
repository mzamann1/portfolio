import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  FaTwitter, 
  FaLinkedin, 
  FaFacebook, 
  FaWhatsapp, 
  FaTelegram, 
  FaCopy,
  FaShare,
  FaQrcode,
  FaTimes
} from 'react-icons/fa';
import { useState } from 'react';

interface SocialSharingProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  hashtags?: string[];
}

export const SocialSharing = ({ 
  title = "Muhammad Zaman - Full-Stack Developer Portfolio",
  description = "Check out my portfolio showcasing React, .NET, and modern web development skills",
  url = window.location.href,
  hashtags = ["portfolio", "react", "dotnet", "webdev"]
}: SocialSharingProps) => {
  const { t } = useTranslation();
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const platforms = [
    {
      name: 'Twitter',
      icon: FaTwitter,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500',
      action: () => {
        const text = `${title}\n\n${description}\n\n${hashtags.map(tag => `#${tag}`).join(' ')}\n\n${url}`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
      }
    },
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      color: 'text-blue-600',
      bgColor: 'bg-blue-600',
      action: () => {
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        window.open(linkedinUrl, '_blank');
      }
    },
    {
      name: 'Facebook',
      icon: FaFacebook,
      color: 'text-blue-700',
      bgColor: 'bg-blue-700',
      action: () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(facebookUrl, '_blank');
      }
    },
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      color: 'text-green-500',
      bgColor: 'bg-green-500',
      action: () => {
        const text = `${title}\n\n${description}\n\n${url}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
      }
    },
    {
      name: 'Telegram',
      icon: FaTelegram,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400',
      action: () => {
        const text = `${title}\n\n${description}\n\n${url}`;
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
      }
    }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const generateQRCode = () => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
    return qrUrl;
  };

  const shareViaNativeAPI = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback to copy
      copyToClipboard();
    }
  };

  return (
    <>
      {/* Floating Share Button */}
      <motion.button
        className="fixed bottom-20 right-4 z-40 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowShareModal(true)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
      >
        <FaShare className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 px-3 py-2 bg-base-300 text-base-content text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          {t('share_portfolio', 'Share Portfolio')}
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-base-300 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
        </div>
      </motion.button>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              className="bg-base-100 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-base-300"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-base-content">
                  {t('share_portfolio', 'Share Portfolio')}
                </h3>
                <button
                  className="text-base-content/60 hover:text-primary text-2xl transition-colors"
                  onClick={() => setShowShareModal(false)}
                >
                  <FaTimes />
                </button>
              </div>

              {/* Share Preview */}
              <motion.div
                className="bg-base-200 rounded-xl p-4 border border-base-300 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex-shrink-0 flex items-center justify-center">
                    <FaShare className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-base-content truncate text-sm">{title}</h4>
                    <p className="text-xs text-base-content/70 line-clamp-2 mt-1">{description}</p>
                    <p className="text-xs text-base-content/50 mt-1">{new URL(url).hostname}</p>
                  </div>
                </div>
              </motion.div>

              {/* Platform Buttons */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {platforms.map((platform, index) => (
                  <motion.button
                    key={platform.name}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl bg-base-200 border border-base-300 hover:border-primary transition-all duration-300 group`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      platform.action();
                      setShowShareModal(false);
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  >
                    <platform.icon className={`w-5 h-5 ${platform.color} group-hover:scale-110 transition-transform duration-300`} />
                    <span className="text-xs mt-1 text-base-content/70">{platform.name}</span>
                  </motion.button>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <motion.button
                  className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary-focus transition-colors text-sm"
                  onClick={() => {
                    shareViaNativeAPI();
                    setShowShareModal(false);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaShare className="w-4 h-4" />
                  <span>{t('share', 'Share')}</span>
                </motion.button>

                <motion.button
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors text-sm ${
                    copied 
                      ? 'bg-success text-success-content border-success' 
                      : 'bg-base-200 border-base-300 hover:border-primary'
                  }`}
                  onClick={copyToClipboard}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaCopy className="w-4 h-4" />
                  <span>{copied ? t('copied', 'Copied!') : t('copy_link', 'Copy Link')}</span>
                </motion.button>

                <motion.button
                  className="flex items-center space-x-2 px-4 py-2 bg-base-200 border border-base-300 rounded-lg hover:border-primary transition-colors text-sm"
                  onClick={() => setShowQR(!showQR)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaQrcode className="w-4 h-4" />
                  <span>{t('qr_code', 'QR Code')}</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQR(false)}
          >
            <motion.div
              className="bg-base-100 rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">{t('qr_code', 'QR Code')}</h3>
                <button
                  className="text-base-content/60 hover:text-primary text-xl"
                  onClick={() => setShowQR(false)}
                >
                  ×
                </button>
              </div>
              <div className="text-center">
                <img
                  src={generateQRCode()}
                  alt="QR Code"
                  className="mx-auto rounded-lg border border-base-300"
                />
                <p className="text-sm text-base-content/70 mt-3">
                  {t('scan_to_visit', 'Scan to visit this page')}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SocialSharing; 