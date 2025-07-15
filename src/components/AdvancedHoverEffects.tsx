import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

// Glowing hover effect
export const GlowingHover = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.div
    className={`relative group ${className}`}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
    <div className="relative z-10">
      {children}
    </div>
  </motion.div>
);

// Magnetic hover effect
export const MagneticHover = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.div
    className={`relative ${className}`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.2 }}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      whileHover={{
        x: [0, 5, -5, 0],
        y: [0, -5, 5, 0],
      }}
      transition={{ duration: 0.6, repeat: Infinity }}
    />
    <div className="relative z-10">
      {children}
    </div>
  </motion.div>
);

// Floating hover effect
export const FloatingHover = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.div
    className={`relative ${className}`}
    whileHover={{ y: -8 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      whileHover={{
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0],
      }}
      transition={{ duration: 0.8, repeat: Infinity }}
    />
    <div className="relative z-10">
      {children}
    </div>
  </motion.div>
);

// Ripple hover effect
export const RippleHover = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.div
    className={`relative overflow-hidden ${className}`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ duration: 0.2 }}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg"
      initial={{ scale: 0, opacity: 0 }}
      whileHover={{
        scale: [0, 1.5, 0],
        opacity: [0, 0.3, 0],
      }}
      transition={{ duration: 0.6 }}
    />
    <div className="relative z-10">
      {children}
    </div>
  </motion.div>
);

// Neon glow hover effect
export const NeonGlowHover = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.div
    className={`relative ${className}`}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"
      whileHover={{
        boxShadow: [
          "0 0 0 rgba(59, 130, 246, 0)",
          "0 0 20px rgba(59, 130, 246, 0.5)",
          "0 0 40px rgba(59, 130, 246, 0.3)",
        ],
      }}
      transition={{ duration: 0.3 }}
    />
    <div className="relative z-10">
      {children}
    </div>
  </motion.div>
);

// 3D tilt hover effect
export const TiltHover = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.div
    className={`relative perspective-1000 ${className}`}
    whileHover={{
      rotateX: [0, 5, -5, 0],
      rotateY: [0, -5, 5, 0],
    }}
    transition={{ duration: 0.6, repeat: Infinity }}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      whileHover={{
        scale: [1, 1.1, 1],
      }}
      transition={{ duration: 0.8, repeat: Infinity }}
    />
    <div className="relative z-10 transform-style-preserve-3d">
      {children}
    </div>
  </motion.div>
);

// Pulse hover effect
export const PulseHover = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.div
    className={`relative ${className}`}
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.2 }}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-lg"
      initial={{ scale: 1, opacity: 0 }}
      whileHover={{
        scale: [1, 1.2, 1],
        opacity: [0, 0.5, 0],
      }}
      transition={{ duration: 1, repeat: Infinity }}
    />
    <div className="relative z-10">
      {children}
    </div>
  </motion.div>
);

// Shimmer hover effect
export const ShimmerHover = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.div
    className={`relative overflow-hidden ${className}`}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
      initial={{ x: "-100%" }}
      whileHover={{ x: "100%" }}
      transition={{ duration: 0.6 }}
    />
    <div className="relative z-10">
      {children}
    </div>
  </motion.div>
);

// Border animation hover effect
export const BorderAnimationHover = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <motion.div
    className={`relative ${className}`}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <motion.div
      className="absolute inset-0 border-2 border-transparent rounded-lg"
      whileHover={{
        borderColor: ["transparent", "hsl(var(--p))", "hsl(var(--s))", "transparent"],
      }}
      transition={{ duration: 0.8, repeat: Infinity }}
    />
    <div className="relative z-10">
      {children}
    </div>
  </motion.div>
);

export default {
  GlowingHover,
  MagneticHover,
  FloatingHover,
  RippleHover,
  NeonGlowHover,
  TiltHover,
  PulseHover,
  ShimmerHover,
  BorderAnimationHover,
}; 