import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { publicProjects } from '@/lib/public-content';

export function generateStaticParams() {
  return publicProjects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = publicProjects.find((entry) => entry.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="container-grid page-fade py-16 lg:py-24">
      <div className="mb-8">
        <Button asChild variant="secondary">
          <Link href="/portfolio">
            <ArrowLeft className="h-4 w-4" />
            Back to Portfolio
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <div>
            <Badge variant="neutral">{project.category}</Badge>
            <CardTitle className="mt-4 text-4xl">{project.title}</CardTitle>
          </div>
          <Button asChild>
            <Link href="/contact">
              Start Similar Project <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4 text-sm leading-7 text-muted">
            <p>{project.summary}</p>
            <p>{project.outcome}</p>
          </div>
          <div className="grid gap-3">
            <div className="rounded-2xl bg-white/[0.04] p-4">
              <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Client</p>
              <p className="mt-2 font-semibold">{project.clientName}</p>
            </div>
            <div className="rounded-2xl bg-white/[0.04] p-4">
              <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Tags</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="neutral">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
