import { PortfolioGrid } from '@/components/site/portfolio-grid';
import { SectionHeading } from '@/components/site/section-heading';

export default function PortfolioPage() {
  return (
    <main className="container-grid page-fade py-16 lg:py-24">
      <SectionHeading
        eyebrow="Portfolio"
        title="Our Portfolio"
        description="Here are selected projects and product ideas that reflect our focus on digital transformation, education technology, business automation, and creative solutions."
      />
      <div className="mt-12">
        <PortfolioGrid />
      </div>
    </main>
  );
}
