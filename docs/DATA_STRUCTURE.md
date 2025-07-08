# Portfolio Data Structure Documentation

This document describes the new GitHub headless CMS structure for the portfolio website.

## Overview

The portfolio data is now organized into separate JSON files for better maintainability and type safety. Each section has its own file and corresponding TypeScript types.

## File Structure

```
public/data/
├── hero.json              # Hero section data
├── about.json             # About section data
├── skills.json            # Skills and categories
├── projects.json          # Projects with skill associations
├── work-experience.json   # Work experience history
├── education.json         # Education and certifications
├── awards.json            # Awards and achievements
├── contact.json           # Contact information
├── footer.json            # Footer links and services
└── navigation.json        # Navigation menu items
```

## Data Service

### PortfolioDataService

The main service class that handles:
- Fetching data from JSON files
- Caching with 5-minute expiration
- Error handling with fallback data
- Utility methods for related data

### Usage

```typescript
import { portfolioDataService } from '../services/portfolioDataService';

// Fetch individual sections
const heroData = await portfolioDataService.getHeroData();
const skillsData = await portfolioDataService.getSkillsData();

// Fetch all data at once
const allData = await portfolioDataService.getAllData();

// Utility methods
const skills = await portfolioDataService.getSkillsByIds(['react', 'typescript']);
const projects = await portfolioDataService.getProjectsBySkill('react');
```

## React Hooks

### Individual Section Hooks

```typescript
import { useHeroData, useSkillsData, useProjectsData } from '../hooks/usePortfolioData';

function MyComponent() {
  const { data: heroData, loading, error, refetch } = useHeroData();
  const { data: skillsData } = useSkillsData();
  const { data: projectsData } = useProjectsData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <div>{/* Your component */}</div>;
}
```

### Available Hooks

- `useHeroData()` - Hero section data
- `useAboutData()` - About section data
- `useSkillsData()` - Skills and categories
- `useProjectsData()` - Projects data
- `useWorkExperienceData()` - Work experience
- `useEducationData()` - Education history
- `useAwardsData()` - Awards and certifications
- `useContactData()` - Contact information
- `useFooterData()` - Footer data
- `useNavigationData()` - Navigation items
- `useAllPortfolioData()` - All data combined

### Utility Hooks

```typescript
// Get skills by IDs
const { skills, loading } = useSkillsByIds(['react', 'typescript']);

// Get projects that use a specific skill
const { projects, loading } = useProjectsBySkill('react');

// Cache management
const { cacheStatus, clearCache } = usePortfolioCache();
```

## Data Schema

### Hero Section (`hero.json`)

```typescript
interface HeroData {
  title: string;
  subtitle: string;
  stats: Stat[];
  profileCard: ProfileCardData;
}

interface Stat {
  value: number;
  label: string;
  suffix?: string;
}

interface ProfileCardData {
  name: string;
  title: string;
  avatar: string;
  location: string;
  email: string;
  phone: string;
  socialLinks: SocialLink[];
}
```

### Skills Section (`skills.json`)

```typescript
interface SkillsData {
  categories: SkillCategory[];
  softSkills: SoftSkill[];
}

interface SkillCategory {
  id: string;
  name: string;
  color: string;
  skills: Skill[];
}

interface Skill {
  id: string;
  name: string;
  icon: string; // React Icons name
  proficiency: number; // 0-100
  description: string;
  category: string;
}
```

### Projects Section (`projects.json`)

```typescript
interface ProjectsData {
  featured: Project[];
  all: Project[];
}

interface Project {
  id: string;
  name: string;
  description: string;
  date: string;
  image?: string;
  technologies: string[]; // Skill IDs
  category: 'featured' | 'regular';
  liveUrl?: string;
  githubUrl?: string;
  details: string[];
  featured: boolean;
}
```

### Work Experience (`work-experience.json`)

```typescript
interface WorkExperienceData {
  experiences: WorkExperience[];
}

interface WorkExperience {
  id: string;
  title: string;
  company: string;
  from: string;
  to: string;
  skills: string[]; // Skill IDs
  achievements: string[];
  location?: string;
  type?: 'full-time' | 'contract' | 'freelance';
}
```

## Updating Content

### Via GitHub (Recommended)

1. Navigate to your repository on GitHub
2. Go to the `public/data/` folder
3. Edit any JSON file directly in the browser
4. Commit your changes
5. The changes will be live immediately (no rebuild required)

### Local Development

1. Edit the JSON files in `public/data/`
2. Refresh your browser to see changes
3. Commit and push to GitHub

## Benefits

### 1. **Type Safety**
- All data is strongly typed with TypeScript
- Compile-time error checking
- IntelliSense support in your IDE

### 2. **Modularity**
- Each section is independent
- Easy to maintain and update
- Clear separation of concerns

### 3. **Performance**
- Caching reduces API calls
- Lazy loading of sections
- Fallback data for offline scenarios

### 4. **Scalability**
- Easy to add new sections
- Structured data relationships
- Extensible schema

### 5. **Developer Experience**
- Simple React hooks
- Error handling built-in
- Loading states managed automatically

## Best Practices

### 1. **Skill IDs**
- Use consistent skill IDs across all files
- Reference skills by ID, not name
- Keep skill IDs lowercase and hyphenated

### 2. **Icons**
- Use React Icons names (e.g., "FaReact", "SiTypescript")
- Keep icon names consistent
- Use appropriate icon families

### 3. **Dates**
- Use ISO format (YYYY-MM) for consistency
- Use "Present" for current positions
- Keep date formats consistent across sections

### 4. **URLs**
- Always include protocol (https://)
- Use placeholder URLs for demo projects
- Keep URLs consistent with actual projects

### 5. **Content Updates**
- Update regularly to keep content fresh
- Use descriptive project details
- Include relevant achievements and metrics

## Error Handling

The system includes comprehensive error handling:

1. **Network Errors**: Fallback to cached data
2. **Missing Files**: Fallback to default data
3. **Invalid JSON**: Graceful error messages
4. **Loading States**: User-friendly loading indicators

## Caching Strategy

- **Cache Duration**: 5 minutes
- **Cache Scope**: Per file
- **Cache Invalidation**: Automatic after expiration
- **Manual Clear**: Available via `usePortfolioCache` hook

## Future Enhancements

1. **Real-time Updates**: WebSocket integration
2. **Version Control**: Data versioning
3. **Admin Panel**: Visual content editor
4. **Analytics**: Content performance tracking
5. **Multi-language**: Internationalization support 