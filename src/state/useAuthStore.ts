// src/state/useAuthStore.ts
import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token';

type User = {
  id: string;
  name: string;
  email?: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isHydrated: boolean;
  login: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  rehydrate: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  subscribeWithSelector(
    devtools((set) => ({
      user: null,
      token: null,
      isHydrated: false,

      login: async (user, token) => {
        await SecureStore.setItemAsync(TOKEN_KEY, token);
        set({ user, token });
      },

      logout: async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        set({ user: null, token: null });
      },

      rehydrate: async () => {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        if (token) {
          // You may optionally fetch user profile here using the token
          set({ token, isHydrated: true });
        } else {
          set({ token: null, user: null, isHydrated: true });
        }
      },
    })),
  ),
);

// src/state/useAuthStore.ts (below the store)

useAuthStore.subscribe(
  (state) => state.user,
  (user: any) => {
    console.log('[Auth] User changed:', user);
  },
);

useAuthStore.subscribe(
  (state) => state,
  (state: any) => {
    console.log('[Auth] state changed:', state);
  },
);
