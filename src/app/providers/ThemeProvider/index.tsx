import React, { useLayoutEffect } from "react";
import { useThemeStore } from "@/app/store/theme-store.ts";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useThemeStore((state) => state.theme);

  useLayoutEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [theme]);

  return children;
};
