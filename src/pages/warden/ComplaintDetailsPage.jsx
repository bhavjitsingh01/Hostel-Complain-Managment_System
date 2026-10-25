import { useParams, Link } from 'react-router-dom';
import { useComplaints } from '../../context/ComplaintsContext';
import { useToast } from '../../context/ToastContext';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Avatar } from '../../components/common/Avatar';

export function WardenComplaintDetailsPage() {
  const { id } = useParams();
  const { getComplaint, updateComplaintStatus, assignComplaint } = useComplaints();
  const { showToast } = useToast();
  const complaint = getComplaint(id);

  const [note, setNote] = useState('');

  if (!complaint) {
    return (
      <div className="dashboard-page warden-page page-layout" style={{ background: `
        radial-gradient(ellipse 60% 40% at 85% 10%, var(--accent-muted), transparent 50%),
        radial-gradient(ellipse 50% 35% at 10% 90%, var(--success-muted), transparent 45%),
        var(--bg)
      ` }}>
        <Navbar variant="warden" />
        <main className="warden-detail-shell" style={{ maxWidth: '1360px', margin: '0 auto', padding: 'var(--space-8) var(--space-4) var(--space-16)' }}>
          <nav className="breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>
            <Link to="/warden/dashboard">Dashboard</Link>
            <span aria-hidden="true">/</span>
            <Link to="/warden/complaints">Complaints</Link>
            <span aria-hidden="true">/</span>
            <span>Not Found</span>
          </nav>
          <p>Complaint not found</p>
        </main>
        <Footer variant="warden" />
      </div>
    );
  }

  const handleStatusUpdate = async (status) => {
    await updateComplaintStatus(id, status, 'R. Sharma');
    showToast(`Complaint marked as ${status}`, 'success');
    window.location.reload();
  };

  const handleAssign = async () => {
    await assignComplaint(id, 'R. Sharma', 'Plumbing - Team 02');
    showToast('Team assigned successfully', 'success');
    window.location.reload();
  };

  const handleSaveNote = async () => {
    showToast('Note saved', 'success');
  };

  return (
    <div className="dashboard-page warden-page page-layout" style={{ background: `
      radial-gradient(ellipse 60% 40% at 85% 10%, var(--accent-muted), transparent 50%),
      radial-gradient(ellipse 50% 35% at 10% 90%, var(--success-muted), transparent 45%),
      var(--bg)
    ` }}>
      <Navbar variant="warden" />
      
      <main className="warden-detail-shell" style={{ maxWidth: '1360px', margin: '0 auto', padding: 'var(--space-8) var(--space-4) var(--space-16)' }}>
        <nav className="breadcrumb" aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)', marginBottom: 'var(--space-4)' }}>
          <Link to="/warden/dashboard">Dashboard</Link>
          <span className="breadcrumb-separator" aria-hidden="true">/</span>
          <Link to="/warden/complaints">Complaints</Link>
          <span className="breadcrumb-separator" aria-hidden="true">/</span>
          <span className="breadcrumb-current">#{complaint.id}</span>
        </nav>
        <Link className="back-link" to="/warden/complaints" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', color: 'var(--text-secondary)', fontSize: 'var(--text-xs)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to action queue
        </Link>
        
        <section className="review-heading" style={{ padding: 'var(--space-8) 0 var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
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
              REVIEW · #{complaint.id}
            </p>
            <h1 style={{ fontSize: 'clamp(42px, 8vw, 72px)', lineHeight: 0.92, letterSpacing: '-0.04em', fontWeight: 600 }}>
              {complaint.title}
            </h1>
            <p style={{ marginTop: 'var(--space-3)', color: 'var(--text-secondary)', fontSize: 'var(--text-base)' }}>
              Reported by {complaint.studentName} · {complaint.location?.room} · {complaint.createdAt}
            </p>
          </div>
          <StatusBadge status={complaint.status} size="lg" />
        </section>

        <div className="lifecycle-steps" style={{ maxWidth: 'var(--content)', margin: '0 auto var(--space-6)', padding: '0 var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {complaint.timeline.map((step, i) => (
            <div key={i} className={`lifecycle-step ${step.completed ? 'completed' : ''} ${step.current ? 'current' : ''} ${step.pending ? 'pending' : ''}`} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              padding: 'var(--space-3) var(--space-4)',
              background: step.completed ? 'var(--accent-light)' : step.current ? 'var(--accent-light)' : step.pending ? 'var(--surface-tertiary)' : 'var(--surface-secondary)',
              border: `1px solid ${step.completed || step.current ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: 'var(--radius-md)',
              boxShadow: step.current ? '0 0 0 2px var(--accent-muted)' : 'none',
            }}>
              <div className="lifecycle-step-marker" style={{
                width: '28px',
                height: '28px',
                display: 'grid',
                placeItems: 'center',
                borderRadius: '50%',
                background: step.completed ? 'var(--accent)' : step.current ? 'var(--accent-light)' : 'var(--surface-tertiary)',
                color: step.completed ? 'var(--text-inverse)' : step.current ? 'var(--accent)' : 'var(--text-muted)',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                boxShadow: step.current ? '0 0 0 3px var(--accent-muted)' : 'none',
              }}>
                {step.completed ? '✓' : ''}
              </div>
              <div className="lifecycle-step-content" style={{ flex: 1, minWidth: 0 }}>
                <span className="lifecycle-step-label" style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: step.completed || step.current ? 'var(--text-primary)' : 'var(--text-muted)' }}>{step.label}</span>
                <small className="lifecycle-step-time" style={{ fontSize: 'var(--text-xs)', color: step.completed || step.current ? 'var(--text-secondary)' : 'var(--text-muted)', display: 'block', marginTop: 'var(--space-1)' }}>{step.time}</small>
              </div>
            </div>
          ))}
        </div>

        <div className="review-grid" style={{ display: 'grid', gap: 'var(--space-4)' }}>
          <section className="review-main" style={{ display: 'grid', gap: 'var(--space-4)', minWidth: 0 }}>
            <div className="dashboard-card" style={{ padding: 'var(--space-5)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <div className="review-card-heading" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-3)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                <span>COMPLAINT DETAILS</span>
                <span className={`high-pill ${complaint.priority === 'high' ? '' : ''}`} style={{ color: 'var(--danger)', background: 'var(--danger-light)', padding: 'var(--space-1) var(--space-2)', borderRadius: 'var(--radius-full)', fontSize: 'var(--text-xs)', fontWeight: 600 }}>High priority</span>
              </div>
              <div className="review-fields" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 var(--space-5)' }}>
                <div style={{ padding: 'var(--space-3) 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Category</span>
                  <strong style={{ display: 'block', marginTop: 'var(--space-1)', fontSize: 'var(--text-base)', fontWeight: 600 }}>{complaint.category}</strong>
                </div>
                <div style={{ padding: 'var(--space-3) 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Location</span>
                  <strong style={{ display: 'block', marginTop: 'var(--space-1)', fontSize: 'var(--text-base)', fontWeight: 600 }}>{complaint.location?.hostel} · {complaint.location?.room}</strong>
                </div>
                <div className="full" style={{ gridColumn: '1 / -1', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Description</span>
                  <p style={{ marginTop: 'var(--space-2)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)' }}>{complaint.description}</p>
                </div>
              </div>
              <div className="fake-photo" style={{ minHeight: '140px', marginTop: 'var(--space-4)', padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(145deg, var(--surface-tertiary), var(--surface-secondary))', color: 'var(--text-primary)' }}>
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>PHOTO ATTACHMENT</span>
                <strong style={{ marginTop: 'var(--space-1)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>Bathroom leakage.jpg</strong>
                <small style={{ fontSize: 'var(--text-xs)', opacity: 0.6 }}>Image preview</small>
              </div>
            </div>

            <div className="dashboard-card" style={{ padding: 'var(--space-5)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <div className="review-card-heading" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-3)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                <span>UPDATE STATUS</span>
                <span>Current: {complaint.status.charAt(0).toUpperCase() + complaint.status.slice(1).replace('-', ' ')}</span>
              </div>
              
              <div className="status-actions" style={{ display: 'grid', gap: 'var(--space-2)', margin: 'var(--space-4) 0' }}>
                <Button variant="secondary" onClick={() => handleStatusUpdate('in-progress')} style={{ justifyContent: 'flex-start' }}>
                  Mark In Progress
                </Button>
                <Button variant="primary" className="resolve-action" onClick={() => handleStatusUpdate('resolved')} style={{ justifyContent: 'flex-start', color: 'var(--text-inverse)' }}>
                  Mark Resolved
                </Button>
                <Button variant="ghost" onClick={() => handleStatusUpdate('rejected')} style={{ justifyContent: 'flex-start' }}>
                  Reject
                </Button>
              </div>
              <div className="field" style={{ display: 'grid', gap: 'var(--space-2)' }}>
                <label htmlFor="warden-note" style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-primary)' }}>Add internal note</label>
                <textarea id="warden-note" rows="4" placeholder="Add instructions or a note for the maintenance team..." value={note} onChange={(e) => setNote(e.target.value)} style={{ minHeight: '100px', resize: 'vertical', width: '100%', padding: 'var(--space-3) var(--space-4)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--surface)', color: 'var(--text-primary)', fontSize: 'var(--text-sm)' }} />
              </div>
              <Button variant="primary" fullWidth onClick={handleSaveNote}>
                Save update
              </Button>
            </div>
          </section>

          <aside className="review-side" style={{ display: 'grid', gap: 'var(--space-4)', minWidth: 0 }}>
            <div className="dashboard-card student-review-card" style={{ padding: 'var(--space-5)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>REPORTED BY</span>
              <div className="assigned-person" style={{ margin: 'var(--space-4) 0', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <Avatar name={complaint.studentName} size="lg" />
                <div>
                  <strong style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>{complaint.studentName}</strong>
                  <small style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>CS · 3rd Semester</small>
                </div>
              </div>
              <div className="contact-line" style={{ padding: 'var(--space-3) 0', display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)', borderTop: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Room</span>
                <b style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)' }}>{complaint.location?.room}</b>
              </div>
              <div className="contact-line" style={{ padding: 'var(--space-3) 0', display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)', borderTop: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Phone</span>
                <b style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)' }}>+91 98••••••42</b>
              </div>
              <Button variant="outline" style={{ marginTop: 'var(--space-4)', width: '100%' }}>View student profile →</Button>
            </div>

            <div className="dashboard-card" style={{ padding: 'var(--space-5)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>ASSIGNMENT</span>
              
              <div className="lifecycle-steps" style={{ marginBottom: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {[
                  { label: 'Team Selected', time: '14 Aug · 2:30 PM', completed: true },
                  { label: 'Notified', time: '14 Aug · 2:35 PM', current: true },
                  { label: 'On Site', time: 'Waiting', pending: true },
                  { label: 'Completed', time: 'Waiting', pending: true },
                ].map((step, i) => (
                  <div key={i} className={`lifecycle-step ${step.completed ? 'completed' : ''} ${step.current ? 'current' : ''} ${step.pending ? 'pending' : ''}`} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    padding: 'var(--space-3) var(--space-4)',
                    background: step.completed ? 'var(--accent-light)' : step.current ? 'var(--accent-light)' : step.pending ? 'var(--surface-tertiary)' : 'var(--surface-secondary)',
                    border: `1px solid ${step.completed || step.current ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-md)',
                    boxShadow: step.current ? '0 0 0 2px var(--accent-muted)' : 'none',
                  }}>
                    <div className="lifecycle-step-marker" style={{
                      width: '28px',
                      height: '28px',
                      display: 'grid',
                      placeItems: 'center',
                      borderRadius: '50%',
                      background: step.completed ? 'var(--accent)' : step.current ? 'var(--accent-light)' : 'var(--surface-tertiary)',
                      color: step.completed ? 'var(--text-inverse)' : step.current ? 'var(--accent)' : 'var(--text-muted)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700,
                      boxShadow: step.current ? '0 0 0 3px var(--accent-muted)' : 'none',
                    }}>
                      {step.completed ? '✓' : ''}
                    </div>
                    <div className="lifecycle-step-content" style={{ flex: 1, minWidth: 0 }}>
                      <span className="lifecycle-step-label" style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: step.completed || step.current ? 'var(--text-primary)' : 'var(--text-muted)' }}>{step.label}</span>
                      <small className="lifecycle-step-time" style={{ fontSize: 'var(--text-xs)', color: step.completed || step.current ? 'var(--text-secondary)' : 'var(--text-muted)', display: 'block', marginTop: 'var(--space-1)' }}>{step.time}</small>
                    </div>
                  </div>
                ))}
              </div>

              <div className="assignment-box" style={{ marginTop: 'var(--space-4)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', background: 'var(--surface-secondary)' }}>
                <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>Maintenance team</span>
                <strong style={{ display: 'block', margin: 'var(--space-1) 0', fontSize: 'var(--text-sm)', fontWeight: 600 }}>Plumbing — Team 02</strong>
                <small style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>Available · 2 technicians</small>
              </div>
              <Button variant="primary" className="full-button" onClick={handleAssign}>
                Assign / Reassign Team
              </Button>
              
              <div style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--border)' }}>
                <div className="contact-line" style={{ padding: 'var(--space-3) 0', display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)', borderTop: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>ETA</span>
                  <b style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)' }}>Within 2 hours</b>
                </div>
                <div className="contact-line" style={{ padding: 'var(--space-3) 0', display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)', borderTop: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Contact</span>
                  <b style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)' }}>+91 98••••••12</b>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer variant="warden" />
    </div>
  );
}