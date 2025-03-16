// src/components/CustomCursor.tsx
import { motion, useMotionValue, useSpring, MotionStyle } from 'framer-motion';
import { useEffect, useState, useCallback, memo, FC } from 'react';
import { useTheme } from '../../hooks/useTheme';

// Define types for better maintainability
interface CursorState {
    isHovering: boolean;
    isClicking: boolean;
    isVisible: boolean;
}

// Spring configuration constants
const INNER_SPRING_CONFIG = { damping: 28, stiffness: 750, mass: 0.5 };
const OUTER_SPRING_CONFIG = { damping: 20, stiffness: 400, mass: 0.8 };

// Interactive elements selector
const INTERACTIVE_ELEMENTS = 'a, button, input, textarea, [role="button"], .interactive';

// Color configurations
interface ColorConfig {
    dot: {
        hover: string;
        default: string;
    };
    ring: {
        hover: string;
        default: string;
    };
}

const LIGHT_COLORS: ColorConfig = {
    dot: {
        hover: 'rgba(255, 255, 255, 0.9)',
        default: 'rgba(79, 70, 229, 0.8)'
    },
    ring: {
        hover: 'rgba(79, 70, 229, 0.4)',
        default: 'rgba(79, 70, 229, 0.2)'
    }
};

const DARK_COLORS: ColorConfig = {
    dot: {
        hover: 'rgba(255, 255, 255, 0.9)',
        default: 'rgba(138, 180, 248, 0.8)'
    },
    ring: {
        hover: 'rgba(138, 180, 248, 0.4)',
        default: 'rgba(138, 180, 248, 0.2)'
    }
};

const CustomCursor: FC = () => {
    // State management
    const [cursorState, setCursorState] = useState<CursorState>({
        isHovering: false,
        isClicking: false,
        isVisible: false
    });
    
    // Theme
    const { isDarkMode } = useTheme();
    
    // Motion values
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    
    // Springs
    const cursorXSpring = useSpring(cursorX, INNER_SPRING_CONFIG);
    const cursorYSpring = useSpring(cursorY, INNER_SPRING_CONFIG);
    const outerCursorXSpring = useSpring(cursorX, OUTER_SPRING_CONFIG);
    const outerCursorYSpring = useSpring(cursorY, OUTER_SPRING_CONFIG);

    // Event handlers
    const handleMouseMove = useCallback((e: MouseEvent) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
    }, [cursorX, cursorY]);

    const handleMouseEnter = useCallback(() => {
        setCursorState(prev => ({ ...prev, isHovering: true }));
    }, []);

    const handleMouseLeave = useCallback(() => {
        setCursorState(prev => ({ ...prev, isHovering: false }));
    }, []);

    const handleMouseDown = useCallback(() => {
        setCursorState(prev => ({ ...prev, isClicking: true }));
    }, []);

    const handleMouseUp = useCallback(() => {
        setCursorState(prev => ({ ...prev, isClicking: false }));
    }, []);

    // Setup and cleanup effects
    useEffect(() => {
        // Client-side only code
        if (typeof window === 'undefined') return;

        // Short delay before showing cursor to prevent initial position jump
        const timer = setTimeout(() => {
            setCursorState(prev => ({ ...prev, isVisible: true }));
        }, 500);

        // Add event listeners
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        
        // Target interactive elements
        const interactiveElements = document.querySelectorAll(INTERACTIVE_ELEMENTS);
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        // Cleanup function
        return () => {
            clearTimeout(timer);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseEnter, handleMouseLeave]);

    // Get theme-aware colors
    const colors = isDarkMode ? DARK_COLORS : LIGHT_COLORS;
    
    // Don't render anything until visible
    if (!cursorState.isVisible) return null;

    // Styles for inner dot
    const innerDotStyle: MotionStyle = {
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
        backgroundColor: cursorState.isHovering ? colors.dot.hover : colors.dot.default,
        width: cursorState.isHovering ? '12px' : '8px',
        height: cursorState.isHovering ? '12px' : '8px',
        borderRadius: '50%',
        filter: 'blur(0.5px)',
        opacity: cursorState.isVisible ? 1 : 0,
        transition: 'width 0.2s, height 0.2s, background-color 0.3s',
        scale: cursorState.isClicking ? 0.7 : 1,
    };

    // Styles for outer ring
    const outerRingStyle: MotionStyle = {
        x: outerCursorXSpring,
        y: outerCursorYSpring,
        translateX: '-50%',
        translateY: '-50%',
        border: `1px solid ${cursorState.isHovering ? colors.ring.hover : colors.ring.default}`,
        width: cursorState.isHovering ? '36px' : '24px',
        height: cursorState.isHovering ? '36px' : '24px',
        borderRadius: '50%',
        opacity: cursorState.isVisible ? 1 : 0,
        transition: 'width 0.3s, height 0.3s, border-color 0.3s',
        scale: cursorState.isClicking ? 0.9 : 1,
    };

    return (
        <>
            {/* Inner dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
                style={innerDotStyle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            />

            {/* Outer ring */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-50"
                style={outerRingStyle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            />
        </>
    );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(CustomCursor);