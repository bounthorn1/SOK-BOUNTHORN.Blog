import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../services/api';
import { getAllTags, formatDate, estimateReadTime, truncate } from '../services/utils';
import RevealSection from '../components/RevealSection';
import Pagination from '../components/Pagination';

const POSTS_PER_PAGE = 6;

// ===== INLINE SVG ICONS =====
const FileLinesIcon = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v4a2 2 0 0 1-2 2H6"/></svg>
);
const TagsIcon = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14.172a2 2 0 0 0 1.414-.586l4-4a2 2 0 0 0 0-2.828Z"/><path d="m20 8-6-6H6l2 2 6 6"/></svg>
);
const UserPenIcon = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M11.5 15H7a4 4 0 0 0-4 4v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a4 4 0 0 0-4-4h-.5"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L12 14l-4 1 1-4 7.5-7.5Z"/></svg>
);
const SearchIcon = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
);
const CircleXIcon = ({ size = 18, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
);
const FolderOpenIcon = ({ size = 12, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 14 1.5-2.9A2 2 0 0 1 9.459 9H14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h.541"/><path d="m20 8 .707-4.707a2 2 0 0 0-2.828 0l-2 2a2 2 0 0 0 0 2.828l4.707.707Z"/></svg>
);
const ChevronDownIcon = ({ size = 12, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"/></svg>
);
const GlobeIcon = ({ size = 12, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
);
const TagSmallIcon = ({ size = 12, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14.172a2 2 0 0 0 1.414-.586l4-4a2 2 0 0 0 0-2.828Z"/></svg>
);
const CheckIcon = ({ size = 12, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>
);
const ArrowDownShortIcon = ({ size = 12, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7 15l5 5 5-5"/><path d="M7 9h10"/></svg>
);
const ArrowDownIcon = ({ size = 12, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"/></svg>
);
const ArrowUpIcon = ({ size = 12, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m18 15-6-6-6 6"/></svg>
);
const BookOpenIcon = ({ size = 12, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);
const CalendarIcon = ({ size = 10, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);
const ClockIcon = ({ size = 10, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const NewspaperIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-8.5a2.5 2.5 0 0 1 2.5-2.5H14"/><path d="M15 18H9"/></svg>
);
const PenNibIcon = ({ size = 12, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
);
const XMarkIcon = ({ size = 10, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);
// ===== ADDITIONAL ICONS FOR HOME PAGE =====
const FeatherIcon = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" x2="2" y1="8" y2="22"/><line x1="17.5" x2="9" y1="15" y2="15"/></svg>
);
const ArrowRightIcon = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
const LeafIcon = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
);
const PaletteIcon = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.01 17.461 2 12 2z"/></svg>
);
const BezierIcon = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="m13 13 6 6"/></svg>
);
const PlaneIcon = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 12h20"/><path d="M20 12v-5c0-1.1-.9-2-2-2H7a2 2 0 0 0-2 2v5"/></svg>
);
const UtensilsIcon = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
);
const StarIcon = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
);
const LocationDotIcon = ({ size = 10, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
const CompassIcon = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
);
const FireIcon = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5Z"/></svg>
);
const AwardIcon = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
);
const ShieldIcon = ({ size = 14, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);

const CATEGORY_CARDS = [
  { key: 'lifestyle', label: 'Lifestyle', icon: LeafIcon, image: 'https://picsum.photos/seed/dest-life-b/600/400.jpg' },
  { key: 'creativity', label: 'Creativity', icon: PaletteIcon, image: 'https://picsum.photos/seed/dest-creat-b/600/400.jpg' },
  { key: 'design', label: 'Design', icon: BezierIcon, image: 'https://res.klook.com/image/upload/w_1265,h_791,c_fill,q_85/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/jmbrg1d5kiaxaegud37b.webp' },
  { key: 'travel', label: 'Travel', icon: PlaneIcon, image: 'https://picsum.photos/seed/dest-trav-b/600/400.jpg' },
  { key: 'writing', label: 'Writing', icon: PenNibIcon, image: 'https://picsum.photos/seed/dest-writ-b/600/400.jpg' },
  { key: 'food', label: 'Food', icon: UtensilsIcon, image: 'https://picsum.photos/seed/dest-food-b/600/400.jpg' },
  { key: 'reading', label: 'Reading', icon: BookOpenIcon, image: 'https://picsum.photos/seed/dest-read-b/600/400.jpg' },
];

const TESTIMONIALS = [
  {
    name: 'Sarah Chen',
    location: 'San Francisco',
    avatar: 'https://picsum.photos/seed/rev-sarah-c/80/80.jpg',
    text: 'The stories here feel like conversations with a wise friend. Every piece leaves me thinking for days.',
    rating: 5,
  },
  {
    name: 'Marcus Williams',
    location: 'London',
    avatar: 'https://picsum.photos/seed/rev-marc-c/80/80.jpg',
    text: "Finally a space where writing isn't optimized for clicks. It's optimized for meaning.",
    rating: 5,
  },
  {
    name: 'Yuki Tanaka',
    location: 'Tokyo',
    avatar: 'https://picsum.photos/seed/rev-yuki-c/80/80.jpg',
    text: 'I come here when I need to slow down. The design, the words — everything breathes.',
    rating: 5,
  },
];

const TAG_COLORS = {
  design:     { bg: 'bg-slate-800',     text: 'text-white' },
  creativity: { bg: 'bg-pink-500',      text: 'text-white' },
  travel:     { bg: 'bg-teal-600',      text: 'text-white' },
  writing:    { bg: 'bg-amber-600',     text: 'text-white' },
  lifestyle:  { bg: 'bg-emerald-600',   text: 'text-white' },
  food:       { bg: 'bg-red-500',       text: 'text-white' },
  reading:    { bg: 'bg-indigo-600',    text: 'text-white' },
  mindfulness:{ bg: 'bg-indigo-500',    text: 'text-white' },
  reflection: { bg: 'bg-purple-500',    text: 'text-white' },
  craft:      { bg: 'bg-rose-500',      text: 'text-white' },
  life:       { bg: 'bg-teal-600',      text: 'text-white' },
};

function getTagColor(tag) {
  return TAG_COLORS[tag] || { bg: 'bg-orange-500', text: 'text-white' };
}

export default function HomePage() {
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
      result = result.filter((p) => p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q) || p.author.toLowerCase().includes(q));
    }
    if (sortBy === 'oldest') result = [...result].reverse();
    return result;
  }, [posts, search, activeTag, sortBy]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);
  const featured = posts[0];
  const sidebarFeatured = posts[1];
  const newsPosts = posts.slice(2, 5);

  const clearFilters = () => { setSearch(''); setActiveTag(null); setPage(1); setSortBy('latest'); };
  const scrollToStories = () => { document.getElementById('stories-section')?.scrollIntoView({ behavior: 'smooth' }); };
  const handleCategoryClick = (key) => { setActiveTag(key); setSearch(''); setPage(1); setTimeout(scrollToStories, 150); };
  const handleSearch = () => { setPage(1); scrollToStories(); };
  const handleKeyDown = (e) => { if (e.key === 'Enter') handleSearch(); };
  const sortLabel = sortBy === 'latest' ? 'Latest' : 'Oldest';
  const categoryLabel = activeTag ? activeTag.charAt(0).toUpperCase() + activeTag.slice(1) : 'All Topics';

  return (
    <div>

      {/* ===================== HERO ===================== */}
      <section className="relative min-h-[92vh] sm:min-h-[100vh] flex items-end pb-44 sm:pb-52">
        <div className="absolute inset-0">
          <img src={featured?.image || 'https://picsum.photos/seed/hero-maldives-blog/1600/900.jpg'} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50"></div>
        </div>
        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 mt-auto mb-8">
          <RevealSection>
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500 text-white text-[11px] font-bold uppercase tracking-widest rounded-full mb-5">
                <FeatherIcon size={10} />
                Personal Blog
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-white leading-[1.08] mb-4">
                Discover Stories
                <br />
                <span className="text-orange-300">That Move You</span>
              </h1>
              <p className="text-white/50 text-base sm:text-lg leading-relaxed max-w-lg mb-6">
                Thoughtful writing about life, creativity, and the quiet moments that shape who we are.
              </p>
              <Link to={featured ? `/post/${featured.id}` : '/create'} className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-xl transition-colors shadow-lg shadow-orange-500/30">
                Take a Tour <ArrowRightIcon size={12} />
              </Link>
            </div>
          </RevealSection>
        </div>

        {/* ===== BIG CARD-STYLE SEARCH PANEL ===== */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <RevealSection delay={200}>
              <div className="bg-white rounded-[20px] sm:rounded-2xl shadow-2xl shadow-black/25 overflow-hidden border border-white/50">
                <div className="flex items-center bg-gradient-to-r from-orange-500 to-orange-600">
                  {[
                    { key: 'stories', label: 'Stories', Icon: FileLinesIcon },
                    { key: 'topics', label: 'Topics', Icon: TagsIcon },
                    { key: 'authors', label: 'Authors', Icon: UserPenIcon },
                  ].map((tab) => (
                    <button key={tab.key} onClick={() => setSearchTab(tab.key)} className={`flex items-center gap-2.5 px-6 sm:px-8 py-4 text-sm font-semibold transition-all relative ${searchTab === tab.key ? 'text-white bg-white/15' : 'text-white/60 hover:text-white hover:bg-white/10'}`}>
                      <tab.Icon size={14} />
                      <span>{tab.label}</span>
                      {searchTab === tab.key && <span className="absolute bottom-0 left-3 right-3 h-[3px] bg-white rounded-t-full"></span>}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-0">
                  <div className="lg:col-span-4 flex flex-col justify-center px-6 sm:px-8 py-7 sm:py-8 border-b sm:border-b-0 sm:border-r border-gray-100">
                    <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">
                      <span className="text-orange-400"><SearchIcon size={12} /></span>
                      {searchTab === 'stories' ? 'Keywords' : searchTab === 'topics' ? 'Topic Name' : 'Author Name'}
                    </label>
                    <div className="relative">
                      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={handleKeyDown} placeholder={searchTab === 'stories' ? 'What are you looking for...' : searchTab === 'topics' ? 'Search topics...' : 'Search authors...'} className="w-full bg-transparent text-gray-800 text-lg sm:text-xl placeholder:text-gray-300 focus:outline-none" />
                      {search && (<button onClick={() => setSearch('')} className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors p-1"><CircleXIcon size={18} /></button>)}
                    </div>
                  </div>
                  <div className="lg:col-span-2 relative">
                    <button onClick={() => { setCategoryOpen(!categoryOpen); setSortOpen(false); }} className="w-full flex flex-col justify-center px-6 sm:px-7 py-7 sm:py-8 text-left border-b sm:border-b-0 sm:border-r border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3"><span className="text-blue-400"><FolderOpenIcon /></span>Category</label>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-800 truncate">{categoryLabel}</span>
                        <span className={`text-gray-400 ml-2 shrink-0 transition-transform duration-200 ${categoryOpen ? 'rotate-180' : ''}`}><ChevronDownIcon /></span>
                      </div>
                    </button>
                    {categoryOpen && (<>
                      <div className="fixed inset-0 z-40" onClick={() => setCategoryOpen(false)}></div>
                      <div className="absolute top-full left-0 right-0 sm:left-0 sm:w-64 z-50 bg-white rounded-xl shadow-2xl border border-gray-100 mt-1 py-1.5 max-h-80 overflow-y-auto">
                        <button onClick={() => { setActiveTag(null); setCategoryOpen(false); setPage(1); }} className={`w-full px-5 py-3 text-left text-sm flex items-center justify-between transition-colors ${!activeTag ? 'text-orange-600 bg-orange-50' : 'text-gray-600 hover:bg-gray-50'}`}><span className="flex items-center gap-2.5"><GlobeIcon />All Topics</span>{!activeTag && <span className="text-orange-500"><CheckIcon /></span>}</button>
                        <div className="h-px bg-gray-100 my-1"></div>
                        {tags.map((tag) => (
                          <button key={tag} onClick={() => { setActiveTag(tag); setCategoryOpen(false); setPage(1); }} className={`w-full px-5 py-3 text-left text-sm flex items-center justify-between transition-colors ${activeTag === tag ? 'text-orange-600 bg-orange-50' : 'text-gray-600 hover:bg-gray-50'}`}><span className="flex items-center gap-2.5 capitalize"><TagSmallIcon />{tag}</span>{activeTag === tag && <span className="text-orange-500"><CheckIcon /></span>}</button>
                        ))}
                      </div>
                    </>)}
                  </div>
                  <div className="lg:col-span-2 relative">
                    <button onClick={() => { setSortOpen(!sortOpen); setCategoryOpen(false); }} className="w-full flex flex-col justify-center px-6 sm:px-7 py-7 sm:py-8 text-left border-b sm:border-b-0 sm:border-r border-gray-100 hover:bg-gray-50/50 transition-colors">
                      <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3"><span className="text-emerald-400"><ArrowDownShortIcon /></span>Sort By</label>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-800">{sortLabel}</span>
                        <span className={`text-gray-400 ml-2 shrink-0 transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`}><ChevronDownIcon /></span>
                      </div>
                    </button>
                    {sortOpen && (<>
                      <div className="fixed inset-0 z-40" onClick={() => setSortOpen(false)}></div>
                      <div className="absolute top-full left-0 right-0 sm:left-0 sm:w-56 z-50 bg-white rounded-xl shadow-2xl border border-gray-100 mt-1 py-1.5">
                        {[{ key: 'latest', label: 'Latest First', Icon: ArrowDownIcon, desc: 'Newest stories first' }, { key: 'oldest', label: 'Oldest First', Icon: ArrowUpIcon, desc: 'Earliest stories first' }].map((opt) => (
                          <button key={opt.key} onClick={() => { setSortBy(opt.key); setSortOpen(false); }} className={`w-full px-5 py-3 text-left transition-colors ${sortBy === opt.key ? 'bg-orange-50' : 'hover:bg-gray-50'}`}>
                            <div className="flex items-center justify-between">
                              <span className={`flex items-center gap-2.5 text-sm ${sortBy === opt.key ? 'text-orange-600 font-semibold' : 'text-gray-700'}`}><div className={`w-8 h-8 rounded-lg flex items-center justify-center ${sortBy === opt.key ? 'bg-orange-100' : 'bg-gray-100'}`}><span className={sortBy === opt.key ? 'text-orange-500' : 'text-gray-400'}><opt.Icon /></span></div>{opt.label}</span>
                              {sortBy === opt.key && <span className="text-orange-500"><CheckIcon /></span>}
                            </div>
                            <p className="text-[11px] text-gray-400 mt-0.5 ml-[42px]">{opt.desc}</p>
                          </button>
                        ))}
                      </div>
                    </>)}
                  </div>
                  <div className="lg:col-span-2 flex flex-col justify-center px-6 sm:px-7 py-7 sm:py-8 border-b sm:border-b-0 sm:border-r border-gray-100">
                    <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3"><span className="text-purple-400"><BookOpenIcon /></span>Total</label>
                    <span className="text-sm text-gray-800">{filtered.length} Stories</span>
                  </div>
                  <div className="lg:col-span-2 flex items-center p-4 sm:p-5">
                    <button onClick={handleSearch} className="w-full py-5 sm:py-6 bg-orange-500 hover:bg-orange-600 text-white font-bold text-base sm:text-lg transition-all rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98]">
                      <SearchIcon size={18} />
                      <span>Search</span>
                    </button>
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ===================== POPULAR CATEGORIES ===================== */}
      <section id="categories-section" className="bg-white dark:bg-slate-900 py-16 sm:py-24 lg:py-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center">
            <div className="flex flex-col gap-6 lg:gap-8 order-2 lg:order-1">
              {CATEGORY_CARDS.slice(0, 2).map((cat, i) => (
                <RevealSection key={cat.key} delay={i * 120}>
                  <button onClick={() => handleCategoryClick(cat.key)} className={`group w-full text-left relative aspect-[5/3] rounded-2xl overflow-hidden transition-all duration-300 border-2 ${activeTag === cat.key ? 'border-orange-500 shadow-xl shadow-orange-500/20 scale-[1.02]' : 'border-gray-200 dark:border-slate-700 hover:border-orange-300 hover:shadow-xl hover:-translate-y-1'}`}>
                    <img src={cat.image} alt={cat.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                    <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/15 transition-colors duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-orange-500 transition-colors duration-300"><cat.icon size={12} /></div>
                        <div><h3 className="font-display text-sm font-bold text-white">{cat.label}</h3><p className="text-white/45 text-[10px]">{posts.filter((p) => (p.tags || []).includes(cat.key)).length} stories</p></div>
                      </div>
                    </div>
                  </button>
                </RevealSection>
              ))}
            </div>
            <div className="order-1 lg:order-2 text-center lg:py-8">
              <RevealSection>
                <span className="inline-block text-orange-500 dark:text-orange-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-4">Most Popular Topics</span>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-gray-900 dark:text-white leading-[1.1] mb-5">Let's Discover The World<br /><span className="text-orange-500 dark:text-orange-400">With Our Stories</span></h2>
                <p className="text-gray-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-8">We craft every piece to exceed expectations — offering thoughtful perspectives on life, creativity, and the beautiful moments in between.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button onClick={scrollToStories} className="inline-flex items-center gap-2 px-7 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-xl transition-colors shadow-lg shadow-orange-500/25">Browse Stories <ArrowRightIcon size={12} /></button>
                  <Link to="/create" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 font-semibold text-sm rounded-xl hover:border-orange-300 hover:text-orange-600 dark:hover:border-orange-500 dark:hover:text-orange-400 transition-all"><PenNibIcon size={12} /> Start Writing</Link>
                </div>
                <div className="flex items-center justify-center gap-3 mt-8">
                  {CATEGORY_CARDS.slice(0, 4).map((cat) => (
                    <button key={cat.key} onClick={() => handleCategoryClick(cat.key)} className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all ${activeTag === cat.key ? 'border-orange-500 scale-110 shadow-md shadow-orange-500/30' : 'border-gray-200 dark:border-slate-700 hover:border-orange-400 hover:scale-110'}`} title={cat.label}><img src={cat.image} alt={cat.label} className="w-full h-full object-cover" /></button>
                  ))}
                </div>
              </RevealSection>
            </div>
            <div className="flex flex-col gap-6 lg:gap-8 order-3">
              {CATEGORY_CARDS.slice(2, 4).map((cat, i) => (
                <RevealSection key={cat.key} delay={(i + 2) * 120}>
                  <button onClick={() => handleCategoryClick(cat.key)} className={`group w-full text-left relative aspect-[5/3] rounded-2xl overflow-hidden transition-all duration-300 border-2 ${activeTag === cat.key ? 'border-orange-500 shadow-xl shadow-orange-500/20 scale-[1.02]' : 'border-gray-200 dark:border-slate-700 hover:border-orange-300 hover:shadow-xl hover:-translate-y-1'}`}>
                    <img src={cat.image} alt={cat.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                    <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/15 transition-colors duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-orange-500 transition-colors duration-300"><cat.icon size={12} /></div>
                        <div><h3 className="font-display text-sm font-bold text-white">{cat.label}</h3><p className="text-white/45 text-[10px]">{posts.filter((p) => (p.tags || []).includes(cat.key)).length} stories</p></div>
                      </div>
                    </div>
                  </button>
                </RevealSection>
              ))}
            </div>
          </div>
          {CATEGORY_CARDS.length > 4 && (
            <RevealSection delay={300}>
              <div className="mt-10 sm:mt-14">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">More Topics</h3>
                  <button onClick={scrollToStories} className="text-orange-500 hover:text-orange-600 text-xs font-semibold flex items-center gap-1 transition-colors">View All <ArrowRightIcon size={10} /></button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                  {CATEGORY_CARDS.slice(4).map((cat) => (
                    <button key={cat.key} onClick={() => handleCategoryClick(cat.key)} className={`group shrink-0 w-44 text-left relative aspect-[3/2] rounded-xl overflow-hidden transition-all duration-300 border-2 ${activeTag === cat.key ? 'border-orange-500 shadow-lg shadow-orange-500/20' : 'border-gray-200 dark:border-slate-700 hover:border-orange-300 hover:shadow-lg'}`}>
                      <img src={cat.image} alt={cat.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-3"><div className="flex items-center gap-2"><cat.icon size={10} /><span className="font-display text-xs font-bold text-white">{cat.label}</span></div></div>
                    </button>
                  ))}
                </div>
              </div>
            </RevealSection>
          )}
        </div>
      </section>

      {/* ===================== DISCOVER STRIP ===================== */}
      <RevealSection>
        <section className="relative py-20 sm:py-28 overflow-hidden">
          <div className="absolute inset-0">
            <img src="https://pix8.agoda.net/hotelImages/26082435/-1/fa09ef8b5f5e4d77cf081b6838f9deee.jpg?ce=0&s=1024x" alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">Discover When You Want To Read</h2>
            <p className="text-white/70 text-sm sm:text-base mb-12 max-w-lg mx-auto leading-relaxed">Browse through our collection of thoughtful stories, available anytime you need a moment of reflection.</p>
            <div className="grid grid-cols-3 gap-8 sm:gap-12 max-w-md mx-auto">
              <div className="text-center"><p className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white mb-1">{posts.length}</p><p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/60 font-bold">Stories</p></div>
              <div className="text-center"><p className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white mb-1">{tags.length}</p><p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/60 font-bold">Topics</p></div>
              <div className="text-center"><p className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white mb-1">Free</p><p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/60 font-bold">Always</p></div>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ===================== FEATURED STORY ===================== */}
      {sidebarFeatured && (
        <section className="bg-slate-50 dark:bg-slate-800 py-14 sm:py-20">
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <RevealSection>
              <div className="flex items-center gap-2 mb-6"><StarIcon size={14} className="text-amber-400" /><span className="text-[11px] font-semibold uppercase tracking-widest text-orange-500">Featured Story</span></div>
              <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-700">
                <div className="grid md:grid-cols-2">
                  <div className="aspect-[4/3] md:aspect-auto overflow-hidden"><img src={sidebarFeatured.image || `https://picsum.photos/seed/post-${sidebarFeatured.id}/800/600.jpg`} alt={sidebarFeatured.title} className="w-full h-full object-cover" /></div>
                  <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                    {sidebarFeatured.tags?.[0] && <span className="inline-block text-orange-500 text-[10px] font-bold uppercase tracking-widest mb-3">{sidebarFeatured.tags[0]}</span>}
                    <h2 className="font-display text-2xl sm:text-3xl font-black text-gray-900 dark:text-white leading-tight mb-4">{sidebarFeatured.title}</h2>
                    <p className="text-gray-500 dark:text-slate-400 leading-relaxed mb-6 text-sm sm:text-base">{truncate(sidebarFeatured.content, 200)}</p>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-slate-700 shrink-0"><img src={`https://picsum.photos/seed/${sidebarFeatured.author}/80/80.jpg`} alt="" className="w-full h-full object-cover" /></div>
                      <div><p className="text-sm font-semibold text-gray-800 dark:text-white">{sidebarFeatured.author}</p><p className="text-xs text-gray-400 dark:text-slate-500">{formatDate(sidebarFeatured.created_at)} · {estimateReadTime(sidebarFeatured.content)} min read</p></div>
                    </div>
                    <div className="flex gap-3">
                      <Link to={`/post/${sidebarFeatured.id}`} className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-xl transition-colors">Read Story <ArrowRightIcon size={12} /></Link>
                      <Link to="/create" className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 dark:border-slate-600 text-gray-600 dark:text-slate-300 font-semibold text-sm rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"><PenNibIcon size={12} /> Write Too</Link>
                    </div>
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>
        </section>
      )}

      {/* ===================== LATEST STORIES ===================== */}
      <section id="stories-section" className="bg-white dark:bg-slate-900 py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          {(search || activeTag || sortBy !== 'latest') && (
            <RevealSection>
              <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-orange-50 dark:bg-orange-500/10 rounded-xl border border-orange-100 dark:border-orange-500/20">
                <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 mr-1">Active filters:</span>
                {activeTag && (<span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-800 text-orange-600 dark:text-orange-400 text-xs font-medium rounded-lg border border-orange-200 dark:border-orange-500/20"><TagSmallIcon size={9} />{activeTag}<button onClick={() => setActiveTag(null)} className="ml-0.5 text-orange-400 hover:text-orange-600"><XMarkIcon size={9} /></button></span>)}
                {search && (<span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-800 text-orange-600 dark:text-orange-400 text-xs font-medium rounded-lg border border-orange-200 dark:border-orange-500/20"><SearchIcon size={9} />"{search}"<button onClick={() => setSearch('')} className="ml-0.5 text-orange-400 hover:text-orange-600"><XMarkIcon size={9} /></button></span>)}
                {sortBy !== 'latest' && (<span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-800 text-orange-600 dark:text-orange-400 text-xs font-medium rounded-lg border border-orange-200 dark:border-orange-500/20"><ArrowDownShortIcon size={9} />{sortLabel}<button onClick={() => setSortBy('latest')} className="ml-0.5 text-orange-400 hover:text-orange-600"><XMarkIcon size={9} /></button></span>)}
                <button onClick={clearFilters} className="ml-auto text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline">Clear All</button>
              </div>
            </RevealSection>
          )}
          <RevealSection>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-orange-500 text-[11px] font-semibold uppercase tracking-widest">Blog</span>
                <h2 className="font-display text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-1">
                  {activeTag ? <span>Stories about <span className="text-orange-500 capitalize">{activeTag}</span></span> : search ? 'Search Results' : 'Latest Stories'}
                  <span className="text-base font-normal text-gray-400 dark:text-slate-500 ml-2">({filtered.length})</span>
                </h2>
              </div>
              <div className="relative w-full sm:w-64">
                <SearchIcon size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Quick search..." className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-gray-800 dark:text-white text-sm placeholder:text-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/10 transition-all" />
                {search && <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><XMarkIcon size={12} /></button>}
              </div>
            </div>
          </RevealSection>
          {tags.length > 0 && (
            <RevealSection>
              <div className="flex flex-wrap gap-2 mb-8">
                <button onClick={clearFilters} className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${!activeTag && !search ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'bg-slate-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 border border-gray-200 dark:border-slate-700 hover:border-orange-300 hover:text-orange-500'}`}>All</button>
                {tags.map((tag) => (<button key={tag} onClick={() => { setActiveTag(tag); setSearch(''); setPage(1); }} className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${activeTag === tag ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' : 'bg-slate-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 border border-gray-200 dark:border-slate-700 hover:border-orange-300 hover:text-orange-500'}`}>{tag}</button>))}
              </div>
            </RevealSection>
          )}
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {Array.from({ length: 6 }).map((_, i) => (<div key={i} className="rounded-2xl overflow-hidden bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700"><div className="aspect-[4/3] bg-slate-100 dark:bg-slate-700" style={{ animation: 'pulse 1.5s ease-in-out infinite' }}></div><div className="p-5 space-y-3"><div className="h-3 bg-slate-100 dark:bg-slate-700 rounded w-14" style={{ animation: 'pulse 1.5s ease-in-out infinite' }}></div><div className="h-5 bg-slate-100 dark:bg-slate-700 rounded w-4/5" style={{ animation: 'pulse 1.5s ease-in-out infinite' }}></div><div className="h-3 bg-slate-100 dark:bg-slate-700 rounded w-full" style={{ animation: 'pulse 1.5s ease-in-out infinite' }}></div></div></div>))}
            </div>
          ) : paginated.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {paginated.map((post, i) => (
                  <RevealSection key={post.id} delay={i * 60}>
                    <Link to={`/post/${post.id}`} className="group block h-full">
                      <article className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img src={post.image || `https://picsum.photos/seed/post-${post.id}/600/450.jpg`} alt={post.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          {post.tags?.[0] && <span className="absolute top-3 left-3 px-3 py-1 bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-lg">{post.tags[0]}</span>}
                          <span className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-gray-700 text-[11px] font-semibold rounded-lg flex items-center gap-1"><ClockIcon size={9} />{estimateReadTime(post.content)} min</span>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white leading-snug mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">{post.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4 flex-1">{truncate(post.content, 120)}</p>
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-200 dark:bg-slate-700 shrink-0"><img src={`https://picsum.photos/seed/${post.author}/56/56.jpg`} alt="" className="w-full h-full object-cover" /></div>
                              <div className="min-w-0"><p className="text-xs font-semibold text-gray-700 dark:text-white truncate">{post.author}</p><p className="text-[10px] text-gray-400 dark:text-slate-500">{formatDate(post.created_at)}</p></div>
                            </div>
                            <span className="text-orange-500 text-xs font-semibold flex items-center gap-1 shrink-0 group-hover:gap-2 transition-all">Read <ArrowRightIcon size={10} /></span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </RevealSection>
                ))}
              </div>
              <RevealSection><div className="mt-10"><Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} /></div></RevealSection>
            </>
          ) : (
            <div className="text-center py-20 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4"><NewspaperIcon /></div>
              <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-2">{search || activeTag ? 'No stories found' : 'No stories yet'}</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 mb-5">{search || activeTag ? 'Try adjusting your search or filters.' : 'Start sharing your thoughts with the world.'}</p>
              {!(search || activeTag) && <Link to="/create" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 text-white font-medium text-sm hover:bg-orange-600 transition-colors"><PenNibIcon size={12} /> Write your first story</Link>}
            </div>
          )}
        </div>
      </section>

      {/* ===================== PLAN YOUR NEXT READ ===================== */}
      <section className="bg-slate-50 dark:bg-slate-800 py-16 sm:py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <RevealSection>
              <div>
                <span className="inline-block text-orange-500 dark:text-orange-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-4">Start Your Journey</span>
                <h2 className="font-display text-3xl sm:text-4xl font-black text-gray-900 dark:text-white leading-[1.1] mb-3">Plan Your Next Read</h2>
                <p className="font-display text-lg sm:text-xl font-bold text-gray-600 dark:text-slate-300 mb-5">Discover Stories Whenever You Want</p>
                <p className="text-gray-500 dark:text-slate-400 leading-relaxed text-sm sm:text-base mb-8 max-w-lg">Adventure travel is perfect for those looking to step out of their comfort zone and experience something truly extraordinary. The same goes for reading — every story here is an invitation to explore new perspectives, challenge your thinking, and discover parts of yourself you didn't know existed.</p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-gray-100 dark:border-slate-700"><div className="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center mb-3"><AwardIcon size={18} className="text-orange-500" /></div><h3 className="font-display text-sm font-bold text-gray-900 dark:text-white mb-1">Best Personal Blog</h3><p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">Curated content that prioritizes depth over quantity.</p></div>
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-gray-100 dark:border-slate-700"><div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center mb-3"><ShieldIcon size={18} className="text-blue-500" /></div><h3 className="font-display text-sm font-bold text-gray-900 dark:text-white mb-1">Free Stories Forever</h3><p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">No paywalls, no ads, no algorithms. Just honest writing.</p></div>
                </div>
                <button onClick={scrollToStories} className="inline-flex items-center gap-2.5 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl transition-colors shadow-lg shadow-orange-500/25">Browse Stories <ArrowRightIcon size={12} /></button>
              </div>
            </RevealSection>
            <RevealSection delay={200}>
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-5 shadow-lg"><img src="https://d34vm3j4h7f97z.cloudfront.net/original/4X/8/0/a/80ac9898081e300618021cd68b0db36f84522f61.jpeg" alt="Beach scene" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div></div>
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] shadow-lg"><img src="https://picsum.photos/seed/plan-read-bottom/800/500.jpg" alt="Reading scene" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div></div>
                <div className="absolute -bottom-4 -right-4 sm:bottom-4 sm:right-4 z-10 pointer-events-none"><div className="relative"><span className="block font-display text-[5rem] sm:text-[7rem] font-black text-orange-500/10 dark:text-orange-400/10 leading-none select-none -rotate-12">READ</span><div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-orange-500 flex items-center justify-center shadow-xl shadow-orange-500/30"><BookOpenIcon size={24} className="text-white" /></div></div></div>
                <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center"><FireIcon size={18} className="text-orange-500" /></div><div><p className="text-lg font-display font-black text-gray-900 dark:text-white">{posts.length}+</p><p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">Stories</p></div></div></div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section className="bg-white dark:bg-slate-900 py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <RevealSection>
            <div className="text-center mb-10"><span className="text-orange-500 text-[11px] font-semibold uppercase tracking-widest">Testimonials</span><h2 className="font-display text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-1">What Readers Say</h2></div>
          </RevealSection>
          <div className="grid sm:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">{Array.from({ length: t.rating }).map((_, si) => (<StarIcon key={si} size={12} className="text-amber-400" />))}</div>
                  <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed mb-5 italic flex-1">"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-slate-700">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 dark:bg-slate-700 shrink-0"><img src={t.avatar} alt={t.name} className="w-full h-full object-cover" /></div>
                    <div><p className="text-sm font-bold text-gray-900 dark:text-white">{t.name}</p><p className="text-[11px] text-gray-400 dark:text-slate-500 flex items-center gap-1"><LocationDotIcon size={9} />{t.location}</p></div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== NEXT READING DESTINATION ===================== */}
      <RevealSection>
        <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img src="https://peacepalacelibrary.nl/sites/default/files/styles/featured_image/public/2020-07/Law%20of%20the%20Sea_0.jpg?itok=l6tllHxz" alt="Ocean wave" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10"></div>
          </div>
          <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 py-16">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500 text-white text-[11px] font-bold uppercase tracking-widest rounded-full mb-6"><CompassIcon size={10} />Next Reading Destination</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.08] mb-5">Popular Stories<br /><span className="text-orange-300">Available For Everyone</span></h2>
              <p className="text-white/55 text-base sm:text-lg leading-relaxed max-w-lg mb-8">Dive into a world of stories curated for curious minds. From quiet reflections to bold adventures — there's always something new to discover.</p>
              <div className="flex flex-wrap gap-4">
                <button onClick={scrollToStories} className="inline-flex items-center gap-2.5 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl transition-colors shadow-xl shadow-orange-500/30">Browse Stories Now <ArrowRightIcon size={12} /></button>
                <Link to="/create" className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold text-sm rounded-xl transition-colors border border-white/20"><PenNibIcon size={12} /> Write Your Story</Link>
              </div>
              <div className="flex flex-wrap items-center gap-5 mt-10">
                {[{ number: `${posts.length}+`, label: 'Stories' }, { number: `${tags.length}+`, label: 'Topics' }, { number: '100%', label: 'Free' }].map((stat, i) => (<div key={i} className="flex items-center gap-2.5"><p className="text-xl font-display font-black text-white">{stat.number}</p><p className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">{stat.label}</p>{i < 2 && <span className="w-px h-6 bg-white/15 ml-2.5"></span>}</div>))}
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 z-10 pointer-events-none"><span className="block font-display text-[4rem] sm:text-[6rem] lg:text-[8rem] font-black text-white/[0.06] leading-none select-none -rotate-6">STORIES</span></div>
        </section>
      </RevealSection>

      {/* ===================== LATEST NEWS & ARTICLES ===================== */}
      <section className="bg-slate-50 dark:bg-slate-800 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <RevealSection>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-orange-500 text-[11px] font-semibold uppercase tracking-widest">Our Blog</span>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-2 mb-5">
                Latest News & Articles
              </h2>
              <p className="text-gray-500 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
                Are You Tired Of The Typical Tourist Destinations And Looking To Step Out Of Your Comfort Zone
              </p>
            </div>
          </RevealSection>

          {!loading && newsPosts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
              {newsPosts.map((post, i) => {
                const tagKey = post.tags?.[0] || 'lifestyle';
                const tagColor = getTagColor(tagKey);
                return (
                  <RevealSection key={post.id} delay={i * 130}>
                    <Link to={`/post/${post.id}`} className="group block h-full">
                      <article className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col">
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <img
                            src={post.image || `https://picsum.photos/seed/news-${post.id}/700/440.jpg`}
                            alt={post.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          {post.tags?.[0] && (
                            <span className={`absolute top-4 left-4 px-4 py-1.5 ${tagColor.bg} ${tagColor.text} text-[10px] font-bold uppercase tracking-[0.15em] rounded-lg shadow-lg`}>
                              {post.tags[0]}
                            </span>
                          )}
                        </div>
                        <div className="p-6 sm:p-7 flex flex-col flex-1">
                          <h3 className="font-display text-lg sm:text-[1.15rem] font-bold text-gray-900 dark:text-white leading-snug mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-6 flex-1">
                            {truncate(post.content, 150)}
                          </p>
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
          ) : loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700">
                  <div className="aspect-[16/10] bg-slate-100 dark:bg-slate-700" style={{ animation: 'pulse 1.5s ease-in-out infinite' }}></div>
                  <div className="p-7 space-y-3">
                    <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded w-3/4" style={{ animation: 'pulse 1.5s ease-in-out infinite' }}></div>
                    <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded w-full" style={{ animation: 'pulse 1.5s ease-in-out infinite' }}></div>
                    <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded w-2/3" style={{ animation: 'pulse 1.5s ease-in-out infinite' }}></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-sm text-gray-400 dark:text-slate-500">More stories coming soon.</p>
              <Link to="/create" className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-xl bg-orange-500 text-white font-medium text-sm hover:bg-orange-600 transition-colors"><PenNibIcon size={12} /> Be the first to write</Link>
            </div>
          )}

          {newsPosts.length > 0 && (
            <RevealSection delay={400}>
              <div className="text-center mt-12">
                <button
                  onClick={scrollToStories}
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold text-sm rounded-xl transition-all duration-300"
                >
                  View All Articles
                  <ArrowRightIcon size={12} />
                </button>
              </div>
            </RevealSection>
          )}
        </div>
      </section>

      {/* ===================== BOTTOM CTA ===================== */}
      <RevealSection>
        <section className="relative overflow-hidden bg-orange-500">
          <div className="absolute inset-0"><img src="https://picsum.photos/seed/cta-bottom-orange/1600/500.jpg" alt="" className="w-full h-full object-cover mix-blend-overlay opacity-10" /></div>
          <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 py-16 sm:py-20 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="text-center sm:text-left">
              <h2 className="font-display text-2xl sm:text-3xl font-black text-white leading-tight mb-2">Ready to Write?</h2>
              <p className="text-orange-100 text-sm sm:text-base">Share your first story — it's free and always will be.</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link to="/create" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-orange-500 font-semibold text-sm rounded-xl hover:bg-gray-100 transition-colors shadow-lg"><PenNibIcon size={12} /> Write Now</Link>
              <Link to="/login" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/15 text-white font-semibold text-sm rounded-xl hover:bg-white/25 transition-colors border border-white/20">Sign In</Link>
            </div>
          </div>
        </section>
      </RevealSection>
    </div>
  );
}