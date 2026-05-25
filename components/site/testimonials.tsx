import { Card, CardContent } from '@/components/ui/card';
import { testimonials } from '@/lib/public-content';

export function Testimonials() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {testimonials.map((item) => (
        <Card key={item.author} className="h-full">
          <CardContent className="space-y-5">
            <p className="text-sm leading-7 text-foreground/90">&ldquo;{item.quote}&rdquo;</p>
            <div>
              <p className="font-semibold">{item.author}</p>
              <p className="text-xs uppercase tracking-[0.24em] text-muted">{item.title}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
