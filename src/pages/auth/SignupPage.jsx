import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Form';

export function SignupPage({ role = 'student' }) {
  const { signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const result = await signup({ ...formData, role });
    setLoading(false);

    if (result.success) {
      showToast('Account created successfully!', 'success');
      navigate(role === 'student' ? '/student/dashboard' : '/warden/dashboard');
    } else {
      showToast(result.error || 'Signup failed', 'error');
    }
  };

  const roleLabel = role === 'student' ? 'Student' : 'Warden';
  const roleSelectionPath = '/role-selection/signup';
  const loginPath = role === 'student' ? '/student/login' : '/warden/login';

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
        <section className="login-card glass-strong" aria-labelledby="signup-title" style={{
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

          <h1 id="signup-title" style={{
            marginTop: 'var(--space-3)',
            fontSize: 'clamp(34px, 6vw, 44px)',
            lineHeight: 'var(--leading-tight)',
            letterSpacing: '-0.03em',
            fontWeight: 600,
          }}>
            Create your <em>account.</em>
          </h1>
          <p className="login-subtitle" style={{
            marginTop: 'var(--space-3)',
            color: 'var(--text-secondary)',
            fontSize: 'var(--text-base)',
            lineHeight: 'var(--leading-relaxed)',
          }}>
            Join HostelHub to {role === 'student' ? 'report and track hostel complaints' : 'manage hostel complaints and residents'}.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--space-5)' }}>
            <div className="form-group" style={{ display: 'grid', gap: 'var(--space-2)' }}>
              <label htmlFor="fullName" style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>
                Full Name
              </label>
              <div className="input-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  placeholder="Your full name"
                  autoComplete="name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="form-input"
                  aria-describedby={errors.fullName ? 'fullName-error' : 'fullName-hint'}
                  style={{
                    width: '100%',
                    height: '50px',
                    padding: '0 var(--space-4)',
                    paddingRight: '48px',
                    border: `1px solid ${errors.fullName ? 'var(--danger)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--surface)',
                    color: 'var(--text-primary)',
                    fontSize: 'var(--text-base)',
                  }}
                />
              </div>
              {errors.fullName ? (
                <span id="fullName-error" className="field-hint error" style={{ color: 'var(--danger)' }}>{errors.fullName}</span>
              ) : (
                <span id="fullName-hint" className="field-hint" style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                  As it appears on your university records
                </span>
              )}
            </div>

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
                  value={formData.email}
                  onChange={handleChange}
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
                  placeholder="Create a password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
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
                  At least 8 characters
                </span>
              )}
            </div>

            <div className="form-group" style={{ display: 'grid', gap: 'var(--space-2)' }}>
              <label htmlFor="confirmPassword" style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>
                Confirm Password
              </label>
              <div className="input-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : 'confirmPassword-hint'}
                  style={{
                    width: '100%',
                    height: '50px',
                    padding: '0 var(--space-4)',
                    paddingRight: '48px',
                    border: `1px solid ${errors.confirmPassword ? 'var(--danger)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--surface)',
                    color: 'var(--text-primary)',
                    fontSize: 'var(--text-base)',
                  }}
                />
              </div>
              {errors.confirmPassword ? (
                <span id="confirmPassword-error" className="field-hint error" style={{ color: 'var(--danger)' }}>{errors.confirmPassword}</span>
              ) : (
                <span id="confirmPassword-hint" className="field-hint" style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
                  Must match the password above
                </span>
              )}
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
              <span className="btn-text">Create Account</span>
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
            Already have an account?{' '}
            <Link to={loginPath} style={{ color: 'var(--accent)', fontWeight: 600, borderBottom: '1px solid var(--accent)', paddingBottom: '1px' }}>
              Sign In
            </Link>
          </p>
        </section>
      </main>

      <Footer variant="landing" />
    </div>
  );
}