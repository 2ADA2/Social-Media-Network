import { MainPage } from "./pages/main";
import "../global.css";
import { useLayoutEffect } from "react";

function App() {
  useLayoutEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, []);

  return <MainPage/>;
}

export default App;
