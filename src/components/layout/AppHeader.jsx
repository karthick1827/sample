import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../ui/Badge';

export function AppHeader({ onNavigate }) {
  const { user, activeTenant, setActiveTenant, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isTenantMenuOpen, setIsTenantMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const tenantMenuRef = useRef(null);

  const tenantOptions = [
    { id: 'tenant-ace-1', name: 'ACE Digital — Industrial Facilities', region: 'North America / East' },
    { id: 'tenant-ace-2', name: 'ACE Digital — Western Hub & Chillers', region: 'North America / West' },
    { id: 'tenant-ace-3', name: 'ACE Digital — Central HVAC Campus', region: 'Central Operations' },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
      if (tenantMenuRef.current && !tenantMenuRef.current.contains(e.target)) {
        setIsTenantMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      style={{
        height: '64px',
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
      }}
    >
      {/* Brand & Organization */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div
          onClick={() => onNavigate && onNavigate('/landing')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              backgroundColor: 'var(--color-brand-primary)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0, 102, 255, 0.3)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
            Fleet 360
          </span>
        </div>

        <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--color-border)' }} />

        {/* Tenant Switcher Dropdown */}
        <div ref={tenantMenuRef} style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setIsTenantMenuOpen(!isTenantMenuOpen)}
            className="focus-ring"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              backgroundColor: 'var(--color-surface-subtle)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: '13px',
              fontWeight: '500',
              color: 'var(--color-text-primary)',
              cursor: 'pointer',
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-brand-primary)' }} />
            <span>{activeTenant?.name || 'Select Facility'}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {isTenantMenuOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 6px)',
                left: 0,
                width: '320px',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                padding: '6px',
                zIndex: 60,
              }}
            >
              <div style={{ padding: '8px 10px', fontSize: '11px', fontWeight: '600', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                Active Operations Tenant
              </div>
              {tenantOptions.map((tenant) => (
                <button
                  key={tenant.id}
                  type="button"
                  onClick={() => {
                    setActiveTenant(tenant);
                    setIsTenantMenuOpen(false);
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    border: 'none',
                    backgroundColor: activeTenant?.id === tenant.id ? 'var(--color-brand-primary-light)' : 'transparent',
                    color: activeTenant?.id === tenant.id ? 'var(--color-brand-primary)' : 'var(--color-text-primary)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: '600' }}>{tenant.name}</span>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>{tenant.region}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Controls: Notifications & User Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="focus-ring"
          style={{
            position: 'relative',
            background: 'transparent',
            border: 'none',
            padding: '8px',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span
            style={{
              position: 'absolute',
              top: '4px',
              right: '4px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-status-danger)',
              border: '2px solid #FFFFFF',
            }}
          />
        </button>

        {/* User Profile Dropdown */}
        <div ref={userMenuRef} style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="focus-ring"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-brand-primary-light)',
                color: 'var(--color-brand-primary)',
                fontWeight: '700',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(0, 102, 255, 0.2)',
              }}
            >
              {user?.name ? user.name.split(' ').map((n) => n[0]).join('') : 'NK'}
            </div>
            <div style={{ textAlign: 'left', display: 'none' }} className="user-text">
              <span style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--color-text-primary)' }}>
                {user?.name || 'N Karthick'}
              </span>
              <span style={{ display: 'block', fontSize: '11px', color: 'var(--color-text-muted)' }}>
                {user?.role || 'Lead Operator'}
              </span>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {isUserMenuOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 6px)',
                right: 0,
                width: '240px',
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                padding: '8px',
                zIndex: 60,
              }}
            >
              <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--color-border)', marginBottom: '6px' }}>
                <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary)' }}>
                  {user?.name || 'N Karthick'}
                </p>
                <p style={{ margin: 0, fontSize: '12px', color: 'var(--color-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user?.email || 'karthick.natarajan@acldigital.com'}
                </p>
                <Badge variant="brand" size="sm" style={{ marginTop: '6px' }}>
                  {user?.role || 'Facility Lead'}
                </Badge>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsUserMenuOpen(false);
                  logout();
                  if (onNavigate) onNavigate('/login');
                }}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: 'var(--color-status-danger)',
                  fontSize: '13px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
