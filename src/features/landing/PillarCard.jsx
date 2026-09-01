import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export function PillarCard({
  icon,
  title,
  description,
  ctaText,
  onNavigate,
  badgeText,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      padding="32px"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        minHeight: '280px',
        transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: isHovered ? 'var(--shadow-card-hover)' : 'var(--shadow-sm)',
        borderColor: isHovered ? 'rgba(0, 102, 255, 0.4)' : 'var(--color-border)',
        transition: 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.18s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.18s ease',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onNavigate}
    >
      <div>
        {/* Top Icon & Badge Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              backgroundColor: 'var(--color-brand-primary-light)',
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-brand-primary)',
              border: '1px solid rgba(0, 102, 255, 0.15)',
            }}
          >
            {icon}
          </div>

          {badgeText && (
            <span
              style={{
                fontSize: '11px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '4px 8px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-surface-subtle)',
                color: 'var(--color-text-secondary)',
              }}
            >
              {badgeText}
            </span>
          )}
        </div>

        {/* Content */}
        <h3
          style={{
            fontSize: '20px',
            fontWeight: '700',
            color: 'var(--color-text-primary)',
            marginBottom: '10px',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h3>

        <p
          style={{
            fontSize: '14px',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {description}
        </p>
      </div>

      {/* Action Footer */}
      <div style={{ marginTop: '28px' }}>
        <Button
          variant={isHovered ? 'primary' : 'outline'}
          size="md"
          fullWidth
          onClick={(e) => {
            e.stopPropagation();
            onNavigate();
          }}
          icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          }
        >
          {ctaText}
        </Button>
      </div>
    </Card>
  );
}
