"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/Button";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const { setTheme, theme } = useTheme();

  // Memastikan preferensi tema hanya dimuat sekali di awal
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      // Jika ada preferensi di localStorage, pakai itu
      setIsDark(savedTheme === "dark");
      setTheme(savedTheme);
    } else {
      // Jika tidak ada preferensi, atur default berdasarkan sistem atau mode terang
      const defaultTheme = theme === "dark" ? "dark" : "light";
      setIsDark(defaultTheme === "dark");
      setTheme(defaultTheme);
    }
  }, [theme, setTheme]);

  // Menyimpan preferensi tema ke localStorage
  const handleThemeToggle = () => {
    const newTheme = !isDark ? "dark" : "light";
    setIsDark(!isDark);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Button variant="outline" size="icon" onClick={handleThemeToggle}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
