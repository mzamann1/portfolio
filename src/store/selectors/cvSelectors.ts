import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { IWorkExperience, IEducation, IProject, ISkill } from '../../types';

// Base selectors
export const selectCV = (state: RootState) => state.cv;
export const selectPersonalInfo = (state: RootState) => state.cv.personalInfo;
export const selectWorkExperience = (state: RootState) => state.cv.carrierJourney.workExperiences;
export const selectEducation = (state: RootState) => state.cv.carrierJourney.education;
export const selectCertifications = (state: RootState) => state.cv.carrierJourney.certifications;
export const selectSkills = (state: RootState) => state.cv.skills;
export const selectProjects = (state: RootState) => state.cv.projects;

// Derived selectors
export const selectCurrentJob = createSelector(
    [selectWorkExperience],
    (workExperience): IWorkExperience | undefined =>
        workExperience.find(job => job.isCurrent)
);

export const selectFeaturedProjects = createSelector(
    [selectProjects],
    (projects): IProject[] =>
        projects.filter(project => project.featured)
);

export const selectTechnicalSkills = createSelector(
    [selectSkills],
    (skills): ISkill[] => skills
);


export const selectCompletedEducation = createSelector(
    [selectEducation],
    (education): IEducation[] =>
        education.filter(edu => edu.isCompleted)
);

// Selectors with parameters
export const selectWorkExperienceByYear = (year: number) =>
    createSelector(
        [selectWorkExperience],
        (workExperience): IWorkExperience[] =>
            workExperience.filter(job => job.from <= year && (job.to === null || job.to! >= year))
    );

export const selectProjectsByTechnology = (technology: string) =>
    createSelector(
        [selectProjects],
        (projects): IProject[] =>
            projects.filter(project => project.technologies?.includes(technology))
    );

    export const selectProjectsByTitle = (title: string) =>
        createSelector(
            [selectProjects],
            (projects): IProject[] =>
                projects.filter(project => project.title?.includes(title))
        );

export const selectSkillsByLevel = (minLevel: string) =>
    createSelector(
        [selectTechnicalSkills],
        (skills): ISkill[] =>
            skills.filter(skill => skill.level === minLevel)
    );

// Utility selectors
export const selectAllTechnologies = createSelector(
    [selectWorkExperience, selectProjects],
    (workExperience, projects): string[] => {
        const techSet = new Set<string>();

        // Add technologies from work experience
        workExperience.forEach(job => {
            if (job.technologies) {
                job.technologies.forEach(tech => techSet.add(tech));
            }
        });

        // Add technologies from projects
        projects.forEach(project => {
            project.technologies?.forEach(tech => techSet.add(tech));
        });

        return Array.from(techSet).sort();
    }
);

export const selectYearsOfExperience = createSelector(
    [selectWorkExperience],
    (workExperience): number => {
        let totalMonths = 0;
        const currentYear = new Date().getFullYear();

        workExperience.forEach(job => {
            const startYear = job.from;
            const endYear = job.to === null ? currentYear : job.to;
            if (endYear !== undefined && startYear !== undefined) {
                // Simple calculation: 12 months per year
                const months = (endYear - startYear) * 12;
                totalMonths += months;
            }
        });

        // Convert months to years (rounded to 1 decimal place)
        return Math.round((totalMonths / 12) * 10) / 10;
    }
); 