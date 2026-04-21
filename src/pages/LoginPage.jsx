import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import RevealSection from '../components/RevealSection';

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
      if (success) addToast('Welcome back!');
    } else {
      if (username.trim().length < 3) {
        setAuthError('Username must be at least 3 characters');
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setAuthError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }
      success = await register(username.trim(), password, name.trim());
      if (success) addToast('Account created successfully!');
    }

    setLoading(false);
    if (success) navigate('/');
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <RevealSection className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-accent/10 dark:bg-accent/15 flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-feather-pointed text-accent text-xl"></i>
          </div>
          <h1 className="font-display text-2xl font-bold text-ink dark:text-warm-200 mb-1">
            {mode === 'login' ? 'Welcome back' : 'Create account'}
          </h1>
          <p className="text-sm text-ink-muted dark:text-warm-300">
            {mode === 'login' ? 'Sign in to your Inkwell account' : 'Join Inkwell and start writing'}
          </p>
        </RevealSection>

        <RevealSection delay={100}>
          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-ink-muted dark:text-warm-300 mb-2">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setAuthError(''); }}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl border border-warm-200 dark:border-warm-800 bg-white dark:bg-warm-900 text-ink dark:text-warm-200 text-sm placeholder:text-ink-faint dark:placeholder:text-warm-300 focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-ink-muted dark:text-warm-300 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setAuthError(''); }}
                placeholder="Enter username"
                className="w-full px-4 py-3 rounded-xl border border-warm-200 dark:border-warm-800 bg-white dark:bg-warm-900 text-ink dark:text-warm-200 text-sm placeholder:text-ink-faint dark:placeholder:text-warm-300 focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-ink-muted dark:text-warm-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setAuthError(''); }}
                placeholder={mode === 'register' ? 'Min 6 characters' : 'Enter password'}
                className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-warm-900 text-ink dark:text-warm-200 text-sm placeholder:text-ink-faint dark:placeholder:text-warm-300 focus:ring-2 transition-all ${authError ? 'border-red-400 focus:border-red-400 focus:ring-red-400/10' : 'border-warm-200 dark:border-warm-800 focus:border-accent focus:ring-accent/10'}`}
              />
            </div>

            {authError && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <i className="fa-solid fa-circle-exclamation text-xs"></i>{authError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {loading && <i className="fa-solid fa-spinner fa-spin text-xs"></i>}
              {mode === 'login' ? 'Sign in' : 'Create account'}
            </button>
          </form>
        </RevealSection>

        <RevealSection delay={200}>
          <p className="text-center text-sm text-ink-muted dark:text-warm-300 mt-6">
            {mode === 'login' ? (
              <>Don't have an account? <button onClick={() => switchMode('register')} className="text-accent font-medium hover:underline">Sign up</button></>
            ) : (
              <>Already have an account? <button onClick={() => switchMode('login')} className="text-accent font-medium hover:underline">Sign in</button></>
            )}
          </p>
        </RevealSection>

        {/* <RevealSection delay={250}>
          <div className="mt-6 p-4 rounded-xl bg-warm-100 dark:bg-warm-800/50 border border-warm-200 dark:border-warm-800">
            <p className="text-xs text-ink-faint dark:text-warm-300 text-center mb-2">
              <i className="fa-solid fa-circle-info mr-1"></i>Demo accounts:
            </p>
            <div className="space-y-1">
              {[{ user: 'alex', pass: 'alex123' }, { user: 'sarah', pass: 'sarah123' }, { user: 'admin', pass: 'admin123' }].map((acc) => (
                <p key={acc.user} className="text-xs text-ink-faint dark:text-warm-300 text-center">
                  <strong className="text-ink dark:text-warm-200">{acc.user}</strong> / {acc.pass}
                </p>
              ))}
            </div>
          </div>
        </RevealSection> */}
      </div>
    </div>
  );
}