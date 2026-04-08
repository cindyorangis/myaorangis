// src/components/DarkModeToggle.tsx
"use client";
import { useEffect, useState } from "react";

export function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const isDark = saved === "dark" || (!saved && prefersDark);
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      className="bg-[var(--kids-accent-bg)] text-[var(--kids-accent-text)] text-sm font-bold px-4 py-2 rounded-full hover:opacity-80 transition-opacity"
    >
      {dark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
