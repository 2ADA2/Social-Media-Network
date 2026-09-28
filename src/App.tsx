import "../global.css";
import { store } from "@/app/store/user-store.ts";
import { Provider } from "react-redux";
import { MuiThemeProvider } from "@/app/providers/mui-theme-provider";
import { ThemeProvider } from "@/app/providers/theme-provider";
import { RouterProvider } from "@/app/providers/router-provider";

function App() {
  return (
    <Provider store={ store }>
      <MuiThemeProvider>
        <ThemeProvider>
          <RouterProvider/>
        </ThemeProvider>
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
