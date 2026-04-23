import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import RevealSection from '../components/RevealSection';

// --- NEW ICON COMPONENTS (Matching your ContactPage style) ---

const FeatherIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/>
    <line x1="16" x2="8" y1="8" y2="16"/>
    <line x1="12" x2="15" y1="12" y2="15"/>
  </svg>
);

const AlertIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" x2="12" y1="8" y2="12"/>
    <line x1="12" x2="12.01" y1="16" y2="16"/>
  </svg>
);

const SpinnerIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
  </svg>
);

// ---------------------------------------------------------------

export default function LoginPage() {
  const { login, register, isAuthenticated, authError, setAuthError } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);

  const switchMode = (m) => {
    setMode(m);
    setAuthError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let success = false;

    if (mode === 'login') {
      success = await login(username.trim(), password);
      if (success) addToast('សូមស្វាគមន៍ត្រឡប់មកវិញ!');
    } else {
      if (username.trim().length < 3) {
        setAuthError('ឈ្មោះអ្នកប្រើប្រាស់ត្រូវតែមានយ៉ាងហោចណាស់ 3 តួអក្សរ');
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setAuthError('ពាក្យសម្ងាត់ត្រូវតែមានយ៉ាងហោចណាស់ 6 តួអក្សរ');
        setLoading(false);
        return;
      }
      success = await register(username.trim(), password, name.trim());
      if (success) addToast('គណនីត្រូវបានបង្កើតដោយជោគជ័យ!');
    }

    setLoading(false);
    if (success) navigate('/');
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <RevealSection className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-accent/10 dark:bg-accent/15 flex items-center justify-center mx-auto mb-4">
            {/* FIXED: Replaced <i className="fa-solid..."></i> with FeatherIcon */}
            <FeatherIcon className="text-accent text-xl" />
          </div>
          <h1 className="font-display text-2xl font-bold text-ink dark:text-warm-200 mb-1">
            {mode === 'login' ? 'សូមស្វាគមន៍' : 'បង្កើតគណនី'}
          </h1>
          <p className="text-sm text-ink-muted dark:text-warm-300">
            {mode === 'login' ? 'ចូលគណនីទៅកាន់គណនី ប៊ុនថនប្លុក របស់អ្នក' : 'ចុះឈ្មោះជាមួយ ប៊ុនថនប្លុក ហើយចាប់ផ្តើមសរសេរ'}
          </p>
        </RevealSection>

        <RevealSection delay={100}>
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-ink-muted dark:text-warm-300 mb-2">ឈ្មោះបង្ហាញ</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setAuthError(''); }}
                  placeholder="ឈ្មោះរបស់អ្នក"
                  className="w-full px-4 py-3 rounded-xl border border-warm-200 dark:border-warm-800 bg-white dark:bg-warm-900 text-ink dark:text-warm-200 text-sm placeholder:text-ink-faint dark:placeholder:text-warm-300 focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-ink-muted dark:text-warm-300 mb-2">ឈ្មោះអ្នកប្រើប្រាស់</label>
              <input
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setAuthError(''); }}
                placeholder="បញ្ចូលឈ្មោះអ្នកប្រើប្រាស់"
                className="w-full px-4 py-3 rounded-xl border border-warm-200 dark:border-warm-800 bg-white dark:bg-warm-900 text-ink dark:text-warm-200 text-sm placeholder:text-ink-faint dark:placeholder:text-warm-300 focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-ink-muted dark:text-warm-300 mb-2">ពាក្យសម្ងាត់</label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setAuthError(''); }}
                placeholder={mode === 'register' ? 'យ៉ាងហោចណាស់ 6 តួអក្សរ' : 'ពាក្យសម្ងាត់របស់អ្នក'}
                className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-warm-900 text-ink dark:text-warm-200 text-sm placeholder:text-ink-faint dark:placeholder:text-warm-300 focus:ring-2 transition-all ${authError ? 'border-red-400 focus:border-red-400 focus:ring-red-400/10' : 'border-warm-200 dark:border-warm-800 focus:border-accent focus:ring-accent/10'}`}
              />
            </div>

            {authError && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                {/* FIXED: Replaced <i className="fa-solid..."></i> with AlertIcon */}
                <AlertIcon className="text-xs" />
                {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {loading && <span className="animate-spin"><SpinnerIcon /></span>}
              {mode === 'login' ? 'ចូលគណនី' : 'បង្កើតគណនី'}
            </button>
          </form>
        </RevealSection>

        <RevealSection delay={200}>
          <p className="text-center text-sm text-ink-muted dark:text-warm-300 mt-6">
            {mode === 'login' ? (
              <>គ្មានគណនី? <button onClick={() => switchMode('register')} className="text-accent font-medium hover:underline">ចុះឈ្មោះ</button></>
            ) : (
              <>មានគណនីហើយ? <button onClick={() => switchMode('login')} className="text-accent font-medium hover:underline">ចូលគណនី</button></>
            )}
          </p>
        </RevealSection>
      </div>
    </div>
  );
}