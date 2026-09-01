import React from 'react';
import { AppHeader } from '../components/layout/AppHeader';
import { WelcomeBanner } from '../features/landing/WelcomeBanner';
import { LandingGrid } from '../features/landing/LandingGrid';

export function LandingPage({ onNavigate }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg-canvas)' }}>
      <AppHeader onNavigate={onNavigate} />

      <main style={{ flex: 1, padding: '48px 0' }}>
        <div className="container-landing">
          <WelcomeBanner
            title="Welcome to Fleet 360"
            subtitle="Complete visibility into your data, take control with real insights."
          />

          <LandingGrid onNavigate={onNavigate} />
        </div>
      </main>

      <footer
        style={{
          borderTop: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)',
          padding: '24px 0',
          fontSize: '13px',
          color: 'var(--color-text-muted)',
        }}
      >
        <div
          className="container-landing"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            <span>© 2026 Fleet 360 Inc. All rights reserved.</span>
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#status" onClick={(e) => e.preventDefault()}>Operational Status: All Systems Normal</a>
            <span style={{ color: 'var(--color-text-secondary)', fontWeight: '500' }}>Powered by ACE Digital</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
