import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { BlogPostItem } from '../../types';
import { BookOpen, Calendar, Clock, User, ArrowRight, X, Share2, Search, Check } from 'lucide-react';

export const BlogView: React.FC = () => {
  const { blogPosts, selectedArticleId, setSelectedArticleId, setCurrentPage } = useData();
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copied, setCopied] = useState(false);

  const categories = ['All', 'Software Architecture', 'Cloud Engineering', 'Leadership & Culture'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchFilter.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const activePost = selectedArticleId
    ? blogPosts.find(p => p.id === selectedArticleId) || null
    : null;

  const handleShare = (post: BlogPostItem) => {
    const url = `https://abdanet.com/blog/${post.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 tracking-wider uppercase">
          <span>ABDA NET</span>
          <span aria-hidden="true">·</span>
          <span>Publications & Insights</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Articles, News & Publications
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          Architectural essays, cloud engineering principles, fintech systems analysis, and technology leadership insights written by Abdi Ahmed Sharif.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl w-fit">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchFilter}
            onChange={e => setSearchFilter(e.target.value)}
            placeholder="Search publications..."
            className="w-full pl-9 pr-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map(post => (
          <article
            key={post.id}
            onClick={() => setSelectedArticleId(post.id)}
            className="rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all overflow-hidden flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img
                  src={post.image}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-slate-300">
                  <span className="text-blue-400 font-semibold">{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>By {post.author}</span>
                </div>
                <h2 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between text-xs">
              <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-500">
                {post.tags.slice(0, 2).map(tag => (
                  <span key={tag}>#{tag}</span>
                ))}
              </div>
              <span className="text-blue-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Read Full</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Full Article Reader Modal */}
      {activePost && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePost.title}
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedArticleId(null)}
        >
          <div
            className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
              <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold">
                <BookOpen className="w-4 h-4" />
                <span>{activePost.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400">{activePost.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare(activePost)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                  title="Copy share link"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Link Copied!' : 'Share'}</span>
                </button>
                <button
                  onClick={() => setSelectedArticleId(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Scroll Content */}
            <div className="overflow-y-auto p-6 sm:p-10 space-y-6">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                <img
                  src={activePost.image}
                  alt={activePost.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-blue-400" />
                    <span>{activePost.author}</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{activePost.date}</span>
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {activePost.title}
                </h1>
              </div>

              {/* Formatted Markdown-like Content */}
              <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-sm sm:text-base space-y-4 whitespace-pre-line border-t border-slate-800 pt-6">
                {activePost.content}
              </div>

              <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {activePost.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setSelectedArticleId(null);
                    setCurrentPage('contact');
                  }}
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300"
                >
                  Discuss this topic with Abdi →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
