import { Toggle } from "@/shared/ui/toggle";
import { useThemeStore } from "@/app/store/theme-store.ts";

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useThemeStore(state => state);

  const checked = theme === "dark";

  return (
    <Toggle checked={ checked } onChange={ toggleTheme }/>
  );
};
