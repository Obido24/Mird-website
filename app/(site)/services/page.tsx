import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionHeading } from '@/components/site/section-heading';
import { publicServices } from '@/lib/public-content';
import { getIcon } from '@/lib/icon-map';

export default function ServicesPage() {
  return (
    <main className="container-grid page-fade py-16 lg:py-24">
      <SectionHeading
        eyebrow="Services"
        title="Our Services"
        description="We provide technology and creative services that help businesses, schools, and organizations operate better, reach more people, and grow with confidence."
      />
      <div className="mt-12 grid gap-6">
        {publicServices.map((service) => {
          const Icon = getIcon(service.icon);
          return (
            <Card key={service.slug} id={service.slug} className="overflow-hidden">
              <CardHeader className="items-start">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface/80 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription className="mt-2">{service.description}</CardDescription>
                  </div>
                </div>
                <Button asChild variant="secondary">
                  <Link href="/contact">
                    {service.ctaLabel} <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {service.features.map((feature) => (
                    <div key={feature} className="rounded-2xl border border-line/40 bg-surface/70 p-4 text-sm text-muted">
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
