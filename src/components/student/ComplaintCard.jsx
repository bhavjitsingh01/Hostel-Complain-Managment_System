import { Link } from 'react-router-dom';
import { StatusBadge } from '../common/StatusBadge';

const categoryIcons = {
  Electrical: { symbol: 'El', className: 'warning' },
  Plumbing: { symbol: 'Pl', className: 'accent' },
  Cleanliness: { symbol: 'Cl', className: 'success' },
  Furniture: { symbol: 'Fu', className: 'accent' },
  Internet: { symbol: 'Wi', className: 'accent' },
  Security: { symbol: 'Se', className: 'warning' },
  Water: { symbol: 'Wa', className: 'warning' },
  Other: { symbol: 'Ot', className: 'accent' },
};

export function ComplaintCard({ complaint }) {
  const icon = categoryIcons[complaint.category] || { symbol: 'Ot', className: 'accent' };

  return (
    <article className="student-complaint" style={{ 
      minWidth: 0, 
      padding: 'var(--space-4) 0', 
      display: 'grid', 
      gridTemplateColumns: '44px minmax(0, 1fr)', 
      gap: 'var(--space-3)', 
      borderBottom: '1px solid var(--border-subtle)' 
    }}>
      <div className={`complaint-symbol ${icon.className}`} style={{ 
        width: '44px', 
        height: '44px', 
        display: 'grid', 
        placeItems: 'center', 
        borderRadius: 'var(--radius-md)', 
        fontSize: 'var(--text-xs)', 
        fontWeight: 700 
      }}>
        {icon.symbol}
      </div>
      <div className="complaint-info" style={{ minWidth: 0 }}>
        <div className="complaint-title-row" style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'flex-start', 
          gap: 'var(--space-2)' 
        }}>
          <h3 style={{ 
            minWidth: 0, 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            whiteSpace: 'nowrap', 
            fontSize: 'var(--text-base)', 
            letterSpacing: '-0.01em', 
            fontWeight: 600 
          }}>
            {complaint.title}
          </h3>
          <StatusBadge status={complaint.status} size="sm" />
        </div>
        <p style={{ marginTop: 'var(--space-1)', color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>
          #{complaint.id} · {complaint.location?.room || 'Room'} · {complaint.createdAt}
        </p>
      </div>
      <Link 
        to={`/student/complaints/${complaint.id}`} 
        className="complaint-arrow" 
        aria-label="View complaint details"
        style={{ 
          display: 'none', 
          alignSelf: 'center', 
          color: 'var(--text-muted)', 
          fontSize: 'var(--text-xl)' 
        }}
      >
        →
      </Link>
    </article>
  );
}