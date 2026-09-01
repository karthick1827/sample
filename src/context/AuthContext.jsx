import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY_TOKEN = 'fleet360_auth_token';
const STORAGE_KEY_USER = 'fleet360_user';
const STORAGE_KEY_TENANT = 'fleet360_tenant';

const DEFAULT_TENANT = {
  id: 'tenant-ace-1',
  name: 'ACE Digital — Industrial Facilities',
  region: 'North America / East',
};

const DEMO_USER = {
  id: '1626104584344020795',
  name: 'N Karthick',
  email: 'karthick.natarajan@acldigital.com',
  role: 'Facility Operations Lead',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&auto=format&fit=crop&q=80',
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY_TOKEN) || sessionStorage.getItem(STORAGE_KEY_TOKEN) || null);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_USER) || sessionStorage.getItem(STORAGE_KEY_USER);
    return saved ? JSON.parse(saved) : null;
  });
  const [activeTenant, setActiveTenant] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_TENANT) || sessionStorage.getItem(STORAGE_KEY_TENANT);
    return saved ? JSON.parse(saved) : DEFAULT_TENANT;
  });
  const [isLoading, setIsLoading] = useState(false);

  const isAuthenticated = !!token;

  const login = async ({ email, password: _password, rememberMe = false }) => {
    setIsLoading(true);
    try {
      // Simulate authentication request
      await new Promise((resolve) => setTimeout(resolve, 600));

      const mockToken = `jwt_session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
      const authenticatedUser = {
        ...DEMO_USER,
        email: email || DEMO_USER.email,
      };

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem(STORAGE_KEY_TOKEN, mockToken);
      storage.setItem(STORAGE_KEY_USER, JSON.stringify(authenticatedUser));
      storage.setItem(STORAGE_KEY_TENANT, JSON.stringify(activeTenant));

      setToken(mockToken);
      setUser(authenticatedUser);
      return { success: true };
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithSSO = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const ssoToken = `jwt_sso_${Date.now()}`;
      localStorage.setItem(STORAGE_KEY_TOKEN, ssoToken);
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(DEMO_USER));
      localStorage.setItem(STORAGE_KEY_TENANT, JSON.stringify(activeTenant));

      setToken(ssoToken);
      setUser(DEMO_USER);
      return { success: true };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_USER);
    sessionStorage.removeItem(STORAGE_KEY_TOKEN);
    sessionStorage.removeItem(STORAGE_KEY_USER);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        activeTenant,
        setActiveTenant,
        isAuthenticated,
        isLoading,
        login,
        loginWithSSO,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
