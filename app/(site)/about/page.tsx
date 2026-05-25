import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionHeading } from '@/components/site/section-heading';
import Link from 'next/link';
import { aboutApproachSteps, brandStory, homeWhyChoose } from '@/lib/public-content';

export default function AboutPage() {
  return (
    <main className="container-grid page-fade py-16 lg:py-24">
      <SectionHeading
        eyebrow="About MIDR"
        title="About MIDR Technologies Ltd"
        description="MIDR | Making Imagination Dream a Reality. MIDR Technologies Ltd is a registered private company limited by shares in Nigeria, incorporated under the Companies and Allied Matters Act 2020. The company focuses on mobile app development, web development, software solutions, branding, multimedia production, ICT training, computer maintenance, and business automation."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Mission</CardTitle>
              <CardDescription className="mt-2">{brandStory.mission}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-7 text-muted">
            <p>{brandStory.missionParagraph}</p>
            <p>{brandStory.longStory}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Vision</CardTitle>
              <CardDescription className="mt-2">{brandStory.visionParagraph}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-7 text-muted">
            <p>{brandStory.vision}</p>
            <div>
              <p className="eyebrow mb-3">Values</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {brandStory.values.map((value) => (
                  <div key={value} className="rounded-2xl bg-white/[0.04] p-4 text-foreground">
                    {value}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Card>
          <CardHeader>
            <CardTitle>Why choose MIDR</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {homeWhyChoose.map((item) => (
              <div key={item} className="rounded-2xl bg-white/[0.04] p-4 text-sm text-foreground">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Our approach</CardTitle>
              <CardDescription>We keep the work structured, transparent, and grounded in outcomes.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {aboutApproachSteps.map((step, index) => (
              <div key={step} className="rounded-2xl bg-white/[0.04] p-4">
                <p className="headline text-2xl font-semibold">0{index + 1}</p>
                <p className="mt-2 text-sm leading-7 text-muted">{step}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 flex justify-center">
        <Button asChild>
          <Link href="/contact">Work With MIDR</Link>
        </Button>
      </div>
    </main>
  );
}
