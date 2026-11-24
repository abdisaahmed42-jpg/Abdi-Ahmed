import React from 'react';
import { useData } from '../../context/DataContext';
import { Briefcase, Calendar, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

export const ExperienceView: React.FC = () => {
  const { experience, setCurrentPage } = useData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 tracking-wider uppercase">
          <span>ABDA NET</span>
          <span aria-hidden="true">·</span>
          <span>Career Track Record</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Work & Professional Experience
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          Over a decade of leadership in telecommunications, banking software systems, and high-concurrency enterprise applications.
        </p>
      </div>

      {/* Experience Timeline */}
      <div className="relative border-l border-slate-800 ml-4 sm:ml-8 space-y-12">
        {experience.map(exp => (
          <div key={exp.id} className="relative pl-8 sm:pl-12 group">
            {/* Timeline node */}
            <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 transition-all ${
              exp.current
                ? 'bg-blue-600 border-white shadow-md shadow-blue-500/50'
                : 'bg-slate-900 border-slate-700'
            }`} />

            {/* Content Card */}
            <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      {exp.role}
                    </h2>
                    {exp.current && (
                      <span className="text-[11px] font-semibold text-blue-400 bg-blue-950/70 border border-blue-900/60 px-2.5 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-base font-semibold text-blue-400 mt-1">
                    {exp.company}
                  </p>
                </div>

                <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-1.5 text-xs text-slate-400 shrink-0">
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-950 rounded-lg border border-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>{exp.period}</span>
                  </span>
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-950 rounded-lg border border-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{exp.location}</span>
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {exp.summary}
              </p>

              {/* Quantified Achievements */}
              <div className="space-y-2.5 pt-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Key Achievements & Quantified Outcomes
                </p>
                <div className="space-y-2">
                  {exp.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Used */}
              <div className="pt-4 border-t border-slate-800/80">
                <p className="text-xs font-semibold text-slate-400 mb-2">Technologies & Architecture</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map(tech => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation footer */}
      <div className="pt-8 border-t border-slate-800/80 flex items-center justify-between">
        <button
          onClick={() => setCurrentPage('portfolio')}
          className="text-sm font-semibold text-blue-400 hover:text-blue-300 cursor-pointer flex items-center gap-1.5"
        >
          <span>View Related Portfolio Deployments</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => setCurrentPage('cv')}
          className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
        >
          Download Official CV
        </button>
      </div>
    </div>
  );
};
