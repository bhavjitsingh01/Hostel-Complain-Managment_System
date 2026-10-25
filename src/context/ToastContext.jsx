import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    const toast = { id, message, type };
    setToasts(prev => [...prev, toast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3200);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const value = {
    toasts,
    showToast,
    dismissToast,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}

function ToastContainer({ toasts, onDismiss }) {
  return (
    <div className="toast-container" style={{ 
      position: 'fixed', 
      top: 'var(--space-6)', 
      right: 'var(--space-6)', 
      zIndex: 9999, 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 'var(--space-2)',
      pointerEvents: 'none'
    }}>
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function Toast({ toast, onDismiss }) {
  const icons = {
    success: '✓',
    error: '!',
    warning: '⚠',
    info: 'i',
  };
  
  const labels = {
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Info',
  };

  return (
    <div 
      className={`toast toast-${toast.type} show`}
      style={{ 
        pointerEvents: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        padding: 'var(--space-3) var(--space-4)',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg)',
        minWidth: '280px',
        maxWidth: '420px',
        opacity: 1,
        transform: 'translateY(0) scale(1)',
        transition: 'opacity var(--transition-base), transform var(--transition-base)',
      }}
    >
      <div 
        className="toast-icon"
        style={{
          display: 'grid',
          placeItems: 'center',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          fontSize: 'var(--text-xs)',
          fontWeight: '700',
          flexShrink: 0,
          background: `var(--${toast.type}-light)`,
          color: `var(--${toast.type})`,
        }}
      >
        {icons[toast.type]}
      </div>
      <div className="toast-message" style={{ flex: 1, fontSize: 'var(--text-sm)', color: 'var(--text-primary)', lineHeight: 'var(--leading-relaxed)' }}>
        <strong>{labels[toast.type]}</strong>
        <span>{toast.message}</span>
      </div>
      <button 
        className="toast-close"
        onClick={() => onDismiss(toast.id)}
        style={{
          width: '24px',
          height: '24px',
          display: 'grid',
          placeItems: 'center',
          background: 'transparent',
          border: 'none',
          color: 'var(--text-muted)',
          fontSize: 'var(--text-lg)',
          cursor: 'pointer',
          borderRadius: 'var(--radius-sm)',
          flexShrink: 0,
        }}
      >
        ×
      </button>
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}