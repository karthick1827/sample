import React from 'react'
import { FleetLogo } from '../common/Icons'

export function LandingHero() {
  return (
    <div className="fleet-landing-hero-row">
      {/* Left Large Brand Logo matching Figma node #4003:14139 */}
      <div className="fleet-landing-logo-box">
        <FleetLogo height={56} variant="dark" isLarge={true} />
      </div>

      {/* Right Welcome Block matching Figma node #227:3923 */}
      <div className="fleet-landing-welcome-box">
        <p className="fleet-landing-welcome-pre">
          Welcome to
        </p>
        <h1 className="fleet-landing-welcome-title">
          <strong>Fleet</strong> 360
        </h1>
        <p className="fleet-landing-welcome-desc">
          Complete visibility into your data, total control over your insights. Empowering secure, real-time analytics with precision and speed.
        </p>
      </div>
    </div>
  )
}
