"use client";

import { useState, useEffect } from "react";
import { darkTheme, lightTheme, applyTheme } from "@enterprise/tokens";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    applyTheme(isDark ? darkTheme : lightTheme);
  }, [isDark]);

  return (
    <div className="flex items-center gap-3">
      {/* Label - Hidden on mobile to save space if needed */}
      <span className="hidden sm:block text-[10px] font-bold uppercase tracking-widest opacity-60">
        {isDark ? "Dark" : "Light"}
      </span>
      
      <button
        onClick={() => setIsDark(!isDark)}
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