import { FaBriefcase, FaGraduationCap, FaAward } from 'react-icons/fa';
import { IWorkExperience, IEducation, ICertifications } from '../types';
import { TimelineItemProps } from '../components/shared/Timeline';
// Map work experience to timeline items
export const mapWorkExperienceToTimelineItemProps = (
    workExperience: IWorkExperience[]
): TimelineItemProps[] => {
    return workExperience.map((job) => ({
        date: job.to === null
            ? `${job.from} - Present`
            : `${job.from} - ${job.to}`,
        title: job.title,
        subtitle: job.companyName,
        description: job.description,
        icon: FaBriefcase,
        isCurrent: job.isCurrent || false,
    }));
};

// Map education to timeline items
export const mapEducationToTimelineItemProps = (
    education: IEducation[]
): TimelineItemProps[] => {
    return education.map((edu) => ({
        date: `${edu.year}`,
        title: edu.title,
        subtitle: edu.instituteName,
        description: edu.description,
        icon: FaGraduationCap,
        isCurrent: !edu.isCompleted,
    }));
};

// Map certifications/achievements to timeline items
export const mapAchievementsToTimelineItemProps = (
    certifications: ICertifications[]
): TimelineItemProps[] => {
    return certifications.map((cert) => ({
        date: `${cert.year}`,
        title: cert.title,
        subtitle: cert.issuer,
        description: cert.description,
        icon: FaAward,
        isCurrent: false,
    }));
};
