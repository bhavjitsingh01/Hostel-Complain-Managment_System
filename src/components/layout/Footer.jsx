import { Link } from 'react-router-dom';

export function Footer({ variant = 'default' }) {
  const isDashboard = variant === 'student' || variant === 'warden';

  return (
    <footer className="footer" style={{ 
      width: '100%', 
      maxWidth: 'var(--content)', 
      margin: '0 auto', 
      padding: 'var(--space-6) var(--space-5) var(--space-8)',
      color: 'var(--text-secondary)',
      fontSize: 'var(--text-xs)',
      paddingBottom: isDashboard ? 'calc(var(--space-8) + 80px)' : 'var(--space-8)',
    }}>
      <div className="footer-content" style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-4)',
        width: '100%',
      }}>
        <div className="footer-left" style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 'var(--space-3)',
        }}>
          <span className="footer-brand" style={{ fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            HostelHub
          </span>
          <span className="footer-divider" aria-hidden="true">•</span>
          <span>Hostel Complaint Management System</span>
          <span className="footer-divider" aria-hidden="true">•</span>
          <span>© 2026 HostelHub</span>
        </div>
        <div className="footer-right" style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 'var(--space-4)',
        }}>
          <Link className="footer-link" href="#" style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>
            About
          </Link>
          <Link className="footer-link" href="#" style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}