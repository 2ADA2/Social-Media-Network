import "../global.css";
import { RouterProvider } from "app/providers/router-provider";
import { ThemeProvider } from "app/providers/theme-provider";
import { store } from "@/app/store/user-store.ts";
import { Provider } from "react-redux";

function App() {
  return (
      <Provider store={ store }>
        <ThemeProvider>
          <RouterProvider/>
        </ThemeProvider>
      </Provider>
  );
}

export default App;
