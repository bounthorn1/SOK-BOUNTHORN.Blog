import { Link } from 'react-router-dom';
import RevealSection from '../components/RevealSection';

export default function NotFoundPage() {
  return (
    <div className="text-center py-32">
      <RevealSection>
        <p className="text-7xl font-display font-black text-warm-200 dark:text-warm-800 mb-4">404</p>
        <h2 className="font-display text-2xl font-bold text-ink dark:text-warm-200 mb-2">Page not found</h2>
        <p className="text-sm text-ink-faint dark:text-warm-300 mb-6">The page you're looking for doesn't exist.</p>
        <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent-dark transition-colors">
          <i className="fa-solid fa-arrow-left text-xs"></i>Back to home
        </Link>
      </RevealSection>
    </div>
  );
}