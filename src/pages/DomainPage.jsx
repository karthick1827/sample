import React from 'react';
import { AppHeader } from '../components/layout/AppHeader';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export function DomainPage({ domain, onNavigate }) {
  const configs = {
    devices: {
      title: 'Devices & RTU Telemetry',
      badge: 'Hardware Fleet',
      description: 'Live sensor metrics, refrigeration setpoints, and compressor telemetry across all connected equipment.',
      stats: [
        { label: 'Total Connected RTUs', value: '142 units' },
        { label: 'Active Normal Status', value: '138 units' },
        { label: 'Warning / Fault Alert', value: '4 units' },
      ],
    },
    sites: {
      title: 'Sites & Campus Footprint',
      badge: 'Facility Mapping',
      description: 'Multi-location facility mapping, 3D architectural floor plans, and regional campus energy footprints.',
      stats: [
        { label: 'Monitored Campuses', value: '18 sites' },
        { label: 'Total Square Footage', value: '1.2M sq.ft' },
        { label: 'Average Efficiency Index', value: '96.4%' },
      ],
    },
    users: {
      title: 'Team & RBAC Administration',
      badge: 'Access & Roles',
      description: 'Enterprise team provisioning, technician field credentials, and permission audits.',
      stats: [
        { label: 'Active Operators', value: '54 users' },
        { label: 'Field Technicians', value: '28 on-duty' },
        { label: 'Pending Approvals', value: '2 requests' },
      ],
    },
  };

  const config = configs[domain] || configs.devices;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg-canvas)' }}>
      <AppHeader onNavigate={onNavigate} />

      <main style={{ flex: 1, padding: '40px 0' }}>
        <div className="container-landing">
          {/* Back to Hub Bar */}
          <div style={{ marginBottom: '24px' }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('/landing')}
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              }
            >
              Back to Landing Hub
            </Button>
          </div>

          {/* Domain Title Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: 'var(--color-text-primary)', margin: 0 }}>
              {config.title}
            </h1>
            <Badge variant="brand">{config.badge}</Badge>
          </div>

          <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', marginBottom: '32px', maxWidth: '720px' }}>
            {config.description}
          </p>

          {/* Stats Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            {config.stats.map((stat, idx) => (
              <Card key={idx} padding="20px">
                <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                  {stat.label}
                </span>
                <span style={{ fontSize: '24px', fontWeight: '700', color: 'var(--color-text-primary)', marginTop: '6px' }}>
                  {stat.value}
                </span>
              </Card>
            ))}
          </div>

          {/* Demo Content Card */}
          <Card padding="32px">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: 'var(--color-text-primary)', margin: 0 }}>
                {config.title} Console
              </h3>
              <Badge variant="success">Connected & Active</Badge>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
              This operational module is linked to the <strong>Fleet 360</strong> infrastructure. Use the persistent header navigation or top breadcrumbs to switch between operational domains.
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}
