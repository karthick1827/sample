import React, { forwardRef } from 'react';

export const Input = forwardRef(function Input(
  {
    label,
    id,
    type = 'text',
    error,
    helperText,
    required = false,
    startIcon,
    endIcon,
    className = '',
    style = {},
    ...props
  },
  ref
) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
  const errorId = inputId ? `${inputId}-error` : undefined;
  const helperId = inputId ? `${inputId}-helper` : undefined;

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', ...style }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontSize: '14px',
            fontWeight: '500',
            color: 'var(--color-text-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>
            {label}
            {required && <span style={{ color: 'var(--color-status-danger)', marginLeft: '4px' }}>*</span>}
          </span>
        </label>
      )}

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
        {startIcon && (
          <div
            style={{
              position: 'absolute',
              left: '12px',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
              color: 'var(--color-text-muted)',
            }}
          >
            {startIcon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          type={type}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          style={{
            width: '100%',
            height: '44px',
            paddingLeft: startIcon ? '40px' : '14px',
            paddingRight: endIcon ? '40px' : '14px',
            fontSize: '14px',
            color: 'var(--color-text-primary)',
            backgroundColor: 'var(--color-surface)',
            border: `1px solid ${error ? 'var(--color-status-danger)' : 'var(--color-border)'}`,
            borderRadius: 'var(--radius-md)',
            transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
            outline: 'none',
          }}
          className={error ? 'focus-ring-danger' : 'focus-ring'}
          {...props}
        />

        {endIcon && (
          <div
            style={{
              position: 'absolute',
              right: '12px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {endIcon}
          </div>
        )}
      </div>

      {error && (
        <p
          id={errorId}
          role="alert"
          style={{
            fontSize: '12px',
            color: 'var(--color-status-danger)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            margin: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{error}</span>
        </p>
      )}

      {!error && helperText && (
        <p id={helperId} style={{ fontSize: '12px', color: 'var(--color-text-muted)', margin: 0 }}>
          {helperText}
        </p>
      )}
    </div>
  );
});
