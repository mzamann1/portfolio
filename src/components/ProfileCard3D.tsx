import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { useHeroData } from '../hooks/usePortfolioData';
import styles from './ProfileCard3D.module.css';

// Theme-agnostic gradient creation using CSS custom properties with fallbacks
const createThemeGradients = () => {
  // Use CSS custom properties with fallback values
  return {
    behind: `radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y), hsl(var(--p, 265 89% 78%) / 0.9) 4%, hsl(var(--p, 265 89% 78%) / 0.75) 10%, hsl(var(--p, 265 89% 78%) / 0.5) 50%, hsl(var(--p, 265 89% 78%) / 0) 100%), radial-gradient(35% 52% at 55% 20%, hsl(var(--s, 191 97% 77%) / 0.8) 0%, hsl(var(--s, 191 97% 77%) / 0) 100%), radial-gradient(100% 100% at 50% 50%, hsl(var(--a, 326 100% 74%) / 0.8) 1%, hsl(var(--a, 326 100% 74%) / 0) 76%), conic-gradient(from 124deg at 50% 50%, hsl(var(--p, 265 89% 78%) / 0.8) 0%, hsl(var(--s, 191 97% 77%) / 0.8) 40%, hsl(var(--s, 191 97% 77%) / 0.8) 60%, hsl(var(--p, 265 89% 78%) / 0.8) 100%)`,
    inner: `linear-gradient(145deg, hsl(var(--p, 265 89% 78%) / 0.3) 0%, hsl(var(--s, 191 97% 77%) / 0.3) 100%)`
  };
};

const ANIMATION_CONFIG = {
  SMOOTH_DURATION: 600,
  INITIAL_DURATION: 1500,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
} as const;

const clamp = (value: number, min = 0, max = 100): number =>
  Math.min(Math.max(value, min), max);

const round = (value: number, precision = 3): number =>
  parseFloat(value.toFixed(precision));

const adjust = (
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
): number =>
  round(toMin + ((toMax - fromMin) * (value - fromMin)) / (fromMax - fromMin));

const easeInOutCubic = (x: number): number =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

const ProfileCard3D: React.FC = () => {
  const { data: hero, loading } = useHeroData();
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Animation handlers
  const animationHandlers = useMemo(() => {
    let rafId: number | null = null;
    const updateCardTransform = (
      offsetX: number,
      offsetY: number,
      card: HTMLElement,
      wrap: HTMLElement
    ) => {
      const width = card.clientWidth;
      const height = card.clientHeight;
      const percentX = clamp((100 / width) * offsetX);
      const percentY = clamp((100 / height) * offsetY);
      const centerX = percentX - 50;
      const centerY = percentY - 50;
      const properties = {
        "--pointer-x": `${percentX}%`,
        "--pointer-y": `${percentY}%`,
        "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
        "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
        "--pointer-from-center": `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        "--pointer-from-top": `${percentY / 100}`,
        "--pointer-from-left": `${percentX / 100}`,
        "--rotate-x": `${round(-(centerX / 5))}deg`,
        "--rotate-y": `${round(centerY / 4)}deg`,
        "--card-opacity": "1",
      } as Record<string, string>;
      Object.entries(properties).forEach(([property, value]) => {
        wrap.style.setProperty(property, value);
      });
    };
    const createSmoothAnimation = (
      duration: number,
      startX: number,
      startY: number,
      card: HTMLElement,
      wrap: HTMLElement
    ) => {
      const startTime = performance.now();
      const targetX = wrap.clientWidth / 2;
      const targetY = wrap.clientHeight / 2;
      const animationLoop = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = clamp(elapsed / duration);
        const easedProgress = easeInOutCubic(progress);
        const currentX = adjust(easedProgress, 0, 1, startX, targetX);
        const currentY = adjust(easedProgress, 0, 1, startY, targetY);
        updateCardTransform(currentX, currentY, card, wrap);
        if (progress < 1) {
          rafId = requestAnimationFrame(animationLoop);
        } else {
          // Reset to center when animation completes
          wrap.style.setProperty("--card-opacity", "0");
          wrap.style.setProperty("--rotate-x", "0deg");
          wrap.style.setProperty("--rotate-y", "0deg");
        }
      };
      rafId = requestAnimationFrame(animationLoop);
    };
    return {
      updateCardTransform,
      createSmoothAnimation,
      cancelAnimation: () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
    };
  }, []);

  // Pointer event handlers
  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;
      if (!card || !wrap || !animationHandlers) return;
      const rect = card.getBoundingClientRect();
      animationHandlers.updateCardTransform(
        event.clientX - rect.left,
        event.clientY - rect.top,
        card,
        wrap
      );
    },
    [animationHandlers]
  );
  const handlePointerEnter = useCallback(() => {
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap || !animationHandlers) return;
    animationHandlers.cancelAnimation();
    wrap.classList.add(styles.active);
    card.classList.add(styles.active);
  }, [animationHandlers]);
  const handlePointerLeave = useCallback(
    (event: PointerEvent) => {
      const card = cardRef.current;
      const wrap = wrapRef.current;
      if (!card || !wrap || !animationHandlers) return;
      animationHandlers.createSmoothAnimation(
        ANIMATION_CONFIG.SMOOTH_DURATION,
        event.offsetX,
        event.offsetY,
        card,
        wrap
      );
      wrap.classList.remove(styles.active);
      card.classList.remove(styles.active);
    },
    [animationHandlers]
  );

  // Theme-agnostic gradients using DaisyUI CSS custom properties with fallbacks
  const cardStyle = useMemo(() => {
    const gradients = createThemeGradients();
    return {
      "--behind-gradient": gradients.behind,
      "--inner-gradient": gradients.inner,
    } as React.CSSProperties;
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap) return;
    
    // Add event listeners
    card.addEventListener("pointerenter", handlePointerEnter as EventListener);
    card.addEventListener("pointermove", handlePointerMove as EventListener);
    card.addEventListener("pointerleave", handlePointerLeave as EventListener);
    
    // Set initial position
    const initialX = wrap.clientWidth - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
    animationHandlers.updateCardTransform(initialX, initialY, card, wrap);
    
    // Create initial animation
    animationHandlers.createSmoothAnimation(
      ANIMATION_CONFIG.INITIAL_DURATION,
      initialX,
      initialY,
      card,
      wrap
    );
    
    return () => {
      card.removeEventListener("pointerenter", handlePointerEnter as EventListener);
      card.removeEventListener("pointermove", handlePointerMove as EventListener);
      card.removeEventListener("pointerleave", handlePointerLeave as EventListener);
      animationHandlers.cancelAnimation();
    };
  }, [animationHandlers, handlePointerMove, handlePointerEnter, handlePointerLeave]);

  // Fallbacks for loading
  if (loading || !hero) return <div className="w-full flex justify-center items-center py-12"><span className="loading loading-spinner loading-lg text-primary" /></div>;
  const { profileCard } = hero;

  return (
    <div
      ref={wrapRef}
      className={styles.pcCardWrapper}
      style={cardStyle}
    >
      <section ref={cardRef} className={styles.pcCard}>
        <div className={styles.pcInside}>
          <div className={styles.pcShine} />
          <div className={styles.pcGlare} />
          <div className={`${styles.pcContent} ${styles.pcAvatarContent}`}>
            <img
              className={styles.avatar}
              src={profileCard.avatar || '/avatar.png'}
              alt={`${profileCard.name || "User"} avatar`}
              loading="lazy"
            />
            <div className={styles.pcUserInfo}>
              <div className={styles.pcUserDetails}>
                <div className={styles.pcMiniAvatar}>
                  <img
                    src={profileCard.avatar || '/avatar.png'}
                    alt={`${profileCard.name || "User"} mini avatar`}
                    loading="lazy"
                  />
                </div>
                <div className={styles.pcUserText}>
                  <div className={styles.pcHandle}>@{profileCard.name?.toLowerCase() || 'user'}</div>
                  <div className={styles.pcStatus}>Online</div>
                </div>
              </div>
              <button
                className={styles.pcContactBtn}
                onClick={() => window.location.href = '#contact'}
                style={{ pointerEvents: "auto" }}
                type="button"
                aria-label={`Contact ${profileCard.name || "user"}`}
              >
                Contact Me
              </button>
            </div>
          </div>
          <div className={styles.pcContent}>
            <div className={styles.pcDetails}>
              <h3>{profileCard.name}</h3>
              <p>{profileCard.title}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileCard3D; 