import { useEffect, useState } from "react";
import { Toggle } from "@/shared/ui/Toggle";

export const ThemeSwitcher = () => {
  const [checked, setChecked] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", checked ? "dark" : "light");
    localStorage.setItem("theme", checked ? "dark" : "light");
  }, [checked]);

  return (
    <Toggle checked={ checked } onChange={ () => setChecked(!checked) }/>
  );
};
