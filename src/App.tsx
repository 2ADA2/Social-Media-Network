import "../global.css";
import { RouterProvider } from "@/app/providers/RouterProvider";
import { UserProvider } from "@/app/providers/UserProvider";
import { ThemeProvider } from "@/app/providers/ThemeProvider";

function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <RouterProvider/>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
