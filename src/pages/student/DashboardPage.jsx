import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useComplaints } from '../../context/ComplaintsContext';
import { Navbar } from '../../components/layout/Navbar';
import { MobileBottomNav } from '../../components/layout/MobileBottomNav';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/common/Button';
import { Avatar } from '../../components/common/Avatar';
import { DashboardStat } from '../../components/common/Card';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ComplaintCard } from '../../components/student/ComplaintCard';
import { AnnouncementCard } from '../../components/student/AnnouncementCard';

export function StudentDashboardPage() {
  const { user } = useAuth();
  const { getStudentComplaints } = useComplaints();
  
  const complaints = getStudentComplaints(user?.id);
  const recentComplaints = complaints.slice(0, 3);
  const stats = {
    total: complaints.length,
    inProgress: complaints.filter(c => c.status === 'in-progress').length,
    resolved: complaints.filter(c => c.status === 'resolved').length,
  };

  const announcements = [
    { date: '18 AUG', title: 'Hostel maintenance inspection', message: 'Routine room inspection will take place this Friday from 10:00 AM.', priority: 'important' },
    { date: '15 AUG', title: 'Wi-Fi maintenance completed', message: 'Network maintenance for Block B has been completed successfully.', priority: 'important' },
  ];

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
              STUDENT PORTAL
            </p>
            <h1 style={{
              maxWidth: '750px',
              fontSize: 'clamp(40px, 8vw, 70px)',
              lineHeight: 0.94,
              letterSpacing: '-0.04em',
              fontWeight: 600,
            }}>
              Good morning, <em>{user?.name?.split(' ')[0] || 'Student'}.</em>
            </h1>
            <p style={{ maxWidth: '560px', marginTop: 'var(--space-3)', color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)' }}>
              Everything you need to keep your hostel experience running smoothly.
            </p>
          </div>
          <Link to="/student/complaints/new">
            <Button variant="primary" size="md">
              + Report a problem
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </Button>
          </Link>
        </section>

        <div className="student-layout" style={{ display: 'grid', gap: 'var(--space-4)' }}>
          <div className="dashboard-main">
            <div className="dashboard-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
              <DashboardStat label="My complaints" value={stats.total} sublabel="All time" />
              <DashboardStat label="In progress" value={stats.inProgress} sublabel="Needs attention" highlight />
              <DashboardStat label="Resolved" value={stats.resolved} sublabel="This semester" />
            </div>

            <section className="dashboard-card" id="complaints" style={{ padding: 'var(--space-5)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <div className="card-heading" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                <div>
                  <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>ACTIVITY</span>
                  <h2 style={{ marginTop: '2px', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)', letterSpacing: '-0.02em', fontWeight: 600 }}>Recent complaints</h2>
                </div>
                <Link to="/student/complaints" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', color: 'var(--accent)', fontSize: 'var(--text-xs)', fontWeight: 600, whiteSpace: 'nowrap' }}>View all →</Link>
              </div>

              <div className="complaint-list" style={{ borderTop: '1px solid var(--border)' }}>
                {recentComplaints.length > 0 ? (
                  recentComplaints.map(complaint => (
                    <ComplaintCard key={complaint.id} complaint={complaint} />
                  ))
                ) : (
                  <div style={{ padding: 'var(--space-8)', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No complaints yet. <Link to="/student/complaints/new" style={{ color: 'var(--accent)', fontWeight: 600 }}>Submit your first complaint</Link>
                  </div>
                )}
              </div>
            </section>

            <section className="dashboard-card" id="announcements" style={{ padding: 'var(--space-5)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <div className="card-heading" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                <div>
                  <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>NOTICE BOARD</span>
                  <h2 style={{ marginTop: '2px', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)', letterSpacing: '-0.02em', fontWeight: 600 }}>Latest announcements</h2>
                </div>
                <Link to="/student/announcements" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', color: 'var(--accent)', fontSize: 'var(--text-xs)', fontWeight: 600, whiteSpace: 'nowrap' }}>View all →</Link>
              </div>

              <div className="announcement-list" style={{ borderTop: '1px solid var(--border)' }}>
                {announcements.map((announcement, index) => (
                  <AnnouncementCard key={index} announcement={announcement} />
                ))}
              </div>
            </section>
          </div>

          <aside className="dashboard-sidebar" style={{ display: 'grid', gap: 'var(--space-4)' }}>
            <section className="profile-card" style={{ padding: 'var(--space-5)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', background: 'var(--surface)', boxShadow: 'var(--shadow-xs)' }}>
              <div className="profile-top" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                <Avatar name={user?.name} size="lg" />
                <div>
                  <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>STUDENT</span>
                  <h2 style={{ marginTop: '2px', fontSize: 'var(--text-xl)', letterSpacing: '-0.02em', fontWeight: 600 }}>{user?.name || 'Student'}</h2>
                  <p style={{ marginTop: '2px', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>CS · 3rd Semester</p>
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
              </div>

              <Link to="/student/profile" style={{ marginTop: 'var(--space-4)', display: 'inline-block' }}>
                <Button variant="outline">View profile →</Button>
              </Link>
            </section>

            <section className="help-card" style={{ padding: 'var(--space-5)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', background: 'var(--surface-secondary)', boxShadow: 'var(--shadow-xs)' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>NEED HELP?</span>
              <h2 style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-xl)', letterSpacing: '-0.02em', fontWeight: 600 }}>Contact your warden</h2>
              <p style={{ marginTop: 'var(--space-1)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>R. Sharma · Block B</p>
              <a href="tel:+910000000000" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', marginTop: 'var(--space-4)', fontSize: 'var(--text-xs)', fontWeight: 600, borderBottom: '1px solid currentColor' }}>Call warden →</a>
            </section>
          </aside>
        </div>
      </main>

      <MobileBottomNav variant="student" />
      <Footer variant="student" />
    </div>
  );
}