"use client";

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';
import { publicProjects } from '@/lib/public-content';
import type { PublicProject } from '@/lib/types';

export function PortfolioGrid() {
  const [selected, setSelected] = useState<PublicProject | null>(null);
  const items = publicProjects;

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((project) => (
          <Card key={project.slug} className="group h-full overflow-hidden">
            <CardHeader className="items-start">
              <div>
                <Badge variant="neutral">{project.category}</Badge>
                <CardTitle className="mt-4">{project.title}</CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelected(project)}>
                Quick View
              </Button>
            </CardHeader>
            <CardContent>
              <CardDescription>{project.summary}</CardDescription>
              <p className="mt-4 text-sm leading-7 text-muted">{project.outcome}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="neutral">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button asChild variant="secondary" size="sm" className="mt-6">
                <Link href={`/portfolio/${project.slug}`}>
                  View project <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Modal
        open={Boolean(selected)}
        title={selected?.title ?? ''}
        description={selected?.summary}
        onClose={() => setSelected(null)}
      >
        {selected ? (
          <div className="space-y-5">
            <Badge>{selected.category}</Badge>
            <p className="text-base leading-7 text-foreground/90">{selected.outcome}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="soft-card rounded-2xl p-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Client</p>
                <p className="mt-2 font-semibold">{selected.clientName}</p>
              </div>
              <div className="soft-card rounded-2xl p-4">
                <p className="text-[11px] uppercase tracking-[0.24em] text-muted">Category</p>
                <p className="mt-2 font-semibold">{selected.category}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {selected.tags.map((tag) => (
                <Badge key={tag} variant="neutral">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
}
