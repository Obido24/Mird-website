import { SectionHeading } from '@/components/site/section-heading';
import { CourseCard } from '@/components/site/course-card';
import { getLiveCourses } from '@/lib/live-content';

export const dynamic = 'force-dynamic';

export default async function AcademyPage() {
  const courses = (await getLiveCourses()).sort((a, b) => {
    if (a.slug === 'app-development') return -1;
    if (b.slug === 'app-development') return 1;
    return 0;
  });

  return (
    <main className="container-grid page-fade py-16 lg:py-24">
      <SectionHeading
        eyebrow="Academy"
        title="MIDR Academy"
        description="MIDR Academy provides practical technology training for students, individuals, professionals, and organizations who want to build useful digital skills."
      />
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {courses.length === 0 ? <p className="text-sm text-muted">No live courses are published yet.</p> : null}
        {courses.map((course) => (
          <CourseCard key={course.slug} course={course} featured={course.slug === 'app-development'} />
        ))}
      </div>
    </main>
  );
}
