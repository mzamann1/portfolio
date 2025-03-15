// src/components/Navbar.tsx
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = ['Home', 'About', 'Skills', 'Projects', 'Carrier', 'Contact'];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled
                    ? 'glass-morphism shadow-glass'
                    : 'bg-transparent'
                }`}
        >
            <div className="container py-4">
                <div className="flex items-center justify-between">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="text-2xl font-bold text-gradient-animated"
                    >
                        Muhammad Zaman
                    </motion.div>
                    <div className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item}
                                to={item.toLowerCase()}
                                smooth={true}
                                duration={500}
                                spy={true}
                                activeClass="active"
                                onSetActive={() => setActiveSection(item.toLowerCase())}
                                className="cursor-pointer relative group"
                            >
                                <span className={`transition-colors duration-300 ${activeSection === item.toLowerCase()
                                        ? 'text-light-accent dark:text-dark-accent'
                                        : 'text-light-text dark:text-dark-text group-hover:text-light-accent dark:group-hover:text-dark-accent'
                                    }`}>
                                    {item}
                                </span>
                                <span className={`absolute -bottom-1 left-0 h-0.5 bg-light-accent dark:bg-dark-accent transition-all duration-300 ${activeSection === item.toLowerCase() ? 'w-full' : 'w-0 group-hover:w-full'
                                    }`} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;