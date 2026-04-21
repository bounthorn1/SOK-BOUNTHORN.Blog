export const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const estimateReadTime = (text) => {
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 220));
};

export const truncate = (text, len = 150) => {
  if (text.length <= len) return text;
  return text.substring(0, len).replace(/\s+\S*$/, '') + '...';
};

export const getAllTags = (posts) => {
  const set = new Set();
  posts.forEach((p) => (p.tags || []).forEach((t) => set.add(t)));
  return [...set].sort();
};