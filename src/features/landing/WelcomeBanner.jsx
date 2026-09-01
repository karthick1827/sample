import React from 'react';

export function WelcomeBanner({ title = 'Welcome to Fleet 360', subtitle = 'Complete visibility into your data, take control with real insights.' }) {
  return (
    <div style={{ marginBottom: '40px', textAlign: 'left' }}>
      <h1
        style={{
          fontSize: '32px',
          fontWeight: '700',
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.02em',
          marginBottom: '8px',
          lineHeight: 1.25,
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontSize: '16px',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.5,
          margin: 0,
          maxWidth: '680px',
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}
