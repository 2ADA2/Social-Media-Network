import axios from 'axios';
import { store } from "@/app/store/user-store.ts";
import { logout } from "@/entities/user/model/user-slice.ts";
import { refreshRequest } from "@/features/auth/refresh.ts";

export const apiClient = axios.create({
  baseURL: '/',
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${ token }`;
  }
  return config;
});

const forceLogout = () => {
  localStorage.removeItem('token');
  store.dispatch(logout());
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const data = await refreshRequest();

        localStorage.setItem('token', data.token);

        original.headers.Authorization = `Bearer ${ data.token }`;
        return apiClient(original);
      } catch {
        forceLogout();
        return Promise.reject(error);
      }
    }

    forceLogout();

    return Promise.reject(error);
  },
);
