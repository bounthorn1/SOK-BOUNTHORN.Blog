export default function ConfirmModal({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 anim-fade-in"
      onClick={onCancel}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      <div
        className="relative bg-white dark:bg-warm-900 rounded-xl shadow-2xl p-7 max-w-sm w-full anim-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-display text-xl font-bold mb-2 text-ink dark:text-warm-200">
          {title}
        </h3>
        <p className="text-ink-muted dark:text-warm-300 text-sm leading-relaxed mb-6">
          {message}
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-ink-muted dark:text-warm-300 hover:bg-warm-100 dark:hover:bg-warm-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}