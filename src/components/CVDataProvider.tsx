import { ReactNode, createContext, useContext } from 'react';
import { useAppSelector } from '../store/hooks';
import {
  selectPersonalInfo,
  selectWorkExperience,
  selectEducation,
  selectCertifications,
  selectTechnicalSkills,
  selectProjects,
} from '../store/selectors/cvSelectors';
import { ICVDataInterface } from '../types';

// Create a context for CV data
const CVDataContext = createContext<Partial<ICVDataInterface>>({});

interface CVDataProviderProps {
  children: ReactNode;
}

export const CVDataProvider = ({ children }: CVDataProviderProps) => {
  // Select all the CV data from Redux
  const personalInfo = useAppSelector(selectPersonalInfo);
  const workExperience = useAppSelector(selectWorkExperience);
  const education = useAppSelector(selectEducation);
  const certifications = useAppSelector(selectCertifications);
  const technicalSkills = useAppSelector(selectTechnicalSkills);
  const projects = useAppSelector(selectProjects);

  // Combine all data
  const cvData = {
    personalInfo,
    carrierJourney: {
      workExperiences: workExperience,
      education,
      certifications,
    },
    skills: technicalSkills,
    projects,
  };


  return (
    <CVDataContext.Provider value={cvData}>
      {children}
    </CVDataContext.Provider>
  );
}

// Custom hook to use CV data
export const useCVData = () => {
  const context = useContext(CVDataContext);
  if (context === undefined) {
    throw new Error('useCVData must be used within a CVDataProvider');
  }
  return context;
}; 
