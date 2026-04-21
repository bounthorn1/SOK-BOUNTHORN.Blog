import { Navigate, useNavigate } from 'react-router-dom';
import { createPost } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import PostForm from '../components/PostForm';
import RevealSection from '../components/RevealSection';

export default function CreatePostPage() {
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const handleSubmit = async (data) => {
    const post = await createPost(data);
    addToast('Story published successfully!');
    navigate(`/post/${post.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-12">
      <RevealSection className="mb-10">
        <h1 className="font-display text-3xl sm:text-4xl font-black text-ink dark:text-warm-200 mb-2">
          Write a story
        </h1>
        <p className="text-ink-muted dark:text-warm-300 text-sm">
          Share your thoughts with the world.
        </p>
      </RevealSection>
      <RevealSection delay={100}>
        <PostForm mode="create" onSubmit={handleSubmit} onCancel={() => navigate('/')} />
      </RevealSection>
    </div>
  );
}