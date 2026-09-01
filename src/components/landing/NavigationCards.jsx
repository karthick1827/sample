import React from 'react'
import { DeviceMapPointIcon, SiteLocationIcon, UserTeamIcon, ArrowRightLineIcon } from '../common/Icons'

export function NavigationCards({ onNavigate }) {
  const cards = [
    {
      id: 'devices',
      title: 'Devices',
      body: 'Manage devices effortlessly with unified control and real-time insights.',
      actionText: 'Manage Devices',
      icon: <DeviceMapPointIcon size={26} color="#FFFFFF" />
    },
    {
      id: 'sites',
      title: 'Sites',
      body: 'Manage sites with seamless oversight and instant control with visual hierarchy',
      actionText: 'Manage Sites',
      icon: <SiteLocationIcon size={26} color="#FFFFFF" />
    },
    {
      id: 'users',
      title: 'Users',
      body: 'Assigns roles per site with granular access controls for easy user management.',
      actionText: 'Manage Users',
      icon: <UserTeamIcon size={26} color="#FFFFFF" />
    }
  ]

  return (
    <div className="fleet-landing-bottom-banner">
      {cards.map((card) => (
        <div
          key={card.id}
          className="fleet-triage-column"
          onClick={() => onNavigate && onNavigate(card.id)}
        >
          <div className="fleet-triage-icon-row">
            <div className="fleet-triage-icon-circle">
              {card.icon}
            </div>
          </div>

          <div className="fleet-triage-content">
            <h2 className="fleet-triage-title">{card.title}</h2>
            <p className="fleet-triage-body">{card.body}</p>
          </div>

          <div className="fleet-triage-action">
            <span>{card.actionText}</span>
            <ArrowRightLineIcon size={16} color="#FFFFFF" />
          </div>
        </div>
      ))}
    </div>
  )
}
