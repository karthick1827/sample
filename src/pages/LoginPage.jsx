import React from 'react';
import { SplitLayout } from '../components/layout/SplitLayout';
import { LoginForm } from '../features/auth/LoginForm';
import { useAuth } from '../context/AuthContext';

export function LoginPage({ onLoginSuccess }) {
  const { login, loginWithSSO, isLoading } = useAuth();

  const handleLogin = async (credentials) => {
    const result = await login(credentials);
    if (result?.success && onLoginSuccess) {
      onLoginSuccess();
    }
  };

  const handleSSO = async () => {
    const result = await loginWithSSO();
    if (result?.success && onLoginSuccess) {
      onLoginSuccess();
    }
  };

  return (
    <SplitLayout>
      <LoginForm onLogin={handleLogin} onSSOLogin={handleSSO} isLoading={isLoading} />
    </SplitLayout>
  );
}
