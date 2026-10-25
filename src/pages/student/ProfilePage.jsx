import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Navbar } from '../../components/layout/Navbar';
import { MobileBottomNav } from '../../components/layout/MobileBottomNav';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/common/Button';
import { Avatar } from '../../components/common/Avatar';
import { Input, Select, FieldGrid, FormSubmit } from '../../components/common/Form';

export function StudentProfilePage() {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    course: user?.course || 'cs',
    semester: user?.semester || '3',
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

  const courses = [
    { value: 'cs', label: 'Computer Science' },
    { value: 'it', label: 'Information Technology' },
    { value: 'mech', label: 'Mechanical Engineering' },
    { value: 'ec', label: 'Electronics & Communication' },
  ];

  const semesters = Array.from({ length: 8 }, (_, i) => ({ value: String(i + 1), label: `${i + 1}${i === 0 ? 'st' : i === 1 ? 'nd' : i === 2 ? 'rd' : 'th'}` }));

  return (
    <div className="dashboard-page" style={{ background: `
      radial-gradient(ellipse 60% 40% at 85% 10%, var(--accent-muted), transparent 50%),
      radial-gradient(ellipse 50% 35% at 10% 90%, var(--success-muted), transparent 45%),
      var(--bg)
    ` }}>
      <Navbar variant="student" />
      
      <main className="dashboard-shell" style={{ maxWidth: '1360px', margin: '0 auto', padding: 'var(--space-6) var(--space-4) var(--space-12)' }}>
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
              PROFILE
            </p>
            <h1 style={{
              maxWidth: '750px',
              fontSize: 'clamp(40px, 8vw, 70px)',
              lineHeight: 0.94,
              letterSpacing: '-0.04em',
              fontWeight: 600,
            }}>
              My <em>profile.</em>
            </h1>
            <p style={{ maxWidth: '560px', marginTop: 'var(--space-3)', color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)' }}>
              Manage your account details, room information, and notification preferences.
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
                    label="Student ID"
                    name="studentId"
                    value={user?.studentId || 'CS24-1042'}
                    onChange={handleChange}
                    id="student-id"
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
                    label="Course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    options={courses}
                    id="course"
                  />
                  <Select
                    label="Semester"
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    options={semesters}
                    id="semester"
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

            <section className="dashboard-card" id="room-info" style={{ padding: 'var(--space-5)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <div className="card-heading" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                <div>
                  <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>ACCOMMODATION</span>
                  <h2 style={{ marginTop: '2px', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)', letterSpacing: '-0.02em', fontWeight: 600 }}>Room details</h2>
                </div>
              </div>

              <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
                <div className="room-panel" style={{ padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', background: 'var(--accent)', color: 'var(--text-inverse)', borderColor: 'var(--accent)' }}>
                  <span style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Your room</span>
                  <strong style={{ display: 'block', margin: '4px 0', fontSize: 'var(--text-4xl)', lineHeight: 0.95, letterSpacing: '-0.03em', fontWeight: 700 }}>B-204</strong>
                  <small style={{ display: 'block', color: 'rgba(255,255,255,0.6)' }}>Block B · 2nd Floor · Double occupancy</small>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)' }}>
                  <div style={{ padding: 'var(--space-4)', background: 'var(--surface-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                    <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Hostel</span>
                    <strong style={{ fontSize: 'var(--text-base)' }}>Block B (Boys · UG)</strong>
                  </div>
                  <div style={{ padding: 'var(--space-4)', background: 'var(--surface-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                    <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Bed</span>
                    <strong style={{ fontSize: 'var(--text-base)' }}>B-204 / 02</strong>
                  </div>
                  <div style={{ padding: 'var(--space-4)', background: 'var(--surface-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                    <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Warden</span>
                    <strong style={{ fontSize: 'var(--text-base)' }}>R. Sharma</strong>
                  </div>
                  <div style={{ padding: 'var(--space-4)', background: 'var(--surface-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
                    <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Room type</span>
                    <strong style={{ fontSize: 'var(--text-base)' }}>Double occupancy</strong>
                  </div>
                </div>
              </div>
            </section>

            <section className="dashboard-card" id="complaint-summary" style={{ padding: 'var(--space-5)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <div className="card-heading" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                <div>
                  <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>ACTIVITY SUMMARY</span>
                  <h2 style={{ marginTop: '2px', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)', letterSpacing: '-0.02em', fontWeight: 600 }}>Complaint statistics</h2>
                </div>
                <a href="/student/complaints" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', color: 'var(--accent)', fontSize: 'var(--text-xs)', fontWeight: 600, whiteSpace: 'nowrap' }}>View all →</a>
              </div>

              <div className="dashboard-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-3)' }}>
                <article className="dashboard-stat" style={{ minHeight: '130px', padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Total submitted</span>
                  <strong style={{ fontSize: 'var(--text-5xl)', lineHeight: 0.95, letterSpacing: '-0.04em', fontWeight: 700 }}>05</strong>
                  <small style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>All time</small>
                </article>
                <article className="dashboard-stat stat-highlight" style={{ minHeight: '130px', padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--accent)', color: 'var(--text-inverse)', borderColor: 'var(--accent)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)' }}>
                  <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>In progress</span>
                  <strong style={{ fontSize: 'var(--text-5xl)', lineHeight: 0.95, letterSpacing: '-0.04em', fontWeight: 700 }}>02</strong>
                  <small style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Active</small>
                </article>
                <article className="dashboard-stat" style={{ minHeight: '130px', padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Resolved</span>
                  <strong style={{ fontSize: 'var(--text-5xl)', lineHeight: 0.95, letterSpacing: '-0.04em', fontWeight: 700 }}>03</strong>
                  <small style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>This semester</small>
                </article>
                <article className="dashboard-stat" style={{ minHeight: '130px', padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Avg. resolution</span>
                  <strong style={{ fontSize: 'var(--text-5xl)', lineHeight: 0.95, letterSpacing: '-0.04em', fontWeight: 700 }}>1.8d</strong>
                  <small style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Last 30 days</small>
                </article>
              </div>
            </section>

            <section className="dashboard-card" id="preferences" style={{ padding: 'var(--space-5)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <div className="card-heading" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                <div>
                  <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>NOTIFICATIONS</span>
                  <h2 style={{ marginTop: '2px', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)', letterSpacing: '-0.02em', fontWeight: 600 }}>Preferences</h2>
                </div>
              </div>

              <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)', padding: 'var(--space-3)', background: 'var(--surface-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', cursor: 'pointer' }}>
                  <div>
                    <strong style={{ fontSize: 'var(--text-sm)' }}>Email notifications</strong>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: '2px' }}>Receive complaint updates via email</p>
                  </div>
                  <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px', accentColor: 'var(--accent)' }} />
                </label>

                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)', padding: 'var(--space-3)', background: 'var(--surface-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', cursor: 'pointer' }}>
                  <div>
                    <strong style={{ fontSize: 'var(--text-sm)' }}>Push notifications</strong>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: '2px' }}>Get instant updates in the app</p>
                  </div>
                  <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px', accentColor: 'var(--accent)' }} />
                </label>

                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)', padding: 'var(--space-3)', background: 'var(--surface-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', cursor: 'pointer' }}>
                  <div>
                    <strong style={{ fontSize: 'var(--text-sm)' }}>Announcement alerts</strong>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: '2px' }}>Be notified of new announcements</p>
                  </div>
                  <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px', accentColor: 'var(--accent)' }} />
                </label>

                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)', padding: 'var(--space-3)', background: 'var(--surface-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', cursor: 'pointer' }}>
                  <div>
                    <strong style={{ fontSize: 'var(--text-sm)' }}>SMS for urgent only</strong>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', marginTop: '2px' }}>Only critical alerts via SMS</p>
                  </div>
                  <input type="checkbox" style={{ width: '20px', height: '20px', accentColor: 'var(--accent)' }} />
                </label>
              </div>
            </section>
          </div>

          <aside className="dashboard-sidebar" style={{ display: 'grid', gap: 'var(--space-4)' }}>
            <section className="profile-card" style={{ padding: 'var(--space-5)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', background: 'var(--surface)', boxShadow: 'var(--shadow-xs)' }}>
              <div className="profile-top" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <Avatar name={user?.name} size="xl" style={{ width: '64px', height: '64px', fontSize: 'var(--text-lg)' }} />
                <div>
                  <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>STUDENT</span>
                  <h2 style={{ marginTop: '2px', fontSize: 'var(--text-2xl)', letterSpacing: '-0.02em', fontWeight: 600 }}>{user?.name || 'Student'}</h2>
                  <p style={{ marginTop: '2px', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>CS · 3rd Semester · CS24-1042</p>
                </div>
              </div>

              <div className="room-panel" style={{ marginTop: 'var(--space-4)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', background: 'var(--surface-secondary)' }}>
                <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Your room</span>
                <strong style={{ display: 'block', margin: '4px 0', fontSize: 'var(--text-4xl)', lineHeight: 0.95, letterSpacing: '-0.03em', fontWeight: 700 }}>B-204</strong>
                <small style={{ display: 'block', color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Block B · 2nd Floor</small>
              </div>

              <div className="profile-details" style={{ marginTop: 'var(--space-3)' }}>
                <div style={{ padding: 'var(--space-3) 0', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)' }}><span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Hostel</span><strong style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)' }}>Block B</strong></div>
                <div style={{ padding: 'var(--space-3) 0', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)' }}><span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Bed</span><strong style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)' }}>B-204 / 02</strong></div>
                <div style={{ padding: 'var(--space-3) 0', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)' }}><span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Warden</span><strong style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)' }}>R. Sharma</strong></div>
                <div style={{ padding: 'var(--space-3) 0', display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Status</span><strong style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}><StatusBadge status="active" size="sm" /></strong></div>
              </div>

              <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border)', display: 'grid', gap: 'var(--space-2)' }}>
                <a href="/student/complaints" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--accent)', fontSize: 'var(--text-sm)', fontWeight: 600, textDecoration: 'none' }}>My complaints <span>→</span></a>
                <a href="/student/announcements" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--accent)', fontSize: 'var(--text-sm)', fontWeight: 600, textDecoration: 'none' }}>Announcements <span>→</span></a>
              </div>
            </section>
          </aside>
        </div>
      </main>

      <MobileBottomNav variant="student" />
      <Footer variant="student" />
    </div>
  );
}