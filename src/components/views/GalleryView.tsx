import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { GalleryItem } from '../../types';
import { Image as ImageIcon, Video, X, ChevronLeft, ChevronRight, Calendar, Maximize2 } from 'lucide-react';

export const GalleryView: React.FC = () => {
  const { gallery } = useData();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Conference', 'Leadership', 'Development', 'Community'];

  const filteredGallery = activeCategory === 'All'
    ? gallery
    : gallery.filter(g => g.category === activeCategory);

  const activeItem = lightboxIndex !== null ? filteredGallery[lightboxIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredGallery.length);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 tracking-wider uppercase">
          <span>ABDA NET</span>
          <span aria-hidden="true">·</span>
          <span>Visual Media & Archives</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Photo & Video Gallery
        </h1>
        <p className="text-lg text-slate-300 leading-relaxed">
          Moments from international speaking engagements, executive design studios, system launches, and engineering summits.
        </p>
      </div>

      {/* Category Filter Controls */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl w-fit">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGallery.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setLightboxIndex(idx)}
            className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 cursor-pointer aspect-4/3 shadow-lg"
          >
            <img
              src={item.url}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

            {/* Media Type Icon */}
            <div className="absolute top-3 left-3 p-2 rounded-lg bg-slate-950/70 backdrop-blur-md border border-slate-800/80 text-white">
              {item.type === 'video' ? <Video className="w-4 h-4 text-blue-400" /> : <ImageIcon className="w-4 h-4 text-blue-400" />}
            </div>

            <div className="absolute top-3 right-3 p-2 rounded-lg bg-slate-950/70 backdrop-blur-md border border-slate-800/80 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4" />
            </div>

            {/* Bottom Caption */}
            <div className="absolute bottom-4 left-4 right-4 space-y-1">
              <div className="flex items-center gap-2 text-[11px] text-blue-400 font-semibold">
                <span>{item.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400">{item.date}</span>
              </div>
              <h3 className="text-sm font-bold text-white leading-snug line-clamp-1 group-hover:text-blue-300 transition-colors">
                {item.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeItem && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top Controls */}
          <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
            <span className="text-xs text-slate-400 font-mono">
              {lightboxIndex + 1} / {filteredGallery.length}
            </span>
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2 text-slate-400 hover:text-white bg-slate-900/80 rounded-full transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 rounded-full transition-colors cursor-pointer z-50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 rounded-full transition-colors cursor-pointer z-50"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Media Container */}
          <div
            className="max-w-4xl w-full flex flex-col items-center max-h-[85vh] space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-full max-h-[65vh] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center">
              <img
                src={activeItem.url}
                alt={activeItem.title}
                referrerPolicy="no-referrer"
                className="max-h-[65vh] w-auto object-contain"
              />
            </div>

            <div className="w-full text-center space-y-1 text-slate-300">
              <div className="flex items-center justify-center gap-2 text-xs text-blue-400 font-semibold">
                <span>{activeItem.category}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400">{activeItem.date}</span>
              </div>
              <h2 className="text-lg font-bold text-white">
                {activeItem.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
                {activeItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
