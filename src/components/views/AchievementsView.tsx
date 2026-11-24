import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { AchievementItem } from '../../types';
import { Award, ShieldCheck, CheckCircle2, Calendar, X, ExternalLink, Sparkles } from 'lucide-react';

export const AchievementsView: React.FC = () => {
  const { achievements, setCurrentPage } = useData();
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementItem | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 tracking-wider uppercase">
          <span>ABDA NET</span>
          <span aria-hidden="true">·</span>
          <span>Honors & Credentials</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Achievements, Awards & Certifications
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          Recognized by international cloud bodies, government ministries, and regional technology forums for software engineering leadership.
        </p>
      </div>

      {/* Grid of Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map(ach => (
          <div
            key={ach.id}
            onClick={() => setSelectedAchievement(ach)}
            className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-blue-900/70 transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-blue-950/70 border border-blue-900/60 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 bg-slate-950 rounded-lg text-xs font-medium text-slate-400 border border-slate-800">
                  {ach.year}
                </span>
              </div>

              <div>
                <span className="text-xs font-semibold text-blue-400 block mb-1">
                  {ach.category}
                </span>
                <h2 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                  {ach.title}
                </h2>
                <p className="text-xs font-medium text-slate-400 mt-1">
                  {ach.issuer}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {ach.description}
              </p>
            </div>

            <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs">
              {ach.credentialId ? (
                <span className="font-mono text-slate-500 text-[11px]">
                  ID: {ach.credentialId}
                </span>
              ) : (
                <span className="text-slate-500">Verified Milestone</span>
              )}
              <span className="text-blue-400 font-semibold group-hover:underline">
                View Details →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Modal */}
      {selectedAchievement && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedAchievement.title}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedAchievement(null)}
        >
          <div
            className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative space-y-6"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedAchievement(null)}
              className="absolute top-5 right-5 p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  {selectedAchievement.category} Verification
                </span>
                <h3 className="text-xl font-bold text-white">
                  {selectedAchievement.title}
                </h3>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <p className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-500">Conferred / Issued By:</span>
                <span className="font-semibold text-white">{selectedAchievement.issuer}</span>
              </p>
              <p className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-500">Year Conferred:</span>
                <span className="font-semibold text-white">{selectedAchievement.year}</span>
              </p>
              {selectedAchievement.credentialId && (
                <p className="flex justify-between py-2 border-b border-slate-800">
                  <span className="text-slate-500">Credential Reference:</span>
                  <span className="font-mono text-blue-400">{selectedAchievement.credentialId}</span>
                </p>
              )}
            </div>

            <p className="text-xs text-slate-400 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
              {selectedAchievement.description}
            </p>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedAchievement(null)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Close Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
