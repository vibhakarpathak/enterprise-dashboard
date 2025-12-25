import { Card, cn } from '@enterprise/ui';

interface StatCardProps {
  title: string;
  value: string;
  sub: string;
  status?: 'green' | 'primary';
}

export function StatCard({ title, value, sub, status }: StatCardProps) {
  return (
    <Card className="p-6">
      <span className="text-sm font-medium text-muted-foreground/60 uppercase tracking-wider">
        {title}
      </span>
      <h3 className="text-4xl font-black mt-2 text-[var(--color-text)]">
        {value}
      </h3>
      <p
        className={cn(
          'text-sm mt-4 font-bold uppercase tracking-tight',
          status === 'green'
            ? 'text-emerald-500'
            : 'text-[var(--color-primary)]',
        )}
      >
        {sub}
      </p>
    </Card>
  );
}

StatCard.Skeleton = function StatCardSkeleton() {
  return (
    <Card className="p-6 bg-[var(--color-text)]/[0.02] border-[var(--color-border)]/40">
      {/* Title Placeholder */}
      <div className="h-3 bg-[var(--color-text)] opacity-[0.15] rounded w-1/3 animate-pulse" />

      {/* Value Placeholder */}
      <div
        className="h-10 bg-[var(--color-text)] opacity-[0.1] rounded-lg w-1/2 mt-3 animate-pulse"
        style={{ animationDelay: '0.1s' }}
      />

      {/* Subtext Placeholder */}
      <div
        className="h-3 bg-[var(--color-text)] opacity-[0.08] rounded w-1/4 mt-5 animate-pulse"
        style={{ animationDelay: '0.2s' }}
      />
    </Card>
  );
};
