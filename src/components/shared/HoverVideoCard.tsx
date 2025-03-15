// src/components/HoverVideoCard.tsx
import { motion } from 'framer-motion';
import { useState } from 'react';

interface HoverVideoCardProps {
    title: string;
    description: string;
    videoSrc: string;
    posterSrc: string;
    tags: string[];
    links: { github?: string; live?: string };
}

const HoverVideoCard = ({
    title,
    description,
    videoSrc,
    posterSrc,
    tags,
    links
}: HoverVideoCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="shadow-glass hover:shadow-glass-hover rounded-2xl overflow-hidden bg-white/10 dark:bg-black/10 backdrop-blur-lg border border-white/20 dark:border-white/10 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <div className="relative h-64 overflow-hidden">
                {isHovered ? (
                    <video
                        className="w-full h-full object-cover"
                        src={videoSrc}
                        autoPlay
                        muted
                        loop
                    />
                ) : (
                    <img
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        src={posterSrc}
                        alt={title}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="absolute bottom-0 left-0 p-6 w-full"
                >
                    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 text-xs rounded-full bg-white/20 backdrop-blur-sm text-white"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
            <div className="p-6">
                <p className="text-light-textSecondary dark:text-dark-textSecondary mb-4">
                    {description}
                </p>
                <div className="flex space-x-4">
                    {links.github && (
                        <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            href={links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-lg bg-white/10 dark:bg-black/10 backdrop-blur-sm hover:bg-white/20 dark:hover:bg-black/20 transition-colors"
                        >
                            View Code
                        </motion.a>
                    )}
                    {links.live && (
                        <motion.a
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            href={links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-lg bg-light-accent/80 dark:bg-dark-accent/80 text-white backdrop-blur-sm hover:bg-light-accent dark:hover:bg-dark-accent transition-colors"
                        >
                            Live Demo
                        </motion.a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default HoverVideoCard;