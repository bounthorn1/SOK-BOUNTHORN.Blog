import { Link } from 'react-router-dom';
import { truncate, formatDate, estimateReadTime } from '../services/utils';

export default function PostCard({ post }) {
  const readTime = estimateReadTime(post.content);

  return (
    <article className="reveal group">
      <Link to={`/post/${post.id}`} className="block">
        <div className="rounded-xl overflow-hidden border border-warm-200 dark:border-warm-800 bg-white dark:bg-warm-900 hover:border-accent/30 dark:hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300">
          <div className="aspect-[16/9] overflow-hidden bg-warm-100 dark:bg-warm-800">
            <img src={post.image || `https://picsum.photos/seed/post-${post.id}/800/400.jpg`} alt={post.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="p-5 sm:p-6">
            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2 mb-3">
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-[11px] font-semibold uppercase tracking-widest text-accent">{tag}</span>
                ))}
              </div>
            )}
            <h2 className="font-display text-lg sm:text-xl font-bold text-ink dark:text-warm-200 leading-snug mb-2 group-hover:text-accent transition-colors duration-300 line-clamp-2">{post.title}</h2>
            <p className="text-sm text-ink-muted dark:text-warm-300 leading-relaxed mb-4 line-clamp-2">{truncate(post.content, 140)}</p>
            <div className="flex items-center gap-3 text-xs text-ink-faint dark:text-warm-300">
              <span className="font-medium text-ink-muted dark:text-warm-300">{post.author}</span>
              <span className="w-1 h-1 rounded-full bg-warm-300 dark:bg-warm-800"></span>
              <span>{formatDate(post.created_at)}</span>
              <span className="w-1 h-1 rounded-full bg-warm-300 dark:bg-warm-800"></span>
              <span>{readTime} min read</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}