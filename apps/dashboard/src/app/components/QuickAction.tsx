interface QuickActionProps {
  label: string;
  color: string;
}

export function QuickAction({ label, color }: QuickActionProps) {
  return (
    <button
      type="button"
      className="w-full flex items-center justify-between p-5 bg-surface border border-border rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm hover:shadow-md group"
      aria-label={`Quick action: ${label}`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-3 h-3 rounded-full ${color} shadow-[0_0_10px_rgba(0,0,0,0.1)]`}
        />
        <span className="font-bold text-text/80">{label}</span>
      </div>
      <span className="text-text/20 group-hover:text-primary group-hover:translate-x-1 transition-all">
        →
      </span>
    </button>
  );
}
