# Redux Store for CV Data

This directory contains the Redux store implementation for managing CV data in the portfolio application.

## Structure

- `index.ts`: Configures the Redux store and exports types
- `hooks.ts`: Custom hooks for using Redux with TypeScript
- `slices/`: Contains Redux Toolkit slices
  - `cvSlice.ts`: Manages CV data state and actions
- `selectors/`: Contains selector functions
  - `cvSelectors.ts`: Selectors for accessing CV data

## Usage

### Accessing CV Data

Use the `useAppSelector` hook with selectors to access CV data:

```tsx
import { useAppSelector } from '../store/hooks';
import { selectPersonalInfo, selectWorkExperience } from '../store/selectors/cvSelectors';

const MyComponent = () => {
  const personalInfo = useAppSelector(selectPersonalInfo);
  const workExperience = useAppSelector(selectWorkExperience);
  
  return (
    <div>
      <h1>{personalInfo.name}</h1>
      <p>{personalInfo.title}</p>
      
      {workExperience.map((job, index) => (
        <div key={index}>
          <h2>{job.title}</h2>
          <p>{job.companyName}</p>
        </div>
      ))}
    </div>
  );
};
```

### Updating CV Data

Use the `useAppDispatch` hook with action creators to update CV data:

```tsx
import { useAppDispatch } from '../store/hooks';
import { updatePersonalInfo, addWorkExperience } from '../store/slices/cvSlice';

const CVEditor = () => {
  const dispatch = useAppDispatch();
  
  const handleUpdateName = () => {
    dispatch(updatePersonalInfo({
      name: 'New Name'
    }));
  };
  
  const handleAddJob = () => {
    dispatch(addWorkExperience({
      from: 2023,
      to: 2025,
      title: 'New Position',
      companyName: 'New Company',
      description: 'Description of the new position',
      technologies: ['React', 'TypeScript'],
      isCurrent: true
    }));
  };
  
  return (
    <div>
      <button onClick={handleUpdateName}>Update Name</button>
      <button onClick={handleAddJob}>Add Job</button>
    </div>
  );
};
```

### Available Actions

- **Personal Info**: `updatePersonalInfo`
- **Work Experience**: `addWorkExperience`, `updateWorkExperience`, `removeWorkExperience`
- **Education**: `addEducation`, `updateEducation`, `removeEducation`
- **Certifications**: `addCertification`, `updateCertification`, `removeCertification`
- **Skills**:
  - Technical: `addTechnicalSkill`, `updateTechnicalSkill`, `removeTechnicalSkill`
  - Soft Skills: `addSoftSkill`, `updateSoftSkill`, `removeSoftSkill`
  - Languages: `addLanguage`, `updateLanguage`, `removeLanguage`
- **Projects**: `addProject`, `updateProject`, `removeProject`, `toggleProjectFeatured`

### Available Selectors

- **Basic Selectors**: `selectPersonalInfo`, `selectWorkExperience`, `selectEducation`, `selectCertifications`, `selectSkills`, `selectProjects`
- **Derived Selectors**:
  - `selectCurrentJob`: Gets the current job (where `isCurrent` is true)
  - `selectFeaturedProjects`: Gets projects marked as featured
  - `selectTechnicalSkills`, `selectSoftSkills`, `selectLanguages`: Gets specific skill categories
  - `selectCompletedEducation`: Gets completed education items
- **Parameterized Selectors**:
  - `selectWorkExperienceByYear(year)`: Gets work experience for a specific year
  - `selectProjectsByTechnology(technology)`: Gets projects using a specific technology
  - `selectSkillsByLevel(minLevel)`: Gets technical skills with a minimum level
- **Utility Selectors**:
  - `selectAllTechnologies`: Gets a unique list of all technologies used
  - `selectYearsOfExperience`: Calculates total years of experience

## Data Structure

The CV data follows the `ICVDataInterface` structure defined in `src/types/index.ts`. 