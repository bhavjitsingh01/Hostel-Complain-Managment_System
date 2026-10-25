import { useState } from 'react';
import { useComplaints } from '../../context/ComplaintsContext';
import { Navbar } from '../../components/layout/Navbar';
import { MobileBottomNav } from '../../components/layout/MobileBottomNav';
import { Footer } from '../../components/layout/Footer';
import { WardenComplaintCard } from '../../components/warden/WardenComplaintCard';

export function WardenComplaintsPage() {
  const { complaints } = useComplaints();
  const [filter, setFilter] = useState('all');

  const filteredComplaints = filter === 'all' 
    ? complaints 
    : complaints.filter(c => c.status === filter);

  const filterCounts = {
    all: complaints.length,
    new: complaints.filter(c => c.status === 'new').length,
    pending: complaints.filter(c => c.status === 'pending').length,
    'in-progress': complaints.filter(c => c.status === 'in-progress').length,
    resolved: complaints.filter(c => c.status === 'resolved').length,
    rejected: complaints.filter(c => c.status === 'rejected').length,
    high: complaints.filter(c => c.priority === 'high').length,
  };

  const filters = [
    { value: 'all', label: 'All' },
    { value: 'new', label: 'New' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'high', label: 'High Priority' },
  ];

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
              Complaint <em>management.</em>
            </h1>
            <p style={{ maxWidth: '560px', marginTop: 'var(--space-3)', color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)' }}>
              Review, assign, and resolve complaints for your hostel block.
            </p>
          </div>
        </section>

        <section className="warden-grid" style={{ display: 'grid', gap: 'var(--space-4)' }}>
          <div className="warden-main" style={{ display: 'grid', gap: 'var(--space-4)' }}>
            <section className="dashboard-card" id="complaints-filter" style={{ padding: 'var(--space-5)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <div className="card-heading" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                <div>
                  <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>FILTER</span>
                  <h2 style={{ marginTop: '2px', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)', letterSpacing: '-0.02em', fontWeight: 600 }}>Filter complaints</h2>
                </div>
              </div>
              <div className="filter-row" role="group" aria-label="Status filters" style={{ display: 'flex', gap: 'var(--space-2)', overflowX: 'auto', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--border)', marginBottom: 'var(--space-4)' }}>
                {filters.map(f => (
                  <button
                    key={f.value}
                    className={`filter ${filter === f.value ? 'active' : ''}`}
                    onClick={() => setFilter(f.value)}
                    data-filter={f.value}
                    style={{
                      padding: 'var(--space-2) var(--space-3)',
                      border: '1px solid var(--border)',
                      background: filter === f.value ? 'var(--text-primary)' : 'var(--surface-secondary)',
                      color: filter === f.value ? 'var(--text-inverse)' : 'var(--text-primary)',
                      borderRadius: 'var(--radius-full)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                    }}
                  >
                    {f.label} <span style={{ marginLeft: 'var(--space-1)', color: filter === f.value ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', fontWeight: 400 }}>
                      {filterCounts[f.value]}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            <section className="dashboard-card" id="complaints" style={{ padding: 'var(--space-5)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <div className="card-heading" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                <div>
                  <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>ACTION QUEUE</span>
                  <h2 style={{ marginTop: '2px', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)', letterSpacing: '-0.02em', fontWeight: 600 }}>All complaints</h2>
                </div>
              </div>

              <div className="warden-complaint-list" style={{ borderTop: 0 }}>
                {filteredComplaints.length > 0 ? (
                  filteredComplaints.map(complaint => (
                    <WardenComplaintCard key={complaint.id} complaint={complaint} />
                  ))
                ) : (
                  <div className="empty-state hidden" id="empty-complaints" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-12) var(--space-4)', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--surface-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-4)', color: 'var(--text-muted)', fontSize: '24px' }}>📭</div>
                    <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>No complaints to review</h3>
                    <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', maxWidth: '300px', color: 'var(--text-secondary)' }}>All caught up! New complaints will appear here.</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          <aside className="warden-sidebar" style={{ display: 'grid', gap: 'var(--space-4)' }}>
            <section className="dashboard-card" style={{ padding: 'var(--space-5)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <div className="card-heading" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                <div>
                  <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>QUICK ACTIONS</span>
                  <h2 style={{ marginTop: '2px', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)', letterSpacing: '-0.02em', fontWeight: 600 }}>Priority items</h2>
                </div>
              </div>
              <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
                <a href="/warden/complaints/HC-2026-00118" className="button button-primary" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', justifyContent: 'flex-start' }}>
                  <span style={{ width: '36px', height: '36px', display: 'grid', placeItems: 'center', borderRadius: 'var(--radius-sm)', background: 'var(--danger-light)', color: 'var(--danger)', fontWeight: 700 }}>!</span>
                  <div style={{ textAlign: 'left' }}>
                    <strong style={{ fontSize: 'var(--text-sm)', display: 'block' }}>Review high-priority</strong>
                    <small style={{ display: 'block', color: 'var(--text-muted)' }}>Water leakage · B-204</small>
                  </div>
                </a>
                <a href="/warden/complaints/HC-2026-00130" className="button button-secondary" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', justifyContent: 'flex-start' }}>
                  <span style={{ width: '36px', height: '36px', display: 'grid', placeItems: 'center', borderRadius: 'var(--radius-sm)', background: 'var(--danger-light)', color: 'var(--danger)', fontWeight: 700 }}>!</span>
                  <div style={{ textAlign: 'left' }}>
                    <strong style={{ fontSize: 'var(--text-sm)', display: 'block' }}>Review high-priority</strong>
                    <small style={{ display: 'block', color: 'var(--text-muted)' }}>Power outage · B-212</small>
                  </div>
                </a>
                <button className="button button-outline" style={{ justifyContent: 'flex-start' }}>View all new <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
              </div>
            </section>

            <section className="dashboard-card maintenance-card" style={{ padding: 'var(--space-5)', background: 'var(--accent)', color: 'var(--text-inverse)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <span className="quick-icon" style={{ width: '42px', height: '42px', display: 'grid', placeItems: 'center', borderRadius: 'var(--radius-md)', color: 'var(--accent)', background: 'var(--text-inverse)', fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-4)' }}>↗</span>
              <span className="card-kicker light-kicker" style={{ display: 'block', color: 'rgba(255,255,255,0.55)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>MAINTENANCE</span>
              <h2 style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-3xl)', lineHeight: 'var(--leading-tight)', letterSpacing: '-0.03em', fontWeight: 600 }}>6 jobs are currently active.</h2>
              <p style={{ marginTop: 'var(--space-2)', color: 'rgba(255,255,255,0.75)', fontSize: 'var(--text-base)' }}>4 technicians are assigned across Block B.</p>
              <a href="/warden/maintenance" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-1)', marginTop: 'var(--space-4)', color: 'var(--text-inverse)', fontSize: 'var(--text-xs)', fontWeight: 700, borderBottom: '1px solid rgba(255,255,255,0.6)', textDecoration: 'none' }}>View maintenance →</a>
            </section>

            <section className="dashboard-card mini-announcement" style={{ padding: 'var(--space-5)', background: 'var(--surface-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>NOTICE BOARD</span>
              <h2 style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-xl)', letterSpacing: '-0.02em', fontWeight: 600 }}>Recent announcement</h2>
              <p style={{ marginTop: 'var(--space-3)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)' }}>
                <strong>Hostel inspection</strong><br/>Scheduled for Friday, 10:00 AM.
              </p>
              <a href="/warden/announcements" style={{ display: 'inline-block', marginTop: 'var(--space-4)', fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--accent)', textDecoration: 'none' }}>Manage announcements →</a>
            </section>
          </aside>
        </section>
      </main>

      <MobileBottomNav variant="warden" />
      <Footer variant="warden" />
    </div>
  );
}