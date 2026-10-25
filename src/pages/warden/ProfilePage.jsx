import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Navbar } from '../../components/layout/Navbar';
import { MobileBottomNav } from '../../components/layout/MobileBottomNav';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/common/Button';
import { Avatar } from '../../components/common/Avatar';
import { Input, Select, FieldGrid, FormSubmit } from '../../components/common/Form';

export function WardenProfilePage() {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    fullName: user?.name || 'R. Sharma',
    email: user?.email || 'r.sharma@university.edu',
    phone: user?.phone || '+91 98765 43210',
    designation: user?.designation || 'senior-warden',
    hostelAssignment: user?.hostelAssignment || 'block-b',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await updateProfile(formData);
    setLoading(false);
    if (result.success) {
      showToast('Profile updated successfully!', 'success');
    } else {
      showToast('Failed to update profile', 'error');
    }
  };

  const designations = [
    { value: 'senior-warden', label: 'Senior Warden' },
    { value: 'warden', label: 'Warden' },
    { value: 'assistant-warden', label: 'Assistant Warden' },
  ];

  const hostels = [
    { value: 'block-b', label: 'Block B' },
    { value: 'block-a', label: 'Block A' },
    { value: 'block-c', label: 'Block C' },
    { value: 'block-d', label: 'Block D' },
  ];

  return (
    <div className="dashboard-page warden-page" style={{ background: `
      radial-gradient(ellipse 60% 40% at 85% 10%, var(--accent-muted), transparent 50%),
      radial-gradient(ellipse 50% 35% at 10% 90%, var(--success-muted), transparent 45%),
      var(--bg)
    ` }}>
      <Navbar variant="warden" />
      
      <main className="dashboard-shell" style={{ maxWidth: '1360px', margin: '0 auto', padding: 'var(--space-6) var(--space-4) var(--space-12)' }}>
        <nav className="breadcrumb" aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>
          <a href="/warden/dashboard">Dashboard</a>
          <span aria-hidden="true">/</span>
          <a href="/warden/complaints">Complaints</a>
          <span aria-hidden="true">/</span>
          <span>Profile</span>
        </nav>

        <section className="dashboard-welcome" style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 'var(--space-5)', 
          padding: 'var(--space-5) var(--space-2) var(--space-6)' 
        }}>
          <div>
            <p className="eyebrow" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-4)',
              color: 'var(--text-secondary)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              <span className="eyebrow-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }}></span>
              WARDEN PORTAL · BLOCK B
            </p>
            <h1 style={{ fontSize: 'clamp(40px, 8vw, 70px)', lineHeight: 0.94, letterSpacing: '-0.04em', fontWeight: 600 }}>
              My <em>profile.</em>
            </h1>
            <p style={{ maxWidth: '560px', marginTop: 'var(--space-3)', color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)' }}>
              Manage your account details, duty schedule, and notification preferences.
            </p>
          </div>
        </section>

        <div className="student-layout" style={{ display: 'grid', gap: 'var(--space-4)' }}>
          <div className="dashboard-main">
            <section className="dashboard-card" id="profile-main" style={{ padding: 'var(--space-5)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <div className="card-heading" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                <div>
                  <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>PERSONAL INFORMATION</span>
                  <h2 style={{ marginTop: '2px', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)', letterSpacing: '-0.02em', fontWeight: 600 }}>Account details</h2>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="profile-form" style={{ display: 'grid', gap: 'var(--space-4)' }}>
                <FieldGrid columns={2}>
                  <Input
                    label="Full name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    id="full-name"
                  />
                  <Input
                    label="Employee ID"
                    name="employeeId"
                    value={user?.employeeId || 'EMP-018'}
                    onChange={handleChange}
                    id="employee-id"
                    readOnly
                    style={{ background: 'var(--surface-secondary)', cursor: 'not-allowed' }}
                  />
                </FieldGrid>

                <FieldGrid columns={2}>
                  <Input
                    label="University email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    id="email"
                  />
                  <Input
                    label="Phone number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    id="phone"
                  />
                </FieldGrid>

                <FieldGrid columns={2}>
                  <Select
                    label="Designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    options={designations}
                    id="designation"
                  />
                  <Select
                    label="Hostel assignment"
                    name="hostelAssignment"
                    value={formData.hostelAssignment}
                    onChange={handleChange}
                    options={hostels}
                    id="hostel-assignment"
                  />
                </FieldGrid>

                <FormSubmit>
                  <Button type="submit" variant="primary" loading={loading}>
                    Save changes
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="19" y1="21" x2="19" y2="12"></line>
                      <polyline points="19 12 12 5 5 12"></polyline>
                    </svg>
                  </Button>
                </FormSubmit>
              </form>
            </section>

            <section className="dashboard-card" id="duty-schedule" style={{ padding: 'var(--space-5)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <div className="card-heading" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                <div>
                  <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>DUTY SCHEDULE</span>
                  <h2 style={{ marginTop: '2px', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)', letterSpacing: '-0.02em', fontWeight: 600 }}>Weekly schedule</h2>
                </div>
              </div>
              <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3)', background: 'var(--surface-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <div>
                    <strong>Monday – Friday</strong>
                    <br /><small>08:00 AM – 08:00 PM</small>
                  </div>
                  <StatusBadge status="active" size="sm" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3)', background: 'var(--surface-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <div>
                    <strong>Saturday</strong>
                    <br /><small>09:00 AM – 02:00 PM</small>
                  </div>
                  <StatusBadge status="active" size="sm" />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3)', background: 'var(--surface-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <div>
                    <strong>Sunday</strong>
                    <br /><small>Off</small>
                  </div>
                  <StatusBadge status="leave" size="sm" />
                </div>
              </div>
            </section>

            <section className="dashboard-card" id="performance-summary" style={{ padding: 'var(--space-5)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <div className="card-heading" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                <div>
                  <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>PERFORMANCE</span>
                  <h2 style={{ marginTop: '2px', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)', letterSpacing: '-0.02em', fontWeight: 600 }}>Resolution statistics</h2>
                </div>
                <a href="/warden/complaints" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', color: 'var(--accent)', fontSize: 'var(--text-xs)', fontWeight: 600, whiteSpace: 'nowrap' }}>View all →</a>
              </div>
              <div className="dashboard-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-3)' }}>
                <article className="dashboard-stat" style={{ minHeight: '130px', padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Total assigned</span>
                  <strong style={{ fontSize: 'var(--text-5xl)', lineHeight: 0.95, letterSpacing: '-0.04em', fontWeight: 700 }}>24</strong>
                  <small style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>This month</small>
                </article>
                <article className="dashboard-stat stat-highlight" style={{ minHeight: '130px', padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--accent)', color: 'var(--text-inverse)', borderColor: 'var(--accent)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)' }}>
                  <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Resolved</span>
                  <strong style={{ fontSize: 'var(--text-5xl)', lineHeight: 0.95, letterSpacing: '-0.04em', fontWeight: 700 }}>18</strong>
                  <small style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>75% rate</small>
                </article>
                <article className="dashboard-stat" style={{ minHeight: '130px', padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Avg. resolution</span>
                  <strong style={{ fontSize: 'var(--text-5xl)', lineHeight: 0.95, letterSpacing: '-0.04em', fontWeight: 700 }}>1.6d</strong>
                  <small style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>This month</small>
                </article>
                <article className="dashboard-stat" style={{ minHeight: '130px', padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>High priority</span>
                  <strong style={{ fontSize: 'var(--text-5xl)', lineHeight: 0.95, letterSpacing: '-0.04em', fontWeight: 700 }}>03</strong>
                  <small style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Active</small>
                </article>
              </div>
            </section>
          </div>

          <aside className="dashboard-sidebar" style={{ display: 'grid', gap: 'var(--space-4)' }}>
            <section className="profile-card" style={{ padding: 'var(--space-5)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', background: 'var(--surface)', boxShadow: 'var(--shadow-xs)' }}>
              <div className="profile-top" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <Avatar name={user?.name} size="xl" style={{ width: '64px', height: '64px', fontSize: 'var(--text-lg)' }} />
                <div>
                  <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>WARDEN</span>
                  <h2 style={{ marginTop: '2px', fontSize: 'var(--text-2xl)', letterSpacing: '-0.02em', fontWeight: 600 }}>{user?.name || 'Warden'}</h2>
                  <p style={{ marginTop: '2px', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>Senior Warden · Block B · EMP-018</p>
                </div>
              </div>
              <div className="room-panel" style={{ marginTop: 'var(--space-4)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', background: 'var(--surface-secondary)' }}>
                <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Assigned block</span>
                <strong style={{ display: 'block', margin: '4px 0', fontSize: 'var(--text-4xl)', lineHeight: 0.95, letterSpacing: '-0.03em', fontWeight: 700 }}>Block B</strong>
                <small style={{ display: 'block', color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Residence Hall</small>
              </div>
              <div className="profile-details" style={{ marginTop: 'var(--space-3)' }}>
                <div style={{ padding: 'var(--space-3) 0', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)' }}><span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Employee ID</span><strong style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)' }}>EMP-018</strong></div>
                <div style={{ padding: 'var(--space-3) 0', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)' }}><span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Designation</span><strong style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)' }}>Senior Warden</strong></div>
                <div style={{ padding: 'var(--space-3) 0', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)' }}><span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Residents</span><strong style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)' }}>118</strong></div>
                <div style={{ padding: 'var(--space-3) 0', display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Status</span><strong style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}><StatusBadge status="active" size="sm" /></strong></div>
              </div>
              <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border)', display: 'grid', gap: 'var(--space-2)' }}>
                <a href="/warden/complaints" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--accent)', fontSize: 'var(--text-sm)', fontWeight: 600, textDecoration: 'none' }}>My complaints <span>→</span></a>
                <a href="/warden/maintenance" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--accent)', fontSize: 'var(--text-sm)', fontWeight: 600, textDecoration: 'none' }}>Maintenance jobs <span>→</span></a>
                <a href="/warden/announcements" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--accent)', fontSize: 'var(--text-sm)', fontWeight: 600, textDecoration: 'none' }}>Announcements <span>→</span></a>
              </div>
            </section>
          </aside>
        </div>
      </main>

      <MobileBottomNav variant="warden" />
      <Footer variant="warden" />
    </div>
  );
}