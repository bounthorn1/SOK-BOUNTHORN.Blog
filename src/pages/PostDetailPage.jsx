import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPost, getPosts, deletePost } from '../services/api';
import { formatDate, estimateReadTime } from '../services/utils';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import PostCard from '../components/PostCard';
import ConfirmModal from '../components/ConfirmModal';
import RevealSection from '../components/RevealSection';

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    setLoading(true);
    getPost(id)
      .then((data) => setPost(data))
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!post) return;
    getPosts().then((all) => {
      const related = all
        .filter(
          (p) =>
            p.id !== post.id &&
            (p.tags || []).some((t) => (post.tags || []).includes(t))
        )
        .slice(0, 3);
      setRelatedPosts(
        related.length
          ? related
          : all.filter((p) => p.id !== post.id).slice(0, 3)
      );
    });
  }, [post]);

  const handleDelete = async () => {
    await deletePost(id);
    addToast('Story deleted successfully');
    navigate('/');
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-20">
        <div className="space-y-4">
          <div className="h-4 bg-warm-100 dark:bg-warm-800 rounded w-40" style={{ animation: 'pulse 1.5s ease-in-out infinite' }}></div>
          <div className="h-10 bg-warm-100 dark:bg-warm-800 rounded w-3/4" style={{ animation: 'pulse 1.5s ease-in-out infinite' }}></div>
          <div className="h-4 bg-warm-100 dark:bg-warm-800 rounded w-1/2" style={{ animation: 'pulse 1.5s ease-in-out infinite' }}></div>
          <div className="aspect-[2/1] bg-warm-100 dark:bg-warm-800 rounded-xl mt-6" style={{ animation: 'pulse 1.5s ease-in-out infinite' }}></div>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-4 bg-warm-100 dark:bg-warm-800 rounded" style={{ animation: 'pulse 1.5s ease-in-out infinite' }}></div>
          ))}
        </div>
      </div>
    );
  }

  // Not found
  if (!post) {
    return (
      <div className="text-center py-32">
        <i className="fa-regular fa-face-meh text-5xl text-warm-300 dark:text-warm-800 mb-5 block"></i>
        <h2 className="font-display text-2xl font-bold text-ink dark:text-warm-200 mb-2">
          Story not found
        </h2>
        <p className="text-sm text-ink-muted dark:text-warm-300 mb-6">
          This story may have been removed or doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent-dark transition-colors"
        >
          <i className="fa-solid fa-arrow-left text-xs"></i>
          Back to home
        </Link>
      </div>
    );
  }

  const paragraphs = post.content.split('\n\n').filter(Boolean);
  const readTime = estimateReadTime(post.content);

  return (
    <div>
      <article className="max-w-3xl mx-auto px-5 sm:px-8">
        {/* Back link */}
        <RevealSection className="pt-6 pb-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-ink-muted dark:text-warm-300 hover:text-accent transition-colors"
          >
            <i className="fa-solid fa-arrow-left text-xs"></i>
            All stories
          </Link>
        </RevealSection>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <RevealSection className="flex gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-semibold uppercase tracking-widest text-accent"
              >
                {tag}
              </span>
            ))}
          </RevealSection>
        )}

        {/* Title */}
        <RevealSection>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-ink dark:text-warm-200 leading-tight mb-5">
            {post.title}
          </h1>
        </RevealSection>

        {/* Author bar */}
        <RevealSection>
          <div className="flex items-center gap-3 mb-8 pb-8 border-b border-warm-200 dark:border-warm-800">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-warm-200 dark:bg-warm-800">
              <img
                src={`https://picsum.photos/seed/${post.author}/80/80.jpg`}
                alt={post.author}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink dark:text-warm-200">
                {post.author}
              </p>
              <p className="text-xs text-ink-muted dark:text-warm-300">
                {formatDate(post.created_at)} &middot; {readTime} min read
              </p>
            </div>
            {isAuthenticated && (
              <div className="ml-auto flex gap-2">
                <Link
                  to={`/edit/${post.id}`}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-ink-muted dark:text-warm-300 hover:text-accent hover:bg-accent/10 transition-colors"
                  aria-label="Edit"
                >
                  <i className="fa-solid fa-pen text-xs"></i>
                </Link>
                <button
                  onClick={() => setDeleteModal(true)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-ink-muted dark:text-warm-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                  aria-label="Delete"
                >
                  <i className="fa-solid fa-trash-can text-xs"></i>
                </button>
              </div>
            )}
          </div>
        </RevealSection>

        {/* Cover image */}
        <RevealSection>
          <div className="rounded-2xl overflow-hidden mb-10 bg-warm-100 dark:bg-warm-800">
            <img
              src={
                post.image ||
                `https://picsum.photos/seed/post-${post.id}/1200/600.jpg`
              }
              alt={post.title}
              className="w-full object-cover"
            />
          </div>
        </RevealSection>

        {/* Article content */}
        <div className="text-ink dark:text-warm-200 text-[17px] sm:text-lg font-light">
          {paragraphs.map((p, i) => (
            <RevealSection key={i} delay={i * 50}>
              <p style={{ marginBottom: '1.6em', lineHeight: '1.85' }}>
                {p}
              </p>
            </RevealSection>
          ))}
        </div>

        {/* Bottom bar */}
        <RevealSection>
          <div className="flex items-center justify-between mt-12 pt-8 border-b border-warm-200 dark:border-warm-800 mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-ink-muted dark:text-warm-300 hover:text-accent transition-colors"
            >
              <i className="fa-solid fa-arrow-left text-xs"></i>
              All stories
            </Link>
            <div className="flex gap-2">
              {[
                'fa-brands fa-x-twitter',
                'fa-brands fa-facebook-f',
                'fa-solid fa-link',
              ].map((icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-ink-muted dark:text-warm-300 hover:text-accent hover:bg-accent/10 transition-colors"
                  aria-label="Share"
                >
                  <i className={`${icon} text-sm`}></i>
                </button>
              ))}
            </div>
          </div>
        </RevealSection>
      </article>

      {/* Related posts - FIXED: Removed RevealSection so they are always visible */}
      {relatedPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-5 sm:px-8 mt-8 mb-8">
          <RevealSection>
            <h2 className="font-display text-xl font-bold text-ink dark:text-warm-200 mb-6">
              More stories
            </h2>
          </RevealSection>
          <div className="grid sm:grid-cols-3 gap-6">
            {relatedPosts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}

      {/* Delete confirmation */}
      <ConfirmModal
        open={deleteModal}
        title="Delete this story?"
        message="This action cannot be undone. The story will be permanently removed."
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal(false)}
      />
    </div>
  );
}