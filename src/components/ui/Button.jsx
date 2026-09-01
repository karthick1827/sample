import React from 'react';
import { Spinner } from './Spinner';

export function Button({
  children,
  type = 'button',
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost'
  size = 'md',        // 'sm' | 'md' | 'lg'
  fullWidth = false,
  disabled = false,
  isLoading = false,
  onClick,
  icon,
  className = '',
  ...props
}) {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: '600',
    borderRadius: 'var(--radius-md)',
    transition: 'all 0.15s ease',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    border: '1px solid transparent',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.6 : 1,
    textDecoration: 'none',
    position: 'relative',
    fontFamily: 'var(--font-sans)',
  };

  const sizeStyles = {
    sm: { padding: '6px 12px', fontSize: '13px', height: '36px' },
    md: { padding: '10px 20px', fontSize: '14px', height: '44px' },
    lg: { padding: '12px 24px', fontSize: '16px', height: '48px' },
  };

  const variantStyles = {
    primary: {
      backgroundColor: 'var(--color-brand-primary)',
      color: '#FFFFFF',
      boxShadow: 'var(--shadow-sm)',
    },
    secondary: {
      backgroundColor: 'var(--color-surface-subtle)',
      color: 'var(--color-text-primary)',
      borderColor: 'var(--color-border)',
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--color-brand-primary)',
      borderColor: 'var(--color-border)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--color-text-secondary)',
    },
  };

  const currentStyles = {
    ...baseStyles,
    ...(sizeStyles[size] || sizeStyles.md),
    ...(variantStyles[variant] || variantStyles.primary),
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      style={currentStyles}
      className={`focus-ring ${className}`}
      {...props}
    >
      {isLoading && <Spinner size={18} color="currentColor" />}
      {!isLoading && icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
