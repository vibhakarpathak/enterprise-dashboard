export function WelcomeSection() {
  return (
    <header className="space-y-4">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
        System Active
      </div>
      <h1 className="text-5xl lg:text-6xl font-black tracking-tighter leading-none">
        Welcome back, <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
          Vibhakar Pathak
        </span>
      </h1>
      <p className="text-text/50 max-w-xl text-lg leading-relaxed">
        Everything is looking stable today. You have{' '}
        <span className="text-text font-semibold">2 pending updates</span>{' '}
        across your enterprise libraries.
      </p>
    </header>
  );
}
