import { ChartColumn, FolderKanban, DollarSign, Users, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getDashboardData } from '@/lib/live-content';

const stats = [
  { icon: Users, label: 'Total Clients' },
  { icon: FolderKanban, label: 'Active Projects' },
  { icon: DollarSign, label: 'Revenue' },
  { icon: GraduationCap, label: 'Courses' }
];

export async function DashboardOverview() {
  let dashboard;

  try {
    dashboard = await getDashboardData();
  } catch {
    dashboard = {
      metrics: [
        { label: 'Total Clients', value: '0', delta: 'Unavailable' },
        { label: 'Active Projects', value: '0', delta: 'Unavailable' },
        { label: 'Revenue', value: '$0', delta: 'Unavailable' },
        { label: 'Courses', value: '0', delta: 'Unavailable' }
      ],
      activities: [],
      revenueSeries: []
    };
  }

  const maxRevenue = Math.max(...dashboard.revenueSeries, 0);

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
        {dashboard.metrics.map((metric, index) => {
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
              <CardTitle>Revenue Records</CardTitle>
              <CardDescription>Paid and pending payment entries from the live backend.</CardDescription>
            </div>
            <Badge variant="neutral">Live</Badge>
          </CardHeader>
          <CardContent>
            {dashboard.revenueSeries.length > 0 ? (
              <div className="flex h-[320px] items-end gap-3 rounded-2xl border border-line/40 bg-surface/50 p-5">
                {dashboard.revenueSeries.slice(-12).map((amount, index) => (
                  <div
                    key={`${amount}-${index}`}
                    className="min-h-3 flex-1 rounded-t-xl bg-gradient-to-t from-primary to-secondary"
                    style={{ height: `${Math.max((amount / maxRevenue) * 100, 8)}%` }}
                    title={String(amount)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex h-[320px] items-center justify-center rounded-2xl border border-line/40 bg-surface/50 text-sm text-muted">
                No live payment records yet.
              </div>
            )}
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
            {dashboard.activities.length === 0 ? (
              <p className="text-sm text-muted">No recent live activity yet.</p>
            ) : null}
            {dashboard.activities.map((entry, index) => (
              <div key={`${entry.title}-${entry.time}-${index}`} className="relative pl-5">
                <span className="absolute left-0 top-2 h-2.5 w-2.5 rounded-full bg-primary" />
                {index < dashboard.activities.length - 1 ? (
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
