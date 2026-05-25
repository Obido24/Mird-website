import { SectionHeading } from '@/components/site/section-heading';
import { CourseCard } from '@/components/site/course-card';
import { publicCourses } from '@/lib/public-content';

export default function AcademyPage() {
  const courses = [...publicCourses].sort((a, b) => {
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
        {courses.map((course) => (
          <CourseCard key={course.slug} course={course} featured={course.slug === 'app-development'} />
        ))}
      </div>
    </main>
  );
}
