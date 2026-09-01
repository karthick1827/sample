import React from 'react';

export function SplitLayout({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: 'var(--color-bg-canvas)',
      }}
    >
      {/* Left Pane: Industrial Equipment Brand Hero */}
      <div
        className="hero-pane"
        style={{
          flex: '1 1 50%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '48px',
          backgroundColor: '#0F172A',
          backgroundImage: `linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(0, 102, 255, 0.65) 100%), url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1600&auto=format&fit=crop&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFFFFF',
          overflow: 'hidden',
        }}
      >
        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', zIndex: 2 }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'var(--color-brand-primary)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0, 102, 255, 0.4)',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: '700', letterSpacing: '-0.02em', margin: 0 }}>
              Fleet 360
            </h1>
            <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.75)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Powered by ACE Digital
            </span>
          </div>
        </div>

        {/* Hero Narrative */}
        <div style={{ maxWidth: '520px', zIndex: 2, margin: 'auto 0' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(8px)',
              borderRadius: 'var(--radius-full)',
              marginBottom: '24px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-status-success)' }} />
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#FFFFFF' }}>
              Industrial IoT Fleet Telemetry & Facility Control
            </span>
          </div>

          <h2 style={{ fontSize: '36px', fontWeight: '700', lineHeight: 1.2, marginBottom: '16px' }}>
            Complete visibility into your assets. Real-time control.
          </h2>

          <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.6, marginBottom: '32px' }}>
            Monitor commercial HVAC and mission-critical refrigeration units across multi-campus facilities with enterprise-grade reliability.
          </p>

          {/* Value Badges */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Real-time Fault Triage</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>3D Architectural Sites</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Enterprise RBAC</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 2, fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
          <span>© 2026 Fleet 360 Inc. All rights reserved.</span>
          <span>Enterprise Version 2.4.0</span>
        </div>
      </div>

      {/* Right Pane: Login Form Card */}
      <div
        style={{
          flex: '1 1 50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '32px 24px',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        <div style={{ width: '100%', maxWidth: '440px' }}>
          {children}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-pane {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
