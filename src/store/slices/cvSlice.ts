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
        to: 2025,
        title: 'Full Stack Developer',
        companyName: 'Astera Software',
        description: `
        <div class="space-y-4">
          <p class="text-base leading-relaxed">Led the development of modern, high-performance web applications using React and .NET technologies, focusing on scalability, user experience, and system optimization.</p>
          
          <div class="bg-light-secondary/10 dark:bg-dark-secondary/10 p-4 rounded-lg border-l-2 border-light-accent dark:border-dark-accent">
            <p class="italic text-light-textSecondary dark:text-dark-textSecondary">Developed React components and backend APIs utilizing .NET 6/8, ensuring scalable and high-performance application architecture.</p>
          </div>
          
          <ul class="list-disc pl-5 space-y-2.5">
            <li class="leading-relaxed">
              <span class="font-medium text-light-text dark:text-dark-text">Frontend Development:</span> Created responsive and interactive user interfaces using React, TypeScript, and Tailwind CSS, improving user engagement by 40%.
            </li>
            
            <li class="leading-relaxed">
              <span class="font-medium text-light-text dark:text-dark-text">Backend Architecture:</span> Designed and implemented RESTful APIs using ASP.NET Core with clean architecture principles, ensuring maintainability and scalability.
            </li>
            
            <li class="leading-relaxed">
              <span class="font-medium text-light-text dark:text-dark-text">Application Migration:</span> Contributed to the migration of a legacy WinForms application to WPF, resulting in a 60% increase in customer adoption through enhanced user experience and functionality.
            </li>
            
            <li class="leading-relaxed">
              <span class="font-medium text-light-text dark:text-dark-text">Performance Optimization:</span> Implemented performance optimization strategies, improving system speed and response time by 25% to enhance user experience and system efficiency.
            </li>
            
            <li class="leading-relaxed">
              <span class="font-medium text-light-text dark:text-dark-text">State Management:</span> Utilized Redux Toolkit and React Query for efficient state management, reducing boilerplate code and improving application maintainability.
            </li>
            
            <li class="leading-relaxed">
              <span class="font-medium text-light-text dark:text-dark-text">Mentorship & Leadership:</span> Mentored junior developers through code reviews and pair programming sessions, improving team productivity and code quality standards.
            </li>
          </ul>
          
          <div class="flex flex-wrap gap-2 mt-3">
            <span class="px-2 py-1 text-xs rounded-full bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent">React</span>
            <span class="px-2 py-1 text-xs rounded-full bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent">TypeScript</span>
            <span class="px-2 py-1 text-xs rounded-full bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent">.NET 6/8</span>
            <span class="px-2 py-1 text-xs rounded-full bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent">Redux Toolkit</span>
            <span class="px-2 py-1 text-xs rounded-full bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent">Tailwind CSS</span>
          </div>
        </div>
      `,
        technologies: ['React', 'TypeScript', 'ASP.NET Core', 'SQL Server', 'Entity Framework Core', 'Dapper', 'Tailwind CSS', 'Framer Motion', 'Redux', 'Redux Toolkit', 'Zod', 'React Router', 'React Hook Form'],
        isCurrent: false,
      },
      {
        from: 2022,
        to: 2023,
        title: 'Senior Software Engineer (.NET)',
        companyName: 'Zepcom Pvt. Ltd.',
        description: `
        <div class="space-y-4">
          <p class="text-base leading-relaxed">Led the development and maintenance of enterprise-grade web applications, focusing on secure, scalable, and high-performance solutions for clients across multiple industries.</p>
          
          <div class="bg-light-secondary/10 dark:bg-dark-secondary/10 p-4 rounded-lg border-l-2 border-light-accent dark:border-dark-accent">
            <p class="italic text-light-textSecondary dark:text-dark-textSecondary">Delivered full-stack solutions using Blazor Web Assembly and .NET 6, ensuring seamless integration between frontend and back-end components for high-performance web applications.</p>
          </div>
          
          <ul class="list-disc pl-5 space-y-2.5">
            <li class="leading-relaxed">
              <span class="font-medium text-light-text dark:text-dark-text">Full-Stack Development:</span> Architected and implemented robust web applications using Blazor Web Assembly and .NET 6, creating seamless integration between frontend and backend components.
            </li>
            
            <li class="leading-relaxed">
              <span class="font-medium text-light-text dark:text-dark-text">DevOps & Deployment:</span> Managed deployments on IIS and Azure, implementing automated CI/CD pipelines to streamline code delivery, reduce errors, and accelerate release cycles.
            </li>
            
            <li class="leading-relaxed">
              <span class="font-medium text-light-text dark:text-dark-text">Data Visualization:</span> Developed dynamic, data-driven reports using Telerik Reporting tools, providing actionable insights and enhancing decision-making processes.
            </li>
            
            <li class="leading-relaxed">
              <span class="font-medium text-light-text dark:text-dark-text">Performance Optimization:</span> Improved system scalability by designing and implementing efficient data caching mechanisms, optimizing resource usage, and enhancing overall system performance.
            </li>
            
            <li class="leading-relaxed">
              <span class="font-medium text-light-text dark:text-dark-text">Security Implementation:</span> Integrated Identity Server 4 for secure authentication and authorization, implementing OAuth 2.0 and OpenID Connect protocols to ensure robust application security and single sign-on capabilities.
            </li>
            
            <li class="leading-relaxed">
              <span class="font-medium text-light-text dark:text-dark-text">Microservices Architecture:</span> Designed and developed microservices-based applications using .NET 6, implementing service discovery, API gateways, and message queues for resilient and scalable systems.
            </li>
          </ul>
          
          <div class="flex flex-wrap gap-2 mt-3">
            <span class="px-2 py-1 text-xs rounded-full bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent">Blazor</span>
            <span class="px-2 py-1 text-xs rounded-full bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent">.NET 6</span>
            <span class="px-2 py-1 text-xs rounded-full bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent">Identity Server 4</span>
            <span class="px-2 py-1 text-xs rounded-full bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent">Azure DevOps</span>
            <span class="px-2 py-1 text-xs rounded-full bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent">Microservices</span>
          </div>
        </div>
      `,
        technologies: ['C#', '.NET Core', 'Blazor', 'SQL Server', 'Azure', 'Identity Server 4', 'Telerik Reporting', 'CI/CD', 'Microservices'],
      },
      {
        from: 2020,
        to: 2022,
        title: 'Senior Software Engineer',
        companyName: 'Techlogix Pvt. Ltd.',
        description: `
        <div class="space-y-4">
          
          <div class="bg-light-secondary/10 dark:bg-dark-secondary/10 p-4 rounded-lg border-l-2 border-light-accent dark:border-dark-accent mt-4">
            <p class="italic text-light-textSecondary dark:text-dark-textSecondary">Developed and maintained both monolithic and microservice-based and micro-frontend applications using React and .NET 6, ensuring scalable, maintainable, and high-performance solutions.</p>
          </div>
          
          <ul class="list-disc pl-5 space-y-2.5">
            
            <li class="leading-relaxed">
              <span class="font-medium text-light-text dark:text-dark-text">Database Optimization:</span> Optimized database queries and implemented performance tuning techniques, reducing query execution times by 30%, improving application responsiveness and overall user experience.
            </li>
            
            <li class="leading-relaxed">
              <span class="font-medium text-light-text dark:text-dark-text">Microservices Architecture:</span> Designed and implemented microservice-based and micro-frontend applications, improving system modularity, scalability, and maintainability.
            </li>
            
            <li class="leading-relaxed">
              <span class="font-medium text-light-text dark:text-dark-text">Cross-functional Collaboration:</span> Worked closely with financial analysts, accountants, and business stakeholders to translate complex business requirements into technical solutions.
            </li>
          </ul>
          
          <div class="flex flex-wrap gap-2 mt-3">
            <span class="px-2 py-1 text-xs rounded-full bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent">C#</span>
            <span class="px-2 py-1 text-xs rounded-full bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent">RDLC</span>
            <span class="px-2 py-1 text-xs rounded-full bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent">jQuery</span>
            <span class="px-2 py-1 text-xs rounded-full bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent">Entity Framework</span>
            <span class="px-2 py-1 text-xs rounded-full bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent">Admin LTE</span>
            <span class="px-2 py-1 text-xs rounded-full bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent">React</span>
            <span class="px-2 py-1 text-xs rounded-full bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent">Microservices</span>
            <span class="px-2 py-1 text-xs rounded-full bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent">Keycloak</span>
            <span class="px-2 py-1 text-xs rounded-full bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent">Oracle</span>
          </div>
        </div>
      `,
        technologies: ['C#', 'JavaScript', 'jQuery', 'Entity Framework Core', 'RDLC', 'SQL Server', 'Admin LTE', 'ASP.NET MVC', 'React', '.NET 6', 'Microservices', 'Micro-frontend', 'Keycloak', 'JWT', 'MFA', 'Oracle'],
      },
      {
        from: 2019,
        to: 2020,
        title: '.NET Developer',
        companyName: 'Leaptech Solutions',
        description: `
       <div class="space-y-4">
          <p class="text-base leading-relaxed">Specialized in developing enterprise-level financial applications and accounting systems, focusing on data integrity, reporting accuracy, and system reliability.</p>
          
          <div class="bg-light-secondary/10 dark:bg-dark-secondary/10 p-4 rounded-lg border-l-2 border-light-accent dark:border-dark-accent">
            <p class="italic text-light-textSecondary dark:text-dark-textSecondary">Designed and applied backend logic and accounting ledgers using C#, ensuring efficient and accurate financial operations.</p>
          </div>
          
          <ul class="list-disc pl-5 space-y-2.5">
            <li class="leading-relaxed">
              <span class="font-medium text-light-text dark:text-dark-text">Financial Systems Development:</span> Implemented complex accounting logic and financial workflows, ensuring compliance with accounting standards and regulatory requirements.
            </li>
            
            <li class="leading-relaxed">
              <span class="font-medium text-light-text dark:text-dark-text">Reporting Solutions:</span> Developed comprehensive reporting systems utilizing RDLC for dynamic reports and jQuery data tables for interactive data management, enabling stakeholders to make informed decisions.
            </li>
            
            <li class="leading-relaxed">
              <span class="font-medium text-light-text dark:text-dark-text">System Reliability:</span> Improved system reliability by integrating detailed logging and robust error-handling mechanisms to ensure smooth operations and quick issue resolution.
            </li>
            
            <li class="leading-relaxed">
              <span class="font-medium text-light-text dark:text-dark-text">Frontend Development:</span> Utilized the Admin LTE Admin Panel for the front-end, with extensive use of jQuery for dynamic elements and Entity Framework (EF) Core for data access, enhancing performance and maintainability.
            </li>
            
            <li class="leading-relaxed">
              <span class="font-medium text-light-text dark:text-dark-text">Database Optimization:</span> Designed and optimized database schemas and queries, improving application response times and ensuring efficient data retrieval for complex financial calculations.
            </li>
            
            <li class="leading-relaxed">
              <span class="font-medium text-light-text dark:text-dark-text">Cross-functional Collaboration:</span> Worked closely with financial analysts, accountants, and business stakeholders to translate complex business requirements into technical solutions.
            </li>
          </ul>
          
          <div class="flex flex-wrap gap-2 mt-3">
            <span class="px-2 py-1 text-xs rounded-full bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent">C#</span>
            <span class="px-2 py-1 text-xs rounded-full bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent">RDLC</span>
            <span class="px-2 py-1 text-xs rounded-full bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent">jQuery</span>
            <span class="px-2 py-1 text-xs rounded-full bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent">Entity Framework</span>
            <span class="px-2 py-1 text-xs rounded-full bg-light-accent/10 dark:bg-dark-accent/10 text-light-accent dark:text-dark-accent">Admin LTE</span>
          </div>
        </div>
      `,
        technologies: ['C#', 'ASP.NET', 'SQL Server', 'jQuery'],
      },
    ],
    education: [
      {
        year: 2019,
        title: 'Bachelor of Science in Computer Science',
        instituteName: 'University of Karachi',
        description: 'Graduated with 3.5 GPA. Focused on software engineering.',
        isCompleted: true,
      }
     
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
      { title: "MVC", level: "advanced", type: "backend", color: "#61DAFB", isMainSkill: true },
      { title: "Web API", level: "advanced", type: "backend", color: "#61DAFB", isMainSkill: true },
      { title: "Razor Pages", level: "intermediate", type: "backend", color: "#61DAFB", isMainSkill: true },
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
      { title: "S3", level: "intermediate", type: "cloud", color: "#FF9900", isMainSkill: false },
      { title: "SNS", level: "intermediate", type: "cloud", color: "#FF9900", isMainSkill: false },
      { title: "Kubernetes", level: "intermediate", type: "cloud", color: "#FF9900", isMainSkill: false },
      { title: "SQS", level: "intermediate", type: "cloud", color: "#FF9900", isMainSkill: false },
      { title: "EC2", level: "intermediate", type: "cloud", color: "#FF9900", isMainSkill: false },
      { title: "Lambda", level: "intermediate", type: "cloud", color: "#FF9900", isMainSkill: false },
      { title: "CloudWatch", level: "intermediate", type: "cloud", color: "#FF9900", isMainSkill: false },
      { title: "Docker", level: "intermediate", type: "cloud", color: "#FF9900", isMainSkill: false },
      { title: "Git", level: "intermediate", type: "others", color: "#FF9900", isMainSkill: false },
      { title: "CI/CD", level: "intermediate", type: "others", color: "#FF9900", isMainSkill: false },
      { title: "Jetbrains Rider", level: "advanced", type: "others", color: "#336791", isMainSkill: false },
      { title: "VS Code", level: "advanced", type: "others", color: "#336791", isMainSkill: false },
      { title: "Postman", level: "advanced", type: "backend", color: "#336791", isMainSkill: false },
      { title: "Swagger", level: "advanced", type: "backend", color: "#336791", isMainSkill: false },
      { title: "Postman", level: "intermediate", type: "database", color: "#336791", isMainSkill: false },
      { title: "Azure DevOps", level: "advanced", type: "backend", color: "#336791", isMainSkill: false },
      { title: "Azure", level: "advanced", type: "backend", color: "#336791", isMainSkill: false },
      { title: "Jira", level: "advanced", type: "backend", color: "#336791", isMainSkill: false },
      { title: "Trello", level: "advanced", type: "backend", color: "#336791", isMainSkill: false },
      { title: "Visual Studio 2022", level: "advanced", type: "others", color: "#336791", isMainSkill: false },
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