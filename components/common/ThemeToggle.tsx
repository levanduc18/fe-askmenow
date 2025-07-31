'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme == 'dark';
  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center p-1 transition-colors duration-300 rounded-full shadow-inner cursor-pointer w-13 h-7 bg-muted hover:ring-primary hover:ring-1"
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute flex items-center justify-center w-5 h-5 text-white rounded-full top-1 left-1 bg-primary"
        animate={{ x: isDark ? 24 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-white" />
        ) : (
          <Sun className="w-4 h-4 text-yellow-400" />
        )}
      </motion.div>
    </button>
  );
}
