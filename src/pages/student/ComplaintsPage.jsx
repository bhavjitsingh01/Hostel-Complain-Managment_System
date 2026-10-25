import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useComplaints } from '../../context/ComplaintsContext';
import { Navbar } from '../../components/layout/Navbar';
import { MobileBottomNav } from '../../components/layout/MobileBottomNav';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { ComplaintCard } from '../../components/student/ComplaintCard';

export function StudentComplaintsPage() {
  const { user } = useAuth();
  const { getStudentComplaints } = useComplaints();
  const [filter, setFilter] = useState('all');

  const allComplaints = getStudentComplaints(user?.id);
  
  const filteredComplaints = filter === 'all' 
    ? allComplaints 
    : allComplaints.filter(c => c.status === filter);

  const filterCounts = {
    all: allComplaints.length,
    new: allComplaints.filter(c => c.status === 'new').length,
    pending: allComplaints.filter(c => c.status === 'pending').length,
    'in-progress': allComplaints.filter(c => c.status === 'in-progress').length,
    resolved: allComplaints.filter(c => c.status === 'resolved').length,
    rejected: allComplaints.filter(c => c.status === 'rejected').length,
  };

  const filters = [
    { value: 'all', label: 'All' },
    { value: 'new', label: 'New' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'rejected', label: 'Rejected' },
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
              MY COMPLAINTS
            </p>
            <h1 style={{
              maxWidth: '750px',
              fontSize: 'clamp(40px, 8vw, 70px)',
              lineHeight: 0.94,
              letterSpacing: '-0.04em',
              fontWeight: 600,
            }}>
              Track your <em>reports.</em>
            </h1>
            <p style={{ maxWidth: '560px', marginTop: 'var(--space-3)', color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)' }}>
              View the status and progress of all your submitted complaints.
            </p>
          </div>
          <Link to="/student/complaints/new">
            <Button variant="primary" size="md">
              Submit Complaint
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </Button>
          </Link>
        </section>

        <div className="student-layout" style={{ display: 'grid', gap: 'var(--space-4)' }}>
          <div className="dashboard-main">
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
                  <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>ALL COMPLAINTS</span>
                  <h2 style={{ marginTop: '2px', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)', letterSpacing: '-0.02em', fontWeight: 600 }}>Your submitted complaints</h2>
                </div>
              </div>

              <div className="complaint-list" style={{ borderTop: '1px solid var(--border)' }}>
                {filteredComplaints.length > 0 ? (
                  filteredComplaints.map(complaint => (
                    <ComplaintCard key={complaint.id} complaint={complaint} />
                  ))
                ) : (
                  <div className="empty-state" style={{ padding: 'var(--space-12) var(--space-4)', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--surface-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4)', color: 'var(--text-muted)', fontSize: '24px' }}>📭</div>
                    <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>
                      {filter === 'all' ? 'No complaints yet' : `No ${filter} complaints`}
                    </h3>
                    <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', maxWidth: '300px', margin: '0 auto' }}>
                      {filter === 'all' 
                        ? 'Get started by submitting your first complaint.'
                        : 'All caught up! New complaints will appear here.'}
                    </p>
                    {filter === 'all' && (
                      <Link to="/student/complaints/new" style={{ marginTop: 'var(--space-4)', display: 'inline-block' }}>
                        <Button variant="primary">Submit Complaint</Button>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </section>
          </div>

          <aside className="dashboard-sidebar" style={{ display: 'grid', gap: 'var(--space-4)' }}>
            <section className="dashboard-card" style={{ padding: 'var(--space-5)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <div className="card-heading" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                <div>
                  <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>STATUS GUIDE</span>
                  <h2 style={{ marginTop: '2px', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)', letterSpacing: '-0.02em', fontWeight: 600 }}>Understanding complaint status</h2>
                </div>
              </div>
              <div style={{ marginTop: 'var(--space-4)', display: 'grid', gap: 'var(--space-3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                    <StatusBadge status="new" size="sm" style={{ minWidth: '80px', justifyContent: 'center' }} />
                    <small style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Just submitted</small>
                  </div>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Just submitted, awaiting review</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                    <StatusBadge status="pending" size="sm" style={{ minWidth: '80px', justifyContent: 'center' }} />
                    <small style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Under review</small>
                  </div>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Under review by warden</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                    <StatusBadge status="in-progress" size="sm" style={{ minWidth: '80px', justifyContent: 'center' }} />
                    <small style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Work started</small>
                  </div>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Work has begun</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                    <StatusBadge status="resolved" size="sm" style={{ minWidth: '80px', justifyContent: 'center' }} />
                    <small style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Issue fixed</small>
                  </div>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Issue fixed</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                    <StatusBadge status="rejected" size="sm" style={{ minWidth: '80px', justifyContent: 'center' }} />
                    <small style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Not valid</small>
                  </div>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Not a valid complaint</span>
                </div>
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