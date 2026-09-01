import React, { useState } from 'react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { SSOButton } from './SSOButton';
import { ForgotPasswordDialog } from './ForgotPasswordDialog';

export function LoginForm({ onLogin, onSSOLogin, isLoading = false }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [formAlert, setFormAlert] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isForgotOpen, setIsForgotOpen] = useState(false);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid work email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormAlert('');

    if (failedAttempts >= 5) {
      setFormAlert('Account access temporarily locked due to repeated failed attempts. Please wait 30 seconds or reset your password.');
      return;
    }

    if (!validate()) return;

    try {
      await onLogin({ email, password, rememberMe });
    } catch {
      setFailedAttempts((prev) => prev + 1);
      setFormAlert('Invalid email or password. Please verify your credentials.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header Branding */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: 'var(--color-brand-primary)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <span style={{ fontSize: '18px', fontWeight: '700', color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
            Fleet 360
          </span>
        </div>

        <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--color-text-primary)', marginBottom: '6px' }}>
          Sign in to your account
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', margin: 0 }}>
          Enter your operator credentials to access real-time facility telemetry.
        </p>
      </div>

      {/* Global Form Alert */}
      {formAlert && (
        <div
          role="alert"
          style={{
            padding: '12px 16px',
            backgroundColor: '#FEF2F2',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--color-status-danger)',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            lineHeight: 1.4,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{formAlert}</span>
        </div>
      )}

      {/* Single Sign-On */}
      <div>
        <SSOButton onSSOLogin={onSSOLogin} isLoading={isLoading} />
      </div>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
        <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Or sign in with email
        </span>
        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border)' }} />
      </div>

      {/* Credential Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }} noValidate>
        <Input
          label="Work Email"
          type="email"
          placeholder="operator@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
          }}
          error={errors.email}
          required
          autoComplete="email"
          startIcon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          }
        />

        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
          }}
          error={errors.password}
          required
          autoComplete="current-password"
          startIcon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          }
          endIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="focus-ring"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-muted)',
                padding: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          }
        />

        {/* Remember Me & Forgot Password */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', userSelect: 'none' }}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="focus-ring"
              style={{
                width: '16px',
                height: '16px',
                accentColor: 'var(--color-brand-primary)',
                borderRadius: 'var(--radius-xs)',
              }}
            />
            <span style={{ color: 'var(--color-text-secondary)' }}>Remember me</span>
          </label>

          <button
            type="button"
            onClick={() => setIsForgotOpen(true)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-brand-primary)',
              fontWeight: '500',
              cursor: 'pointer',
              padding: 0,
            }}
            className="focus-ring"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <Button type="submit" variant="primary" size="md" fullWidth isLoading={isLoading} style={{ marginTop: '4px' }}>
          Sign In
        </Button>
      </form>

      {/* Footer Branding & Legal */}
      <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
        <p style={{ margin: '0 0 4px 0' }}>
          Protected by enterprise multi-factor security.
        </p>
        <p style={{ margin: 0 }}>
          <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a>
          {' • '}
          <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
          {' • '}
          <span style={{ fontWeight: '500', color: 'var(--color-text-secondary)' }}>Powered by ACE Digital</span>
        </p>
      </div>

      {/* Password Reset Modal */}
      <ForgotPasswordDialog isOpen={isForgotOpen} onClose={() => setIsForgotOpen(false)} />
    </div>
  );
}
