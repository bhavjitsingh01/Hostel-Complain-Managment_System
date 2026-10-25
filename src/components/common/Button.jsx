import { forwardRef } from 'react';

export const Button = forwardRef(function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  disabled = false, 
  loading = false,
  className = '',
  type = 'button',
  onClick,
  ...props 
}, ref) {
  const baseClasses = 'button';
  const variantClasses = {
    primary: 'button-primary',
    secondary: 'button-secondary',
    ghost: 'button-ghost',
    outline: 'button-outline',
    destructive: 'button-destructive',
    success: 'button-success',
  };
  const sizeClasses = {
    sm: 'button-sm',
    md: '',
    lg: 'button-lg',
    xl: 'button-xl',
  };
  const widthClass = fullWidth ? 'button-full' : '';

  const classNames = [
    baseClasses,
    variantClasses[variant] || variantClasses.primary,
    sizeClasses[size] || '',
    widthClass,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      ref={ref}
      type={type}
      className={classNames}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <span className="spinner" style={{ 
          width: '16px', 
          height: '16px', 
          border: '2px solid currentColor', 
          borderRightColor: 'transparent', 
          borderRadius: '50%', 
          animation: 'spin 0.6s linear infinite',
          marginRight: 'var(--space-2)',
        }} />
      )}
      <span className="btn-text">{children}</span>
    </button>
  );
});

Button.displayName = 'Button';