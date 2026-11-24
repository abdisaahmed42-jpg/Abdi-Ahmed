import React from 'react';
import { useData } from '../../context/DataContext';
import {
  ArrowRight,
  Download,
  Mail,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    profile,
    projects,
    services,
    blogPosts,
    setCurrentPage,
    setSelectedProjectId,
    setSelectedArticleId,
  } = useData();

  const featuredProjects = projects.filter(p => p.featured).slice(0, 3);
  const featuredServices = services.slice(0, 3);
  const latestPosts = blogPosts.slice(0, 2);

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Hero Split (following §2.B of Portfolio Constitution) */}
      <section className="relative pt-6 sm:pt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Typographic Hierarchy */}
            <div className="lg:col-span-7 space-y-6">
              {/* Unboxed Kicker metadata (Zero-pill discipline) */}
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 tracking-wider uppercase">
                <span>ABDA NET</span>
                <span aria-hidden="true">·</span>
                <span>Executive Technology Leadership</span>
                <span aria-hidden="true">·</span>
                <span>Abdanet.com</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] text-balance">
                Architecting resilient systems for a digital world.
              </h1>

              {/* Sub-headline / Title */}
              <p className="text-xl sm:text-2xl font-medium text-slate-300">
                {profile.name}
              </p>

              {/* Lead copy */}
              <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
                {profile.tagline}
              </p>

              {/* Primary & Secondary Actions */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setCurrentPage('portfolio')}
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-xl transition-all shadow-lg shadow-blue-900/30 flex items-center gap-2 cursor-pointer group"
                >
                  <span>Explore Portfolio</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setCurrentPage('contact')}
                  className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold text-sm rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>Get in Touch</span>
                </button>

                <button
                  onClick={() => setCurrentPage('cv')}
                  className="px-5 py-3.5 text-slate-400 hover:text-white font-medium text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Curriculum Vitae</span>
                </button>
              </div>

              {/* Quick trust quote */}
              <div className="pt-4 flex items-center gap-3 text-xs text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Available for enterprise advisory, technology architecture & board consulting.</span>
              </div>
            </div>

            {/* Right Column: High-Fidelity Executive Portrait */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border border-slate-800/80 bg-slate-900 shadow-2xl group">
                <img
                  src={profile.heroImage}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                {/* Subtle contrast gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                
                {/* Portrait Overlay Tag */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800/80">
                  <p className="text-sm font-bold text-white">{profile.name}</p>
                  <p className="text-xs text-blue-400">{profile.title}</p>
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-400">
                    <span>{profile.location}</span>
                    <span>·</span>
                    <span>Abdanet.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width Key Metrics Strip (Below the split as per Portfolio reference) */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums">
                {profile.yearsExperience}+
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Years Industry Experience</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums">
                {profile.completedProjects}+
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Enterprise Projects Delivered</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight tabular-nums">
                {profile.enterpriseClients}+
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Strategic Enterprise Partners</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-blue-400 tracking-tight tabular-nums">
                {profile.satisfactionRate}%
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">System Reliability Standard</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Services Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-800/80">
          <div>
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Capabilities</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Services & Technical Expertise</h2>
          </div>
          <button
            onClick={() => setCurrentPage('services')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>View All Services</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredServices.map(serv => (
            <div
              key={serv.id}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-blue-900/70 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-950/70 border border-blue-900/60 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {serv.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {serv.shortDesc}
                </p>
                <div className="space-y-2 border-t border-slate-800/60 pt-4">
                  {serv.deliverables.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="text-blue-400 font-bold">·</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-500">{serv.engagementModel}</span>
                <button
                  onClick={() => setCurrentPage('services')}
                  className="text-xs font-semibold text-blue-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Portfolio Showcase (Bento Style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-800/80">
          <div>
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Selected Works</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Featured Architecture & Software</h2>
          </div>
          <button
            onClick={() => setCurrentPage('portfolio')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>View All Projects</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {featuredProjects.map(proj => (
            <div
              key={proj.id}
              className="rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden hover:border-slate-700 transition-all flex flex-col group"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img
                  src={proj.image}
                  alt={proj.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="text-blue-400 font-semibold">{proj.category}</span>
                  <span className="text-slate-400">{proj.year}</span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                    {proj.summary}
                  </p>
                  <p className="text-xs font-medium text-emerald-400 mt-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{proj.metrics}</span>
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                    {proj.tags.slice(0, 3).map(tag => (
                      <span key={tag}>#{tag}</span>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setSelectedProjectId(proj.id);
                      setCurrentPage('portfolio');
                    }}
                    className="text-xs font-semibold text-blue-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <span>Deep Dive</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Executive Insight / About Snapshot */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Executive Vision</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Building High-Impact Technology for Africa and Beyond
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {profile.aboutBio}
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => setCurrentPage('about')}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Read Full Biography
                </button>
                <button
                  onClick={() => setCurrentPage('profile')}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  View Executive Profile
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-slate-800 aspect-video lg:aspect-square">
              <img
                src={profile.workspaceImage}
                alt="Executive Studio"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Latest Articles & Publications */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-slate-800/80">
          <div>
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Publications</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">Thought Leadership & Articles</h2>
          </div>
          <button
            onClick={() => setCurrentPage('blog')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>View All Articles</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {latestPosts.map(post => (
            <article
              key={post.id}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                  <span className="text-blue-400 font-medium">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">By {post.author}</span>
                <button
                  onClick={() => {
                    setSelectedArticleId(post.id);
                    setCurrentPage('blog');
                  }}
                  className="text-xs font-semibold text-blue-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 6. Contact Banner CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-blue-600 p-8 sm:p-12 text-center text-white space-y-6 shadow-2xl shadow-blue-600/20">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to collaborate with Abdi Ahmed Sharif?
            </h2>
            <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
              Whether you need strategic system architecture advisory, custom software engineering, or technical leadership, let&apos;s build transformative solutions.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setCurrentPage('contact')}
              className="px-6 py-3.5 bg-slate-950 hover:bg-slate-900 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer shadow-md"
            >
              Send Direct Message
            </button>
            <button
              onClick={() => setCurrentPage('cv')}
              className="px-6 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm rounded-xl transition-colors cursor-pointer"
            >
              Download Full CV
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
