'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth.store';

export function WithGuest({ children }: { children: React.ReactNode }) {
  const accessToken = useAuthStore((s) => s.accessToken);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  const router = useRouter();

  useEffect(() => {
    if (!hasHydrated) return;
    if (accessToken) router.replace('/');
  }, [accessToken, hasHydrated, router]);

  if (!hasHydrated) return null;
  if (accessToken) return null;

  return <>{children}</>;
}
