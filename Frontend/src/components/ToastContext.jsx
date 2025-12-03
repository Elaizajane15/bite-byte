import React, { createContext, useContext, useState, useCallback } from 'react';
import '../styles/toast.css';

const ToastContext = createContext(null);

let id = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    const toastId = id++;
    setToasts((t) => [...t, { id: toastId, message, type }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== toastId));
    }, duration);
  }, []);

  const removeToast = useCallback((toastId) => {
    setToasts((t) => t.filter((x) => x.id !== toastId));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type}`}>
            <div className="toast-message">{t.message}</div>
            <button className="toast-close" onClick={() => removeToast(t.id)}>✕</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
