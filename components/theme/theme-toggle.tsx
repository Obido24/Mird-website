"use client";

import { useEffect, useState } from 'react';
import { MoonStar, SunMedium } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ThemeMode = 'dark' | 'light';

function getCurrentTheme(): ThemeMode {
  if (typeof document === 'undefined') {
    return 'dark';
  }

  return document.documentElement.classList.contains('theme-light') ? 'light' : 'dark';
}

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;
  root.classList.toggle('theme-dark', theme === 'dark');
  root.classList.toggle('theme-light', theme === 'light');
  root.setAttribute('data-theme', theme);
  root.style.colorScheme = theme;
  localStorage.setItem('midr-theme', theme);
  window.dispatchEvent(new CustomEvent('midr-theme-change', { detail: theme }));
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<ThemeMode>('dark');

  useEffect(() => {
    setTheme(getCurrentTheme());
  }, []);

  function handleToggle() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    setTheme(nextTheme);
  }

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      onClick={handleToggle}
      className={cn('whitespace-nowrap', className)}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
      <span className="hidden sm:inline">{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
    </Button>
  );
}
