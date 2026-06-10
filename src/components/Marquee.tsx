export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y-2 border-foreground bg-foreground py-6">
      <div className="flex animate-marquee whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={i}
            className="mx-8 font-(--font-display) text-3xl uppercase tracking-tight text-background md:text-5xl"
          >
            {t} <span className="mx-6 inline-block text-white dark:text-primary">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
