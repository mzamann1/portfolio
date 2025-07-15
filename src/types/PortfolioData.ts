// Hero Section Types
export interface HeroData {
  title: string;
  subtitle: string;
  stats: Stat[];
  profileCard: ProfileCardData;
}

export interface Stat {
  value: number;
  label: string;
  suffix?: string;
}

export interface ProfileCardData {
  name: string;
  title: string;
  avatar: string;
  location: string;
  email: string;
  phone: string;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string; // SVG path or icon name
}

// Skills Section Types
export interface SkillsData {
  categories: SkillCategory[];
  softSkills: SoftSkill[];
}

export interface SkillCategory {
  id: string;
  name: string;
  color: string;
  skills: Skill[];
}

export interface Skill {
  id: string;
  name: string;
  icon: string; // Icon name from react-icons
  proficiency: number; // 0-100
  description: string;
  category: string; // Reference to category
}

export interface SoftSkill {
  id: string;
  name: string;
  icon: string; // Icon name from react-icons
}

// Projects Section Types
export interface ProjectsData {
  featured: Project[];
  all: Project[];
}

export interface ProjectModalDetails {
  longDescription: string;
  challenges: string[];
  solutions: string[];
  role: string;
  teamSize?: number;
  duration: string;
  impact: string[];
  lessonsLearned: string[];
  screenshots?: string[];
  demoVideo?: string;
  architecture?: string;
  performance?: string[];
  security?: string[];
  testing?: string[];
  deployment?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string; // Short description for card
  date: string;
  image?: string;
  technologies: string[]; // Skill IDs used in this project
  category: 'featured' | 'regular';
  liveUrl?: string;
  githubUrl?: string;
  details: string[]; // Key features for card
  featured: boolean;
  modalDetails: ProjectModalDetails; // Detailed information for modal
}

// Work Experience Section Types
export interface WorkExperienceData {
  experiences: WorkExperience[];
}

export interface WorkExperience {
  id: string;
  title: string;
  company: string;
  from: string;
  to: string;
  skills: string[]; // Skill IDs used in this role
  achievements: string[];
  location?: string;
  type?: 'full-time' | 'contract' | 'freelance';
  logo?: string;
  demo?: string;
  screenshots?: string[];
}

// Education Section Types
export interface EducationData {
  education: Education[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  from: string;
  to: string;
  gpa?: number;
  description?: string;
  achievements?: string[];
}

// Awards & Certifications Section Types
export interface AwardsData {
  awards: Award[];
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  category: 'award' | 'achievement' | 'certification';
  icon: string; // Icon name from react-icons
  color: string; // Tailwind color classes
  badge?: string; // Emoji badge
  skills?: string[]; // Related skill IDs
  url?: string; // Optional credential/verification link
}

// About Section Types
export interface AboutData {
  title: string;
  description: string;
  experience: string;
  skills: AboutSkill[];
  stats: Stat[];
}

export interface AboutSkill {
  id: string;
  name: string;
  level: number; // 0-100
  color: string; // Tailwind gradient classes
  icon: string; // Icon name from react-icons
}

// Contact Section Types
export interface ContactData {
  description: string;
  contactInfo: ContactInfo[];
  socialLinks: SocialLink[];
  availability: AvailabilityInfo;
}

export interface ContactInfo {
  id: string;
  title: string;
  value: string;
  icon: string; // Icon name from react-icons
  type: 'email' | 'phone' | 'location' | 'other';
}

export interface AvailabilityInfo {
  status: 'available' | 'busy' | 'unavailable';
  message: string;
  availableFor: string[];
}

// Footer Section Types
export interface FooterData {
  description: string;
  quickLinks: QuickLink[];
  services: Service[];
  contactInfo: ContactInfo[];
  socialLinks: SocialLink[];
}

export interface QuickLink {
  id: string;
  name: string;
  href: string;
}

export interface Service {
  id: string;
  name: string;
  description?: string;
}

// Navigation Section Types
export interface NavigationData {
  navItems: NavItem[];
  drawerItems: DrawerItem[];
}

export interface NavItem {
  id: string;
  name: string;
  href: string;
  icon: string; // Icon name from react-icons
}

export interface DrawerItem {
  id: string;
  name: string;
  href: string;
  icon: string; // Emoji or icon name
}

// Complete Portfolio Data Type
export interface PortfolioData {
  hero: HeroData;
  about: AboutData;
  skills: SkillsData;
  projects: ProjectsData;
  workExperience: WorkExperienceData;
  education: EducationData;
  awards: AwardsData;
  contact: ContactData;
  footer: FooterData;
  navigation: NavigationData;
  metadata: PortfolioMetadata;
}

export interface PortfolioMetadata {
  lastUpdated: string;
  version: string;
  author: string;
  languages: string[];
} 