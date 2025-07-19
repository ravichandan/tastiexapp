// src/features/auth/hooks/useLogin.ts
import { useState } from 'react';
import { loginUser, LoginPayload } from '../api/authApi';
import { useAuthStore } from '@/state';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const login = useAuthStore((s) => s.login);

  const handleLogin = async (payload: LoginPayload) => {
    console.log('in handleLoging');;
    setLoading(true);
    setError(null);
    try {
      const { user, token } = await loginUser(payload);
      login(user, token);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { login: handleLogin, loading, error };
}
