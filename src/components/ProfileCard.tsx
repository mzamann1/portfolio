import { useHeroData } from '../hooks/usePortfolioData';
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ProfileCard = () => {
  const { data: hero, loading } = useHeroData();
  if (loading || !hero) return (
    <div className="w-full flex justify-center items-center py-12">
      <span className="loading loading-spinner loading-lg text-primary" />
    </div>
  );
  const { profileCard } = hero;

  return (
    <motion.div
      className="relative w-full max-w-sm mx-auto bg-base-100 rounded-3xl shadow-2xl border border-base-300/30 p-8 flex flex-col items-center gap-4 transition-all duration-300 hover:shadow-primary/30 group"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, boxShadow: '0 8px 32px 0 rgba(80,0,200,0.15)' }}
      tabIndex={0}
    >
      {/* Avatar with status */}
      <div className="relative mb-2">
        <img
          src={profileCard.avatar || '/avatar.png'}
          alt={profileCard.name}
          className="w-28 h-28 rounded-full border-4 border-primary shadow-lg object-cover bg-base-200"
        />
        <span className="absolute bottom-2 right-2 w-5 h-5 rounded-full border-2 border-base-100 bg-success animate-pulse" title="Online" />
      </div>
      {/* Name & Title */}
      <div className="text-center">
        <h2 className="text-2xl font-extrabold text-primary mb-1">{profileCard.name}</h2>
        <p className="text-base-content/70 text-sm font-medium mb-1">{profileCard.title}</p>
        <div className="flex items-center justify-center gap-1 text-xs text-base-content/60">
          <FaMapMarkerAlt className="inline-block mr-1 text-secondary" />
          {profileCard.location}
        </div>
      </div>
      {/* Social Links */}
      {profileCard.socialLinks && profileCard.socialLinks.length > 0 && (
        <div className="flex gap-3 mt-2">
          {profileCard.socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-base-200 hover:bg-primary hover:text-primary-content transition-colors duration-200 shadow group"
              title={link.name}
            >
              {/* You can use react-icons or custom SVGs here */}
              <span className="text-lg">{link.icon}</span>
            </a>
          ))}
        </div>
      )}
      {/* Contact Info */}
      <div className="flex flex-col gap-2 mt-4 w-full">
        <a
          href={`mailto:${profileCard.email}`}
          className="btn btn-outline btn-sm w-full rounded-full flex items-center gap-2"
        >
          <FaEnvelope />
          {profileCard.email}
        </a>
        <a
          href={`tel:${profileCard.phone}`}
          className="btn btn-outline btn-sm w-full rounded-full flex items-center gap-2"
        >
          <FaPhone />
          {profileCard.phone}
        </a>
      </div>
      {/* Contact Button */}
      <motion.a
        href="#contact"
        className="btn btn-primary btn-lg rounded-full mt-6 shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        Contact Me
      </motion.a>
    </motion.div>
  );
};

export default ProfileCard; 