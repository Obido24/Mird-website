import { CheckCircle2, Mail, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { SectionHeading } from '@/components/site/section-heading';
import { ContactForm } from '@/components/site/contact-form';

export default function ContactPage() {
  return (
    <main className="container-grid page-fade py-12 sm:py-16 lg:py-20">
      <SectionHeading
        eyebrow="Contact"
        title="Contact MIDR Technologies Ltd"
        description="Have a project, idea, or training request? Reach out to MIDR Technologies Ltd and let&apos;s discuss how we can help you build the right digital solution."
        className="max-w-4xl"
      />
      <div className="mt-8 grid gap-5 md:mt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-start">
        <ContactForm />
        <Card className="h-full">
          <CardContent className="grid gap-5 pt-2 sm:pt-3">
            <div className="rounded-2xl border border-line/40 bg-surface/60 p-4 sm:p-5">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </span>
                <p className="eyebrow">Direct contact</p>
              </div>
              <p className="text-sm leading-7 text-muted sm:text-base">
                Send us a message for website development, app development, branding, video editing, computer maintenance, ICT training, or custom software solutions.
              </p>
            </div>
            <div className="rounded-2xl border border-line/40 bg-surface/60 p-4 sm:p-5">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                  <MapPin className="h-5 w-5" />
                </span>
                <p className="eyebrow">Office</p>
              </div>
              <p className="text-sm leading-7 text-muted sm:text-base">
                MIDR Technologies Ltd is based in Abuja, Nigeria, and serves clients across different locations through both physical and remote digital service delivery.
              </p>
            </div>
            <div className="rounded-2xl border border-line/40 bg-surface/60 p-4 sm:p-5">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-success/10 text-success">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
                <p className="eyebrow">Admin follow-up</p>
              </div>
              <p className="text-sm leading-7 text-foreground sm:text-base">
                For project inquiries, training enrollment, partnership discussions, or technical support, kindly contact our team and we will respond as soon as possible.
              </p>
            </div>
            <div className="rounded-2xl border border-primary/25 bg-primary/10 p-4 sm:p-5">
              <p className="text-sm font-semibold leading-7 text-foreground sm:text-base">
                Your idea deserves the right digital solution. Let&apos;s build it together.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
