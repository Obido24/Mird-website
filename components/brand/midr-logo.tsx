"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type ThemeMode = 'dark' | 'light';

function getTheme(): ThemeMode {
  if (typeof document === 'undefined') {
    return 'dark';
  }

  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export function MidrLogo({
  className,
  priority = false
}: {
  className?: string;
  priority?: boolean;
}) {
  const [theme, setTheme] = useState<ThemeMode>('dark');

  useEffect(() => {
    const syncTheme = () => setTheme(getTheme());

    syncTheme();
    window.addEventListener('midr-theme-change', syncTheme as EventListener);
    window.addEventListener('storage', syncTheme);

    return () => {
      window.removeEventListener('midr-theme-change', syncTheme as EventListener);
      window.removeEventListener('storage', syncTheme);
    };
  }, []);

  const src = theme === 'light' ? '/midr-logo-light.png' : '/midr-logo-tight.png';

  return (
    <Image
      src={src}
      alt="MIDR Technologies Ltd"
      width={3044}
      height={1336}
      priority={priority}
      className={cn('h-auto w-auto object-contain transition-opacity duration-200', className)}
      key={src}
    />
  );
}
