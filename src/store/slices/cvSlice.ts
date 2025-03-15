import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICVDataInterface, IWorkExperience, IEducation, ICertifications, IProject, ISkill, IPersonalInfo } from '../../types';

// Initial state with sample data
const initialState: ICVDataInterface = {
  personalInfo: {
    name: 'Muhammad Zaman',
    title: 'Full Stack Developer',
    email: 'zaman.muhammad@gmail.com',
    phone: '+92 345 1234567',
    location: 'Karachi, Pakistan',
    bio: 'Passionate full-stack developer with expertise in React, Node.js, and modern web technologies. Committed to creating efficient, scalable, and user-friendly applications.',
    socialLinks: {
      github: 'https://github.com/johndoe',
      linkedin: 'https://linkedin.com/in/johndoe',
    },
  },
  carrierJourney: {
    workExperiences: [
      {
        from: 2023,
        to: null,
        title: 'Full Stack Developer',
        companyName: 'Astera Software',
        description: `
        <div>
          <p>Led the development of a React-based dashboard that improved user engagement by 40%.</p>
          <ul class="list-disc pl-5 mt-2 space-y-1">
            <li>Implemented responsive designs using Tailwind CSS</li>
            <li>Optimized application performance, reducing load time by 30%</li>
            <li>Mentored junior developers and conducted code reviews</li>
          </ul>
        </div>
      `,
        technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
        isCurrent: true,
      },
      {
        from: 2022,
        to: 2023,
        title: 'Senior Software Engineer (.NET)',
        companyName: 'Zepcom Pvt. Ltd.',
        description: `
        <div>
          <p>Developed and maintained multiple client websites and web applications.</p>
          <ul class="list-disc pl-5 mt-2 space-y-1">
            <li>Built interactive UIs with React and TypeScript</li>
            <li>Collaborated with designers to implement pixel-perfect layouts</li>
            <li>Integrated RESTful APIs and implemented state management</li>
          </ul>
        </div>
      `,
        technologies: ['C#', '.NET Core', 'SQL Server', 'Azure'],
      },
      {
        from: 2020,
        to: 2022,
        title: 'Senior Software Engineer',
        companyName: 'Techlogix Pvt. Ltd.',
        description: `
        <div>
          <p>Developed enterprise-level applications and solutions for clients.</p>
          <ul class="list-disc pl-5 mt-2 space-y-1">
            <li>Implemented complex business logic and workflows</li>
            <li>Optimized database queries and application performance</li>
            <li>Collaborated with cross-functional teams to deliver projects</li>
          </ul>
        </div>
      `,
        technologies: ['JavaScript', 'React', 'Node.js', 'PostgreSQL'],
      },
      {
        from: 2019,
        to: 2020,
        title: '.NET Developer',
        companyName: 'Leaptech Solutions',
        description: `
        <div>
          <p>Developed and maintained web applications using .NET technologies.</p>
          <ul class="list-disc pl-5 mt-2 space-y-1">
            <li>Created responsive web interfaces with ASP.NET MVC</li>
            <li>Implemented database solutions using Entity Framework</li>
            <li>Participated in agile development processes</li>
          </ul>
        </div>
      `,
        technologies: ['C#', 'ASP.NET', 'SQL Server', 'jQuery'],
      },
    ],
    education: [
      {
        year: 2019,
        title: 'Bachelor of Science in Computer Science',
        instituteName: 'University of Technology',
        description: 'Graduated with honors. Focused on software engineering and database systems.',
        isCompleted: true,
      },
      {
        year: 2020,
        title: 'Advanced Web Development Bootcamp',
        instituteName: 'Tech Academy',
        description: 'Intensive program covering modern web development technologies and practices.',
        isCompleted: true,
      },
    ],
    certifications: [
      {
        year: 2022,
        title: 'AWS Certified Developer - Associate',
        issuer: 'Amazon Web Services',
        description: 'Validated expertise in developing, deploying, and debugging cloud-based applications using AWS.',
        credentialUrl: 'https://www.credly.com/badges/aws-certified-developer-associate',
      },
      {
        year: 2021,
        title: 'Microsoft Certified: Azure Developer Associate',
        issuer: 'Microsoft',
        description: 'Demonstrated proficiency in designing, building, testing, and maintaining cloud applications on Microsoft Azure.',
        credentialUrl: 'https://www.credly.com/badges/microsoft-certified-azure-developer-associate',
      },
    ]
  },
  skills:
    [
      { title: "C#", level: "advanced", type: "backend", color: "#61DAFB", isMainSkill: true },
      { title: ".NET Core", level: "advanced", type: "backend", color: "#61DAFB", isMainSkill: true },
      { title: "ASP.NET Core", level: "advanced", type: "backend", color: "#61DAFB", isMainSkill: true },
      { title: "ASP.NET MVC", level: "advanced", type: "backend", color: "#61DAFB", isMainSkill: true },
      { title: "ASP.NET Web API", level: "advanced", type: "backend", color: "#61DAFB", isMainSkill: true },
      { title: "ASP.NET Core Razor Pages", level: "intermediate", type: "backend", color: "#61DAFB", isMainSkill: true },
      { title: "Identity Server", level: "intermediate", type: "backend", color: "#61DAFB", isMainSkill: true },
      { title: "Redux", level: "intermediate", type: "frontend", color: "#61DAFB", isMainSkill: true },
      { title: "Redux Toolkit", level: "intermediate", type: "frontend", color: "#61DAFB", isMainSkill: true },
      { title: "Zod", level: "intermediate", type: "frontend", color: "#61DAFB", isMainSkill: true },
      { title: "React Query", level: "intermediate", type: "frontend", color: "#61DAFB", isMainSkill: true },
      { title: "React Router", level: "intermediate", type: "frontend", color: "#61DAFB", isMainSkill: true },
      { title: "React Hook Form", level: "intermediate", type: "frontend", color: "#61DAFB", isMainSkill: true },
      { title: "Entity Framework Core", level: "advanced", type: "backend", color: "#61DAFB", isMainSkill: true },
      { title: "Dapper", level: "advanced", type: "backend", color: "#61DAFB", isMainSkill: true },
      { title: "LINQ", level: "advanced", type: "backend", color: "#61DAFB", isMainSkill: true },
      { title: "SQL Server", level: "advanced", type: "database", color: "#61DAFB", isMainSkill: true },
      { title: "MySQL", level: "advanced", type: "database", color: "#61DAFB", isMainSkill: true },
      { title: "MongoDB", level: "advanced", type: "database", color: "#61DAFB", isMainSkill: true },
      { title: "Redis", level: "advanced", type: "backend", color: "#61DAFB", isMainSkill: true },
      { title: "RabbitMQ", level: "advanced", type: "backend", color: "#61DAFB", isMainSkill: true },
      { title: "Kafka", level: "advanced", type: "backend", color: "#61DAFB", isMainSkill: true },
      { title: "SignalR", level: "advanced", type: "backend", color: "#61DAFB", isMainSkill: false },
      { title: "Hangfire", level: "advanced", type: "backend", color: "#61DAFB", isMainSkill: false },
      { title: "IIS Express", level: "advanced", type: "backend", color: "#61DAFB", isMainSkill: true },
      { title: "Serilog", level: "advanced", type: "backend", color: "#61DAFB", isMainSkill: true },
      { title: "React", level: "advanced", type: "frontend", color: "#61DAFB", isMainSkill: true },
      { title: "TypeScript", level: "advanced", type: "frontend", color: "#3178C6", isMainSkill: true },
      { title: "PostgreSQL", level: "intermediate", type: "database", color: "#336791", isMainSkill: false },
      { title: "AWS", level: "intermediate", type: "cloud", color: "#FF9900", isMainSkill: false },
      { title: "Azure", level: "intermediate", type: "cloud", color: "#FF9900", isMainSkill: false },
      { title: "Azure DevOps", level: "intermediate", type: "cloud", color: "#FF9900", isMainSkill: false },
      { title: "AWS S3", level: "intermediate", type: "cloud", color: "#FF9900", isMainSkill: false },
      { title: "AWS SNS", level: "intermediate", type: "cloud", color: "#FF9900", isMainSkill: false },
      { title: "Kubernetes", level: "intermediate", type: "cloud", color: "#FF9900", isMainSkill: false },
      { title: "AWS SQS", level: "intermediate", type: "cloud", color: "#FF9900", isMainSkill: false },
      { title: "AWS EC2", level: "intermediate", type: "cloud", color: "#FF9900", isMainSkill: false },
      { title: "AWS Lambda", level: "intermediate", type: "cloud", color: "#FF9900", isMainSkill: false },
      { title: "AWS CloudWatch", level: "intermediate", type: "cloud", color: "#FF9900", isMainSkill: false },
      { title: "Docker", level: "intermediate", type: "cloud", color: "#FF9900", isMainSkill: false },
      { title: "Git", level: "intermediate", type: "others", color: "#FF9900", isMainSkill: false },
      { title: "CI/CD", level: "intermediate", type: "others", color: "#FF9900", isMainSkill: false },
      { title: "Jetbrains Rider", level: "advanced", type: "ide", color: "#336791", isMainSkill: false },
      { title: "VS Code", level: "advanced", type: "ide", color: "#336791", isMainSkill: false },
      { title: "Postman", level: "advanced", type: "backend", color: "#336791", isMainSkill: false },
      { title: "Swagger", level: "advanced", type: "backend", color: "#336791", isMainSkill: false },
      { title: "Visual Studio 2022", level: "advanced", type: "ide", color: "#336791", isMainSkill: false },
      { title: "JQuery", level: "advanced", type: "frontend", color: "#336791", isMainSkill: false },
      { title: "Javascript", level: "advanced", type: "frontend", color: "#336791", isMainSkill: false },
      { title: "HTML", level: "advanced", type: "frontend", color: "#336791", isMainSkill: false },
      { title: "CSS", level: "advanced", type: "frontend", color: "#336791", isMainSkill: false },
      { title: "Bootstrap", level: "advanced", type: "frontend", color: "#336791", isMainSkill: false },
      { title: "Tailwind CSS", level: "advanced", type: "frontend", color: "#336791", isMainSkill: false },
      { title: "Ant Design", level: "intermediate", type: "frontend", color: "#336791", isMainSkill: false },
      { title: "Material UI", level: "intermediate", type: "frontend", color: "#336791", isMainSkill: false },
      { title: "T-SQL", level: "intermediate", type: "database", color: "#336791", isMainSkill: false },
      { title: "PL/SQL", level: "intermediate", type: "database", color: "#336791", isMainSkill: false },
      { title: "Oracle DB", level: "intermediate", type: "database", color: "#336791", isMainSkill: false },

    ]
  ,
  projects: [
    {
      title: "Astera HRMS",
      description: "A full-stack e-commerce application with product management, cart functionality, and secure checkout.",
      tags: ["c#", "react", "typescript", "tailwind css", "framer motion", "entity framework core", "asp.net core", "cqrs", "clean architecture", "sql server", "docker", "azure", "agile", "ci/cd"],
      links: {
        github: "https://github.com/zaman-dev/Astera-HRMS",
        live: "https://hrms.asterasoft.com"
      }
    },
    {
      title: "VFW Accounting System",
      description: "A modern portfolio website with animations and responsive design.",
      tags: ["c#", "react", "typescript", "tailwind css", "entity framework core", "asp.net core", "mvc", "sql server", "docker", "azure", "iisexpress", "agile", "ci/cd", "respository pattern", "unit testing", "integration testing", "api testing", "api documentation", "api testing", "api documentation", "unit of work"],
      links: {
        github: "#",
        live: "#"
      }
    },
    {
      title: "Traffk Agent Portal and Hero Life Insurance",
      description: "A collaborative task management application with real-time updates and team features.",
      tags: ["Next.js", "TypeScript", "PostgreSQL", "Socket.io"],
      links: {
        github: "#",
        live: "#"
      }
    },
    {
      title: "Atlas Core Software Development",
      description: "A collaborative task management application with real-time updates and team features.",
      tags: ["c#", "react", "microservices", "microfrontend", "typescript", "css", "asp.net core", "mvc", "sql server", "mongo db", "docker", "azure", "agile", "ci/cd", "respository pattern", "unit testing", "integration testing", "api testing", "api documentation", "api testing", "api documentation", "unit of work"],
      links: {
        github: "#",
        live: "https://atlasthxm.com"
      }
    },
    {
      title: "UBL Service Augmentation",
      description: "A collaborative task management application with real-time updates and team features.",
      tags: ["c#", "asp.net core", "mvc", "oracle", "ado.net", "jQuery", "ajax", "unit of work"],
      links: {
        github: "#",
        live: "https://atlasthxm.com"
      }
    }
  ],
};

const cvSlice = createSlice({
  name: 'cv',
  initialState,
  reducers: {
    // Update personal info
    updatePersonalInfo: (state, action: PayloadAction<Partial<IPersonalInfo>>) => {
      state.personalInfo = { ...state.personalInfo, ...action.payload };
    },

    // Work experience actions
    addWorkExperience: (state, action: PayloadAction<IWorkExperience>) => {
      state.carrierJourney.workExperiences.push(action.payload);
      // Sort by date (most recent first)
      state.carrierJourney.workExperiences.sort((a, b) => {
        const aTo = a.to === null ? Infinity : a.to;
        const bTo = b.to === null ? Infinity : b.to;
        return bTo! - aTo!;
      });
    },
    updateWorkExperience: (state, action: PayloadAction<{ index: number; data: Partial<IWorkExperience> }>) => {
      const { index, data } = action.payload;
      if (index >= 0 && index < state.carrierJourney.workExperiences.length) {
        state.carrierJourney.workExperiences[index] = { ...state.carrierJourney.workExperiences[index], ...data };
      }
    },
    removeWorkExperience: (state, action: PayloadAction<number>) => {
      state.carrierJourney.workExperiences.splice(action.payload, 1);
    },

    // Education actions
    addEducation: (state, action: PayloadAction<IEducation>) => {
      state.carrierJourney.education.push(action.payload);
      // Sort by year (most recent first)
      state.carrierJourney.education.sort((a, b) => b.year - a.year);
    },
    updateEducation: (state, action: PayloadAction<{ index: number; data: Partial<IEducation> }>) => {
      const { index, data } = action.payload;
      if (index >= 0 && index < state.carrierJourney.education.length) {
        state.carrierJourney.education[index] = { ...state.carrierJourney.education[index], ...data };
      }
    },
    removeEducation: (state, action: PayloadAction<number>) => {
      state.carrierJourney.education.splice(action.payload, 1);
    },

    // Certification actions
    addCertification: (state, action: PayloadAction<ICertifications>) => {
      state.carrierJourney.certifications.push(action.payload);
      // Sort by year (most recent first)
      state.carrierJourney.certifications.sort((a, b) => b.year - a.year);
    },
    updateCertification: (state, action: PayloadAction<{ index: number; data: Partial<ICertifications> }>) => {
      const { index, data } = action.payload;
      if (index >= 0 && index < state.carrierJourney.certifications.length) {
        state.carrierJourney.certifications[index] = { ...state.carrierJourney.certifications[index], ...data };
      }
    },
    removeCertification: (state, action: PayloadAction<number>) => {
      state.carrierJourney.certifications.splice(action.payload, 1);
    },

    // Skill actions
    addTechnicalSkill: (state, action: PayloadAction<ISkill>) => {
      state.skills.push(action.payload);
    },
    updateTechnicalSkill: (state, action: PayloadAction<{ index: number; data: Partial<ISkill> }>) => {
      const { index, data } = action.payload;
      if (index >= 0 && index < state.skills.length) {
        state.skills[index] = { ...state.skills[index], ...data };
      }
    },
    removeTechnicalSkill: (state, action: PayloadAction<number>) => {
      state.skills.splice(action.payload, 1);
    },



    // Project actions
    addProject: (state, action: PayloadAction<IProject>) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action: PayloadAction<{ index: number; data: Partial<IProject> }>) => {
      const { index, data } = action.payload;
      if (index >= 0 && index < state.projects.length) {
        state.projects[index] = { ...state.projects[index], ...data };
      }
    },
    removeProject: (state, action: PayloadAction<number>) => {
      state.projects.splice(action.payload, 1);
    },
    toggleProjectFeatured: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= 0 && index < state.projects.length) {
        state.projects[index].featured = !state.projects[index].featured;
      }
    },
  },
});

export const {
  updatePersonalInfo,
  addWorkExperience, updateWorkExperience, removeWorkExperience,
  addEducation, updateEducation, removeEducation,
  addCertification, updateCertification, removeCertification,
  addTechnicalSkill, updateTechnicalSkill, removeTechnicalSkill,
  addProject, updateProject, removeProject, toggleProjectFeatured,
} = cvSlice.actions;

export default cvSlice.reducer; 