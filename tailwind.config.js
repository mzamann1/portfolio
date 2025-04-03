/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Enable dark mode
    theme: {
        extend: {
            colors: {
                // Light theme colors
                light: {
                    primary: "#ffffff", // Pure white background
                    secondary: "#f3f4f6", // Light gray for contrast
                    accent: "#3b82f6", // Blue 500 - Vibrant blue for accents
                    text: "#1f2937", // Slate 800 - Dark text for readability
                    textSecondary: "#4b5563", // Slate 600 - Secondary text
                },
                // Dark theme colors
                dark: {
                    primary: "#0a192f",
                    secondary: "#112240",
                    accent: "#64ffda",
                    text: "#ccd6f6",
                    textSecondary: "#8892b0",
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                'glass-hover': '0 8px 32px 0 rgba(31, 38, 135, 0.47)',
                'glow': '0 0 15px rgba(59, 130, 246, 0.5)',
              },
              animation: {
                'gradient': 'gradient 8s linear infinite',
                'float': 'float 6s ease-in-out infinite',
                'shine': 'shine 2s linear infinite',
                'text-reveal': 'text-reveal 0.5s ease-out forwards',
                'slide-up': 'slide-up 0.5s ease-out forwards',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'bounce-slow': 'bounce 3s infinite',
              },
              keyframes: {
                gradient: {
                  '0%, 100%': {
                    'background-size': '200% 200%',
                    'background-position': 'left center'
                  },
                  '50%': {
                    'background-size': '200% 200%',
                    'background-position': 'right center'
                  },
                },
                float: {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(-20px)' },
                },
                shine: {
                  '0%': { transform: 'translateX(-100%)' },
                  '100%': { transform: 'translateX(100%)' },
                },
                'text-reveal': {
                  '0%': { clipPath: 'inset(0 0 100% 0)' },
                  '100%': { clipPath: 'inset(0 0 0% 0)' },
                },
                'slide-up': {
                  '0%': { transform: 'translateY(100%)', opacity: 0 },
                  '100%': { transform: 'translateY(0)', opacity: 1 },
                },
                'pulse-slow': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: .5 },
                },
                'bounce-slow': {
                  '0%, 100%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
                  '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
                },
              },
              backdropBlur: {
                xs: '2px',
              },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
    ],
    // Add RTL support
    future: {
        hoverOnlyWhenSupported: true,
    },
    // Add RTL variants
    variants: {
        extend: {
            margin: ['rtl', 'ltr'],
            padding: ['rtl', 'ltr'],
            textAlign: ['rtl', 'ltr'],
        },
    },
}