export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const delta = 2;
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...');
    }
  }

  return (
    <div className="flex items-center justify-center gap-1.5 mt-12">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="w-9 h-9 rounded-lg flex items-center justify-center text-sm text-ink-muted dark:text-warm-300 hover:bg-warm-100 dark:hover:bg-warm-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
        <i className="fa-solid fa-chevron-left text-xs"></i>
      </button>
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`dots-${i}`} className="w-9 h-9 flex items-center justify-center text-ink-faint dark:text-warm-300 text-sm">...</span>
        ) : (
          <button key={p} onClick={() => onPageChange(p)} className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${p === currentPage ? 'bg-accent text-white' : 'text-ink-muted dark:text-warm-300 hover:bg-warm-100 dark:hover:bg-warm-800'}`}>
            {p}
          </button>
        )
      )}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="w-9 h-9 rounded-lg flex items-center justify-center text-sm text-ink-muted dark:text-warm-300 hover:bg-warm-100 dark:hover:bg-warm-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
        <i className="fa-solid fa-chevron-right text-xs"></i>
      </button>
    </div>
  );
}