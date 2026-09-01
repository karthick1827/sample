import React, { useState } from 'react'
import { FleetLogo, ACLDigitalLogo } from '../common/Icons'
import { ForgotPasswordModal } from './ForgotPasswordModal'

export function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!email || !email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      if (onLoginSuccess) {
        onLoginSuccess({
          name: 'Sarah Jenkins',
          email: email || 'operator@fleet360.com',
          role: 'Facility Operations Director'
        })
      }
    }, 500)
  }

  return (
    <div className="fleet-login-card-wrapper">
      {/* Brand Header matching Figma node #1228:11377 */}
      <div className="fleet-login-brand-header">
        <FleetLogo height={36} variant="light" />
      </div>

      {/* Form Container matching Figma node #1228:11402 */}
      <form onSubmit={handleSubmit} className="fleet-login-form-box" noValidate>
        {/* Email Field matching node #1228:11403 */}
        <div className="fleet-form-field">
          <label className="fleet-form-label" htmlFor="login-email">
            Email
          </label>
          <div className="fleet-form-input-container">
            <input
              id="login-email"
              type="email"
              className="fleet-form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              autoComplete="email"
            />
          </div>
          {errors.email && (
            <span style={{ color: '#FF6B6B', fontSize: '12px', marginTop: '2px' }}>{errors.email}</span>
          )}
        </div>

        {/* Password Field matching node #1228:11414 */}
        <div className="fleet-form-field">
          <label className="fleet-form-label" htmlFor="login-password">
            Password
          </label>
          <div className="fleet-form-input-container">
            <input
              id="login-password"
              type="password"
              className="fleet-form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              autoComplete="current-password"
            />
          </div>
          {errors.password && (
            <span style={{ color: '#FF6B6B', fontSize: '12px', marginTop: '2px' }}>{errors.password}</span>
          )}

          {/* Forgot Password matching node #1228:11429 */}
          <button
            type="button"
            className="fleet-forgot-password-link"
            onClick={() => setIsForgotModalOpen(true)}
          >
            Forgot Password?
          </button>
        </div>

        {/* Primary Login Button matching node #1228:11431 */}
        <button
          type="submit"
          className="fleet-login-primary-btn"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        {/* Legal Text matching node #1228:11433 */}
        <div className="fleet-login-legal-text">
          By clicking login, you hereby agree to our <br />
          <a
            href="#terms"
            onClick={(e) => {
              e.preventDefault()
              alert('Terms and Conditions & Privacy Notice accepted.')
            }}
          >
            <strong>Terms and Conditions & Privacy Notice</strong>
          </a>
        </div>
      </form>

      {/* Powered by Attribution matching node #4045:14221 */}
      <div className="fleet-login-attribution">
        <span>Powered by</span>
        <ACLDigitalLogo width={125} height={32} />
      </div>

      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
      />
    </div>
  )
}
