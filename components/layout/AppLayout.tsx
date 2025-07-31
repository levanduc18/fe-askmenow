'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/SideBar';
import Header from '@/components/layout/Header';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import FullScreenLoader from '../common/FullScreenLoader';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const pathname = usePathname();

  const noLayoutRoutes = ['/login'];

  const isLayoutVisible = !noLayoutRoutes.includes(pathname);

  if (!isLayoutVisible) {
    return <main className="min-h-screen bg-background">{children}</main>;
  }

  return (
    <>
      <Sidebar isOpen={sidebarOpen} />
      <Header
        isSideBarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className={clsx(sidebarOpen ? 'pl-64' : 'pl-18')}>
        <main className="min-h-screen p-4 pt-20 bg-background">{children}</main>
      </div>
      <FullScreenLoader />
    </>
  );
}
