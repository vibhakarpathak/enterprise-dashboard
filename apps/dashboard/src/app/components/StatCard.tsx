import { cn } from '@enterprise/ui';

interface StatCardProps {
  title: string;
  value: string;
  sub: string;
  status?: 'green' | 'primary';
}

export function StatCard({ title, value, sub, status }: StatCardProps) {
  return (
    <div className="relative overflow-hidden group bg-surface border border-border p-8 rounded-3xl hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl">
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-8 -mt-8 group-hover:bg-primary/10 transition-colors" />
      <p className="text-sm font-bold text-text/40 uppercase tracking-widest">
        {title}
      </p>
      <h3 className="text-4xl font-black mt-2">{value}</h3>
      <p
        className={cn(
          'text-sm mt-4 font-medium',
          status === 'green' ? 'text-emerald-500' : 'text-primary',
        )}
      >
        {sub}
      </p>
    </div>
  );
}
