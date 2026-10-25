export function Avatar({ name, size = 'md', className = '', src, alt }) {
  const sizeMap = {
    sm: 'user-avatar',
    md: 'user-avatar',
    lg: 'large-avatar',
    xl: 'large-avatar',
  };

  const sizeStyles = {
    sm: { width: '28px', height: '28px', fontSize: 'var(--text-xs)' },
    md: { width: '36px', height: '36px', fontSize: 'var(--text-sm)' },
    lg: { width: '52px', height: '52px', fontSize: 'var(--text-base)' },
    xl: { width: '64px', height: '64px', fontSize: 'var(--text-lg)' },
  };

  const initials = name
    ? name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';

  const classes = [
    sizeMap[size] || 'user-avatar',
    className,
  ].filter(Boolean).join(' ');

  const style = { ...sizeStyles[size], ...sizeStyles.md };

  if (src) {
    return (
      <img
        src={src}
        alt={alt || name}
        className={classes}
        style={style}
      />
    );
  }

  return (
    <span className={classes} style={style}>
      {initials}
    </span>
  );
}