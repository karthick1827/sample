import React from 'react'
import { Button } from '../common/Button'
import { ArrowRightIcon } from '../common/Icons'

export function NavigationCard({
  title,
  description,
  actionLabel,
  icon,
  metricText,
  onClick
}) {
  return (
    <div className="fleet-nav-card">
      <div className="fleet-card-header">
        <div className="fleet-card-icon-box">
          {icon}
        </div>
        <h2 className="fleet-card-title">{title}</h2>
      </div>

      <div className="fleet-card-body">
        <p className="fleet-card-description">{description}</p>

        <div className="fleet-card-footer">
          <div className="fleet-card-status-indicator">
            <span className="fleet-card-status-dot"></span>
            <span>{metricText || 'Live System Online'}</span>
          </div>

          <Button
            variant="cardAction"
            size="sm"
            onClick={onClick}
            icon={<ArrowRightIcon size={14} />}
          >
            {actionLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
