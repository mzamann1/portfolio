// src/components/Navbar.tsx
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-scroll';
import { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX, FiHome, FiUser, FiCode, FiBriefcase, FiAward, FiMail } from 'react-icons/fi';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
    const navRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Handle mouse movement for hover effects
    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top } = e.currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
 
    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (mobileMenuOpen && !target.closest('.mobile-menu-container')) {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [mobileMenuOpen]);

    // Update indicator position when active section changes
    useEffect(() => {
        if (navRef.current) {
            const activeElement = navRef.current.querySelector(`.nav-item-${activeSection}`);
            if (activeElement) {
                const { offsetLeft, offsetWidth } = activeElement as HTMLElement;
                setIndicatorStyle({
                    left: offsetLeft,
                    width: offsetWidth,
                });
            }
        }
    }, [activeSection, scrolled]);

    // Map icons to nav items
    const navIcons = {
        'home': <FiHome className="mr-2" />,
        'about': <FiUser className="mr-2" />,
        'skills': <FiCode className="mr-2" />,
        'projects': <FiBriefcase className="mr-2" />,
        'carrier': <FiAward className="mr-2" />,
        'contact': <FiMail className="mr-2" />
    };

    const navItems = ['Home', 'About', 'Skills', 'Projects', 'Carrier', 'Contact'];
    
    // Spring animation for the indicator
    const springLeft = useSpring(indicatorStyle.left, { stiffness: 300, damping: 30 });
    const springWidth = useSpring(indicatorStyle.width, { stiffness: 300, damping: 30 });

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className={`fixed w-full z-50 transition-all duration-500 ${
                scrolled ? 'py-2' : 'py-4'
            }`}
        >
            <div 
                className={`mx-auto px-6 rounded-full transition-all duration-500 backdrop-blur-md ${
                    scrolled
                        ? 'glass-morphism shadow-glass mx-4 sm:mx-8 md:mx-12 lg:mx-auto max-w-7xl border border-white/10 dark:border-white/5'
                        : 'bg-white/5 dark:bg-black/5 max-w-7xl mx-auto'
                }`}
                onMouseMove={handleMouseMove}
            >
                <div className="flex items-center justify-between py-2 relative">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        className="text-2xl font-bold relative overflow-hidden group"
                    >
                        <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-light-accent via-blue-500 to-purple-500 dark:from-dark-accent dark:via-teal-400 dark:to-blue-400">
                            Muhammad Zaman
                        </span>
                        <motion.div 
                            className="absolute inset-0 bg-light-accent/10 dark:bg-dark-accent/10 rounded-full -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        />
                    </motion.div>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8 relative items-center" ref={navRef}>
                        {/* Floating Indicator */}
                        <motion.div 
                            className="absolute h-1 -bottom-2 bg-gradient-to-r from-light-accent to-blue-500 dark:from-dark-accent dark:to-blue-400 rounded-full"
                            style={{ 
                                left: springLeft,
                                width: springWidth,
                                filter: 'blur(0.5px)'
                            }}
                        />
                        
                        {navItems.map((item) => (
                            <Link
                                key={item}
                                to={item.toLowerCase()}
                                smooth={true}
                                duration={500}
                                spy={true}
                                activeClass="active"
                                onSetActive={() => setActiveSection(item.toLowerCase())}
                                className={`cursor-pointer relative group nav-item-${item.toLowerCase()}`}
                            >
                                <motion.div 
                                    className={`transition-all duration-300 inline-flex items-center py-2 px-3 rounded-full ${
                                        activeSection === item.toLowerCase()
                                            ? 'text-light-accent dark:text-dark-accent'
                                            : 'text-light-text dark:text-dark-text group-hover:text-light-accent dark:group-hover:text-dark-accent'
                                    }`}
                                    whileHover={{ 
                                        y: -2,
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)'
                                    }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    {navIcons[item.toLowerCase() as keyof typeof navIcons]}
                                    {item}
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                    
                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-3 rounded-full bg-light-secondary/30 dark:bg-dark-secondary/30 text-light-text dark:text-dark-text focus:outline-none hover:shadow-glow transition-all duration-300"
                            aria-label="Toggle menu"
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={mobileMenuOpen ? 'close' : 'menu'}
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
                                </motion.div>
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </div>
            
            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden mobile-menu-container"
                    >
                        <motion.div 
                            className="glass-morphism shadow-glass mx-4 mt-2 rounded-2xl overflow-hidden border border-white/10 dark:border-white/5 backdrop-blur-md"
                            variants={{
                                hidden: { opacity: 0 },
                                show: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.05
                                    }
                                }
                            }}
                            initial="hidden"
                            animate="show"
                        >
                            <div className="py-4 px-4 flex flex-col space-y-1">
                                {navItems.map((item, index) => (
                                    <Link
                                        key={item}
                                        to={item.toLowerCase()}
                                        smooth={true}
                                        duration={500}
                                        spy={true}
                                        activeClass="active"
                                        onSetActive={() => setActiveSection(item.toLowerCase())}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <motion.div
                                            variants={{
                                                hidden: { x: -20, opacity: 0 },
                                                show: { x: 0, opacity: 1 }
                                            }}
                                            whileHover={{ x: 5 }}
                                            transition={{ type: 'spring', stiffness: 300 }}
                                            className={`cursor-pointer py-3 px-4 rounded-xl transition-all duration-200 flex items-center ${
                                                activeSection === item.toLowerCase()
                                                    ? 'bg-gradient-to-r from-light-accent/10 to-blue-500/10 dark:from-dark-accent/10 dark:to-blue-400/10 text-light-accent dark:text-dark-accent font-medium'
                                                    : 'hover:bg-light-secondary/50 dark:hover:bg-dark-secondary/50 text-light-text dark:text-dark-text'
                                            }`}
                                        >
                                            <span className="mr-3 text-xl">
                                                {navIcons[item.toLowerCase() as keyof typeof navIcons]}
                                            </span>
                                            <span className="block">
                                                {item}
                                            </span>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;