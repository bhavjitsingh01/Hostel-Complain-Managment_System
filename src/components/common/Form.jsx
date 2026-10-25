import { forwardRef } from 'react';

export const Input = forwardRef(function Input({ 
  label, 
  hint, 
  error, 
  className = '', 
  id, 
  type = 'text', 
  ...props 
}, ref) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;

  return (
    <div className={`field ${className}`}>
      {label && (
        <label htmlFor={inputId} style={{ fontSize: 'var(--text-xs)', fontWeight: '600', color: 'var(--text-primary)' }}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        type={type}
        className="form-input"
        aria-describedby={hint ? hintId : error ? errorId : undefined}
        aria-invalid={error ? 'true' : 'false'}
        {...props}
      />
      {error && (
        <span id={errorId} className="field-hint error" style={{ color: 'var(--danger)' }}>
          {error}
        </span>
      )}
      {hint && !error && (
        <span id={hintId} className="field-hint">{hint}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export const Textarea = forwardRef(function Textarea({ 
  label, 
  hint, 
  error, 
  className = '', 
  id, 
  rows = 4, 
  ...props 
}, ref) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;

  return (
    <div className={`field ${className}`}>
      {label && (
        <label htmlFor={inputId} style={{ fontSize: 'var(--text-xs)', fontWeight: '600', color: 'var(--text-primary)' }}>
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={inputId}
        rows={rows}
        className="form-textarea"
        aria-describedby={hint ? hintId : error ? errorId : undefined}
        aria-invalid={error ? 'true' : 'false'}
        {...props}
      />
      {error && (
        <span id={errorId} className="field-hint error" style={{ color: 'var(--danger)' }}>
          {error}
        </span>
      )}
      {hint && !error && (
        <span id={hintId} className="field-hint">{hint}</span>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export const Select = forwardRef(function Select({ 
  label, 
  hint, 
  error, 
  className = '', 
  id, 
  options = [], 
  placeholder, 
  ...props 
}, ref) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;

  return (
    <div className={`field ${className}`}>
      {label && (
        <label htmlFor={inputId} style={{ fontSize: 'var(--text-xs)', fontWeight: '600', color: 'var(--text-primary)' }}>
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={inputId}
        className="form-select"
        aria-describedby={hint ? hintId : error ? errorId : undefined}
        aria-invalid={error ? 'true' : 'false'}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span id={errorId} className="field-hint error" style={{ color: 'var(--danger)' }}>
          {error}
        </span>
      )}
      {hint && !error && (
        <span id={hintId} className="field-hint">{hint}</span>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export function FieldGrid({ children, className = '', columns = 2 }) {
  return (
    <div className={`form-grid ${className}`} style={{ 
      display: 'grid', 
      gap: 'var(--space-4)',
      gridTemplateColumns: columns === 2 ? 'repeat(2, 1fr)' : columns === 3 ? 'repeat(3, 1fr)' : '1fr',
    }}>
      {children}
    </div>
  );
}

export function FormSubmit({ children, className = '' }) {
  return (
    <div className={`form-submit ${className}`} style={{ 
      marginTop: 'var(--space-6)', 
      paddingTop: 'var(--space-4)', 
      borderTop: '1px solid var(--border)' 
    }}>
      {children}
    </div>
  );
}