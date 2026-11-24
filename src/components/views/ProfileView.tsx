import React from 'react';
import { useData } from '../../context/DataContext';
import {
  User,
  Briefcase,
  Globe,
  Award,
  CheckCircle,
  Download,
  Mail,
  Shield,
  Layers,
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { profile, setCurrentPage } = useData();

  const profilePillars = [
    {
      label: 'Strategic Architecture',
      desc: 'Formulating high-level multi-cloud blueprints, microservices decompositions, and zero-trust security postures for tier-1 institutions.'
    },
    {
      label: 'Executive Advisory',
      desc: 'Guiding boards, C-suite executives, and startup founders on technical roadmap viability, vendor audits, and talent acquisition.'
    },
    {
      label: 'FinTech Engineering',
      desc: 'Deep specialization in payment gateways, mobile money rails, event-sourced transaction ledgers, and regulatory compliance.'
    },
    {
      label: 'Engineering Leadership',
      desc: 'Building, mentoring, and leading cross-functional teams of software architects, full-stack engineers, and site reliability engineers.'
    }
  ];

  const languages = [
    { name: 'Somali', level: 'Native / Bilingual' },
    { name: 'English', level: 'Professional Full Working Proficiency' },
    { name: 'Arabic', level: 'Working Proficiency' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 tracking-wider uppercase">
          <span>ABDA NET</span>
          <span aria-hidden="true">·</span>
          <span>Personal & Professional Dossier</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Executive Profile
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          Comprehensive summary of executive leadership, software engineering mastery, and industry specialization.
        </p>
      </div>

      {/* Main Profile Summary Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shrink-0">
              <img
                src={profile.heroImage}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
              <p className="text-sm text-blue-400 font-medium">{profile.title}</p>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                <span>Domain: {profile.domain}</span>
                <span>·</span>
                <span>{profile.location}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrentPage('cv')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>Full CV</span>
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact</span>
            </button>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Executive Profile Summary</h3>
          <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
            {profile.summary}
          </p>
          <p className="text-slate-400 leading-relaxed text-sm">
            Throughout his distinguished career, Abdi Ahmed Sharif has combined deep low-level computing principles with high-level business acumen. He has delivered critical projects across East Africa, Europe, and the Middle East, transforming mission-critical platforms with rigorous microservices, CI/CD pipelines, and high-concurrency payment integrations.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
          {profilePillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1.5"
            >
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{pillar.label}</span>
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed pl-6">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Languages & Operational Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-400" />
            <span>Spoken & Professional Languages</span>
          </h3>
          <div className="space-y-3">
            {languages.map(lang => (
              <div
                key={lang.name}
                className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs"
              >
                <span className="font-semibold text-white">{lang.name}</span>
                <span className="text-slate-400">{lang.level}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-400" />
            <span>Advisory & Governance Profile</span>
          </h3>
          <div className="space-y-2 text-xs text-slate-300">
            <p className="p-2.5 bg-slate-950/50 rounded-lg border border-slate-800/60">
              <strong className="text-white block mb-0.5">Board-Level Technology Advisory:</strong>
              Providing impartial counsel on vendor selection, cloud expenditure governance, and architectural resilience.
            </p>
            <p className="p-2.5 bg-slate-950/50 rounded-lg border border-slate-800/60">
              <strong className="text-white block mb-0.5">Zero-Trust Cybersecurity Governance:</strong>
              Aligning engineering protocols with ISO 27001, SOC2, and regional central bank regulatory directives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
