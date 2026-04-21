export default function SearchFilter({ search, onSearchChange, activeTag, onTagChange, tags }) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint dark:text-warm-300 text-sm"></i>
        <input type="text" value={search} onChange={(e) => onSearchChange(e.target.value)} placeholder="Search stories..." className="w-full pl-11 pr-4 py-3 rounded-xl border border-warm-200 dark:border-warm-800 bg-white dark:bg-warm-900 text-ink dark:text-warm-200 text-sm placeholder:text-ink-faint dark:placeholder:text-warm-300 focus:border-accent dark:focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all" />
        {search && (
          <button onClick={() => onSearchChange('')} className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-ink-faint hover:text-ink dark:hover:text-warm-200 hover:bg-warm-100 dark:hover:bg-warm-800 transition-colors">
            <i className="fa-solid fa-xmark text-xs"></i>
          </button>
        )}
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button onClick={() => onTagChange(null)} className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${!activeTag ? 'bg-accent text-white' : 'bg-warm-100 dark:bg-warm-800 text-ink-muted dark:text-warm-300 hover:bg-warm-200 dark:hover:bg-warm-800/80'}`}>
            All
          </button>
          {tags.map((tag) => (
            <button key={tag} onClick={() => onTagChange(tag)} className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${activeTag === tag ? 'bg-accent text-white' : 'bg-warm-100 dark:bg-warm-800 text-ink-muted dark:text-warm-300 hover:bg-warm-200 dark:hover:bg-warm-800/80'}`}>
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}