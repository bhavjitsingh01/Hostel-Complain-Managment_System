export function StatusBadge({ status, size = 'md', className = '' }) {
  const statusMap = {
    new: 'status-new',
    pending: 'status-pending',
    'in-progress': 'status-progress',
    resolved: 'status-resolved',
    rejected: 'status-rejected',
    closed: 'status-rejected',
    active: 'status-active',
    leave: 'status-leave',
    high: 'status-high',
    medium: 'status-medium',
    low: 'status-low',
    urgent: 'status-high',
    important: 'status-medium',
    normal: 'status-low',
  };

  const sizeMap = {
    sm: '',
    md: '',
    lg: 'large-status',
  };

  const labelMap = {
    new: 'New',
    pending: 'Pending',
    'in-progress': 'In Progress',
    resolved: 'Resolved',
    rejected: 'Rejected',
    closed: 'Closed',
    active: 'Active',
    leave: 'On Leave',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    urgent: 'Urgent',
    important: 'Important',
    normal: 'Normal',
  };

  const classes = [
    'status',
    statusMap[status] || 'status-pending',
    sizeMap[size] || '',
    className,
  ].filter(Boolean).join(' ');

  return <b className={classes}>{labelMap[status] || status}</b>;
}

export function PriorityPill({ priority, className = '' }) {
  const priorityMap = {
    low: 'priority-pill low',
    medium: 'priority-pill medium',
    high: 'priority-pill high',
  };

  const labelMap = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  };

  return (
    <span className={`${priorityMap[priority] || 'priority-pill medium'} ${className}`}>
      {labelMap[priority] || priority}
    </span>
  );
}