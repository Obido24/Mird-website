import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getIcon } from '@/lib/icon-map';
import { cn } from '@/lib/utils';
import type { PublicService } from '@/lib/types';

export function ServiceCard({
  service,
  compact = false
}: {
  service: PublicService;
  compact?: boolean;
}) {
  const Icon = getIcon(service.icon);

  return (
    <Card className={cn('group relative overflow-hidden', compact && 'p-5')}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/5 opacity-0 transition group-hover:opacity-100" />
      <CardHeader className="relative mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface/80 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <Badge variant="neutral">{service.slug.replace(/-/g, ' ')}</Badge>
        </div>
      </CardHeader>
      <CardContent className="relative">
        <CardTitle>{service.title}</CardTitle>
        <CardDescription className="mt-3">{service.description}</CardDescription>
        <ul className="mt-5 grid gap-2 text-sm text-muted">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {feature}
            </li>
          ))}
        </ul>
        <Button asChild variant="secondary" size="sm" className="mt-6">
          <Link href={`/services#${service.slug}`}>
            {service.ctaLabel} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
