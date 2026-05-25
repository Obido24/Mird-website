import Image from 'next/image';
import { cn } from '@/lib/utils';

export function MidrLogo({
  className,
  priority = false
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/midr-logo-tight.png"
      alt="MIDR Technologies Ltd"
      width={3044}
      height={1336}
      priority={priority}
      className={cn('h-auto w-auto object-contain', className)}
    />
  );
}
