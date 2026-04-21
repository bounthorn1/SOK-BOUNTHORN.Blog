import { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate, Link } from 'react-router-dom';
import { getPost, updatePost } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import PostForm from '../components/PostForm';
import RevealSection from '../components/RevealSection';

export default function EditPostPage() {
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) return;
    getPost(id)
      .then((data) => setPost(data))
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [id, isAuthenticated]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-12">
        <div className="space-y-4">
          <div className="h-8 bg-warm-100 dark:bg-warm-800 rounded w-1/3" style={{ animation: 'pulse 1.5s ease-in-out infinite' }}></div>
          <div className="h-12 bg-warm-100 dark:bg-warm-800 rounded w-3/4" style={{ animation: 'pulse 1.5s ease-in-out infinite' }}></div>
          <div className="h-48 bg-warm-100 dark:bg-warm-800 rounded-xl mt-4" style={{ animation: 'pulse 1.5s ease-in-out infinite' }}></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-32">
        <h2 className="font-display text-2xl font-bold text-ink dark:text-warm-200 mb-2">Story not found</h2>
        <Link to="/" className="text-sm text-accent hover:underline">Back to home</Link>
      </div>
    );
  }

  const handleSubmit = async (data) => {
    const updated = await updatePost(id, data);
    addToast('Story updated successfully!');
    navigate(`/post/${updated.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-12">
      <RevealSection className="mb-10">
        <h1 className="font-display text-3xl sm:text-4xl font-black text-ink dark:text-warm-200 mb-2">
          Edit story
        </h1>
        <p className="text-ink-muted dark:text-warm-300 text-sm">
          Make changes to your published story.
        </p>
      </RevealSection>
      <RevealSection delay={100}>
        <PostForm mode="edit" initialData={post} onSubmit={handleSubmit} onCancel={() => navigate(`/post/${id}`)} />
      </RevealSection>
    </div>
  );
}