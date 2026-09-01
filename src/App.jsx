import React, { useState } from 'react'
import { LoginForm } from './components/auth/LoginForm'
import { IndustrialBackground } from './components/common/IndustrialBackground'
import { LandingHero } from './components/landing/LandingHero'
import { NavigationCards } from './components/landing/NavigationCards'
import { ModulePreviewModal } from './components/landing/ModulePreviewModal'
import { LogoutIcon } from './components/common/Icons'
import './styles/design-tokens.css'
import './styles/auth.css'
import './styles/landing.css'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [activeModule, setActiveModule] = useState(null)

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setActiveModule(null)
  }

  return (
    <div className="fleet-app-root">
      {!currentUser ? (
        /* 1. Login View matching Figma Node #1228:11322 (1366x768) */
        <div className="fleet-login-container">
          <IndustrialBackground />

          <main className="fleet-login-content">
            {/* Left Login Card (x: 135, y: 125, w: 327) */}
            <LoginForm onLoginSuccess={handleLoginSuccess} />

            {/* Right Hero Statement matching node #1228:11327 */}
            <div className="fleet-login-hero-right">
              <h1 className="fleet-login-rheem-headline">
                For 100 years, <br />
                Rheem has been a leader in product innovation.
              </h1>
              <p className="fleet-login-rheem-sub">
                Enterprise cloud telemetry & IoT intelligent facility operations
              </p>
            </div>
          </main>
        </div>
      ) : (
        /* 2. Landing Hub View matching Figma Node #227:3884 (1366x768) */
        <div className="fleet-landing-wrapper">
          {/* Top minimal status bar */}
          <div className="fleet-landing-topbar">
            <div className="fleet-topbar-user">
              <div className="fleet-topbar-avatar">
                {currentUser?.name ? currentUser.name[0] : 'U'}
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#1E2A2C' }}>
                {currentUser?.name || 'Enterprise Operator'}
              </span>
            </div>
            <button
              type="button"
              className="fleet-topbar-logout"
              onClick={handleLogout}
            >
              <LogoutIcon size={14} />
              <span>Sign Out</span>
            </button>
          </div>

          <div className="fleet-landing-canvas">
            {/* Top Section (496px) matching Figma #227:3885 */}
            <div className="fleet-landing-top-section">
              <LandingHero />
            </div>

            {/* Bottom Dark Banner (272px) matching Figma #227:3928 */}
            <NavigationCards onNavigate={(moduleId) => setActiveModule(moduleId)} />
          </div>

          {/* Module interactive modal */}
          <ModulePreviewModal
            activeModule={activeModule}
            onClose={() => setActiveModule(null)}
          />
        </div>
      )}
    </div>
  )
}

export default App
