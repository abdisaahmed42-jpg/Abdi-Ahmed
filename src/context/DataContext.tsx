import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ProfileData,
  EducationItem,
  SkillItem,
  ProjectItem,
  ServiceItem,
  ExperienceItem,
  AchievementItem,
  BlogPostItem,
  GalleryItem,
  PageView,
} from '../types';
import {
  initialProfile,
  initialEducation,
  initialSkills,
  initialProjects,
  initialServices,
  initialExperience,
  initialAchievements,
  initialBlogPosts,
  initialGallery,
} from '../data/initialData';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  serviceRequested?: string;
  date: string;
  read: boolean;
}

interface DataContextType {
  // Navigation & UI State
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  selectedArticleId: string | null;
  setSelectedArticleId: (id: string | null) => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;

  // Data
  profile: ProfileData;
  education: EducationItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  services: ServiceItem[];
  experience: ExperienceItem[];
  achievements: AchievementItem[];
  blogPosts: BlogPostItem[];
  gallery: GalleryItem[];
  messages: ContactMessage[];

  // Admin Auth
  isAdminAuthenticated: boolean;
  adminLogin: (pass: string) => boolean;
  adminLogout: () => void;
  updateAdminPassword: (newPass: string) => void;

  // Mutations
  updateProfile: (updated: Partial<ProfileData>) => void;
  
  // Project CRUD
  saveProject: (project: ProjectItem) => void;
  deleteProject: (id: string) => void;

  // Service CRUD
  saveService: (service: ServiceItem) => void;
  deleteService: (id: string) => void;

  // Blog CRUD
  saveBlogPost: (post: BlogPostItem) => void;
  deleteBlogPost: (id: string) => void;

  // Experience CRUD
  saveExperience: (exp: ExperienceItem) => void;
  deleteExperience: (id: string) => void;

  // Education CRUD
  saveEducation: (edu: EducationItem) => void;
  deleteEducation: (id: string) => void;

  // Skills CRUD
  saveSkill: (skill: SkillItem) => void;
  deleteSkill: (id: string) => void;

  // Achievement CRUD
  saveAchievement: (ach: AchievementItem) => void;
  deleteAchievement: (id: string) => void;

  // Gallery CRUD
  saveGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;

  // Messages
  addMessage: (msg: Omit<ContactMessage, 'id' | 'date' | 'read'>) => void;
  markMessageRead: (id: string) => void;
  deleteMessage: (id: string) => void;

  // Export / Import / Reset
  resetToDefaults: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonString: string) => boolean;
}

const STORAGE_KEYS = {
  PROFILE: 'abdanet_profile_v1',
  EDUCATION: 'abdanet_education_v1',
  SKILLS: 'abdanet_skills_v1',
  PROJECTS: 'abdanet_projects_v1',
  SERVICES: 'abdanet_services_v1',
  EXPERIENCE: 'abdanet_experience_v1',
  ACHIEVEMENTS: 'abdanet_achievements_v1',
  BLOG: 'abdanet_blog_v1',
  GALLERY: 'abdanet_gallery_v1',
  MESSAGES: 'abdanet_messages_v1',
  ADMIN_AUTH: 'abdanet_admin_auth_v1',
  ADMIN_PASS: 'abdanet_admin_pass_v1',
};

const DEFAULT_ADMIN_PASS = 'abdanet2026';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPageState] = useState<PageView>('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Load state from localStorage or defaults
  const [profile, setProfile] = useState<ProfileData>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return initialProfile;
  });

  const [education, setEducation] = useState<EducationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EDUCATION);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return initialEducation;
  });

  const [skills, setSkills] = useState<SkillItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SKILLS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return initialSkills;
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return initialProjects;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return initialServices;
  });

  const [experience, setExperience] = useState<ExperienceItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EXPERIENCE);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return initialExperience;
  });

  const [achievements, setAchievements] = useState<AchievementItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return initialAchievements;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPostItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BLOG);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return initialBlogPosts;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GALLERY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return initialGallery;
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [
      {
        id: 'msg-sample-1',
        name: 'Hassan Nur',
        email: 'hassan@eastafricatech.so',
        phone: '+252 61 777 8899',
        subject: 'Enterprise Cloud Architecture Advisory Inquiry',
        message: 'Dear Eng. Abdi Ahmed Sharif, we are preparing an institutional core modernization for our regional microfinance institution and would like to engage you for an architectural review sprint.',
        serviceRequested: 'Enterprise Architecture & Systems Engineering',
        date: '2026-11-04 10:30 AM',
        read: false
      }
    ];
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EDUCATION, JSON.stringify(education));
  }, [education]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EXPERIENCE, JSON.stringify(experience));
  }, [experience]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BLOG, JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  }, [messages]);

  const setCurrentPage = (page: PageView) => {
    setCurrentPageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin Auth Handlers
  const adminLogin = (pass: string): boolean => {
    const currentPass = localStorage.getItem(STORAGE_KEYS.ADMIN_PASS) || DEFAULT_ADMIN_PASS;
    if (pass.trim() === currentPass.trim()) {
      setIsAdminAuthenticated(true);
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  };

  const updateAdminPassword = (newPass: string) => {
    localStorage.setItem(STORAGE_KEYS.ADMIN_PASS, newPass);
  };

  // Profile Update
  const updateProfile = (updated: Partial<ProfileData>) => {
    setProfile(prev => ({ ...prev, ...updated }));
  };

  // Project CRUD
  const saveProject = (proj: ProjectItem) => {
    setProjects(prev => {
      const idx = prev.findIndex(p => p.id === proj.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = proj;
        return next;
      }
      return [proj, ...prev];
    });
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // Service CRUD
  const saveService = (serv: ServiceItem) => {
    setServices(prev => {
      const idx = prev.findIndex(s => s.id === serv.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = serv;
        return next;
      }
      return [...prev, serv];
    });
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  // Blog CRUD
  const saveBlogPost = (post: BlogPostItem) => {
    setBlogPosts(prev => {
      const idx = prev.findIndex(b => b.id === post.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = post;
        return next;
      }
      return [post, ...prev];
    });
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(b => b.id !== id));
  };

  // Experience CRUD
  const saveExperience = (exp: ExperienceItem) => {
    setExperience(prev => {
      const idx = prev.findIndex(e => e.id === exp.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = exp;
        return next;
      }
      return [exp, ...prev];
    });
  };

  const deleteExperience = (id: string) => {
    setExperience(prev => prev.filter(e => e.id !== id));
  };

  // Education CRUD
  const saveEducation = (edu: EducationItem) => {
    setEducation(prev => {
      const idx = prev.findIndex(e => e.id === edu.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = edu;
        return next;
      }
      return [...prev, edu];
    });
  };

  const deleteEducation = (id: string) => {
    setEducation(prev => prev.filter(e => e.id !== id));
  };

  // Skills CRUD
  const saveSkill = (sk: SkillItem) => {
    setSkills(prev => {
      const idx = prev.findIndex(s => s.id === sk.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = sk;
        return next;
      }
      return [...prev, sk];
    });
  };

  const deleteSkill = (id: string) => {
    setSkills(prev => prev.filter(s => s.id !== id));
  };

  // Achievement CRUD
  const saveAchievement = (ach: AchievementItem) => {
    setAchievements(prev => {
      const idx = prev.findIndex(a => a.id === ach.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = ach;
        return next;
      }
      return [ach, ...prev];
    });
  };

  const deleteAchievement = (id: string) => {
    setAchievements(prev => prev.filter(a => a.id !== id));
  };

  // Gallery CRUD
  const saveGalleryItem = (item: GalleryItem) => {
    setGallery(prev => {
      const idx = prev.findIndex(g => g.id === item.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = item;
        return next;
      }
      return [item, ...prev];
    });
  };

  const deleteGalleryItem = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  // Messages CRUD
  const addMessage = (msg: Omit<ContactMessage, 'id' | 'date' | 'read'>) => {
    const newMessage: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      read: false,
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  const markMessageRead = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
  };

  // Export / Import / Reset
  const resetToDefaults = () => {
    setProfile(initialProfile);
    setEducation(initialEducation);
    setSkills(initialSkills);
    setProjects(initialProjects);
    setServices(initialServices);
    setExperience(initialExperience);
    setAchievements(initialAchievements);
    setBlogPosts(initialBlogPosts);
    setGallery(initialGallery);
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.EDUCATION);
    localStorage.removeItem(STORAGE_KEYS.SKILLS);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.EXPERIENCE);
    localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
    localStorage.removeItem(STORAGE_KEYS.BLOG);
    localStorage.removeItem(STORAGE_KEYS.GALLERY);
  };

  const exportDataJson = (): string => {
    const exportBundle = {
      profile,
      education,
      skills,
      projects,
      services,
      experience,
      achievements,
      blogPosts,
      gallery,
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(exportBundle, null, 2);
  };

  const importDataJson = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.profile) setProfile(data.profile);
      if (data.education) setEducation(data.education);
      if (data.skills) setSkills(data.skills);
      if (data.projects) setProjects(data.projects);
      if (data.services) setServices(data.services);
      if (data.experience) setExperience(data.experience);
      if (data.achievements) setAchievements(data.achievements);
      if (data.blogPosts) setBlogPosts(data.blogPosts);
      if (data.gallery) setGallery(data.gallery);
      return true;
    } catch (e) {
      console.error('Import failed', e);
      return false;
    }
  };

  return (
    <DataContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        isSearchOpen,
        setIsSearchOpen,
        isAdminOpen,
        setIsAdminOpen,
        selectedArticleId,
        setSelectedArticleId,
        selectedProjectId,
        setSelectedProjectId,
        profile,
        education,
        skills,
        projects,
        services,
        experience,
        achievements,
        blogPosts,
        gallery,
        messages,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        updateAdminPassword,
        updateProfile,
        saveProject,
        deleteProject,
        saveService,
        deleteService,
        saveBlogPost,
        deleteBlogPost,
        saveExperience,
        deleteExperience,
        saveEducation,
        deleteEducation,
        saveSkill,
        deleteSkill,
        saveAchievement,
        deleteAchievement,
        saveGalleryItem,
        deleteGalleryItem,
        addMessage,
        markMessageRead,
        deleteMessage,
        resetToDefaults,
        exportDataJson,
        importDataJson,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
