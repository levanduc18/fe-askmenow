'use client';

import {
  Bell,
  LogOut,
  Menu,
  PaintBucket,
  Plus,
  Settings,
  User,
} from 'lucide-react';
import ThemeToggle from '@/components/common/ThemeToggle';
import SearchBar from '@/components/common/SearchBar';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { logout } from '@/features/auth/services/auth.service';
import { useAppStore } from '@/stores/app.store';
import { useAuthStore } from '@/stores/auth.store';

type SideBarProps = {
  isSideBarOpen: boolean;
  onSidebarToggle: () => void;
};
function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export default function Header({
  isSideBarOpen,
  onSidebarToggle,
}: SideBarProps) {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const reset = useAuthStore((state) => state.reset);

  const showLoading = useAppStore((state) => state.showLoading);
  const hideLoading = useAppStore((state) => state.hideLoading);

  const handleLogout = async () => {
    try {
      showLoading();
      await delay(2000);
      await logout();
      reset();
      router.push('/login');
    } finally {
      hideLoading();
    }
  };

  return (
    <header
      className={clsx(
        'fixed top-0 h-16 inset-x-0 z-50 p-4 flex items-center justify-between bg-background border-b',
        isSideBarOpen ? 'pl-68' : 'pl-22',
      )}
    >
      <div className="flex items-center gap-4">
        <Button
          onClick={onSidebarToggle}
          variant={'ghost'}
          className="w-10 h-10 shadow-none border-1"
        >
          <Menu />
        </Button>
        <SearchBar />
      </div>
      <div className="flex items-center gap-4 text-foreground">
        <Button>
          <Plus />
          Add Question
        </Button>
        <div className="relative p-2 rounded-sm cursor-pointer hover:bg-accent">
          <Bell size={20} />
          <span className="absolute top-0 right-0 flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full">
            3
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer w-9 h-9">
              <AvatarImage
                className="rounded-full"
                src="https://github.com/shadcn.png"
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 text-muted-foreground"
            align="end"
          >
            <DropdownMenuLabel className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage
                  className="rounded-full"
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-gray-600 dark:text-gray-300 text-[16px]">
                  {user?.fullName}
                </span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-[13px]">Online</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => router.push('/profile')}
              className="cursor-pointer hover:bg-accent hover:text-primary"
            >
              <User className="w-4 h-4 mr-2 hover:text-primary" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => alert('Settings')}
              className="cursor-pointer hover:bg-accent hover:text-primary"
            >
              <Settings className="w-4 h-4 mr-2 hover:text-primary" />
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                  <PaintBucket />
                  Theme
                </div>
                <ThemeToggle />
              </div>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-500 cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut className="w-4 h-4 mr-2 text-red-500" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
