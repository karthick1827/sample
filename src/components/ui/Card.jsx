import React from 'react';

export function Card({
  children,
  elevation = 'sm', // 'none' | 'sm' | 'md' | 'lg' | 'hover'
  padding = '24px',
  borderRadius = 'var(--radius-card)',
  style = {},
  className = '',
  onClick,
  ...props
}) {
  const isClickable = !!onClick;

  const shadowMap = {
    none: 'none',
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
    hover: 'var(--shadow-sm)',
  };

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius,
        padding,
        boxShadow: shadowMap[elevation] || shadowMap.sm,
        transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
        cursor: isClickable ? 'pointer' : 'default',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
      className={`${isClickable ? 'interactive-card focus-ring' : ''} ${className}`}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick(e);
              }
            }
          : undefined
      }
      {...props}
    >
      {children}
    </div>
  );
}
