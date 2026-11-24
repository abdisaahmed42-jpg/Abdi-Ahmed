import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ProjectItem } from '../../types';
import { ExternalLink, Github, CheckCircle2, X, ArrowRight, Layers, Calendar, User } from 'lucide-react';

export const PortfolioView: React.FC = () => {
  const { projects, selectedProjectId, setSelectedProjectId, setCurrentPage } = useData();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Enterprise Software',
    'Cloud Architecture',
    'FinTech & Payments',
    'Mobile & Web',
  ];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const activeProject = selectedProjectId
    ? projects.find(p => p.id === selectedProjectId) || null
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 tracking-wider uppercase">
          <span>ABDA NET</span>
          <span aria-hidden="true">·</span>
          <span>Selected Works & Deployments</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Portfolio & Case Studies
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          Mission-critical systems, distributed financial engines, cloud automation platforms, and citizen service portals architected by Abdi Ahmed Sharif.
        </p>
      </div>

      {/* Category Filter Controls */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl w-fit">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map(proj => (
          <div
            key={proj.id}
            className="rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all overflow-hidden flex flex-col group cursor-pointer"
            onClick={() => setSelectedProjectId(proj.id)}
          >
            <div className="relative aspect-video overflow-hidden bg-slate-950">
              <img
                src={proj.image}
                alt={proj.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-slate-950/80 backdrop-blur-md text-xs font-medium text-slate-300 rounded-lg border border-slate-800">
                  {proj.year}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs font-semibold text-blue-400 block mb-1">
                  {proj.category}
                </span>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                  {proj.title}
                </h3>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-sm text-slate-300 leading-relaxed">
                {proj.summary}
              </p>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs font-medium text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{proj.metrics}</span>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex flex-wrap gap-2 text-slate-400">
                  {proj.tags.slice(0, 3).map(tag => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>
                <span className="text-blue-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>View Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox / Case Study Modal */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeProject.title}
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedProjectId(null)}
        >
          <div
            className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
              <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>{activeProject.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400">{activeProject.year}</span>
              </div>
              <button
                onClick={() => setSelectedProjectId(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scroll Content */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {activeProject.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-blue-400" />
                    <span>Client: <strong className="text-slate-200">{activeProject.client}</strong></span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>Year: {activeProject.year}</span>
                  </span>
                </div>
              </div>

              <div className="p-4 bg-blue-950/30 border border-blue-900/60 rounded-2xl text-xs sm:text-sm text-blue-200 flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Impact Result: <strong className="text-white">{activeProject.metrics}</strong></span>
              </div>

              <div className="space-y-3">
                <h3 className="text-base font-bold text-white">Architectural Overview</h3>
                <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                  {activeProject.fullDescription}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-300 mb-2">Technologies & Architecture Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {activeProject.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <span>Live Platform Preview</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Architecture Repository</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => {
                    setSelectedProjectId(null);
                    setCurrentPage('contact');
                  }}
                  className="text-xs font-semibold text-blue-400 hover:text-white"
                >
                  Request Similar Architecture →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
