'use client';

import { Loader2 } from 'lucide-react';
import { useAppStore } from '@/stores/app.store';

export default function FullScreenLoader() {
  const isLoading = useAppStore((s) => s.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-99 bg-black/30 backdrop-blur-sm">
      <Loader2 className="w-10 h-10 text-white animate-spin" />
      <span className="ml-4 text-xl text-white">Loading, please wait...</span>
    </div>
  );
}
