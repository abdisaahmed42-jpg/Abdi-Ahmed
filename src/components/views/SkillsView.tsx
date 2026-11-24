import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Wrench, Cloud, Code2, Users, Cpu, CheckCircle } from 'lucide-react';

export const SkillsView: React.FC = () => {
  const { skills, setCurrentPage } = useData();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Architecture & Cloud', 'Technical', 'Digital & Leadership', 'Tools & Frameworks'];

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 tracking-wider uppercase">
          <span>ABDA NET</span>
          <span aria-hidden="true">·</span>
          <span>Competency Matrix</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Professional, Technical & Digital Skills
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          Comprehensive inventory of architectural paradigms, engineering languages, cloud ecosystems, and executive management competencies.
        </p>
      </div>

      {/* Interactive Category Filter Buttons (Functional controls per constitution §1.A) */}
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

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSkills.map(skill => (
          <div
            key={skill.id}
            className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">{skill.name}</h3>
                <p className="text-xs text-blue-400 font-medium mt-0.5">{skill.category}</p>
              </div>
              <div className="text-right">
                <span className="text-base font-extrabold text-white font-mono tabular-nums">
                  {skill.proficiency}%
                </span>
                <span className="block text-[11px] text-slate-500">
                  {skill.experienceYears}+ years exp
                </span>
              </div>
            </div>

            {/* Custom Meter */}
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800/80">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-sky-400 rounded-full transition-all duration-500"
                style={{ width: `${skill.proficiency}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Domain Architecture Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-900">
        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-950 flex items-center justify-center text-blue-400 mb-2">
            <Cloud className="w-4 h-4" />
          </div>
          <h4 className="text-base font-bold text-white">Cloud Resilience</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Architecting fault-tolerant distributed infrastructure across AWS, GCP, and bare-metal Kubernetes with sub-second failover.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-950 flex items-center justify-center text-blue-400 mb-2">
            <Code2 className="w-4 h-4" />
          </div>
          <h4 className="text-base font-bold text-white">Full-Stack Polyglot</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            High-throughput backends in Go, Node.js, and Python paired with reactive, fluid user interfaces built with modern TypeScript and React.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2">
          <div className="w-8 h-8 rounded-lg bg-blue-950 flex items-center justify-center text-blue-400 mb-2">
            <Users className="w-4 h-4" />
          </div>
          <h4 className="text-base font-bold text-white">Engineering Leadership</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Transforming engineering cultures, conducting technical due diligence, establishing QA rigor, and mentoring next-generation architects.
          </p>
        </div>
      </div>
    </div>
  );
};
