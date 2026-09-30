import "../global.css";
import { store } from "@/app/store/user-store.ts";
import { Provider } from "react-redux";
import { MuiThemeProvider } from "@/app/providers/mui-theme-provider";
import { ThemeProvider } from "@/app/providers/theme-provider";
import { RouterProvider } from "@/app/providers/router-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/api/queryClient.ts";

function App() {
  return (
    <QueryClientProvider client={ queryClient }>
      <Provider store={ store }>
        <MuiThemeProvider>
          <ThemeProvider>
            <RouterProvider/>
          </ThemeProvider>
        </MuiThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
