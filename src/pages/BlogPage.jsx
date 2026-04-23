import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../services/api';
import { getAllTags, formatDate, estimateReadTime, truncate } from '../services/utils';
import RevealSection from '../components/RevealSection';
import Pagination from '../components/Pagination';

const POSTS_PER_PAGE = 9;

// ===== Inline SVG Icons =====
const FileLinesIcon = ({ size = 14 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v4a2 2 0 0 1-2 2H6"/></svg>
);
const TagsIcon = ({ size = 14 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14.172a2 2 0 0 0 1.414-.586l4-4a2 2 0 0 0 0-2.828Z"/><path d="m20 8-6-6H6l2 2 6 6"/></svg>
);
const UserPenIcon = ({ size = 14 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11.5 15H7a4 4 0 0 0-4 4v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a4 4 0 0 0-4-4h-.5"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L12 14l-4 1 1-4 7.5-7.5Z"/></svg>
);
const SearchIcon = ({ size = 14 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);
const SearchIconLg = () => <SearchIcon size={18} />;
const CircleXIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
);
const FolderOpenIcon = ({ size = 12 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.459 9H14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h.541"/><path d="m20 8 .707-4.707a2 2 0 0 0-2.828 0l-2 2a2 2 0 0 0 0 2.828l4.707.707Z"/></svg>
);
const ChevronDownIcon = ({ size = 12 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);
const GlobeIcon = ({ size = 12 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
);
const TagSmallIcon = ({ size = 12 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14.172a2 2 0 0 0 1.414-.586l4-4a2 2 0 0 0 0-2.828Z"/></svg>
);
const CheckIcon = ({ size = 12 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);
const ArrowDownShortIcon = ({ size = 12 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 15l5 5 5-5"/><path d="M7 9h10"/></svg>
);
const ArrowDownIcon = ({ size = 12 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);
const ArrowUpIcon = ({ size = 12 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
);
const BookOpenIcon = ({ size = 12 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);
const CalendarIcon = ({ size = 10 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);
const ClockIcon = ({ size = 10 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const NewspaperIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-8.5a2.5 2.5 0 0 1 2.5-2.5H14"/><path d="M15 18H9"/></svg>
);
const PenNibIcon = ({ size = 12 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
);
const EnvelopeIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const XMarkIcon = ({ size = 10 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

const TAG_COLORS = {
  design:      { bg: 'bg-slate-800',    text: 'text-white' },
  creativity:  { bg: 'bg-pink-500',     text: 'text-white' },
  travel:      { bg: 'bg-teal-600',     text: 'text-white' },
  writing:     { bg: 'bg-amber-600',    text: 'text-white' },
  lifestyle:   { bg: 'bg-emerald-600',  text: 'text-white' },
  food:        { bg: 'bg-red-500',      text: 'text-white' },
  reading:     { bg: 'bg-indigo-600',   text: 'text-white' },
  mindfulness: { bg: 'bg-indigo-500',   text: 'text-white' },
  reflection:  { bg: 'bg-purple-500',   text: 'text-white' },
  craft:       { bg: 'bg-rose-500',     text: 'text-white' },
  life:        { bg: 'bg-teal-600',     text: 'text-white' },
};

function getTagColor(tag) {
  return TAG_COLORS[tag] || { bg: 'bg-orange-500', text: 'text-white' };
}

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTab, setSearchTab] = useState('stories');
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState('latest');

  useEffect(() => { setPage(1); }, [search, activeTag]);
  useEffect(() => {
    setLoading(true);
    getPosts().then(setPosts).catch(() => setPosts([])).finally(() => setLoading(false));
  }, []);

  const tags = useMemo(() => getAllTags(posts), [posts]);

  const filtered = useMemo(() => {
    let result = posts;
    if (activeTag) result = result.filter((p) => (p.tags || []).includes(activeTag));
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q)
      );
    }
    if (sortBy === 'oldest') result = [...result].reverse();
    return result;
  }, [posts, search, activeTag, sortBy]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
  const sortLabel = sortBy === 'latest' ? 'Latest' : 'Oldest';
  const categoryLabel = activeTag
    ? activeTag.charAt(0).toUpperCase() + activeTag.slice(1)
    : 'All Topics';

  const clearFilters = () => { setSearch(''); setActiveTag(null); setPage(1); setSortBy('latest'); };
  const handleKeyDown = (e) => { if (e.key === 'Enter') { setPage(1); window.scrollTo({ top: 0, behavior: 'smooth' }); } };
  const handleSearch = () => { setPage(1); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <div>

      {/* BLOG HERO */}
      <section className="relative min-h-[50vh] sm:min-h-[55vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://raw.githubusercontent.com/bounthorn1/Image/refs/heads/main/drone-view-of-buildings-and-praek-tuek-chhu-river-in-kampot-cambodia.webp" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70"></div>
        </div>
        <div className="absolute top-12 left-8 sm:top-16 sm:left-16 pointer-events-none">
          <span className="block font-display text-[4rem] sm:text-[6rem] font-black text-white/[0.06] leading-none select-none -rotate-6">ប្លក់</span>
        </div>
        <div className="absolute bottom-12 right-8 sm:bottom-16 sm:right-16 pointer-events-none">
          <span className="block font-display text-[3rem] sm:text-[5rem] font-black text-white/[0.04] leading-none select-none rotate-6">អាន</span>
        </div>
        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 text-center py-20">
          <RevealSection>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500 text-white text-[11px] font-bold uppercase tracking-widest rounded-full mb-6">
              <FileLinesIcon size={12} /> ប្លក់របស់យើង
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-4">ព័ត៌មាន និងអត្ថបទថ្មីៗបំផុត</h1>
            <p className="text-white/55 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">តើអ្នកធុញទ្រាន់នឹងគោលដៅទេសចរណ៍ធម្មតាៗ ហើយកំពុងស្វែងរកការចេញក្រៅពីតំបន់សុវត្ថិភាពរបស់អ្នកមែនទេ?</p>
            <div className="flex items-center justify-center gap-6 mt-8">
              <div className="text-center"><p className="text-2xl sm:text-3xl font-display font-black text-white">{posts.length}</p><p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">រឿងរ៉ាវ</p></div>
              <span className="w-px h-8 bg-white/15"></span>
              <div className="text-center"><p className="text-2xl sm:text-3xl font-display font-black text-white">{tags.length}</p><p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">ប្រធានបទ</p></div>
              <span className="w-px h-8 bg-white/15"></span>
              <div className="text-center"><p className="text-2xl sm:text-3xl font-display font-black text-white">Free</p><p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">ជានិច្ច</p></div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* BIG CARD SEARCH */}
      <section className="relative z-10 -mt-12 sm:-mt-14">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <RevealSection delay={100}>
            <div className="bg-white dark:bg-slate-900 rounded-[20px] sm:rounded-2xl shadow-2xl shadow-black/20 overflow-hidden border border-gray-100/50 dark:border-slate-700/50">
              <div className="flex items-center bg-gradient-to-r from-orange-500 to-orange-600">
                {[
                  { key: 'stories', label: 'រឿងរ៉ាវ', Icon: FileLinesIcon },
                  { key: 'topics', label: 'ប្រធានបទ', Icon: TagsIcon },
                  { key: 'authors', label: 'អ្នកនិពន្ធ', Icon: UserPenIcon },
                ].map((tab) => (
                  <button key={tab.key} onClick={() => setSearchTab(tab.key)} className={`flex items-center gap-2.5 px-6 sm:px-8 py-4 text-sm font-semibold transition-all relative ${searchTab === tab.key ? 'text-white bg-white/15' : 'text-white/60 hover:text-white hover:bg-white/10'}`}>
                    <tab.Icon /> <span>{tab.label}</span>
                    {searchTab === tab.key && <span className="absolute bottom-0 left-3 right-3 h-[3px] bg-white rounded-t-full"></span>}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-0">
                {/* Keywords */}
                <div className="lg:col-span-4 flex flex-col justify-center px-6 sm:px-8 py-6 sm:py-7 border-b sm:border-b-0 sm:border-r border-gray-100 dark:border-slate-700">
                  <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-3">
                    <span className="text-orange-400"><SearchIcon size={12} /></span>
                    {searchTab === 'stories' ? 'ពាក្យគន្លឹះ' : searchTab === 'topics' ? 'ឈ្មោះប្រធានបទ' : 'ឈ្មោះអ្នកនិពន្ធ'}
                  </label>
                  <div className="relative">
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyDown} placeholder={searchTab === 'stories' ? 'តើអ្នកកំពុងស្វែងរកអ្វី...' : searchTab === 'topics' ? 'ស្វែងរកប្រធានបទ...' : 'ស្វែងរកអ្នកនិពន្ធ...'} className="w-full bg-transparent text-gray-800 dark:text-white text-lg sm:text-xl placeholder:text-gray-300 dark:placeholder:text-slate-600 focus:outline-none" />
                    {search && <button onClick={() => setSearch('')} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors p-1"><CircleXIcon size={18} /></button>}
                  </div>
                </div>

                {/* Category */}
                <div className="lg:col-span-2 relative">
                  <button onClick={() => { setCategoryOpen(!categoryOpen); setSortOpen(false); }} className="w-full flex flex-col justify-center px-6 sm:px-7 py-6 sm:py-7 text-left border-b sm:border-b-0 sm:border-r border-gray-100 dark:border-slate-700 hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-3"><span className="text-blue-400"><FolderOpenIcon /></span> Category</label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-800 dark:text-white truncate">{categoryLabel}</span>
                      <span className={`text-gray-400 ml-2 shrink-0 transition-transform duration-200 ${categoryOpen ? 'rotate-180' : ''}`}><ChevronDownIcon /></span>
                    </div>
                  </button>
                  {categoryOpen && (<>
                    <div className="fixed inset-0 z-40" onClick={() => setCategoryOpen(false)}></div>
                    <div className="absolute top-full left-0 right-0 sm:left-0 sm:w-64 z-50 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-gray-100 dark:border-slate-700 mt-1 py-1.5 max-h-80 overflow-y-auto">
                      <button onClick={() => { setActiveTag(null); setCategoryOpen(false); setPage(1); }} className={`w-full px-5 py-3 text-left text-sm flex items-center justify-between transition-colors ${!activeTag ? 'text-orange-600 bg-orange-50 dark:bg-orange-500/10' : 'text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'}`}>
                        <span className="flex items-center gap-2.5"><GlobeIcon />All Topics</span>
                        {!activeTag && <span className="text-orange-500"><CheckIcon /></span>}
                      </button>
                      <div className="h-px bg-gray-100 dark:bg-slate-700 my-1"></div>
                      {tags.map((tag) => (
                        <button key={tag} onClick={() => { setActiveTag(tag); setCategoryOpen(false); setPage(1); }} className={`w-full px-5 py-3 text-left text-sm flex items-center justify-between transition-colors ${activeTag === tag ? 'text-orange-600 bg-orange-50 dark:bg-orange-500/10' : 'text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'}`}>
                          <span className="flex items-center gap-2.5 capitalize"><TagSmallIcon />{tag}</span>
                          {activeTag === tag && <span className="text-orange-500"><CheckIcon /></span>}
                        </button>
                      ))}
                    </div>
                  </>)}
                </div>

                {/* Sort */}
                <div className="lg:col-span-2 relative">
                  <button onClick={() => { setSortOpen(!sortOpen); setCategoryOpen(false); }} className="w-full flex flex-col justify-center px-6 sm:px-7 py-6 sm:py-7 text-left border-b sm:border-b-0 sm:border-r border-gray-100 dark:border-slate-700 hover:bg-gray-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-3"><span className="text-emerald-400"><ArrowDownShortIcon /></span> Sort By</label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-800 dark:text-white">{sortLabel}</span>
                      <span className={`text-gray-400 ml-2 shrink-0 transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`}><ChevronDownIcon /></span>
                    </div>
                  </button>
                  {sortOpen && (<>
                    <div className="fixed inset-0 z-40" onClick={() => setSortOpen(false)}></div>
                    <div className="absolute top-full left-0 right-0 sm:left-0 sm:w-56 z-50 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-gray-100 dark:border-slate-700 mt-1 py-1.5">
                      {[{ key: 'latest', label: 'Latest First', Icon: ArrowDownIcon, desc: 'Newest stories first' }, { key: 'oldest', label: 'Oldest First', Icon: ArrowUpIcon, desc: 'Earliest stories first' }].map((opt) => (
                        <button key={opt.key} onClick={() => { setSortBy(opt.key); setSortOpen(false); }} className={`w-full px-5 py-3 text-left transition-colors ${sortBy === opt.key ? 'bg-orange-50 dark:bg-orange-500/10' : 'hover:bg-gray-50 dark:hover:bg-slate-800'}`}>
                          <div className="flex items-center justify-between">
                            <span className={`flex items-center gap-2.5 text-sm ${sortBy === opt.key ? 'text-orange-600 font-semibold' : 'text-gray-700 dark:text-slate-300'}`}>
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${sortBy === opt.key ? 'bg-orange-100 dark:bg-orange-500/20' : 'bg-gray-100 dark:bg-slate-800'}`}><span className={sortBy === opt.key ? 'text-orange-500' : 'text-gray-400'}><opt.Icon /></span></div>
                              {opt.label}
                            </span>
                            {sortBy === opt.key && <span className="text-orange-500"><CheckIcon /></span>}
                          </div>
                          <p className="text-[11px] text-gray-400 dark:text-slate-500 mt-0.5 ml-[42px]">{opt.desc}</p>
                        </button>
                      ))}
                    </div>
                  </>)}
                </div>

                {/* Total */}
                <div className="lg:col-span-2 flex flex-col justify-center px-6 sm:px-7 py-6 sm:py-7 border-b sm:border-b-0 sm:border-r border-gray-100 dark:border-slate-700">
                  <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-3"><span className="text-purple-400"><BookOpenIcon /></span> Total</label>
                  <span className="text-sm text-gray-800 dark:text-white">{filtered.length} រឿងរ៉ាវ</span>
                </div>

                {/* Search button */}
                <div className="lg:col-span-2 flex items-center p-4 sm:p-5">
                  <button onClick={handleSearch} className="w-full py-5 sm:py-6 bg-orange-500 hover:bg-orange-600 text-white font-bold text-base sm:text-lg transition-all rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98]">
                    <SearchIconLg /> <span>ស្វែងរក</span>
                  </button>
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* TAG FILTERS */}
      <section className="bg-white dark:bg-slate-900 pt-10 pb-2">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <RevealSection delay={150}>
            <div className="flex flex-wrap gap-2">
              <button onClick={clearFilters} className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${!activeTag && !search ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'bg-slate-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 border border-gray-200 dark:border-slate-700 hover:border-orange-300 hover:text-orange-500'}`}>All</button>
              {tags.map((tag) => {
                const tc = getTagColor(tag);
                return (
                  <button key={tag} onClick={() => { setActiveTag(tag); setSearch(''); setPage(1); }} className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${activeTag === tag ? `${tc.bg} ${tc.text} shadow-md` : 'bg-slate-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 border border-gray-200 dark:border-slate-700 hover:border-orange-300 hover:text-orange-500'}`}>{tag}</button>
                );
              })}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ACTIVE FILTERS */}
      {(search || activeTag || sortBy !== 'latest') && (
        <section className="bg-white dark:bg-slate-900 pb-4">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <RevealSection>
              <div className="flex flex-wrap items-center gap-2 p-3 bg-orange-50 dark:bg-orange-500/10 rounded-xl border border-orange-100 dark:border-orange-500/20">
                <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 mr-1">តម្រងដែលកំពុងប្រើ:</span>
                {activeTag && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-800 text-orange-600 dark:text-orange-400 text-xs font-medium rounded-lg border border-orange-200 dark:border-orange-500/20">
                    <TagSmallIcon size={9} />{activeTag}
                    <button onClick={() => setActiveTag(null)} className="ml-0.5 text-orange-400 hover:text-orange-600"><XMarkIcon size={9} /></button>
                  </span>
                )}
                {search && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-800 text-orange-600 dark:text-orange-400 text-xs font-medium rounded-lg border border-orange-200 dark:border-orange-500/20">
                    <SearchIcon size={9} />"{search}"
                    <button onClick={() => setSearch('')} className="ml-0.5 text-orange-400 hover:text-orange-600"><XMarkIcon size={9} /></button>
                  </span>
                )}
                {sortBy !== 'latest' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-800 text-orange-600 dark:text-orange-400 text-xs font-medium rounded-lg border border-orange-200 dark:border-orange-500/20">
                    <ArrowDownShortIcon size={9} />{sortLabel}
                    <button onClick={() => setSortBy('latest')} className="ml-0.5 text-orange-400 hover:text-orange-600"><XMarkIcon size={9} /></button>
                  </span>
                )}
                <button onClick={clearFilters} className="ml-auto text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline">លុបទាំងអស់</button>
              </div>
            </RevealSection>
          </div>
        </section>
      )}

      {/* SECTION HEADING */}
      <section className="bg-white dark:bg-slate-900 pt-4 pb-6">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <RevealSection>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                  {activeTag ? <span>រឿងរ៉ាវអំពី <span className="text-orange-500 capitalize">{activeTag}</span></span> : search ? 'លទ្ធផលស្វែងរក' : 'រឿងរ៉ាវទាំងអស់'}
                  <span className="text-base font-normal text-gray-400 dark:text-slate-500 ml-2">({filtered.length})</span>
                </h2>
              </div>
              <div className="relative w-full sm:w-60 order-first sm:order-last">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><SearchIcon size={12} /></span>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Quick search..." className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-gray-800 dark:text-white text-sm placeholder:text-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/10 transition-all" />
                {search && <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><XMarkIcon size={12} /></button>}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ARTICLE GRID */}
      <section className="bg-slate-50 dark:bg-slate-800 pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700">
                  <div className="aspect-[16/10] bg-slate-100 dark:bg-slate-700" style={{ animation: 'pulse 1.5s ease-in-out infinite' }}></div>
                  <div className="p-6 sm:p-7 space-y-3">
                    <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded w-3/4" style={{ animation: 'pulse 1.5s ease-in-out infinite' }}></div>
                    <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded w-full" style={{ animation: 'pulse 1.5s ease-in-out infinite' }}></div>
                    <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded w-2/3" style={{ animation: 'pulse 1.5s ease-in-out infinite' }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : paginated.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
                {paginated.map((post, i) => {
                  const tagKey = post.tags?.[0] || 'lifestyle';
                  const tagColor = getTagColor(tagKey);
                  return (
                    <RevealSection key={post.id} delay={i * 80}>
                      <Link to={`/post/${post.id}`} className="group block h-full">
                        <article className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col">
                          <div className="relative aspect-[16/10] overflow-hidden">
                            <img src={post.image || `https://picsum.photos/seed/blog-${post.id}/700/440.jpg`} alt={post.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            {post.tags?.[0] && <span className={`absolute top-4 left-4 px-4 py-1.5 ${tagColor.bg} ${tagColor.text} text-[10px] font-bold uppercase tracking-[0.15em] rounded-lg shadow-lg`}>{post.tags[0]}</span>}
                          </div>
                          <div className="p-6 sm:p-7 flex flex-col flex-1">
                            <h3 className="font-display text-lg sm:text-[1.15rem] font-bold text-gray-900 dark:text-white leading-snug mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">{post.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-6 flex-1">{truncate(post.content, 150)}</p>
                            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-700">
                              <div className="flex items-center gap-2 text-gray-400 dark:text-slate-500 text-xs"><CalendarIcon /><span>{formatDate(post.created_at)}</span></div>
                              <div className="flex items-center gap-2 text-gray-400 dark:text-slate-500 text-xs"><ClockIcon /><span>{estimateReadTime(post.content)} Mins Read</span></div>
                            </div>
                          </div>
                        </article>
                      </Link>
                    </RevealSection>
                  );
                })}
              </div>
              <RevealSection delay={100}><div className="mt-10"><Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} /></div></RevealSection>
            </>
          ) : (
            <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4 text-gray-400 dark:text-slate-500"><NewspaperIcon /></div>
              <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-2">{search || activeTag ? 'No stories found' : 'No stories yet'}</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-5">{search || activeTag ? 'Try adjusting your search or filters.' : 'Start sharing your thoughts with the world.'}</p>
              {!(search || activeTag) && (
                <Link to="/create" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 text-white font-medium text-sm hover:bg-orange-600 transition-colors"><PenNibIcon /> សរសេររឿងដំបូងរបស់អ្នក</Link>
              )}
            </div>
          )}
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <RevealSection>
        <section className="relative overflow-hidden bg-orange-500">
          <div className="absolute inset-0"><img src="https://picsum.photos/seed/blog-newsletter-cta/1600/500.jpg" alt="" className="w-full h-full object-cover mix-blend-overlay opacity-10" /></div>
          <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 py-16 sm:py-20 text-center">
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-6 text-white"><EnvelopeIcon /></div>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-white leading-tight mb-3">កុំឲ្យខកខានរឿងរ៉ាវណាមួយឲ្យសោះ</h2>
            <p className="text-orange-100 text-sm sm:text-base max-w-lg mx-auto mb-8">ទទួលបានអត្ថបទថ្មីៗបំផុតផ្ញើទៅកាន់ប្រអប់អ៊ីមែលរបស់អ្នកដោយផ្ទាល់។ គ្មានសារឥតប្រយោជន៍ គ្មានភាពរំខាន — មានតែរឿងរ៉ាវដែលមានអត្ថន័យ និងគួរអានប៉ុណ្ណោះ.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <Link to="/create" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-orange-500 font-semibold text-sm rounded-xl hover:bg-gray-100 transition-colors shadow-lg"><PenNibIcon /> ចាប់ផ្តើមសរសេរ</Link>
              <Link to="/" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/15 text-white font-semibold text-sm rounded-xl hover:bg-white/25 transition-colors border border-white/20">ត្រឡប់ទៅទំព័រដើម</Link>
            </div>
          </div>
        </section>
      </RevealSection>

    </div>
  );
}