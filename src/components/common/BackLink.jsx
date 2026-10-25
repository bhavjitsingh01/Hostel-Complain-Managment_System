import { Link } from 'react-router-dom';

export function BackLink({ to, label = 'Back', children, className = '' }) {
  return (
    <Link 
      to={to} 
      className={`back-link ${className}`}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
      {children || label}
    </Link>
  );
}