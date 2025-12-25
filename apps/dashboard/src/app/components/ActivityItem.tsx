interface ActivityItemProps {
  title: string;
  description: string;
  status: 'Success' | 'Failed';
}

export function ActivityItem({
  title,
  description,
  status,
}: ActivityItemProps) {
  return (
    <div className="py-5 flex items-start gap-5 group cursor-default">
      <div className="mt-1 w-2 h-2 rounded-full bg-primary group-hover:scale-150 transition-transform" />
      <div className="flex-1">
        <p className="font-semibold group-hover:text-primary transition-colors">
          {title}
        </p>
        <p className="text-sm text-text/40">{description}</p>
      </div>
      <span className="text-[10px] font-mono text-text/30 bg-text/5 px-2 py-1 rounded uppercase">
        {status}
      </span>
    </div>
  );
}
