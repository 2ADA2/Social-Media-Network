import { configureStore } from '@reduxjs/toolkit';
import { initUserStore, logout, setCredentials, userReducer } from '@/entities/user/model/user-slice';
import { userQueries } from "@/features/auth/me.ts";
import { queryClient } from "@/shared/api/queryClient.ts";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

const token = localStorage.getItem('token');

if (token) {
  (async () => {
    try {
      const user = await queryClient.fetchQuery(userQueries.me());
      store.dispatch(setCredentials({ user, token }));
      store.dispatch(initUserStore());
    } catch {
      store.dispatch(logout());
      store.dispatch(initUserStore());
    }
  })();
} else {
  store.dispatch(initUserStore());
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
