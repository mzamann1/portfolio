import React from 'react';

const projects = [
  {
    name: 'Astera HRMS',
    date: 'Oct 2024 - Present',
    details: [
      'Led the development of an HRMS from scratch, handling all aspects including on-boarding process, and employee profile of the project independently as a Full Stack Developer.',
      'Collaborated with stakeholders and designers for requirement gathering and provided suggestions for system improvements.',
      'Developed the frontend using Vite, React, TypeScript, Ant Design, Tailwind CSS, Redux, and Axios for a seamless user experience.',
      'Designed and applied Clean Architecture with CQRS and Mediator pattern for API development in the backend, utilizing Entity Framework Core for data access.',
      'Incorporated Microsoft OAuth for authentication and authorization across both frontend and backend.',
      'Applied Repository Pattern with Unit of Work and utilized the Result Pattern in the service layer to ensure scalable and maintainable code.'
    ]
  },
  {
    name: 'VFW Accounting System',
    date: 'May 2023 – Nov 2023',
    details: [
      'Built scalable Web APIs with comprehensive authentication, including two-factor authentication using Microsoft Auth and Duo Security.',
      'Designed and implemented user management system, including role-based access control (RBAC) for backend and frontend authorization.',
      'Collaborated with the design team to develop the user interface (UI) and utilized jQuery for dynamic content manipulation and interactions.',
      'Conducted code reviews to ensure adherence to clean coding principles.'
    ]
  },
  {
    name: 'Traffk Agent Portal and Hero Life Insurance',
    date: 'Dec 2022 – Apr 2023',
    details: [
      'Designed and implemented dynamic, user-centric interfaces using Blazor Web Assembly incorporated with Telerik Controls, ensuring responsiveness and enhanced usability.',
      'Built a robust document management Web Api leveraging .NET 6 and adhering to Clean Architecture principles, facilitating scalability and maintainability.',
      'Partnered closely with stakeholders to gather, analyze, and refine requirements, leading to improved functionality and an optimized user experience.'
    ]
  },
  {
    name: 'Atlas Core Software Development',
    date: 'Dec 2021 – Jul 2022',
    details: [
      'Architected and developed the React application from scratch, leveraging Micro Frontend techniques to modularize and scale the project efficiently.',
      'Developed and integrated robust backend system using the CQRS pattern with MediatR, ensuring high performance and scalability.',
      'Developed and executed unit tests for both frontend and backend using Jest and NUnit, achieving 95% code coverage and maintaining high code quality.',
      'Automated CI/CD workflows to streamline deployment processes, significantly reducing manual intervention and deployment times.'
    ]
  },
  {
    name: 'UBL Service Augmentation',
    date: 'Nov 2020 – Dec 2021',
    details: [
      'Enhanced core functionalities of banking software, including Inward clearing processes and rent management modules, to improve operational efficiency and accuracy.',
      'Designed and incorporated database solutions using Oracle Database, leveraging stored procedures, triggers, views, jobs and advanced SQL techniques to support seamless application performance.',
      'Automated recurring database tasks by developing custom scripts and optimizing workflows, resulting in a 20% reduction in operational workload and improved resource utilization.'
    ]
  }
];

const KeyProjects = () => (
  <section id="projects" className="w-full max-w-7xl mx-auto py-12 px-4">
    <h2 className="font-inter font-extrabold text-3xl md:text-4xl mb-8 text-primary">Key Projects</h2>
    <div className="grid gap-8 md:grid-cols-2">
      {projects.map((project) => (
        <div key={project.name} className="bg-base-200 rounded-xl p-6 shadow flex flex-col gap-2 hover:scale-[1.03] transition-transform">
          <div className="font-inter font-bold text-lg text-base-content">{project.name}</div>
          <div className="font-sans text-base-content/60 text-sm mb-2">{project.date}</div>
          <ul className="list-disc ml-5 text-base-content/80">
            {project.details.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

export default KeyProjects; 