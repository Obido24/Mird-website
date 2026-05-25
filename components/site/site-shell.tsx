"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { MidrLogo } from '@/components/brand/midr-logo';
import { brandStory, siteNav } from '@/lib/public-content';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme/theme-toggle';

export function SiteShell({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={cn('min-h-screen bg-background text-foreground', className)}>
      <header className="sticky top-0 z-40 border-b border-line/40 bg-background/80 shell-blur">
        <div className="container-grid flex items-center justify-between py-4">
          <Link href="/" className="flex items-center">
            <MidrLogo className="h-8 w-auto max-w-[116px] sm:h-9 sm:max-w-[132px]" priority />
          </Link>
          <nav className="hidden items-center gap-6 lg:flex">
            {siteNav.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-muted transition hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 sm:flex">
            <ThemeToggle />
            <Button asChild size="sm">
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="sm:hidden" onClick={() => setMenuOpen(true)}>
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </header>
      {menuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button className="absolute inset-0 bg-black/65" onClick={() => setMenuOpen(false)} aria-label="Close menu" />
          <div className="absolute right-0 top-0 h-full w-[84vw] max-w-sm border-l border-line/40 bg-surface/95 p-5 shell-blur">
            <div className="flex items-center justify-between">
              <div>
                <MidrLogo className="h-8 w-auto max-w-[116px]" />
              </div>
              <Button variant="ghost" size="sm" onClick={() => setMenuOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4">
              <ThemeToggle className="w-full" />
            </div>
            <nav className="mt-6 grid gap-2">
              {siteNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl border border-line/40 bg-surface/70 px-4 py-3 text-sm text-foreground transition hover:bg-surface"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 grid gap-3">
              <Button asChild>
                <Link href="/contact" onClick={() => setMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
      {children}
      <footer className="border-t border-line/40 bg-surface/80 shell-blur">
        <div className="container-grid grid gap-10 py-14 md:grid-cols-2 xl:grid-cols-4">
          <div className="space-y-4">
            <MidrLogo className="h-8 w-auto max-w-[120px]" />
            <p className="max-w-sm text-sm leading-7 text-muted">{brandStory.footerBlurb}</p>
          </div>
          <div>
            <h3 className="eyebrow mb-4">Explore</h3>
            <div className="grid gap-3 text-sm text-muted">
              {siteNav.map((item) => (
                <Link key={item.href} href={item.href} className="transition hover:text-foreground">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="eyebrow mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-muted">
              <p>hello@midr.ng</p>
              <p>+234 816 000 1122</p>
              <p>Lagos, Nigeria</p>
            </div>
          </div>
          <div className="soft-card rounded-3xl p-5">
            <h3 className="headline text-xl font-semibold">Ready to build something powerful?</h3>
            <p className="mt-3 text-sm leading-7 text-muted">Let&apos;s turn your idea into a digital solution.</p>
            <Button asChild className="mt-5 w-full">
              <Link href="/contact">Start a Project</Link>
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
