import React from 'react';
import { useData } from '../context/DataContext';
import { PageView } from '../types';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { profile, setCurrentPage } = useData();

  const handleNav = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-900 text-slate-400 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand & Summary */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white">ABDA NET</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Official personal brand website of <span className="text-slate-200 font-medium">{profile.name}</span>. Technology leadership, distributed cloud architecture, enterprise systems engineering, and advisory.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{profile.location}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href={`mailto:${profile.email}`} className="hover:text-blue-400 transition-colors">
                  {profile.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href={`tel:${profile.phone}`} className="hover:text-blue-400 transition-colors">
                  {profile.phone}
                </a>
              </p>
            </div>
          </div>

          {/* Core Pages */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-200">Navigation</p>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  About Me
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('profile')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  My Profile
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('portfolio')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Portfolio
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Services
                </button>
              </li>
            </ul>
          </div>

          {/* Experience & Credentials */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-200">Credentials</p>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNav('education')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Education & Honors
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('skills')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Skills & Frameworks
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('experience')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Work Experience
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('achievements')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Awards & Certifications
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('cv')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Curriculum Vitae (CV)
                </button>
              </li>
            </ul>
          </div>

          {/* Publications & Connect */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-200">Connect & Media</p>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleNav('blog')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Blog & Articles
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('gallery')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Photo & Video Gallery
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Contact Form
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('social')} className="hover:text-blue-400 transition-colors cursor-pointer">
                  Social Channels
                </button>
              </li>
              <li className="pt-2">
                <a
                  href="https://abdanet.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-medium"
                >
                  <span>Abdanet.com</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row with zero-slop restraint */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ABDA NET · Abdi Ahmed Sharif. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Domain: Abdanet.com</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => handleNav('contact')}
              className="hover:text-slate-400 transition-colors"
            >
              Consulting & Inquiries
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
