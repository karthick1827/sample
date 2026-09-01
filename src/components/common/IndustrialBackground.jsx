import React from 'react'

/**
 * Industrial HVAC / Commercial Rooftop Units Artwork
 * Replicates the commercial HVAC background from Figma nodes #1252:14409 & #1228:11457
 */
export function IndustrialBackground() {
  return (
    <div className="fleet-login-bg-layer" aria-hidden="true">
      {/* High-Fidelity SVG Industrial HVAC Silhouette with Blue Atmospheric Lighting */}
      <svg
        className="fleet-hvac-svg"
        viewBox="0 0 1366 768"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Exact multi-stop Figma gradient #1252:14413 */}
          <linearGradient id="figmaGradient14413" x1="1366" y1="384" x2="0" y2="384" gradientUnits="userSpaceOnUse">
            <stop offset="0.27" stopColor="#0D578B" stopOpacity="0.15" />
            <stop offset="0.47" stopColor="#0E427D" stopOpacity="0.85" />
            <stop offset="0.62" stopColor="#0D4278" stopOpacity="1" />
            <stop offset="0.74" stopColor="#003366" stopOpacity="1" />
          </linearGradient>

          <radialGradient id="hvacGlow" cx="70%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#0A93D3" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#002850" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#001C38" stopOpacity="1" />
          </radialGradient>

          <pattern id="industrialGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Deep Industrial Sky & Facility Base */}
        <rect width="1366" height="768" fill="url(#hvacGlow)" />
        <rect width="1366" height="768" fill="url(#industrialGrid)" />

        {/* Architectural Rooftop Structure / Commercial RTU Outline */}
        <g opacity="0.45" transform="translate(480, 120)">
          {/* Large Commercial Rooftop Unit 1 */}
          <rect x="180" y="240" width="340" height="260" rx="8" fill="#0A2A4A" stroke="#0A93D3" strokeWidth="1.5" />
          {/* Louvers / Condenser Fan Grills */}
          <circle cx="270" cy="330" r="55" fill="#051D33" stroke="#2CD9C5" strokeWidth="2" strokeDasharray="6 6" />
          <circle cx="270" cy="330" r="30" fill="#0A3358" />
          <circle cx="430" cy="330" r="55" fill="#051D33" stroke="#2CD9C5" strokeWidth="2" strokeDasharray="6 6" />
          <circle cx="430" cy="330" r="30" fill="#0A3358" />
          
          {/* Service Panels & Ductwork */}
          <rect x="200" y="420" width="300" height="60" rx="4" fill="#051829" stroke="rgba(255,255,255,0.15)" />
          <line x1="260" y1="420" x2="260" y2="480" stroke="rgba(255,255,255,0.2)" />
          <line x1="340" y1="420" x2="340" y2="480" stroke="rgba(255,255,255,0.2)" />
          <line x1="420" y1="420" x2="420" y2="480" stroke="rgba(255,255,255,0.2)" />

          {/* Secondary Unit & Piping */}
          <rect x="560" y="280" width="260" height="220" rx="6" fill="#062038" stroke="#0D578B" strokeWidth="1.5" />
          <circle cx="690" cy="360" r="45" fill="#031322" stroke="#0A93D3" strokeWidth="1.5" />
          <path d="M 520 380 L 560 380" stroke="#0A93D3" strokeWidth="8" strokeLinecap="round" />
          <path d="M 520 440 L 560 440" stroke="#E50026" strokeWidth="6" strokeLinecap="round" />

          {/* Industrial Parapet / Roofline */}
          <path d="M 50 500 L 880 500 L 880 560 L 50 560 Z" fill="#020E1A" />
          <line x1="0" y1="500" x2="900" y2="500" stroke="#0A93D3" strokeWidth="2" />
        </g>

        {/* Ambient Flare / Glow */}
        <circle cx="1020" cy="260" r="180" fill="#0A93D3" fillOpacity="0.12" filter="blur(40px)" />
        <circle cx="650" cy="400" r="140" fill="#E50026" fillOpacity="0.08" filter="blur(50px)" />

        {/* Linear Gradient Overlay from Figma */}
        <rect width="1366" height="768" fill="url(#figmaGradient14413)" />
      </svg>
    </div>
  )
}
