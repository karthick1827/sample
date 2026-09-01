import React from 'react'

export function Input({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  icon = null,
  rightElement = null,
  required = false,
  autoComplete = 'off',
  disabled = false,
  className = '',
  ...props
}) {
  return (
    <div className={`fleet-input-group ${className}`} style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%', boxSizing: 'border-box' }}>
      {label && (
        <label 
          htmlFor={name}
          style={{
            fontFamily: 'var(--font-family-base)',
            fontSize: '14px',
            fontWeight: 500,
            color: '#FFFFFF',
            letterSpacing: '-0.01em',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span>{label} {required && <span style={{ color: '#FF6B6B' }}>*</span>}</span>
        </label>
      )}
      <div 
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          border: error ? '1.5px solid #FF4D4F' : '1px solid var(--fleet-card-border)',
          transition: 'all var(--transition-fast)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-sm)'
        }}
      >
        {icon && (
          <div style={{ paddingLeft: '12px', display: 'flex', alignItems: 'center', color: 'var(--fleet-text-muted)' }}>
            {icon}
          </div>
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          disabled={disabled}
          style={{
            width: '100%',
            padding: '12px 14px',
            fontFamily: 'var(--font-family-base)',
            fontSize: '14px',
            color: 'var(--fleet-text-main)',
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            boxSizing: 'border-box'
          }}
          {...props}
        />
        {rightElement && (
          <div style={{ paddingRight: '12px', display: 'flex', alignItems: 'center' }}>
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <span style={{ fontSize: '12px', color: '#FF6B6B', marginTop: '2px', fontWeight: 500 }}>
          {error}
        </span>
      )}
    </div>
  )
}
