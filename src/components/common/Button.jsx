import React from 'react'

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  type = 'button',
  onClick,
  icon = null,
  className = '',
  ...props
}) {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontFamily: 'var(--font-family-base)',
    fontWeight: 600,
    fontSize: size === 'sm' ? '13px' : size === 'lg' ? '16px' : '15px',
    lineHeight: '1.4',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    transition: 'all var(--transition-fast)',
    outline: 'none',
    width: fullWidth ? '100%' : 'auto',
    padding: size === 'sm' ? '8px 14px' : size === 'lg' ? '14px 24px' : '12px 20px',
    opacity: disabled ? 0.6 : 1,
    boxSizing: 'border-box'
  }

  const variantStyles = {
    primary: {
      backgroundColor: 'var(--fleet-primary)',
      color: '#FFFFFF',
      boxShadow: '0 2px 6px rgba(229, 0, 38, 0.25)'
    },
    secondary: {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      color: '#FFFFFF',
      border: '1px solid rgba(255, 255, 255, 0.3)'
    },
    outline: {
      backgroundColor: 'transparent',
      color: 'var(--fleet-navy-light)',
      border: '1.5px solid var(--fleet-navy-light)'
    },
    cardAction: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      color: 'var(--fleet-navy-light)',
      fontWeight: 600,
      boxShadow: 'var(--shadow-sm)'
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--fleet-text-muted)'
    }
  }

  const combinedStyle = {
    ...baseStyle,
    ...variantStyles[variant]
  }

  return (
    <button
      type={type}
      style={combinedStyle}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`fleet-btn fleet-btn-${variant} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="btn-spinner" style={{
          width: '16px',
          height: '16px',
          border: '2px solid rgba(255,255,255,0.3)',
          borderTopColor: '#FFFFFF',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          display: 'inline-block'
        }} />
      ) : null}
      {!isLoading && icon ? icon : null}
      <span>{children}</span>
    </button>
  )
}
