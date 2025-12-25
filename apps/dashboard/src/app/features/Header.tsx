import { ThemeToggle } from '@enterprise/ui';

export function Header() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
            E
          </div>
          <span className="font-bold text-xl tracking-tight uppercase">
            Enterprise<span className="text-primary">OS</span>
          </span>
        </div>
        <div className="flex items-center h-full pt-1">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
