"use client";

import { useState, useEffect } from "react";
import { darkTheme, lightTheme, applyTheme } from "@enterprise/tokens";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  // 1. Handle Mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    // Optional: Load initial preference from localStorage here
    // const savedTheme = localStorage.getItem("theme");
    // if (savedTheme === "light") setIsDark(false);
  }, []);

  // 2. Apply theme whenever isDark changes
  useEffect(() => {
    if (mounted) {
      applyTheme(isDark ? darkTheme : lightTheme);
      // localStorage.setItem("theme", isDark ? "dark" : "light");
    }
  }, [isDark, mounted]);

  // 3. Render a placeholder with the same dimensions during SSR
  if (!mounted) {
    return (
      <div className="flex items-center gap-3">
        <span className="hidden sm:block h-3 w-10 bg-transparent" />
        <div className="h-7 w-12 rounded-full bg-gray-200 animate-pulse border border-border/50" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="hidden sm:block text-[10px] font-bold uppercase tracking-widest opacity-60 text-text">
        {isDark ? "Dark" : "Light"}
      </span>
      
      <button
        onClick={() => setIsDark(!isDark)}
        aria-label="Toggle Theme"
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 focus:outline-none shadow-inner border border-border/50 ${
          isDark ? "bg-primary" : "bg-gray-200"
        }`}
      >
        <span
          className={`flex h-5 w-5 transform items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-300 ease-in-out ${
            isDark ? "translate-x-6" : "translate-x-1"
          }`}
        >
          {isDark ? "🌙" : "☀️"}
        </span>
      </button>
    </div>
  );
}