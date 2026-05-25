import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { PublicCourse } from '@/lib/types';

export function CourseCard({
  course,
  featured = false
}: {
  course: PublicCourse;
  featured?: boolean;
}) {
  return (
    <Card className={cn('relative h-full overflow-hidden', featured && 'border-primary/25 shadow-panel')}>
      {featured ? <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-secondary/10" /> : null}
      <CardHeader className="relative">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={featured ? 'default' : 'neutral'}>{course.level}</Badge>
            {featured ? <Badge variant="success">Featured</Badge> : null}
          </div>
          <CardTitle className="mt-4">{course.title}</CardTitle>
        </div>
        <div className="text-right text-xs uppercase tracking-[0.24em] text-muted">
          <div>{course.duration}</div>
          <div className="mt-1">{course.price}</div>
        </div>
      </CardHeader>
      <CardContent className="relative">
        <CardDescription>{course.description}</CardDescription>
        <div className="mt-5 grid gap-2 text-sm text-muted">
          <p>{course.lessons} lessons</p>
          {course.highlights.map((item) => (
            <p key={item} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
              {item}
            </p>
          ))}
        </div>
        <Button asChild variant="secondary" size="sm" className="mt-6 w-full">
          <Link href="/contact">
            Enroll Now <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
