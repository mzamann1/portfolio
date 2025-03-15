import { motion } from 'framer-motion';
import { createElement, ReactNode } from 'react';
import { IconType } from 'react-icons/lib';

export interface TimelineItemProps {
  date: string;
  title: string;
  subtitle: string;
  description: string | ReactNode;
  icon?: IconType;
  isCurrent?: boolean;
}

const TimelineItem = ({
  date,
  title,
  subtitle,
  description,
  icon,
  isCurrent = false,
}: TimelineItemProps) => {
  return (
    <motion.div
      className="flex gap-4 md:gap-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Timeline line and dot */}
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-light-accent dark:bg-dark-accent text-white z-10">
          {icon ? createElement(icon) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        {!isCurrent && <div className="w-0.5 h-full bg-light-accent/30 dark:bg-dark-accent/30 mt-2"></div>}
      </div>

      {/* Content */}
      <div className="pb-8">
        <span className="text-sm font-medium text-light-accent dark:text-dark-accent">{date}</span>
        <h3 className="text-xl font-bold mt-1">{title}</h3>
        {subtitle && <h4 className="text-light-textSecondary dark:text-dark-textSecondary font-medium">{subtitle}</h4>}
        <div className="mt-3 text-light-textSecondary dark:text-dark-textSecondary">
          {typeof description === 'string' ? description : <div>
            <p>Developed and maintained multiple client websites and web applications.</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Built interactive UIs with React and TypeScript</li>
              <li>Collaborated with designers to implement pixel-perfect layouts</li>
              <li>Integrated RESTful APIs and implemented state management</li>
            </ul>
          </div>}
        </div>
      </div>
    </motion.div>
  );
};

interface TimelineProps {
  items: TimelineItemProps[];
  className?: string;
}

const Timeline = ({ items, className = '' }: TimelineProps) => {
  return (
    <div className={`${className}`}>
      {items.map((item, index) => (
        <TimelineItem
          key={`${item.title}-${index}`}
          {...item}
          isCurrent={item.isCurrent || false}
        />
      ))}
    </div>
  );
};

export default Timeline; 