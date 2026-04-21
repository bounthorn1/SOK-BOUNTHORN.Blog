import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

// Inline SVG icons — no external library needed
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
);
const BlogIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
);
const AboutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
);
const ContactIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const WriteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
);
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
);
const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
);
const FeatherIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" x2="2" y1="8" y2="22"/><line x1="17.5" x2="9" y1="15" y2="15"/></svg>
);

// Mobile-sized icons
const HomeIconSm = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
);
const BlogIconSm = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
);
const AboutIconSm = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
);
const ContactIconSm = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const WriteIconSm = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
);

export default function Navbar() {
  const { dark, toggle } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const isActive = (path) => location.pathname === path;

  const desktopLinks = [
    { to: '/', label: 'Home', Icon: HomeIcon },
    { to: '/blog', label: 'Blog', Icon: BlogIcon },
    { to: '/about', label: 'About', Icon: AboutIcon },
    { to: '/contact', label: 'Contact', Icon: ContactIcon },
    ...(isAuthenticated ? [{ to: '/create', label: 'Write', Icon: WriteIcon }] : []),
  ];

  const mobileTabs = [
    { to: '/', label: 'Home', Icon: HomeIconSm },
    { to: '/blog', label: 'Blog', Icon: BlogIconSm },
    { to: '/about', label: 'About', Icon: AboutIconSm },
    { to: '/contact', label: 'Contact', Icon: ContactIconSm },
    ...(isAuthenticated ? [{ to: '/create', label: 'Write', Icon: WriteIconSm }] : []),
  ];

  return (
    <>
      {/* ===== DESKTOP TOP NAVBAR ===== */}
      <nav className={`hidden sm:block sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-warm-50/90 dark:bg-warm-950/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.05)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.05)]' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5 group">
              <span className="text-accent group-hover:rotate-12 transition-transform duration-300"><FeatherIcon /></span>
              <span className="font-display text-xl font-bold text-ink dark:text-warm-200">BOUNTHORN</span>
            </Link>

            <div className="flex items-center gap-0.5">
              {desktopLinks.map((link) => {
                const active = isActive(link.to);
                return (
                  <Link key={link.to} to={link.to} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 relative group">
                    <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                      active ? 'bg-accent/10 dark:bg-accent/15' : 'group-hover:bg-warm-100/70 dark:group-hover:bg-warm-800/50'
                    }`}></div>
                    <span className={`relative transition-all duration-300 ${active ? 'text-accent' : 'text-ink-muted/60 dark:text-warm-400/60 group-hover:text-ink dark:group-hover:text-warm-200'}`}>
                      <link.Icon />
                    </span>
                    <span className={`relative transition-all duration-300 ${active ? 'text-accent' : 'text-ink-muted dark:text-warm-300 group-hover:text-ink dark:group-hover:text-warm-200'}`}>
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button onClick={toggle} aria-label="Toggle theme" className="w-9 h-9 rounded-lg flex items-center justify-center text-ink-muted dark:text-warm-300 hover:bg-warm-100 dark:hover:bg-warm-800 transition-colors">
                {dark ? <SunIcon /> : <MoonIcon />}
              </button>

              {isAuthenticated ? (
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-warm-200 dark:bg-warm-800">
                    <img src={user.avatar || `https://picsum.photos/seed/${user.username}/64/64.jpg`} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-sm font-medium text-ink dark:text-warm-200">{user.name}</span>
                  <button onClick={() => { logout(); navigate('/'); }} className="px-3.5 py-2 rounded-lg text-sm font-medium text-ink-muted dark:text-warm-300 hover:bg-warm-100 dark:hover:bg-warm-800 transition-colors">
                    Sign out
                  </button>
                </div>
              ) : (
                <Link to="/login" className="px-4 py-2 rounded-lg text-sm font-medium bg-accent text-white hover:bg-accent-dark transition-colors">
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ===== MOBILE TOP BAR ===== */}
      <nav className={`sm:hidden sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-warm-50/90 dark:bg-warm-950/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.05)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.05)]' : 'bg-transparent'}`}>
        <div className="px-5">
          <div className="flex items-center justify-between h-14">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-accent group-hover:rotate-12 transition-transform duration-300"><FeatherIcon /></span>
              <span className="font-display text-lg font-bold text-ink dark:text-warm-200">BOUNTHORN</span>
            </Link>

            <div className="flex items-center gap-1.5">
              <button onClick={toggle} aria-label="Toggle theme" className="w-9 h-9 rounded-lg flex items-center justify-center text-ink-muted dark:text-warm-300 hover:bg-warm-100 dark:hover:bg-warm-800 transition-colors">
                {dark ? <SunIcon /> : <MoonIcon />}
              </button>

              {isAuthenticated ? (
                <div className="w-8 h-8 rounded-full overflow-hidden bg-warm-200 dark:bg-warm-800">
                  <img src={user.avatar || `https://picsum.photos/seed/${user.username}/64/64.jpg`} alt={user.name} className="w-full h-full object-cover" />
                </div>
              ) : (
                <Link to="/login" className="px-3.5 py-2 rounded-lg text-sm font-medium bg-accent text-white hover:bg-accent-dark transition-colors">
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ===== MOBILE BOTTOM TAB BAR ===== */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="bg-warm-50/95 dark:bg-warm-950/95 backdrop-blur-lg border-t border-warm-200/60 dark:border-warm-800/60">
          <div className="flex items-center justify-around px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
            {mobileTabs.map((tab) => {
              const active = isActive(tab.to);
              return (
                <Link key={tab.to} to={tab.to} className="flex flex-col items-center gap-0.5 min-w-[3.5rem] py-1 rounded-xl transition-all duration-200 relative group">
                  <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${active ? 'bg-accent/10 dark:bg-accent/15' : 'group-hover:bg-warm-100/60 dark:group-hover:bg-warm-800/40'}`}></div>
                  <span className={`relative transition-all duration-300 ${active ? 'text-accent scale-110' : 'text-ink-muted/60 dark:text-warm-400/60 group-hover:text-ink-muted dark:group-hover:text-warm-300'}`}>
                    <tab.Icon />
                  </span>
                  <span className={`relative text-[0.65rem] font-semibold tracking-wide transition-all duration-300 ${active ? 'text-accent' : 'text-ink-muted/50 dark:text-warm-400/50 group-hover:text-ink-muted dark:group-hover:text-warm-300'}`}>
                    {tab.label}
                  </span>
                  <div className={`absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-300 ${active ? 'bg-accent scale-100 opacity-100' : 'scale-0 opacity-0'}`}></div>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="sm:hidden h-[4.5rem]"></div>
    </>
  );
}