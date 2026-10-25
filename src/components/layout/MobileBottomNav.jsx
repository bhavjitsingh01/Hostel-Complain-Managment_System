import { NavLink } from 'react-router-dom';

export function MobileBottomNav({ variant = 'student' }) {
  const studentLinks = [
    { path: '/student/dashboard', label: 'Home', icon: '⌂' },
    { path: '/student/complaints', label: 'Complaints', icon: '◫' },
    { path: '/student/announcements', label: 'Announcements', icon: '◌' },
    { path: '/student/profile', label: 'Profile', icon: '○' },
  ];

  const wardenLinks = [
    { path: '/warden/dashboard', label: 'Home', icon: '⌂' },
    { path: '/warden/complaints', label: 'Issues', icon: '◫' },
    { path: '/warden/students', label: 'Students', icon: '♙' },
    { path: '/warden/profile', label: 'Profile', icon: '○' },
  ];

  const links = variant === 'warden' ? wardenLinks : studentLinks;

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation" style={{
      position: 'fixed',
      zIndex: 90,
      left: 'var(--space-3)',
      right: 'var(--space-3)',
      bottom: 'var(--space-3)',
      minHeight: '60px',
      padding: 'var(--space-2)',
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      alignItems: 'center',
      background: 'var(--glass-bg-strong)',
      border: '1px solid var(--glass-border-strong)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--glass-shadow-strong)',
      backdropFilter: 'var(--glass-blur-strong)',
      WebkitBackdropFilter: 'var(--glass-blur-strong)',
    }}>
      {links.map((link, index) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
          style={{
            minHeight: '48px',
            display: 'grid',
            placeItems: 'center',
            alignContent: 'center',
            gap: '2px',
            color: 'var(--text-muted)',
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            borderRadius: 'var(--radius-md)',
            textDecoration: 'none',
            transition: 'color var(--transition-fast), background var(--transition-fast)',
          }}
          end={index === 0}
        >
          <span style={{ fontSize: 'var(--text-xl)', lineHeight: 1 }}>{link.icon}</span>
          {link.label}
        </NavLink>
      ))}
      <NavLink
        to={variant === 'warden' ? '/warden/announcements' : '/student/complaints'}
        className="mobile-add"
        style={{
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <span style={{
          width: '42px',
          height: '42px',
          display: 'grid',
          placeItems: 'center',
          borderRadius: '50%',
          color: 'var(--text-inverse)',
          background: 'var(--text-primary)',
          fontSize: 'var(--text-xl)',
        }}>
          +
        </span>
      </NavLink>
    </nav>
  );
}