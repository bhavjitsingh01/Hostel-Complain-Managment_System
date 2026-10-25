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
import { WardenComplaintCard } from '../../components/warden/WardenComplaintCard';

export function WardenDashboardPage() {
  const { user } = useAuth();
  const { complaints } = useComplaints();

  const stats = {
    total: complaints.length,
    needsAttention: complaints.filter(c => c.status === 'new' || c.status === 'pending').length,
    inProgress: complaints.filter(c => c.status === 'in-progress').length,
    resolved: complaints.filter(c => c.status === 'resolved').length,
  };

  const recentComplaints = complaints
    .filter(c => c.status !== 'resolved' && c.status !== 'rejected')
    .slice(0, 4);

  return (
    <div className="dashboard-page warden-page" style={{ background: `
      radial-gradient(ellipse 60% 40% at 85% 10%, var(--accent-muted), transparent 50%),
      radial-gradient(ellipse 50% 35% at 10% 90%, var(--success-muted), transparent 45%),
      var(--bg)
    ` }}>
      <Navbar variant="warden" />
      
      <main className="warden-shell" style={{ maxWidth: '1360px', margin: '0 auto', padding: 'var(--space-8) var(--space-4) var(--space-16)' }}>
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
            <h1 style={{
              maxWidth: '750px',
              fontSize: 'clamp(40px, 8vw, 70px)',
              lineHeight: 0.94,
              letterSpacing: '-0.04em',
              fontWeight: 600,
            }}>
              Good morning, <em>{user?.name?.split(' ')[0] || 'Warden'}.</em>
            </h1>
            <p style={{ maxWidth: '560px', marginTop: 'var(--space-3)', color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)' }}>
              Keep track of resident issues, maintenance requests and hostel updates from one place.
            </p>
          </div>
          <Link to="/warden/announcements/new">
            <Button variant="primary" size="md">
              + New announcement
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </Button>
          </Link>
        </section>

        <section className="warden-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
          <article className="warden-stat" style={{ minHeight: '115px', padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)' }}>Total complaints</span>
              <small style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 400 }}>All active cases</small>
            </div>
            <strong style={{ fontSize: 'var(--text-4xl)', lineHeight: 0.95, letterSpacing: '-0.03em', fontWeight: 700 }}>{stats.total}</strong>
          </article>
          <article className="warden-stat accent-stat" style={{ minHeight: '115px', padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--accent)', color: 'var(--text-inverse)', borderColor: 'var(--accent)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>Needs attention</span>
              <small style={{ color: 'rgba(255,255,255,0.7)' }}>Pending action</small>
            </div>
            <strong style={{ fontSize: 'var(--text-4xl)', lineHeight: 0.95, letterSpacing: '-0.03em', fontWeight: 700 }}>{stats.needsAttention}</strong>
          </article>
          <article className="warden-stat" style={{ minHeight: '115px', padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)' }}>In progress</span>
              <small style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 400 }}>With maintenance</small>
            </div>
            <strong style={{ fontSize: 'var(--text-4xl)', lineHeight: 0.95, letterSpacing: '-0.03em', fontWeight: 700 }}>{stats.inProgress}</strong>
          </article>
          <article className="warden-stat" style={{ minHeight: '115px', padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)' }}>Resolved</span>
              <small style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 400 }}>This month</small>
            </div>
            <strong style={{ fontSize: 'var(--text-4xl)', lineHeight: 0.95, letterSpacing: '-0.03em', fontWeight: 700 }}>{stats.resolved}</strong>
          </article>
        </section>

        <section className="warden-grid" style={{ display: 'grid', gap: 'var(--space-4)' }}>
          <div className="warden-main" style={{ display: 'grid', gap: 'var(--space-4)' }}>
            <section className="dashboard-card" id="complaints" style={{ padding: 'var(--space-5)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <div className="card-heading" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                <div>
                  <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>ACTION QUEUE</span>
                  <h2 style={{ marginTop: '2px', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)', letterSpacing: '-0.02em', fontWeight: 600 }}>Complaints needing attention</h2>
                </div>
                <Link to="/warden/complaints" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', color: 'var(--accent)', fontSize: 'var(--text-xs)', fontWeight: 600, whiteSpace: 'nowrap' }}>View all →</Link>
              </div>

              <div className="filter-row" style={{ display: 'flex', gap: 'var(--space-2)', overflowX: 'auto', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--border)', marginBottom: 'var(--space-4)' }}>
                {['All', 'New', 'Pending', 'In Progress', 'High Priority'].map((filter, i) => (
                  <button key={filter} className={`filter ${i === 0 ? 'active' : ''}`} style={{ padding: 'var(--space-2) var(--space-3)', border: '1px solid var(--border)', background: i === 0 ? 'var(--text-primary)' : 'var(--surface-secondary)', color: i === 0 ? 'var(--text-inverse)' : 'var(--text-primary)', borderRadius: 'var(--radius-full)', fontSize: 'var(--text-xs)', fontWeight: 600, whiteSpace: 'nowrap', cursor: 'pointer' }}>
                    {filter} <span style={{ marginLeft: 'var(--space-1)', color: i === 0 ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', fontWeight: 400 }}>8</span>
                  </button>
                ))}
              </div>

              <div className="warden-complaint-list" style={{ borderTop: 0 }}>
                {recentComplaints.map(complaint => (
                  <WardenComplaintCard key={complaint.id} complaint={complaint} />
                ))}
              </div>
            </section>

            <section className="dashboard-card" id="students" style={{ padding: 'var(--space-5)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <div className="card-heading" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                <div>
                  <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>RESIDENTS</span>
                  <h2 style={{ marginTop: '2px', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)', letterSpacing: '-0.02em', fontWeight: 600 }}>Block B overview</h2>
                </div>
                <Link to="/warden/students" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', color: 'var(--accent)', fontSize: 'var(--text-xs)', fontWeight: 600, whiteSpace: 'nowrap' }}>Manage students →</Link>
              </div>
              <div className="resident-summary" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0, borderTop: '1px solid var(--border)' }}>
                <div style={{ padding: 'var(--space-4) var(--space-3)', borderBottom: '1px solid var(--border)', borderRight: '1px solid var(--border-subtle)' }}><strong style={{ display: 'block', fontSize: 'var(--text-3xl)', lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 700 }}>118</strong><span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Residents</span></div>
                <div style={{ padding: 'var(--space-4) var(--space-3)', borderBottom: '1px solid var(--border)' }}><strong style={{ display: 'block', fontSize: 'var(--text-3xl)', lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 700 }}>59</strong><span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Rooms</span></div>
                <div style={{ padding: 'var(--space-4) var(--space-3)', borderRight: '1px solid var(--border-subtle)' }}><strong style={{ display: 'block', fontSize: 'var(--text-3xl)', lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 700 }}>96%</strong><span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Occupancy</span></div>
                <div style={{ padding: 'var(--space-4) var(--space-3)' }}><strong style={{ display: 'block', fontSize: 'var(--text-3xl)', lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 700 }}>04</strong><span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Vacancies</span></div>
              </div>
            </section>
          </div>

          <aside className="warden-sidebar" style={{ display: 'grid', gap: 'var(--space-4)' }}>
            <section className="warden-profile" style={{ padding: 'var(--space-5)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <div className="warden-profile-top" style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center' }}>
                <Avatar name={user?.name} size="lg" />
                <div>
                  <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>WARDEN</span>
                  <h2 style={{ marginTop: '2px', fontSize: 'var(--text-xl)', letterSpacing: '-0.02em', fontWeight: 600 }}>{user?.name || 'Warden'}</h2>
                  <p style={{ marginTop: '2px', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>Block B · Residence Hall</p>
                </div>
              </div>
              <div className="warden-contact" style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', background: 'var(--surface-secondary)' }}>
                <span style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--text-muted)' }}>Today's duty</span>
                <strong style={{ display: 'block', marginTop: '4px', fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--text-secondary)' }}>08:00 AM — 08:00 PM</strong>
              </div>
              <Link to="/warden/profile" style={{ marginTop: 'var(--space-4)', display: 'inline-block' }}>
                <Button variant="outline">View profile →</Button>
              </Link>
            </section>

            <section className="maintenance-card" style={{ padding: 'var(--space-5)', background: 'var(--accent)', color: 'var(--text-inverse)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <span className="quick-icon" style={{ width: '42px', height: '42px', display: 'grid', placeItems: 'center', borderRadius: 'var(--radius-md)', color: 'var(--accent)', background: 'var(--text-inverse)', fontSize: 'var(--text-2xl)' }}>↗</span>
              <span className="card-kicker light-kicker" style={{ display: 'block', color: 'rgba(255,255,255,0.55)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>MAINTENANCE</span>
              <h2 style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-3xl)', lineHeight: 'var(--leading-tight)', letterSpacing: '-0.03em', fontWeight: 600 }}>6 jobs are currently active.</h2>
              <p style={{ marginTop: 'var(--space-2)', color: 'rgba(255,255,255,0.75)', fontSize: 'var(--text-base)' }}>4 technicians are assigned across Block B.</p>
              <Link to="/warden/maintenance" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', marginTop: 'var(--space-4)', color: 'var(--text-inverse)', fontSize: 'var(--text-xs)', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.6)', textDecoration: 'none' }}>View maintenance →</Link>
            </section>

            <section className="mini-announcement" style={{ padding: 'var(--space-5)', background: 'var(--surface-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>NOTICE BOARD</span>
              <h2 style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-xl)', letterSpacing: '-0.02em', fontWeight: 600 }}>Recent announcement</h2>
              <p style={{ marginTop: 'var(--space-3)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)' }}>
                <strong>Hostel inspection</strong><br/>Scheduled for Friday, 10:00 AM.
              </p>
              <Link to="/warden/announcements" style={{ display: 'inline-block', marginTop: 'var(--space-4)', fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--accent)', textDecoration: 'none' }}>Manage announcements →</Link>
            </section>
          </aside>
        </section>
      </main>

      <MobileBottomNav variant="warden" />
      <Footer variant="warden" />
    </div>
  );
}