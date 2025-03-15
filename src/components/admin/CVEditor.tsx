import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { 
  updatePersonalInfo,
  addWorkExperience,
  updateWorkExperience,
  removeWorkExperience,
  addEducation,
  updateEducation,
  removeEducation,
  addCertification,
  updateCertification,
  removeCertification,
  addProject,
  updateProject,
  removeProject,
  toggleProjectFeatured
} from '../../store/slices/cvSlice';
import { 
  selectPersonalInfo,
  selectWorkExperience,
  selectEducation,
  selectCertifications,
  selectProjects
} from '../../store/selectors/cvSelectors';
import { IWorkExperience, IEducation, ICertifications, IProject } from '../../types';

const CVEditor = () => {
  const dispatch = useAppDispatch();
  
  // Get current data from Redux
  const personalInfo = useAppSelector(selectPersonalInfo);
  const workExperience = useAppSelector(selectWorkExperience);
  const education = useAppSelector(selectEducation);
  const certifications = useAppSelector(selectCertifications);
  const projects = useAppSelector(selectProjects);
  
  // State for form inputs
  const [name, setName] = useState(personalInfo.name);
  const [title, setTitle] = useState(personalInfo.title);
  
  // Example function to update personal info
  const handleUpdatePersonalInfo = () => {
    dispatch(updatePersonalInfo({
      name,
      title
    }));
  };
  
  // Example function to add a new work experience
  const handleAddWorkExperience = () => {
    const newWorkExperience: IWorkExperience = {
      from: 2023,
      to: 2025,
      title: 'New Position',
      companyName: 'New Company',
      description: 'Description of the new position',
      technologies: ['React', 'TypeScript'],
      isCurrent: true
    };
    
    dispatch(addWorkExperience(newWorkExperience));
  };
  
  // Example function to toggle a project's featured status
  const handleToggleProjectFeatured = (index: number) => {
    dispatch(toggleProjectFeatured(index));
  };
  
  return (
    <div className="p-6 bg-light-secondary dark:bg-dark-secondary rounded-lg">
      <h2 className="text-2xl font-bold mb-6">CV Editor</h2>
      
      {/* Personal Info Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-light-primary dark:bg-dark-primary"
            />
          </div>
          <div>
            <label className="block mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-light-primary dark:bg-dark-primary"
            />
          </div>
          <button
            onClick={handleUpdatePersonalInfo}
            className="px-4 py-2 bg-light-accent dark:bg-dark-accent text-white rounded-lg"
          >
            Update Personal Info
          </button>
        </div>
      </div>
      
      {/* Work Experience Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Work Experience</h3>
        <button
          onClick={handleAddWorkExperience}
          className="px-4 py-2 bg-light-accent dark:bg-dark-accent text-white rounded-lg mb-4"
        >
          Add New Work Experience
        </button>
        
        <div className="space-y-4">
          {workExperience.map((job: IWorkExperience, index: number) => (
            <div key={index} className="p-4 border rounded-lg">
              <h4 className="font-bold">{job.title}</h4>
              <p>{job.companyName}</p>
              <p>{job.from} - {job.to}</p>
              <button
                onClick={() => dispatch(removeWorkExperience(index))}
                className="px-3 py-1 bg-red-500 text-white rounded-lg mt-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      
      {/* Projects Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Projects</h3>
        <div className="space-y-4">
          {projects.map((project: IProject, index: number) => (
            <div key={index} className="p-4 border rounded-lg">
              <h4 className="font-bold">{project.title}</h4>
              <p className="text-sm">{project.featured ? 'Featured' : 'Not Featured'}</p>
              <button
                onClick={() => handleToggleProjectFeatured(index)}
                className="px-3 py-1 bg-light-accent dark:bg-dark-accent text-white rounded-lg mt-2"
              >
                Toggle Featured
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CVEditor; 