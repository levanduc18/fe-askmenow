import { User } from '@/types/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  user: User | null;
  hasHydrated: boolean;
}

interface AuthAction {
  setAccessToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  setHasHydrated: (hydrated: boolean) => void;
  reset: () => void;
}

type AuthStore = AuthState & AuthAction;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      hasHydrated: false,
      setAccessToken: (token) => set({ accessToken: token }),
      setUser: (user) => set({ user }),
      setHasHydrated: (hydrated) => set({ hasHydrated: hydrated }),
      reset: () => set({ accessToken: null, user: null, hasHydrated: false }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ accessToken: state.accessToken }),
      onRehydrateStorage: () => (state, error) => {
        if (!error) {
          state?.setHasHydrated(true);
        }
      },
    },
  ),
);
