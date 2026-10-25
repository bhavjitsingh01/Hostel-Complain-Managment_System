export function Card({ children, className = '', hover = true, padding = true, ...props }) {
  const classes = [
    'dashboard-card',
    padding ? '' : 'p-0',
    hover ? '' : 'no-hover',
    className,
  ].filter(Boolean).join(' ');

  return (
    <section className={classes} {...props}>
      {children}
    </section>
  );
}

export function CardHeading({ kicker, title, action, children, className = '' }) {
  return (
    <div className={`card-heading ${className}`}>
      <div>
        {kicker && <span className="card-kicker">{kicker}</span>}
        {title && <h2>{title}</h2>}
        {children}
      </div>
      {action}
    </div>
  );
}

export function DashboardStat({ label, value, sublabel, highlight = false, className = '' }) {
  const classes = [
    'dashboard-stat',
    highlight ? 'stat-highlight' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <article className={classes}>
      <span>{label}</span>
      <strong>{value}</strong>
      {sublabel && <small>{sublabel}</small>}
    </article>
  );
}