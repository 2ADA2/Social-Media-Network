import { configureStore } from '@reduxjs/toolkit';
import { initUserStore, logout, setCredentials, userReducer } from '@/entities/user/model/user-slice';
import { getMe } from "@/features/auth/me.ts";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

const token = localStorage.getItem('token');

if (token) {
  (async () => {
    try {
      const user = await getMe();
      store.dispatch(setCredentials({ user, token }));
      store.dispatch(initUserStore());
    } catch {
      store.dispatch(logout());
    }
  })();
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
