import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SectionHeading } from '@/components/site/section-heading';
import { ServiceCard } from '@/components/site/service-card';
import { Testimonials } from '@/components/site/testimonials';
import { brandStory, publicServices, companyStats, homeWhyChoose, homeDeliverables } from '@/lib/public-content';
import { PortfolioGrid } from '@/components/site/portfolio-grid';
import { AnimatedStat } from '@/components/site/animated-stat';
import { MotionTicker } from '@/components/site/motion-ticker';
import { Reveal } from '@/components/site/reveal';

export default function HomePage() {
  return (
    <main className="page-fade">
      <section className="relative overflow-hidden bg-noise">
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="container-grid relative py-20 sm:py-24 lg:py-32">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="eyebrow mb-5 flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4" />
              Registered Technology Company in Nigeria
            </p>
            <p className="mx-auto -mt-2 mb-5 max-w-2xl text-xs uppercase tracking-[0.28em] text-muted sm:text-sm">
              MIDR | {brandStory.tagline}
            </p>
            <h1 className="headline text-4xl font-black leading-[0.98] sm:text-5xl lg:text-6xl">
              We Build Smart Digital Solutions for Modern Businesses
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-muted sm:text-base">
              MIDR Technologies Ltd helps businesses, schools, startups, and organizations transform ideas into powerful digital products. From mobile apps and websites to branding, automation, training, and support, we create solutions that are practical, beautiful, and built for growth.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">
                  Start a Project <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/services">Explore Our Services</Link>
              </Button>
            </div>
            <MotionTicker />
          </Reveal>
          <div className="mx-auto mt-16 grid max-w-5xl gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {companyStats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 90}>
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-muted">{stat.label}</p>
                    <p className="mt-4 headline text-4xl font-bold">
                      <AnimatedStat value={stat.value} />
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-grid py-20 lg:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title="Our Services"
            description="We provide technology and creative services that help businesses, schools, and organizations operate better, reach more people, and grow with confidence."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {publicServices.map((service, index) => (
            <Reveal key={service.slug} delay={index * 60}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-grid py-20 lg:py-28">
        <Reveal className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-5">
            <p className="eyebrow">About MIDR</p>
            <h2 className="headline text-4xl font-bold sm:text-5xl">Technology Built Around Real Problems</h2>
            <p className="max-w-xl text-sm leading-7 text-muted sm:text-base">
              At MIDR, we believe technology should do more than look impressive. It should solve real problems, simplify processes, improve communication, and create better experiences for users. Our work combines creativity, technical skill, and business understanding to deliver solutions that matter.
            </p>
            <div className="space-y-3">
              {homeWhyChoose.map((item) => (
                <div key={item} className="soft-card rounded-2xl px-4 py-4 text-sm text-foreground">
                  {item}
                </div>
              ))}
            </div>
            <Button asChild variant="secondary">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
          <Card>
            <CardHeader>
              <div>
                <CardTitle>What We Deliver</CardTitle>
                <CardDescription>Professional outputs built to support real growth and long-term impact.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {homeDeliverables.map((item) => (
                <div key={item} className="rounded-2xl bg-white/[0.04] p-4">
                  <p className="text-sm font-medium">{item}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </Reveal>
      </section>

      <section className="container-grid py-20 lg:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Portfolio"
            title="Our Portfolio"
            description="Here are selected projects and product ideas that reflect our focus on digital transformation, education technology, business automation, and creative solutions."
          />
        </Reveal>
        <div className="mt-10">
          <Reveal>
            <PortfolioGrid />
          </Reveal>
        </div>
      </section>

      <section className="container-grid py-20 lg:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Testimonials"
            title="What Clients Say About MIDR"
            description=""
          />
        </Reveal>
        <div className="mt-10">
          <Reveal>
            <Testimonials />
          </Reveal>
        </div>
      </section>

      <section className="container-grid py-20 lg:py-28">
        <Reveal>
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/10" />
            <CardContent className="relative py-12 text-center sm:py-16">
              <p className="eyebrow">Ready to build</p>
              <h2 className="headline mt-4 text-4xl font-bold sm:text-5xl">Let&apos;s Build Your Next Digital Product</h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted sm:text-base">
                Whether you need a website, mobile app, brand identity, training program, or custom software system, MIDR Technologies Ltd is ready to help you bring it to life.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Button asChild>
                  <Link href="/contact">Get Started</Link>
                </Button>
                <Button asChild variant="secondary">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </section>
    </main>
  );
}
