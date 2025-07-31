'use client';

import clsx from 'clsx';
import { Award, Home, Tag, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from '@/components/common/AppLogo';

type SideBarProps = {
  isOpen: boolean;
};

export default function SideBar({ isOpen }: SideBarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'Home',
      href: '/',
      icon: <Home size={18} />,
    },
    { label: 'Trending', href: '/trending', icon: <TrendingUp size={18} /> },
    { label: 'Tags', href: '/tags', icon: <Tag size={18} /> },
    { label: 'Users', href: '/users', icon: <Users size={18} /> },
    { label: 'Achievements', href: '/achievements', icon: <Award size={18} /> },
  ];

  return (
    <aside
      className={clsx(
        'fixed left-0 top-0 z-99 transition-width duration-500 bg-background h-full border-r flex flex-col items-center py-3',
        isOpen ? 'w-64' : 'w-18',
      )}
    >
      <div
        className={clsx(
          'flex items-center p-4 w-full',
          !isOpen && 'justify-center',
        )}
      >
        <AppLogo />
        {isOpen && (
          <span className={clsx('font-bold text-xl ml-3 text-primary')}>
            AskMeKnow
          </span>
        )}
      </div>
      <nav className={clsx('px-2 mt-6 space-y-2 w-full')}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                'flex items-center px-4 py-3 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition',
                isActive
                  ? 'bg-indigo-50 dark:bg-gray-700 text-primary font-semibold'
                  : 'text-muted-foreground',
                !isOpen && 'justify-center',
              )}
            >
              <span>{item.icon}</span>
              {isOpen && <span className="ml-3">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
