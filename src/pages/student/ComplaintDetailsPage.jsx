import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useComplaints } from '../../context/ComplaintsContext';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { BackLink } from '../../components/common/BackLink';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Avatar } from '../../components/common/Avatar';

export function StudentComplaintDetailsPage() {
  const { id } = useParams();
  const { getComplaint } = useComplaints();
  const { user } = useAuth();
  const complaint = getComplaint(id);

  if (!complaint) {
    return (
      <div className="dashboard-page page-layout" style={{ background: `
        radial-gradient(ellipse 60% 40% at 85% 10%, var(--accent-muted), transparent 50%),
        radial-gradient(ellipse 50% 35% at 10% 90%, var(--success-muted), transparent 45%),
        var(--bg)
      ` }}>
        <Navbar variant="student" />
        <main className="details-shell" style={{ maxWidth: '1160px', margin: '0 auto', padding: 'var(--space-8) var(--space-4) var(--space-16)' }}>
          <BackLink to="/student/complaints" label="Back to complaints" />
          <div className="empty-state" style={{ padding: 'var(--space-16) var(--space-4)', textAlign: 'center' }}>
            <h3>Complaint not found</h3>
            <p>The complaint you're looking for doesn't exist.</p>
            <Link to="/student/complaints" style={{ marginTop: 'var(--space-4)', display: 'inline-block' }}>
              <button className="button button-primary">Back to Complaints</button>
            </Link>
          </div>
        </main>
        <Footer variant="student" />
      </div>
    );
  }

  const currentStep = complaint.timeline.findIndex(s => s.current);
  const completedSteps = complaint.timeline.filter(s => s.completed).length;

  return (
    <div className="dashboard-page page-layout" style={{ background: `
      radial-gradient(ellipse 60% 40% at 85% 10%, var(--accent-muted), transparent 50%),
      radial-gradient(ellipse 50% 35% at 10% 90%, var(--success-muted), transparent 45%),
      var(--bg)
    ` }}>
      <Navbar variant="student" />
      
      <main className="details-shell" style={{ maxWidth: '1160px', margin: '0 auto', padding: 'var(--space-8) var(--space-4) var(--space-16)' }}>
        <BackLink to="/student/complaints" label="Back to complaints" />
        
        <div className="details-heading" style={{ padding: 'var(--space-6) 0 var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div className="details-heading-content" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <p className="eyebrow" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-3)',
              color: 'var(--text-secondary)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              <span className="eyebrow-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }}></span>
              COMPLAINT #{complaint.id}
            </p>
            <h1 style={{ fontSize: 'clamp(38px, 6vw, 56px)', lineHeight: 'var(--leading-tight)', letterSpacing: '-0.03em', fontWeight: 600 }}>
              {complaint.title}
            </h1>
            <p className="details-meta" style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)' }}>
              Submitted {complaint.createdAt} · {complaint.location?.room}
            </p>
          </div>
          <StatusBadge status={complaint.status} size="lg" />
        </div>

        <div className="details-grid" style={{ display: 'grid', gap: 'var(--space-4)' }}>
          <section className="details-main" style={{ display: 'grid', gap: 'var(--space-4)' }}>
            <div className="detail-card" style={{ padding: 'var(--space-5)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <div className="detail-card-title" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>STATUS TIMELINE</span>
                <strong>{complaint.timeline[currentStep]?.label || 'Processing'}</strong>
              </div>
              
              <div className="lifecycle-steps" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
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
            </div>

            <div className="detail-card" style={{ padding: 'var(--space-5)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <div className="detail-card-title" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>YOUR REPORT</span>
                <span>{complaint.location?.room}</span>
              </div>
              <div className="report-block" style={{ padding: 'var(--space-4) 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Category</span>
                <strong style={{ display: 'block', marginTop: 'var(--space-1)', fontSize: 'var(--text-base)', fontWeight: 600 }}>{complaint.category}</strong>
              </div>
              <div className="report-block" style={{ padding: 'var(--space-4) 0', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Description</span>
                <p style={{ marginTop: 'var(--space-2)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)' }}>{complaint.description}</p>
              </div>
              <div className="report-block" style={{ padding: 'var(--space-4) 0' }}>
                <span style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 500 }}>Priority</span>
                <StatusBadge status={complaint.priority} />
              </div>
              {complaint.image && (
                <div className="fake-photo" style={{ minHeight: '140px', marginTop: 'var(--space-4)', padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(145deg, var(--surface-tertiary), var(--surface-secondary))', color: 'var(--text-primary)' }}>
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>PHOTO ATTACHMENT</span>
                  <strong style={{ marginTop: 'var(--space-1)', fontSize: 'var(--text-sm)', fontWeight: 600 }}>{complaint.image.name || 'Attachment'}</strong>
                  <small style={{ fontSize: 'var(--text-xs)', opacity: 0.6 }}>Image preview</small>
                </div>
              )}
            </div>
          </section>

          <aside className="details-sidebar" style={{ display: 'grid', gap: 'var(--space-4)' }}>
            <div className="detail-card contact-card" style={{ padding: 'var(--space-5)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>ASSIGNED TO</span>
              <div className="assigned-person" style={{ margin: 'var(--space-4) 0', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <Avatar name={complaint.assignedTo} size="lg" />
                <div>
                  <strong style={{ fontSize: 'var(--text-base)', fontWeight: 600 }}>{complaint.assignedTo || 'Not assigned'}</strong>
                  <small style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>{complaint.assignedTo ? 'Warden · Block B' : 'Waiting for assignment'}</small>
                </div>
              </div>
              <div className="contact-line" style={{ padding: 'var(--space-3) 0', display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)', borderTop: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Department</span>
                <b style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)' }}>{complaint.assignedTeam || 'Not assigned'}</b>
              </div>
              <div className="contact-line" style={{ padding: 'var(--space-3) 0', display: 'flex', justifyContent: 'space-between', gap: 'var(--space-3)', borderTop: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>Last updated</span>
                <b style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)' }}>{complaint.timeline[currentStep]?.time || 'Not yet'}</b>
              </div>
            </div>

            <div className="detail-card" style={{ padding: 'var(--space-5)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
              <span className="card-kicker" style={{ display: 'block', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>EXPECTED NEXT STEP</span>
              <h2 className="next-step" style={{ marginTop: 'var(--space-4)', fontSize: 'var(--text-xl)', letterSpacing: '-0.02em', fontWeight: 600 }}>
                {complaint.status === 'new' || complaint.status === 'pending' 
                  ? 'Warden review' 
                  : complaint.status === 'in-progress' 
                    ? 'Technician visit' 
                    : complaint.status === 'resolved'
                      ? 'Resolution confirmed'
                      : 'Next steps pending'}
              </h2>
              <p className="muted-text" style={{ marginTop: 'var(--space-2)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)' }}>
                {complaint.status === 'new' || complaint.status === 'pending'
                  ? 'The warden will review your complaint and assign a maintenance team.'
                  : complaint.status === 'in-progress'
                    ? 'The maintenance team should inspect your room and update the complaint after the visit.'
                    : complaint.status === 'resolved'
                      ? 'Your complaint has been resolved. Please verify the fix.'
                      : 'Contact the warden for more information.'}
              </p>
            </div>
          </aside>
        </div>
      </main>

      <Footer variant="student" />
    </div>
  );
}