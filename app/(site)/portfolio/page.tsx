import { PortfolioGrid } from '@/components/site/portfolio-grid';
import { SectionHeading } from '@/components/site/section-heading';
import { getLivePortfolioProjects } from '@/lib/live-content';

export const dynamic = 'force-dynamic';

export default async function PortfolioPage() {
  const projects = await getLivePortfolioProjects();

  return (
    <main className="container-grid page-fade py-16 lg:py-24">
      <SectionHeading
        eyebrow="Portfolio"
        title="Our Portfolio"
        description="Here are selected projects and product ideas that reflect our focus on digital transformation, education technology, business automation, and creative solutions."
      />
      <div className="mt-12">
        <PortfolioGrid projects={projects} />
      </div>
    </main>
  );
}
