'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

interface AuthUser {
  email: string;
  role: string;
}

interface UseAuthResult {
  user: AuthUser | null;
  loading: boolean;
  isAdmin: boolean;
  refreshUser: () => Promise<void>;
  signOut: () => Promise<boolean>;
}

export function useAuth(): UseAuthResult {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/me', { cache: 'no-store' });
      const data = await response.json();
      setUser(data?.user ?? null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (!response.ok) {
        return false;
      }
      setUser(null);
      return true;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const isAdmin = useMemo(() => user?.role?.toLowerCase() === 'admin', [user?.role]);

  return {
    user,
    loading,
    isAdmin,
    refreshUser,
    signOut,
  };
}
