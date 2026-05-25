import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'neutral';

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-primary/15 text-primary border-primary/20',
  success: 'bg-success/15 text-success border-success/20',
  warning: 'bg-warning/15 text-warning border-warning/20',
  danger: 'bg-danger/15 text-danger border-danger/20',
  neutral: 'bg-surface/80 text-muted border-line/50'
};

export function Badge({
  className,
  variant = 'default',
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}
