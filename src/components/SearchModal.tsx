import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';
import { PageView } from '../types';
import { Search, X, ArrowRight, BookOpen, Layers, Briefcase, GraduationCap, Award, Wrench } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    setCurrentPage,
    setSelectedArticleId,
    setSelectedProjectId,
    projects,
    services,
    blogPosts,
    experience,
    education,
    skills,
    achievements,
  } = useData();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Global keyboard shortcut: Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  // Search Results
  const matchedProjects = normalizedQuery
    ? projects.filter(
        p =>
          p.title.toLowerCase().includes(normalizedQuery) ||
          p.summary.toLowerCase().includes(normalizedQuery) ||
          p.tags.some(t => t.toLowerCase().includes(normalizedQuery))
      )
    : [];

  const matchedBlogPosts = normalizedQuery
    ? blogPosts.filter(
        b =>
          b.title.toLowerCase().includes(normalizedQuery) ||
          b.excerpt.toLowerCase().includes(normalizedQuery) ||
          b.tags.some(t => t.toLowerCase().includes(normalizedQuery))
      )
    : [];

  const matchedServices = normalizedQuery
    ? services.filter(
        s =>
          s.title.toLowerCase().includes(normalizedQuery) ||
          s.shortDesc.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const matchedSkills = normalizedQuery
    ? skills.filter(
        s =>
          s.name.toLowerCase().includes(normalizedQuery) ||
          s.category.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const matchedExperience = normalizedQuery
    ? experience.filter(
        e =>
          e.role.toLowerCase().includes(normalizedQuery) ||
          e.company.toLowerCase().includes(normalizedQuery) ||
          e.summary.toLowerCase().includes(normalizedQuery)
      )
    : [];

  const totalResults =
    matchedProjects.length +
    matchedBlogPosts.length +
    matchedServices.length +
    matchedSkills.length +
    matchedExperience.length;

  const navigateTo = (page: PageView, action?: () => void) => {
    setIsSearchOpen(false);
    setCurrentPage(page);
    if (action) action();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search site"
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search projects, services, articles, skills, experience..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none text-base"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-200 p-1"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 rounded border border-slate-700">
            ESC
          </kbd>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {!normalizedQuery && (
            <div className="py-8 text-center text-slate-400 text-sm">
              <p>Type to search across ABDA NET</p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
                <span className="text-slate-500">Suggested:</span>
                {['FinTech', 'Cloud Architecture', 'TypeScript', 'Kubernetes', 'Consulting'].map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-md transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {normalizedQuery && totalResults === 0 && (
            <div className="py-12 text-center text-slate-400 text-sm">
              <p>No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-slate-500 mt-1">Try another keyword or category.</p>
            </div>
          )}

          {/* Matched Projects */}
          {matchedProjects.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-blue-400" />
                <span>Projects ({matchedProjects.length})</span>
              </p>
              <div className="space-y-1.5">
                {matchedProjects.map(proj => (
                  <button
                    key={proj.id}
                    onClick={() =>
                      navigateTo('portfolio', () => setSelectedProjectId(proj.id))
                    }
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-200 group-hover:text-blue-400">
                        {proj.title}
                      </p>
                      <p className="text-xs text-slate-400 line-clamp-1">{proj.summary}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Blog Posts */}
          {matchedBlogPosts.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                <span>Articles & Insights ({matchedBlogPosts.length})</span>
              </p>
              <div className="space-y-1.5">
                {matchedBlogPosts.map(post => (
                  <button
                    key={post.id}
                    onClick={() =>
                      navigateTo('blog', () => setSelectedArticleId(post.id))
                    }
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-200 group-hover:text-blue-400">
                        {post.title}
                      </p>
                      <p className="text-xs text-slate-400 line-clamp-1">{post.excerpt}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Services */}
          {matchedServices.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Wrench className="w-3.5 h-3.5 text-blue-400" />
                <span>Services ({matchedServices.length})</span>
              </p>
              <div className="space-y-1.5">
                {matchedServices.map(serv => (
                  <button
                    key={serv.id}
                    onClick={() => navigateTo('services')}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-200 group-hover:text-blue-400">
                        {serv.title}
                      </p>
                      <p className="text-xs text-slate-400 line-clamp-1">{serv.shortDesc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Skills */}
          {matchedSkills.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Wrench className="w-3.5 h-3.5 text-blue-400" />
                <span>Skills & Competencies ({matchedSkills.length})</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {matchedSkills.map(sk => (
                  <button
                    key={sk.id}
                    onClick={() => navigateTo('skills')}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700/60 rounded-lg text-xs font-medium text-slate-200 transition-colors cursor-pointer"
                  >
                    {sk.name} <span className="text-slate-400 text-[10px]">({sk.proficiency}%)</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched Experience */}
          {matchedExperience.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                <span>Work Experience ({matchedExperience.length})</span>
              </p>
              <div className="space-y-1.5">
                {matchedExperience.map(exp => (
                  <button
                    key={exp.id}
                    onClick={() => navigateTo('experience')}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800/80 transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-200 group-hover:text-blue-400">
                        {exp.role} · <span className="text-slate-400 font-normal">{exp.company}</span>
                      </p>
                      <p className="text-xs text-slate-400 line-clamp-1">{exp.summary}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
