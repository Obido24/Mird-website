import { ChartColumn, FolderKanban, DollarSign, Users, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { dashboardMetrics } from '@/lib/public-content';

const activity = [
  {
    time: '10:24 AM',
    title: 'Contract Finalized',
    detail: 'Project "MIDR Zenith" was approved by the client.'
  },
  {
    time: 'Yesterday',
    title: 'New Enrollment',
    detail: 'The academy received 16 fresh enrollments.'
  },
  {
    time: 'Yesterday',
    title: 'Revenue Milestone',
    detail: 'Q3 revenue crossed the internal target by 14%.'
  }
];

const stats = [
  { icon: Users, label: 'Total Clients' },
  { icon: FolderKanban, label: 'Active Projects' },
  { icon: DollarSign, label: 'Revenue' },
  { icon: GraduationCap, label: 'Enrollments' }
];

export function DashboardOverview() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="eyebrow">Dashboard Overview</p>
        <h1 className="headline text-4xl font-semibold sm:text-5xl">Systems Overview</h1>
        <p className="max-w-3xl text-sm leading-7 text-muted sm:text-base">
          Real-time performance metrics and project lifecycle telemetry for MIDR operations.
        </p>
      </div>

      <div className="grid gap-5 xl:grid-cols-4">
        {dashboardMetrics.map((metric, index) => {
          const StatIcon = stats[index]?.icon ?? ChartColumn;
          return (
            <Card key={metric.label} className="relative overflow-hidden">
              <CardHeader className="mb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface/80 text-primary">
                  <StatIcon className="h-5 w-5" />
                </div>
                <Badge variant="neutral">{metric.delta}</Badge>
              </CardHeader>
              <CardContent>
                <CardDescription className="uppercase tracking-[0.24em]">{metric.label}</CardDescription>
                <CardTitle className="mt-3 text-3xl">{metric.value}</CardTitle>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.85fr)]">
        <Card className="overflow-hidden">
          <CardHeader>
            <div>
              <CardTitle>Revenue Telemetry</CardTitle>
              <CardDescription>Monthly growth projection and actuals.</CardDescription>
            </div>
            <Badge variant="neutral">Monthly</Badge>
          </CardHeader>
          <CardContent>
            <svg viewBox="0 0 900 360" className="h-[320px] w-full">
              <defs>
                <linearGradient id="midrLine" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor="#a8a6ff" />
                  <stop offset="100%" stopColor="#70d7ff" />
                </linearGradient>
                <linearGradient id="midrFill" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(168,166,255,0.45)" />
                  <stop offset="100%" stopColor="rgba(168,166,255,0.02)" />
                </linearGradient>
              </defs>
              <path
                d="M 0 300 C 120 285, 160 220, 260 210 C 360 200, 400 235, 490 190 C 580 145, 650 95, 760 110 C 810 120, 855 134, 900 128"
                fill="none"
                stroke="url(#midrLine)"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <path
                d="M 0 300 C 120 285, 160 220, 260 210 C 360 200, 400 235, 490 190 C 580 145, 650 95, 760 110 C 810 120, 855 134, 900 128 L 900 360 L 0 360 Z"
                fill="url(#midrFill)"
              />
            </svg>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest system events and project updates.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            {activity.map((entry, index) => (
              <div key={entry.title} className="relative pl-5">
                <span className="absolute left-0 top-2 h-2.5 w-2.5 rounded-full bg-primary" />
                {index < activity.length - 1 ? (
                  <span className="absolute left-[5px] top-4 h-full w-px bg-line/40" />
                ) : null}
                <p className="text-xs uppercase tracking-[0.24em] text-muted">{entry.time}</p>
                <h4 className="mt-2 font-semibold">{entry.title}</h4>
                <p className="mt-1 text-sm leading-6 text-muted">{entry.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
