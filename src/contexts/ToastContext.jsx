import { useState, createContext, useContext, useCallback, useRef } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const counter = useRef(0);

  const addToast = useCallback((message, type = 'success') => {
    const id = ++counter.current;
    setToasts((prev) => [...prev, { id, message, type, exiting: false }]);
    setTimeout(() => {
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)));
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 300);
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-20 right-4 z-50 flex flex-col gap-3 pointer-events-none" style={{ maxWidth: '380px' }}>
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto px-5 py-3.5 rounded-lg shadow-lg font-body text-sm font-medium flex items-center gap-3 ${t.exiting ? 'toast-exit' : 'toast-enter'} ${
              t.type === 'success' ? 'bg-emerald-600 text-white' : t.type === 'error' ? 'bg-red-600 text-white' : 'bg-teal-600 text-white'
            }`}
          >
            <i className={`fa-solid ${t.type === 'success' ? 'fa-check-circle' : t.type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}`}></i>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}