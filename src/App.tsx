import "../global.css";
import { RouterProvider } from "@/app/providers/RouterProvider";
import { UserProvider } from "@/app/providers/UserProvider";

function App() {
  return (
    <UserProvider >
      <RouterProvider/>
    </UserProvider>
  );
}

export default App;
