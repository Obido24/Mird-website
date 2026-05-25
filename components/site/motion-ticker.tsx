export function MotionTicker() {
  const items = [
    'Web Development',
    'App Development',
    'Graphic Design',
    'Video Editing',
    'Computer Maintenance',
    'Tech Training'
  ];

  return (
    <div className="marquee mt-8">
      <div className="marquee-track py-3">
        {[...items, ...items].map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="mx-2 flex items-center gap-2 rounded-full border border-line/50 bg-surface/80 px-4 py-2 text-xs uppercase tracking-[0.24em] text-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
