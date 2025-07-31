'use client';

import { useEffect } from 'react';
import { getProfile } from '@/features/users/services/user.service';
import { useAuthStore } from '@/stores/auth.store';
import { useAppStore } from '@/stores/app.store';

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const accessToken = useAuthStore((s) => s.accessToken);
  const setUser = useAuthStore((s) => s.setUser);

  const showLoading = useAppStore((state) => state.showLoading);
  const hideLoading = useAppStore((state) => state.hideLoading);

  useEffect(() => {
    console.log(accessToken);
    if (!accessToken) return;

    const fetchUser = async () => {
      try {
        showLoading();
        const user = await getProfile();
        setUser(user);
      } finally {
        hideLoading();
      }
    };
    fetchUser();
  }, [accessToken]);

  return <>{children}</>;
}
