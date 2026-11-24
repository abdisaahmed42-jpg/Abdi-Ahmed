import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { PageView } from '../types';
import {
  Search,
  Lock,
  Menu,
  X,
  ChevronDown,
  Download,
  Mail,
  User,
  GraduationCap,
  Wrench,
  Briefcase,
  Layers,
  Award,
  BookOpen,
  Image as ImageIcon,
  Share2,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage, setIsSearchOpen, setIsAdminOpen, isAdminAuthenticated } = useData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const handleNavClick = (page: PageView) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  };

  const primaryNavItems: { label: string; page: PageView }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Portfolio', page: 'portfolio' },
    { label: 'Services', page: 'services' },
    { label: 'Experience', page: 'experience' },
    { label: 'Blog', page: 'blog' },
  ];

  const moreNavItems: { label: string; page: PageView; icon: React.ElementType }[] = [
    { label: 'My Profile', page: 'profile', icon: User },
    { label: 'Education', page: 'education', icon: GraduationCap },
    { label: 'Skills', page: 'skills', icon: Wrench },
    { label: 'Achievements', page: 'achievements', icon: Award },
    { label: 'Media Gallery', page: 'gallery', icon: ImageIcon },
    { label: 'Curriculum Vitae', page: 'cv', icon: Download },
    { label: 'Social Channels', page: 'social', icon: Share2 },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element wordmark as per Top Bar Contract) */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-2xl font-extrabold tracking-tight text-white hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 group text-left cursor-pointer"
        >
          <span>ABDA NET</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:scale-125 transition-transform" />
        </button>

        {/* Zone 2: 4–5 clean single-line nav links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          {primaryNavItems.map(item => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-white cursor-pointer relative py-1 ${
                  isActive ? 'text-blue-400 font-semibold' : 'text-slate-300'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
                )}
              </button>
            );
          })}

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              onBlur={() => setTimeout(() => setMoreDropdownOpen(false), 200)}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-slate-300 py-1"
            >
              <span>Explore</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {moreDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50">
                {moreNavItems.map(item => {
                  const Icon = item.icon;
                  const isCurrent = currentPage === item.page;
                  return (
                    <button
                      key={item.page}
                      onClick={() => handleNavClick(item.page)}
                      className={`w-full text-left px-4 py-2.5 text-xs font-medium flex items-center gap-3 transition-colors hover:bg-slate-800 cursor-pointer ${
                        isCurrent ? 'text-blue-400 bg-slate-800/60 font-semibold' : 'text-slate-200'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Zone 3: 1 Primary Action + Quick Utilities */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Search */}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search website"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors cursor-pointer"
            title="Search (Cmd+K)"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Admin Lock Button */}
          <button
            onClick={() => setIsAdminOpen(true)}
            aria-label="Admin Portal"
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              isAdminAuthenticated
                ? 'text-blue-400 bg-blue-950/60 border border-blue-800 hover:bg-blue-900/80'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
            title={isAdminAuthenticated ? 'Admin Dashboard (Active)' : 'Admin Login'}
          >
            <Lock className="w-4 h-4" />
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => handleNavClick('contact')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shadow-sm cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-4 max-h-[85vh] overflow-y-auto">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Navigation</span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              className="flex items-center gap-1.5 text-xs text-blue-400 bg-blue-950/40 px-3 py-1.5 rounded-md border border-blue-900/60"
            >
              <Search className="w-3 h-3" />
              <span>Search site</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {[...primaryNavItems, ...moreNavItems].map(item => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-slate-300 bg-slate-900/60 hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center gap-3">
            <button
              onClick={() => handleNavClick('cv')}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>Download CV</span>
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
