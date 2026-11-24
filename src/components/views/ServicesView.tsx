import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ServiceItem } from '../../types';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Code2,
  Cloud,
  Compass,
  GraduationCap,
  Sparkles,
  X,
  Mail,
} from 'lucide-react';

export const ServicesView: React.FC = () => {
  const { services, setCurrentPage, addMessage } = useData();
  const [inquiryService, setInquiryService] = useState<ServiceItem | null>(null);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return Cpu;
      case 'Code2': return Code2;
      case 'Cloud': return Cloud;
      case 'Compass': return Compass;
      case 'GraduationCap': return GraduationCap;
      default: return ShieldCheck;
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryService) return;
    addMessage({
      name: clientName,
      email: clientEmail,
      phone: clientPhone,
      subject: `Service Inquiry: ${inquiryService.title}`,
      message: clientNotes || `Inquiry for ${inquiryService.title} engagement.`,
      serviceRequested: inquiryService.title,
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setInquiryService(null);
      setClientName('');
      setClientEmail('');
      setClientPhone('');
      setClientNotes('');
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 tracking-wider uppercase">
          <span>ABDA NET</span>
          <span aria-hidden="true">·</span>
          <span>Consulting & Engineering</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Services Offered
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          High-caliber software systems engineering, executive technology advisory, cloud transformation, and enterprise security governance.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map(serv => {
          const Icon = getIcon(serv.icon);
          return (
            <div
              key={serv.id}
              className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-blue-900/80 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-950/70 border border-blue-900/60 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-105 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {serv.title}
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {serv.shortDesc}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-slate-800/80">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Core Deliverables
                  </p>
                  {serv.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-3">
                <div className="text-xs text-slate-400 flex items-center justify-between">
                  <span>Engagement:</span>
                  <span className="text-slate-200 font-medium">{serv.engagementModel}</span>
                </div>
                <button
                  onClick={() => setInquiryService(serv)}
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                >
                  <span>Request Proposal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inquiry Modal */}
      {inquiryService && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Inquire about ${inquiryService.title}`}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setInquiryService(null)}
        >
          <div
            className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-6"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setInquiryService(null)}
              className="absolute top-5 right-5 p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                Service Engagement Inquiry
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                {inquiryService.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Direct consultation inquiry with Abdi Ahmed Sharif.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-950/40 border border-emerald-900/60 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Inquiry Received</h4>
                <p className="text-xs text-slate-300">
                  Thank you! Abdi will review your proposal request and respond within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-slate-300 mb-1">Your Full Name / Organization</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    placeholder="e.g. Hassan Mohamed"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={e => setClientEmail(e.target.value)}
                      placeholder="hassan@company.com"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-300 mb-1">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={e => setClientPhone(e.target.value)}
                      placeholder="+252 61 ..."
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-300 mb-1">Project Scope & Objectives</label>
                  <textarea
                    rows={3}
                    value={clientNotes}
                    onChange={e => setClientNotes(e.target.value)}
                    placeholder="Briefly describe your timeline, current stack, and core goals..."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors cursor-pointer shadow-md text-xs"
                >
                  Submit Service Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
