"use client";

import { useThemeStore } from "@/store/useThemeStore";
import { Sun, Moon } from "lucide-react";
import React from "react";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = "" }) => {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative flex items-center justify-between h-8 w-16 rounded-full
        transition-colors duration-300 ease-in-out px-1
        ${isDark ? "bg-slate-700" : "bg-aqua-spring"}
        ${className}
      `}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div className="w-6 h-6 flex items-center justify-center z-10">
        <Moon
          size={16}
          className={`${
            isDark ? "text-white" : "text-black"
          } transition-colors duration-300`}
        />
      </div>

      <div className="w-6 h-6 flex items-center justify-center z-10">
        <Sun
          size={16}
          className={`${
            isDark ? "text-black" : "text-white"
          } transition-colors duration-300`}
        />
      </div>

      <span
        className={`
          absolute h-6 w-6 bg-white rounded-full shadow-md
          transform transition-transform duration-300 ease-in-out
          ${isDark ? "translate-x-8" : "translate-x-0"}
        `}
      />
    </button>
  );
};

export default ThemeToggle;
