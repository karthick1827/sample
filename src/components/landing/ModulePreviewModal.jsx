import React from 'react'
import { Button } from '../common/Button'
import { DeviceIcon, SiteIcon, UserIcon } from '../common/Icons'

export function ModulePreviewModal({ activeModule, onClose }) {
  if (!activeModule) return null

  const moduleData = {
    devices: {
      title: 'Devices & Telemetries',
      icon: <DeviceIcon size={24} color="#0A93D3" />,
      tag: 'Hardware Telemetry',
      description: 'Granular controls for Rooftop Units (RTUs), compressors, and heat pumps.',
      stats: [
        { label: 'Online Units', value: '142 / 145' },
        { label: 'Critical Faults', value: '0' },
        { label: 'Average Efficiency', value: '98.4%' }
      ]
    },
    sites: {
      title: 'Sites & 3D Floor Plans',
      icon: <SiteIcon size={24} color="#0A93D3" />,
      tag: 'Multi-Location Mapping',
      description: 'Building layouts, floor mapping, and multi-site spatial distribution.',
      stats: [
        { label: 'Active Facilities', value: '18 Sites' },
        { label: 'Regions', value: 'North America / EMEA' },
        { label: 'Floor Plan Status', value: 'All Synced' }
      ]
    },
    users: {
      title: 'User Management & RBAC',
      icon: <UserIcon size={24} color="#0A93D3" />,
      tag: 'Access Governance',
      description: 'Enterprise role-based permissions, technician dispatch keys, and audit logging.',
      stats: [
        { label: 'Active Operators', value: '84 Users' },
        { label: 'Role Types', value: 'Admin, Tech, Viewer' },
        { label: 'SSO Directory', value: 'Connected (SAML 2.0)' }
      ]
    }
  }[activeModule] || {}

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 20, 40, 0.65)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          width: '100%',
          maxWidth: '520px',
          padding: '32px',
          position: 'relative',
          boxSizing: 'border-box',
          animation: 'fadeInScale 0.2s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#F0FAFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {moduleData.icon}
            </div>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--fleet-brand-blue)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {moduleData.tag}
              </span>
              <h3 style={{ margin: '2px 0 0', fontSize: '20px', fontWeight: 700, color: 'var(--fleet-navy-medium)' }}>
                {moduleData.title}
              </h3>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              color: 'var(--fleet-text-muted)',
              cursor: 'pointer',
              lineHeight: 1
            }}
          >
            &times;
          </button>
        </div>

        <p style={{ fontSize: '14px', color: 'var(--fleet-text-muted)', lineHeight: '1.6', margin: '0 0 24px' }}>
          {moduleData.description}
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          marginBottom: '28px',
          padding: '16px',
          backgroundColor: '#F8FAFC',
          borderRadius: 'var(--radius-md)',
          border: '1px solid #E2E8F0'
        }}>
          {moduleData.stats?.map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '11px', color: 'var(--fleet-text-muted)', marginBottom: '4px' }}>{stat.label}</div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--fleet-navy-light)' }}>{stat.value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { alert(`Opening full ${moduleData.title} workspace...`); onClose(); }}>
            Launch Module
          </Button>
        </div>
      </div>
    </div>
  )
}
