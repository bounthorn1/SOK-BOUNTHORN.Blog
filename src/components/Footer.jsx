export default function Footer() {
  return (
    <footer className="border-t border-warm-200 dark:border-warm-800 mt-20">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-feather-pointed text-accent text-sm"></i>
          <span className="font-display text-sm font-semibold text-ink dark:text-warm-300">រក្សាសិទ្ធិ © 2026 BOUNTHORN រក្សាសិទ្ធិគ្រប់យ៉ាង</span>
          <span className="text-xs text-ink-faint dark:text-warm-300 ml-2">ទីកន្លែងសម្រាប់រឿងរ៉ាវ</span>
        </div>
        <div className="flex items-center gap-5">
          {['fa-brands fa-x-twitter', 'fa-brands fa-github', 'fa-brands fa-dribbble'].map((icon, i) => (
            <a key={i} href="#" className="text-ink-faint dark:text-warm-300 hover:text-accent transition-colors" aria-label="Social link">
              <i className={`${icon} text-sm`}></i>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}