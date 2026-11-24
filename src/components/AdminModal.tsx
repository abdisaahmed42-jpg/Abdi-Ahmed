import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import {
  X,
  Lock,
  LogOut,
  Save,
  Trash2,
  Plus,
  Edit,
  Download,
  Upload,
  RotateCcw,
  CheckCircle,
  MessageSquare,
  Layers,
  Wrench,
  BookOpen,
  Briefcase,
  GraduationCap,
  Award,
  Image as ImageIcon,
  KeyRound,
} from 'lucide-react';
import { ProjectItem, ServiceItem, BlogPostItem, ExperienceItem, EducationItem, SkillItem, AchievementItem, GalleryItem } from '../types';

export const AdminModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    isAdminAuthenticated,
    adminLogin,
    adminLogout,
    updateAdminPassword,
    profile,
    updateProfile,
    projects,
    saveProject,
    deleteProject,
    services,
    saveService,
    deleteService,
    blogPosts,
    saveBlogPost,
    deleteBlogPost,
    experience,
    saveExperience,
    deleteExperience,
    education,
    saveEducation,
    deleteEducation,
    skills,
    saveSkill,
    deleteSkill,
    achievements,
    saveAchievement,
    deleteAchievement,
    gallery,
    saveGalleryItem,
    deleteGalleryItem,
    messages,
    markMessageRead,
    deleteMessage,
    resetToDefaults,
    exportDataJson,
    importDataJson,
  } = useData();

  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'services' | 'blog' | 'experience' | 'skills' | 'gallery' | 'messages' | 'backup'>('profile');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Profile Form state
  const [profileForm, setProfileForm] = useState(profile);

  // Selected item for editing
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [editingPost, setEditingPost] = useState<BlogPostItem | null>(null);

  // New Password state
  const [newPassword, setNewPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState('');

  if (!isAdminOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(passwordInput)) {
      setLoginError('');
      setPasswordInput('');
      setProfileForm(profile);
    } else {
      setLoginError('Invalid administrator passphrase. Please try again.');
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    showNotice('Profile information updated successfully!');
  };

  const showNotice = (msg: string) => {
    setSaveStatus(msg);
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleDownloadBackup = () => {
    const jsonStr = exportDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `abdanet_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotice('Backup downloaded successfully!');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      const content = evt.target?.result as string;
      if (content && importDataJson(content)) {
        showNotice('Website content imported successfully!');
      } else {
        alert('Failed to parse backup JSON. Please check file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Admin Control Panel"
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
    >
      <div className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>ABDA NET Content Management Portal</span>
                {isAdminAuthenticated && (
                  <span className="text-[11px] font-normal text-emerald-400">Authenticated</span>
                )}
              </h2>
              <p className="text-xs text-slate-400">Website: Abdanet.com · Owner: Abdi Ahmed Sharif</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <button
                onClick={adminLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAdminAuthenticated ? (
          /* Login Screen */
          <div className="p-8 sm:p-12 max-w-md mx-auto w-full text-center space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Administrator Access</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enter your administrative passphrase to manage profile details, projects, articles, credentials, and visitor inquiries.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Admin Passphrase
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  placeholder="Enter administrator passphrase"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  autoFocus
                />
              </div>

              {loginError && <p className="text-xs text-rose-400">{loginError}</p>}

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                Access Dashboard
              </button>
            </form>

            <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-[11px] text-slate-400 text-left">
              <span className="font-semibold text-slate-300">Default Access Passphrase:</span>{' '}
              <code className="text-blue-400 font-mono">abdanet2026</code>
              <p className="mt-1 text-slate-500">
                You can change this passphrase at any time in the dashboard settings tab.
              </p>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Tabs */}
            <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-950/40 p-2 sm:p-3 space-y-1 overflow-x-auto md:overflow-y-auto flex md:flex-col shrink-0">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer shrink-0 ${
                  activeTab === 'profile'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Profile & Identity</span>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer shrink-0 ${
                  activeTab === 'projects'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Projects ({projects.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer shrink-0 ${
                  activeTab === 'services'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <Wrench className="w-4 h-4" />
                <span>Services ({services.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('blog')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer shrink-0 ${
                  activeTab === 'blog'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Articles ({blogPosts.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('experience')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer shrink-0 ${
                  activeTab === 'experience'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Experience ({experience.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('skills')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer shrink-0 ${
                  activeTab === 'skills'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Skills & Honors</span>
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer shrink-0 ${
                  activeTab === 'gallery'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Gallery ({gallery.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between transition-colors cursor-pointer shrink-0 ${
                  activeTab === 'messages'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4" />
                  <span>Inquiries</span>
                </div>
                {messages.filter(m => !m.read).length > 0 && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-blue-400 text-slate-950">
                    {messages.filter(m => !m.read).length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('backup')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2.5 transition-colors cursor-pointer shrink-0 ${
                  activeTab === 'backup'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>Backup & Security</span>
              </button>
            </div>

            {/* Main Editor Pane */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-900/50">
              {saveStatus && (
                <div className="mb-4 p-3 bg-emerald-950/60 border border-emerald-800/70 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{saveStatus}</span>
                </div>
              )}

              {/* 1. Profile Editor */}
              {activeTab === 'profile' && (
                <form onSubmit={handleSaveProfile} className="space-y-5 max-w-3xl">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <h4 className="text-base font-semibold text-white">Profile & Contact Information</h4>
                      <p className="text-xs text-slate-400">Manage identity, headlines, contact channels, and key stats</p>
                    </div>
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer shadow-sm"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Owner Full Name</label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Professional Title</label>
                      <input
                        type="text"
                        value={profileForm.title}
                        onChange={e => setProfileForm({ ...profileForm, title: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Primary Email</label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={profileForm.phone}
                        onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Location</label>
                      <input
                        type="text"
                        value={profileForm.location}
                        onChange={e => setProfileForm({ ...profileForm, location: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Hero Tagline</label>
                    <input
                      type="text"
                      value={profileForm.tagline}
                      onChange={e => setProfileForm({ ...profileForm, tagline: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Executive Summary</label>
                    <textarea
                      rows={3}
                      value={profileForm.summary}
                      onChange={e => setProfileForm({ ...profileForm, summary: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Full Biography (About Me)</label>
                    <textarea
                      rows={4}
                      value={profileForm.aboutBio}
                      onChange={e => setProfileForm({ ...profileForm, aboutBio: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Years Experience</label>
                      <input
                        type="number"
                        value={profileForm.yearsExperience}
                        onChange={e => setProfileForm({ ...profileForm, yearsExperience: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Completed Projects</label>
                      <input
                        type="number"
                        value={profileForm.completedProjects}
                        onChange={e => setProfileForm({ ...profileForm, completedProjects: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Enterprise Clients</label>
                      <input
                        type="number"
                        value={profileForm.enterpriseClients}
                        onChange={e => setProfileForm({ ...profileForm, enterpriseClients: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Satisfaction Rate (%)</label>
                      <input
                        type="number"
                        value={profileForm.satisfactionRate}
                        onChange={e => setProfileForm({ ...profileForm, satisfactionRate: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-xs font-semibold text-slate-300 mb-2">Social Channels</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400">LinkedIn URL:</span>
                        <input
                          type="text"
                          value={profileForm.socials.linkedin}
                          onChange={e =>
                            setProfileForm({
                              ...profileForm,
                              socials: { ...profileForm.socials, linkedin: e.target.value },
                            })
                          }
                          className="mt-1 w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-md text-white"
                        />
                      </div>
                      <div>
                        <span className="text-slate-400">Telegram URL:</span>
                        <input
                          type="text"
                          value={profileForm.socials.telegram}
                          onChange={e =>
                            setProfileForm({
                              ...profileForm,
                              socials: { ...profileForm.socials, telegram: e.target.value },
                            })
                          }
                          className="mt-1 w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-md text-white"
                        />
                      </div>
                      <div>
                        <span className="text-slate-400">Facebook URL:</span>
                        <input
                          type="text"
                          value={profileForm.socials.facebook}
                          onChange={e =>
                            setProfileForm({
                              ...profileForm,
                              socials: { ...profileForm.socials, facebook: e.target.value },
                            })
                          }
                          className="mt-1 w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-md text-white"
                        />
                      </div>
                      <div>
                        <span className="text-slate-400">YouTube URL:</span>
                        <input
                          type="text"
                          value={profileForm.socials.youtube}
                          onChange={e =>
                            setProfileForm({
                              ...profileForm,
                              socials: { ...profileForm.socials, youtube: e.target.value },
                            })
                          }
                          className="mt-1 w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-md text-white"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {/* 2. Projects Manager */}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <h4 className="text-base font-semibold text-white">Portfolio Projects</h4>
                      <p className="text-xs text-slate-400">Add, edit, or remove showcase projects</p>
                    </div>
                    <button
                      onClick={() =>
                        setEditingProject({
                          id: `proj-${Date.now()}`,
                          title: 'New Enterprise Project',
                          category: 'Enterprise Software',
                          summary: 'Executive solution summary...',
                          fullDescription: 'Comprehensive architectural description...',
                          client: 'Corporate Client',
                          year: '2026',
                          tags: ['Cloud', 'Architecture'],
                          metrics: 'High performance metrics',
                          image: '/src/assets/images/fintech_cloud_platform_1794009854756.jpg',
                          featured: false,
                        })
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add New Project</span>
                    </button>
                  </div>

                  {editingProject && (
                    <div className="p-4 bg-slate-950 border border-blue-900/60 rounded-xl space-y-3 mb-4">
                      <h5 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                        Edit Project: {editingProject.title}
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Project Title"
                          value={editingProject.title}
                          onChange={e => setEditingProject({ ...editingProject, title: e.target.value })}
                          className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                        />
                        <select
                          value={editingProject.category}
                          onChange={e => setEditingProject({ ...editingProject, category: e.target.value as any })}
                          className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                        >
                          <option value="Enterprise Software">Enterprise Software</option>
                          <option value="Cloud Architecture">Cloud Architecture</option>
                          <option value="FinTech & Payments">FinTech & Payments</option>
                          <option value="Mobile & Web">Mobile & Web</option>
                        </select>
                      </div>
                      <textarea
                        placeholder="Short Summary"
                        rows={2}
                        value={editingProject.summary}
                        onChange={e => setEditingProject({ ...editingProject, summary: e.target.value })}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white resize-none"
                      />
                      <textarea
                        placeholder="Full Description & Architecture"
                        rows={3}
                        value={editingProject.fullDescription}
                        onChange={e => setEditingProject({ ...editingProject, fullDescription: e.target.value })}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Client Name"
                          value={editingProject.client}
                          onChange={e => setEditingProject({ ...editingProject, client: e.target.value })}
                          className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Year (e.g. 2026)"
                          value={editingProject.year}
                          onChange={e => setEditingProject({ ...editingProject, year: e.target.value })}
                          className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Tags (comma-separated)"
                          value={editingProject.tags.join(', ')}
                          onChange={e =>
                            setEditingProject({
                              ...editingProject,
                              tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean),
                            })
                          }
                          className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                        />
                      </div>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingProject.featured}
                            onChange={e => setEditingProject({ ...editingProject, featured: e.target.checked })}
                          />
                          <span>Feature on Homepage</span>
                        </label>
                      </div>
                      <div className="flex items-center justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setEditingProject(null)}
                          className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            saveProject(editingProject);
                            setEditingProject(null);
                            showNotice('Project saved successfully!');
                          }}
                          className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-medium"
                        >
                          Save Project
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    {projects.map(proj => (
                      <div
                        key={proj.id}
                        className="p-3.5 bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-white">{proj.title}</span>
                            <span className="text-[11px] text-blue-400 font-medium">({proj.category})</span>
                            {proj.featured && (
                              <span className="text-[10px] text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-900/60">
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{proj.summary}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => setEditingProject(proj)}
                            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete "${proj.title}"?`)) {
                                deleteProject(proj.id);
                                showNotice('Project deleted.');
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Services Manager */}
              {activeTab === 'services' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <h4 className="text-base font-semibold text-white">Services Offered</h4>
                      <p className="text-xs text-slate-400">Manage client service packages and deliverables</p>
                    </div>
                    <button
                      onClick={() =>
                        setEditingService({
                          id: `serv-${Date.now()}`,
                          title: 'New Strategic Service',
                          shortDesc: 'Brief summary of the offering...',
                          fullDesc: 'Comprehensive details on scope...',
                          deliverables: ['Custom Deliverable 1', 'Custom Deliverable 2'],
                          icon: 'Cpu',
                          engagementModel: 'Fixed Project Sprint',
                        })
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Service</span>
                    </button>
                  </div>

                  {editingService && (
                    <div className="p-4 bg-slate-950 border border-blue-900/60 rounded-xl space-y-3 mb-4">
                      <h5 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                        Edit Service: {editingService.title}
                      </h5>
                      <input
                        type="text"
                        placeholder="Service Title"
                        value={editingService.title}
                        onChange={e => setEditingService({ ...editingService, title: e.target.value })}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Short Tagline Description"
                        value={editingService.shortDesc}
                        onChange={e => setEditingService({ ...editingService, shortDesc: e.target.value })}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                      />
                      <textarea
                        placeholder="Full Scope & Details"
                        rows={3}
                        value={editingService.fullDesc}
                        onChange={e => setEditingService({ ...editingService, fullDesc: e.target.value })}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                      />
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">
                          Deliverables (one per line)
                        </label>
                        <textarea
                          rows={3}
                          value={editingService.deliverables.join('\n')}
                          onChange={e =>
                            setEditingService({
                              ...editingService,
                              deliverables: e.target.value.split('\n').filter(s => s.trim().length > 0),
                            })
                          }
                          className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                        />
                      </div>
                      <div className="flex items-center justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setEditingService(null)}
                          className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            saveService(editingService);
                            setEditingService(null);
                            showNotice('Service saved successfully!');
                          }}
                          className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-medium"
                        >
                          Save Service
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    {services.map(serv => (
                      <div
                        key={serv.id}
                        className="p-3.5 bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between gap-4"
                      >
                        <div>
                          <p className="text-sm font-semibold text-white">{serv.title}</p>
                          <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{serv.shortDesc}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => setEditingService(serv)}
                            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete service "${serv.title}"?`)) {
                                deleteService(serv.id);
                                showNotice('Service deleted.');
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Blog Posts Manager */}
              {activeTab === 'blog' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <h4 className="text-base font-semibold text-white">Articles & Publications</h4>
                      <p className="text-xs text-slate-400">Publish thought leadership articles and news updates</p>
                    </div>
                    <button
                      onClick={() =>
                        setEditingPost({
                          id: `post-${Date.now()}`,
                          title: 'New Technical Article',
                          slug: 'new-technical-article',
                          excerpt: 'Summary of the key thesis...',
                          content: 'Detailed article content written by Abdi Ahmed Sharif...',
                          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
                          readTime: '5 min read',
                          category: 'Software Architecture',
                          tags: ['Technology', 'Cloud'],
                          image: '/src/assets/images/fintech_cloud_platform_1794009854756.jpg',
                          author: profile.name,
                        })
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Write Article</span>
                    </button>
                  </div>

                  {editingPost && (
                    <div className="p-4 bg-slate-950 border border-blue-900/60 rounded-xl space-y-3 mb-4">
                      <h5 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                        Edit Article: {editingPost.title}
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Article Title"
                          value={editingPost.title}
                          onChange={e => setEditingPost({ ...editingPost, title: e.target.value })}
                          className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                        />
                        <input
                          type="text"
                          placeholder="Category (e.g. Cloud Engineering)"
                          value={editingPost.category}
                          onChange={e => setEditingPost({ ...editingPost, category: e.target.value })}
                          className="px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                        />
                      </div>
                      <textarea
                        placeholder="Short Excerpt (shown in card preview)"
                        rows={2}
                        value={editingPost.excerpt}
                        onChange={e => setEditingPost({ ...editingPost, excerpt: e.target.value })}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white resize-none"
                      />
                      <textarea
                        placeholder="Full Article Content (supports Markdown syntax)"
                        rows={6}
                        value={editingPost.content}
                        onChange={e => setEditingPost({ ...editingPost, content: e.target.value })}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white font-mono"
                      />
                      <div className="flex items-center justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setEditingPost(null)}
                          className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            saveBlogPost(editingPost);
                            setEditingPost(null);
                            showNotice('Article published successfully!');
                          }}
                          className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-medium"
                        >
                          Save Article
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    {blogPosts.map(post => (
                      <div
                        key={post.id}
                        className="p-3.5 bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between gap-4"
                      >
                        <div>
                          <p className="text-sm font-semibold text-white">{post.title}</p>
                          <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{post.excerpt}</p>
                          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                            <span>{post.date}</span>
                            <span>·</span>
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => setEditingPost(post)}
                            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete article "${post.title}"?`)) {
                                deleteBlogPost(post.id);
                                showNotice('Article removed.');
                              }
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. Experience Manager */}
              {activeTab === 'experience' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <h4 className="text-base font-semibold text-white">Work & Professional Experience</h4>
                      <p className="text-xs text-slate-400">Career milestones, executive leadership roles</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {experience.map(exp => (
                      <div
                        key={exp.id}
                        className="p-3.5 bg-slate-950 border border-slate-800/80 rounded-xl flex items-center justify-between gap-4"
                      >
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {exp.role} · <span className="text-blue-400 font-normal">{exp.company}</span>
                          </p>
                          <p className="text-xs text-slate-400 mt-0.5">{exp.period} · {exp.location}</p>
                        </div>
                        <button
                          onClick={() => {
                            if (confirm(`Remove position at "${exp.company}"?`)) {
                              deleteExperience(exp.id);
                              showNotice('Position removed.');
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. Skills & Honors */}
              {activeTab === 'skills' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-base font-semibold text-white mb-1">Key Competencies & Skills</h4>
                    <p className="text-xs text-slate-400 mb-3">Professional, architecture, and engineering proficiencies</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {skills.map(sk => (
                        <div
                          key={sk.id}
                          className="p-2.5 bg-slate-950 border border-slate-800/80 rounded-lg flex items-center justify-between text-xs"
                        >
                          <div>
                            <span className="font-medium text-slate-200">{sk.name}</span>
                            <span className="text-slate-500 block text-[10px]">{sk.category}</span>
                          </div>
                          <span className="font-mono text-blue-400 font-semibold">{sk.proficiency}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-semibold text-white mb-1">Awards & Credentials</h4>
                    <div className="space-y-2">
                      {achievements.map(ach => (
                        <div
                          key={ach.id}
                          className="p-2.5 bg-slate-950 border border-slate-800/80 rounded-lg flex items-center justify-between text-xs"
                        >
                          <div>
                            <span className="font-medium text-white">{ach.title}</span>
                            <span className="text-slate-400 block text-[11px]">{ach.issuer} ({ach.year})</span>
                          </div>
                          <span className="text-[10px] text-blue-400 px-2 py-0.5 bg-blue-950/50 rounded">
                            {ach.category}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 7. Gallery Manager */}
              {activeTab === 'gallery' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <h4 className="text-base font-semibold text-white">Media Gallery Items</h4>
                      <p className="text-xs text-slate-400">Photos and videos shown in the media showcase</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {gallery.map(item => (
                      <div
                        key={item.id}
                        className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2"
                      >
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <p className="text-xs font-semibold text-white truncate">{item.title}</p>
                        <p className="text-[11px] text-slate-400 line-clamp-1">{item.caption}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 8. Messages / Contact Inquiries */}
              {activeTab === 'messages' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <h4 className="text-base font-semibold text-white">Visitor Inquiries & Contact Form Submissions</h4>
                      <p className="text-xs text-slate-400">Direct inquiries sent via Abdanet.com</p>
                    </div>
                  </div>

                  {messages.length === 0 ? (
                    <div className="py-12 text-center text-slate-400 text-sm">
                      <p>No messages received yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map(msg => (
                        <div
                          key={msg.id}
                          className={`p-4 rounded-xl border transition-colors ${
                            msg.read
                              ? 'bg-slate-950/70 border-slate-800 text-slate-300'
                              : 'bg-blue-950/30 border-blue-900/70 text-slate-100 shadow-sm'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-white">{msg.name}</span>
                                {!msg.read && (
                                  <span className="text-[10px] bg-blue-500 text-white font-bold px-1.5 py-0.5 rounded-full">
                                    New
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-400 mt-0.5">
                                <a href={`mailto:${msg.email}`} className="text-blue-400 hover:underline">
                                  {msg.email}
                                </a>{' '}
                                · {msg.phone} · <span className="text-slate-500">{msg.date}</span>
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {!msg.read && (
                                <button
                                  onClick={() => markMessageRead(msg.id)}
                                  className="text-[11px] px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded"
                                >
                                  Mark Read
                                </button>
                              )}
                              <button
                                onClick={() => deleteMessage(msg.id)}
                                className="p-1 text-slate-400 hover:text-rose-400 rounded"
                                title="Delete inquiry"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          {msg.serviceRequested && (
                            <p className="text-[11px] text-blue-300 bg-blue-950/60 px-2 py-1 rounded inline-block mt-2 border border-blue-900/50">
                              Service Requested: {msg.serviceRequested}
                            </p>
                          )}
                          <p className="text-xs font-medium text-slate-200 mt-2">Subject: {msg.subject}</p>
                          <p className="text-xs text-slate-300 mt-1 whitespace-pre-line bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                            {msg.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* 9. Backup & Security */}
              {activeTab === 'backup' && (
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <h4 className="text-base font-semibold text-white mb-1">Passphrase & Security</h4>
                    <p className="text-xs text-slate-400 mb-3">Update your administrative dashboard passphrase</p>
                    <div className="flex items-center gap-3">
                      <input
                        type="password"
                        placeholder="Enter new administrator passphrase"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white flex-1"
                      />
                      <button
                        onClick={() => {
                          if (newPassword.trim().length >= 4) {
                            updateAdminPassword(newPassword.trim());
                            setPasswordStatus('Passphrase updated successfully!');
                            setNewPassword('');
                            setTimeout(() => setPasswordStatus(''), 3000);
                          } else {
                            alert('Passphrase should be at least 4 characters.');
                          }
                        }}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium cursor-pointer"
                      >
                        Update Passphrase
                      </button>
                    </div>
                    {passwordStatus && (
                      <p className="text-xs text-emerald-400 mt-1.5">{passwordStatus}</p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-800 space-y-4">
                    <h4 className="text-base font-semibold text-white">Content Backup & Restore</h4>
                    <p className="text-xs text-slate-400">
                      Export all ABDA NET data to a portable JSON file, or restore from a previously exported backup.
                    </p>

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={handleDownloadBackup}
                        className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium cursor-pointer"
                      >
                        <Download className="w-4 h-4 text-blue-400" />
                        <span>Export Backup (JSON)</span>
                      </button>

                      <label className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium cursor-pointer">
                        <Upload className="w-4 h-4 text-emerald-400" />
                        <span>Import Backup (JSON)</span>
                        <input
                          type="file"
                          accept=".json"
                          onChange={handleImportFile}
                          className="hidden"
                        />
                      </label>

                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to restore initial default content for Abdi Ahmed Sharif?')) {
                            resetToDefaults();
                            showNotice('Default content restored.');
                          }
                        }}
                        className="flex items-center gap-2 px-4 py-2.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-900/50 rounded-lg text-xs font-medium cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4 text-rose-400" />
                        <span>Reset to Defaults</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
