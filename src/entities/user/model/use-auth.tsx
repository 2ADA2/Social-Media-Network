import { useAppSelector, useAppDispatch } from '@/app/store/hooks';
import { selectIsAuthenticated } from './selectors';
import { logout as logoutAction, setCredentials } from './user-slice';
import type { User } from './types';

export const useAuth = () => {
  const isAuth = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();

  const auth = (user: User, token: string) => {
    localStorage.setItem("token", token);
    dispatch(setCredentials({ user, token }));
  };

  return {
    isAuth,
    auth,
    logout: () => dispatch(logoutAction()),
  };
};
