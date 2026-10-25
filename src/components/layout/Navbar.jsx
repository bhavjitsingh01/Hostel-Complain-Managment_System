import { Link, useLocation, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../common/Button';
import { Avatar } from '../common/Avatar';

export function Navbar({ variant = 'landing' }) {
  const { user, logout, isAuthenticated, isStudent, isWarden } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const isDashboard = variant === 'student' || variant === 'warden';
  const isLanding = variant === 'landing';

  const navLinks = isStudent ? [
    { path: '/student/dashboard', label: 'Home' },
    { path: '/student/complaints', label: 'Complaints' },
    { path: '/student/announcements', label: 'Announcements' },
  ] : isWarden ? [
    { path: '/warden/dashboard', label: 'Home' },
    { path: '/warden/complaints', label: 'Complaints' },
    { path: '/warden/students', label: 'Students' },
    { path: '/warden/announcements', label: 'Announcements' },
    { path: '/warden/maintenance', label: 'Maintenance' },
  ] : [
    { path: '/', label: 'Home' },
    { path: '#features', label: 'Features' },
    { path: '#roles', label: 'For Students' },
    { path: '#roles', label: 'For Wardens' },
    { path: '#about', label: 'About' },
  ];

  return (
    <header className="site-header">
      <nav className="navbar dashboard-navbar" aria-label={isDashboard ? `${variant === 'student' ? 'Student' : 'Warden'} navigation` : 'Primary navigation'}>
        <Link className="brand" to={isDashboard ? (isStudent ? '/student/dashboard' : '/warden/dashboard') : '/'} aria-label="HostelHub home">
          <span className="brand-mark" aria-hidden="true">
            <span></span><span></span>
          </span>
          <span>HostelHub</span>
        </Link>

        <div className="dashboard-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
          {navLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `dashboard-nav-link ${isActive ? 'active' : ''}`}
              style={{
                padding: 'var(--space-1) var(--space-3)',
                borderRadius: 'var(--radius-full)',
                color: 'var(--text-secondary)',
                fontSize: 'var(--text-sm)',
                fontWeight: 500,
                textDecoration: 'none',
              }}
              end={link.path === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="dashboard-nav-actions" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
          {isAuthenticated && (
            <div className="user-chip">
              <Avatar name={user?.name} size="sm" />
              <span className="user-name" style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                {user?.name?.split(' ')[0] || 'User'}
              </span>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            title="Toggle theme"
            className="theme-toggle"
          >
            {theme === 'dark' ? (
              <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </Button>

          {isAuthenticated ? (
            <Button variant="ghost" size="sm" onClick={logout}>
              Sign out
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="9" y1="21" x2="9" y2="9"></line>
                <path d="M5 21 12 15 5 9"></path>
              </svg>
            </Button>
          ) : isLanding && (
            <>
              <Link className="login-link" to="/role-selection/signin">Log in</Link>
              <Button variant="primary" size="sm" to="/role-selection/signup" as="link">
                Get Started
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Button>
            </>
          )}
        </div>

        <input className="menu-toggle" type="checkbox" id={`menu-toggle-${variant}`} />
        <label className="menu-button" htmlFor={`menu-toggle-${variant}`} aria-label="Open navigation menu">
          <span></span><span></span>
        </label>

        <div className="mobile-menu dashboard-mobile-menu">
          {navLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => isActive ? 'active' : ''}
              style={{
                padding: 'var(--space-2) var(--space-3)',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
              }}
              end={link.path === '/'}
            >
              {link.label}
            </NavLink>
          ))}
          {isAuthenticated && (
            <Button variant="primary" to="/" onClick={logout} style={{ justifySelf: 'center' }}>
              Sign out
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="9" y1="21" x2="9" y2="9"></line>
                <path d="M5 21 12 15 5 9"></path>
              </svg>
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            style={{ justifySelf: 'center', marginTop: '8px' }}
          >
            {theme === 'dark' ? (
              <svg className="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg className="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </Button>
        </div>
      </nav>
    </header>
  );
}