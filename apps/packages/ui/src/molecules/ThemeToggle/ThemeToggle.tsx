'use client';

import { useState, useEffect } from 'react';
import { applyTheme, lightTheme, darkTheme } from '@enterprise/tokens';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Handle hydration mismatch & load saved preference
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      setIsDark(false);
    } else if (saved === 'dark') {
      setIsDark(true);
    } else {
      // Default to dark if no preference
      setIsDark(true);
    }
  }, []);

  // Apply theme and persist preference
  useEffect(() => {
    if (mounted) {
      applyTheme(isDark ? darkTheme : lightTheme);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  }, [isDark, mounted]);

  // SSR placeholder to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="flex items-center gap-3">
        <div className="h-7 w-12 rounded-full bg-gray-200 animate-pulse border border-border/50" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="hidden sm:block text-[10px] font-bold uppercase tracking-widest opacity-60 text-text">
        {isDark ? 'Dark' : 'Light'}
      </span>

      <button
        onClick={() => setIsDark(!isDark)}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 shadow-inner border border-border/50 ${
          isDark ? 'bg-primary' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-flex h-5 w-5 transform items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${
            isDark ? 'translate-x-6' : 'translate-x-1'
          }`}
        >
          <span aria-hidden="true" className="text-xs">
            {isDark ? '🌙' : '☀️'}
          </span>
        </span>
      </button>
    </div>
  );
}
