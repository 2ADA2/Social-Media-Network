import { configureStore } from '@reduxjs/toolkit';
import { setCredentials, userReducer } from '@/entities/user/model/user-slice';
import { USER_DATA } from "@/app/store/user-data.ts";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

const token = localStorage.getItem('token');

if (token) {
  // check token

  store.dispatch(setCredentials({ user: USER_DATA, token }));
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
