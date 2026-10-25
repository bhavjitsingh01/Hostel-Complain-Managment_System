import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAnnouncements } from '../../context/AnnouncementsContext';
import { Navbar } from '../../components/layout/Navbar';
import { MobileBottomNav } from '../../components/layout/MobileBottomNav';
import { Footer } from '../../components/layout/Footer';
import { StatusBadge } from '../../components/common/StatusBadge';
import { AnnouncementCard } from '../../components/student/AnnouncementCard';

export function StudentAnnouncementsPage() {
  const { announcements } = useAnnouncements();
  const [filter, setFilter] = useState('all');

  const filteredAnnouncements = filter === 'all' 
    ? announcements 
    : announcements.filter(a => a.priority === filter);

  const filterCounts = {
    all: announcements.length,
    urgent: announcements.filter(a => a.priority === 'urgent').length,
    important: announcements.filter(a => a.priority === 'important').length,
    normal: announcements.filter(a => a.priority === 'normal').length,
  };

  const filters = [
    { value: 'all', label: 'All' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'important', label: 'Important' },
    { value: 'normal', label: 'Normal' },
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
              NOTICE BOARD
            </p>
            <h1 style={{
              maxWidth: '750px',
              fontSize: 'clamp(40px, 8vw, 70px)',
              lineHeight: 0.94,
              letterSpacing: '-0.04em',
              fontWeight: 600,
            }}>
              Hostel <em>announcements.</em>
            </h1>
            <p style={{ maxWidth: '560px', marginTop: 'var(--space-3)', color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)' }}>
              Stay informed about hostel events, maintenance schedules, and important notices.
            </p>
          </div>
        </section>

        <div className="student-layout" style={{ display: 'grid', gap: 'var(--space-4)' }}>
          <div className="dashboard-main">
            <section className="dashboard-card" id="announcements-filter" style={{ padding: 'var(--space-5)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <div className="card-heading" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                <div>
                  <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>FILTER</span>
                  <h2 style={{ marginTop: '2px', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)', letterSpacing: '-0.02em', fontWeight: 600 }}>Filter announcements</h2>
                </div>
              </div>
              <div className="filter-row" role="group" aria-label="Announcement filters" style={{ display: 'flex', gap: 'var(--space-2)', overflowX: 'auto', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--border)', marginBottom: 'var(--space-4)' }}>
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

            <section className="dashboard-card" id="announcements" style={{ padding: 'var(--space-5)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <div className="card-heading" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                <div>
                  <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>LATEST</span>
                  <h2 style={{ marginTop: '2px', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)', letterSpacing: '-0.02em', fontWeight: 600 }}>All announcements</h2>
                </div>
              </div>

              <div className="announcement-list" style={{ borderTop: '1px solid var(--border)' }}>
                {filteredAnnouncements.length > 0 ? (
                  filteredAnnouncements.map((announcement, index) => (
                    <AnnouncementCard key={index} announcement={announcement} />
                  ))
                ) : (
                  <div className="empty-state" style={{ padding: 'var(--space-12) var(--space-4)', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--surface-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-4)', color: 'var(--text-muted)', fontSize: '24px' }}>📭</div>
                    <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>No announcements</h3>
                    <p style={{ fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', maxWidth: '300px', margin: '0 auto' }}>
                      {filter === 'all' ? 'No announcements at the moment.' : `No ${filter} priority announcements.`}
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>

          <aside className="dashboard-sidebar" style={{ display: 'grid', gap: 'var(--space-4)' }}>
            <section className="dashboard-card" style={{ padding: 'var(--space-5)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <div className="card-heading" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                <div>
                  <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>PRIORITY GUIDE</span>
                  <h2 style={{ marginTop: '2px', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)', letterSpacing: '-0.02em', fontWeight: 600 }}>Understanding priority</h2>
                </div>
              </div>
              <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3)', background: 'var(--danger-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--danger-light)' }}>
                  <span className="priority-dot urgent" style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--danger)' }}></span>
                  <div>
                    <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--danger)' }}>Urgent</strong>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '2px' }}>Safety, power, water, emergency notices</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3)', background: 'var(--warning-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--warning-light)' }}>
                  <span className="priority-dot important" style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--warning)' }}></span>
                  <div>
                    <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--warning)' }}>Important</strong>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '2px' }}>Maintenance, inspections, schedule changes</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-3)', background: 'var(--info-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--info-light)' }}>
                  <span className="priority-dot normal" style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--info)' }}></span>
                  <div>
                    <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--info)' }}>Normal</strong>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '2px' }}>General information, surveys, updates</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="dashboard-card" style={{ padding: 'var(--space-5)', background: 'var(--surface-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
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