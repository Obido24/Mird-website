import { Card, CardContent } from '@/components/ui/card';
import { SectionHeading } from '@/components/site/section-heading';
import { ContactForm } from '@/components/site/contact-form';

export default function ContactPage() {
  return (
    <main className="container-grid page-fade py-16 lg:py-24">
      <SectionHeading
        eyebrow="Contact"
        title="Contact MIDR Technologies Ltd"
        description="Have a project, idea, or training request? Reach out to MIDR Technologies Ltd and let&apos;s discuss how we can help you build the right digital solution."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <ContactForm />
        <Card>
          <CardContent className="space-y-5 pt-6">
            <div>
              <p className="eyebrow mb-3">Direct contact</p>
              <p className="text-sm leading-7 text-muted">
                Send us a message for website development, app development, branding, video editing, computer maintenance, ICT training, or custom software solutions.
              </p>
            </div>
            <div>
              <p className="eyebrow mb-3">Office</p>
              <p className="text-sm leading-7 text-muted">
                MIDR Technologies Ltd is based in Abuja, Nigeria, and serves clients across different locations through both physical and remote digital service delivery.
              </p>
            </div>
            <div className="soft-card rounded-2xl p-5">
              <p className="text-sm leading-7 text-foreground">
                For project inquiries, training enrollment, partnership discussions, or technical support, kindly contact our team and we will respond as soon as possible.
              </p>
            </div>
            <div className="soft-card rounded-2xl p-5">
              <p className="text-sm leading-7 text-foreground">
                Your idea deserves the right digital solution. Let&apos;s build it together.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
