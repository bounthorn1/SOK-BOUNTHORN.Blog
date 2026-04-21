import { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

export default function PostForm({ mode, initialData, onSubmit, onCancel }) {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    author: initialData?.author || '',
    image: initialData?.image || '',
    tags: initialData?.tags?.join(', ') || '',
    published: initialData?.published !== false,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (form.title.trim().length < 3) e.title = 'Title must be at least 3 characters';
    if (form.content.trim().length < 10) e.content = 'Content must be at least 10 characters';
    if (form.author.trim().length < 2) e.author = 'Author name is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const data = {
        title: form.title.trim(),
        content: form.content.trim(),
        author: form.author.trim(),
        image: form.image.trim() || `https://picsum.photos/seed/${Date.now()}/1200/600.jpg`,
        tags: form.tags.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean),
        published: form.published,
        created_at: new Date().toISOString(),
      };
      await onSubmit(data);
    } catch {
      addToast('Something went wrong. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  const inputClass = (field) =>
    `w-full px-5 py-3.5 rounded-xl border bg-white dark:bg-warm-900 text-ink dark:text-warm-200 placeholder:text-ink-faint dark:placeholder:text-warm-300 focus:ring-2 transition-all ${
      errors[field] ? 'border-red-400 focus:border-red-400 focus:ring-red-400/10' : 'border-warm-200 dark:border-warm-800 focus:border-accent focus:ring-accent/10'
    }`;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-7">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-ink-muted dark:text-warm-300 mb-2">Title</label>
        <input type="text" value={form.title} onChange={(e) => setField('title', e.target.value)} placeholder="Give your story a title..." className={`${inputClass('title')} text-lg font-display font-semibold`} />
        {errors.title && <p className="text-red-500 text-xs mt-1.5">{errors.title}</p>}
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-ink-muted dark:text-warm-300 mb-2">Author</label>
        <input type="text" value={form.author} onChange={(e) => setField('author', e.target.value)} placeholder="Your name..." className={`${inputClass('author')} text-sm`} />
        {errors.author && <p className="text-red-500 text-xs mt-1.5">{errors.author}</p>}
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-ink-muted dark:text-warm-300 mb-2">Cover Image URL <span className="normal-case tracking-normal font-normal text-ink-faint">(optional)</span></label>
        <input type="url" value={form.image} onChange={(e) => setField('image', e.target.value)} placeholder="https://example.com/image.jpg" className={`${inputClass()} text-sm`} />
        {form.image && (
          <div className="mt-3 rounded-xl overflow-hidden aspect-[2/1] bg-warm-100 dark:bg-warm-800">
            <img src={form.image} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.target.style.display = 'none')} />
          </div>
        )}
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-ink-muted dark:text-warm-300 mb-2">Tags <span className="normal-case tracking-normal font-normal text-ink-faint">(comma-separated)</span></label>
        <input type="text" value={form.tags} onChange={(e) => setField('tags', e.target.value)} placeholder="writing, creativity, life" className={`${inputClass()} text-sm`} />
      </div>
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-semibold uppercase tracking-widest text-ink-muted dark:text-warm-300">Content</label>
          <span className="text-xs text-ink-faint dark:text-warm-300">{form.content.length} characters</span>
        </div>
        <textarea value={form.content} onChange={(e) => setField('content', e.target.value)} placeholder="Write your story..." rows="12" className={`${inputClass('content')} text-sm leading-relaxed resize-y py-4`} />
        {errors.content && <p className="text-red-500 text-xs mt-1.5">{errors.content}</p>}
      </div>
      <div className="flex items-center gap-3">
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={form.published} onChange={(e) => setField('published', e.target.checked)} className="sr-only peer" />
          <div className="w-10 h-[22px] bg-warm-200 dark:bg-warm-800 peer-focus:ring-2 peer-focus:ring-accent/10 rounded-full peer peer-checked:bg-accent transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:after:translate-x-[18px]"></div>
        </label>
        <span className="text-sm text-ink-muted dark:text-warm-300">Publish immediately</span>
      </div>
      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={submitting} className="px-7 py-3 rounded-xl bg-accent text-white font-medium text-sm hover:bg-accent-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2">
          {submitting && <i className="fa-solid fa-spinner fa-spin text-xs"></i>}
          {mode === 'create' ? 'Publish Story' : 'Update Story'}
        </button>
        <button type="button" onClick={onCancel} className="px-7 py-3 rounded-xl border border-warm-200 dark:border-warm-800 text-ink-muted dark:text-warm-300 font-medium text-sm hover:bg-warm-100 dark:hover:bg-warm-800 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}