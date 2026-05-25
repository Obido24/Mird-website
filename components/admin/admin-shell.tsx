"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { LogOut, Menu, Search, Sparkles } from 'lucide-react';
import { MidrLogo } from '@/components/brand/midr-logo';
import { adminNav } from '@/lib/admin-config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { auth } from '@/lib/firebase';

export function AdminShell({
  children,
  userName
}: {
  children: React.ReactNode;
  userName?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [navOpen, setNavOpen] = useState(false);

  async function handleLogout() {
    if (auth) {
      await signOut(auth);
    }
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="hidden border-r border-white/5 bg-surface/80 shell-blur lg:flex lg:flex-col">
          <div className="flex items-center gap-3 px-6 py-6">
            <MidrLogo className="h-8 w-auto max-w-[120px]" priority />
          </div>
          <nav className="flex-1 px-4">
            <div className="space-y-2">
              {adminNav.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition',
                      active ? 'bg-white/10 text-white' : 'text-muted hover:bg-white/5 hover:text-white'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
          <div className="px-4 pb-6">
            <div className="soft-card rounded-3xl p-4">
              <div className="flex items-center gap-2 text-primary">
                <Sparkles className="h-4 w-4" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em]">Admin</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted">
                {userName ? `Signed in as ${userName}` : 'Secure dashboard access for MIDR staff.'}
              </p>
            </div>
          </div>
        </aside>
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-white/5 bg-background/80 shell-blur">
            <div className="flex items-center justify-between gap-4 px-4 py-4 lg:px-8">
              <div className="flex items-center gap-3 lg:hidden">
                <Button variant="ghost" size="sm" onClick={() => setNavOpen(true)}>
                  <Menu className="h-4 w-4" />
                </Button>
                <MidrLogo className="h-8 w-auto max-w-[116px]" />
              </div>
              <div className="hidden flex-1 items-center gap-3 lg:flex">
                <div className="relative max-w-2xl flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <Input
                    aria-label="Search admin data"
                    placeholder="Search systems, projects, or telemetry..."
                    className="h-12 rounded-full pl-11"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button size="sm" onClick={() => router.push('/admin/projects')}>
                  New Project
                </Button>
                <Button variant="secondary" size="sm" onClick={() => router.push('/contact')}>
                  Public Site
                </Button>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </header>
          <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">{children}</main>
        </div>
      </div>
      {navOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-black/65" onClick={() => setNavOpen(false)} aria-label="Close navigation" />
          <div className="absolute left-0 top-0 h-full w-[82vw] max-w-sm border-r border-white/5 bg-surface/95 p-5 shell-blur">
            <div className="flex items-center justify-between">
              <div>
                <MidrLogo className="h-8 w-auto max-w-[116px]" />
              </div>
              <Button variant="ghost" size="sm" onClick={() => setNavOpen(false)}>
                Close
              </Button>
            </div>
            <nav className="mt-6 grid gap-2">
              {adminNav.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setNavOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition',
                      active ? 'bg-white/10 text-white' : 'text-muted hover:bg-white/5 hover:text-white'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  );
}
