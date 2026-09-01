import React from 'react'

/**
 * Fleet 360 Official Brand Logo SVG Lockup matching Figma Node #4003:14129 & #4003:14139
 */
export function FleetLogo({ height = 40, variant = 'light', isLarge = false }) {
  const isDark = variant === 'dark'
  const primaryText = isDark ? '#264072' : '#FFFFFF'
  const accentText = isDark ? '#0A93D3' : '#FFFFFF'
  const subtextColor = isDark ? '#515D6D' : 'rgba(255, 255, 255, 0.85)'

  if (isLarge) {
    // Large 314.9x56 Landing Hero Logo
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', userSelect: 'none' }}>
        <svg width="60" height="56" viewBox="0 0 60 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="60" height="56" rx="12" fill={isDark ? '#F0FAFF' : 'rgba(255, 255, 255, 0.12)'} />
          {/* Compass / 360 Orbit Arc */}
          <circle cx="30" cy="28" r="20" stroke="#0A93D3" strokeWidth="3" strokeDasharray="95 30" strokeLinecap="round" />
          <circle cx="30" cy="28" r="14" stroke="#E50026" strokeWidth="2.5" />
          <path d="M22 28L28 34L38 22" stroke={isDark ? '#264072' : '#FFFFFF'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="30" cy="28" r="4" fill="#E50026" />
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{
            fontFamily: "'Roboto', sans-serif",
            fontSize: '36px',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            color: primaryText
          }}>
            FLEET <span style={{ fontWeight: 400, color: '#0A93D3' }}>360</span>
          </div>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.14em',
            color: subtextColor,
            marginTop: '4px',
            textTransform: 'uppercase'
          }}>
            Intelligent Facility IoT
          </span>
        </div>
      </div>
    )
  }

  // Standard Header / Login Logo (202.44x36)
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', userSelect: 'none' }}>
      <svg width={height} height={height} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" fill={isDark ? '#F0F7FF' : 'rgba(255, 255, 255, 0.15)'} stroke="#0A93D3" strokeWidth="2" strokeDasharray="75 25" />
        <circle cx="20" cy="20" r="12" stroke="#E50026" strokeWidth="2" />
        <path d="M14 20L18 24L26 16" stroke={isDark ? '#264072' : '#FFFFFF'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div style={{
        fontFamily: "'Roboto', sans-serif",
        fontSize: `${height * 0.62}px`,
        fontWeight: 800,
        lineHeight: 1,
        letterSpacing: '-0.02em',
        color: primaryText
      }}>
        Fleet <span style={{ fontWeight: 400, color: accentText }}>360</span>
      </div>
    </div>
  )
}

/**
 * ACL Digital Brand Logo matching Figma Node #4045:14223
 */
export function ACLDigitalLogo({ width = 125, height = 36 }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
      <svg width={width} height={height} viewBox="0 0 140 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* ACL Geometric Mark */}
        <polygon points="6,28 16,6 26,28 20,28 16,18 12,28" fill="#E50026" />
        <polygon points="16,14 19,20 13,20" fill="#FFFFFF" />
        <rect x="28" y="6" width="5" height="22" fill="#FFFFFF" />
        <polygon points="38,6 38,28 50,28 50,23 43,23 43,6" fill="#FFFFFF" />
        {/* Digital Text */}
        <text x="56" y="24" fontFamily="Roboto, sans-serif" fontSize="15" fontWeight="700" fill="#FFFFFF" letterSpacing="0.08em">
          DIGITAL
        </text>
      </svg>
    </div>
  )
}

/**
 * Figma Exact Linear Map Point / Device Icon #227:3932
 */
export function DeviceMapPointIcon({ size = 32, color = '#FFFFFF' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="6" width="24" height="16" rx="3" stroke={color} strokeWidth="2.2" />
      <path d="M12 26H20" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M16 22V26" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="16" cy="14" r="3.5" stroke={color} strokeWidth="2" />
      <path d="M8 10H10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/**
 * Figma Exact Linear Site Icon #227:3946
 */
export function SiteLocationIcon({ size = 32, color = '#FFFFFF' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 3C10.477 3 6 7.477 6 13C6 20.5 16 29 16 29C16 29 26 20.5 26 13C26 7.477 21.523 3 16 3Z" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16" cy="13" r="4" stroke={color} strokeWidth="2.2" />
    </svg>
  )
}

/**
 * Figma Exact Linear Users Icon #227:3962
 */
export function UserTeamIcon({ size = 32, color = '#FFFFFF' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="10" r="5" stroke={color} strokeWidth="2.2" />
      <path d="M6 26C6 21.5817 10.4772 18 16 18C21.5228 18 26 21.5817 26 26" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M23 8C24.6569 8 26 9.34315 26 11C26 12.6569 24.6569 14 23 14" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M28 24C28.6 23 29 21.5 29 20C29 18 27.5 16.5 25.5 16" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function ArrowRightLineIcon({ size = 18, color = '#FFFFFF' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const DeviceIcon = DeviceMapPointIcon;
export const SiteIcon = SiteLocationIcon;
export const UserIcon = UserTeamIcon;


export function MailIcon({ size = 18, color = '#1E2A2C' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  )
}

export function LockIcon({ size = 18, color = '#1E2A2C' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  )
}

export function BellIcon({ size = 20, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  )
}

export function LogoutIcon({ size = 18, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
      <polyline points="16 17 21 12 16 7"></polyline>
      <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
  )
}
