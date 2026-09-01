import React from 'react';

export function Badge({
  children,
  variant = 'brand', // 'brand' | 'success' | 'warning' | 'danger' | 'neutral'
  size = 'md',       // 'sm' | 'md'
  style = {},
  className = '',
  ...props
}) {
  const variantStyles = {
    brand: {
      backgroundColor: 'var(--color-brand-primary-light)',
      color: 'var(--color-brand-primary)',
      border: '1px solid rgba(0, 102, 255, 0.2)',
    },
    success: {
      backgroundColor: '#ECFDF5',
      color: 'var(--color-status-success)',
      border: '1px solid rgba(16, 185, 129, 0.2)',
    },
    warning: {
      backgroundColor: '#FFFBEB',
      color: 'var(--color-status-warning)',
      border: '1px solid rgba(245, 158, 11, 0.2)',
    },
    danger: {
      backgroundColor: '#FEF2F2',
      color: 'var(--color-status-danger)',
      border: '1px solid rgba(239, 68, 68, 0.2)',
    },
    neutral: {
      backgroundColor: 'var(--color-surface-subtle)',
      color: 'var(--color-text-secondary)',
      border: '1px solid var(--color-border)',
    },
  };

  const sizeStyles = {
    sm: { padding: '2px 8px', fontSize: '11px', height: '20px' },
    md: { padding: '4px 10px', fontSize: '12px', height: '24px' },
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '600',
        borderRadius: 'var(--radius-full)',
        whiteSpace: 'nowrap',
        ...sizeStyles[size],
        ...(variantStyles[variant] || variantStyles.brand),
        ...style,
      }}
      className={className}
      {...props}
    >
      {children}
    </span>
  );
}
