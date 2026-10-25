import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Form';

export function LoginPage({ role = 'student' }) {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    if (!email.trim()) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
      return;
    }
    if (!password) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }));
      return;
    }

    setLoading(true);
    const result = await login(email, password, role);
    setLoading(false);

    if (result.success) {
      showToast('Welcome back!', 'success');
      navigate(role === 'student' ? '/student/dashboard' : '/warden/dashboard');
    } else {
      showToast(result.error || 'Login failed', 'error');
    }
  };

  const roleLabel = role === 'student' ? 'Student' : 'Warden';
  const dashboardPath = role === 'student' ? '/student/dashboard' : '/warden/dashboard';
  const signupPath = role === 'student' ? '/student/signup' : '/warden/signup';
  const roleSelectionPath = '/role-selection/signin';

  return (
    <div className="page-layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <a href="#main-content" className="skip-link">Skip to main content</a>

      <main id="main-content" className="login-page" style={{
        minHeight: 'calc(100dvh - var(--header-height))',
        display: 'grid',
        placeItems: 'center',
        padding: 'var(--space-4) var(--space-4)',
        background: `
          radial-gradient(ellipse 70% 50% at 50% 0%, var(--accent-muted), transparent 65%),
          radial-gradient(ellipse 50% 40% at 100% 100%, var(--success-muted), transparent 55%),
          var(--bg)
        `,
      }}>
        <section className="login-card glass-strong" aria-labelledby="login-title" style={{
          width: 'min(100%, 440px)',
          padding: 'var(--space-6) var(--space-6)',
          borderRadius: 'var(--radius-2xl)',
          background: 'var(--glass-bg-strong)',
          border: '1px solid var(--glass-border-strong)',
          backdropFilter: 'var(--glass-blur-strong)',
          WebkitBackdropFilter: 'var(--glass-blur-strong)',
          boxShadow: 'var(--glass-shadow-strong)',
        }}>
          <header className="login-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)', marginBottom: 'var(--space-7)' }}>
            <Link className="brand" to="/" aria-label="Back to HostelHub home">
              <span className="brand-mark" aria-hidden="true"><span></span><span></span></span>
              <span>HostelHub</span>
            </Link>
            <Link className="home-link" to="/" aria-label="Home" style={{
              color: 'var(--text-secondary)',
              fontSize: 'var(--text-sm)',
              fontWeight: 500,
              padding: 'var(--space-1) var(--space-3)',
              borderRadius: 'var(--radius-full)',
            }}>
              Home
            </Link>
          </header>

          <h1 id="login-title" style={{
            marginTop: 'var(--space-3)',
            fontSize: 'clamp(34px, 6vw, 44px)',
            lineHeight: 'var(--leading-tight)',
            letterSpacing: '-0.03em',
            fontWeight: 600,
          }}>
            {roleLabel} Sign <em>In.</em>
          </h1>
          <p className="login-subtitle" style={{
            marginTop: 'var(--space-3)',
            color: 'var(--text-secondary)',
            fontSize: 'var(--text-base)',
            lineHeight: 'var(--leading-relaxed)',
          }}>
            Sign in with your university credentials to continue.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--space-5)' }}>
            <div className="form-group" style={{ display: 'grid', gap: 'var(--space-2)' }}>
              <label htmlFor="email" style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>
                University ID / Email
              </label>
              <div className="input-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  id="email"
                  type="text"
                  name="email"
                  placeholder="you@university.edu"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  aria-describedby={errors.email ? 'email-error' : 'email-hint'}
                  style={{
                    width: '100%',
                    height: '50px',
                    padding: '0 var(--space-4)',
                    paddingRight: '48px',
                    border: `1px solid ${errors.email ? 'var(--danger)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--surface)',
                    color: 'var(--text-primary)',
                    fontSize: 'var(--text-base)',
                  }}
                />
              </div>
              {errors.email ? (
                <span id="email-error" className="field-hint error" style={{ color: 'var(--danger)' }}>{errors.email}</span>
              ) : (
                <span id="email-hint" className="field-hint" style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                  Your university email address
                </span>
              )}
            </div>

            <div className="form-group" style={{ display: 'grid', gap: 'var(--space-2)' }}>
              <label htmlFor="password" style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>
                Password
              </label>
              <div className="input-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  aria-describedby={errors.password ? 'password-error' : 'password-hint'}
                  style={{
                    width: '100%',
                    height: '50px',
                    padding: '0 var(--space-4)',
                    paddingRight: '48px',
                    border: `1px solid ${errors.password ? 'var(--danger)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--surface)',
                    color: 'var(--text-primary)',
                    fontSize: 'var(--text-base)',
                  }}
                />
              </div>
              {errors.password ? (
                <span id="password-error" className="field-hint error" style={{ color: 'var(--danger)' }}>{errors.password}</span>
              ) : (
                <span id="password-hint" className="field-hint" style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                  Your account password
                </span>
              )}
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
              <span className="btn-text">Sign in</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Button>
          </form>

          <p className="back-home" style={{ marginTop: 'var(--space-7)', textAlign: 'center' }}>
            <Link to={roleSelectionPath} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              fontSize: 'var(--text-sm)',
              fontWeight: 500,
              color: 'var(--text-secondary)',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back to Role Selection
            </Link>
          </p>

          <p className="signup-link" style={{ marginTop: 'var(--space-5)', textAlign: 'center', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>
            Don't have an account?{' '}
            <Link to={signupPath} style={{ color: 'var(--accent)', fontWeight: 600, borderBottom: '1px solid var(--accent)', paddingBottom: '1px' }}>
              Create Account
            </Link>
          </p>
        </section>
      </main>

      <Footer variant="landing" />
    </div>
  );
}