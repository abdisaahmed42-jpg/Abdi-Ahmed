import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  Printer,
  Download,
  Mail,
  Phone,
  MapPin,
  Globe,
  Award,
  CheckCircle,
  FileText,
  Check,
} from 'lucide-react';

export const CVView: React.FC = () => {
  const { profile, experience, education, skills, achievements } = useData();
  const [downloaded, setDownloaded] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadText = () => {
    const cvText = `
CURRICULUM VITAE
================================================================================
NAME: ${profile.name}
TITLE: ${profile.title}
DOMAIN: ${profile.domain} (https://${profile.domain})
EMAIL: ${profile.email}
PHONE: ${profile.phone}
LOCATION: ${profile.location}
AVAILABILITY: ${profile.availability}

EXECUTIVE PROFILE SUMMARY
================================================================================
${profile.summary}

${profile.aboutBio}

CORE COMPETENCIES & SKILLS
================================================================================
${skills.map(s => `• ${s.name} (${s.category}) — Proficiency: ${s.proficiency}% [${s.experienceYears}+ yrs]`).join('\n')}

PROFESSIONAL EXPERIENCE
================================================================================
${experience.map(exp => `
${exp.role.toUpperCase()}
Company: ${exp.company} | ${exp.location}
Period: ${exp.period} ${exp.current ? '(Current Position)' : ''}
Summary: ${exp.summary}
Key Achievements:
${exp.achievements.map(a => `  • ${a}`).join('\n')}
Technologies: ${exp.technologies.join(', ')}
`).join('\n--------------------------------------------------------------------------------\n')}

EDUCATION & QUALIFICATIONS
================================================================================
${education.map(edu => `
${edu.degree.toUpperCase()} in ${edu.field}
Institution: ${edu.institution} | ${edu.location}
Period: ${edu.period}
${edu.honors ? `Honors: ${edu.honors}` : ''}
Details: ${edu.description}
Key Highlights:
${edu.highlights.map(h => `  • ${h}`).join('\n')}
`).join('\n--------------------------------------------------------------------------------\n')}

AWARDS & CERTIFICATIONS
================================================================================
${achievements.map(a => `• ${a.title} (${a.year}) — Issued by: ${a.issuer}${a.credentialId ? ` [ID: ${a.credentialId}]` : ''}`).join('\n')}

LANGUAGES
================================================================================
• Somali: Native / Bilingual
• English: Professional Full Working Proficiency
• Arabic: Working Proficiency

================================================================================
Verified by ABDA NET (Abdanet.com) · Generated on ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
`.trim();

    const blob = new Blob([cvText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Abdi_Ahmed_Sharif_CV_${new Date().getFullYear()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Action Bar (Hidden when printing) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 no-print">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 tracking-wider uppercase">
            <span>ABDA NET</span>
            <span aria-hidden="true">·</span>
            <span>Official Curriculum Vitae</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-1">
            Curriculum Vitae (CV)
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Updated for {new Date().getFullYear()} · Formatted for executive review & institutional print
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-sm"
          >
            <Printer className="w-4 h-4 text-blue-400" />
            <span>Print / Save PDF</span>
          </button>

          <button
            onClick={handleDownloadText}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer shadow-sm"
          >
            {downloaded ? <Check className="w-4 h-4 text-white" /> : <Download className="w-4 h-4" />}
            <span>{downloaded ? 'Downloaded!' : 'Download Text CV'}</span>
          </button>
        </div>
      </div>

      {/* Printable Resume Sheet Container */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-12 space-y-10 shadow-2xl text-slate-200 print:bg-white print:text-black print:border-none print:shadow-none print:p-0">
        {/* CV Header */}
        <div className="border-b border-slate-800 print:border-slate-300 pb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white print:text-black tracking-tight">
                {profile.name}
              </h2>
              <p className="text-lg text-blue-400 print:text-blue-700 font-semibold mt-1">
                {profile.title}
              </p>
            </div>
            <div className="text-right text-xs text-slate-400 print:text-slate-600 space-y-1">
              <p className="flex items-center sm:justify-end gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-400 print:text-blue-700" />
                <span>{profile.domain}</span>
              </p>
              <p className="flex items-center sm:justify-end gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-400 print:text-blue-700" />
                <span>{profile.email}</span>
              </p>
              <p className="flex items-center sm:justify-end gap-1.5">
                <Phone className="w-3.5 h-3.5 text-blue-400 print:text-blue-700" />
                <span>{profile.phone}</span>
              </p>
              <p className="flex items-center sm:justify-end gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500 print:text-slate-600" />
                <span>{profile.location}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Executive Profile */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400 print:text-blue-800 border-b border-slate-800 print:border-slate-300 pb-1">
            Executive Profile Summary
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 print:text-slate-800 leading-relaxed">
            {profile.summary}
          </p>
          <p className="text-xs sm:text-sm text-slate-400 print:text-slate-700 leading-relaxed">
            {profile.aboutBio}
          </p>
        </div>

        {/* Core Competencies Matrix */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400 print:text-blue-800 border-b border-slate-800 print:border-slate-300 pb-1">
            Core Competencies & Technologies
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {skills.map(sk => (
              <div
                key={sk.id}
                className="p-2 rounded bg-slate-950/60 print:bg-slate-100 border border-slate-800/80 print:border-slate-200 flex justify-between"
              >
                <span className="font-medium text-slate-200 print:text-slate-900">{sk.name}</span>
                <span className="font-mono text-blue-400 print:text-blue-700">{sk.proficiency}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Experience */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400 print:text-blue-800 border-b border-slate-800 print:border-slate-300 pb-1">
            Professional Experience
          </h3>
          <div className="space-y-6">
            {experience.map(exp => (
              <div key={exp.id} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                  <div>
                    <h4 className="text-base font-bold text-white print:text-black">{exp.role}</h4>
                    <p className="text-blue-400 print:text-blue-700 font-semibold">{exp.company} · {exp.location}</p>
                  </div>
                  <span className="text-slate-400 print:text-slate-600 font-mono mt-1 sm:mt-0">{exp.period}</span>
                </div>
                <p className="text-xs text-slate-300 print:text-slate-800 leading-relaxed">
                  {exp.summary}
                </p>
                <ul className="space-y-1 pl-4 list-disc text-xs text-slate-400 print:text-slate-700">
                  {exp.achievements.map((ach, idx) => (
                    <li key={idx}>{ach}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Qualifications */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400 print:text-blue-800 border-b border-slate-800 print:border-slate-300 pb-1">
            Education & Qualifications
          </h3>
          <div className="space-y-4">
            {education.map(edu => (
              <div key={edu.id} className="space-y-1 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white print:text-black">
                      {edu.degree} in {edu.field}
                    </h4>
                    <p className="text-slate-300 print:text-slate-700">{edu.institution} ({edu.location})</p>
                  </div>
                  <span className="text-slate-400 print:text-slate-600 font-mono">{edu.period}</span>
                </div>
                {edu.honors && (
                  <p className="text-blue-400 print:text-blue-700 font-medium">Honors: {edu.honors}</p>
                )}
                <p className="text-slate-400 print:text-slate-700">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Honors */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400 print:text-blue-800 border-b border-slate-800 print:border-slate-300 pb-1">
            Certifications, Awards & Honors
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {achievements.map(ach => (
              <div
                key={ach.id}
                className="p-3 rounded-lg bg-slate-950/60 print:bg-slate-100 border border-slate-800/80 print:border-slate-200"
              >
                <p className="font-bold text-white print:text-black">{ach.title}</p>
                <p className="text-slate-400 print:text-slate-700">{ach.issuer} ({ach.year})</p>
                {ach.credentialId && (
                  <p className="text-[10px] font-mono text-blue-400 print:text-blue-700 mt-1">ID: {ach.credentialId}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Spoken Languages */}
        <div className="space-y-2 pt-2 border-t border-slate-800 print:border-slate-300">
          <p className="text-xs font-semibold text-slate-400 print:text-slate-600 uppercase">Languages</p>
          <p className="text-xs text-slate-300 print:text-slate-800">
            Somali (Native) · English (Professional Full Working Proficiency) · Arabic (Working Proficiency)
          </p>
        </div>
      </div>
    </div>
  );
};
