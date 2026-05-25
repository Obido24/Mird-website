import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="container-grid page-fade flex min-h-[70vh] items-center justify-center py-16 text-center">
      <div className="max-w-xl">
        <p className="eyebrow">404</p>
        <h1 className="headline mt-4 text-4xl font-bold sm:text-5xl">Page Not Found</h1>
        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-muted">
          The page you are looking for may have been moved, removed, or does not exist.
        </p>
        <div className="mt-8">
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
