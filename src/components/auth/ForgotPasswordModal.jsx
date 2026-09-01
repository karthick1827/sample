import React, { useState } from 'react'
import { Button } from '../common/Button'
import { Input } from '../common/Input'
import { MailIcon } from '../common/Icons'

export function ForgotPasswordModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setError('Please enter a valid work email address.')
      return
    }
    setError('')
    setIsLoading(true)

    // Simulate self-service recovery dispatch
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 800)
  }

  const handleReset = () => {
    setIsSubmitted(false)
    setEmail('')
    setError('')
    onClose()
  }

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 20, 40, 0.65)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
      onClick={handleReset}
    >
      <div 
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          width: '100%',
          maxWidth: '440px',
          padding: '32px',
          position: 'relative',
          boxSizing: 'border-box',
          animation: 'fadeInScale 0.2s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 600, color: 'var(--fleet-navy-medium)' }}>
            {isSubmitted ? 'Recovery Email Dispatched' : 'Reset Your Password'}
          </h3>
          <button 
            type="button" 
            onClick={handleReset}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '22px',
              color: 'var(--fleet-text-muted)',
              cursor: 'pointer',
              lineHeight: 1
            }}
          >
            &times;
          </button>
        </div>

        {isSubmitted ? (
          <div>
            <div style={{
              padding: '16px',
              backgroundColor: 'var(--fleet-success-bg)',
              color: 'var(--fleet-success)',
              borderRadius: 'var(--radius-md)',
              fontSize: '14px',
              lineHeight: '1.5',
              marginBottom: '24px'
            }}>
              A password reset verification link has been sent to <strong>{email}</strong>. Follow the instructions in the email to restore your credentials.
            </div>
            <Button variant="primary" fullWidth onClick={handleReset}>
              Back to Sign In
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: 'var(--fleet-text-muted)', lineHeight: '1.5' }}>
              Enter your registered enterprise email address below. We will send you a secure link to reset your account password.
            </p>
            <div style={{ marginBottom: '20px' }}>
              <Input
                label="Registered Work Email"
                placeholder="name@company.com"
                type="email"
                name="recovery-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error}
                icon={<MailIcon size={16} />}
                required
                style={{ color: 'var(--fleet-text-main)' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <Button variant="outline" onClick={handleReset}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" isLoading={isLoading}>
                Send Reset Link
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
