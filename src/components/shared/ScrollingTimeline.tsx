// src/components/ScrollingTimeline.tsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface TimelineItem {
    year: string;
    title: string;
    description: string;
    company?: string;
}

interface ScrollingTimelineProps {
    items: TimelineItem[];
    className?: string;
}

const ScrollingTimeline = ({ items, className = '' }: ScrollingTimelineProps) => {
    return (
        <div className={`relative ${className}`}>
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-light-accent/20 dark:bg-dark-accent/20 transform md:translate-x-px" />

            {/* Timeline items */}
            <div className="relative">
                {items.map((item, index) => {
                    const [ref, inView] = useInView({
                        triggerOnce: true,
                        threshold: 0.1,
                    });

                    const isEven = index % 2 === 0;

                    return (
                        <motion.div
                            ref={ref}
                            key={index}
                            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`relative flex md:items-center mb-12 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                                }`}
                        >
                            {/* Year bubble */}
                            <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-light-accent dark:bg-dark-accent rounded-full transform -translate-x-1/2 flex items-center justify-center z-10">
                                <span className="text-white text-xs font-bold">{item.year}</span>
                            </div>

                            {/* Content */}
                            <div className={`ml-12 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'
                                }`}>
                                <div className="glass-morphism p-6 rounded-lg">
                                    <h3 className="text-xl font-bold text-light-text dark:text-dark-text">{item.title}</h3>
                                    {item.company && (
                                        <p className="text-light-accent dark:text-dark-accent font-medium mb-2">{item.company}</p>
                                    )}
                                    <p className="text-light-textSecondary dark:text-dark-textSecondary">{item.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default ScrollingTimeline;