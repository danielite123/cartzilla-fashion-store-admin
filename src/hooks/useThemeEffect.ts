import { useEffect } from "react";
import { useThemeStore } from "@/store/useThemeStore";

export const useThemeEffect = () => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    try {
      window.localStorage.setItem("theme", theme);
    } catch (error) {
      console.error("Could not save theme to localStorage:", error);
    }
  }, [theme]);
};
