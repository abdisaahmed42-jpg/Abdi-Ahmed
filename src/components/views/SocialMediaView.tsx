import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  ExternalLink,
  Copy,
  Check,
  Share2,
  Tv,
  Send,
  Linkedin,
  Facebook,
  Globe,
  Radio,
  ArrowRight,
} from 'lucide-react';

export const SocialMediaView: React.FC = () => {
  const { profile, setCurrentPage } = useData();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const channels = [
    {
      id: 'linkedin',
      name: 'LinkedIn',
      handle: 'in/abdi-ahmed-sharif',
      url: profile.socials.linkedin,
      description: 'Professional updates, software architecture insights, enterprise announcements, and career leadership perspectives.',
      stats: '5,000+ Connections',
      icon: Linkedin,
      color: 'bg-blue-600/20 text-blue-400 border-blue-500/30',
      actionLabel: 'Connect on LinkedIn',
    },
    {
      id: 'telegram',
      name: 'Telegram Channel',
      handle: '@AbdiAhmedSharif',
      url: profile.socials.telegram,
      description: 'Direct technology discussions, architectural thoughts, open-source resources, and instant community updates.',
      stats: 'Active Community Broadcasts',
      icon: Send,
      color: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
      actionLabel: 'Join Telegram Channel',
    },
    {
      id: 'youtube',
      name: 'YouTube Channel',
      handle: '@AbdaNetTech',
      url: profile.socials.youtube,
      description: 'In-depth video tutorials, cloud architecture deep-dives, tech event keynote recordings, and engineering workshops.',
      stats: 'Technical Video Masterclasses',
      icon: Tv,
      color: 'bg-rose-600/20 text-rose-400 border-rose-500/30',
      actionLabel: 'Subscribe on YouTube',
    },
    {
      id: 'facebook',
      name: 'Facebook Page',
      handle: 'AbdiAhmedSharif',
      url: profile.socials.facebook,
      description: 'Community initiatives, technology advocacy in East Africa, student mentorship broadcasts, and public keynote albums.',
      stats: 'Public Tech Community',
      icon: Facebook,
      color: 'bg-blue-700/20 text-blue-400 border-blue-600/30',
      actionLabel: 'Follow on Facebook',
    },
  ];

  const handleCopy = (id: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 tracking-wider uppercase">
          <span>ABDA NET</span>
          <span aria-hidden="true">·</span>
          <span>Digital Presence</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Social Media & Channels
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          Stay connected with Abdi Ahmed Sharif across official verified social platforms for technology insights, videos, and professional networking.
        </p>
      </div>

      {/* Social Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {channels.map(channel => {
          const Icon = channel.icon;
          const isCopied = copiedId === channel.id;

          return (
            <div
              key={channel.id}
              className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${channel.color} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 px-3 py-1 bg-slate-950 rounded-lg border border-slate-800">
                    {channel.stats}
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {channel.name}
                  </h2>
                  <p className="text-xs text-blue-400 font-mono mt-0.5">
                    {channel.handle}
                  </p>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {channel.description}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <button
                  onClick={() => handleCopy(channel.id, channel.url)}
                  className="px-3.5 py-2 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl text-xs font-medium border border-slate-800 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Copy link"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copied' : 'Copy Link'}</span>
                </button>

                <a
                  href={channel.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
                >
                  <span>{channel.actionLabel}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Official Domain & Verification Box */}
      <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
            Official Verification Note
          </p>
          <h3 className="text-lg font-bold text-white">
            Primary Domain: {profile.domain}
          </h3>
          <p className="text-xs text-slate-400">
            All legitimate correspondence and official announcements originate exclusively through <strong className="text-slate-300">{profile.email}</strong> or <strong className="text-slate-300">https://{profile.domain}</strong>.
          </p>
        </div>

        <button
          onClick={() => setCurrentPage('contact')}
          className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-2 shrink-0 transition-colors cursor-pointer"
        >
          <span>Send Secure Message</span>
          <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
        </button>
      </div>
    </div>
  );
};
