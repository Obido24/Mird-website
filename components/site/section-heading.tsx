import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div className={cn('space-y-4', align === 'center' && 'mx-auto max-w-3xl text-center', className)}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="headline text-3xl font-bold tracking-[-0.05em] sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? <p className="max-w-2xl text-sm leading-7 text-muted sm:text-base">{description}</p> : null}
    </div>
  );
}
