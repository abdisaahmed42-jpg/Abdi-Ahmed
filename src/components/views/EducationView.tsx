import React from 'react';
import { useData } from '../../context/DataContext';
import { GraduationCap, Award, BookOpen, MapPin, Calendar, CheckCircle2 } from 'lucide-react';

export const EducationView: React.FC = () => {
  const { education, setCurrentPage } = useData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 tracking-wider uppercase">
          <span>ABDA NET</span>
          <span aria-hidden="true">·</span>
          <span>Academic Background</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Education & Qualifications
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          Rigorous academic foundation in Computer Science, Distributed Systems, Software Engineering, and Enterprise Governance.
        </p>
      </div>

      {/* Education Cards Grid */}
      <div className="space-y-8">
        {education.map((edu, idx) => (
          <div
            key={edu.id}
            className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-blue-900/60 transition-all space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-950/70 border border-blue-900/60 flex items-center justify-center text-blue-400 shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      {edu.degree}
                    </h2>
                    <p className="text-sm sm:text-base font-medium text-blue-400">
                      {edu.field}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-slate-300 pt-2">{edu.institution}</p>
              </div>

              <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 text-xs text-slate-400 shrink-0">
                <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-950 rounded-lg border border-slate-800">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  <span>{edu.period}</span>
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-950 rounded-lg border border-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{edu.location}</span>
                </span>
              </div>
            </div>

            {edu.honors && (
              <div className="p-3 bg-blue-950/40 rounded-xl border border-blue-900/50 flex items-center gap-2.5 text-xs font-semibold text-blue-300">
                <Award className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Honors: {edu.honors}</span>
              </div>
            )}

            <p className="text-sm text-slate-300 leading-relaxed">
              {edu.description}
            </p>

            {edu.highlights && edu.highlights.length > 0 && (
              <div className="pt-4 border-t border-slate-800/80 space-y-2">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Academic Milestones & Thesis Focus
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {edu.highlights.map((item, hIdx) => (
                    <div
                      key={hIdx}
                      className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Navigation */}
      <div className="pt-8 border-t border-slate-800/80 flex items-center justify-between">
        <button
          onClick={() => setCurrentPage('skills')}
          className="text-sm font-semibold text-blue-400 hover:text-blue-300 cursor-pointer"
        >
          Explore Technical & Digital Skills →
        </button>
        <button
          onClick={() => setCurrentPage('cv')}
          className="text-xs font-semibold px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors cursor-pointer"
        >
          View Formatted CV
        </button>
      </div>
    </div>
  );
};
