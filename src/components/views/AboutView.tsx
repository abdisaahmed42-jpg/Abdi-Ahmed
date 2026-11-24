import React from 'react';
import { useData } from '../../context/DataContext';
import { Heart, Compass, CheckCircle2, Award, ArrowRight } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { profile, setCurrentPage } = useData();

  const coreValues = [
    {
      title: 'Architectural Rigor',
      description: 'Designing systems with clean boundaries, high fault-tolerance, and scalable foundations rather than quick technical debt.'
    },
    {
      title: 'People-First Leadership',
      description: 'Fostering collaborative cultures of ownership, continuous peer review, and empowering local engineering talent.'
    },
    {
      title: 'Sovereign Digital Infrastructure',
      description: 'Championing reliable, accessible digital public goods and financial rails that empower developing economies.'
    },
    {
      title: 'Relentless Curiosity',
      description: 'Constantly interrogating emerging paradigms—from decentralized protocols to modern cloud-native edge computing.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Top Section Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 tracking-wider uppercase">
          <span>ABDA NET</span>
          <span aria-hidden="true">·</span>
          <span>About The Founder</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          About Abdi Ahmed Sharif
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          Technology strategist, distributed systems architect, and executive leader with over a decade of dedication to digital engineering excellence.
        </p>
      </div>

      {/* Main Biography Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-6 text-slate-300 leading-relaxed text-base">
          <h2 className="text-2xl font-bold text-white">
            Professional Biography
          </h2>
          <p>
            {profile.aboutBio}
          </p>
          <p>
            Over the past decade, Abdi has worked closely with financial institutions, telecommunications carriers, and governmental bodies to replace fragile monolithic software with modular, cloud-resilient architectures. His architectural philosophy centers on partition tolerance, strict idempotency, and minimizing mean time to recovery (MTTR).
          </p>
          <p>
            As the founder of <strong className="text-white">ABDA NET</strong> (operating via <a href="https://abdanet.com" className="text-blue-400 hover:underline">Abdanet.com</a>), Abdi advises leadership teams and directs hands-on engineering sprints that translate high-level strategic goals into bulletproof production software.
          </p>

          <h3 className="text-xl font-bold text-white pt-6">
            Personal Background & Roots
          </h3>
          <p>
            {profile.personalBackground}
          </p>
          <p>
            Abdi believes that software engineering in Africa is in the midst of an unprecedented leapfrog era. By leveraging modern cloud ecosystems, open standards, and containerized deployment pipelines, sovereign institutions can deploy enterprise-grade infrastructure without being tethered to outdated legacy systems.
          </p>
        </div>

        {/* Visual Frame & Snapshot */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl aspect-square">
            <img
              src={profile.heroImage}
              alt={profile.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top"
            />
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-400" />
              <span>Executive Quick Facts</span>
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-500">Name:</span>
                <span className="text-slate-200 font-medium">{profile.name}</span>
              </p>
              <p className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-500">Primary Domain:</span>
                <span className="text-blue-400 font-medium">{profile.domain}</span>
              </p>
              <p className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-500">Base Location:</span>
                <span className="text-slate-200 font-medium">{profile.location}</span>
              </p>
              <p className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-500">Experience:</span>
                <span className="text-slate-200 font-medium">{profile.yearsExperience}+ Years</span>
              </p>
              <p className="flex justify-between py-1">
                <span className="text-slate-500">Availability:</span>
                <span className="text-emerald-400 font-medium">Open for Advisory</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="space-y-6 pt-8 border-t border-slate-900">
        <div>
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Principles</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Core Values & Engineering Philosophy</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coreValues.map((val, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2"
            >
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="text-blue-400 font-mono text-sm">0{idx + 1}.</span>
                <span>{val.title}</span>
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Interests (User requested: interests) */}
      <div className="space-y-6 pt-8 border-t border-slate-900">
        <div>
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Beyond The Code</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Personal Interests & Passions</h2>
          <p className="text-sm text-slate-400 max-w-2xl mt-1">
            Areas of personal curiosity, ongoing study, and community engagement outside of day-to-day engineering leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {profile.interests.map((interest, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-center gap-3 text-sm text-slate-200"
            >
              <Heart className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{interest}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Navigation Footer */}
      <div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => setCurrentPage('profile')}
          className="text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 cursor-pointer"
        >
          <span>Explore My Profile</span>
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => setCurrentPage('contact')}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
        >
          Start a Conversation
        </button>
      </div>
    </div>
  );
};
