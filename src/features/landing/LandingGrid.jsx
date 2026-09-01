import React from 'react';
import { PillarCard } from './PillarCard';

export function LandingGrid({ onNavigate }) {
  const cards = [
    {
      id: 'devices',
      title: 'Devices',
      description: 'Manage devices efficiently and safely with real-time actionable insights and hardware setpoint telemetry.',
      ctaText: 'Manage Devices',
      badgeText: 'Hardware & RTU',
      route: '/devices',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      id: 'sites',
      title: 'Sites',
      description: 'Status of multi-location assets and footprint view with max reliability across all campuses and facility floor plans.',
      ctaText: 'Manage Sites',
      badgeText: 'Campus Mapping',
      route: '/sites',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      id: 'users',
      title: 'Users',
      description: 'Comprehensive view of your team and operators to stay on schedule with enterprise RBAC and technician permissions.',
      ctaText: 'Manage Users',
      badgeText: 'RBAC & Access',
      route: '/users',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
        width: '100%',
      }}
    >
      {cards.map((card) => (
        <PillarCard
          key={card.id}
          icon={card.icon}
          title={card.title}
          description={card.description}
          ctaText={card.ctaText}
          badgeText={card.badgeText}
          onNavigate={() => onNavigate && onNavigate(card.route)}
        />
      ))}
    </div>
  );
}
