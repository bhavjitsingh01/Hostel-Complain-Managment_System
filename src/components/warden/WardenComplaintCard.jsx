import { Link } from 'react-router-dom';
import { StatusBadge } from '../common/StatusBadge';

export function WardenComplaintCard({ complaint }) {
  const isHigh = complaint.priority === 'high' || complaint.status === 'new';

  return (
    <article className={`warden-complaint ${isHigh ? 'high' : ''}`} style={{ 
      display: 'grid', 
      gridTemplateColumns: '42px minmax(0, 1fr)', 
      gap: 'var(--space-3)', 
      padding: 'var(--space-4) 0', 
      borderBottom: '1px solid var(--border-subtle)' 
    }}>
      <div className="severity" style={{ 
        width: '42px', 
        height: '42px', 
        display: 'grid', 
        placeItems: 'center', 
        borderRadius: 'var(--radius-md)', 
        background: isHigh ? 'var(--danger-light)' : 'var(--surface-tertiary)', 
        color: isHigh ? 'var(--danger)' : 'var(--text-secondary)', 
        fontSize: 'var(--text-xs)', 
        fontWeight: 700 
      }}>
        {!isHigh && complaint.category?.charAt(0)}
      </div>
      <div className="warden-complaint-info" style={{ minWidth: 0 }}>
        <div className="warden-title" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
          <h3 style={{ fontSize: 'var(--text-sm)', letterSpacing: '-0.01em', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{complaint.title}</h3>
          <StatusBadge status={complaint.status} size="sm" />
        </div>
        <p style={{ marginTop: 'var(--space-1)', color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>
          #{complaint.id} · {complaint.studentName} · {complaint.location?.room}
        </p>
      </div>
      <div className="complaint-meta" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-2)' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>{complaint.createdAt}</span>
        <Link to={`/warden/complaints/${complaint.id}`} style={{ color: 'var(--accent)', fontSize: 'var(--text-xs)', fontWeight: 600, textDecoration: 'none' }}>Review →</Link>
      </div>
    </article>
  );
}