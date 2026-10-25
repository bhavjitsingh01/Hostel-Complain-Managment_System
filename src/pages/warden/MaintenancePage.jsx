import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';

const maintenanceJobs = [
  { id: 1, title: 'Pipe leak repair', category: 'Plumbing', location: 'B-204', assigned: 'Plumbing — Team 02', status: 'in-progress', eta: 'Today 5:00 PM', icon: 'P', iconColor: 'info' },
  { id: 2, title: 'Circuit breaker replacement', category: 'Electrical', location: 'B-Corridor F2', assigned: 'Electrical — Team 01', status: 'pending', eta: 'Tomorrow 10:00 AM', icon: 'E', iconColor: 'warning' },
  { id: 3, title: 'Chair repair', category: 'Carpentry', location: 'B-307', assigned: 'Carpentry — Team 01', status: 'resolved', eta: 'Aug 15', icon: 'C', iconColor: 'success' },
  { id: 4, title: 'AC unit service', category: 'HVAC', location: 'B-Common', assigned: 'HVAC — Team 01', status: 'in-progress', eta: 'Today 3:00 PM', icon: 'H', iconColor: 'info' },
  { id: 5, title: 'Window latch replacement', category: 'General', location: 'B-116', assigned: 'General — Team 01', status: 'pending', eta: 'Tomorrow 11:00 AM', icon: 'G', iconColor: 'warning' },
  { id: 6, title: 'Drain unclogging', category: 'Plumbing', location: 'B-110', assigned: 'Plumbing — Team 02', status: 'resolved', eta: 'Aug 14', icon: 'P', iconColor: 'success' },
];

const iconColors = {
  info: { bg: 'var(--info-light)', color: 'var(--info)' },
  warning: { bg: 'var(--warning-light)', color: 'var(--warning)' },
  success: { bg: 'var(--success-light)', color: 'var(--success)' },
};

export function WardenMaintenancePage() {
  return (
    <div className="dashboard-page warden-page page-layout" style={{ background: `
      radial-gradient(ellipse 60% 40% at 85% 10%, var(--accent-muted), transparent 50%),
      radial-gradient(ellipse 50% 35% at 10% 90%, var(--success-muted), transparent 45%),
      var(--bg)
    ` }}>
      <Navbar variant="warden" />
      
      <main className="management-shell" style={{ maxWidth: '1360px', margin: '0 auto', padding: 'var(--space-8) var(--space-4) var(--space-16)' }}>
        <nav className="breadcrumb" aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>
          <a href="/warden/dashboard">Dashboard</a>
          <span aria-hidden="true">/</span>
          <a href="/warden/complaints">Complaints</a>
          <span aria-hidden="true">/</span>
          <span>Maintenance</span>
        </nav>

        <section className="management-heading" style={{ 
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
              Maintenance <em>jobs.</em>
            </h1>
            <p style={{ maxWidth: '560px', marginTop: 'var(--space-3)', color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)' }}>
              Track and coordinate maintenance jobs across Block B.
            </p>
          </div>
          <Button variant="primary" data-action="new-job">
            + New job
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </Button>
        </section>

        <section className="directory-kpis" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', padding: 'var(--space-4)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)' }}><span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)' }}>Active jobs</span><strong style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>6</strong></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', padding: 'var(--space-4)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)' }}><span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)' }}>Assigned technicians</span><strong style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>4</strong></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', padding: 'var(--space-4)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)' }}><span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)' }}>Completed this week</span><strong style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>12</strong></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', padding: 'var(--space-4)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)' }}><span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)' }}>Avg. completion</span><strong style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>1.4d</strong></div>
        </section>

        <section className="directory-card" style={{ padding: 'var(--space-5)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
          <div className="directory-toolbar" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: 'var(--surface-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
            <div className="search-box" style={{ position: 'relative', flex: 1, minWidth: 0, maxWidth: '360px' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" style={{ position: 'absolute', left: 'var(--space-3)', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}>
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="search" placeholder="Search jobs..." style={{ width: '100%', height: '44px', padding: '0 var(--space-4) 0 44px', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', background: 'var(--surface)', color: 'var(--text-primary)', fontSize: 'var(--text-sm)' }} />
            </div>
            <select style={{ height: '44px', padding: '0 var(--space-10) 0 var(--space-4)', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', background: 'var(--surface)', color: 'var(--text-primary)', fontSize: 'var(--text-sm)', cursor: 'pointer', appearance: 'none', minWidth: '140px' }}>
              <option>All status</option>
              <option>Assigned</option>
              <option>In Progress</option>
              <option>Completed</option>
              <option>On Hold</option>
            </select>
            <select style={{ height: '44px', padding: '0 var(--space-10) 0 var(--space-4)', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', background: 'var(--surface)', color: 'var(--text-primary)', fontSize: 'var(--text-sm)', cursor: 'pointer', appearance: 'none', minWidth: '140px' }}>
              <option>All categories</option>
              <option>Plumbing</option>
              <option>Electrical</option>
              <option>Carpentry</option>
              <option>HVAC</option>
              <option>General</option>
            </select>
            <Button variant="secondary" className="filter-button">Filters</Button>
          </div>

          <div className="table-wrap" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table className="student-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: '720px' }}>
              <thead>
                <tr>
                  <th style={{ padding: 'var(--space-3) var(--space-3)', textAlign: 'left', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>Job</th>
                  <th style={{ padding: 'var(--space-3) var(--space-3)', textAlign: 'left', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>Category</th>
                  <th style={{ padding: 'var(--space-3) var(--space-3)', textAlign: 'left', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>Location</th>
                  <th style={{ padding: 'var(--space-3) var(--space-3)', textAlign: 'left', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>Assigned to</th>
                  <th style={{ padding: 'var(--space-3) var(--space-3)', textAlign: 'left', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>Status</th>
                  <th style={{ padding: 'var(--space-3) var(--space-3)', textAlign: 'left', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>ETA</th>
                  <th style={{ padding: 'var(--space-3) var(--space-3)', textAlign: 'left', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}></th>
                </tr>
              </thead>
              <tbody>
                {maintenanceJobs.map(job => (
                  <tr key={job.id} style={{ transition: 'background var(--transition-fast)' }}>
                    <td style={{ padding: 'var(--space-3) var(--space-3)', borderBottom: '1px solid var(--border-subtle)', fontSize: 'var(--text-sm)' }}>
                      <div className="person-cell" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <span className="table-avatar" style={{ width: '36px', height: '36px', display: 'grid', placeItems: 'center', flex: 'none', borderRadius: '50%', background: iconColors[job.iconColor].bg, color: iconColors[job.iconColor].color, fontSize: 'var(--text-xs)', fontWeight: 700 }}>
                          {job.icon}
                        </span>
                        <div>
                          <strong style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{job.title}</strong>
                          <small style={{ display: 'block', marginTop: '2px', color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>{job.location}</small>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: 'var(--space-3) var(--space-3)', borderBottom: '1px solid var(--border-subtle)', fontSize: 'var(--text-sm)', whiteSpace: 'nowrap' }}>{job.category}</td>
                    <td style={{ padding: 'var(--space-3) var(--space-3)', borderBottom: '1px solid var(--border-subtle)', fontSize: 'var(--text-sm)', whiteSpace: 'nowrap' }}>{job.location}</td>
                    <td style={{ padding: 'var(--space-3) var(--space-3)', borderBottom: '1px solid var(--border-subtle)', fontSize: 'var(--text-sm)', whiteSpace: 'nowrap' }}>{job.assigned}</td>
                    <td style={{ padding: 'var(--space-3) var(--space-3)', borderBottom: '1px solid var(--border-subtle)', fontSize: 'var(--text-sm)', whiteSpace: 'nowrap' }}>
                      <StatusBadge status={job.status} size="sm" />
                    </td>
                    <td style={{ padding: 'var(--space-3) var(--space-3)', borderBottom: '1px solid var(--border-subtle)', fontSize: 'var(--text-sm)', whiteSpace: 'nowrap' }}>{job.eta}</td>
                    <td style={{ padding: 'var(--space-3) var(--space-3)', borderBottom: '1px solid var(--border-subtle)', fontSize: 'var(--text-sm)', whiteSpace: 'nowrap' }}>
                      <button className="row-action" aria-label="More options" style={{ border: 0, background: 'transparent', fontWeight: 700, color: 'var(--text-muted)', cursor: 'pointer', padding: 'var(--space-1)', borderRadius: 'var(--radius-sm)' }}>•••</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mobile-student-list" style={{ display: 'grid', gap: 0 }}>
            {maintenanceJobs.slice(0, 4).map(job => (
              <article key={job.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-4) var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
                <div className="person-cell" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <span className="table-avatar" style={{ width: '36px', height: '36px', display: 'grid', placeItems: 'center', flex: 'none', borderRadius: '50%', background: iconColors[job.iconColor].bg, color: iconColors[job.iconColor].color, fontSize: 'var(--text-xs)', fontWeight: 700 }}>
                    {job.icon}
                  </span>
                  <div>
                    <strong>{job.title}</strong>
                    <small style={{ display: 'block' }}>{job.location} · {job.assigned}</small>
                  </div>
                </div>
                <StatusBadge status={job.status} size="sm" />
              </article>
            ))}
          </div>

          <div className="pagination" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', padding: 'var(--space-4) var(--space-2)', color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>
            <span>Showing 1–6 of 6 jobs</span>
            <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
              <button aria-label="Previous page" style={{ width: '34px', height: '34px', display: 'grid', placeItems: 'center', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', fontSize: 'var(--text-xs)', fontWeight: 600, cursor: 'pointer' }}>←</button>
              <b style={{ width: '34px', height: '34px', display: 'grid', placeItems: 'center', border: '1px solid var(--text-primary)', borderRadius: 'var(--radius-sm)', background: 'var(--text-primary)', color: 'var(--text-inverse)', fontSize: 'var(--text-xs)', fontWeight: 600 }}>1</b>
              <button aria-label="Next page" style={{ width: '34px', height: '34px', display: 'grid', placeItems: 'center', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', fontSize: 'var(--text-xs)', fontWeight: 600, cursor: 'pointer' }}>→</button>
            </div>
          </div>
        </section>
      </main>

      <Footer variant="warden" />
    </div>
  );
}