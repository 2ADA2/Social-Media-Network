import "../global.css";
import { useLayoutEffect } from "react";
import { RouterProvider } from "@/app/providers/RouterProvider";
import { UserProvider } from "@/app/providers/UserProvider";

function App() {
  useLayoutEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, []);

  return <MainPage/>;
  return (
    <UserProvider >
      <RouterProvider/>
    </UserProvider>
  );
}

export default App;
