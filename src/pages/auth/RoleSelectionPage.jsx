import { Link } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export function RoleSelectionPage({ mode = 'signin' }) {
  const isSignup = mode === 'signup';

  return (
    <div className="role-selection-page page-layout" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: `
        radial-gradient(ellipse 70% 50% at 50% 0%, var(--accent-muted), transparent 65%),
        radial-gradient(ellipse 50% 40% at 100% 100%, var(--success-muted), transparent 55%),
        var(--bg)
      `,
      overflowX: 'hidden',
    }}>
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <Navbar variant="landing" />

      <main id="main-content" role="main" style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: 'var(--space-8) var(--space-4) var(--space-16)' 
      }}>
        <header className="role-selection-header" style={{
          textAlign: 'center',
          marginBottom: 'var(--space-8)',
        }}>
          <h1 style={{
            fontSize: 'clamp(34px, 6vw, 44px)',
            lineHeight: 'var(--leading-tight)',
            letterSpacing: '-0.03em',
            fontWeight: 600,
          }}>
            Choose your <em>role</em>
          </h1>
          <p style={{
            marginTop: 'var(--space-3)',
            color: 'var(--text-secondary)',
            fontSize: 'var(--text-base)',
            maxWidth: '420px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            {isSignup 
              ? 'Select how you want to create an account on HostelHub.'
              : 'Select how you want to sign in to HostelHub.'}
          </p>
        </header>

        <div className="role-grid-select" role="list" aria-label="Select your role" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'var(--space-6)',
          maxWidth: '680px',
          width: '100%',
        }}>
          <Link 
            className="role-card-select student" 
            role="listitem" 
            to={isSignup ? '/student/signup' : '/student/login'}
            aria-label="Student portal"
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: '72px 1fr',
              gap: 'var(--space-5)',
              padding: 'var(--space-6)',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-xl)',
              cursor: 'pointer',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'transform var(--transition-base), border-color var(--transition-base), box-shadow var(--transition-base), background var(--transition-base)',
            }}
          >
            <div className="role-icon" aria-hidden="true" style={{
              width: '72px',
              height: '72px',
              display: 'grid',
              placeItems: 'center',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--accent-light)',
              transition: 'transform var(--transition-base), background var(--transition-base)',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: 'var(--accent)' }}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <div className="role-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h2 style={{ fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-snug)', letterSpacing: '-0.02em', fontWeight: 600 }}>Student</h2>
              <p style={{ marginTop: 'var(--space-2)', color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)' }}>
                Report and track your hostel complaints. Stay informed about announcements and your room status.
              </p>
              <span className="role-cta" style={{
                marginTop: 'var(--space-6)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: 'var(--accent)',
              }}>
                Continue
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </div>
          </Link>

          <Link 
            className="role-card-select warden" 
            role="listitem" 
            to={isSignup ? '/warden/signup' : '/warden/login'}
            aria-label="Warden portal"
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: '72px 1fr',
              gap: 'var(--space-5)',
              padding: 'var(--space-6)',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-xl)',
              cursor: 'pointer',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'transform var(--transition-base), border-color var(--transition-base), box-shadow var(--transition-base), background var(--transition-base)',
            }}
          >
            <div className="role-icon" aria-hidden="true" style={{
              width: '72px',
              height: '72px',
              display: 'grid',
              placeItems: 'center',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--warning-light)',
              transition: 'transform var(--transition-base), background var(--transition-base)',
            }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: 'var(--warning)' }}>
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <div className="role-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h2 style={{ fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-snug)', letterSpacing: '-0.02em', fontWeight: 600 }}>Warden</h2>
              <p style={{ marginTop: 'var(--space-2)', color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)' }}>
                Review, assign and resolve hostel issues. Manage complaints, monitor rooms, and oversee residents.
              </p>
              <span className="role-cta" style={{
                marginTop: 'var(--space-6)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: 'var(--accent)',
              }}>
                Continue
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </main>

      <Footer variant="landing" />
    </div>
  );
}