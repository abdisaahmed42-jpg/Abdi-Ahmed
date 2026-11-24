export interface ProfileData {
  name: string;
  title: string;
  domain: string;
  tagline: string;
  summary: string;
  aboutBio: string;
  personalBackground: string;
  interests: string[];
  email: string;
  phone: string;
  location: string;
  availability: string;
  yearsExperience: number;
  completedProjects: number;
  enterpriseClients: number;
  satisfactionRate: number;
  heroImage: string;
  workspaceImage: string;
  socials: {
    facebook: string;
    telegram: string;
    youtube: string;
    linkedin: string;
    github?: string;
    twitter?: string;
  };
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  period: string;
  location: string;
  honors?: string;
  description: string;
  highlights: string[];
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Technical' | 'Architecture & Cloud' | 'Digital & Leadership' | 'Tools & Frameworks';
  proficiency: number; // 0 - 100
  experienceYears: number;
  featured: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Enterprise Software' | 'Cloud Architecture' | 'FinTech & Payments' | 'Mobile & Web';
  summary: string;
  fullDescription: string;
  client: string;
  year: string;
  tags: string[];
  metrics: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  icon: string;
  engagementModel: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  summary: string;
  achievements: string[];
  technologies: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  category: 'Award' | 'Certification' | 'Honor' | 'Milestone';
  description: string;
  credentialId?: string;
  badgeUrl?: string;
}

export interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  author: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Conference' | 'Leadership' | 'Development' | 'Community';
  type: 'photo' | 'video';
  url: string;
  caption: string;
  date: string;
}

export type PageView =
  | 'home'
  | 'about'
  | 'profile'
  | 'education'
  | 'skills'
  | 'portfolio'
  | 'services'
  | 'experience'
  | 'achievements'
  | 'blog'
  | 'gallery'
  | 'cv'
  | 'contact'
  | 'social';
