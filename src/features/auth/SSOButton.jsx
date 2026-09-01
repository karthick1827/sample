import React from 'react';
import { Button } from '../../components/ui/Button';

export function SSOButton({ onSSOLogin, isLoading = false }) {
  return (
    <Button
      variant="secondary"
      size="md"
      fullWidth
      isLoading={isLoading}
      onClick={onSSOLogin}
      style={{
        border: '1px solid var(--color-border)',
        backgroundColor: '#FFFFFF',
        color: 'var(--color-text-primary)',
        fontWeight: '500',
      }}
      icon={
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="1" y="1" width="10" height="10" fill="#F25022" />
          <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
          <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
          <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
        </svg>
      }
    >
      Continue with Single Sign-On (SSO)
    </Button>
  );
}
