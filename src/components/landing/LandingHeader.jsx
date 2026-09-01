import React from 'react'
import { FleetLogo, BellIcon, LogoutIcon } from '../common/Icons'
import { Button } from '../common/Button'

export function LandingHeader({ user, onLogout }) {
  const initials = user?.name 
    ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'OP'

  return (
    <header className="fleet-landing-navbar">
      <div className="fleet-navbar-left">
        <FleetLogo height={34} variant="dark" />
      </div>

      <div className="fleet-navbar-right">
        <button
          type="button"
          title="Notifications"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--fleet-text-muted)'
          }}
          onClick={() => alert('All systems normal. 0 active alarms.')}
        >
          <BellIcon size={20} />
        </button>

        <div className="fleet-user-badge">
          <div className="fleet-user-avatar">
            {initials}
          </div>
          <div className="fleet-user-info">
            <span className="fleet-user-name">{user?.name || 'Operator'}</span>
            <span className="fleet-user-role">{user?.role || 'Facility Manager'}</span>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onLogout}
          icon={<LogoutIcon size={16} />}
        >
          Sign Out
        </Button>
      </div>
    </header>
  )
}
