'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Search, Calendar, Film, X, Play, ChevronDown, Check, Grid, ExternalLink } from 'lucide-react';
import { collectionsData, CollectionItem } from '@/lib/collectionsData';
import MasonryImageGrid from '@/components/ui/MasonryImageGrid';
import FilmstripGallery, { type FilmstripImage } from '@/components/ui/filmstrip-gallery';

function VideoCardWithHover({
  item,
  onClick,
}: {
  item: CollectionItem;
  onClick: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    hoverTimer.current = setTimeout(() => {
      setIsHovered(true);
    }, 300);
  };

  const handleMouseLeave = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
    setIsHovered(false);
  };

  const cardClass = item.isVertical ? 'video-card tall' : 'video-card wide';

  return (
    <div
      className={`${cardClass} cursor-pointer group select-none relative`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-full overflow-hidden bg-zinc-950 rounded-2xl border border-zinc-800/80 transition-all duration-300 group-hover:border-red-500/60 group-hover:shadow-2xl group-hover:shadow-red-500/20">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10 pointer-events-none" />

        {/* Live Hover Video Preview Iframe */}
        {isHovered && item.youtubeId && (
          <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none bg-black animate-fadeIn">
            <iframe
              src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${item.youtubeId}&playsinline=1&modestbranding=1&rel=0&enablejsapi=1`}
              title={item.title}
              className="w-full h-full border-0 pointer-events-none scale-105"
              allow="autoplay; encrypted-media"
            />
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-30 pointer-events-none">
          <span className="rounded-full bg-black/80 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-red-400 border border-red-500/30 uppercase tracking-wider">
            {item.tag}
          </span>
          {isHovered && (
            <span className="rounded-full bg-red-500 text-white px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-widest animate-pulse flex items-center gap-1 shadow-lg shadow-red-500/50">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              PREVIEW
            </span>
          )}
        </div>

        {item.duration && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/80 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-zinc-200 border border-white/10 z-30 pointer-events-none">
            <Film className="w-3 h-3 text-red-500" />
            <span>{item.duration}</span>
          </div>
        )}

        {/* Prominent Red Play Button Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center z-30 pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
          <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-red-500/90 text-white flex items-center justify-center shadow-[0_0_30px_rgba(255,59,48,0.6)] group-hover:scale-110 group-hover:bg-red-600 transition-all duration-300">
            <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white translate-x-0.5" />
          </div>
        </div>

        {/* Bottom Info Overlay */}
        <div className="absolute bottom-3 left-3 right-3 z-30 pointer-events-none">
          <h4 className="font-heading text-sm sm:text-base font-bold text-white line-clamp-1 group-hover:text-red-400 transition-colors">
            {item.title}
          </h4>
          <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5 font-normal">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function CollectionCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<CollectionItem | null>(null);
  const [videoViewMode, setVideoViewMode] = useState<'grid' | 'filmstrip' | 'featured'>('grid');
  const [featuredIndex, setFeaturedIndex] = useState<number>(0);

  // Filter States
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const yearDropdownRef = useRef<HTMLDivElement | null>(null);
  const categoryDropdownRef = useRef<HTMLDivElement | null>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(e.target as Node)) {
        setIsYearOpen(false);
      }
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(e.target as Node)) {
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const category = collectionsData.find((cat) => cat.id === id) || collectionsData[0];

  const yearOptions = ['All Years', '2026', '2025', '2024', '2023', '2022'];
  const categoryOptions = [
    'All Categories',
    'Hackathon',
    'Workshop',
    'Internship',
    'Course',
    'Event',
    'Volunteering',
  ];

  const isCertificates = category.id === 'certificates';

  const filteredItems = isCertificates
    ? category.items.filter((item) => {
        const matchesSearch =
          !searchQuery ||
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesYear =
          selectedYear === 'All Years' || (item.date && item.date.includes(selectedYear));

        const matchesCategory =
          selectedCategory === 'All Categories' ||
          (item.category && item.category.toLowerCase() === selectedCategory.toLowerCase()) ||
          item.tag.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          item.title.toLowerCase().includes(selectedCategory.toLowerCase());

        return matchesSearch && matchesYear && matchesCategory;
      })
    : category.items;

  const filmstripImages: FilmstripImage[] = category.items.map((item) => ({
    src: item.image,
    alt: item.title,
    caption: `${item.title} — ${item.description}`,
    youtubeId: item.youtubeId,
    isVertical: item.isVertical,
  }));

  const featuredVideo = category.items[featuredIndex] ?? category.items[0];

  return (
    <div className="min-h-screen bg-[#0B0B0E] text-zinc-100 font-sans selection:bg-red-500 selection:text-white pb-24">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0B0B0E]/80 border-b border-zinc-800/80 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/#collections"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-red-500 transition-colors group self-start sm:self-auto"
          >
            <div className="h-8 w-8 rounded-full bg-zinc-900 border border-zinc-700/60 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white group-hover:border-red-500 transition-all">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            </div>
            <span>Back to Portfolio</span>
          </Link>

          {/* Category Tabs Quick Switcher */}
          <div className="flex items-center gap-1 sm:gap-2 bg-zinc-900/90 p-1 rounded-full border border-zinc-800 overflow-x-auto max-w-full scrollbar-none">
            {collectionsData.map((cat) => {
              const isActive = cat.id === category.id;
              return (
                <Link
                  key={cat.id}
                  href={`/collections/${cat.id}`}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-red-500 text-white font-bold shadow-lg shadow-red-500/20'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50'
                  }`}
                >
                  <span className="mr-1.5">{cat.icon}</span>
                  <span>{cat.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Hero Banner for Collection */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 sm:pt-14">
        <div className="relative rounded-3xl border border-zinc-800/80 bg-gradient-to-b from-[#14141A] to-[#0F0F13] p-6 sm:p-12 overflow-hidden shadow-2xl mb-8 sm:mb-12">
          {/* Subtle Ambient Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Curated Collection</span>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <span className="text-4xl sm:text-6xl">{category.icon}</span>
                <h1 className="font-heading text-3xl sm:text-6xl font-extrabold tracking-tight text-white">
                  {category.title}
                </h1>
              </div>
              <p className="text-zinc-400 text-sm sm:text-lg leading-relaxed mt-2">
                {category.description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-red-500 font-bold text-xs sm:text-sm tracking-wide uppercase">
                {category.itemCount}
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar - Only shown for Certificates */}
        {isCertificates && (
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-10 pb-6 border-b border-zinc-800/80">
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-end gap-3 sm:gap-4 w-full md:w-auto">
              {/* Search Input Box */}
              <div className="relative w-full sm:w-64">
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search certificates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-500/80 transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Year Dropdown Filter */}
                <div className="relative flex-1 sm:flex-none" ref={yearDropdownRef}>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5 tracking-wider">
                    Year
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsYearOpen(!isYearOpen);
                      setIsCategoryOpen(false);
                    }}
                    className="w-full sm:min-w-[130px] px-4 py-2.5 rounded-full border border-zinc-800 bg-[#121216] text-zinc-100 font-medium text-sm flex items-center justify-between gap-2 shadow-lg hover:border-red-500/60 transition-all cursor-pointer"
                  >
                    <span className="truncate">{selectedYear}</span>
                    <ChevronDown className={`w-4 h-4 text-red-500 shrink-0 transition-transform ${isYearOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isYearOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 max-h-60 overflow-y-auto rounded-2xl border border-zinc-800 bg-[#0F0F14] text-zinc-100 shadow-2xl p-2 z-50 animate-fadeIn">
                      <div className="flex flex-col gap-1">
                        {yearOptions.map((y) => (
                          <button
                            key={y}
                            onClick={() => {
                              setSelectedYear(y);
                              setIsYearOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-colors flex items-center justify-between cursor-pointer ${
                              selectedYear === y
                                ? 'bg-red-500/10 text-red-400 font-bold border border-red-500/30'
                                : 'hover:bg-zinc-800/80 hover:text-white text-zinc-300'
                            }`}
                          >
                            <span>{y}</span>
                            {selectedYear === y && <Check className="w-4 h-4 text-red-500" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Category Dropdown Filter */}
                <div className="relative flex-1 sm:flex-none" ref={categoryDropdownRef}>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5 tracking-wider">
                    Category
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCategoryOpen(!isCategoryOpen);
                      setIsYearOpen(false);
                    }}
                    className="w-full sm:min-w-[160px] px-4 py-2.5 rounded-full border border-zinc-800 bg-[#121216] text-zinc-100 font-medium text-sm flex items-center justify-between gap-2 shadow-lg hover:border-red-500/60 transition-all cursor-pointer"
                  >
                    <span className="truncate">{selectedCategory}</span>
                    <ChevronDown className={`w-4 h-4 text-red-500 shrink-0 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isCategoryOpen && (
                    <div className="absolute top-full right-0 sm:left-0 mt-2 w-56 max-h-60 overflow-y-auto rounded-2xl border border-zinc-800 bg-[#0F0F14] text-zinc-100 shadow-2xl p-2 z-50 animate-fadeIn">
                      <div className="flex flex-col gap-1">
                        {categoryOptions.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => {
                              setSelectedCategory(cat);
                              setIsCategoryOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2 rounded-xl text-sm transition-colors flex items-center justify-between cursor-pointer ${
                              selectedCategory === cat
                                ? 'bg-red-500/10 text-red-400 font-bold border border-red-500/30'
                                : 'hover:bg-zinc-800/80 hover:text-white text-zinc-300'
                            }`}
                          >
                            <span>{cat}</span>
                            {selectedCategory === cat && <Check className="w-4 h-4 text-red-500" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Reset Filters Option */}
              {(selectedYear !== 'All Years' || selectedCategory !== 'All Categories' || searchQuery !== '') && (
                <button
                  onClick={() => {
                    setSelectedYear('All Years');
                    setSelectedCategory('All Categories');
                    setSearchQuery('');
                  }}
                  className="px-3 py-2 text-xs text-red-400 hover:text-white hover:underline transition-colors font-medium sm:self-end mb-0.5"
                >
                  Reset Filters
                </button>
              )}
            </div>

            {/* Item count */}
            <div className="text-xs text-zinc-400 font-medium sm:self-end shrink-0">
              Showing <span className="text-zinc-100 font-bold">{filteredItems.length}</span> of{' '}
              <span className="text-zinc-100 font-bold">{category.items.length}</span> items
            </div>
          </div>
        )}

        {/* Collection Items View Render */}
        {category.id === 'images' ? (
          <MasonryImageGrid
            images={category.items.map((item) => ({
              src: item.image,
              alt: item.title,
              title: item.title,
            }))}
            columns={3}
            gap={20}
            borderRadius={20}
            enableLightbox={true}
            enableImageHover={true}
            enableInfiniteScroll={true}
            loadMoreCount={12}
          />
        ) : category.id === 'videos' ? (
          videoViewMode === 'featured' ? (
            <div className="flex flex-col gap-8 my-4">
              {/* Main Featured Video Player */}
              <div className="rounded-3xl border border-zinc-800 bg-[#121216] p-4 sm:p-6 shadow-2xl">
                {featuredVideo.youtubeId && (
                  <div className={`w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-2xl ${featuredVideo.isVertical ? 'aspect-[9/16] max-w-sm mx-auto h-[600px]' : 'aspect-[16/9]'}`}>
                    <iframe
                      src={`https://www.youtube.com/embed/${featuredVideo.youtubeId}?autoplay=1&playsinline=1&enablejsapi=1&rel=0&modestbranding=1`}
                      title={featuredVideo.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                )}
                <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
                        {featuredVideo.tag}
                      </span>
                      {featuredVideo.duration && (
                        <span className="text-xs text-zinc-400 font-mono">
                          ⏱ {featuredVideo.duration}
                        </span>
                      )}
                    </div>
                    <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                      {featuredVideo.title}
                    </h2>
                    <p className="text-zinc-300 text-sm sm:text-base mt-2 leading-relaxed max-w-3xl">
                      {featuredVideo.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Video Selector Row */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">
                  Select Video Reel to Preview
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {category.items.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setFeaturedIndex(idx)}
                      className={`group relative rounded-xl overflow-hidden border text-left transition-all duration-300 ${
                        featuredIndex === idx
                          ? 'border-red-500 ring-2 ring-red-500/50 scale-105 shadow-xl'
                          : 'border-zinc-800 opacity-70 hover:opacity-100 hover:border-zinc-600'
                      }`}
                    >
                      <div className="aspect-[16/10] w-full relative overflow-hidden bg-zinc-950">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        {featuredIndex === idx && (
                          <div className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-lg">
                            <Play className="w-3 h-3 fill-white translate-x-0.5" />
                          </div>
                        )}
                      </div>
                      <div className="p-2 bg-zinc-900">
                        <p className="text-xs font-bold text-white line-clamp-1">
                          {item.title}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="video-grid">
              {filteredItems.map((item) => (
                <VideoCardWithHover
                  key={item.id}
                  item={item}
                  onClick={() => setSelectedItem(item)}
                />
              ))}
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#121216] cursor-pointer transition-all duration-300 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-1"
              >
                {/* Media Thumbnail Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-transparent to-transparent opacity-80" />

                  {/* Top Tag & Optional Duration */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="rounded-full bg-zinc-950/80 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-red-400 border border-red-500/30 uppercase tracking-wider">
                      {item.tag}
                    </span>
                  </div>

                  {item.duration && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/80 backdrop-blur-md px-2.5 py-1 text-xs font-semibold text-zinc-200 border border-white/10">
                      <Film className="w-3 h-3 text-red-500" />
                      <span>{item.duration}</span>
                    </div>
                  )}
                </div>

                {/* Card Body Content */}
                <div className="p-6 flex flex-col justify-between flex-1 gap-3">
                  <div>
                    <h3 className="font-heading text-xl font-extrabold text-white group-hover:text-red-400 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mt-2 line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800/60 text-xs text-zinc-400">
                    {item.date && (
                      <span className="flex items-center gap-1.5 text-zinc-400 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-red-500" />
                        {item.date}
                      </span>
                    )}
                    <span className="text-red-500 font-semibold group-hover:underline inline-flex items-center gap-1">
                      View Details →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="text-center py-20 bg-zinc-900/30 rounded-3xl border border-zinc-800">
            <p className="text-zinc-400 text-lg">No items match your search filter.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-4 py-2 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}
      </main>

      {/* Lightbox / Item View Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fadeIn cursor-pointer"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border border-zinc-800 bg-[#0F0F12] text-zinc-100 shadow-2xl overflow-hidden cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Controls */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-zinc-800 bg-[#121216]">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
                  {selectedItem.tag}
                </span>
                {selectedItem.date && (
                  <span className="text-xs text-zinc-400">{selectedItem.date}</span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={selectedItem.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-800 hover:bg-red-500 hover:text-white text-zinc-300 text-xs font-semibold transition-all shadow-md"
                  title="Open full resolution image in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">View Full Image</span>
                </a>

                <button
                  onClick={() => setSelectedItem(null)}
                  className="h-9 w-9 rounded-full bg-zinc-800 text-zinc-300 hover:bg-white hover:text-zinc-950 flex items-center justify-center transition-all"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-8 overflow-y-auto space-y-6">
              {selectedItem.youtubeId ? (
                <div className={`w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 ${selectedItem.isVertical ? 'aspect-[9/16] max-w-sm mx-auto' : 'aspect-[16/9]'}`}>
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedItem.youtubeId}?autoplay=1&playsinline=1&enablejsapi=1&rel=0&modestbranding=1`}
                    title={selectedItem.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="relative group w-full max-h-[65vh] rounded-2xl overflow-hidden bg-black/80 border border-zinc-800 flex items-center justify-center p-2 sm:p-4">
                  <a
                    href={selectedItem.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full flex items-center justify-center relative cursor-zoom-in"
                  >
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.title}
                      className="max-h-[60vh] w-auto max-w-full object-contain rounded-xl shadow-2xl transition-transform duration-300 group-hover:scale-[1.01]"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none rounded-xl">
                      <span className="px-4 py-2 bg-black/90 text-white rounded-full text-xs font-bold border border-white/20 shadow-2xl flex items-center gap-2 backdrop-blur-md">
                        <ExternalLink className="w-3.5 h-3.5 text-red-500" />
                        Click to view full high-res image
                      </span>
                    </div>
                  </a>
                </div>
              )}

              <div>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                  {selectedItem.title}
                </h2>
                <p className="text-zinc-300 text-base leading-relaxed mt-3 font-normal">
                  {selectedItem.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
