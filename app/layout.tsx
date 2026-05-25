import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import '@/app/globals.css';
import { cn } from '@/lib/utils';
import { siteSeo } from '@/lib/public-content';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk'
});

export const metadata: Metadata = {
  title: siteSeo.title,
  description: siteSeo.description,
  icons: {
    icon: '/midr-logo.jpg'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(inter.variable, spaceGrotesk.variable, 'bg-background font-body')}>
        {children}
      </body>
    </html>
  );
}
