import { StatusBadge } from '../common/StatusBadge';

const priorityDots = {
  urgent: 'urgent',
  important: 'important',
  normal: 'normal',
};

export function AnnouncementCard({ announcement }) {
  return (
    <article className="announcement" style={{ 
      padding: 'var(--space-4) 0', 
      display: 'grid', 
      gridTemplateColumns: '60px minmax(0, 1fr) 24px', 
      gap: 'var(--space-3)', 
      alignItems: 'start', 
      borderBottom: '1px solid var(--border-subtle)' 
    }}>
      <span className="announcement-date" style={{ color: 'var(--accent)', fontSize: 'var(--text-xs)', fontWeight: 700, whiteSpace: 'nowrap' }}>
        {announcement.date}
      </span>
      <div>
        <h3 style={{ fontSize: 'var(--text-base)', letterSpacing: '-0.01em', fontWeight: 600 }}>{announcement.title}</h3>
        <p style={{ marginTop: 'var(--space-1)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)' }}>{announcement.message}</p>
      </div>
      <span className={`priority-dot ${priorityDots[announcement.priority] || 'normal'}`} style={{ 
        marginLeft: 'auto', 
        width: '8px', 
        height: '8px', 
        borderRadius: '50%',
        background: announcement.priority === 'urgent' ? 'var(--danger)' : announcement.priority === 'important' ? 'var(--warning)' : 'var(--info)',
      }}></span>
    </article>
  );
}