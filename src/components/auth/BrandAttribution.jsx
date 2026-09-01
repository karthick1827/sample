import React from 'react'

export function BrandAttribution({ variant = 'light' }) {
  const isLight = variant === 'light'
  
  return (
    <div 
      className="fleet-brand-attribution"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '12px 0',
        color: isLight ? 'rgba(255, 255, 255, 0.8)' : 'var(--fleet-text-muted)',
        fontSize: '12px',
        fontFamily: 'var(--font-family-base)',
        userSelect: 'none'
      }}
    >
      <span>Powered by</span>
      <span style={{ 
        fontWeight: 700, 
        letterSpacing: '0.04em',
        color: isLight ? '#FFFFFF' : 'var(--fleet-navy-medium)'
      }}>
        ACE Digital
      </span>
    </div>
  )
}
