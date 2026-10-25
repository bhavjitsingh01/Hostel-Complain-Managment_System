import { useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';

const announcements = [
  { id: 1, title: 'Water supply maintenance — Block B', message: 'Water supply will be temporarily unavailable in Block B from 2:00 PM to 4:00 PM today for scheduled maintenance.', priority: 'urgent', audience: 'Block B students', date: 'Today', time: '10:20 AM', status: 'published' },
  { id: 2, title: 'Hostel maintenance inspection', message: 'Routine room inspection will take place this Friday from 10:00 AM. Please ensure your room is accessible.', priority: 'important', audience: 'Block B students', date: 'Yesterday', time: '2:00 PM', status: 'published' },
  { id: 3, title: 'Wi-Fi maintenance completed', message: 'Network maintenance for Block B has been completed successfully. Report any remaining issues.', priority: 'important', audience: 'Block B students', date: '12 Aug', time: '4:30 PM', status: 'published' },
  { id: 4, title: 'Mess feedback survey', message: 'Please share your feedback on the mess facilities by completing the survey before August 20.', priority: 'normal', audience: 'Block B students', date: '08 Aug', time: '11:00 AM', status: 'published' },
  { id: 5, title: 'Weekend visitor timings updated', message: 'Visitor hours for weekends have been updated. Check the notice board for new timings.', priority: 'normal', audience: 'Block B students', date: '05 Aug', time: '3:00 PM', status: 'published' },
  { id: 6, title: 'New laundry schedule', message: 'Laundry machine schedule has been revised for the new semester. Slots are now bookable online.', priority: 'normal', audience: 'Block B students', date: '01 Aug', time: '9:00 AM', status: 'published' },
];

export function WardenAnnouncementsPage() {
  const [filter, setFilter] = useState('all');
  const [showComposer, setShowComposer] = useState(false);

  const filteredAnnouncements = filter === 'all' 
    ? announcements 
    : announcements.filter(a => a.status === filter);

  const stats = {
    published: announcements.filter(a => a.status === 'published').length,
    scheduled: announcements.filter(a => a.status === 'scheduled').length,
    drafts: announcements.filter(a => a.status === 'draft').length,
  };

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
          <span>Announcements</span>
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
              Announcement <em>management.</em>
            </h1>
            <p style={{ maxWidth: '560px', marginTop: 'var(--space-3)', color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)' }}>
              Create and manage announcements for Block B residents.
            </p>
          </div>
          <Button variant="primary" onClick={() => setShowComposer(!showComposer)}>
            + New announcement
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </Button>
        </section>

        <section className="directory-kpis announcement-kpis" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', padding: 'var(--space-4)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)' }}><span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)' }}>Published</span><strong style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>{stats.published}</strong></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', padding: 'var(--space-4)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)' }}><span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)' }}>Scheduled</span><strong style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>{stats.scheduled}</strong></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', padding: 'var(--space-4)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)' }}><span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)' }}>Drafts</span><strong style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>{stats.drafts}</strong></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', padding: 'var(--space-4)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)' }}><span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)' }}>Avg. reach</span><strong style={{ fontSize: 'var(--text-3xl)', fontWeight: 700 }}>89%</strong></div>
        </section>

        {showComposer && (
          <section className="announcement-layout" style={{ display: 'grid', gap: 'var(--space-4)' }}>
            <article className="dashboard-card composer-card" style={{ padding: 'var(--space-5)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <div className="card-heading" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                <div>
                  <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>QUICK COMPOSER</span>
                  <h2 style={{ marginTop: '2px', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)', letterSpacing: '-0.02em', fontWeight: 600 }}>Create announcement</h2>
                </div>
                <span className="draft-state" style={{ fontSize: 'var(--text-xs)', fontWeight: 600, padding: 'var(--space-1) var(--space-2)', borderRadius: 'var(--radius-full)', background: 'var(--surface-tertiary)', color: 'var(--text-muted)' }}>Draft</span>
              </div>
              <form style={{ marginTop: 'var(--space-3)', display: 'grid', gap: 'var(--space-4)' }}>
                <label style={{ display: 'grid', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Title
                  <input type="text" placeholder="e.g. Water supply maintenance — Block B" style={{ width: '100%', padding: 'var(--space-3) var(--space-4)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--surface)', color: 'var(--text-primary)', fontSize: 'var(--text-sm)' }} />
                </label>
                <label style={{ display: 'grid', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Message
                  <textarea rows="5" placeholder="Write the announcement message..." style={{ width: '100%', padding: 'var(--space-3) var(--space-4)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--surface)', color: 'var(--text-primary)', fontSize: 'var(--text-sm)', resize: 'vertical' }} />
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <label style={{ display: 'grid', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Audience
                    <select style={{ width: '100%', padding: 'var(--space-3) var(--space-4)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--surface)', color: 'var(--text-primary)', fontSize: 'var(--text-sm)' }}>
                      <option>Block B students</option>
                      <option>All Block B</option>
                      <option>Maintenance staff</option>
                      <option>Warden team</option>
                    </select>
                  </label>
                  <label style={{ display: 'grid', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Priority
                    <select style={{ width: '100%', padding: 'var(--space-3) var(--space-4)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--surface)', color: 'var(--text-primary)', fontSize: 'var(--text-sm)' }}>
                      <option>Normal</option>
                      <option>Important</option>
                      <option>Urgent</option>
                    </select>
                  </label>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                  <label style={{ display: 'grid', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Publish
                    <select style={{ width: '100%', padding: 'var(--space-3) var(--space-4)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--surface)', color: 'var(--text-primary)', fontSize: 'var(--text-sm)' }}>
                      <option>Immediately</option>
                      <option>Schedule</option>
                      <option>Save as draft</option>
                    </select>
                  </label>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
                  <Button variant="secondary">Save draft</Button>
                  <Button variant="primary">Publish announcement</Button>
                </div>
              </form>
            </article>

            <aside className="dashboard-card preview-card" style={{ padding: 'var(--space-5)', background: 'var(--text-primary)', color: 'var(--text-inverse)', border: '1px solid var(--text-primary)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <div className="card-heading" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
                <div>
                  <span className="card-kicker" style={{ display: 'block', color: 'rgba(255,255,255,0.45)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>LIVE PREVIEW</span>
                  <h2 style={{ marginTop: '2px', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)', letterSpacing: '-0.02em', fontWeight: 600 }}>Student view</h2>
                </div>
              </div>
              <div className="notification-preview" style={{ marginTop: 'var(--space-4)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', background: 'var(--surface)', color: 'var(--text-primary)' }}>
                <div className="preview-top" style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                  <span className="preview-icon" style={{ width: '28px', height: '28px', display: 'grid', placeItems: 'center', borderRadius: 'var(--radius-sm)', background: 'var(--warning-light)', color: 'var(--warning)', fontWeight: 700, fontSize: 'var(--text-xs)' }}>!</span>
                  <div>
                    <strong style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>Important announcement</strong>
                    <small style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '1px', display: 'block' }}>Block B Warden · Just now</small>
                  </div>
                </div>
                <h3 style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-lg)', letterSpacing: '-0.02em', fontWeight: 600 }}>Water supply maintenance</h3>
                <p style={{ marginTop: 'var(--space-2)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)' }}>Water supply will be temporarily unavailable in Block B from 2:00 PM to 4:00 PM today.</p>
                <span className="preview-tag" style={{ display: 'inline-block', marginTop: 'var(--space-3)', padding: 'var(--space-1) var(--space-2)', borderRadius: 'var(--radius-full)', fontSize: 'var(--text-xs)', fontWeight: 700, background: 'var(--surface-tertiary)', color: 'var(--text-secondary)' }}>Block B</span>
              </div>
              <p className="preview-note" style={{ marginTop: 'var(--space-3)', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', lineHeight: 'var(--leading-relaxed)' }}>Students will see this announcement in their dashboard notification area.</p>
            </aside>
          </section>
        )}

        <section className="announcement-history" style={{ marginTop: showComposer ? 'var(--space-6)' : 0 }}>
          <div className="section-heading" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
            <div>
              <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>COMMUNICATION HISTORY</span>
              <h2 style={{ marginTop: '2px', fontSize: 'var(--text-2xl)', lineHeight: 'var(--leading-tight)', letterSpacing: '-0.02em', fontWeight: 600 }}>Recent announcements</h2>
            </div>
            <div className="history-filters" style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              {['All', 'Published', 'Scheduled', 'Drafts'].map(f => (
                <button key={f} className={`filter ${filter === f.toLowerCase() ? 'filter-active' : ''}`} onClick={() => setFilter(f.toLowerCase())} style={{ padding: 'var(--space-1) var(--space-3)', border: 0, background: filter === f.toLowerCase() ? 'var(--surface-tertiary)' : 'transparent', borderRadius: 'var(--radius-md)', fontSize: 'var(--text-xs)', fontWeight: 600, color: filter === f.toLowerCase() ? 'var(--text-primary)' : 'var(--text-muted)', cursor: 'pointer' }}>{f}</button>
              ))}
            </div>
          </div>
          <div className="history-list" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
            {filteredAnnouncements.map(announcement => (
              <article key={announcement.id} style={{ display: 'grid', gridTemplateColumns: '8px 1fr auto 28px', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-4)', borderBottom: '1px solid var(--border-subtle)' }}>
                <span className={`priority-dot ${announcement.priority}`} style={{ width: '8px', height: '8px', borderRadius: '50%', background: announcement.priority === 'urgent' ? 'var(--danger)' : announcement.priority === 'important' ? 'var(--warning)' : 'var(--info)' }}></span>
                <div>
                  <strong style={{ fontSize: 'var(--text-sm)', fontWeight: 600, display: 'block' }}>{announcement.title}</strong>
                  <small style={{ marginTop: '2px', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', display: 'block' }}>{announcement.audience} · {announcement.date} at {announcement.time}</small>
                </div>
                <span className={`announcement-status ${announcement.status}`} style={{ fontSize: '9px', fontWeight: 700, padding: '2px 8px', borderRadius: 'var(--radius-full)', background: announcement.status === 'published' ? 'var(--success-light)' : announcement.status === 'scheduled' ? 'var(--info-light)' : 'var(--surface-tertiary)', color: announcement.status === 'published' ? 'var(--success)' : announcement.status === 'scheduled' ? 'var(--info)' : 'var(--text-muted)' }}>
                  {announcement.status.charAt(0).toUpperCase() + announcement.status.slice(1)}
                </span>
                <button className="history-action" style={{ border: 0, background: 'transparent', fontSize: '10px', letterSpacing: '1px', color: 'var(--text-muted)', cursor: 'pointer', padding: 'var(--space-1)', borderRadius: 'var(--radius-sm)' }}>⋮</button>
              </article>
            ))}
          </div>
        </section>

        <section className="announcement-footer-grid" style={{ display: 'grid', gap: 'var(--space-4)', marginTop: 'var(--space-6)' }}>
          <div className="dashboard-card audience-card" style={{ padding: 'var(--space-5)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
            <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>AUDIENCE REACH</span>
            <h2 style={{ fontSize: 'var(--text-2xl)', letterSpacing: '-0.02em', marginTop: 'var(--space-3)', fontWeight: 600 }}>89% average reach.</h2>
            <p style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', color: 'var(--text-secondary)', marginTop: 'var(--space-3)' }}>Most Block B students view announcements within the first 12 hours after publishing.</p>
            <div className="reach-track" style={{ height: '8px', background: 'var(--surface-tertiary)', borderRadius: 'var(--radius-full)', overflow: 'hidden', marginTop: 'var(--space-4)' }}><i style={{ display: 'block', width: '89%', height: '100%', background: 'var(--accent)', borderRadius: 'inherit' }}></i></div>
            <small style={{ marginTop: 'var(--space-2)', display: 'block' }}>89% viewed · 11% not yet viewed</small>
          </div>
          <div className="dashboard-card emergency-card" style={{ padding: 'var(--space-5)', background: 'var(--surface-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
            <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>URGENT COMMUNICATION</span>
            <h2 style={{ fontSize: 'var(--text-2xl)', letterSpacing: '-0.02em', marginTop: 'var(--space-3)', fontWeight: 600 }}>Need to alert everyone?</h2>
            <p style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', color: 'var(--text-secondary)', marginTop: 'var(--space-3)' }}>Use urgent priority for safety, power, water or emergency hostel notices.</p>
            <Button variant="primary" style={{ marginTop: 'var(--space-4)' }}>Create urgent announcement</Button>
          </div>
        </section>
      </main>

      <Footer variant="warden" />
    </div>
  );
}