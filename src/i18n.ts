import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      // Navigation
      home: "Home",
      about: "About",
      projects: "Projects",
      contact: "Contact",
      experience: "Experience",
      skills: "Skills",
      education: "Education",
      
      // Hero Section
      hero_title: "Hi, I am Muhammad Zaman",
      hero_subtitle: "Highly skilled Full-Stack Developer with over 5 years of experience in developing scalable and robust applications using .NET Core and React. Proficient in designing APIs, database architectures, and implementing modern web technologies. Adept at Agile methodologies, and ensuring code quality through rigorous testing and reviews. Skilled in collaborating with cross-functional teams to deliver high-impact software solutions.",
      scroll_down: "Scroll down",
      
      // About Section
      about_title: "Frontend Developer & UI/UX Enthusiast",
      about_description: "I am a passionate frontend developer with expertise in creating stunning, responsive, and user-friendly web applications. With a strong foundation in modern web technologies, I bring ideas to life through clean code and beautiful design.",
      about_experience: "With years of experience in React, TypeScript, and modern CSS frameworks, I specialize in building scalable applications that deliver exceptional user experiences.",
      years_experience: "Years Experience",
      projects_completed: "Projects",
      client_satisfaction: "Satisfaction",
      download_cv: "Download CV",
      
      // Work Experience Section
      work_experience: "Work Experience",
      full_stack_developer: "Full-Stack Developer",
      senior_software_engineer: "Senior Software Engineer",
      asp_net_mvc_developer: "ASP.NET MVC Developer",
      
      // Core Skills Section
      core_skills: "Core Skills",
      core_skills_description: "A comprehensive toolkit of technologies and frameworks I've mastered through years of professional development",
      frontend_development: "Frontend Development",
      backend_development: "Backend Development",
      database_devops: "Database & DevOps",
      tools_testing: "Tools & Testing",
      proficiency: "proficiency",
      technical_expertise_summary: "Technical Expertise Summary",
      technologies: "Technologies",
      specializations: "Specializations",
      
      // Soft Skills Section
      soft_skills: "Soft Skills",
      communication_skills: "Communication Skills",
      team_collaboration: "Team Collaboration",
      problem_solving: "Problem-Solving",
      leadership: "Leadership",
      time_management: "Time Management",
      adaptability: "Adaptability",
      critical_thinking: "Critical Thinking",
      conflict_resolution: "Conflict Resolution",
      presentation_skills: "Presentation Skills",
      attention_to_detail: "Attention to Detail",
      
      // Education Section
      education_title: "Education",
      bachelor_computer_science: "Bachelor of Science in Computer Science (BSCS)",
      university_karachi: "University of Karachi",
      cgpa: "CGPA",
      
      // Projects Section
      projects_description: "Explore my latest projects and see how I bring ideas to life with modern web technologies.",
      featured_projects: "Featured Projects",
      all_projects: "All Projects",
      live_demo: "Live Demo",
      view_code: "View Code",
      demo: "Demo",
      code: "Code",
      view_all_projects: "View All Projects",
      
      // Key Projects Section
      key_projects: "Key Projects",
      astera_hrms: "Astera HRMS",
      vfw_accounting: "VFW Accounting System",
      traffk_agent_portal: "Traffk Agent Portal and Hero Life Insurance",
      atlas_core: "Atlas Core Software Development",
      ubl_service: "UBL Service Augmentation",
      
      // Contact Section
      contact_description: "Let's work together! Feel free to reach out for collaborations or just a friendly hello.",
      send_message: "Send Message",
      first_name: "First Name",
      first_name_placeholder: "John",
      last_name: "Last Name",
      last_name_placeholder: "Doe",
      email: "Email",
      email_placeholder: "john@example.com",
      subject: "Subject",
      subject_placeholder: "Project Inquiry",
      message: "Message",
      message_placeholder: "Tell me about your project...",
      get_in_touch: "Get In Touch",
      phone: "Phone",
      location: "Location",
      location_value: "Karachi, Pakistan",
      follow_me: "Follow Me",
      availability: "Availability",
      availability_text: "I'm currently available for freelance work and full-time opportunities.",
      available_now: "Available Now",
      
      // Footer Section
      portfolio: "Portfolio",
      footer_description: "Creating beautiful and functional web experiences with modern technologies.",
      quick_links: "Quick Links",
      services: "Services",
      web_development: "Web Development",
      ui_ux_design: "UI/UX Design",
      mobile_development: "Mobile Development",
      consulting: "Consulting",
      
      // Navigation Drawer
      experience_nav: "Experience",
      selected_works: "Selected Works",
      services_nav: "Services",
      testimonial: "Testimonial",
      partners: "Partners",
      awards_nav: "Awards",
      pricing: "Pricing",
      faqs: "FAQs",
      
      // Social Media
      twitter: "Twitter",
      dribbble: "Dribbble",
      instagram: "Instagram",
      facebook: "Facebook",
      linkedin: "LinkedIn",
      github: "GitHub",
      
      // Awards & Certifications Section
      awards_certifications: "Awards & Certifications",
      awards_description: "Recognition of my professional achievements, certifications, and contributions to the tech industry.",
      all_awards: "All",
      awards: "Awards",
      achievements: "Achievements",
      certifications: "Certifications",
      award: "Award",
      achievement: "Achievement",
      certification: "Certification",
      achievements_summary: "Achievements Summary",
      awards_count: "Awards",
      achievements_count: "Achievements",
      certifications_count: "Certifications",
      total_recognition: "Total Recognition",
      
      // Common
      welcome: "Welcome to my Portfolio",
      skills_technologies: "Skills & Technologies",
    },
  },
  ar: {
    translation: {
      // Navigation
      home: "الرئيسية",
      about: "عنّي",
      projects: "المشاريع",
      contact: "تواصل",
      experience: "الخبرة",
      skills: "المهارات",
      education: "التعليم",
      
      // Hero Section
      hero_title: "مرحبًا، أنا محمد زمان",
      hero_subtitle: "مطور Full-Stack ماهر يتمتع بخبرة تزيد عن 5 سنوات في تطوير التطبيقات القابلة للتوسع والموثوقة باستخدام .NET Core وReact. يمتلك كفاءة عالية في تصميم واجهات برمجة التطبيقات (APIs) وهياكل قواعد البيانات، وتطبيق أحدث تقنيات الويب. متمكن في العمل وفق منهجيات أجايل (Agile)، وضمان جودة الكود من خلال اختبارات دقيقة ومراجعات منتظمة. بارع في التعاون مع الفرق متعددة التخصصات لتقديم حلول برمجية ذات تأثير كبير.",
      scroll_down: "انتقل للأسفل",
      
      // About Section
      about_title: "مطور واجهات أمامية ومتحمس لتصميم تجربة المستخدم",
      about_description: "أنا مطور واجهات أمامية شغوف بخبرة في إنشاء تطبيقات ويب مذهلة ومتجاوبة وسهلة الاستخدام. مع أساس قوي في تقنيات الويب الحديثة، أحول الأفكار إلى واقع من خلال كود نظيف وتصميم جميل.",
      about_experience: "مع سنوات من الخبرة في React و TypeScript وأطر عمل CSS الحديثة، أتخصص في بناء تطبيقات قابلة للتطوير توفر تجارب مستخدم استثنائية.",
      years_experience: "سنوات الخبرة",
      projects_completed: "المشاريع",
      client_satisfaction: "الرضا",
      download_cv: "تحميل السيرة الذاتية",
      
      // Work Experience Section
      work_experience: "الخبرة العملية",
      full_stack_developer: "مطور Full-Stack",
      senior_software_engineer: "مهندس برمجيات أول",
      asp_net_mvc_developer: "مطور ASP.NET MVC",
      
      // Core Skills Section
      core_skills: "المهارات الأساسية",
      core_skills_description: "مجموعة شاملة من التقنيات والأطر التي أتقنتها خلال سنوات من التطوير المهني",
      frontend_development: "تطوير الواجهات الأمامية",
      backend_development: "تطوير الخلفية",
      database_devops: "قواعد البيانات والعمليات",
      tools_testing: "الأدوات والاختبار",
      proficiency: "الكفاءة",
      technical_expertise_summary: "ملخص الخبرة التقنية",
      technologies: "التقنيات",
      specializations: "التخصصات",
      
      // Soft Skills Section
      soft_skills: "المهارات الناعمة",
      communication_skills: "مهارات التواصل",
      team_collaboration: "التعاون الجماعي",
      problem_solving: "حل المشكلات",
      leadership: "القيادة",
      time_management: "إدارة الوقت",
      adaptability: "التكيف",
      critical_thinking: "التفكير النقدي",
      conflict_resolution: "حل النزاعات",
      presentation_skills: "مهارات العرض",
      attention_to_detail: "الاهتمام بالتفاصيل",
      
      // Education Section
      education_title: "التعليم",
      bachelor_computer_science: "بكالوريوس علوم الحاسوب",
      university_karachi: "جامعة كراتشي",
      cgpa: "المعدل التراكمي",
      
      // Projects Section
      projects_description: "استكشف أحدث مشاريعي وشاهد كيف أحول الأفكار إلى واقع باستخدام تقنيات الويب الحديثة.",
      featured_projects: "المشاريع المميزة",
      all_projects: "جميع المشاريع",
      live_demo: "عرض مباشر",
      view_code: "عرض الكود",
      demo: "عرض",
      code: "كود",
      view_all_projects: "عرض جميع المشاريع",
      
      // Key Projects Section
      key_projects: "المشاريع الرئيسية",
      astera_hrms: "نظام إدارة الموارد البشرية أستيرا",
      vfw_accounting: "نظام المحاسبة VFW",
      traffk_agent_portal: "بوابة وكيل المرور والتأمين على الحياة",
      atlas_core: "تطوير برمجيات أطلس الأساسية",
      ubl_service: "تحسين خدمات UBL",
      
      // Contact Section
      contact_description: "دعنا نعمل معًا! لا تتردد في التواصل للتعاون أو مجرد تحية ودية.",
      send_message: "إرسال رسالة",
      first_name: "الاسم الأول",
      first_name_placeholder: "أحمد",
      last_name: "اسم العائلة",
      last_name_placeholder: "محمد",
      email: "البريد الإلكتروني",
      email_placeholder: "ahmed@example.com",
      subject: "الموضوع",
      subject_placeholder: "استفسار عن مشروع",
      message: "الرسالة",
      message_placeholder: "أخبرني عن مشروعك...",
      get_in_touch: "تواصل معي",
      phone: "الهاتف",
      location: "الموقع",
      location_value: "كراتشي، باكستان",
      follow_me: "تابعني",
      availability: "التوفر",
      availability_text: "أنا متاح حاليًا للعمل الحر وفرص العمل بدوام كامل.",
      available_now: "متاح الآن",
      
      // Footer Section
      portfolio: "الملف الشخصي",
      footer_description: "إنشاء تجارب ويب جميلة ووظيفية باستخدام التقنيات الحديثة.",
      quick_links: "روابط سريعة",
      services: "الخدمات",
      web_development: "تطوير الويب",
      ui_ux_design: "تصميم واجهات المستخدم",
      mobile_development: "تطوير التطبيقات المحمولة",
      consulting: "الاستشارات",
      
      // Navigation Drawer
      experience_nav: "الخبرة",
      selected_works: "الأعمال المختارة",
      services_nav: "الخدمات",
      testimonial: "الشهادات",
      partners: "الشركاء",
      awards_nav: "الجوائز",
      pricing: "الأسعار",
      faqs: "الأسئلة الشائعة",
      
      // Social Media
      twitter: "تويتر",
      dribbble: "دريببل",
      instagram: "إنستغرام",
      facebook: "فيسبوك",
      linkedin: "لينكد إن",
      github: "جيت هب",
      
      // Awards & Certifications Section
      awards_certifications: "الجوائز والشهادات",
      awards_description: "اعتراف بإنجازاتي المهنية وشهاداتي ومساهماتي في صناعة التكنولوجيا.",
      all_awards: "الكل",
      awards: "الجوائز",
      achievements: "الإنجازات",
      certifications: "الشهادات",
      award: "جائزة",
      achievement: "إنجاز",
      certification: "شهادة",
      achievements_summary: "ملخص الإنجازات",
      awards_count: "الجوائز",
      achievements_count: "الإنجازات",
      certifications_count: "الشهادات",
      total_recognition: "إجمالي الاعتراف",
      
      // Common
      welcome: "مرحبًا بكم في ملفي الشخصي",
      skills_technologies: "المهارات والتقنيات",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

// RTL support: set dir attribute on html
i18n.on("languageChanged", (lng) => {
  if (lng === "ar") {
    document.documentElement.setAttribute("dir", "rtl");
  } else {
    document.documentElement.setAttribute("dir", "ltr");
  }
});

export default i18n;
